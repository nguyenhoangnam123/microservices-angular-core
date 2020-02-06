export class MenuItem {
  id: number;
  code: string;
  name: string;
  description: string;
  menuIconCss: string;
  url: string;
  path: string;
  parentId: number;
  displayOrder: number;
  isShow: boolean;
  isDeleted: boolean;
  createdBy: string;
  createdDate: Date;
  updatedBy: string;
  dateUpdated?: Date;

  clear(): void {
    this.id = undefined;
    this.code = '';
    this.name = '';
    this.description = '';
    this.menuIconCss = '';
    this.url = '';
    this.path = '';
    this.parentId = undefined;
    this.displayOrder = undefined;
    this.isShow = false;
    this.isDeleted = false;
  }
}
