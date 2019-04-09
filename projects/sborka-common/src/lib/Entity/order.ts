import {Product} from './product';
import {User} from './user';
import {ObjectWithId} from './object-with-id';

export class Order implements ObjectWithId {
  id: number;
  product: Product;
  customer: User;
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
  shipped: boolean; // Заказ отгружен.
  completed: boolean; // Заказ выполнен.
  paidUp: boolean; // Заказ оплачен.
  uploaded: boolean; // Если менеджер скачивал макет.
  sentToProduction: boolean; // Заказ отправлен в производство
}
