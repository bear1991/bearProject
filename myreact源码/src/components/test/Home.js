require('styles/test/Home.css');

import React from 'react';

class HomeComponent extends React.Component {
  render() {
    return (
      <div id="home">
        <h2>首页</h2>
      </div>
    );
  }
}

HomeComponent.defaultProps = {
};

export default HomeComponent;