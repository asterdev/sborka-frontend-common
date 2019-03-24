import {ElementTableBlock} from "./element-table-block";
import {Product} from "./product";
import {ElementCoefficient} from "./element-coefficient";
import {TypographyComponent} from "./typography-component";
import {ObjectWithId} from "./object-with-id";

export class ElementTableElement implements ObjectWithId {
  id: number;
  name: string;
  elementTableBlocks: ElementTableBlock[] = [];
  typographyComponent: TypographyComponent = null;
  daysCount: number = 0;
  elementCoefficients: ElementCoefficient[] = [];

  private static blockHasElement(elementTableBlock: ElementTableBlock, elementTableElement: ElementTableElement, prefix: string) {
    let element = elementTableBlock.elementTableElements.filter(element => element.id === elementTableElement.id);
    if (element.length) {
      return prefix + ' — ' + elementTableBlock.name;
    }

    let result = '';
    elementTableBlock.elementTableElements.map(element => {
      element.elementTableBlocks.map(block => {
        result += ElementTableElement.blockHasElement(block, elementTableElement, prefix + ' — ' + elementTableBlock.name);
      });
    });

    return result;
  }

  static fullNotation(elementTableElement: ElementTableElement, product: Product) {
    let result = '';
    product.elementsTables.map((table) => {
      table.elementTableOptions.map(option => {
        option.elementTableBlocks.map(block => {
          let subResult = ElementTableElement.blockHasElement(block, elementTableElement, '');
          if (subResult.length) {
            result = table.name + ' — ' + option.name + subResult;
          }
        });
      })
    });

    result += ' — ' + elementTableElement.name;

    return result;
  }

  static isEmpty(elementTableElement: ElementTableElement): boolean {
    return !elementTableElement.name;
  }
}
