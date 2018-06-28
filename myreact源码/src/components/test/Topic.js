import React from 'react';


const TopicComponent = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)


TopicComponent.defaultProps = {
};

export default TopicComponent;