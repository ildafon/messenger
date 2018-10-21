import { Pipe, PipeTransform } from '@angular/core';

// from GoogleBooks example project
@Pipe({
  name: 'msgrEllipsis'
})
export class EllipsisPipe implements PipeTransform {
  transform(str: string, strLength: number = 250) {
    const withoutHtml = str && str.replace(/(<([^>]+)>)/ig, '');

    if ( str && str.length >= strLength) {
      return `${withoutHtml.slice(0, strLength)}...`;
    }

    return withoutHtml;
  }
}
