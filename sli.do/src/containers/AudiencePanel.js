import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import TopMenu from '../components/TopMenu/TopMenu';
import Audience from '../components/Audience/Audience';

class AudiencePanel extends Component {
    render() {
        return (
            <div>
                <TopMenu />
                <Audience {...this.props}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProp) => {
    return bindActionCreators(ActionCreators, dispatch);
}

const mapStateToProps = (state = {}, ownProp) => {
    return state.audience;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AudiencePanel);