import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popup from '../../Common/Popup';
import constants from '../../../commons/constants';
import Language from '../../Common/Language';
// import $ from 'jquery';
// import 'jquery-validation';

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
        this.onNameChange = this.onNameChange.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);
        this.onOk = this.onOk.bind(this);
    }

    componentDidMount() {
        this.$form = window.jQuery('#newSiginTypePopup');
        this.$form.validate({
            onfocusout: (element) => {
                window.jQuery(element).valid();
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
                name: e.target.value,
                translation: {
                    ...data.translation,
                    [data.language]: {
                        ...data.translation[this.state.language],
                        name: e.target.value
                    }
                }
            },
            formValid: (e.target.value !== undefined && e.target.value.length > 0)
        });
    }
    onLanguageChange(lang) {
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                language: lang.language,
                translation: {
                    ...this.state.data.translation,
                    [lang.language]: {
                        ...this.state.data.translation[lang.language],
                        name: this.state.data.name
                    }
                }
            },
        });
    }

    onOk(e) {
        if(!this.$form.valid()) {
            return;
        }
        this.close();
        this.props.onOkClick(this.state.data);
    }

    render() {
        let data = this.state.data;

        return (
            <Popup title="New Sign-in Type" show={this.state.show}
                ok={this.onOk}
                close={this.close} 
                cancelTitle="Cancel" okTitle="Save"
                formValid={this.state.formValid}>
                <form id="newSiginTypePopup" onSubmit={this.onOk}>
                    <div className="form-group">
                        <label htmlFor="defineTypeName">Type Name <span className="required">*</span></label>
                        <input id="defineTypeName" name="defineTypeName" className="form-control"
                            placeholder="Signin Type Name"
                            value={data.name} onChange={this.onNameChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="selectLanguage">Language</label>
                        <Language id="newsigninTypeLanguageOptions" lang={data.language} className="form-control"
                         onChange={this.onLanguageChange}
                        />
                    </div>
                </form>
            </Popup>
        );
    }
}

NewEventPopup.propTypes = {
    id: PropTypes.any,
    cancelTitle: PropTypes.string,
    okTitle: PropTypes.string,
    data: PropTypes.shape({
        name: PropTypes.string,
        language: PropTypes.string
    }),
    show: PropTypes.bool,
    onOkClick: PropTypes.func
}

export default NewEventPopup;