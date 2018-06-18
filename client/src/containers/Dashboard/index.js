import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Sidebar from '../../components/Sidebar';
import User from '../User';

export class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <h1 className="dashboard__title">Dashboard</h1>

        <Sidebar>
          <User user={this.props.auth.user} />
        </Sidebar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(Dashboard);
