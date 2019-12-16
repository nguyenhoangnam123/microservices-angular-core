import { Moment } from 'moment';
import { IPermission } from 'app/shared/model/UserManagement/permission.model';

export interface IOperation {
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
}

export class Operation implements IOperation {
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
    public permissions?: IPermission[]
  ) {
    this.isDeleted = this.isDeleted || false;
  }
}
