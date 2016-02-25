
import { Component, Input } from 'angular2/core';
import { OnlineResource } from '../../../../model/iso/gmd/OnlineResource';
import { EditorComponent }  from '../../EditorComponent';

@Component({
  selector: 'onlineResource',
  template: require('./OnlineResourceComponent.html')
})
export class OnlineResourceComponent implements EditorComponent<OnlineResource> {
  @Input()
  public element: OnlineResource;
}
