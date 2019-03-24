import {ProductComponent} from "./product-component";
import {Typography} from "./typography";
import {Price} from "./price";
import {ObjectWithId} from "./object-with-id";

export class TypographyComponent implements ObjectWithId {
  id: number;
  component: ProductComponent = new ProductComponent();
  typography: Typography = new Typography();
  prices: Price[] = [];
}
