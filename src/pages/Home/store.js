/**
 * 局部store
 */
// import { observable, action } from 'mobx'

class store {
  userInfo = {
    name: "local store"
  };
  loading = false;
  updateName = name => {
    this.userInfo.name = name;
  };
  updateLoading = boolean => {
    this.loading = boolean;
  };
}

export default new store();
