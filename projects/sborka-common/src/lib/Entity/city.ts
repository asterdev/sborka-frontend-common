import {Region} from "./region";
import {ObjectWithId} from "./object-with-id";

export class City implements ObjectWithId {
    id: number;
    name: string;
    region: Region = new Region();
}
