import {ElementTableElement} from "./element-table-element";
import {ObjectWithId} from "./object-with-id";

export class ExclusionRuleItem implements ObjectWithId {
  id: number;
  element: ElementTableElement;
  isAndOperator: boolean;
}
