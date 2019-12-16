import { element, by, ElementFinder } from 'protractor';

export class RolesPermissComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-roles-permiss div table .btn-danger'));
  title = element.all(by.css('jhi-roles-permiss div h2#page-heading span')).first();

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

export class RolesPermissUpdatePage {
  pageTitle = element(by.id('jhi-roles-permiss-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  valueInput = element(by.id('field_value'));
  dateCreatedInput = element(by.id('field_dateCreated'));
  dateUpdatedInput = element(by.id('field_dateUpdated'));
  createdByInput = element(by.id('field_createdBy'));
  updatedByInput = element(by.id('field_updatedBy'));
  isDeletedInput = element(by.id('field_isDeleted'));
  rolesSelect = element(by.id('field_roles'));
  permissionSelect = element(by.id('field_permission'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setValueInput(value) {
    await this.valueInput.sendKeys(value);
  }

  async getValueInput() {
    return await this.valueInput.getAttribute('value');
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

  async rolesSelectLastOption(timeout?: number) {
    await this.rolesSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async rolesSelectOption(option) {
    await this.rolesSelect.sendKeys(option);
  }

  getRolesSelect(): ElementFinder {
    return this.rolesSelect;
  }

  async getRolesSelectedOption() {
    return await this.rolesSelect.element(by.css('option:checked')).getText();
  }

  async permissionSelectLastOption(timeout?: number) {
    await this.permissionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async permissionSelectOption(option) {
    await this.permissionSelect.sendKeys(option);
  }

  getPermissionSelect(): ElementFinder {
    return this.permissionSelect;
  }

  async getPermissionSelectedOption() {
    return await this.permissionSelect.element(by.css('option:checked')).getText();
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

export class RolesPermissDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-rolesPermiss-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-rolesPermiss'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
