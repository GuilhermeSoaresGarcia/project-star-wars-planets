import React from 'react';
import './DarthVaderSaber.scss';

class DarthVaderSaber extends React.Component {
  render() {
    const laserMax = 630;
    const percent = this.props.percent >= 1 ? 1 : this.props.percent;
    const glowStyle = percent >= 1 ? 'laser-glow laser-glow-active' : 'laser-glow';
    const width = percent * laserMax;
    const laserStyle = { width: `${width}px` };
    const laserClass = percent >= 1 ? 'laser laser-active' : 'laser';
    return (
      <div className="saber darth-vader-saber">
        <div className="handle">
          <div className="tip" />
          <div className="grip grip1" />
          <div className="grip grip2" />
          <div className="grip grip3" />
          <div className="center" />
          <div className="laser" />
          <div className="center-bottom">
            <div className="screw" />
          </div>
          <div className="cables">
            <div className="hole hole1" />
            <div className="hole hole2" />
            <div className="cable cable1" />
            <div className="cable cable2" />
          </div>
          <div className="shadow" />
          <div className={ laserClass } style={ laserStyle }>
            <div className={ glowStyle } />
            <div className="laser-tip">
              <div className={ glowStyle } />
            </div>
          </div>
          <div className="guard-tip" />
          <div className="guard-rectangle">
            <div className="shadow" />
          </div>
          <div className="guard-triangle" />
          <div className="guard-triangle-shadow" />
        </div>
      </div>
    );
  }
}

export default DarthVaderSaber;
