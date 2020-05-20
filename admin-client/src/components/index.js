export { default as Head } from './head/Head'
export { default as Menu } from './menu/Menu'
export { default as MyEditor } from './MyEditor'
export { default as MySticky } from './MySticky'
export { default as MyBreadcrumb } from './MyBreadcrumb'

import MyPagination from './MyPagination'
import DelDialog from './DelDialog'
import MyUpload from './MyUpload'

export const components = Vue => {
  Vue.component('MyPagination', MyPagination)
  Vue.component('DelDialog', DelDialog)
  Vue.component('MyUpload', MyUpload)
}
