import {Product} from './product';
import {User} from './user';
import {OrderStatus} from './order-status';
import {ObjectWithId} from './object-with-id';

export class Order implements ObjectWithId {
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
  inPrinting: boolean; // Заказ в печати.
  shipped: boolean; // Заказ отгруженн.
  completed: boolean; // Заказ выполнен.
  paidUp: boolean; // Заказ оплачен.
  uploaded: boolean; // Если менеджер скачивал макет.
}
