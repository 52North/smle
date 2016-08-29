import {Component} from '@angular/core';
import {TypedModelComponent} from '../base/TypedModelComponent';
import {TextFieldComponent} from '../basic/TextFieldComponent';
import {AllowedTokens} from '../../../model/swe/AllowedTokens';
import {StringsComponent} from '../basic/StringsComponent';
import {AbstractAllowedValuesComponent} from './AbstractAllowedValuesComponent';

@Component({
    selector: 'swe-allowed-tokens',
    template: require('./AllowedTokensComponent.html'),
    directives: [TextFieldComponent, StringsComponent, AbstractAllowedValuesComponent]
})
export class AllowedTokensComponent extends TypedModelComponent<AllowedTokens> {
    protected createModel(): AllowedTokens {
        return new AllowedTokens();
    }
}
