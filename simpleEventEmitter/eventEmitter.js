let Event = {}; //

Object.defineProperty(Event, "_cbQueue", {
  value: {},
  writable: true,
  enumerable: false, //将枚举设置为false，防止在copy属性的时候，不会被复制。
  configurable: true
});

Event.on = function (type, handler) {
  this._cbQueue = this._cbQueue || {};
  this._cbQueue[type] = this._cbQueue[type] || [];
  this._cbQueue[type].push(handler);
  return this;
}

Event.emit = function (type, data) {
  if (this._cbQueue[type]) {
    this._cbQueue[type].forEach(cb => {
      cb(data);
    });
  }else {
    throw new Error('not found custom event : ' + type)
  }
}

Event.off = function (type, handle) {
  var handles = this._cbQueue[type];
  if (handles) {
    if (!handle) {
      this._cbQueue[type] = [];
    } else {
      for (var i = 0; i < handles.length; i++) {
        if (handles[i] === handle) {
          this._cbQueue[type].splice(i, 1);
        }
      }
    }
  }

}
module.exports = Event;