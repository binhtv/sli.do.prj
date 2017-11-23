import React, { Component } from 'react';
import PropTypes from 'prop-types';
import constants from '../../commons/constants';

class Language extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange({
      language: e.target.value
    });
  }

  render() {
    let languages = [];
    constants.supportedLanguages.map((lang, index) => {
      languages.push(<option key={index} value={lang.code}>{lang.name}</option>)
      return lang;
    });
    return (<select id={'select' + this.props.id} onChange={this.onChange}
        className={this.props.className}
        value={this.props.lang}>
      {languages}
    </select>);
  }
}

Language.propTypes = {
  id: PropTypes.string,
  lang: PropTypes.string,//selected option
  className: PropTypes.string,
  onChange: PropTypes.func
}
export default Language;