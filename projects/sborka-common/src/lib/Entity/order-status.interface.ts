export interface OrderStatusInterface {
  id: number;
  name: string; // название статуса на аглийском в соответсвие с названием файла статусов к примеру "отказано" denied.png следовательно name = denied
  translate: string; // перевод статус на русском, denied = отказано
}
