import { element, by, ElementFinder } from 'protractor';

export class MenuZoneComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-menu-zone div table .btn-danger'));
  title = element.all(by.css('jhi-menu-zone div h2#page-heading span')).first();

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

export class MenuZoneUpdatePage {
  pageTitle = element(by.id('jhi-menu-zone-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  dateCreatedInput = element(by.id('field_dateCreated'));
  dateUpdatedInput = element(by.id('field_dateUpdated'));
  createdByInput = element(by.id('field_createdBy'));
  updatedByInput = element(by.id('field_updatedBy'));
  isDeletedInput = element(by.id('field_isDeleted'));
  rolesSelect = element(by.id('field_roles'));
  menuSelect = element(by.id('field_menu'));
  zoneSelect = element(by.id('field_zone'));

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

  async zoneSelectLastOption(timeout?: number) {
    await this.zoneSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async zoneSelectOption(option) {
    await this.zoneSelect.sendKeys(option);
  }

  getZoneSelect(): ElementFinder {
    return this.zoneSelect;
  }

  async getZoneSelectedOption() {
    return await this.zoneSelect.element(by.css('option:checked')).getText();
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

export class MenuZoneDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-menuZone-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-menuZone'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
