import { Moment } from 'moment';
import { IUserRoles } from 'app/shared/model/UserManagement/user-roles.model';
import { IRolesPermiss } from 'app/shared/model/UserManagement/roles-permiss.model';
import { IMenuZone } from 'app/shared/model/UserManagement/menu-zone.model';

export interface IRoles {
  id?: number;
  code?: string;
  name?: string;
  note?: string;
  dateCreated?: Moment;
  dateUpdated?: Moment;
  createdBy?: string;
  updatedBy?: string;
  isDeleted?: boolean;
  isActive?: boolean;
  userRoles?: IUserRoles[];
  rolesPermisses?: IRolesPermiss[];
  menuZones?: IMenuZone[];
}

export class Roles implements IRoles {
  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
    public note?: string,
    public dateCreated?: Moment,
    public dateUpdated?: Moment,
    public createdBy?: string,
    public updatedBy?: string,
    public isDeleted?: boolean,
    public isActive?: boolean,
    public userRoles?: IUserRoles[],
    public rolesPermisses?: IRolesPermiss[],
    public menuZones?: IMenuZone[]
  ) {
    this.isDeleted = this.isDeleted || false;
    this.isActive = this.isActive || false;
  }
}
