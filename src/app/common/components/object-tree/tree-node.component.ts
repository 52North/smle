import { Component, Input } from '@angular/core';

@Component({
    selector: 'tree-node',
    template: require('./tree-node.component.html'),
    styles: [require('./tree-node.component.scss')]
})
export class TreeNodeComponent {
    @Input()
    node: any; // TreeNode
}
