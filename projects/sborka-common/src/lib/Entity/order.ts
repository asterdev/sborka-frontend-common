import {Product} from './product';
import {User} from './user';
import {OrderStatus} from './order-status';

export interface Order {
  id: number;
  product: Product;
  customer: User;
  status: OrderStatus;
  date: string;
  dateReady: string;
  plannedDeliveryDate: string;
  circulation: number;
  cityOfPrinting: string;
  typographyName: string;
  deliveryCity: string;
  deliveryMethod: string;
  deliveryAddress: string;
  manufacturingCost: number;
  deliveryCost: number;
  comment: number;
  inPrinting: boolean;
}
