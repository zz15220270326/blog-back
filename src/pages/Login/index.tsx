import React, { useState } from 'react'
import '../../styles/pages/login.css'
import { Card, Input, Button, Spin } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'

export default function Login() {
  // state: userName, password, inLoading
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [inLoading, setInLoading] = useState(false)
  // methods
  function getUserName(e: any) {
    let { value } = e.target
    setUserName(value)
    console.log('userName: ', userName);
  }
  function getPassword(e: any) {
    let { value } = e.target
    setPassword(value)
    console.log('password: ', password);
  }
  function VerifyLogin() {
    setInLoading(true)
    setTimeout(() => { setInLoading(false) }, 1000)
  }
  return (
    <div className="login-page">
      <Spin tip="加载中。。。" spinning={inLoading}>
        <Card className="login-card" title="登录" bordered={!inLoading} >
          <Input
            id="userName"
            size="large"
            placeholder="please input username"
            prefix={<UserOutlined />}
            onChange={getUserName}
          />
          <br /> <br />
          <Input.Password
            id="password"
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
