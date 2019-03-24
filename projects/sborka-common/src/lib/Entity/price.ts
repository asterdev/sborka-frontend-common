import {TypographyComponent} from "./typography-component";
import {ObjectWithId} from "./object-with-id";

export class Price implements ObjectWithId {
    id: number;
    circulation: number;
    price: number;
    isUniversal: boolean;
    typographyComponent: TypographyComponent = new TypographyComponent();
}
