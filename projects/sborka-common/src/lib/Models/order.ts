import {OrderLayoutInterface} from '../Interfaces/order-layout.interface';
import {Delivery} from './delivery';

export class Order {
  id: number;
  status: number;
  layout: OrderLayoutInterface;
  paymentStatus: boolean;
  delivery: Delivery[];
}
