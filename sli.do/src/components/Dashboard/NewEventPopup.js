import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popup from '../Common/Popup';
import constants from '../../commons/constants';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import $ from 'jquery';
import 'jquery-validation';

class NewEventPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.showPopup,
            data: props.data,
            formValid: (props.data.name !== undefined && props.data.name.length > 0)
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.onOk = this.onOk.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.$form = $('#newEventPopup');
        this.$form.validate({
            onfocusout: (element) => {
                $(element).valid();
            },
            rules: {
                defineTypeName: "required"
            },
            messages: {
                defineTypeName: constants.langs.signInTypeNameRequired
            }
        });
    }

    close() {
        this.setState({ show: false });
        this.props.onClosePopup();
    }
    open() {
        this.setState({ show: true });
    }

    onNameChange(e) {
        let data = this.state.data;
        this.setState({
            ...this.state,
            data: {
                ...data,
                name: e.target.value
            },
            formValid: (e.target.value !== undefined && e.target.value.length > 0)
        });
    }

    handleChange(data) {
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                ...data
            },
        });
    }

    onOk(e) {
        if (!this.$form.valid()) {
            return;
        }
        this.close();
        this.props.onOkClick(this.state.data);
    }

    render() {
        let data = this.state.data;

        return (
            <Popup title="Create New Event" show={this.state.show}
                ok={this.onOk}
                close={this.close}
                cancelTitle={this.props.cancelTitle} okTitle={this.props.okTitle}
                formValid={this.state.formValid}>
                <form id="newEventPopup" onSubmit={this.onOk}>
                    <div className="form-group">
                        <label htmlFor="defineName">Type Name <span className="required">*</span></label>
                        <input id="defineName" name="defineName" className="form-control"
                            placeholder="Event Name"
                            value={data.name} onChange={this.onNameChange} />
                        From: <DatePicker
                                selected={data.date_from}
                                onChange={(date) => this.handleChange({
                                    date_from: date
                                })} />
                        To: <DatePicker
                                selected={data.date_to}
                                onChange={(date) => this.handleChange({
                                    date_to: date
                                })}/>
                    </div>
                </form>
            </Popup>
        );
    }
}

NewEventPopup.propTypes = {
    id: PropTypes.any,
    show: PropTypes.bool,
    onOkClick: PropTypes.func
}

export default NewEventPopup;