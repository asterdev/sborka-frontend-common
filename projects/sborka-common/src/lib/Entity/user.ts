import {ObjectWithId} from "./object-with-id";

export class User implements ObjectWithId {
  id: number;
  name: string;
  email: string;
  password: string;
}
