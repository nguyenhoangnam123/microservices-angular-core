// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RolesPermissComponentsPage, RolesPermissDeleteDialog, RolesPermissUpdatePage } from './roles-permiss.page-object';

const expect = chai.expect;

describe('RolesPermiss e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rolesPermissComponentsPage: RolesPermissComponentsPage;
  let rolesPermissUpdatePage: RolesPermissUpdatePage;
  let rolesPermissDeleteDialog: RolesPermissDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load RolesPermisses', async () => {
    await navBarPage.goToEntity('roles-permiss');
    rolesPermissComponentsPage = new RolesPermissComponentsPage();
    await browser.wait(ec.visibilityOf(rolesPermissComponentsPage.title), 5000);
    expect(await rolesPermissComponentsPage.getTitle()).to.eq('eGpApp.userManagementRolesPermiss.home.title');
  });

  it('should load create RolesPermiss page', async () => {
    await rolesPermissComponentsPage.clickOnCreateButton();
    rolesPermissUpdatePage = new RolesPermissUpdatePage();
    expect(await rolesPermissUpdatePage.getPageTitle()).to.eq('eGpApp.userManagementRolesPermiss.home.createOrEditLabel');
    await rolesPermissUpdatePage.cancel();
  });

  it('should create and save RolesPermisses', async () => {
    const nbButtonsBeforeCreate = await rolesPermissComponentsPage.countDeleteButtons();

    await rolesPermissComponentsPage.clickOnCreateButton();
    await promise.all([
      rolesPermissUpdatePage.setValueInput('5'),
      rolesPermissUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      rolesPermissUpdatePage.setDateUpdatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      rolesPermissUpdatePage.setCreatedByInput('createdBy'),
      rolesPermissUpdatePage.setUpdatedByInput('updatedBy'),
      rolesPermissUpdatePage.rolesSelectLastOption(),
      rolesPermissUpdatePage.permissionSelectLastOption()
    ]);
    expect(await rolesPermissUpdatePage.getValueInput()).to.eq('5', 'Expected value value to be equals to 5');
    expect(await rolesPermissUpdatePage.getDateCreatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateCreated value to be equals to 2000-12-31'
    );
    expect(await rolesPermissUpdatePage.getDateUpdatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateUpdated value to be equals to 2000-12-31'
    );
    expect(await rolesPermissUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await rolesPermissUpdatePage.getUpdatedByInput()).to.eq('updatedBy', 'Expected UpdatedBy value to be equals to updatedBy');
    const selectedIsDeleted = rolesPermissUpdatePage.getIsDeletedInput();
    if (await selectedIsDeleted.isSelected()) {
      await rolesPermissUpdatePage.getIsDeletedInput().click();
      expect(await rolesPermissUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted not to be selected').to.be.false;
    } else {
      await rolesPermissUpdatePage.getIsDeletedInput().click();
      expect(await rolesPermissUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted to be selected').to.be.true;
    }
    await rolesPermissUpdatePage.save();
    expect(await rolesPermissUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rolesPermissComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last RolesPermiss', async () => {
    const nbButtonsBeforeDelete = await rolesPermissComponentsPage.countDeleteButtons();
    await rolesPermissComponentsPage.clickOnLastDeleteButton();

    rolesPermissDeleteDialog = new RolesPermissDeleteDialog();
    expect(await rolesPermissDeleteDialog.getDialogTitle()).to.eq('eGpApp.userManagementRolesPermiss.delete.question');
    await rolesPermissDeleteDialog.clickOnConfirmButton();

    expect(await rolesPermissComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
