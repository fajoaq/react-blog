import React from 'react';
import { connect } from 'react-redux';

export const Error = (props) => (
    <React.Fragment>
    { props.errorList.find((e) => e.id === props.id) ? 
        <h5 className="form__error">
        { props.errorList.find((e) => e.id === props.id).message }
        </h5>
        :
        ""
    }
    </React.Fragment>
);

const mapStateToProps = (state) => ({
    errorList: state.errors
});
export default connect(mapStateToProps)(Error);