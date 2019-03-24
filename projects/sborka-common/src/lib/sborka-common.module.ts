import { NgModule } from '@angular/core';
import { SborkaCommonComponent } from './sborka-common.component';
import {User} from "./Entity/user";

@NgModule({
  declarations: [
    SborkaCommonComponent
  ],
  imports: [
  ],
  exports: [
    SborkaCommonComponent,
  ]
})
export class SborkaCommonModule { }
