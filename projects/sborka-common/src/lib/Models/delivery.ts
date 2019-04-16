import {Product} from './product';
import {CustomerInterface} from '../Interfaces/customer.interface';

export class Delivery {
  id: number;
  orderNumber: string;
  beginDate: string;
  readyDate: string;
  sendDate: string;
  shipDate: string;
  product: Product;
  customer: CustomerInterface;
  circulation: number;
  deliveryMethod: number;
  deliveryCity: string;
  deliveryAddress: string;
  deliveryStore: string;
  recipient: CustomerInterface;
  totalPrice: number;
  price: number;
  deliveryPrice: number;
}
