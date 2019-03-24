import {PreparationType} from "./preparation-type";
import {CategoryGroup} from "./category-group";
import {ObjectWithId} from "./object-with-id";

export class Category implements ObjectWithId {
    id: number;
    name: string;
    categoryGroup: CategoryGroup = new CategoryGroup();
    preparationType: PreparationType = new PreparationType();
}
