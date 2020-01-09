import { Pipe, PipeTransform } from '@angular/core';
import { SensorMLXmlService } from '@helgoland/sensorml';

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
