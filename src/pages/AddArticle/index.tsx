import React, { useState, useEffect } from 'react'
import marked from 'marked'
import '../../styles/pages/addArticle.css'
// getAxios
import { getAxios } from '../../request'
// antd
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
// ts-rules
import { Props } from '../../ts-rules/public/'
import { InputEvent, TypeInfo, TypeInfoChild } from '../../ts-rules/pages/AddArticle'

const { Option } = Select
const { TextArea } = Input


export default function AddArticle(props: Props) {
  // state
  // const [articleId, setArticleId] = useState(0)
  const [articleTitle, setArticleTitle] = useState('')
  const [articleContent, setArticleContent] = useState('')
  const [markdownContent, setMarkdownContent] = useState('将要展示的内容')
  const [articleIntroduce, setArticleIntroduce] = useState('')
  const [introduceHtml, setIntroduceHtml] = useState('简介预览')
  const [showDate, setShowDate] = useState<string>('')   //发布日期
  // const [updateDate, setUpdateDate] = useState('') //修改日志的日期
  const [typeInfo, setTypeInfo] = useState<TypeInfoChild[]>([])// 文章类别信息
  const [selectedType, setSelectType] = useState<string>('默认内容') //选择的文章类别
  // useEffect -> getTypeInfo
  useEffect(() => {
    const getTypeInfo = async () => {
      const result = await getAxios<TypeInfo>('getTypeInfo')
      if (result.data as string === '没有登录!') {
        localStorage.removeItem('openId')
        props.history.push('/login')
        return
      } else {
        const list = result.data as TypeInfoChild[]
        setTypeInfo(list)
      }
    }
    getTypeInfo()
  }, [])
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
  function changeContent(e: InputEvent) {
    let { value } = e.target
    setArticleContent(value)
    setMarkdownContent(marked(value))
  }
  function changeIntroduce(e: InputEvent) {
    let { value } = e.target
    setArticleIntroduce(value)
    setIntroduceHtml(marked(value))
  }
  function selectTypeHandler(value: string) {
    setSelectType(value)
  }
  function dateHandler(date: any, dateString: string) {
    setShowDate(dateString)
  }
  function changeTitle(e: InputEvent) {
    setArticleTitle(e.target.value)
  }
  function saveArticle() {
    if (selectedType === '默认内容') {
      message.error('你还没有选择类型...')
    } else if (!showDate) {
      message.error('你还没有选择日期...')
    } else if (!articleTitle) {
      message.error('文章标题不能为空...')
    } else if (!articleContent) {
      message.error('文章内容不能为空...')
    } else if (!articleIntroduce) {
      message.error('简介也不能为空...')
    } else {
      message.success('保存成功! ')
    }
  }
  return (
    <div className="add-article-page">
      <Row gutter={5}>
        <Col span={18}>
          <Row className="search-input" gutter={10}>
            <Col span={20}>
              <Input placeholder="Blog title" value={articleTitle} onChange={changeTitle} size="large" />
            </Col>
            <Col span={4}>
              <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler}>
                {typeInfo.map((item: TypeInfoChild, index: number) => (
                  <Option key={index} value={item.id}>{item.typeName}</Option>
                ))}
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
              <Button className="save-button" type="default" size="large" onClick={saveArticle}>暂存文章</Button>
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
              />
              <br /><br />
              <div className="introduce-html" dangerouslySetInnerHTML={{ __html: introduceHtml }} />
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  style={{ width: '250px' }}
                  onChange={dateHandler}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
