import React, { Component } from 'react';
import PropTypes from 'prop-types';


class QuestionInput extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSend = this.onSend.bind(this);
        this.state = {
            question: ''
        }
    }

    onChange(e) {
        this.setState({
            question: e.target.value
        });
    }

    onSend(e) {
        if(this.state.question.length === 0) {
            return;
        }
        this.props.onSendQuestion({
            id: new Date().getTime(),
            commentator: "Anonymous",
            like_count: 0,
            highlight: 1,
            created: "20 Nov, 7:08am",
            content: this.state.question
        });
    }

    render() {
        return (
            <div className="input-question">
                <div>Ask the speaker</div>
                <div className="control">
                    <input type="text" placeholder="Type your question" className="form-control"
                        onChange={this.onChange}/>
                    <button className="btn btn-primary"
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