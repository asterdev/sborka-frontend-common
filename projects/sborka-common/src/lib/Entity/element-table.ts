import {ElementTableOption} from "./element-table-option";
import {ObjectWithId} from "./object-with-id";

export class ElementTable implements ObjectWithId {
  id: number;
  name: string;
  isDropdown: boolean;
  isExpand: boolean;
  weight: number = 0;
  isVisible: boolean;
  product: ObjectWithId = new ObjectWithId();
  elementTableOptions: ElementTableOption[] = [];
}
