import { Component } from '@angular/core';
import { PhysicalSystem, PhysicalComponent, SimpleProcess } from '../model/sml';
import { EditorService } from '../services/EditorService';

@Component({
    selector: 'create',
    template: require('./create.component.html')
})
export class CreateComponent {
    public descriptionTypes: string[] = [
        'PhysicalSystem',
        'PhysicalComponent'
        // 'SimpleProcess'
        // 'DiscoveryProfile'
    ];

    constructor(
        private editorService: EditorService) {
    }

    public onSelectDescriptionType(type: string) {
        if (type === 'PhysicalSystem') {
            this.editorService.openEditorWithDescription(new PhysicalSystem());
        } else if (type === 'PhysicalComponent') {
            this.editorService.openEditorWithDescription(new PhysicalComponent());
        } else if (type === 'SimpleProcess') {
            this.editorService.openEditorWithDescription(new SimpleProcess());
        } else if (type === 'DiscoveryProfile') {
            this.editorService.useDiscoveryProfiles().subscribe((res) => {
                // this.description = res.model;
                // this.config = res.configuration;
                // this.descriptionType = this.editorService.getDescriptionType();
                // this.editorMode = this.editorService.getEditorMode();
            });
        }
    }
}
