import React from 'react';
import { connect } from 'react-redux';

import LoadingPage from './LoadingPage';
import { startSetPosts } from '../actions/posts';
import { setStoreFilters } from '../actions/filters';

export class PostsFilter extends React.Component {
    state = {
      textFilter: '',
      sortBy: '',
      dateFilter: '',
      hasFilters: false
    }
    componentDidMount() {
      this.props.startSetPosts();
      const filters = {
        textFilter: this.props.filters.textFilter,
        sortBy: this.props.filters.sortBy,
        dateFilter: this.props.filters.dateFilter,
        hasFilters: this.props.filters.hasFilters
      }
      this.setState(() => ({
        ...filters
      }))
    }
    
    onSortChange = ({ target }) => {
      //THIS SHOULD NOT BE HITTING THE DATABASE
      //This is why we use a filters object on each
      //onChange callback
      //setPosts now handles changing the store

      const filters = {
        textFilter: this.state.textFilter,
        sortBy: target.value,
        dateFilter: this.state.dateFilter,
        hasFilters: true
      }
      this.setState(() => ({
        ...filters
      }));
      this.props.setStoreFilters(filters);
    };

    onDatesFilterChange = ({ target }) => {
      const filters = {
        textFilter: this.state.textFilter,
        sortBy: this.state.sortBy,
        dateFilter: target.value,
        hasFilters: true
      }
      this.setState(() => ({
        ...filters
      }));
      this.props.setStoreFilters(filters);
    };

    onTextChange = ({ target }) => {
      const filters = {
        textFilter: target.value,
        sortBy: this.state.sortBy,
        dateFilter: this.state.dateFilter,
        hasFilters: true
      }
      this.setState(() => ({
        ...filters
      }));
      this.props.setStoreFilters(filters);
    };
    onClearFilters = () => {
      const filters = {
        textFilter: '',
        sortBy: 'date',
        dateFilter: 'all',
        hasFilters: false
      }
      this.setState(() => ({
        ...filters
      }));
      this.props.setStoreFilters(filters);
    };
    render() {
        return (
            <React.Fragment>
              { this.props.filters ? 
                <div className="content-container">
                  <div className="input-group">
                    <div className="input-group__item input-group__item--grow">
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
                            <option value="1-year">This year</option>
                        </select>
                    </div>
                    <div className="input-group__item input-group__item--end ">
                      <button 
                        disabled={!this.state.hasFilters } 
                        className={ this.state.hasFilters ? "button button--clear" : "button button--disabled"} 
                        onClick={ this.onClearFilters }>
                          X
                        </button>
                    </div>
                  </div>
                </div>
                :
                <LoadingPage />
              }
            </React.Fragment>

        );
    };
};

const mapStateToProps = (state) => ({
    filters: state.filters
  });

const mapDispatchToProps = (dispatch) => ({
  startSetPosts: () => dispatch(startSetPosts()),
  setStoreFilters: (filters) => dispatch(setStoreFilters(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsFilter);