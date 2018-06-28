/*
import React from 'react';

class IndexComponent extends React.Component{
    render(){
        return (<h4>bear</h4>);
    }
}

export default IndexComponent;
*/


require('styles/test/Index.css');

import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './Home';
import About from './About';
import Topics from './Topics';

const IndexComponent = () => (
  <Router>
    <div style={{height:'100%'}}>
      <ul id="header">
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


/*
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
