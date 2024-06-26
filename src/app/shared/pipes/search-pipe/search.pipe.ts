import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone:true,
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], args: string): any[] {

    if(!args || value.length == 0){
      return value
    }

    return value.filter((item) => {
      return JSON.stringify(item).includes(args as string)
    })

  }

}
