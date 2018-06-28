import React from 'react';

/*
const TopicComponent = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)
*/

import News from './News';
import Picture from './Picture';

class TopicComponent extends React.Component{
  constructor(props){
    super(props);
    // console.log(props);
  }

  render(){
    // console.log(this.props);
    let {match} = this.props;
    if(match.params.topicId == 'news'){
      return (
        <News />
      )
    }
    return (
      <Picture />
    )
  }
}


TopicComponent.defaultProps = {
};

export default TopicComponent;