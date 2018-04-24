import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NamedSweDataComponent } from '../../../model/sml/NamedSweDataComponent';
import { SweBoolean } from '../../../model/swe/SweBoolean';
import { SweCategory } from '../../../model/swe/SweCategory';
import { SweCount } from '../../../model/swe/SweCount';
import { SweDataArray } from '../../../model/swe/SweDataArray';
import { SweDataRecord } from '../../../model/swe/SweDataRecord';
import { SweField } from '../../../model/swe/SweField';
import { SweQuantity } from '../../../model/swe/SweQuantity';
import { SweQuantityRange } from '../../../model/swe/SweQuantityRange';
import { SweText } from '../../../model/swe/SweText';
import { SweTime } from '../../../model/swe/SweTime';
import { SweTimeRange } from '../../../model/swe/SweTimeRange';
import { EditorComponent } from '../base/EditorComponent';
import { SelectionResult, VocabSelectionComponent } from '../vocabulary/vocab-selection/vocab-selection.component';

export enum ComponentType {
  Unknown = 0,
  SweText = 1,
  SweTime = 2,
  SweCount = 3,
  SweBoolean = 4,
  SweQuantity = 5,
  SweCategory = 6,
  SweTimeRange = 7,
  SweQuantityRange = 8,
  SweDataRecord = 9,
  SweDataArray = 10
}

abstract class AbstractNamedComponentComponent<T> extends EditorComponent<T> implements OnInit {
  public componentType: ComponentType;
  public title: string;

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    protected modalService: NgbModal
  ) {
    super(componentFactoryResolver, viewContainerRef);
  }

  public ngOnInit() {
    this.componentType = this.getComponentType();
  }

  public onClickVocabSelection() {
    const ref = this.modalService.open(VocabSelectionComponent);
    (ref.componentInstance as VocabSelectionComponent).vocabType = this.componentOptions.vocabularyType;
    ref.result.then((result: SelectionResult) => { if (result) { this.setVocabularyResult(result); } });
  }

  protected abstract setVocabularyResult(result: SelectionResult);

  private getComponentType(): ComponentType {
    if (!this.model) {
      return ComponentType.Unknown;
    }

    const component = (this.model as any).component;

    if (component instanceof SweText) {
      return ComponentType.SweText;
    } else if (component instanceof SweTime) {
      return ComponentType.SweTime;
    } else if (component instanceof SweCount) {
      return ComponentType.SweCount;
    } else if (component instanceof SweBoolean) {
      return ComponentType.SweBoolean;
    } else if (component instanceof SweQuantity) {
      return ComponentType.SweQuantity;
    } else if (component instanceof SweCategory) {
      return ComponentType.SweCategory;
    } else if (component instanceof SweTimeRange) {
      return ComponentType.SweTimeRange;
    } else if (component instanceof SweQuantityRange) {
      return ComponentType.SweQuantityRange;
    } else if (component instanceof SweDataRecord) {
      return ComponentType.SweDataRecord;
    } else if (component instanceof SweDataArray) {
      return ComponentType.SweDataArray;
    } else {
      return ComponentType.Unknown;
    }
  }

}

@Component({
  selector: 'sml-named-swe-data-component',
  templateUrl: './NamedSweDataComponentComponent.html',
  styleUrls: ['../styles/editor-component.scss']
})
export class NamedSweDataComponentComponent extends AbstractNamedComponentComponent<NamedSweDataComponent>
  implements OnInit {

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    modalService: NgbModal
  ) {
    super(componentFactoryResolver, viewContainerRef, modalService);
  }

  public ngOnInit() {
    super.ngOnInit();
    if (this.model && this.model.component) {
      this.title = this.model.component.toString();
    } else {
      this.title = 'Named Data Component';
    }
  }

  protected createModel(): NamedSweDataComponent {
    return new NamedSweDataComponent();
  }

  protected setVocabularyResult(result: SelectionResult) {
    this.model.component.definition = result.definition;
    this.model.component.label = result.label;
    this.model.component.description = result.description;
    this.model.name = result.label;
  }
}

@Component({
  selector: 'swe-field',
  templateUrl: './NamedSweDataComponentComponent.html',
  styleUrls: ['../styles/editor-component.scss']
})
export class SweFieldComponent extends AbstractNamedComponentComponent<SweField> implements OnInit {

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    viewContainerRef: ViewContainerRef,
    modalService: NgbModal
  ) {
    super(componentFactoryResolver, viewContainerRef, modalService);
    this.title = 'Swe Field';
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  protected createModel(): SweField {
    return new SweField();
  }

  protected setVocabularyResult(result: SelectionResult) {
    this.model.component.definition = result.definition;
    this.model.component.label = result.label;
    this.model.component.description = result.description;
    this.model.name = result.label;
  }
}
