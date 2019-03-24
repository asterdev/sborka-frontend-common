import {ObjectWithId} from "./object-with-id";

export class PreparationDay implements ObjectWithId {
  id: number;
  daysCount: number;
  coefficient: number;

  isEmpty(): boolean {
    return !this.daysCount && !this.coefficient;
  }
}
