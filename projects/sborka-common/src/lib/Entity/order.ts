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
  sentToProduction: boolean; // Заказ отправлен в производство.
  inPrinting: boolean; // Заказ в печати.
  completed: boolean; // Заказ выполнен.
  uploaded: boolean; // Если менеджер скачивал макет.
  shipped: boolean; // Заказ отгружен.
  paidUp: boolean; // Заказ оплачен.
  defect: boolean; // С заказом что-то не так.
}
