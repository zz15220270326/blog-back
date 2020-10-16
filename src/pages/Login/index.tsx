import React, { useState } from 'react'
import '../../styles/pages/login.css'
import { Card, Input, Button, Spin, message } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import { postAxios } from '../../request'
// rules
import { Props } from '@/ts-rules/public'
import { Event, LoginUrl, LoginInfo, LoginReturn } from '@/ts-rules/pages/Login'

export default function Login(props: Props) {
  // state: userName, password, inLoading
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [inLoading, setInLoading] = useState(false)
  // methods
  function getUserName(e: Event) {
    let { value } = e.target
    setUserName(value)
  }
  function getPassword(e: Event) {
    let { value } = e.target
    setPassword(value)
  }
  async function VerifyLogin() {
    setInLoading(true)
    if (!userName) {
      message.error('请输入用户名！')
      setInLoading(false)
      return
    } else if (!password) {
      message.error('请输入密码！')
      setInLoading(false)
      return
    }
    const loginInfo = {
      'userName': userName,
      'password': password
    }
    const result = await postAxios<LoginUrl, LoginInfo, LoginReturn>('checkLogin', loginInfo)
    // 获取后台返回的登录状态、openId(用于本地缓存)
    const status = await result.data
    const { openId } = result
    // console.log('openId', openId, typeof (openId))
    if (status === '登录成功!') {
      console.log('把openId写进缓存中。。。');
      localStorage.setItem('openId', openId.toString())
      message.success(status)
      setUserName('')
      setPassword('')
      props.history.push('/index')
    } else {
      // login-fail
      message.error('用户名账号或密码错误!')
    }
    setTimeout(() => {
      setInLoading(false)
    }, 300)
  }
  return (
    <div className="login-page">
      <Spin tip="加载中。。。" spinning={inLoading}>
        <Card className="login-card" title="登录" bordered={!inLoading} >
          <Input
            id="userName"
            value={userName}
            size="large"
            placeholder="please input username"
            prefix={<UserOutlined />}
            onChange={getUserName}
          />
          <br /> <br />
          <Input.Password
            id="password"
            value={password}
            size="large"
            placeholder="please input password"
            prefix={<KeyOutlined />}
            onChange={getPassword}
          />
          <Button type="primary" size="large" block onClick={VerifyLogin}>点击登录</Button>
        </Card>
      </Spin>
    </div>
  )
}
