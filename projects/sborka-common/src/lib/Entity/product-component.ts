import {PreparationType} from "./preparation-type";
import {Size} from "./size";
import {Material} from "./material";
import {ObjectWithId} from "./object-with-id";

export class ProductComponent implements ObjectWithId {
    id: number;
    preparationType: PreparationType = new PreparationType();
    material: Material = new Material();
    size: Size = new Size();
    comment: string;

    static summary(productComponent: ProductComponent) {
        if (!productComponent.id) {
            return '';
        }

        return productComponent.preparationType.name + ', ' +
          productComponent.material.name + ', ' +
          Size.summary(productComponent.size);
    }
}
