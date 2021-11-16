import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class LoaderService {

  private _isLoading$ = new BehaviorSubject<boolean>(true);
  isLoading$: Observable<boolean> = this._isLoading$.asObservable();

  show() {
    this._isLoading$.next(true);
  }

  hide() {
    this._isLoading$.next(false);
  }
}
