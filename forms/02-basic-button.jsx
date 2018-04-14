import React from 'react';

class BasicButton02 extends React.Component {
  constructor() {
    super();

    this.name = "Basic Button 02";
  }

  onButtonClick = (evt) => {
    const btn = evt.target;

    console.log(`The user clicked ${btn.name}: ${btn.value}`);
  }

  render() {
    return (
      <div>
        <h1>What do you think of React?</h1>
        <button
          name='button-1'
          value='greate'
          onClick={this.onButtonClick}
        >
          Greate
        </button>
        <button
          name='button-1'
          value='amazing'
          onClick={this.onButtonClick}
        >
          Amazing
        </button>
      </div>
    );
  }
}

export default BasicButton02;