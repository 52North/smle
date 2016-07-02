import {Component, ComponentResolver, ViewContainerRef} from '@angular/core';
import {EditorComponent} from '../base/EditorComponent';
import {Position} from '../../../model/sml/Position';
import {CardComponent} from '../basic/CardComponent';

@Component({
    selector: 'position-editor',
    template: require('./PositionEditorComponent.html'),
    styles: [require('../styles/editor-component.scss')],
    directives: [CardComponent]
})
export class PositionEditorComponent extends EditorComponent<Position> {
    constructor(componentResolver: ComponentResolver, viewContainerRef: ViewContainerRef) {
        super(componentResolver, viewContainerRef);
    }

    protected createModel(): Position {
        return undefined;
    }
}
