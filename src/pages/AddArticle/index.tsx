import React, { useState, useEffect } from 'react'
import marked from 'marked'
import '../../styles/pages/addArticle.css'
// getAxios, postAxios 
import { getAxios, postAxios } from '../../request'
// antd
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
// ts-rules
import { Props } from '../../ts-rules/public/'
import { InputEvent, TypeInfo, TypeInfoChild, Article, InsertResult, GetArticleById } from '../../ts-rules/pages/AddArticle'

const { Option } = Select
const { TextArea } = Input

export default function AddArticle(props: Props) {
  // state
  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState('')
  const [article_content, setArticle_content] = useState('')
  const [markdownContent, setMarkdownContent] = useState('将要展示的内容')
  const [introduce, setIntroduce] = useState('')
  const [introduceHtml, setIntroduceHtml] = useState('简介预览')
  const [add_time, setAdd_time] = useState<string>('')   //发布日期
  // const [updateDate, setUpdateDate] = useState('') //修改日志的日期
  const [typeInfo, setTypeInfo] = useState<TypeInfoChild[]>([])// 文章类别信息
  const [type_id, setType_id] = useState<string>('默认内容') //选择的文章类别
  // useEffect -> (getTypeInfo, getArticleById)
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
  const getArticleById = async (id: string) => {
    const result: GetArticleById = await getAxios('getArticleById/' + id, { withCredentials: true, header: { 'Access-Control-Allow-Origin': '*' } })
    const article = result.data[0]
    setType_id(article.type_id as string)
    setTitle(article.title)
    setArticle_content(article.article_content)
    const markdownContent = marked(article.article_content)
    setMarkdownContent(markdownContent)
    setIntroduce(article.introduce as string)
    const html = marked(article.introduce as string)
    setIntroduceHtml(html)
    setAdd_time(article.add_time as string)
  }
  useEffect(() => {
    getTypeInfo()
    let tmpId: string | number = props.match.params.id
    if (tmpId) {
      setId(tmpId as number)
      getArticleById(tmpId as string)
    }
  }, [id])
  // , []
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
    setArticle_content(value)
    setMarkdownContent(marked(value))
  }
  function changeIntroduce(e: InputEvent) {
    let { value } = e.target
    setIntroduce(value)
    setIntroduceHtml(marked(value))
  }
  function selectTypeHandler(value: string) {
    setType_id(value)
  }
  function dateHandler(date: any, dateString: string) {
    setAdd_time(dateString)
  }
  function changeTitle(e: InputEvent) {
    setTitle(e.target.value)
  }
  async function saveArticle() {
    if (type_id === '默认内容') {
      message.error('你还没有选择类型...')
    } else if (!add_time) {
      message.error('你还没有选择日期...')
    } else if (!title) {
      message.error('文章标题不能为空...')
    } else if (!article_content) {
      message.error('文章内容不能为空...')
    } else if (!introduce) {
      message.error('简介也不能为空...')
    }
    else {
      const article: Article = {
        type_id,
        title,
        article_content,
        introduce,
      }
      //把字符串转换成时间戳
      let datetext = add_time.replace('-', '/')
      article.add_time = ((new Date(datetext).getTime()) / 1000).toString()
      // 自动生成 id 和 view_count, 并post到中台
      if (id === 0) {
        // 如果该id还没有的话  初始化id和观看人数
        article.id = id
        article.view_count = Math.ceil(Math.random() * 100) + 1000
        const result = await postAxios<string, Article, InsertResult>('saveArticle', article)
        console.log(result)

        if (result.insertSuccess === true) {
          // 设置新的文章id
          const newId = result.insertId as number
          setId(newId)
          // setId(id + 1)
          message.success('文章写入成功!')
        } else {
          message.error('文章写入失败!')
        }
      } else {
        article.id = id
        const result = await postAxios<string, Article, InsertResult>('updateArticle', article)
        if (result.insertSuccess === true) {
          message.success('文章保存成功!')
        } else {
          message.error('文章保存失败!')
        }
      }
    }
  }
  return (
    <div className="add-article-page">
      <Row gutter={5}>
        <Col span={18}>
          <Row className="search-input" gutter={10}>
            <Col span={20}>
              <Input placeholder="Blog title" value={title} onChange={changeTitle} size="large" />
            </Col>
            <Col span={4}>
              <Select defaultValue={type_id} size="large" onChange={selectTypeHandler}>
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
                value={article_content}
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
              <Button className="save-button" type="default" size="large">暂存文章</Button>
              <Button className="dispatch-button" type="primary" size="large" onClick={saveArticle}>发布文章</Button>
            </Col>
            <Col span={24} className="introduce-content">
              <br />
              <TextArea
                rows={4}
                placeholder="文章简介"
                style={{ height: '200px' }}
                value={introduce}
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



        // article_content: markdownContent,
        // introduce: introduceHtml
