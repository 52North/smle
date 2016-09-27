import { Injectable } from '@angular/core';
import { TemplatesService } from './templates.service';
import { CodeType } from '../model/gml/CodeType';
import { UUID } from 'angular2-uuid';
import { SensorMLXmlService } from '../services/SensorMLXmlService';
import { SosService } from '../sos/sos.service';

@Injectable()
export class TemplatesTest {

    constructor(
        private templatesServ: TemplatesService,
        private sosService: SosService
    ) {
    }

    public checkTemplates(): void {
        this.templatesServ.search('').subscribe(
            res => {
                let templates = res.templates;
                let idx = templates.length;
                setInterval(timeout => {
                    idx--;
                    if (idx >= 0) {
                        console.log(idx + '. ID: ' + templates[idx].id + ' Name: ' + templates[idx].name);
                        this.templatesServ.getTemplate(templates[idx]).subscribe(result => {
                            let description = new SensorMLXmlService().deserialize(result.plainText);
                            if (!description.identifier) {
                                description.identifier = new CodeType(UUID.UUID(), 'uniqueID');
                            }
                            this.sosService.addDescription(description).subscribe(() => {
                                console.log('add successfully');
                            });
                        });
                    }
                }, 200);
            }
        );
    }
}
