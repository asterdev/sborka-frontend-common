import {City} from "./city";
import {ObjectWithId} from "./object-with-id";

export class Typography implements ObjectWithId {
  id: number;
  name: string;
  city: City = new City();
}
