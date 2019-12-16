import { Moment } from 'moment';
import { IRolesPermiss } from 'app/shared/model/UserManagement/roles-permiss.model';
import { IMenu } from 'app/shared/model/UserManagement/menu.model';
import { IOperation } from 'app/shared/model/UserManagement/operation.model';

export interface IPermission {
  id?: number;
  dateCreated?: Moment;
  dateUpdated?: Moment;
  createdBy?: string;
  updatedBy?: string;
  isDeleted?: boolean;
  rolesPermisses?: IRolesPermiss[];
  menu?: IMenu;
  operation?: IOperation;
}

export class Permission implements IPermission {
  constructor(
    public id?: number,
    public dateCreated?: Moment,
    public dateUpdated?: Moment,
    public createdBy?: string,
    public updatedBy?: string,
    public isDeleted?: boolean,
    public rolesPermisses?: IRolesPermiss[],
    public menu?: IMenu,
    public operation?: IOperation
  ) {
    this.isDeleted = this.isDeleted || false;
  }
}
