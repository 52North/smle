import { Component } from '@angular/core';
import { EditorService } from '../../services/EditorService';

@Component({
    selector: 'import-description',
    template: require('./import.component.html')
})
export class ImportComponent {

    constructor(
        private editorService: EditorService) {
    }

    changeListener($event): void {
        let file: File = $event.target.files[0];
        let myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            console.log(myReader.result);
        };

        myReader.readAsText(file);
    }
}
