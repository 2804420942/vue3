const { setTimeout } = require("core-js");

function deepClone(obj = {}, map = new Map()) {
  if(typeof obj !== 'object') {
    return obj;
  }
  if(map.has(obj)) return map.get(obj);
  let res = {};
  if(Array.isArray(obj)) res = [];
  map.set(obj, res);
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      res[key] = deepClone(obj, map);
    }
  }
  return res;
}

function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    if(timer) clearInterval(timer);
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

function throttle(fn, delay) {
  let previous = new Date() 
  return function(...args) {
    if(new Date() - previous) {
      fn.apply(this, args);
      previous = new Date()
    }
  }
}

function reverseBetween( head ,  left ,  right ) {
  // write code here
  let dommyNode = new ListNode(-1);
  dommyNode.next = head;
  let pre = dommyNode;
  for(let i = 0; i < left - 1; i++) {
      pre = pre.next;
  }
  let rightNode = pre;
  for(let i = 0; i < right - left + 1; i++) {
      rightNode = rightNode.next;
  }
  let leftNode = pre.next;
  let curr = rightNode.next;
  pre.next = null;
  rightNode.next = null;
  reverseListNode(leftNode);
  pre.next = rightNode;
  leftNode.next = curr;
  return dommyNode.next;
  function reverseListNode(head) {
      let cur = head, pre = null;
      while(cur) {
          let next = cur.next;
          cur.next = pre;
          pre = cur;
          cur = next;
      }
  }
}
