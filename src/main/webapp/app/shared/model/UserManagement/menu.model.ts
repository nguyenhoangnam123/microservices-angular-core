import { Moment } from 'moment';
import { IPermission } from 'app/shared/model/UserManagement/permission.model';
import { IMenuZone } from 'app/shared/model/UserManagement/menu-zone.model';

export interface IMenu {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  dateCreated?: Moment;
  dateUpdated?: Moment;
  createdBy?: string;
  updatedBy?: string;
  isDeleted?: boolean;
  permissions?: IPermission[];
  menuZones?: IMenuZone[];
}

export class Menu implements IMenu {
  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
    public description?: string,
    public dateCreated?: Moment,
    public dateUpdated?: Moment,
    public createdBy?: string,
    public updatedBy?: string,
    public isDeleted?: boolean,
    public permissions?: IPermission[],
    public menuZones?: IMenuZone[]
  ) {
    this.isDeleted = this.isDeleted || false;
  }
}
