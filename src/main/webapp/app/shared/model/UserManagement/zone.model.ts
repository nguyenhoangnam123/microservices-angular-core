import { Moment } from 'moment';
import { IMenuZone } from 'app/shared/model/UserManagement/menu-zone.model';

export interface IZone {
  id?: number;
  code?: string;
  name?: string;
  dateCreated?: Moment;
  dateUpdated?: Moment;
  createdBy?: string;
  updatedBy?: string;
  isDeleted?: boolean;
  menuZones?: IMenuZone[];
}

export class Zone implements IZone {
  constructor(
    public id?: number,
    public code?: string,
    public name?: string,
    public dateCreated?: Moment,
    public dateUpdated?: Moment,
    public createdBy?: string,
    public updatedBy?: string,
    public isDeleted?: boolean,
    public menuZones?: IMenuZone[]
  ) {
    this.isDeleted = this.isDeleted || false;
  }
}
