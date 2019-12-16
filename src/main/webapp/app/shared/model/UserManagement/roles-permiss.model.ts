import { Moment } from 'moment';
import { IRoles } from 'app/shared/model/UserManagement/roles.model';
import { IPermission } from 'app/shared/model/UserManagement/permission.model';

export interface IRolesPermiss {
  id?: number;
  value?: number;
  dateCreated?: Moment;
  dateUpdated?: Moment;
  createdBy?: string;
  updatedBy?: string;
  isDeleted?: boolean;
  roles?: IRoles;
  permission?: IPermission;
}

export class RolesPermiss implements IRolesPermiss {
  constructor(
    public id?: number,
    public value?: number,
    public dateCreated?: Moment,
    public dateUpdated?: Moment,
    public createdBy?: string,
    public updatedBy?: string,
    public isDeleted?: boolean,
    public roles?: IRoles,
    public permission?: IPermission
  ) {
    this.isDeleted = this.isDeleted || false;
  }
}
