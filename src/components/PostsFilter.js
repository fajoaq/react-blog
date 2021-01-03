import React from 'react';
import { connect } from 'react-redux';

import { 
    setTextFilter,  
    sortByDate, 
    sortByAuthor, 
    sortByTitle, 
    setDateFilter } from '../actions/filters';

export class FilterPosts extends React.Component {
    state = {
      textFilter: '',
      sortBy: '',
      dateFilter: ''
    }
    onDatesFilterChange = ({ target }) => {
      this.setState(() => ({
        dateFilter: target.value
      }));
      this.props.setDateFilter(target.value);
    };
    onTextChange = ({ target }) => {
      this.setState(() => ({
        textFilter: target.value
      }));
      this.props.setTextFilter(target.value);
    };
    onSortChange = ({ target }) => {
      this.setState(() => ({
        sortBy: target.value
      }));
      if (target.value === 'date') {
          this.props.sortByDate();
      } else if (target.value === 'author') {
          this.props.sortByAuthor();
      } else if (target.value === 'title') {
          this.props.sortByTitle();
      }
    };
    render() {
        return (
            <div className="content-container">
              <div className="input-group">
                <div className="input-group__item">
                  <input
                  className="text-input"
                  placeholder="Search posts"
                  type="text"
                  value={this.state.textFilter}
                  onChange={this.onTextChange}
                  />
                </div>
                <div className="input-group__item">
                  <select
                    className="select"
                    value={this.state.sortBy}
                    onChange={this.onSortChange}
                  >
                    <option value="date">Date</option>
                    <option value="author">Author</option>
                    <option value="title">Title</option>
                  </select>
                </div>
                <div className="input-group__item">
                    <select
                        className="select"
                        value={this.state.dateFilter}
                        onChange={this.onDatesFilterChange}
                    >
                        <option value="all">All</option>
                        <option value="month">This month</option>
                        <option value="6-month">6 months</option>
                        <option value="1-year">1 year</option>
                    </select>
                </div>
              </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    filters: state.filters
  });

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    setDateFilter: (text) => dispatch(setDateFilter(text)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAuthor: () => dispatch(sortByAuthor()),
    sortByTitle: () => dispatch(sortByTitle()),
  });

export default connect(mapStateToProps, mapDispatchToProps)(FilterPosts);