import {ObjectWithId} from './object-with-id';
import {PaymentType} from './payment-type';

export class Payment implements ObjectWithId {
  id: number;
  date: string;
  sum: number;
  type: PaymentType;
  cashback: string;
}
