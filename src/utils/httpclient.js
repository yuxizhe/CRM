import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
import Cookie from 'src/utils/cookie';

class HttpClient {
  baseUrl = '';

  instance = axios.create({
    baseURL: this.baseUrl,
    timeout: 20000,
    withCredentials: true,
  });

  get(url, params, header) {
    return this.instance
      .get(url, { params }, header)
      .then(this.handleSuccessResponse.bind(this))
      .catch(this.handleErrorResponse.bind(this));
  }

  post(url, params, header) {
    if (!header) {
      params = qs.stringify(params);
    }
    return this.instance
      .post(url, params, header)
      .then(this.handleSuccessResponse.bind(this))
      .catch(this.handleErrorResponse.bind(this));
  }

  handleSuccessResponse(res) {
    res = res.data;
    if (res) {
      return res;
    } if (res.error_code === '400016' || res.error_code === '79003') {
      if (process.env.NODE_ENV === 'development') {
        Cookie.clear('xq_crm_token');
      }
      window.localStorage.removeItem('is_login');
      window.location.href = '/login';
    } else {
      message.error(res.msg);
      throw new Error('StopChain');
    }
  }

  handleErrorResponse(err) {
    if (err && err.message !== 'StopChain') {
      message.error(err.message || '未知错误');
    }
    throw new Error('StopChain');
  }
}

export default new HttpClient();
