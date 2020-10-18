import React, { useState } from 'react'
import '../../styles/pages/admin.css'
// !!! child && Router
// ? child-components
import AdminRouter from '../MainRouter/ChildRouter/Admin'
// ? ts-rules
import { HandleEvent, Props } from '../../ts-rules/public'
// ! antd antd-icons
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

export default function Admin(props: Props) {
  // state
  const [collapsed, setCollapsed] = useState(false)
  // functions
  function onCollapse(collapsed: boolean) {
    setCollapsed(collapsed)
  }
  //<--|*|-->// route-fucs
  // function routeToIndex(e: HandleEvent) {
  //   if (e.key as string === 'index') {
  //     props.history.replace('/index/')
  //   }
  // }
  function toAddArticle(e: HandleEvent) {
    if (e.key === 'ADD') {
      props.history.push('/index/add/')
    }
  }
  function toArticleList(e: HandleEvent) {
    if (e.key === 'LIST') {
      props.history.push('/index/list/')
    }
  }
  return (
    <div className="admin-page">
      <Layout className="admin-layout" style={{ minHeight: '100vh' }}>
        <Sider className="admin-slider" collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['LIST']} mode="inline">
            <Menu.Item key="USER" icon={<UserOutlined />} >
              用户个人
          </Menu.Item>
            <Menu.Item key="DESKTOP" >
              <DesktopOutlined />
            工作台
          </Menu.Item>
            <Menu.Item key="TODAY_REMIND" icon={<CalendarOutlined />}>
              今日提醒
          </Menu.Item>
            <SubMenu key="INDEX" icon={<BookOutlined />} title="文章管理" >
              <Menu.Item key="LIST" onClick={toArticleList}>
                查看列表
              </Menu.Item>
              <Menu.Item key="ADD" onClick={toAddArticle}>
                添加/修改
              </Menu.Item>
            </SubMenu>
            <SubMenu key="UPLOAD" icon={<UploadOutlined />} title="上传">
              <Menu.Item key="UPLOAD_ARTICLE">上传文章</Menu.Item>
              <Menu.Item key="UPLOAD_VIDEOS">上传视频</Menu.Item>
              <Menu.Item key="UPLOAD_OTHERS">上传其他</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content className="article-content" >
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>管理员界面</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <AdminRouter />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#666' }}>详情咨询: 15220270326</Footer>
        </Layout>
      </Layout>
    </div>
  )
}
