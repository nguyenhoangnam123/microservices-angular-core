import { Moment } from 'moment';
import { IRoles } from 'app/shared/model/UserManagement/roles.model';
import { IMenu } from 'app/shared/model/UserManagement/menu.model';
import { IZone } from 'app/shared/model/UserManagement/zone.model';

export interface IMenuZone {
  id?: number;
  dateCreated?: Moment;
  dateUpdated?: Moment;
  createdBy?: string;
  updatedBy?: string;
  isDeleted?: boolean;
  roles?: IRoles[];
  menu?: IMenu;
  zone?: IZone;
}

export class MenuZone implements IMenuZone {
  constructor(
    public id?: number,
    public dateCreated?: Moment,
    public dateUpdated?: Moment,
    public createdBy?: string,
    public updatedBy?: string,
    public isDeleted?: boolean,
    public roles?: IRoles[],
    public menu?: IMenu,
    public zone?: IZone
  ) {
    this.isDeleted = this.isDeleted || false;
  }
}
