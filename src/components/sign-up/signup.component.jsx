import './signup.styles.scss';
import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { registerWithEmailAndPassword } from '../../firebase/firebase.util';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
    } = this.state;

    return (
      <div className='sign-up'>
        <h2 className='title'>
          I do not have an account
        </h2>
        <span>
          Sign up with your email password
        </span>

        <form
          className='sign-up-form'
          onSubmit={this.handleSubmit}
        >
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            handleChange={this.handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            handleChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            handleChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            handleChange={this.handleChange}
            label='Confirm Password'
            required
          />
          <CustomButton type='submit'>
            SIGN UP
          </CustomButton>
        </form>
      </div>
    );
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      displayName,
      email,
      password,
      confirmPassword,
    } = this.state;
    if (password !== confirmPassword) {
      alert('Password do not match!');
      return;
    }
    registerWithEmailAndPassword(
      displayName,
      email,
      password
    );
    this.setState({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };
}

export default SignUp;
