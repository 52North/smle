import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SosService } from '../sos.service';

@Component({
  selector: 'description-id-selection',
  template: require('./selectDescription.template.html')
})
export class DescriptionSelection implements OnInit {

  private descriptionIds: Array<string>;
  private loadingDescriptionIds: boolean;

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
