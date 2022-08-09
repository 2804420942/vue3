import {reactive} from 'vue'
let _Vue:any = null
export default class VueRouter {
  options: any
  routeMap: any
  data: any
  static installed: boolean
  install(Vue: any) {
    if(VueRouter.installed) {
      return 
    }
    VueRouter.installed = true
    _Vue = Vue
    _Vue.mixin({
      beforeCreate() {
        console.log(111)
        if(this.$options.router) {
          console.log(111)
          _Vue.prototype.$router = this.options.routes
          this.$options.$router.init()
        }
      }
    })
  }
  constructor (options: any) {
    this.options = options
    console.log(111, this.options)
    this.routeMap = {}
    this.data = reactive({
      current: '/'
    })
  }
  init() {
    this.createRouteMap()
    this.initComponents(_Vue)
  }
  createRouteMap() {
    this.options.routes.forEach((route: any) => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponents (Vue: any) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(h: any) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler(e: any) {
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
      // template: '<a :href="to"><slot></slot></a>'
    })
    const self = this
    Vue.component('router-view', {
      render(h: any) {
        const component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }
  initEvent() {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}