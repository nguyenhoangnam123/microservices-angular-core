import { element, by, ElementFinder } from 'protractor';

export class PermissionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-permission div table .btn-danger'));
  title = element.all(by.css('jhi-permission div h2#page-heading span')).first();

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

export class PermissionUpdatePage {
  pageTitle = element(by.id('jhi-permission-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dateCreatedInput = element(by.id('field_dateCreated'));
  dateUpdatedInput = element(by.id('field_dateUpdated'));
  createdByInput = element(by.id('field_createdBy'));
  updatedByInput = element(by.id('field_updatedBy'));
  isDeletedInput = element(by.id('field_isDeleted'));
  menuSelect = element(by.id('field_menu'));
  operationSelect = element(by.id('field_operation'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
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

  async menuSelectLastOption(timeout?: number) {
    await this.menuSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async menuSelectOption(option) {
    await this.menuSelect.sendKeys(option);
  }

  getMenuSelect(): ElementFinder {
    return this.menuSelect;
  }

  async getMenuSelectedOption() {
    return await this.menuSelect.element(by.css('option:checked')).getText();
  }

  async operationSelectLastOption(timeout?: number) {
    await this.operationSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async operationSelectOption(option) {
    await this.operationSelect.sendKeys(option);
  }

  getOperationSelect(): ElementFinder {
    return this.operationSelect;
  }

  async getOperationSelectedOption() {
    return await this.operationSelect.element(by.css('option:checked')).getText();
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

export class PermissionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-permission-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-permission'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
