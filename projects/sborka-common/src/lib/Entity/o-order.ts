import {OrderLayoutInterface} from './order-layout.interface';
import {Delivery} from './delivery';

export class OOrder {
  id: number;
  status: number; // статус зазаза
  layout: OrderLayoutInterface; // макет заказа
  paymentStatus: boolean; // статус оплаты
  delivery: Delivery[]; // доставка
}
