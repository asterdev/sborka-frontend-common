import {ObjectWithId} from './object-with-id';
import {City} from './city';
import {LegalType} from './legal-type';

export class User implements ObjectWithId {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  city: City;
  organization: string;
  itn: string; // ИНН
  isLegal: boolean; // true если юр. лицо
  legalType: LegalType|null;
  registrationDate: string;
  isActivated: boolean;
  cashBalance: number;
  orderCount: number;
}
