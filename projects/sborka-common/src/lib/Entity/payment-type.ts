import {ObjectWithId} from './object-with-id';

export class PaymentType implements ObjectWithId {
  id: number;
  name: string;
  shortName: string;
  commission: number; // Комиссия за перевод
  duration: string; // Время зачисления на баланс
}
