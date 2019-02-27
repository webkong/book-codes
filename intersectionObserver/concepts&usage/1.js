var options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: [0.5,1.0]
}
var callback = function (entries, observer) {
  /* Content excerpted, show below */
  entries.forEach(entry => {
    console.log(entry);
    console.log(entry.time); // a DOMHightResTimeStamp indicating when the intersection occurred.
    console.log(entry.rootBounds); // a DOMRectReadOnly for the intersection observer's root.
    console.log(entry.boundingClientRect); // a DOMRectReadOnly for the intersection observer's target.
    console.log(entry.intersectionRect); // a DOMRectReadOnly for the visible portion of the intersection observer's target.
    console.log(entry.intersectionRatio); // the number for the ratio of the intersectionRect to the boundingClientRect.
    console.log(entry.target); //the Element whose intersection with the intersection root changed.
  });

};
var observer = new IntersectionObserver(callback, options);

var target = document.querySelector('.black');

observer.observe(target)