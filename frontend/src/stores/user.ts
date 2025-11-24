import { defineStore } from 'pinia'
import { login, getUserInfo, logout } from '@/api/user'
import { resetRouter } from '@/router'
import type { ApiResponse } from '@/types/response'
import type { LoginPayload, LoginData } from '@/types/user'
import { getAccessToken, setAccessToken, removeAccessToken } from '@/utils/accessToken'
import { ElMessage } from 'element-plus'
import {title, tokenName} from '@/config'

interface UserState {
  accessToken: string
  username: string
  avatar: string
  permissions: string[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    accessToken: getAccessToken() || "",
    username: '',
    avatar: '',
    permissions: []
  }),

  getters: {
    // Pinia 中 getter 自动推断类型，无需额外定义
    getAccessToken: (state) => state.accessToken,
    getUsername: (state) => state.username,
    getAvatar: (state) => state.avatar,
    getPermissions: (state) => state.permissions || [],
  },

  actions: {
    // 登录
    async login(userInfo: LoginPayload) {
      console.log("login userInfo:", userInfo)
      const {access_token, username, avatar}  = await login(userInfo)
      console.log("login response data:", access_token, name, avatar)
      // const accessToken = data[tokenName as keyof typeof data]
      console.log("accessToken:", access_token)

      if(access_token) {
        this.accessToken = access_token
        console.log("this.accessToken:", this.accessToken)
        setAccessToken(access_token)
        // 时间问候语
        const hour = new Date().getHours()
        const thisTime = 
          hour < 8 ? '早上好' :
          hour <= 11 ? '上午好' :
          hour <= 13 ? '中午好' :
          hour < 18 ? '下午好' : '晚上好'
        
        ElMessage.success(`欢迎登录${title}，${thisTime}！`)
      } else {
        ElMessage.error(`登录接口异常，未正确返回${tokenName}...`)
      }
    },

    // 获取用户信息
    async getUserInfo() {
      try {
        const { data } = await getUserInfo();
        if (!data) {
          ElMessage.error('验证失败，请重新登录...')
          return false
        }

        const { permissions, username, avatar } = data as {
          permissions: string[]
          username: string
          avatar: string
        }

        if (permissions && username && Array.isArray(permissions)) {
          this.permissions = permissions
          this.username = username
          this.avatar = avatar
          return permissions
        } else {
          ElMessage.error('用户信息接口异常')
          return false
        }
      } catch (error) {
        console.error('获取用户信息失败:', error)
        ElMessage.error('获取用户信息失败，请重新登录')
        return false
      }
    },
    
    // 退出登录
    async logout() {
      await logout();
      this.resetAccessToken()
      await resetRouter()
      location.reload()
    },

    // 重置Token
    resetAccessToken() {
      this.permissions = []
      this.accessToken = ''
      this.username = ''
      this.avatar = ''
      removeAccessToken()
    }
  }
})
