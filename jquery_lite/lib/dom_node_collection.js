class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  html (string) {
    if (string) {
      this.htmlElements.forEach( (el, idx) => {
        el.innerHTML = string;
      });
    } else {
      return this.htmlElements[0].innerHTML;
    }
  }

  empty () {
    this.htmlElements.forEach( (el, idx) => {
      el.innerHTML = '';
    });
  }

  append (arg) {
    if (arg instanceof HTMLElement || arg instanceof String) {
      this.htmlElements.forEach( (el, idx) => {
        el.innerHTML.appendChild(arg);
      });
    } else {
      this.htmlElements.forEach( (el, idx) => {
        arg.forEach( (el2, idx2) => {
          el.innerHTML.appendChild(el2.outerHTML);
        });
      });
    }
  }

  attr (key, val) {
    if (!val) {
      return this.htmlElements[0].getAttribute(key);
    } else {
      this.htmlElements[0].setAttribute(key, val);
    }
  }

  addClass (string) {
    this.htmlElements[0].classList.add(string);
  }

  removeClass (string) {
    this.htmlElements[0].classList.remove(string);
  }

  children () {
    const allChildren = [];
    this.htmlElements.forEach( (parent, idx) => {
      allChildren.push(parent.children);
    });
    return new DOMNodeCollection(allChildren);
  }

  parent () {
    const parents = [];
    this.htmlElements.forEach( (child, idx) => {
      parents.push(child.parentNode);
    });
    return new DOMNodeCollection(parents);
  }

  find (selector) {
    let array = this.htmlElements;
    this.htmlElements.forEach(el => {
      console.log(typeof el);
      array.push(el.querySelectorAll(selector));
    });

    return array;
  }

  remove () {
    this.htmlElements.forEach(el => {
      el.innerHTML = '';
      el.remove();
    });
  }

  on (e, callback) {
    this.htmlElements.forEach(el => {
      el.addEventListener(e, callback);
      el.callback = callback;
    });
  }

  off (e) {
    this.htmlElements.forEach(el => {
      // console.log(el);
      console.log(el.callback);
      el.removeEventListener(e, el.callback);
      // console.log(typeof eval(el.getAttribute('callback')));
      // console.log(eval(el.getAttribute('callback')));
    });
  }


}

$l.ajax = function(options) {
  const defaults = {
    success: successCallback,
    error: 'error',
    url: '',
    method: 'GET',
    data: ,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  }
  function successCallback(data, textStatus, jqXHR) {

  }
  const xhr = new XMLHttpRequest;
  xhr.addEventListener('load', cb);
  xhr.open(options.type, options.url);
  const json = JSON.stringify({query: this.input.value});
  xhr.send();

//   //step 1 - create xhr object
// const xhr = new XMLHttpRequest();
//
// // step 2 - specify path and verb
// xhr.open('POST', 'api/path/to/resource');
//
// // step 3 - register a callback
// xhr.onload = function () {
//   console.log(xhr.status) // for status info
//   console.log(xhr.responseType) //the type of data that was returned
//   console.log(xhr.response) //the actual response. For JSON api calls, this will be a JSON string
// }
//
// // step 4 - send off the request with optional data
// const optionalData = { name: "User1", password : "123456" };
// xhr.send(optionalData);
}

module.exports = DOMNodeCollection;
