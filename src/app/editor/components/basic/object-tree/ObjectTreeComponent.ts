import { Component, Input, OnChanges, SimpleChanges, HostListener, DoCheck } from '@angular/core';
import { TreeComponent } from 'angular2-tree-component';
import { AbstractProcess } from '../../../../model/sml/AbstractProcess';
import { getDisplayName } from '../../../../decorators/DisplayName';
import { TreeNodeComponent } from './TreeNodeComponent';

const emailRegex = new RegExp('^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$');
const urlRegex = new RegExp('^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?');

@Component({
  selector: 'object-tree',
  template: require('./ObjectTreeComponent.html'),
  styles: [require('../../styles/object-tree-component.scss')]
})
export class ObjectTreeComponent implements OnChanges, DoCheck {
  @Input()
  model: AbstractProcess;
  private prevModel: string;

  @Input()
  shouldRebuildTree: boolean = true;

  private options = {
    treeNodeTemplate: TreeNodeComponent,
    expandedField: 'isExpanded'
  };

  private nodes: Array<INode> = [];

  constructor() {
    //this.periodicalRebuild();
    this.prevModel = JSON.stringify(this.model);
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
    var nodes = ObjectTreeComponent.getNodes(currentModel, this.nodes);
    this.nodes = nodes || [];
  }

  ngDoCheck() {
    if (this.shouldRebuildTree && JSON.stringify(this.model) !== this.prevModel) {
      this.prevModel = JSON.stringify(this.model);
      this.rebuildTree(this.model);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    var modelChange = changes['model'];
    if (modelChange) {
      this.rebuildTree(modelChange.currentValue);
    }
  }

  private onToggle(event) {
    var path = event.node.path;
    var nodes = this.nodes;

    var getPredicate = (index: number) => {
      return (node) => {
        return node.id === path[index];
      };
    };

    for (let i = 0; i < path.length - 1; i++) {
      nodes = nodes.find(getPredicate(i)).children;
    }
    var node = nodes.find(getPredicate(path.length - 1));

    event.node.data.isExpanded = event.isExpanded;
    node.isExpanded = event.isExpanded;
  }

  private static getNodes(object: any, oldNodes: Array<INode>): Array<INode> {
    var nodes: Array<INode>;
    var type = typeof object;

    if (object === null || type === 'undefined' || type === 'function') {
      return null;
    }

    if (object instanceof Array) {
      nodes = ObjectTreeComponent.getNodesForArray(object, oldNodes);
    } else if (typeof object === 'object' && !(object instanceof Date)) {
      nodes = ObjectTreeComponent.getNodesForObject(object, oldNodes);
    } else if (object instanceof Date) {
      nodes = ObjectTreeComponent.getValueNodes(object.toLocaleString().replace(/ /g, '\xa0'), type, oldNodes);
    } else {
      if (type === 'string' && ObjectTreeComponent.isEmail(object)) {
        type = 'email';
      } else if (type === 'string' && ObjectTreeComponent.isUrl(object)) {
        type = 'url';
      }

      nodes = ObjectTreeComponent.getValueNodes(object.toString(), type, oldNodes);
    }

    return nodes;
  }

  private static getValueNodes(name: string, type: string, oldNodes: Array<INode>): Array<INode> {
    var node: INode = {
      id: '$value',
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

  private static getNodesForObject(object: Object, oldNodes: Array<INode> = []): Array<INode> {
    var nodes: Array<INode> = [];

    for (let propertyName in object) {
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
        id: propertyName,
        name: displayName,
        type: 'object',
        children: null,
        isExpanded: oldNode && oldNode.isExpanded
      };

      newNode.children = ObjectTreeComponent.getNodes(nodeValue, oldNode && oldNode.children);
      nodes.push(newNode);
    }

    return nodes;
  }

  private static getNodesForArray(array: Array<any>, oldNodes: Array<INode> = []): Array<INode> {
    var nodes = <Array<any>>array.map((elem: any, index: number) => {
      var oldNode = oldNodes.find((oldNode) => {
        return oldNode.id === index.toString();
      });
      var node: INode = {
        id: index.toString(),
        name: null,
        type: null,
        children: null,
        isExpanded: oldNode && oldNode.isExpanded
      };

      var name = elem.toString();
      var type = typeof elem;

      if (type === 'object' && !(elem instanceof Date) || elem instanceof Array) {
        node.children = ObjectTreeComponent.getNodes(elem, oldNode && oldNode.children);
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

  private static isEmail(string) {
    return emailRegex.test(string);
  }

  private static isUrl(string) {
    return urlRegex.test(string);
  }
}

interface INode {
  id: string;
  name: string;
  type: string;
  children: Array<INode>;
  isExpanded: boolean;
}
