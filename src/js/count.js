export default function count(x, y) {
  return x + y;
}

function curry(fn) {
  return _curry(fn, fn.length);
}
function _curry(fn, len, ...args) {
  return function (...params) {
    const _args = args.concat(params);
    if (_args.length >= len) {
      fn.apply(this, ..._args);
    } else {
      return _curry.apply(this, fn, len, ..._args);
    }
  };
}
curry(add);
function add() {
  let args = [...arguments];
  function _add() {
    args = args.concat([...arguments]);
    return _add;
  }
  _add.toString = function () {
    return args.reduce((pre, cur) => {
      return pre + cur;
    });
  };
  return _add();
}
