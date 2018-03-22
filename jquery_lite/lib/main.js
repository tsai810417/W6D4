const DOMNodeCollection = require('./dom_node_collection');
Window.prototype.$l = function(htmlElement) {
  let nodeList;
  let nodeListArr;
  let nodeListCollection;
  if (htmlElement instanceof HTMLElement) {
    const array = [htmlElement];
    nodeListCollection = new DOMNodeCollection(array);
  } else {
    nodeList = document.querySelectorAll(htmlElement);
    nodeListArr = Array.from(nodeList);
    nodeListCollection = new DOMNodeCollection(nodeListArr);
  }
  return nodeListCollection;
};
