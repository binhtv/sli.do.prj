import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

class Popup extends Component {
    render() {
        let disabled = false;
        if(this.props.formValid !== undefined && !this.props.formValid) {
            disabled = true;
        }
        return (<Modal show={this.props.show} onHide={this.props.close}>
            <Modal.Header closeButton>
                <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.close}>{this.props.cancelTitle}</Button>
                <Button bsStyle="primary" onClick={this.props.ok} disabled={disabled}>{this.props.okTitle}</Button>
            </Modal.Footer>
        </Modal>);
    }
}

Popup.propTypes = {
    show: PropTypes.bool,
    close: PropTypes.func,
    ok: PropTypes.func,
    title: PropTypes.string,
    cancelTitle: PropTypes.string,
    okTitle: PropTypes.string,
    formValid: PropTypes.bool
}

export default Popup;