import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AddArticle from '../../../AddArticle'
import ArticleList from '../../../ArticleList'

export default function AdminRouter() {
  return (
    <>
      <Redirect from="/index/" to="/index/list/" />
      <Route path="/index/add/" exact component={AddArticle} />
      <Route path="/index/update/:id" exact component={AddArticle} />
      <Route path="/index/list/" component={ArticleList} />
    </>
  )
}
