export class Observable {
  constructor() {
    this.observers = {};
  }

  subscribe(event, callBack) {
    if (!this.observers[event]) this.observers[event] = [];
    this.observers[event].push(callBack);
  }

  notify(event, data) {
    if (this.observers[event])
      return this.observers[event].forEach((callBack) => {
        callBack(data);
      });
  }
}
