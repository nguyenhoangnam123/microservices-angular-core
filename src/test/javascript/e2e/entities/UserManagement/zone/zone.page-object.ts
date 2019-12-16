import { element, by, ElementFinder } from 'protractor';

export class ZoneComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-zone div table .btn-danger'));
  title = element.all(by.css('jhi-zone div h2#page-heading span')).first();

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

export class ZoneUpdatePage {
  pageTitle = element(by.id('jhi-zone-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  codeInput = element(by.id('field_code'));
  nameInput = element(by.id('field_name'));
  dateCreatedInput = element(by.id('field_dateCreated'));
  dateUpdatedInput = element(by.id('field_dateUpdated'));
  createdByInput = element(by.id('field_createdBy'));
  updatedByInput = element(by.id('field_updatedBy'));
  isDeletedInput = element(by.id('field_isDeleted'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return await this.codeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
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

export class ZoneDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-zone-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-zone'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
