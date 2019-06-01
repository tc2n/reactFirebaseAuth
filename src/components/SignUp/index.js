import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INT_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class SignUpFormBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {...INT_STATE};
  }

  

  onSubmit = e => {
    //prevent page from reloading
    e.preventDefault();

    const {email, passwordOne} = this.state;

    this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
    .then(authUser => {
      this.setState({...INT_STATE});
      this.props.history.push(ROUTES.HOME);
    })
    .catch(error => {
      this.setState({error});
    })
  };

  onChange = e => {
    //to update the value in the feild
    this.setState({[e.target.name]: e.target.value});
  };
  
  render() {

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid = passwordOne!==passwordTwo || passwordOne==='' || email==='' || username==='';

    return (
      <form onSubmit={this.onSubmit} className="form">
        <input name="username" type="text" value={username} onChange={this.onChange}  placeholder="Full Name" />
        <input name="email" type="text" value={email} onChange={this.onChange}  placeholder="email address" />
        <input name="passwordOne" type="password" value={passwordOne} onChange={this.onChange}  placeholder="passeord" />
        <input name="passwordTwo" type="password" value={passwordTwo} onChange={this.onChange} placeholder="confirm password"  />
        <button disabled={isInvalid} type="submit">Sign Up</button>

        {error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () => (
  <p className="signuplink">
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));
//it has access to props of router, because it is passed in higher-order component

export default SignUpPage;
export {SignUpForm, SignUpLink};