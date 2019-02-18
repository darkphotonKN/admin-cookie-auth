export default class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    console.log(email + password);
    // authenticate(email, password);
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
