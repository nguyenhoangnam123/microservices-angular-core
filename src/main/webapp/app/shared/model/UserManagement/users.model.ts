import { Moment } from 'moment';
import { IUserRoles } from 'app/shared/model/UserManagement/user-roles.model';

export interface IUsers {
  id?: number;
  organizationUnitId?: number;
  email?: string;
  passwordHash?: string;
  securityStamp?: string;
  phoneNumber?: string;
  jobTitle?: string;
  officeTel?: string;
  userName?: string;
  name?: string;
  description?: string;
  isActive?: boolean;
  dateCreated?: Moment;
  dateUpdated?: Moment;
  createdBy?: string;
  updatedBy?: string;
  isDeleted?: boolean;
  pictureId?: number;
  isOnline?: boolean;
  dateOnlineUpdated?: Moment;
  dateOfflineUpdated?: Moment;
  userRoles?: IUserRoles[];
}

export class Users implements IUsers {
  constructor(
    public id?: number,
    public organizationUnitId?: number,
    public email?: string,
    public passwordHash?: string,
    public securityStamp?: string,
    public phoneNumber?: string,
    public jobTitle?: string,
    public officeTel?: string,
    public userName?: string,
    public name?: string,
    public description?: string,
    public isActive?: boolean,
    public dateCreated?: Moment,
    public dateUpdated?: Moment,
    public createdBy?: string,
    public updatedBy?: string,
    public isDeleted?: boolean,
    public pictureId?: number,
    public isOnline?: boolean,
    public dateOnlineUpdated?: Moment,
    public dateOfflineUpdated?: Moment,
    public userRoles?: IUserRoles[]
  ) {
    this.isActive = this.isActive || false;
    this.isDeleted = this.isDeleted || false;
    this.isOnline = this.isOnline || false;
  }
}
