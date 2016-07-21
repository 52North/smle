import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SosService } from '../sos.service';

@Component({
  selector: 'description-id-selection',
  template: require('./selectDescription.template.html')
})
export class DescriptionSelection implements OnInit {

  private descriptionIds: Array<string>;
  private loadingDescriptionIds: boolean;

  @Input()
  public ignoreId: string;

  @Output()
  public onSelectedDescription: EventEmitter<SelectedDescription> = new EventEmitter<SelectedDescription>();

  constructor(
    private sosService: SosService
  ) { }

  public ngOnInit() {
    this.loadDescIds();
  }

  public loadDescIds() {
    this.loadingDescriptionIds = true;
    this.sosService.fetchDescriptionIDs().subscribe(res => {
      this.loadingDescriptionIds = false;
      this.descriptionIds = res;
      if (this.ignoreId) {
        var idx = this.descriptionIds.indexOf(this.ignoreId);
        if (idx >= -1) {
          this.descriptionIds.splice(idx, 1);
        }
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
