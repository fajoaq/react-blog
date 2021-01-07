import React from 'react';
import { history } from '../routers/AppRouter';


export class Button extends React.Component {
    callback = (data) => {
    }
    handleOnClick = () => {
        /* this.props.onClick(this.callback); */
        this.props.onClick();
    }
    render() {
        return  <button className={ this.props.className } onClick={ this.handleOnClick }>
                    { this.props.children }
                </button>
    };

}

export default Button;