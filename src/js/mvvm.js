function Observe(obj) {
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key]);
  });
}

function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key);
      return val;
    },
    set(newVal) {
      console.log('set', key);
      val = newVal;
      kvue.update();
    }
  });
}

function Vue(options) {
  this.$options = options;
  this.$data = options.data();
  Observe(this.$data);
}

Vue.prototype.$mount = function(sel) {
  this.update = function() {
    console.log('vue update');
    const child = this.$options.render.call(this);
    const parent = document.querySelector(sel);
    if(!this.isMounted) {
      // 转换生成dom
      parent.appChild(child);

      this.isMounted = true;
      if(this.$options.mounted) {
        this.$options.mounted.call(this);
      } else {
        parent.innerHTML = '';
        parent.appendChild(child);
      }
    }
  }
  this.update();
}


const kvue = new Vue({
  data() {
    return {
      title: '我是一个标题',
    }
  },
  mounted() {
    kvue.$data.title = '我是新标题';
  },
  render() {
    const h3 = document.createElement('h3');
    h3.textContent = this.$data.title;
    return h3;
  }
})
kvue.$mount('#app');

setTimeout(() => {
  kvue.$data.title = '我是新标题';
}, 2000);
