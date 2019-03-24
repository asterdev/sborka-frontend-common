import {PreparationWay} from "./preparation-way";
import {ObjectWithId} from "./object-with-id";

export class PreparationType implements ObjectWithId {
    id: number;
    name: string;
    preparationWay: PreparationWay = new PreparationWay();
}
