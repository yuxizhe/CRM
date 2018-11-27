/* ========================================================
    ** 全局Store **
   ====================================================== */
import { observable, action } from 'mobx'
import sideBar from './sideBar'
class gStore {
  @observable userInfo = {
    name: 'admin'
  }
  @observable loading = false
  @action updateName = name => {
    this.userInfo.name = name
  }
  @action updateLoading = boolean => {
    this.loading = boolean
  }
}

export default {
  gStore: new gStore(),
  sideBar: new sideBar()
}
