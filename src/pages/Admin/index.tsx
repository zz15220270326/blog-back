import React, { useState } from 'react'
import '../../styles/pages/admin.css'
// !!! child && Router
// ? child-components
import AddArticle from '../AddArticle'
// ? react-router-dom
import { Route } from 'react-router-dom'
// antd antd-icons
import { Layout, Menu, Breadcrumb } from 'antd'
import {
  DesktopOutlined,
  UserOutlined,
  CalendarOutlined,
  BookOutlined,
  UploadOutlined
} from '@ant-design/icons'
// const { Header, } = Layout
const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu

export default function Admin() {
  // state
  const [collapsed, setCollapsed] = useState(false)
  // functions
  function onCollapse(collapsed: boolean) {
    setCollapsed(collapsed)
  }
  return (
    <div className="admin-page">
      <Layout className="admin-layout" style={{ minHeight: '100vh' }}>
        <Sider className="admin-slider" collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="0" icon={<UserOutlined />} >
              用户个人
          </Menu.Item>
            <Menu.Item key="1" >
              <DesktopOutlined />
            工作台
          </Menu.Item>
            <Menu.Item key="2" icon={<CalendarOutlined />}>
              今日提醒
          </Menu.Item>
            <SubMenu key="sub1" icon={<BookOutlined />} title="文章管理">
              <Menu.Item key="3">添加文章</Menu.Item>
              <Menu.Item key="4">修改文章</Menu.Item>
              <Menu.Item key="5">删除文章</Menu.Item>
              <Menu.Item key="6">管理文章</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<UploadOutlined />} title="上传">
              <Menu.Item key="7">上传文章</Menu.Item>
              <Menu.Item key="8">上传视频</Menu.Item>
              <Menu.Item key="9">上传其他</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ background: '#000', padding: 0, }} /> */}
          <Content className="article-content" >
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>管理员界面</Breadcrumb.Item>
              <Breadcrumb.Item>新增文章</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <div>
                <Route path="/index/" exact component={AddArticle} />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#666' }}>详情咨询: 15220270326</Footer>
        </Layout>
      </Layout>
    </div>
  )
}
