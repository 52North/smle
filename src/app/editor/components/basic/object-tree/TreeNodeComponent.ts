import {Component, Input} from '@angular/core';

@Component({
    template: require('./TreeNodeComponent.html'),
    styles: [require('../../styles/tree-node-component.scss')]
})
export class TreeNodeComponent {
    @Input()
    node: any; // TreeNode
}
