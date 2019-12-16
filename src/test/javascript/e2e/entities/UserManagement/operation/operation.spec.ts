// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OperationComponentsPage, OperationDeleteDialog, OperationUpdatePage } from './operation.page-object';

const expect = chai.expect;

describe('Operation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let operationComponentsPage: OperationComponentsPage;
  let operationUpdatePage: OperationUpdatePage;
  let operationDeleteDialog: OperationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Operations', async () => {
    await navBarPage.goToEntity('operation');
    operationComponentsPage = new OperationComponentsPage();
    await browser.wait(ec.visibilityOf(operationComponentsPage.title), 5000);
    expect(await operationComponentsPage.getTitle()).to.eq('eGpApp.userManagementOperation.home.title');
  });

  it('should load create Operation page', async () => {
    await operationComponentsPage.clickOnCreateButton();
    operationUpdatePage = new OperationUpdatePage();
    expect(await operationUpdatePage.getPageTitle()).to.eq('eGpApp.userManagementOperation.home.createOrEditLabel');
    await operationUpdatePage.cancel();
  });

  it('should create and save Operations', async () => {
    const nbButtonsBeforeCreate = await operationComponentsPage.countDeleteButtons();

    await operationComponentsPage.clickOnCreateButton();
    await promise.all([
      operationUpdatePage.setCodeInput('code'),
      operationUpdatePage.setNameInput('name'),
      operationUpdatePage.setDescriptionInput('description'),
      operationUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      operationUpdatePage.setDateUpdatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      operationUpdatePage.setCreatedByInput('createdBy'),
      operationUpdatePage.setUpdatedByInput('updatedBy')
    ]);
    expect(await operationUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await operationUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await operationUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await operationUpdatePage.getDateCreatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateCreated value to be equals to 2000-12-31'
    );
    expect(await operationUpdatePage.getDateUpdatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateUpdated value to be equals to 2000-12-31'
    );
    expect(await operationUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await operationUpdatePage.getUpdatedByInput()).to.eq('updatedBy', 'Expected UpdatedBy value to be equals to updatedBy');
    const selectedIsDeleted = operationUpdatePage.getIsDeletedInput();
    if (await selectedIsDeleted.isSelected()) {
      await operationUpdatePage.getIsDeletedInput().click();
      expect(await operationUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted not to be selected').to.be.false;
    } else {
      await operationUpdatePage.getIsDeletedInput().click();
      expect(await operationUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted to be selected').to.be.true;
    }
    await operationUpdatePage.save();
    expect(await operationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await operationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Operation', async () => {
    const nbButtonsBeforeDelete = await operationComponentsPage.countDeleteButtons();
    await operationComponentsPage.clickOnLastDeleteButton();

    operationDeleteDialog = new OperationDeleteDialog();
    expect(await operationDeleteDialog.getDialogTitle()).to.eq('eGpApp.userManagementOperation.delete.question');
    await operationDeleteDialog.clickOnConfirmButton();

    expect(await operationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
