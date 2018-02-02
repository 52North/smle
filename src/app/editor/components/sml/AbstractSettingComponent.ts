import { Component } from '@angular/core';
import { AbstractSetting } from '../../../model/sml/AbstractSetting';
import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'sml-abstract-setting',
    templateUrl: './AbstractSettingComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class AbstractSettingComponent extends TypedModelComponent<AbstractSetting> {
    protected createModel(): AbstractSetting {
        return undefined;
    }
}
