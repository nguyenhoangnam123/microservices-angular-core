// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ZoneComponentsPage, ZoneDeleteDialog, ZoneUpdatePage } from './zone.page-object';

const expect = chai.expect;

describe('Zone e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let zoneComponentsPage: ZoneComponentsPage;
  let zoneUpdatePage: ZoneUpdatePage;
  let zoneDeleteDialog: ZoneDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Zones', async () => {
    await navBarPage.goToEntity('zone');
    zoneComponentsPage = new ZoneComponentsPage();
    await browser.wait(ec.visibilityOf(zoneComponentsPage.title), 5000);
    expect(await zoneComponentsPage.getTitle()).to.eq('eGpApp.userManagementZone.home.title');
  });

  it('should load create Zone page', async () => {
    await zoneComponentsPage.clickOnCreateButton();
    zoneUpdatePage = new ZoneUpdatePage();
    expect(await zoneUpdatePage.getPageTitle()).to.eq('eGpApp.userManagementZone.home.createOrEditLabel');
    await zoneUpdatePage.cancel();
  });

  it('should create and save Zones', async () => {
    const nbButtonsBeforeCreate = await zoneComponentsPage.countDeleteButtons();

    await zoneComponentsPage.clickOnCreateButton();
    await promise.all([
      zoneUpdatePage.setCodeInput('code'),
      zoneUpdatePage.setNameInput('name'),
      zoneUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      zoneUpdatePage.setDateUpdatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      zoneUpdatePage.setCreatedByInput('createdBy'),
      zoneUpdatePage.setUpdatedByInput('updatedBy')
    ]);
    expect(await zoneUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await zoneUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await zoneUpdatePage.getDateCreatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateCreated value to be equals to 2000-12-31'
    );
    expect(await zoneUpdatePage.getDateUpdatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateUpdated value to be equals to 2000-12-31'
    );
    expect(await zoneUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await zoneUpdatePage.getUpdatedByInput()).to.eq('updatedBy', 'Expected UpdatedBy value to be equals to updatedBy');
    const selectedIsDeleted = zoneUpdatePage.getIsDeletedInput();
    if (await selectedIsDeleted.isSelected()) {
      await zoneUpdatePage.getIsDeletedInput().click();
      expect(await zoneUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted not to be selected').to.be.false;
    } else {
      await zoneUpdatePage.getIsDeletedInput().click();
      expect(await zoneUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted to be selected').to.be.true;
    }
    await zoneUpdatePage.save();
    expect(await zoneUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await zoneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Zone', async () => {
    const nbButtonsBeforeDelete = await zoneComponentsPage.countDeleteButtons();
    await zoneComponentsPage.clickOnLastDeleteButton();

    zoneDeleteDialog = new ZoneDeleteDialog();
    expect(await zoneDeleteDialog.getDialogTitle()).to.eq('eGpApp.userManagementZone.delete.question');
    await zoneDeleteDialog.clickOnConfirmButton();

    expect(await zoneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
