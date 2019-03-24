import {ExclusionRuleItem} from "./exclusion-rule-item";
import {ObjectWithId} from "./object-with-id";

export class ExclusionRule implements ObjectWithId {
  id: number;
  comment: string;
  items: ExclusionRuleItem[] = [];
}
