export interface IBus {
  listen():Rx.Observable<any>;
  dispatch(info: any):void;
}
