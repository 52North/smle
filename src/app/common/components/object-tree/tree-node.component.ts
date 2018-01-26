import { Component, Input } from '@angular/core';

@Component({
    selector: 'smle-tree-node',
    templateUrl: './tree-node.component.html',
    styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent {
    @Input()
    node: any; // TreeNode
}
