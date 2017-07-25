import { Pipe, PipeTransform } from '@angular/core';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';

declare var jQuery: any;

@Pipe({
    name: 'toSensorml',
    pure: false
})
export class SensorMLPipe implements PipeTransform {
    transform(description: any): string {
        const service = new SensorMLXmlService();
        const serialize = service.serialize(description, true);
        return serialize;
    }
}
