import React, { useState } from 'react'
import marked from 'marked'
import '../../styles/pages/addArticle.css'
// antd
import { Row, Col, Input, Select, Button, DatePicker } from 'antd'
const { Option } = Select;
const { TextArea } = Input

export default function AddArticle() {
  // state
  const [articleId, setArticleId] = useState(0)
  const [articleTitle, setArticleTitle] = useState('')
  const [articleContent, setArticleContent] = useState('')
  const [markdownContent, setMarkdownContent] = useState('将要展示的内容')
  const [articleIntroduce, setArticleIntroduce] = useState('')
  const [introduceHtml, setIntroduceHtml] = useState('简介预览')
  const [showDate, setShowDate] = useState('')   //发布日期
  const [updateDate, setUpdateDate] = useState('') //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState(1) //选择的文章类别
  // marked settings
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    // tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  })
  // functions
  function changeContent(e: any) {
    let { value } = e.target
    setArticleContent(value)
    setMarkdownContent(marked(value))
  }
  function changeIntroduce(e: any) {
    let { value } = e.target
    setArticleIntroduce(value)
    setIntroduceHtml(marked(value))
  }
  return (
    <div className="add-article-page">
      <Row gutter={5}>
        <Col span={18}>
          <Row className="search-input" gutter={10}>
            <Col span={20}>
              <Input placeholder="Blog title" size="large" />
            </Col>
            <Col span={4}>
              <Select defaultValue="1" size="large">
                <Option value="1">个人日志</Option>
                <Option value="2">生活分享</Option>
                <Option value="3">学术日志</Option>
                <Option value="4">新技术分享</Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12} className="markdown-content">
              <TextArea
                className="markdown-input"
                rows={30}
                placeholder="article content"
                value={articleContent}
                onChange={changeContent}
                onPressEnter={changeContent}
              />
            </Col>
            <Col span={12} className="html-content">
              <div className="show-html" dangerouslySetInnerHTML={{ __html: markdownContent }} />
            </Col>
          </Row>
        </Col>
        <Col span={6} className="other-content">
          <Row>
            <Col span={24} className="manage-content">
              <Button className="save-button" type="default" size="large">暂存文章</Button>
              <Button className="dispatch-button" type="primary" size="large">发布文章</Button>
            </Col>
            <Col span={24} className="introduce-content">
              <br />
              <TextArea
                rows={4}
                placeholder="文章简介"
                style={{ height: '200px' }}
                value={articleIntroduce}
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
              />
              <br /><br />
              <div className="introduce-html" dangerouslySetInnerHTML={{ __html: introduceHtml }} />
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  style={{ width: '250px' }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
