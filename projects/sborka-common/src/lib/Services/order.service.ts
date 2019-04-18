import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OOrder} from '../Entity/o-order';
import {OrderStatusInterface} from '../Entity/order-status.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public statuses: OrderStatusInterface[] = [
    {
      id: 1,
      name: 'defected',
      translate: 'Брак'
    },
    {
      id: 2,
      name: 'order-ready',
      translate: 'Заказ готов'
    },
    {
      id: 3,
      name: 'order-not-ready',
      translate: 'Заказ не готов'
    },
    {
      id: 4,
      name: 'layout-not-confirmed',
      translate: 'Макет не подтвержден'
    },
    {
      id: 5,
      name: 'layout-confirmed',
      translate: 'Макет подтвержден'
    },
    {
      id: 6,
      name: 'layout-confirmed-by-designer',
      translate: 'Макет подтвержден дизайнером'
    },
    {
      id: 7,
      name: 'not-defected',
      translate: 'Не брак'
    },
    {
      id: 8,
      name: 'paid',
      translate: 'Оплаченно'
    },
    {
      id: 9,
      name: 'unpaid',
      translate: 'Не оплаченно'
    },
    {
      id: 10,
      name: 'not-shipped',
      translate: 'Не отгружено'
    },
    {
      id: 11,
      name: 'shipped',
      translate: 'Отгружено'
    },
    {
      id: 12,
      name: 'not-denied',
      translate: 'Не отказано'
    },
    {
      id: 13,
      name: 'denied',
      translate: 'Отказано'
    },
    {
      id: 14,
      name: 'in-printing',
      translate: 'Переданно в печать'
    },
    {
      id: 15,
      name: 'out-printing',
      translate: 'Не переданно в печать'
    },
    {
      id: 16,
      name: 'archive',
      translate: 'В архиве'
    }
  ];

  constructor(private http: HttpClient) {
  }

  /**
   * Получить список заказов
   * @param filterParams: параметры фильтра
   */
  getOrders(filterParams: any): Observable<OOrder[]> {
    let url = 'mock/orders';
    if (filterParams.page) {
      url += `?_page=${filterParams.page}&_limit=${filterParams.limit}`;
    }
    return this.http.get<OOrder[]>(url);
  }

  /**
   * Удалить заказ
   * @param orderId: идентификатор заказа
   */
  deleteOrder(orderId: number) {
    return this.http.delete(`mock/orders/${orderId}`)
      .pipe(map(res => true));
  }

  /**
   * Обновить заказ
   * @param data: данные
   * @param orderId: идентификатор заказа
   */
  updateOrder(data: OOrder, orderId: number): Observable<boolean> {
    return this.http.put(`mock/orders/${orderId}`, data)
      .pipe(map(res => true));
  }
}
