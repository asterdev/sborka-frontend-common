import {ObjectWithId} from "./object-with-id";

export class Circulation implements ObjectWithId {
  id: number;
  circulation: number;
  isVisible: boolean;
  daysCount: number;
  step: number;

  isEmpty(): boolean {
    return !this.circulation && !this.daysCount && !this.step;
  }
}
