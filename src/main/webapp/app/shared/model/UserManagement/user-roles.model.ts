import { Moment } from 'moment';
import { IUsers } from 'app/shared/model/UserManagement/users.model';
import { IRoles } from 'app/shared/model/UserManagement/roles.model';

export interface IUserRoles {
  id?: number;
  dateCreated?: Moment;
  dateUpdated?: Moment;
  createdBy?: string;
  updatedBy?: string;
  isDeleted?: boolean;
  users?: IUsers;
  roles?: IRoles;
}

export class UserRoles implements IUserRoles {
  constructor(
    public id?: number,
    public dateCreated?: Moment,
    public dateUpdated?: Moment,
    public createdBy?: string,
    public updatedBy?: string,
    public isDeleted?: boolean,
    public users?: IUsers,
    public roles?: IRoles
  ) {
    this.isDeleted = this.isDeleted || false;
  }
}
