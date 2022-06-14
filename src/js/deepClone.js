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