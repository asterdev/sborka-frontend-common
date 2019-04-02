import {ObjectWithId} from './object-with-id';
import {City} from './city';
import {LegalTypeEnum} from './legal-type-enum';

export class User implements ObjectWithId {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  city: City;
  organization: string;
  ITN: string; // ИНН
  isLegal: boolean; // true если юр. лицо
  legalType: LegalTypeEnum|null;
}
