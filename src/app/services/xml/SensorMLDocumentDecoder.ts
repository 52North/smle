import { AbstractProcess } from '../../model/sml/AbstractProcess';
import { AggregateProcess } from '../../model/sml/AggregateProcess';
import { Namespaces } from './Namespaces';
import { PhysicalComponent } from '../../model/sml/PhysicalComponent';
import { PhysicalSystem } from '../../model/sml/PhysicalSystem';
import { SensorMLDecoder } from './SensorMLDecoder';
import { SensorMLNamespaceResolver } from './SensorMLNamespaceResolver';
import { SimpleProcess } from '../../model/sml/SimpleProcess';

export class SensorMLDocumentDecoder {

  private decoder = new SensorMLDecoder();

  public decode(document: Document): AbstractProcess {
    let process = this.createProcessOfDocument(document);
    this.decoder.decodeDocument(document.documentElement, process);
    return process;
  }

  private createProcessOfDocument(document: Document): AbstractProcess {
    if (document.getElementsByTagName(SimpleProcess.NAME).length === 1) {
      return new SimpleProcess();
    }
    if (document.getElementsByTagName(AggregateProcess.NAME).length === 1) {
      return new AggregateProcess();
    }
    if (document.getElementsByTagName(PhysicalComponent.NAME).length === 1) {
      return new PhysicalComponent();
    }
    if (document.getElementsByTagName(PhysicalSystem.NAME).length === 1) {
      return new PhysicalSystem();
    }
    throw new Error('Unsupported process type');
  }
}
