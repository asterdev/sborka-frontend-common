import {ElementTableBlock} from "./element-table-block";
import {ObjectWithId} from "./object-with-id";

export class ElementTableOption implements ObjectWithId {
  id: number;
  name: string;
  elementTableBlocks: ElementTableBlock[] = [];

  static isEmpty(elementTableOption: ElementTableOption): boolean {
    return !elementTableOption.name;
  }
}
