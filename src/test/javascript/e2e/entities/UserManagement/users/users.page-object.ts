import { element, by, ElementFinder } from 'protractor';

export class UsersComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-users div table .btn-danger'));
  title = element.all(by.css('jhi-users div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class UsersUpdatePage {
  pageTitle = element(by.id('jhi-users-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  organizationUnitIdInput = element(by.id('field_organizationUnitId'));
  emailInput = element(by.id('field_email'));
  passwordHashInput = element(by.id('field_passwordHash'));
  securityStampInput = element(by.id('field_securityStamp'));
  phoneNumberInput = element(by.id('field_phoneNumber'));
  jobTitleInput = element(by.id('field_jobTitle'));
  officeTelInput = element(by.id('field_officeTel'));
  userNameInput = element(by.id('field_userName'));
  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));
  isActiveInput = element(by.id('field_isActive'));
  dateCreatedInput = element(by.id('field_dateCreated'));
  dateUpdatedInput = element(by.id('field_dateUpdated'));
  createdByInput = element(by.id('field_createdBy'));
  updatedByInput = element(by.id('field_updatedBy'));
  isDeletedInput = element(by.id('field_isDeleted'));
  pictureIdInput = element(by.id('field_pictureId'));
  isOnlineInput = element(by.id('field_isOnline'));
  dateOnlineUpdatedInput = element(by.id('field_dateOnlineUpdated'));
  dateOfflineUpdatedInput = element(by.id('field_dateOfflineUpdated'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setOrganizationUnitIdInput(organizationUnitId) {
    await this.organizationUnitIdInput.sendKeys(organizationUnitId);
  }

  async getOrganizationUnitIdInput() {
    return await this.organizationUnitIdInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return await this.emailInput.getAttribute('value');
  }

  async setPasswordHashInput(passwordHash) {
    await this.passwordHashInput.sendKeys(passwordHash);
  }

  async getPasswordHashInput() {
    return await this.passwordHashInput.getAttribute('value');
  }

  async setSecurityStampInput(securityStamp) {
    await this.securityStampInput.sendKeys(securityStamp);
  }

  async getSecurityStampInput() {
    return await this.securityStampInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return await this.phoneNumberInput.getAttribute('value');
  }

  async setJobTitleInput(jobTitle) {
    await this.jobTitleInput.sendKeys(jobTitle);
  }

  async getJobTitleInput() {
    return await this.jobTitleInput.getAttribute('value');
  }

  async setOfficeTelInput(officeTel) {
    await this.officeTelInput.sendKeys(officeTel);
  }

  async getOfficeTelInput() {
    return await this.officeTelInput.getAttribute('value');
  }

  async setUserNameInput(userName) {
    await this.userNameInput.sendKeys(userName);
  }

  async getUserNameInput() {
    return await this.userNameInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  getIsActiveInput(timeout?: number) {
    return this.isActiveInput;
  }
  async setDateCreatedInput(dateCreated) {
    await this.dateCreatedInput.sendKeys(dateCreated);
  }

  async getDateCreatedInput() {
    return await this.dateCreatedInput.getAttribute('value');
  }

  async setDateUpdatedInput(dateUpdated) {
    await this.dateUpdatedInput.sendKeys(dateUpdated);
  }

  async getDateUpdatedInput() {
    return await this.dateUpdatedInput.getAttribute('value');
  }

  async setCreatedByInput(createdBy) {
    await this.createdByInput.sendKeys(createdBy);
  }

  async getCreatedByInput() {
    return await this.createdByInput.getAttribute('value');
  }

  async setUpdatedByInput(updatedBy) {
    await this.updatedByInput.sendKeys(updatedBy);
  }

  async getUpdatedByInput() {
    return await this.updatedByInput.getAttribute('value');
  }

  getIsDeletedInput(timeout?: number) {
    return this.isDeletedInput;
  }
  async setPictureIdInput(pictureId) {
    await this.pictureIdInput.sendKeys(pictureId);
  }

  async getPictureIdInput() {
    return await this.pictureIdInput.getAttribute('value');
  }

  getIsOnlineInput(timeout?: number) {
    return this.isOnlineInput;
  }
  async setDateOnlineUpdatedInput(dateOnlineUpdated) {
    await this.dateOnlineUpdatedInput.sendKeys(dateOnlineUpdated);
  }

  async getDateOnlineUpdatedInput() {
    return await this.dateOnlineUpdatedInput.getAttribute('value');
  }

  async setDateOfflineUpdatedInput(dateOfflineUpdated) {
    await this.dateOfflineUpdatedInput.sendKeys(dateOfflineUpdated);
  }

  async getDateOfflineUpdatedInput() {
    return await this.dateOfflineUpdatedInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class UsersDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-users-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-users'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
