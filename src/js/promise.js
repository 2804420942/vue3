import { resolve } from "core-js/fn/promise";

export function _all(promises) {
  let count = 0; len = promise.length, result = [];
  
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      Promise.resolve(p).then((res) => {
        result[count] = res;
        count++;
        if(count === len) {
          resolve(result);
        }
      }).catch(err => {
        reject(err);
      })
    })
  });
}

export function _allSettled(promises) {
  let count = 0, len = promises.length, result = [];
  return new Promise((resolve, reject) => [
    promises.forEach(p => {
      Promise.resolve(p).then(res => {
        result[count] = res;
        count++;
        if(count === len) {
          resolve(result);
        }
      }).catch(err => {
        result[count] = err;
        count++;
        if(count === len) {
          reject(result);
        }
      })
    })
  ]);
}

export function _any(promises) {
  let count = 0, len = promises.length, result = [];
  return new Promise((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p).then(res => {
        resolve(res);
      }).catch(err => {
        res[count] = err;
        count++;
        if(count === len) {
          reject(result);
        }
      })
    })
  });
}

export function _race(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(p => {
      Promise.resolve(p).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    });
  });
}
