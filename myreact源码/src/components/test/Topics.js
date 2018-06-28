require('styles/test/Topics.css');

import React from 'react';
import {
  Route,
  Link
} from 'react-router-dom'

import Topic from './Topic';

const TopicsComponent = ({ match }) => (
  <div id="listCont">
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
      <div>
        <h3>主题简介......</h3>
      </div>
    )}/>
  </div>
)

export default TopicsComponent;