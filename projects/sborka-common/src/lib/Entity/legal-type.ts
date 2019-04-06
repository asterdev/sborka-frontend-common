import {ObjectWithId} from './object-with-id';
import {LegalTypeEnum} from './legal-type-enum';

export class LegalType implements ObjectWithId {
  id: number;
  type: LegalTypeEnum;
  title: string;
}
