import React from 'react';
import { history } from '../routers/AppRouter';


export class Button extends React.Component {
    callback = (data) => {
    }
    handleOnClick = () => {
        /* this.props.onClick(this.callback); */

        if(typeof this.props.onClick === 'function') {
            this.props.onClick();
        } else if(typeof this.props.onClick === 'object') {
            this.props.onClick.forEach((func) => {
                func();
            });
        }
    };
    render() {
        return  <button className={ this.props.className } onClick={ this.handleOnClick }>
                    { this.props.children }
                </button>
    };

}

export default Button;