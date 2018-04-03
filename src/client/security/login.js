import React from 'react';
import { LabeledInput, Overlay, Layout, ButtonLink } from '../components';
import { Link } from 'react-router-dom';
import { postLogin } from '../store/actions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return {
    onLogIn: (email, password) => {
      dispatch(postLogin(email, password));
    },
  };
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = { email: '', password: '' };
  }

  handleLogin(e) {
    let { email, password } = this.state;
    if (email && email.trim !== '' && password && password.trim() !== '')
      return this.props.onLogIn(email, password);

    e.preventDefault();
  }

  handleFieldChange(field) {
    this.setState(field);
  }

  render() {
    return (
      <div>
        <Overlay width="80%" height="80%" top="10%" left="10%">
          <Layout vertical>
            <h1>Log In To Your Account</h1>
            <form>
              <LabeledInput
                id="email"
                label="Your Email"
                type="email"
                placeholder="example@example.com"
                value={this.state.email}
                onChange={event =>
                  this.handleFieldChange({ email: event.target.value })
                }
                required
              />
              <LabeledInput
                id="password"
                label="Your Password"
                type="password"
                value={this.state.password}
                onChange={event =>
                  this.handleFieldChange({ password: event.target.value })
                }
                required
              />
              <ButtonLink to="/" onClick={this.handleLogin}>
                Log In
              </ButtonLink>
            </form>
          </Layout>
        </Overlay>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Login);
