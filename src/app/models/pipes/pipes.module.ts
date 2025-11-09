import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { numberFormatPipe } from './numberFormat.pipe';



@NgModule({
  declarations: [
    numberFormatPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    numberFormatPipe
  ]
})
export class PipesModule { }
