import React from 'react';

class BasicButton01 extends React.Component {

  constructor(){
    super();
  }

  onGreatClick(evt) {
    console.log('The user clicked button-1: great', evt);
  }

  onAmazingClick(evt) {
    console.log('The user clicked button-2: amazing', evt);
  }

  render() {
    return (
      <div>
        <h1>What do you think of React?</h1>
        <button
          name='button-1'
          value='great'
          onClick={this.onGreatClick}>
          Great
        </button>
        <button
          name='button-2'
          value='amazing'
          onClick={this.onAmazingClick}
        >
          Amazing
        </button>
      </div>
    )
  }
}

export default BasicButton01;