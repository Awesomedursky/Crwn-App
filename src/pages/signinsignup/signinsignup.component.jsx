import './signinsignup.scss';
import SignIn from '../../components/sign-in/signin.component';
import SignUp from '../../components/sign-up/signup.component';

const SigninSignup = () => {
  return (
    <div className='signin-signup'>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SigninSignup;
