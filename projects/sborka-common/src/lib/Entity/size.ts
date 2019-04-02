import {ObjectWithId} from "./object-with-id";

export class Size implements ObjectWithId {
    id: number;
    length: number;
    width: number;
    height: number;
    diameter: number;

    summary() {
        if (this.length === undefined) {
            return null;
        }

        let description = `${this.length}x${this.width}x${this.height}`;
        if (this.diameter) {
            description += ` D${this.diameter}`;
        }

        return description;
    }
}
