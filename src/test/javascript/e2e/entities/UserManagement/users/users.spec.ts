// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UsersComponentsPage, UsersDeleteDialog, UsersUpdatePage } from './users.page-object';

const expect = chai.expect;

describe('Users e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let usersComponentsPage: UsersComponentsPage;
  let usersUpdatePage: UsersUpdatePage;
  let usersDeleteDialog: UsersDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Users', async () => {
    await navBarPage.goToEntity('users');
    usersComponentsPage = new UsersComponentsPage();
    await browser.wait(ec.visibilityOf(usersComponentsPage.title), 5000);
    expect(await usersComponentsPage.getTitle()).to.eq('eGpApp.userManagementUsers.home.title');
  });

  it('should load create Users page', async () => {
    await usersComponentsPage.clickOnCreateButton();
    usersUpdatePage = new UsersUpdatePage();
    expect(await usersUpdatePage.getPageTitle()).to.eq('eGpApp.userManagementUsers.home.createOrEditLabel');
    await usersUpdatePage.cancel();
  });

  it('should create and save Users', async () => {
    const nbButtonsBeforeCreate = await usersComponentsPage.countDeleteButtons();

    await usersComponentsPage.clickOnCreateButton();
    await promise.all([
      usersUpdatePage.setOrganizationUnitIdInput('5'),
      usersUpdatePage.setEmailInput('email'),
      usersUpdatePage.setPasswordHashInput('passwordHash'),
      usersUpdatePage.setSecurityStampInput('securityStamp'),
      usersUpdatePage.setPhoneNumberInput('phoneNumber'),
      usersUpdatePage.setJobTitleInput('jobTitle'),
      usersUpdatePage.setOfficeTelInput('officeTel'),
      usersUpdatePage.setUserNameInput('userName'),
      usersUpdatePage.setNameInput('name'),
      usersUpdatePage.setDescriptionInput('description'),
      usersUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      usersUpdatePage.setDateUpdatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      usersUpdatePage.setCreatedByInput('createdBy'),
      usersUpdatePage.setUpdatedByInput('updatedBy'),
      usersUpdatePage.setPictureIdInput('5'),
      usersUpdatePage.setDateOnlineUpdatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      usersUpdatePage.setDateOfflineUpdatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);
    expect(await usersUpdatePage.getOrganizationUnitIdInput()).to.eq('5', 'Expected organizationUnitId value to be equals to 5');
    expect(await usersUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await usersUpdatePage.getPasswordHashInput()).to.eq('passwordHash', 'Expected PasswordHash value to be equals to passwordHash');
    expect(await usersUpdatePage.getSecurityStampInput()).to.eq(
      'securityStamp',
      'Expected SecurityStamp value to be equals to securityStamp'
    );
    expect(await usersUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');
    expect(await usersUpdatePage.getJobTitleInput()).to.eq('jobTitle', 'Expected JobTitle value to be equals to jobTitle');
    expect(await usersUpdatePage.getOfficeTelInput()).to.eq('officeTel', 'Expected OfficeTel value to be equals to officeTel');
    expect(await usersUpdatePage.getUserNameInput()).to.eq('userName', 'Expected UserName value to be equals to userName');
    expect(await usersUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await usersUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    const selectedIsActive = usersUpdatePage.getIsActiveInput();
    if (await selectedIsActive.isSelected()) {
      await usersUpdatePage.getIsActiveInput().click();
      expect(await usersUpdatePage.getIsActiveInput().isSelected(), 'Expected isActive not to be selected').to.be.false;
    } else {
      await usersUpdatePage.getIsActiveInput().click();
      expect(await usersUpdatePage.getIsActiveInput().isSelected(), 'Expected isActive to be selected').to.be.true;
    }
    expect(await usersUpdatePage.getDateCreatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateCreated value to be equals to 2000-12-31'
    );
    expect(await usersUpdatePage.getDateUpdatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateUpdated value to be equals to 2000-12-31'
    );
    expect(await usersUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await usersUpdatePage.getUpdatedByInput()).to.eq('updatedBy', 'Expected UpdatedBy value to be equals to updatedBy');
    const selectedIsDeleted = usersUpdatePage.getIsDeletedInput();
    if (await selectedIsDeleted.isSelected()) {
      await usersUpdatePage.getIsDeletedInput().click();
      expect(await usersUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted not to be selected').to.be.false;
    } else {
      await usersUpdatePage.getIsDeletedInput().click();
      expect(await usersUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted to be selected').to.be.true;
    }
    expect(await usersUpdatePage.getPictureIdInput()).to.eq('5', 'Expected pictureId value to be equals to 5');
    const selectedIsOnline = usersUpdatePage.getIsOnlineInput();
    if (await selectedIsOnline.isSelected()) {
      await usersUpdatePage.getIsOnlineInput().click();
      expect(await usersUpdatePage.getIsOnlineInput().isSelected(), 'Expected isOnline not to be selected').to.be.false;
    } else {
      await usersUpdatePage.getIsOnlineInput().click();
      expect(await usersUpdatePage.getIsOnlineInput().isSelected(), 'Expected isOnline to be selected').to.be.true;
    }
    expect(await usersUpdatePage.getDateOnlineUpdatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateOnlineUpdated value to be equals to 2000-12-31'
    );
    expect(await usersUpdatePage.getDateOfflineUpdatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateOfflineUpdated value to be equals to 2000-12-31'
    );
    await usersUpdatePage.save();
    expect(await usersUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await usersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Users', async () => {
    const nbButtonsBeforeDelete = await usersComponentsPage.countDeleteButtons();
    await usersComponentsPage.clickOnLastDeleteButton();

    usersDeleteDialog = new UsersDeleteDialog();
    expect(await usersDeleteDialog.getDialogTitle()).to.eq('eGpApp.userManagementUsers.delete.question');
    await usersDeleteDialog.clickOnConfirmButton();

    expect(await usersComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
