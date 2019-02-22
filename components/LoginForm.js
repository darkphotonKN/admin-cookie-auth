import Router from 'next/router';

import { authenticate } from '../misc/util';

export default class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    // post to back end for authentication

    const authenticated = await authenticate(email, password);
    console.log(authenticated);
    if (authenticated) {
      Router.push('/profile');
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={this.handleInput}
            value={email}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={this.handleInput}
            value={password}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
