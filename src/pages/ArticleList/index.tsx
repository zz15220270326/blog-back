import React, { useState, useEffect } from 'react'
import '../../styles/pages/articleList.css'
import { Row, Col, List, Modal, message, Button, Switch } from 'antd'
import { getAxios } from '../../request'
// ts-rules
import { Props } from '../../ts-rules/public'
import { ListItem, MyList } from '../../ts-rules/pages/ArticleList'
// !!!!!!!!!!!!!!!!!!!!!!!!!! 
const { confirm } = Modal

export default function ArticleList(props: Props) {
  const [list, setList] = useState<ListItem[]>([])
  // 获取 / 刷新列表
  const getList = async () => {
    const result: MyList = await getAxios('getArticleList')
    setList(result.data)
  }
  useEffect(() => {
    getList()
  })
  // functions
  async function handleDelete(id: string) {
    confirm({
      title: '你确认要删除吗',
      content: '如果你点击OK按钮，文章将会永远被删除，无法恢复!',
      onOk: async () => {
        await getAxios('deleteArticle/' + id, { withCredentials: true })
        message.success('删除文章成功')
        setTimeout(() => {
          getList()
        }, 300);
      },
      onCancel: () => {
        message.success('您取消了本次删除操作')
      }
    })
  }
  function updateArticle(id: string) {
    props.history.push('/index/update/' + id)
  }
  return (
    <>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>完成时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>
            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item: ListItem) => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>
                {item.title}
              </Col>
              <Col span={4}>
                {item.type_id}
              </Col>
              <Col span={4}>
                {item.add_time}
              </Col>
              <Col span={4}>
                {item.view_count}
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={() => { updateArticle(item.id as string) }}>修改</Button>
                <Button danger type="primary" onClick={() => { handleDelete(item.id as string) }}>删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </>
  )
}
