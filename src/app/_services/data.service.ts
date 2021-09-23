import { Injectable, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as Model from '../views/_models'

@Injectable()
export class DataService {

  private makersSource = new BehaviorSubject<Array<Model.MarkerMap>>([]);
  markers = this.makersSource.asObservable();
  @Output() infoWindowEvent: EventEmitter<Model.MarkerMap> = new EventEmitter();
  @Output() monitorViewEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() showFilterEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() countFilterEvent: EventEmitter<number> = new EventEmitter();

  @Output() refreshDataEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  setMarkers(markers: Model.MarkerMap[]) {
    this.makersSource.next(markers);
  }

  showInfoWindow(marker: Model.MarkerMap) {
    this.infoWindowEvent.emit(marker);
  }

  enableMenuMonitor(monitorView: boolean) {
    this.monitorViewEvent.emit(monitorView);
  }

  showFilter(show: boolean) {
    this.showFilterEvent.emit(show);
  }

  setCountFilter(count: number) {
    this.countFilterEvent.emit(count);
  }

  refresh(refresh: boolean) {
    this.refreshDataEvent.emit(refresh);
  }

}
