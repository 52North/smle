import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';
import { EditorService } from '../../services/EditorService';
import { SosService } from '../sos.service';
import { DescriptionSelection, SelectedDescription } from '../components/selectDescription.component';

@Component({
    selector: 'delete-description',
    template: require('./delete.template.html'),
    styles: [require('./delete.style.scss')],
})
export class DeleteDescription {

    private selectedDesc: SelectedDescription;
    private successfullDeleted: boolean;

    @ViewChild(DescriptionSelection) descSelection: DescriptionSelection;

    constructor(
        private sosService: SosService
    ) { }

    public onSelectedDescription(desc: SelectedDescription) {
        this.successfullDeleted = null;
        this.selectedDesc = desc;
    }

    public onDeleteDescription() {
        this.sosService.deleteDescription(this.selectedDesc.id).subscribe(res => {
            this.successfullDeleted = res;
            if (res) {
                this.loadDescriptions();
                this.selectedDesc = null;
            }
        }, error => {
            this.successfullDeleted = false;
        });
    }

    private loadDescriptions() {
        this.descSelection.loadDescIds();
    }
}
