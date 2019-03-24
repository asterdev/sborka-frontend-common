import {MaterialGroup} from "./material-group";
import {ObjectWithId} from "./object-with-id";

export class Material implements ObjectWithId {
    id: number;
    name: string;
    density: number;
    thickness: number;
    materialGroup: MaterialGroup = new MaterialGroup();
}
