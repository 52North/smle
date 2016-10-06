import { Component, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { AbstractProcess } from '../../../../model/sml/AbstractProcess';
import { getDisplayName } from '../../../../decorators/DisplayName';

const emailRegex = new RegExp('^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$');
const urlRegex = new RegExp('^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?');

@Component({
    selector: 'object-tree',
    template: require('./ObjectTreeComponent.html'),
    styles: [require('../../styles/object-tree-component.scss')]
})
export class ObjectTreeComponent implements OnChanges, DoCheck {
    @Input()
    shouldRebuildTree: boolean = true;

    @Input()
    model: AbstractProcess;

    protected options = {
        expandedField: 'isExpanded'
    };

    private prevModel: string;
    private nodes: Array<INode> = [];

    private static getNodes(object: any, oldNodes: Array<INode>, parentId: string): Array<INode> {
        let nodes: Array<INode>;
        let type = typeof object;

        if (object === null || type === 'undefined' || type === 'function') {
            return null;
        }

        if (object instanceof Array) {
            nodes = ObjectTreeComponent.getNodesForArray(object, oldNodes, parentId);
        } else if (typeof object === 'object' && !(object instanceof Date)) {
            nodes = ObjectTreeComponent.getNodesForObject(object, oldNodes, parentId);
        } else if (object instanceof Date) {
            nodes = ObjectTreeComponent.getValueNodes(
                object.toLocaleString().replace(/ /g, '\xa0'),
                type,
                oldNodes,
                parentId
            );
        } else {
            if (type === 'string' && ObjectTreeComponent.isEmail(object)) {
                type = 'email';
            } else if (type === 'string' && ObjectTreeComponent.isUrl(object)) {
                type = 'url';
            }

            nodes = ObjectTreeComponent.getValueNodes(object.toString(), type, oldNodes, parentId);
        }

        return nodes;
    }

    private static getNodesForObject(object: Object, oldNodes: Array<INode> = [], parentId: string): Array<INode> {
        let nodes: Array<INode> = [];

        for (let propertyName in object) {
            if (object[propertyName]) {
                let nodeValue: any = object[propertyName];

                if (Object.prototype.hasOwnProperty(propertyName) ||
                    nodeValue === undefined || nodeValue === null || nodeValue.length === 0) {
                    continue;
                }

                let oldNode = oldNodes.find((oldNode) => {
                    return oldNode.id === propertyName;
                });
                let displayName = getDisplayName(object, propertyName) || propertyName;
                let newNode: INode = {
                    id: parentId + propertyName,
                    name: displayName,
                    type: 'object',
                    children: null,
                    isExpanded: oldNode && oldNode.isExpanded
                };

                newNode.children = ObjectTreeComponent.getNodes(nodeValue, oldNode && oldNode.children, newNode.id);
                nodes.push(newNode);
            }
        }

        return nodes;
    }

    private static getValueNodes(name: string, type: string, oldNodes: Array<INode>, parentId: string): Array<INode> {
        let node: INode = {
            id: parentId + '$value',
            name: name,
            type: type,
            children: null,
            isExpanded: false
        };

        if (oldNodes && oldNodes.length === 1 && oldNodes[0].id === '$value') {
            node.isExpanded = oldNodes[0].isExpanded;
        }

        return [node];
    }

    private static getNodesForArray(array: Array<any>, oldNodes: Array<INode> = [], parentId: string): Array<INode> {
        let nodes = <Array<any>>array.map((elem: any, index: number) => {
            let oldNode = oldNodes.find((node) => {
                return node.id === index.toString();
            });
            let node: INode = {
                id: parentId + index.toString(),
                name: null,
                type: null,
                children: null,
                isExpanded: oldNode && oldNode.isExpanded
            };

            let name = elem.toString();
            let type = typeof elem;

            if (type === 'object' && !(elem instanceof Date) || elem instanceof Array) {
                node.children = ObjectTreeComponent.getNodes(elem, oldNode && oldNode.children, node.id);
            } else if (elem instanceof Date) {
                name = elem.toLocaleString().replace(/ /g, '\xa0');
            } else if (type === 'string' && ObjectTreeComponent.isEmail(name)) {
                type = 'email';
            } else if (type === 'string' && ObjectTreeComponent.isUrl(name)) {
                type = 'url';
            }

            node.name = name;
            node.type = type;

            return node;
        });

        return nodes;
    }

    private static isEmail(email: string) {
        return emailRegex.test(email);
    }

    private static isUrl(url: string) {
        return urlRegex.test(url);
    }

    constructor() {
        // this.periodicalRebuild();
        this.prevModel = JSON.stringify(this.model);
    }

    ngDoCheck() {
        if (this.shouldRebuildTree && JSON.stringify(this.model) !== this.prevModel) {
            this.prevModel = JSON.stringify(this.model);
            this.rebuildTree(this.model);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        let modelChange = changes['model'];
        if (modelChange) {
            this.rebuildTree(modelChange.currentValue);
        }
    }

    protected onToggle(event) {
        let path = event.node.path;
        let nodes = this.nodes;

        let getPredicate = (index: number) => {
            return (node) => {
                return node.id === path[index];
            };
        };

        for (let i = 0; i < path.length - 1; i++) {
            nodes = nodes.find(getPredicate(i)).children;
        }
        let node = nodes.find(getPredicate(path.length - 1));

        event.node.data.isExpanded = event.isExpanded;
        node.isExpanded = event.isExpanded;
    }

    private periodicalRebuild() {
        if (this.shouldRebuildTree) {
            setTimeout(() => {
                this.periodicalRebuild();
            }, 1000);
        }
        this.rebuildTree(this.model);
    }

    private rebuildTree(currentModel) {
        let nodes = ObjectTreeComponent.getNodes(currentModel, this.nodes, '');
        this.nodes = nodes || [];
    }

}

interface INode {
    id: string;
    name: string;
    type: string;
    children: Array<INode>;
    isExpanded: boolean;
}
