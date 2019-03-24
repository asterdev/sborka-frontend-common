import {Category} from "./category";
import {Size} from "./size";
import {PreparationDay} from "./preparation-day";
import {Circulation} from "./circulation";
import {ElementTable} from "./element-table";
import {ExclusionRule} from "./exclusion-rule";
import {FileUploaded} from "./file-uploaded";
import {ObjectWithId} from "./object-with-id";
import {ElementTableBlock} from "./element-table-block";
import {Typography} from "./typography";

export class Product extends ObjectWithId {
    name: string;
    category: Category = new Category();
    size: Size = new Size();
    sizeMin: Size = new Size();
    sizeMax: Size = new Size();
    sizeStep: number;
    isOutOnMonday: boolean;
    isOutOnTuesday: boolean;
    isOutOnWednesday: boolean;
    isOutOnThursday: boolean;
    isOutOnFriday: boolean;
    isOutOnSaturday: boolean;
    isOutOnSunday: boolean;
    lastOrderTime: string;
    preparationDays: PreparationDay[] = [];
    circulations: Circulation[] = [];
    icon: FileUploaded = new FileUploaded();
    iconFile: File = null;
    template: FileUploaded = new FileUploaded();
    templateFile: File = null;
    elementsTables: ElementTable[] = [];
    exclusionRules: ExclusionRule[] = [];

    static formLongName(product: Product) {
        return product.category.preparationType.preparationWay.name + ' — ' + product.category.name + ' — ' + product.name;
    }

    static typographies(product: Product): Typography[] {
        let typographies = {};
        product.elementsTables.map(elementTable => {
            elementTable.elementTableOptions.map(elementTableOption => {
                elementTableOption.elementTableBlocks.map(block => {
                    Product.grabTypographies(block, typographies);
                });
            });
        });

        let result = [];
        for (let k in typographies) {
            result.push(typographies[k]);
        }

        return result;
    }

    protected static grabTypographies(elementTableBlock: ElementTableBlock, typographies: object) {
        elementTableBlock.elementTableElements.map(elementTableElement => {
            if (elementTableElement.typographyComponent) {
                if (!typographies.hasOwnProperty(elementTableElement.typographyComponent.typography.id)) {
                    typographies[elementTableElement.typographyComponent.typography.id] = elementTableElement.typographyComponent.typography;
                }
            }

            elementTableElement.elementTableBlocks.map(block => {
                Product.grabTypographies(block, typographies);
            });
        });
    }
}
