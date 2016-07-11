import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TreeComponent} from 'angular2-tree-component';
import {AbstractProcess} from '../../../model/sml/AbstractProcess';

@Component({
    selector: 'object-tree',
    template: require('./ObjectTreeComponent.html'),
    directives: [TreeComponent]
})
export class ObjectTreeComponent implements OnChanges {
    @Input()
    model: AbstractProcess;

    private nodes: Array<INode> = [];

    ngOnChanges(changes: SimpleChanges) {
        this.nodes = this.getNodes(this.model);
    }

    private getNodes(object: Object): Array<INode> {
        var nodes: Array<INode> = [];

        if (object === null || typeof object === 'undefined') {
            return null;
        }
        for (let propertyName in object) {
            if (Object.prototype.hasOwnProperty(propertyName) || Array.prototype.hasOwnProperty(propertyName)) {
                continue;
            }

            let newNode: INode = {name: propertyName, children: null};
            let nodeValue: any = object[propertyName];

            if (typeof nodeValue === 'object') {
                newNode.children = this.getNodes(nodeValue);
            } else if (typeof nodeValue !== 'undefined' && nodeValue !== null && typeof nodeValue !== 'function') {
                newNode.children = [{name: nodeValue.toString(), children: null}];
            }

            nodes.push(newNode);
        }


        return nodes;
    }
}

interface INode {
    name: string;
    children: Array<INode>;
}
