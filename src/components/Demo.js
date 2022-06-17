import React from 'react';
import DarthVaderSaber from './DarthVaderSaber';
import './DarthVaderSaber.scss';

class Demo extends React.Component {
  state = { percent: 0 }

  componentDidMount() {
    this.interval = setInterval(
      () => {
        if (this.state.percent >= 1) {
          clearInterval(this.interval);
        } else {
          this.setState({ percent: this.state.percent + 0.001 });
        }
      },
      5,
    );
  }

  render() {
    const { percent } = this.state;
    return (
      <div className="saber-demo">
        <h1>Loading</h1>
        <div className="percent">
          {(percent * 100).toFixed(0)}
          %
        </div>
        <DarthVaderSaber percent={ percent } />
      </div>
    );
  }
}

export default Demo;
