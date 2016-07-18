import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TreeComponent} from 'angular2-tree-component';
import {AbstractProcess} from '../../../model/sml/AbstractProcess';
import {getDisplayName} from '../../../decorators/DisplayName';

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

    private getNodes(object: any): Array<INode> {
        var nodes: Array<INode>;

        if (object === null || typeof object === 'undefined' || typeof object === 'function') {
            return null;
        }

        if (object instanceof Array) {
            nodes = this.getNodesForArray(object);
        } else if (typeof object === 'object' && !(object instanceof Date)) {
            nodes = this.getNodesForObject(object);
        } else {
            nodes = [{name: object.toString(), children: null}];
        }

        return nodes;
    }

    private getNodesForObject(object: Object): Array<INode> {
        var nodes: Array<INode> = [];

        for (let propertyName in object) {
            let nodeValue: any = object[propertyName];

            if (Object.prototype.hasOwnProperty(propertyName) ||
                nodeValue === undefined || nodeValue === null || nodeValue.length === 0) {
                continue;
            }

            let displayName = getDisplayName(object, propertyName) || propertyName;
            let newNode: INode = {name: displayName, children: null};

            newNode.children = this.getNodes(nodeValue);
            nodes.push(newNode);
        }

        return nodes;
    }

    private getNodesForArray(array: Array<any>): Array<INode> {
        var nodes = <Array<any>>array.map((elem: any) => {
            var node: INode = {name: null, children: null};

            node.name = elem.toString();

            if (typeof elem === 'object' && !(elem instanceof Date) || elem instanceof Array) {
                node.children = this.getNodes(elem);
            }

            return node;
        });

        return nodes;
    }
}

interface INode {
    name: string;
    children: Array<INode>;
}
