import { Component, Type } from '@angular/core';
import { AggregatingProcess, ComponentList, ConnectionList } from '@helgoland/sensorml';

import { NestedChildMetadata } from '../base/NestedChildMetadata';
import { TypedModelComponent } from '../base/TypedModelComponent';
import { NestedCardComponent } from '../basic/NestedCardComponent';
import { ComponentListComponent } from './ComponentListComponent';
import { ConnectionListComponent } from './ConnectionListComponent';

@Component({
    selector: 'sml-aggregating-process',
    templateUrl: './AggregatingProcessComponent.html'
})
export class AggregatingProcessComponent extends TypedModelComponent<AggregatingProcess> {

    public connectionListComponent: Type<any> = ConnectionListComponent;
    public componentListComponent: Type<any> = ComponentListComponent;

    protected createModel(): AggregatingProcess {
        return undefined;
    }

    protected openConnections() {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                ConnectionListComponent,
                'Connection list',
                this.model.connections,
                this.config.getConfigFor('sml:connections').getConfigFor('sml:ConnectionList')
            )
        );
    }

    protected removeConnections() {
        this.model.connections = null;
    }

    protected createConnections() {
        this.model.connections = new ConnectionList();
    }

    protected openComponents() {
        this.openNewChild(
            new NestedChildMetadata(
                NestedCardComponent,
                ComponentListComponent,
                'Component list',
                this.model.components,
                this.config.getConfigFor('sml:components').getConfigFor('sml:ComponentList')
            )
        );
    }

    protected removeComponents() {
        this.model.components = null;
    }

    protected createComponents() {
        this.model.components = new ComponentList();
    }
}
