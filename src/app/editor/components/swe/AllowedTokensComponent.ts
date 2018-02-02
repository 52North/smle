import { Component } from '@angular/core';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { AllowedTokens } from '../../../model/swe/AllowedTokens';

@Component({
    selector: 'swe-allowed-tokens',
    templateUrl: './AllowedTokensComponent.html'
})
export class AllowedTokensComponent extends TypedModelComponent<AllowedTokens> {
    protected createModel(): AllowedTokens {
        return new AllowedTokens();
    }
}
