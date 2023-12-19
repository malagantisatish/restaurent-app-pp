import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    errorMsg: '',
  }

  getThePassword = event => {
    this.setState({password: event.target.value})
  }

  getTheUsername = event => {
    this.setState({username: event.target.value})
  }

  onSubmitFailure = error => {
    this.setState({isError: true, errorMsg: error})
  }

  onSubmitSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30, path: '/'})
    history.replace('/')
  }

  submitTheFrom = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(response.ok)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, isError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <form className="login-form" onSubmit={this.submitTheFrom}>
          <h1 className="logo-name">Restaurant App</h1>
          <label className="label-text" htmlFor="username">
            USERNAME
          </label>
          <br />
          <input
            type="text"
            id="username"
            value={username}
            onChange={this.getTheUsername}
            placeholder="USERNAME"
            className="input-element"
          />
          <br />
          <label className="label-text" htmlFor="password">
            PASSWORD
          </label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={this.getThePassword}
            placeholder="PASSWORD"
            className="input-element"
          />
          <br />
          <button type="submit" className="login-btn">
            Login
          </button>
          {isError && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
