require('styles/Topics.css');

import React from 'react';
import {
  Route,
  // Link,
  NavLink
} from 'react-router-dom'

import Topic from './Topic';

const TopicsComponent = ({ match }) => (
  <div id="listCont">
    <h4><span>主题列表</span></h4>
    <ul>
      <li>
        {/* <Link to={`${match.url}/news`}>微信精选</Link> */}
        <NavLink activeClassName='newspicture' to={`${match.url}/news`}>微信精选</NavLink>
      </li>
      <li>
        {/* <Link to={`${match.url}/picture`}>百思不得姐</Link> */}
        <NavLink activeClassName='newspicture' to={`${match.url}/picture`}>百思不得姐</NavLink>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <div id="intro">
        <dl>
          <dt><h3>主题简介</h3></dt>
          <dd>微信精选</dd>
          <dd>百思不得姐</dd>
          <dd>......</dd>
        </dl>
      </div>
    )}/>
  </div>
)

export default TopicsComponent;