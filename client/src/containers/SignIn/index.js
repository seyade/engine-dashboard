import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signinUser } from '../../actions/authActions';
import './Signin.css';

export class SignIn extends Component {
  static get propTypes() {
    return {
      auth: PropTypes.object.isRequired,
      signinUser: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
      errors: {}
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChangeHandler(event) {
    this.setState({
      [event.target.id]: event.target.value,
      errors: {}
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();

    const signinData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.signinUser(signinData);
  }

  render() {
    return (
      <div className="signin">
        <h1 className="signin__title">Engine.</h1>
        <h2 className="signin__sub-title">Sign In</h2>
        <p className="signin__intro">Sign in your account here</p>
        <h2>{this.state.username}</h2>
        <form className="form signin__form" onSubmit={this.onSubmitHandler}>
          <div className="form__group">
            <label className="signin__label" htmlFor="email">
              <input
                className="signin__input signin__input-email"
                type="text"
                id="email"
                onChange={this.onChangeHandler}
                value={this.state.email}
              />
              <span className="signin__label-text">Email</span>
            </label>
            <p className="form__error-text">{this.state.errors.email}</p>
          </div>
          <div className="form__group">
            <label className="signin__label" htmlFor="password">
              <input
                className="signin__input signin__input-password"
                type="password"
                id="password"
                onChange={this.onChangeHandler}
                value={this.state.password}
              />
              <span className="signin__label-text">Password</span>
            </label>
            <p className="form__error-text">{this.state.errors.password}</p>
          </div>

          <button className="signin__btn">Sign In</button>
        </form>

        <p className="signin__instruction">
          If you've forgotten your password, please contact our call center at
          +44 (0) 203 123 54 76
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { signinUser })(SignIn);
