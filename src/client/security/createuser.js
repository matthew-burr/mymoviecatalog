import {
  LabeledInput,
  Layout,
  Overlay,
  Label,
  Button,
  ButtonLink,
} from '../components';
import React from 'react';
import { connect } from 'react-redux';
import { postNewUser } from '../store/actions';
import { Link } from 'react-router-dom';

const PaddedLayout = Layout.extend`
  padding: 5px;
`;

const mapDispatchToProps = dispatch => {
  return {
    onCreate: async user => {
      await dispatch(postNewUser(user));
    },
  };
};

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirmation: '',
    };
  }

  handleFieldChange(field) {
    this.setState(field);
  }

  async handleCreate(e) {
    if (
      !this.isValidPassword(this.state.password, this.state.confirmation) ||
      !this.isValidEmail(this.state.email)
    )
      return;

    await this.props.onCreate({
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password,
    });

    this.props.history.push('/');
  }

  isValidPassword(password, confirmation) {
    return password && password.trim() !== '' && password === confirmation;
  }

  isValidEmail(email) {
    return email && email.trim() !== '';
  }

  render() {
    return (
      <div>
        <Overlay width="80%" height="80%" top="10%" left="10%">
          <PaddedLayout vertical>
            <h1>Create a New Account</h1>
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
                id="first_name"
                label="Your First Name"
                type="text"
                placeholder="Jane"
                value={this.state.first_name}
                onChange={event =>
                  this.handleFieldChange({ first_name: event.target.value })
                }
              />
              <LabeledInput
                id="last_name"
                label="Your Last Name"
                type="text"
                placeholder="Doe"
                value={this.state.last_name}
                onChange={event =>
                  this.handleFieldChange({ last_name: event.target.value })
                }
              />
              <LabeledInput
                id="password"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={event =>
                  this.handleFieldChange({ password: event.target.value })
                }
                required
              />
              <LabeledInput
                id="confirmation"
                label="Confirm Password"
                type="password"
                value={this.state.confirmation}
                onChange={event =>
                  this.handleFieldChange({ confirmation: event.target.value })
                }
                required
              />
              <Button to="/" onClick={this.handleCreate} value="Create" />
            </form>
          </PaddedLayout>
        </Overlay>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(CreateUser);
