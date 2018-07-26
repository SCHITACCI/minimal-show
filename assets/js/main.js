window.addEventListener("DOMContentLoaded", function() {
  var bodyEl = document.body;
  var infoEl = bodyEl.getElementsByClassName('project-info');
  var imageEl = bodyEl.getElementsByClassName('project-image');
  var activeClass = 'active';
  var preloadTime = 3000;

  var addClass = function(element, addClassName){
    if (element.classList) {
      element.classList.add(addClassName);
    }
    else {
      element.className += ' ' + addClassName;
    }
  };

  var removeClass = function() {
    if (bodyEl.classList) {
      this.classList.remove(activeClass);
    }
    else {
      this.className = this.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };

  var toggleClass = function(element, className) {
      if (element.classList) {
      element.classList.toggle(className);
      } else {
      var classes = element.className.split(' ');
      var existingIndex = classes.indexOf(className);

      if (existingIndex >= 0)
        classes.splice(existingIndex, 1);
      else
        classes.push(className);

      element.className = classes.join(' ');
    }
  };

  var EventListenerFun = function(element, eventType, fun) {
    for (var i = 0; i < element.length; i++) {
      element[i].addEventListener(eventType, fun, false);
    }
  };

  var openMenu = function(){
    toggleClass(this, 'active');
    toggleClass(bodyEl, 'info-open');
    this.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
  }

  // RUN FUNCTIONS
  EventListenerFun(infoEl, 'click', openMenu);

  setTimeout(function(){
    addClass(bodyEl, 'ready')
  }, preloadTime);

  //---
  // LAZY LOADING

  var images = document.querySelectorAll('[data-src]');

  var config = {
    rootMargin: '0px 0px 500px 0px',
    threshold: 0
  };

  var loaded = 0;

  var observer = new IntersectionObserver(function (entries, self) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        preloadImage(entry.target);
        // Stop watching and load the image
        self.unobserve(entry.target);
      }
    });
  }, config);

  images.forEach(function (image) {
    observer.observe(image);
  });

  function preloadImage(img) {
    var src = img.getAttribute('data-src');
    var srcset = img.getAttribute('data-srcset');
    if (!src) { return; }
    img.src = src;
    img.srcset = srcset
    //_updateMonitoring();
  };
}, false);
