import {Pipe} from "@angular/core";
import {Template} from './templates.service';

@Pipe({
  name: "templateSort"
})
export class TemplateSortPipe {
  transform(array: Array<Template>, args: string): Array<Template> {
    array.sort((a: Template, b: Template) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
