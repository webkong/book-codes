class Event {
  constructor() {
    this._cbQueue = {};
  }
  on(type, handler) {
    if (!this._cbQueue[type]) {
      this._cbQueue[type] = [handler]
    }
    this._cbQueue[type].push(handler)
  }
  emit(type, data) {
    if (this._cbQueue[type]) {
      this._cbQueue[type].forEach(cb => {
        cb(data)
      });
    } else {
      throw new Error('not found custom event : ' + type)
    }
  }
  off(type, handler) {
    const handles = this._cbQueue[type];
    if (handles) {
      if (!handler) {
        this._cbQueue[type] = [];
      } else {
        for (var i = 0; i < handles.length; i++) {
          if (handles[i] === handler) {
            this._cbQueue[type].splice(i, 1);
          }
        }
      }
    }
  }
}

module.exports = Event