const Cookie = {
  // 设置cookie
  set (name, value, exdays = 30, domain = window.location.hostname, path = '/') {
    const expires = new Date(Date.now() + exdays * 24 * 60 * 60 * 1000).toUTCString();
    let Domain = '';
    if (domain.indexOf('.com') > -1) {
      Domain = `Domain=.${domain};`;
    }
    document.cookie = `${name}=${value};${Domain}expires=${expires};path=${path}`;
  },

  // 获取cookie
  get (name) {
    name += '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
    }
    return '';
  },

  // 清除cookie
  clear (name) {
    this.set(name, '', -1);
  }
};

export default Cookie;
