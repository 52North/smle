import {Component, Input} from '@angular/core';

@Component({
    template: require('./TreeNodeComponent'),
    styles: [require('../../styles/tree-node-component.scss')]
})
class TreeNodeComponent {
    @Input()
    node: any; // TreeNode
}
