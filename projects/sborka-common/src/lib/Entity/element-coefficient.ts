import {ElementCoefficientElementItem} from "./element-coefficient-element-item";
import {ObjectWithId} from "./object-with-id";

export class ElementCoefficient implements ObjectWithId {
  id: number;
  isPriceCoefficient: boolean = false;
  value: number = 1;
  circulationMin: number = 0;
  circulationMax: number = 0;
  elementCoefficientElementItems: ElementCoefficientElementItem[] = [];
}
