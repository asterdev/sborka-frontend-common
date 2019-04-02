import {ObjectWithId} from "./object-with-id";

export class Size implements ObjectWithId {
    id: number;
    length: number;
    width: number;
    height: number;
    diameter: number;

    static summary(size: Size) {
        if (size.length === undefined) {
            return null;
        }

        let description = size.length + 'x' + size.width + 'x' + size.height;
        if (size.diameter) {
            description += ' D' + size.diameter;
        }

        return description;
    }
}
