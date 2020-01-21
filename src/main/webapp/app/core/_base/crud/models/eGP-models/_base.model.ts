import { Moment } from 'moment';

export interface IBase {
  dateCreated?: Moment;
  dateUpdated?: Moment;
  createdBy?: string;
  updatedBy?: string;
  isDeleted?: boolean;
}

export abstract class Base implements IBase {
  constructor();
  constructor(
    public dateCreated?: Moment,
    public dateUpdated?: Moment,
    public createdBy?: string,
    public updatedBy?: string,
    public isDeleted?: boolean
  ) {
    this.dateCreated = dateCreated;
    this.dateUpdated = dateUpdated;
    this.createdBy = createdBy || '';
    this.updatedBy = updatedBy || '';
    this.isDeleted = isDeleted || false;
  }

  abstract clear(): void;
}
