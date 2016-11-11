import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractProcess } from '../model/sml';
import { DescriptionConfigService } from '../services/DescriptionConfigService';
import { SensorMLPipe } from './pipes/SensorMLPipe';
import { DescriptionConfig } from '../services/config/DescriptionConfig';
import { EditorService } from '../services/EditorService';
import { PhysicalSystemComponent } from './components/sml/PhysicalSystemComponent';
import { PhysicalComponentComponent } from './components/sml/PhysicalComponentComponent';
import { SimpleProcessComponent } from './components/sml/SimpleProcessComponent';
import { PhysicalSystem } from '../model/sml/PhysicalSystem';
import { PhysicalComponent } from '../model/sml/PhysicalComponent';
import { SimpleProcess } from '../model/sml/SimpleProcess';
import { ObjectTreeComponent } from './components/basic/object-tree/ObjectTreeComponent';

import { Http, Response } from '@angular/http';

import { DynamicGUIService } from '../services/DynamicGUIService';
enum DescriptionType {
    PhysicalSystem = 1,
    PhysicalComponent = 2,
    SimpleProcess = 3,
    DynamicGUI = 4
}

@Component({
    selector: 'editor',
    template: require('./editor.html'),
    styles: [require('./editor.scss')],
    directives: [PhysicalSystemComponent, PhysicalComponentComponent, SimpleProcessComponent,
        ObjectTreeComponent],
    pipes: [SensorMLPipe]
})
export class Editor implements OnInit {
    public description: AbstractProcess;
    public config: DescriptionConfig;

    private descriptionType: DescriptionType;
    private descriptionIsLoading: boolean = true;
    private visualizerExpanded: boolean = false;
    private descriptionTypes: string[] = ["PhysicalSystem", "PhysicalComponent", "DiscoveryProfile"];

    constructor(private configurationService: DescriptionConfigService,
        private editorService: EditorService,
        private route: ActivatedRoute, private http: Http, private dynamicGUIService: DynamicGUIService) {
    }


    ngOnInit(): void {
        this.route.params.subscribe(params => {
            let id = params['id'];
            this.editorService.getDescriptionForId(id).then(desc => {
                this.descriptionIsLoading = false;
                if (desc != null) {
                    this.setDescription(desc);
                }
            }).catch(() => {
                this.descriptionIsLoading = false;
            });
        });
        this.configurationService.getConfiguration().then(configuration => this.config = configuration);
    }

    public onSelectDescriptionType(type: string) {
        if (type === 'PhysicalSystem') {
            this.setDescription(new PhysicalSystem());
        } else if (type === 'PhysicalComponent') {
            this.setDescription(new PhysicalComponent());
        } else {
            this.dynamicGUIService.getModel().subscribe((model: any) => {
                this.setDescription(model);
            });

        }
    }

    private setDescription(desc: AbstractProcess) {
        this.description = desc;
        this.descriptionType = this.getDescriptionType(desc);
    }

    private getDescriptionType(desc: AbstractProcess) {
        if (desc instanceof PhysicalSystem) {
            return DescriptionType.PhysicalSystem;
        } else if (desc instanceof PhysicalComponent) {
            return DescriptionType.PhysicalComponent;
        } else if (desc instanceof SimpleProcess) {
            return DescriptionType.SimpleProcess;
        } else {
            return DescriptionType.DynamicGUI;
        }
    }
}
