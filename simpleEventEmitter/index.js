const Event = require('./eventEmitter');

console.log(Event.on);

Event.on("test", function(result) {
  console.log(result);
})
Event.on("test", function(result) {
  console.log("test");
})
Event.emit("test", "hello world");


//Test2
var person1 = {};
var person2 = {};

Object.assign(person1, Event);
Object.assign(person2, Event);

person1.on("call1", function() {
  console.log("person1");
});
person2.on("call2", function() {
  console.log("person2");
});

person1.emit("call1"); // 输出“person1”
person1.emit("call2"); // 没有输出
person2.emit("call1"); // 没有输出
person2.emit("call2"); // 输出”person2”