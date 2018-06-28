require('styles/Index.css');

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import Home from './Home';
import About from './About';
import Topics from './Topics';

// let pic = require('../common/img/bear.jpg');

class IndexComponent extends React.Component{
  constructor(props){
    super(props);
    this.clickNav = this.clickNav.bind(this)
  }
  clickNav(val){
    // console.log(this,val);
    // console.log(this.refs['nav'+val]);
    for(let key in this.refs){
      if(key == 'nav'+val){
        this.refs[key].className = 'current';
      }else{
        this.refs[key].className = '';
      }
    }
  }

  render(){
    return (<Router>
      <div>
        <ul id="nav">
          <li onClick={() => {this.clickNav(1)}}>
            {/* 上线打包，上线域名下目录路由 */}
            {/* <Link to="/myreact"><span ref='nav1' className='current'>首页</span></Link> */}
            <Link to="/index"><span ref='nav1' className='current'>首页</span></Link>
          </li>
          <li onClick={() => {this.clickNav(2)}}>
            <Link to="/topics"><span ref='nav2'>主题列表</span></Link>
          </li>
          <li onClick={() => {this.clickNav(3)}}>
            <Link to="/about"><span ref='nav3'>关于</span></Link>
          </li>
        </ul>

        {/* 上线打包时，设置上线域名下目录路由 */}
        {/* <Route strict path="/myreact" component={Home}/> */}
        
        <Route exact path="/" render={()=>{
          // 路由跳转
          return (<Redirect to="/index"/>)
        }}/>
        <Route exact path="/index" component={Home}/>
      
        <Route path="/topics" component={Topics}/>
        <Route path="/about" component={About}/>
      </div>
    </Router>)
  }
}


/*
const IndexComponent = () => (
  <Router>
    <div>
      <ul id="nav">
        <li><Link to="/">首页</Link></li>
        <li><Link to="/topics">主题列表</Link></li>
        <li><Link to="/about">关于</Link></li>
      </ul>
      <Route exact path="/" component={Home}/>
      <Route path="/topics" component={Topics}/>
      <Route path="/about" component={About}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>首页</h2>
  </div>
)

const About = () => (
  <div>
    <h2>关于</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>主题列表</h2>
    <ul>
      <li>
        <Link to={`${match.url}/html`}>
          HTML
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/css`}>
          CSS
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/javascript`}>
          javascript
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>请选择一个主题。</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)
*/


export default IndexComponent

