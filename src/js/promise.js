const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
  }
  status = PENDING
  value = undefined
  reason = undefined
  successCallback = []
  failCallback = []

  resolve = (value) => {
    if(this.status != PENDING) return
    this.status = FULFILLED
    this.value = value
    while(this.successCallback.length) {
      this.successCallback.shift()()
    }
    // this.successCallback && this.successCallback(this.value)
  }
  reject = (reason) => {
    if(this.status != PENDING) return
    this.status = REJECT
    this.reason = reason
    while(this.failCallback.length) {
      this.failCallback.shift()()
    }
    // this.failCallback && this.failCallback(this.reason)
  }
  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : value => value
    failCallback = failCallback ? failCallback : reason => {throw reason}
    let promise2 = new MyPromise((resolve, reject) => {
      if(this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      } else if(this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      } else {
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          }, 0)
        })
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          }, 0)
        })
      }
    })
    
    return promise2
  }
}
function resolvePromise(x, resolve, reject) {
  if(promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if(x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}



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
