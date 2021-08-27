import axios from 'axios'
import { Injectable } from '@tiejs/common'

/**
 * 发送请求
 */

@Injectable()
export class Http {
  private config = {
    timeout: 5000,
  }
  /**
   * 发送get请求
   * @param url
   */
  async get(url: string) {
    try {
      const res = await axios.get(url, this.config)
      return res
    } catch (error) {
      return error
    }
  }

  async post(url: string, data: any) {
    try {
      const res = await axios.post(url, data, this.config)
      return res
    } catch (error) {
      return error
    }
  }
}
