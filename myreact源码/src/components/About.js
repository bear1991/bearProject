require('styles/About.css');

import React from 'react';

class AboutComponent extends React.Component {
  render() {
    return (
      <div id="about">
        <h2>关于</h2>
      </div>
    );
  }
}

AboutComponent.defaultProps = {
};

export default AboutComponent;