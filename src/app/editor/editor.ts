import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AbstractProcess} from '../model/sml';
import {ConfigurationService} from '../services/ConfigurationService';
import {SensorMLPipe} from './pipes/SensorMLPipe';
import {Configuration} from '../services/config/Configuration';
import {EditorService} from '../services/EditorService';
import {PhysicalSystemComponent} from './components/sml/PhysicalSystemComponent';
import {PhysicalComponentComponent} from './components/sml/PhysicalComponentComponent';
import {SimpleProcessComponent} from './components/sml/SimpleProcessComponent';
import {PhysicalSystem} from '../model/sml/PhysicalSystem';
import {PhysicalComponent} from '../model/sml/PhysicalComponent';
import {SimpleProcess} from '../model/sml/SimpleProcess';

enum DescriptionType {
    PhysicalSystem = 1,
    PhysicalComponent = 2,
    SimpleProcess = 3
}

@Component({
    selector: 'editor',
    template: require('./editor.html'),
    styles: [require('./editor.scss')],
    directives: [PhysicalSystemComponent, PhysicalComponentComponent, SimpleProcessComponent],
    pipes: [SensorMLPipe]
})
export class Editor implements OnInit {
    public description: AbstractProcess;
    public config: Configuration;

    private descriptionType: DescriptionType;

    constructor(private configurationService: ConfigurationService,
                private editorService: EditorService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            let id = params['id'];
            this.editorService.getDescriptionForId(id).then(desc => {
                this.description = desc;
                this.descriptionType = Editor.getDescriptionType(desc);
            });
        });
        this.configurationService.getConfiguration().then(configuration => this.config = configuration);
    }

    private static getDescriptionType(desc: AbstractProcess) {
        if (desc instanceof PhysicalSystem) {
            return DescriptionType.PhysicalSystem;
        } else if (desc instanceof PhysicalComponent) {
            return DescriptionType.PhysicalComponent;
        } else if (desc instanceof SimpleProcess) {
            return DescriptionType.SimpleProcess;
        } else {
            return undefined;
        }
    }
}
