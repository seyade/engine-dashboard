import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadUsers } from '../../actions/usersActions';

export class Admin extends Component {
  static get propTypes() {
    return {
      users: PropTypes.array.isRequired,
      loading: PropTypes.bool.isRequired
    };
  }
  componentDidMount() {
    this.props.dispatch(loadUsers());

    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/admin');
    }
  }

  render() {
    if (this.props.error) {
      return <h4>{this.props.error}</h4>;
    }

    if (this.props.loading) {
      return <h4>Loading...</h4>;
    }

    return (
      <div className="admin">
        <h1 className="admin__title">Admin Board</h1>
        {this.props.users.map(user => {
          return (
            <article className="users-list" key={user.username}>
              <img
                className="users-list__avatar"
                src={user.avatar}
                alt={user.username}
              />
              <p className="users-list__name">
                {user.firstName} {user.lastName}
              </p>
              <p className="users-list__username">{user.username}</p>
              <p className="users-list__email">{user.email}</p>
            </article>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users.users,
  loading: state.users.loading,
  error: state.users.error
});

export default connect(mapStateToProps)(Admin);
