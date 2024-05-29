import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  private state = new BehaviorSubject<string>('Hello World');
  state$ = this.state.asObservable();

  constructor() { }

  setState(newState: string) {
    this.state.next(newState);
  }

  getState(): string {
    return this.state.value;
  }
}
