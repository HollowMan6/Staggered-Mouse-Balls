import React from 'react';
import {StaggeredMotion, spring, presets} from '@serprex/react-motion';
import range from 'lodash.range';

export default class StaggeredMouse extends React.Component { // lgtm [js/react/unused-or-undefined-state-property]
  constructor(props) {
    super(props);
    this.state = {x: -10, y: -10};
  };

  componentDidMount() {
		window.addEventListener('mousemove', this.handleMouseMove);
		window.addEventListener('touchmove', this.handleTouchMove);
  };

  handleMouseMove = ({pageX: x, pageY: y}) => {
    this.setState({x, y});
  };

  handleTouchMove = ({touches}) => {
    this.handleMouseMove(touches[0]);
  };

  getStyles = (prevStyles) => {
    // `prevStyles` is the interpolated value of the last tick
    const endValue = prevStyles.map((_, i) => {
      return i === 0
        ? this.state
        : {
          x: spring(prevStyles[i - 1].x, presets.gentle),
          y: spring(prevStyles[i - 1].y, presets.gentle),
        };
    });
    return endValue;
  };

  render() {
    return (
      <StaggeredMotion
        defaultStyles={range(6).map(() => ({x: 0, y: 0}))}
        styles={this.getStyles}>
        {balls =>
          <div className="mousemoving">
            {balls.map(({x, y}, i) =>
              <div
                key={i.toString()}
                className={`mousemoving-ball ball-${i}`}
                style={{
                  WebkitTransform: `translate3d(${x - 10}px, ${y - 10}px, 0)`,
                  transform: `translate3d(${x - 10}px, ${y - 10}px, 0)`,
                  zIndex: balls.length - i,
                }} />
            )}
          </div>
        }
      </StaggeredMotion>
    );
  };
}
