import React from 'react';
import { history } from '../routers/AppRouter';


export class Button extends React.Component {
    callback = (data) => {
    }
    handleOnClick = () => {
        // Must pass in an array to this component's onClick
        /* this.props.onClick(this.callback); */
        
        this.props.onClick.forEach((func) => {
            if(func) func();
        });
    };
    render() {
        return  <button className={ this.props.className } onClick={ this.handleOnClick }>
                    { this.props.children }
                </button>
    };

}

export default Button;