import { Component } from '@angular/core';
import { KeywordList } from '../../../model/sml/KeywordList';
import { TypedModelComponent } from '../base/TypedModelComponent';

@Component({
    selector: 'swe-keyword-list',
    templateUrl: './KeywordListComponent.html',
    styleUrls: ['../styles/editor-component.scss']
})
export class KeywordListComponent extends TypedModelComponent<KeywordList> {

    protected createModel(): KeywordList {
        return new KeywordList();
    }
}
