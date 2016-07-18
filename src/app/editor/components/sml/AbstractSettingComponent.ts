import {Component} from '@angular/core';
import {AbstractSetting} from '../../../model/sml/AbstractSetting';
import {TypedModelComponent} from '../base/TypedModelComponent';

@Component({
  selector: 'sml-abstract-setting',
  template: require('./AbstractSettingComponent.html'),
  styles: [require('../styles/editor-component.scss')],
  directives: []
})
export class AbstractSettingComponent extends TypedModelComponent<AbstractSetting> {
  protected createModel(): AbstractSetting {
    return undefined;
  }
}
