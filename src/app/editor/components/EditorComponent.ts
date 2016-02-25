import { EventEmitter } from 'angular2/core';
import { Control, ControlGroup, ControlArray }  from 'angular2/common';

export interface EditorComponent<T> {
  element: T;
  //elementChanged: EventEmitter<T>;
}
