// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RolesComponentsPage, RolesDeleteDialog, RolesUpdatePage } from './roles.page-object';

const expect = chai.expect;

describe('Roles e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let rolesComponentsPage: RolesComponentsPage;
  let rolesUpdatePage: RolesUpdatePage;
  let rolesDeleteDialog: RolesDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Roles', async () => {
    await navBarPage.goToEntity('roles');
    rolesComponentsPage = new RolesComponentsPage();
    await browser.wait(ec.visibilityOf(rolesComponentsPage.title), 5000);
    expect(await rolesComponentsPage.getTitle()).to.eq('eGpApp.userManagementRoles.home.title');
  });

  it('should load create Roles page', async () => {
    await rolesComponentsPage.clickOnCreateButton();
    rolesUpdatePage = new RolesUpdatePage();
    expect(await rolesUpdatePage.getPageTitle()).to.eq('eGpApp.userManagementRoles.home.createOrEditLabel');
    await rolesUpdatePage.cancel();
  });

  it('should create and save Roles', async () => {
    const nbButtonsBeforeCreate = await rolesComponentsPage.countDeleteButtons();

    await rolesComponentsPage.clickOnCreateButton();
    await promise.all([
      rolesUpdatePage.setCodeInput('code'),
      rolesUpdatePage.setNameInput('name'),
      rolesUpdatePage.setNoteInput('note'),
      rolesUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      rolesUpdatePage.setDateUpdatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      rolesUpdatePage.setCreatedByInput('createdBy'),
      rolesUpdatePage.setUpdatedByInput('updatedBy')
    ]);
    expect(await rolesUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await rolesUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await rolesUpdatePage.getNoteInput()).to.eq('note', 'Expected Note value to be equals to note');
    expect(await rolesUpdatePage.getDateCreatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateCreated value to be equals to 2000-12-31'
    );
    expect(await rolesUpdatePage.getDateUpdatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateUpdated value to be equals to 2000-12-31'
    );
    expect(await rolesUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await rolesUpdatePage.getUpdatedByInput()).to.eq('updatedBy', 'Expected UpdatedBy value to be equals to updatedBy');
    const selectedIsDeleted = rolesUpdatePage.getIsDeletedInput();
    if (await selectedIsDeleted.isSelected()) {
      await rolesUpdatePage.getIsDeletedInput().click();
      expect(await rolesUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted not to be selected').to.be.false;
    } else {
      await rolesUpdatePage.getIsDeletedInput().click();
      expect(await rolesUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted to be selected').to.be.true;
    }
    const selectedIsActive = rolesUpdatePage.getIsActiveInput();
    if (await selectedIsActive.isSelected()) {
      await rolesUpdatePage.getIsActiveInput().click();
      expect(await rolesUpdatePage.getIsActiveInput().isSelected(), 'Expected isActive not to be selected').to.be.false;
    } else {
      await rolesUpdatePage.getIsActiveInput().click();
      expect(await rolesUpdatePage.getIsActiveInput().isSelected(), 'Expected isActive to be selected').to.be.true;
    }
    await rolesUpdatePage.save();
    expect(await rolesUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await rolesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Roles', async () => {
    const nbButtonsBeforeDelete = await rolesComponentsPage.countDeleteButtons();
    await rolesComponentsPage.clickOnLastDeleteButton();

    rolesDeleteDialog = new RolesDeleteDialog();
    expect(await rolesDeleteDialog.getDialogTitle()).to.eq('eGpApp.userManagementRoles.delete.question');
    await rolesDeleteDialog.clickOnConfirmButton();

    expect(await rolesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
