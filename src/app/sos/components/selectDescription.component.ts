import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { SosService } from '../sos.service';

@Component({
    selector: 'description-id-selection',
    template: require('./selectDescription.template.html')
})
export class DescriptionSelection implements OnInit, DoCheck {

    @Input()
    public ignoreIds: Array<string>;

    @Input()
    public authorized: boolean = false;

    @Output()
    public onSelectedDescription: EventEmitter<SelectedDescription> = new EventEmitter<SelectedDescription>();

    private selectedDescriptionId: string;
    private descriptionIds: Array<string>;
    private loadingDescriptionIds: boolean;
    private oldIgnoreIdsCount: number = 0;

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
        this.sosService.fetchDescriptionIDs(this.authorized).subscribe(res => {
            this.loadingDescriptionIds = false;
            this.descriptionIds = res;
            if (this.ignoreIds && this.ignoreIds.length > 0) {
                this.ignoreIds.forEach(ignoreId => {
                    let idx = this.descriptionIds.indexOf(ignoreId);
                    if (idx >= -1) {
                        this.descriptionIds.splice(idx, 1);
                    }
                });
            }
        });
    }

    public onSelectDescriptionID(descId: string) {
        if (this.selectedDescriptionId !== undefined)
            this.sosService.fetchDescription(this.selectedDescriptionId)
                .subscribe(res => {
                    this.onSelectedDescription.emit(new SelectedDescription(this.selectedDescriptionId, res));
                });
    }
}

export class SelectedDescription {
    constructor(
        public id: string,
        public description: string
    ) { }
}
