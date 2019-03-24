import {ElementTableElement} from "./element-table-element";
import {ObjectWithId} from "./object-with-id";

export class ElementTableBlock implements ObjectWithId {
  id: number;
  name: string;
  isExpand: boolean = true;
  elementTableElements: ElementTableElement[] = [];

  public static isEmpty(elementTableBlock: ElementTableBlock) {
    return !elementTableBlock.name;
  }
}
