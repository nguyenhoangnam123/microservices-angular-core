// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MenuZoneComponentsPage, MenuZoneDeleteDialog, MenuZoneUpdatePage } from './menu-zone.page-object';

const expect = chai.expect;

describe('MenuZone e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let menuZoneComponentsPage: MenuZoneComponentsPage;
  let menuZoneUpdatePage: MenuZoneUpdatePage;
  let menuZoneDeleteDialog: MenuZoneDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MenuZones', async () => {
    await navBarPage.goToEntity('menu-zone');
    menuZoneComponentsPage = new MenuZoneComponentsPage();
    await browser.wait(ec.visibilityOf(menuZoneComponentsPage.title), 5000);
    expect(await menuZoneComponentsPage.getTitle()).to.eq('eGpApp.userManagementMenuZone.home.title');
  });

  it('should load create MenuZone page', async () => {
    await menuZoneComponentsPage.clickOnCreateButton();
    menuZoneUpdatePage = new MenuZoneUpdatePage();
    expect(await menuZoneUpdatePage.getPageTitle()).to.eq('eGpApp.userManagementMenuZone.home.createOrEditLabel');
    await menuZoneUpdatePage.cancel();
  });

  it('should create and save MenuZones', async () => {
    const nbButtonsBeforeCreate = await menuZoneComponentsPage.countDeleteButtons();

    await menuZoneComponentsPage.clickOnCreateButton();
    await promise.all([
      menuZoneUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      menuZoneUpdatePage.setDateUpdatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      menuZoneUpdatePage.setCreatedByInput('createdBy'),
      menuZoneUpdatePage.setUpdatedByInput('updatedBy'),
      // menuZoneUpdatePage.rolesSelectLastOption(),
      menuZoneUpdatePage.menuSelectLastOption(),
      menuZoneUpdatePage.zoneSelectLastOption()
    ]);
    expect(await menuZoneUpdatePage.getDateCreatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateCreated value to be equals to 2000-12-31'
    );
    expect(await menuZoneUpdatePage.getDateUpdatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateUpdated value to be equals to 2000-12-31'
    );
    expect(await menuZoneUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await menuZoneUpdatePage.getUpdatedByInput()).to.eq('updatedBy', 'Expected UpdatedBy value to be equals to updatedBy');
    const selectedIsDeleted = menuZoneUpdatePage.getIsDeletedInput();
    if (await selectedIsDeleted.isSelected()) {
      await menuZoneUpdatePage.getIsDeletedInput().click();
      expect(await menuZoneUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted not to be selected').to.be.false;
    } else {
      await menuZoneUpdatePage.getIsDeletedInput().click();
      expect(await menuZoneUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted to be selected').to.be.true;
    }
    await menuZoneUpdatePage.save();
    expect(await menuZoneUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await menuZoneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MenuZone', async () => {
    const nbButtonsBeforeDelete = await menuZoneComponentsPage.countDeleteButtons();
    await menuZoneComponentsPage.clickOnLastDeleteButton();

    menuZoneDeleteDialog = new MenuZoneDeleteDialog();
    expect(await menuZoneDeleteDialog.getDialogTitle()).to.eq('eGpApp.userManagementMenuZone.delete.question');
    await menuZoneDeleteDialog.clickOnConfirmButton();

    expect(await menuZoneComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
