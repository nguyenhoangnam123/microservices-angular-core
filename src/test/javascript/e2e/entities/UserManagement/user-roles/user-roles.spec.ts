// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserRolesComponentsPage, UserRolesDeleteDialog, UserRolesUpdatePage } from './user-roles.page-object';

const expect = chai.expect;

describe('UserRoles e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userRolesComponentsPage: UserRolesComponentsPage;
  let userRolesUpdatePage: UserRolesUpdatePage;
  let userRolesDeleteDialog: UserRolesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserRoles', async () => {
    await navBarPage.goToEntity('user-roles');
    userRolesComponentsPage = new UserRolesComponentsPage();
    await browser.wait(ec.visibilityOf(userRolesComponentsPage.title), 5000);
    expect(await userRolesComponentsPage.getTitle()).to.eq('eGpApp.userManagementUserRoles.home.title');
  });

  it('should load create UserRoles page', async () => {
    await userRolesComponentsPage.clickOnCreateButton();
    userRolesUpdatePage = new UserRolesUpdatePage();
    expect(await userRolesUpdatePage.getPageTitle()).to.eq('eGpApp.userManagementUserRoles.home.createOrEditLabel');
    await userRolesUpdatePage.cancel();
  });

  it('should create and save UserRoles', async () => {
    const nbButtonsBeforeCreate = await userRolesComponentsPage.countDeleteButtons();

    await userRolesComponentsPage.clickOnCreateButton();
    await promise.all([
      userRolesUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      userRolesUpdatePage.setDateUpdatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      userRolesUpdatePage.setCreatedByInput('createdBy'),
      userRolesUpdatePage.setUpdatedByInput('updatedBy'),
      userRolesUpdatePage.usersSelectLastOption(),
      userRolesUpdatePage.rolesSelectLastOption()
    ]);
    expect(await userRolesUpdatePage.getDateCreatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateCreated value to be equals to 2000-12-31'
    );
    expect(await userRolesUpdatePage.getDateUpdatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateUpdated value to be equals to 2000-12-31'
    );
    expect(await userRolesUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await userRolesUpdatePage.getUpdatedByInput()).to.eq('updatedBy', 'Expected UpdatedBy value to be equals to updatedBy');
    const selectedIsDeleted = userRolesUpdatePage.getIsDeletedInput();
    if (await selectedIsDeleted.isSelected()) {
      await userRolesUpdatePage.getIsDeletedInput().click();
      expect(await userRolesUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted not to be selected').to.be.false;
    } else {
      await userRolesUpdatePage.getIsDeletedInput().click();
      expect(await userRolesUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted to be selected').to.be.true;
    }
    await userRolesUpdatePage.save();
    expect(await userRolesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await userRolesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last UserRoles', async () => {
    const nbButtonsBeforeDelete = await userRolesComponentsPage.countDeleteButtons();
    await userRolesComponentsPage.clickOnLastDeleteButton();

    userRolesDeleteDialog = new UserRolesDeleteDialog();
    expect(await userRolesDeleteDialog.getDialogTitle()).to.eq('eGpApp.userManagementUserRoles.delete.question');
    await userRolesDeleteDialog.clickOnConfirmButton();

    expect(await userRolesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
