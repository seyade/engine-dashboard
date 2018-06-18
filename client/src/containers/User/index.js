import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        avatar: ''
      }
    };
  }

  render() {
    return (
      <div className="user">
        <img src={this.state.user.avatar} alt="" />
        <p className="user__username">{this.state.user.username}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(User);
