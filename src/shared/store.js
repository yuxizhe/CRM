/* ========================================================
    ** 全局Store **
   ====================================================== */
import { observable, action } from 'mobx'

class Store {
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

export default new Store()
