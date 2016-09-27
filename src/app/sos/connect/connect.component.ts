import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';
import { EditorService } from '../../services/EditorService';
import { ConnectDescriptionService } from './connect.service';
import { DescriptionSelection, SelectedDescription } from '../components/selectDescription.component';
import { AbstractPhysicalProcess, AggregatingProcess, AbstractProcess } from '../../model/sml';
import { SosService } from '../sos.service';

@Component({
    selector: 'connect-description',
    template: require('./connect.template.html')
})
export class ConnectDescription implements OnInit {

    private childDescription: AbstractPhysicalProcess;
    private parentDescription: AggregatingProcess;
    private attachedTo: boolean;
    private ignoreIds: Array<string> = [];

    constructor(
        private router: Router,
        private connectDescService: ConnectDescriptionService,
        private editorService: EditorService,
        private sosService: SosService
    ) { }

    public ngOnInit() {
        this.attachedTo = this.connectDescService.attachedTo;
        this.childDescription = this.connectDescService.childDescription;
        this.parentDescription = this.connectDescService.parentDescription;
        this.updateIgnoreIds();
    }

    private onSelectParentDescription(selectedDesc: SelectedDescription) {
        let desc = new SensorMLXmlService().deserialize(selectedDesc.description);
        if (this.isAggregatingProcess(desc)) {
            this.parentDescription = (desc as any as AggregatingProcess);
        } else {
            // TODO hint that the selected description is no AggregatingProcess
        }
    }

    private onSelectChildDescription(selectedDesc: SelectedDescription) {
        // TODO check if description is AbstractPhysicalProcess!
        let desc = new SensorMLXmlService().deserialize(selectedDesc.description) as any as AbstractPhysicalProcess;
        this.connectDescService.connectDescriptions(desc, this.parentDescription).subscribe(res => {
            this.updateIgnoreIds();
        });
    }

    private onRemoveComponent(idx: number) {
        this.connectDescService.removeComponent(this.parentDescription, idx).subscribe(res => {
            this.updateIgnoreIds();
        });
    }

    private clearAttachedTo() {
        this.connectDescService.clearAttachedTo(this.childDescription, this.getAttachedToIdentifier()).subscribe(res => {
            this.updateIgnoreIds();
        });
    }

    private publishAttachedTo() {
        this.connectDescService.connectDescriptions(this.childDescription, this.parentDescription).subscribe(res => {
            this.parentDescription = null;
            this.updateIgnoreIds();
        });
    }

    private getAttachedToIdentifier() {
        return this.sosService.getIdentifierOfDescribeSensorUrl(this.childDescription.attachedTo);
    }

    private isAggregatingProcess(object: any): object is AggregatingProcess {
        return 'components' in object;
    }

    private updateIgnoreIds() {
        this.ignoreIds.length = 0;
        if (this.childDescription) {
            this.ignoreIds.push(this.childDescription.identifier.value);
            if (this.childDescription.attachedTo) {
                this.ignoreIds.push(this.sosService.getIdentifierOfDescribeSensorUrl(this.childDescription.attachedTo));
            }
        }

        if (this.parentDescription && this.parentDescription.components) {
            this.ignoreIds.push((this.parentDescription as any as AbstractProcess).identifier.value);
            this.parentDescription.components.components.forEach(entry => {
                this.ignoreIds.push(entry.title);
            });
        }
    }
}
