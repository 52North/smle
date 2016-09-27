import { Pipe, PipeTransform } from '@angular/core';
import { SensorMLXmlService } from '../../services/SensorMLXmlService';

declare var jQuery: any;

@Pipe({
    name: 'toSensorml',
    pure: false
})
export class SensorMLPipe implements PipeTransform {
    transform(description: any): string {
        let service = new SensorMLXmlService();
        //    console.log(JSON.stringify(description, null, ' '));

        let serialize = service.serialize(description);
        //    console.log(serialize);

        return this.formatXml(serialize);
    }

    formatXml(xml) {
        let formatted = '';
        let reg = /(>)(<)(\/*)/g;
        xml = xml.replace(reg, '$1\r\n$2$3');
        let pad = 0;
        jQuery.each(xml.split('\r\n'), function(index, node) {
            let indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
                indent = 0;
            } else if (node.match(/^<\/\w/)) {
                if (pad !== 0) {
                    pad -= 1;
                }
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
                indent = 1;
            } else {
                indent = 0;
            }

            let padding = '';
            for (let i = 0; i < pad; i++) {
                padding += '  ';
            }

            formatted += padding + node + '\r\n';
            pad += indent;
        });

        return formatted;
    }
}
