// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MenuComponentsPage, MenuDeleteDialog, MenuUpdatePage } from './menu.page-object';

const expect = chai.expect;

describe('Menu e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let menuComponentsPage: MenuComponentsPage;
  let menuUpdatePage: MenuUpdatePage;
  let menuDeleteDialog: MenuDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Menus', async () => {
    await navBarPage.goToEntity('menu');
    menuComponentsPage = new MenuComponentsPage();
    await browser.wait(ec.visibilityOf(menuComponentsPage.title), 5000);
    expect(await menuComponentsPage.getTitle()).to.eq('eGpApp.userManagementMenu.home.title');
  });

  it('should load create Menu page', async () => {
    await menuComponentsPage.clickOnCreateButton();
    menuUpdatePage = new MenuUpdatePage();
    expect(await menuUpdatePage.getPageTitle()).to.eq('eGpApp.userManagementMenu.home.createOrEditLabel');
    await menuUpdatePage.cancel();
  });

  it('should create and save Menus', async () => {
    const nbButtonsBeforeCreate = await menuComponentsPage.countDeleteButtons();

    await menuComponentsPage.clickOnCreateButton();
    await promise.all([
      menuUpdatePage.setCodeInput('code'),
      menuUpdatePage.setNameInput('name'),
      menuUpdatePage.setDescriptionInput('description'),
      menuUpdatePage.setDateCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      menuUpdatePage.setDateUpdatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      menuUpdatePage.setCreatedByInput('createdBy'),
      menuUpdatePage.setUpdatedByInput('updatedBy')
    ]);
    expect(await menuUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await menuUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await menuUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await menuUpdatePage.getDateCreatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateCreated value to be equals to 2000-12-31'
    );
    expect(await menuUpdatePage.getDateUpdatedInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateUpdated value to be equals to 2000-12-31'
    );
    expect(await menuUpdatePage.getCreatedByInput()).to.eq('createdBy', 'Expected CreatedBy value to be equals to createdBy');
    expect(await menuUpdatePage.getUpdatedByInput()).to.eq('updatedBy', 'Expected UpdatedBy value to be equals to updatedBy');
    const selectedIsDeleted = menuUpdatePage.getIsDeletedInput();
    if (await selectedIsDeleted.isSelected()) {
      await menuUpdatePage.getIsDeletedInput().click();
      expect(await menuUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted not to be selected').to.be.false;
    } else {
      await menuUpdatePage.getIsDeletedInput().click();
      expect(await menuUpdatePage.getIsDeletedInput().isSelected(), 'Expected isDeleted to be selected').to.be.true;
    }
    await menuUpdatePage.save();
    expect(await menuUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await menuComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Menu', async () => {
    const nbButtonsBeforeDelete = await menuComponentsPage.countDeleteButtons();
    await menuComponentsPage.clickOnLastDeleteButton();

    menuDeleteDialog = new MenuDeleteDialog();
    expect(await menuDeleteDialog.getDialogTitle()).to.eq('eGpApp.userManagementMenu.delete.question');
    await menuDeleteDialog.clickOnConfirmButton();

    expect(await menuComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
