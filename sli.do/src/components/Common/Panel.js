import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InlineEdit from 'react-edit-inline';
import constants from '../../commons/constants';
import { confirmAlert } from '../../commons/helpers';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onTitleChange(data) {
    this.props.onTitleChange(data.title);
  }

  onDeleteClick(e) {
    if (confirmAlert(constants.langs.confirmMessageDelete)) {
      this.props.onDeleteClick();
    }
  }

  render() {
    let panelBodyClass = '';
    let headingTitle = this.props.title;
    let editableClass = 'panel-title';
    let pencilIcon = '';
    if (this.props.collapsible) {
      panelBodyClass = 'panel-collapse collapse';
      if (this.props.expand) {
        panelBodyClass += ' in';
      }
      headingTitle = <a role="button" data-toggle="collapse" href={'#' + this.props.id}
        aria-expanded={this.props.expand} aria-controls={this.props.id}>{this.props.title}</a>
    }
    let sortableClass = '';
    if (this.props.sortable) {
      sortableClass = 'fa fa-navicon fa-2x draggable';
      if (this.props.sortableHandler !== undefined) {
        sortableClass += (' ' + this.props.sortableHandler);
      }
    }

    if (this.props.titleEditable) {
      headingTitle = <InlineEdit validate={(text) => {
        return text.length > 0;
      }}
        activeClassName="form-control"
        text={this.props.title}
        paramName="title"
        change={this.onTitleChange}
        style={{ fontSize: 15 }} />;

      editableClass += ' inline-editable';
      pencilIcon = <i className="fa fa-info-circle" title={constants.langs.clickToEditTooltip}></i>;
    }

    let deleteButton = '';
    if (this.props.deletable) {
      deleteButton = <div className="right-side">
        <a href="javascript:void(0)" className="delete" onClick={this.onDeleteClick}>Delete</a>
      </div>
    }

    return (
      <div className="panel panel-default panel-detail" data-id={this.props.dataId}>
        <div className="panel-heading" role="tab">
          <div className="toggle-sign">
            <i className={sortableClass}></i>
            {this.props.panelIcon}
            <h4 className={editableClass} >
              {headingTitle}
              {pencilIcon}
            </h4>
          </div>
          {deleteButton}
        </div>
        <div id={this.props.id} className={panelBodyClass}>
          <div className="panel-body">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Panel.propTypes = {
  id: PropTypes.any,
  title: PropTypes.any,
  expand: PropTypes.bool,
  sortableHandler: PropTypes.string,
  collapsible: PropTypes.bool,
  sortable: PropTypes.bool,
  titleEditable: PropTypes.bool,
  onTitleChange: PropTypes.func
}

export default Panel;