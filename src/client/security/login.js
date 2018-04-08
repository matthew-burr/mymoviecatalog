import React from 'react';
import {
  LabeledInput,
  Overlay,
  Layout,
  ButtonLink,
  Button,
} from '../components';
import { Link } from 'react-router-dom';
import { postLogin } from '../store/actions';
import { connect } from 'react-redux';

const PaddedLayout = Layout.extend`
  padding: 5px;
`;
const mapDispatchToProps = dispatch => {
  return {
    onLogIn: async (email, password) => {
      await dispatch(postLogin(email, password));
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

  async handleLogin(e) {
    let { email, password } = this.state;
    if (email && email.trim !== '' && password && password.trim() !== '') {
      await this.props.onLogIn(email, password);
      this.props.history.push('/');
      return;
    }
  }

  handleFieldChange(field) {
    this.setState(field);
  }

  render() {
    return (
      <div>
        <Overlay width="80%" height="80%" top="10%" left="10%">
          <PaddedLayout vertical>
            <h1>Log In To Your Account</h1>
            <div>
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
              <Button to="/" onClick={this.handleLogin} value="Log In" />
            </div>
          </PaddedLayout>
        </Overlay>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Login);
