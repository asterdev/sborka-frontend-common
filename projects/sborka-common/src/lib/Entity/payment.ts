import {ObjectWithId} from './object-with-id';
import {PaymentType} from './payment-type';
import {User} from './user';

export class Payment implements ObjectWithId {
  id: number;
  user: User;
  date: string;
  sum: number;
  type: PaymentType;
  cashback: string;
}
