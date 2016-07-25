import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange, DoCheck } from '@angular/core';
import { SosService } from '../sos.service';

@Component({
  selector: 'description-id-selection',
  template: require('./selectDescription.template.html')
})
export class DescriptionSelection implements OnInit, DoCheck {

  private descriptionIds: Array<string>;
  private loadingDescriptionIds: boolean;
  private oldIgnoreIdsCount: number = 0;

  @Input()
  public ignoreIds: Array<string>;

  @Output()
  public onSelectedDescription: EventEmitter<SelectedDescription> = new EventEmitter<SelectedDescription>();

  constructor(
    private sosService: SosService
  ) { }

  public ngOnInit() {
    this.loadDescIds();
  }

  public ngDoCheck() {
    if (this.ignoreIds && this.ignoreIds.length !== this.oldIgnoreIdsCount) {
      this.oldIgnoreIdsCount = this.ignoreIds.length;
      this.loadDescIds();
    }
  }

  public loadDescIds() {
    this.loadingDescriptionIds = true;
    this.sosService.fetchDescriptionIDs().subscribe(res => {
      this.loadingDescriptionIds = false;
      this.descriptionIds = res;
      if (this.ignoreIds && this.ignoreIds.length > 0) {
        this.ignoreIds.forEach(ignoreId => {
          var idx = this.descriptionIds.indexOf(ignoreId);
          if (idx >= -1) {
            this.descriptionIds.splice(idx, 1);
          }
        });
      }
    });
  }

  public onSelectDescriptionID(descId: string) {
    this.sosService.fetchDescription(descId)
      .subscribe(res => {
        this.onSelectedDescription.emit(new SelectedDescription(descId, res));
      });
  }
}

export class SelectedDescription {
  constructor(
    public id: string,
    public description: string
  ) { }
}
