import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import {Redirect} from 'react-router-dom'
// child-component-router-settings
import Login from '../Login'
import Register from '../Register'
import Admin from '../Admin'
/**
 * main.tsx: 
 *   主路由配置
*/

export default function MainRouter() {
  return (
    <>
      <Router>
        <Route path="/login/" exact component={Login} />
        <Route path="/register/" component={Register} />
        <Route path="/index/" component={Admin} />
      </Router>
    </>
  )
}
