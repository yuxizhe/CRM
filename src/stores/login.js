import { observable, action, computed } from "mobx";
import HttpClient from "src/utils/httpclient";
import Cookie from "src/utils/cookie";

export default class LoginStore {
  @observable username = "";
  @observable password = "";

  @computed get isLogged() {
    return !!+window.localStorage.getItem("is_login");
  }

  @action login(form) {
    HttpClient.post("/xq/report/auth/login.json", {
      username: form.username,
      password: form.password
    }).then(res => {
      if (res) {
        let token = res.data.xq_crm_token;

        window.localStorage.setItem("is_login", "1");
        window.localStorage.setItem("userName", form.username);
        if (process.env.NODE_ENV === "development") {
          Cookie.set("xq_crm_token", token);
        }
        window.location.href = "/";
      }
    });
  }
}
