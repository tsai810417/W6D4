const DOMNodeCollection = require('./dom_node_collection');
let functionArr = [];
Window.prototype.$l = function(arg) {
  let nodeList;
  let nodeListArr;
  let nodeListCollection;
  if (arg instanceof HTMLElement) {
    const array = [arg];
    nodeListCollection = new DOMNodeCollection(array);
  } else if (arg instanceof Function) {
    if (document.readyState === 'complete') {
      return arg();
    } else {
      functionArr.push(arg);
    }
  } else {
    nodeList = document.querySelectorAll(arg);
    nodeListArr = Array.from(nodeList);
    nodeListCollection = new DOMNodeCollection(nodeListArr);
  }
  return nodeListCollection;
};
document.addEventListener("DOMContentLoaded", () => {
  functionArr.forEach( fcn => {
    fcn();
  });
});
