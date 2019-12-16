// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PermissionComponentsPage, PermissionDeleteDialog, PermissionUpdatePage } from './permission.page-object';

const expect = chai.expect;

describe('Permission e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let permissionComponentsPage: PermissionComponentsPage;
  let permissionUpdatePage: PermissionUpdatePage;
  let permissionDeleteDialog: PermissionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Permissions', async () => {
    await navBarPage.goToEntity('permission');
    permissionComponentsPage = new PermissionComponentsPage();
    await browser.wait(ec.visibilityOf(permissionComponentsPage.title), 5000);
    expect(await permissionComponentsPage.getTitle()).to.eq('eGpApp.userManagementPermission.home.title');
  });

  it('should load create Permission page', async () => {
    await permissionComponentsPage.clickOnCreateButton();
    permissionUpdatePage = new PermissionUpdatePage();
    expect(await permissionUpdatePage.getPageTitle()).to.eq('eGpApp.userManagementPermission.home.createOrEditLabel');
    await permissionUpdatePage.cancel();
  });

  it('should create and save Permissions', async () => {
    const nbButtonsBeforeCreate = await permissionComponentsPage.countDeleteButtons();

    await permissionComponentsPage.clickOnCreateButton();
    await promise.all([
      permissionUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      permissionUpdatePage.setDateUpdatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      permissionUpdatePage.setCreatedByInput('createdBy'),
      permissionUpdatePage.setUpdatedByInput('updatedBy'),
      permissionUpdatePage.menuSelectLastOption(),
      permissionUpdatePage.operationSelectLastOption()
    ]);
    expect(await permissionUpdatePage.getDateCreatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateCreated value to be equals to 2000-12-31'
    );
    expect(await permissionUpdatePage.getDateUpdatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateUpdated value to be equals to 2000-12-31'
    );
    expect(await permissionUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await permissionUpdatePage.getUpdatedByInput()).to.eq('updatedBy', 'Expected UpdatedBy value to be equals to updatedBy');
    const selectedIsDeleted = permissionUpdatePage.getIsDeletedInput();
    if (await selectedIsDeleted.isSelected()) {
      await permissionUpdatePage.getIsDeletedInput().click();
      expect(await permissionUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted not to be selected').to.be.false;
    } else {
      await permissionUpdatePage.getIsDeletedInput().click();
      expect(await permissionUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted to be selected').to.be.true;
    }
    await permissionUpdatePage.save();
    expect(await permissionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await permissionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Permission', async () => {
    const nbButtonsBeforeDelete = await permissionComponentsPage.countDeleteButtons();
    await permissionComponentsPage.clickOnLastDeleteButton();

    permissionDeleteDialog = new PermissionDeleteDialog();
    expect(await permissionDeleteDialog.getDialogTitle()).to.eq('eGpApp.userManagementPermission.delete.question');
    await permissionDeleteDialog.clickOnConfirmButton();

    expect(await permissionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
