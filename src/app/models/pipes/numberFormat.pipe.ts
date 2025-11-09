import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';

@Pipe({
    name: 'numberFormat',
    standalone: false
})
export class numberFormatPipe implements PipeTransform {

  transform(
    value: any,
    currencyCode: string = 'EUR',
    digitsInfo: string = '.2-2',
    locale: string = 'it',
  ): string | null {
    return formatCurrency(
      value,
      locale,
      '',
      currencyCode,
      digitsInfo,
    );
  }
}