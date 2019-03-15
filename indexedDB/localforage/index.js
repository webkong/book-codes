localforage.config({
  driver: [
    localforage.INDEXEDDB
  ],
  name: 'cricket',
  storeName: 'test'
});

localforage.setItem('idjs', {
  id: 111,
  value: 1111
}).then((result) => {
  console.log(result)
}).catch((err) => {
  
});