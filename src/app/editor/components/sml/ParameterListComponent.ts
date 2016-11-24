import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { EditorComponent } from '../base/EditorComponent';
import { ParameterList, Parameter } from '../../../model/sml';
import { ChildMetadata } from '../base/TypedModelComponent';
import { ParameterComponent } from './ParameterComponent';

@Component({
    selector: 'sml-parameter-list',
    template: require('./ParameterListComponent.html')
})
export class ParameterListComponent extends EditorComponent<ParameterList> {

    constructor(componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {
        super(componentFactoryResolver, viewContainerRef);
    }

    protected createModel(): ParameterList {
        return new ParameterList();
    }

    protected openNewParameter(parameter: Parameter) {
        this.openNewChild(
            new ChildMetadata(ParameterComponent, parameter, this.config.getConfigFor('parameter'))
        );
    }

    protected onRemoveParameter(index: number): void {
        this.closeChildWithModel(this.model.parameters[index]);
        this.model.parameters.splice(index, 1);
    }

    protected onAddParameter(): void {
        this.model.parameters.push(new Parameter());
    }
}
