import {CustomerInterface} from './customer.interface';
import {OProduct} from './o-product';

export class Delivery {
  id: number;
  orderNumber: string; // номер заказа
  beginDate: string; // дата офромления заказа
  readyDate: string; // дата изготовления заказа
  sendDate: string; // дата отправки заказа
  shipDate: string; // дата отгрузки заказа
  product: OProduct; // продукция
  customer: CustomerInterface; // заказчик
  circulation: number; // тираж
  deliveryMethod: number; // способ доставки
  deliveryCity: string; // город доставки
  deliveryAddress: string; // адрес доставки
  deliveryStore: string; // адрес при самовывозе
  recipient: CustomerInterface; // получатель
  totalPrice: number; // итоговая цена
  price: number; // цена товара
  deliveryPrice: number; // цена доставки
}
