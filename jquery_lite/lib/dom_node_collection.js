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

module.exports = DOMNodeCollection;
