import React from 'react';
import './signin.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {
  signInWithGoogle,
  logInWithEmailAndPassword,
} from '../../firebase/firebase.util';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className='sign-in'>
        <h2 className='title'>
          I already have an account{' '}
        </h2>
        <span>
          Sign in with your email and password
        </span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            value={email}
            required
            handleChange={this.handleChange}
            label='Email'
          />

          <FormInput
            name='password'
            type='password'
            value={password}
            required
            handleChange={this.handleChange}
            label='Password'
          />

          <div className='buttons'>
            <CustomButton type='submit'>
              SIGN IN
            </CustomButton>

            <CustomButton
              onClick={signInWithGoogle}
              isGoogleSignIn
            >
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    logInWithEmailAndPassword(email, password);
    this.setState({ email: '', password: '' });
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };
}

export default SignIn;
