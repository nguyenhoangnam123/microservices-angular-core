import { Base, IBase } from '../../../core/_base/crud/models/eGP-models/_base.model';

export interface IZone extends IBase {
  id?: number;
  code?: string;
  name?: string;
}
export class Zone extends Base implements IZone {
  constructor();
  constructor(public id?: number, public code?: string, public name?: string) {
    super();
    this.id = id;
    this.code = code || '';
    this.name = name || '';
  }

  clear(): void {}
}
