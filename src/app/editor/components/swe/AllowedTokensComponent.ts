import { Component } from '@angular/core';
import { AllowedTokens } from '@helgoland/sensorml';

import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-allowed-tokens',
    templateUrl: './AllowedTokensComponent.html'
})
export class AllowedTokensComponent extends TypedModelComponent<AllowedTokens> {
    protected createModel(): AllowedTokens {
        return new AllowedTokens();
    }
}
