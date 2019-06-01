import React from 'react';
import { withAuthorization } from '../Session';

const Home = () => (
  <div className="home">
    <h1>Home</h1>
    <p>Only signed in user can access this page.</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);