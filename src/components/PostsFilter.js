import React from 'react';
import { connect } from 'react-redux';

import LoadingPage from './LoadingPage';
import { 
    setTextFilter,  
    sortByDate, 
    sortByAuthor, 
    sortByTitle, 
    setDateFilter } from '../actions/filters';
import { setPosts, startSetPosts } from '../actions/posts';
import { setStoreFilters } from '../actions/filters';

export class FilterPosts extends React.Component {
    state = {
      textFilter: '',
      sortBy: '',
      dateFilter: ''
    }
    componentDidMount() {
      const filters = {
        textFilter: this.props.filters.textFilter,
        sortBy: this.props.filters.sortBy,
        dateFilter: this.props.filters.dateFilter
      }
      this.setState(() => ({
        ...filters
      }))
      this.props.startSetPosts(filters);
      console.log('componentDidMount');
    }
    onSortChange = ({ target }) => {
      //THIS SHOULD NOT BE HITTING THE DATABASE
      //This is why we use a filters object on each
      //onChange callback
      //setPosts now handles changing the store

      const filters = {
        textFilter: this.state.textFilter,
        sortBy: target.value,
        dateFilter: this.state.dateFilter
      }
      this.setState(() => ({
        ...filters
      }));
      
      this.props.setPosts(this.props.postList, filters);
      this.props.setStoreFilters(filters);
      console.log('onSortChange');
    };

    onDatesFilterChange = ({ target }) => {
      const filters = {
        textFilter: this.state.textFilter,
        sortBy: this.state.sortBy,
        dateFilter: target.value
      }
      this.setState(() => ({
        ...filters
      }));
      this.props.startSetPosts(filters);
      this.props.setStoreFilters(filters);
      console.log('onDatesFilterChange');
    };

    onTextChange = ({ target }) => {
      const filters = {
        textFilter: target.value,
        sortBy: this.state.sortBy,
        dateFilter: this.state.dateFilter
      }
      this.setState(() => ({
        ...filters
      }));
      this.props.startSetPosts(filters);
      this.props.setStoreFilters(filters);
      console.log('onTextChange');
    };
    onClearFilters = () => {
      const filters = {
        textFilter: '',
        sortBy: 'date',
        dateFilter: 'all'
      }
      this.setState(() => ({
        ...filters
      }));
      this.props.startSetPosts(filters);
      this.props.setStoreFilters(filters);
    };
    render() {
        return (
            <div>
              { this.props.filters ? 
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
                            <option value="1-year">This year</option>
                        </select>
                    </div>
                    <div className="input-group__item">
                      <button onClick={ this.onClearFilters }className="clear">X</button>
                    </div>
                  </div>
                </div>
                :
                <LoadingPage />
              }
            </div>

        );
    };
};

const mapStateToProps = (state) => ({
    postList: state.postList,
    filters: state.filters
  });

const mapDispatchToProps = (dispatch) => ({
    setPosts: (posts, filters) => dispatch(setPosts(posts, filters)),
    startSetPosts: (filters) => dispatch(startSetPosts(filters)),
    setStoreFilters: (filters) => dispatch(setStoreFilters(filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterPosts);