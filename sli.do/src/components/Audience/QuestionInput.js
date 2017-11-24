import React, { Component } from 'react';
import PropTypes from 'prop-types';


class QuestionInput extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSend = this.onSend.bind(this);
        this.state = {
            question: '',
            commentator: '',
        }
    }

    onChange(data) {
        this.setState({
            ...this.state,
            ...data
        });
    }

    onSend(e) {
        if (this.state.question.length === 0) {
            return;
        }
        this.props.onSendQuestion({
            eid: this.props.eventInfo.id,
            commentator: this.state.commentator,
            question: this.state.question
        });
    }

    render() {
        return (
            <div className="input-question">
                <div>Ask the speaker</div>
                <div className="control">
                    <div className="input-control">
                        <input type="text" placeholder="Type your question" className="form-control"
                            onChange={(e) => this.onChange({
                                question: e.target.value
                            })} />
                        <input type="text" placeholder="Your name" className="form-control"
                            onChange={(e) => this.onChange({
                                commentator: e.target.value
                            })} />
                    </div>
                    <button className="btn btn-success"
                        onClick={this.onSend}>Send</button>
                </div>
            </div>
        );
    }
}

QuestionInput.propTypes = {
    title: PropTypes.string
}
export default QuestionInput;