(function () {
  console.log(window)
  if (!('indexedDB' in window)) return;
  const dbRequest = window.indexedDB.open('test', '1');
  let DB = null;
  dbRequest.onerror = (err) => {
    console.log('open db error')
  }
  dbRequest.onsuccess = (event) => {
    console.log(event)
    DB = dbRequest.result;
    console.log(DB)
    console.log('open db success')
    add();
    read();
    map();
    update();
    remove();
  }
  dbRequest.onupgradeneeded = (event) => {
    db = event.target.result;
    let objectStore;
    if (!db.objectStoreNames.contains('videos')) {
      objectStore = db.createObjectStore('videos', {
        keyPath: 'id'
      });
      objectStore.createIndex('channel_id', 'id', {
        unique: true
      })
    }
  }

  function add(){
    console.log('add')
    const transaction = DB.transaction(['videos'],'readwrite');
    const store = transaction.objectStore('videos');
    store.add({
      id: 'zLtKJ1',
      res: {
        "result_code": 200,
        "data": {
          test:[]
        },
        "timestamp": 1552548880935
      }
    })
    store.onsuccess = (event)=>{
      console.log('write success')
    }
    store.onerror = (err)=>{
      console.log('write error')
      console.log(err)
    }
    transaction.oncomplete = ()=>{
      console.log('transaction store success')
    }
  }
  function read(){
    const transaction = DB.transaction(['videos']);
    const store = transaction.objectStore('videos');
    const data = store.get('zLtKJ');
    data.onsuccess = (event)=>{
      if(event.target.result){
        console.log(event.target.result);
      }else{
        console.log('no data')
      }
    }
    data.onerror= (err)=>{
      console.log('get data error')
      console.log(err)
    }
  }
  function map(){
    const store = DB.transaction('videos').objectStore('videos');
    store.openCursor().onsuccess = (event)=>{
      const cursor = event.target.result;
      if (cursor) {
        console.log('Id: ' + cursor.key);
        console.log('value: ' + cursor.value);
        cursor.continue();
     } else {
       console.log('no more data');
     }
    }
  }
  function update(){
    const store = DB.transaction('videos','readwrite').objectStore('videos');
    const request = store.put({
      id:'zLtKJ',
      res:{
        data:{
          test:[],
          no:1
        }
      }
    });
    request.onsuccess = function (event) {
      console.log('update success');
    };
  
    request.onerror = function (event) {
      console.log('update fail');
    }
  }
  function remove() {
    var request = DB.transaction(['videos'], 'readwrite')
      .objectStore('videos')
      .delete('zLtKJ');
  
    request.onsuccess = function (event) {
      console.log('delete success');
    };
  }
  
})(window);