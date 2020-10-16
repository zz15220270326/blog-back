import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import {Redirect} from 'react-router-dom'
// child-component-router-settings
import Login from '../Login'
import Register from '../Register'
import Admin from '../Admin'
/**
 * main.tsx: 
 *   这个文件中主要放置一些路由相关的配置
*/

export default function Main() {
  return (
    <>
      <Router>
        <Route path="/login/" exact component={Login} />
        <Route path="/register/" component={Register} />
        <Route path="/index/" component={Admin} />
        {/* <Redirect from="/" exact to="/login/" /> */}
      </Router>
    </>
  )
}
