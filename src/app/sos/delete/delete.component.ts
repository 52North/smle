import { Component, ViewChild } from '@angular/core';
import { SosService } from '../sos.service';
import { DescriptionSelectionComponent, SelectedDescription } from '../components/selectDescription.component';

@Component({
    selector: 'delete-description',
    template: require('./delete.template.html'),
    styles: [require('./delete.style.scss')],
})
export class DeleteDescriptionComponent {

    @ViewChild(DescriptionSelectionComponent) descSelection: DescriptionSelectionComponent;

    private selectedDesc: SelectedDescription;
    private successfullDeleted: boolean;

    constructor(
        private sosService: SosService
    ) { }

    public onSelectedDescription(desc: SelectedDescription) {
        this.successfullDeleted = null;
        this.selectedDesc = desc;
    }

    public onDeleteDescription() {
        this.sosService.deleteDescription(this.selectedDesc.id).subscribe((res) => {
            this.successfullDeleted = res;
            if (res) {
                this.loadDescriptions();
                this.selectedDesc = null;
            }
        }, (error) => {
            this.successfullDeleted = false;
        });
    }

    private loadDescriptions() {
        this.descSelection.loadDescIds();
    }
}
