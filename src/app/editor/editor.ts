import {Component, OnInit} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';
import {AbstractProcess, SimpleProcess} from '../model/sml';
import {DescriptionRepository} from '../services/DescriptionRepository';
import {ConfigurationService} from '../services/ConfigurationService';
import {SensorMLPipe} from './pipes/SensorMLPipe';
import {DescribedObjectComponent} from './components/sml/DescribedObjectComponent';
import {Configuration} from '../services/config/Configuration';

@Component({
    selector: 'editor',
    template: require('./editor.html'),
    styles: [require('./editor.scss')],
    directives: [DescribedObjectComponent],
    pipes: [SensorMLPipe]
})
export class Editor implements OnInit {
    public description: AbstractProcess;
    public config: Configuration;
    private id: string;

    constructor(private service: DescriptionRepository, private configurationService: ConfigurationService,
                routeParams: RouteParams) {
        this.id = routeParams.get('id');
    }

    ngOnInit(): void {
        if (this.id === 'new') {
            this.description = new SimpleProcess();
            this.service.saveDescription(this.description);
        } else {
            this.service.getDescription(this.id)
                .then(description => this.description = description);
        }

        this.configurationService.getConfiguration().then(configuration => this.config = configuration);
    }
}
