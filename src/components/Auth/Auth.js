import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { compose, withVkService } from '../HocHelpers';
import './Auth.scss';

class Auth extends Component {

  state = {
    userId: null,
  };

  componentDidMount() {
    const code = new URLSearchParams(this.props.location.search).get('code');
    this.props.vkService.getAccessToken(code).then(({ accessToken, userId }) => {
      this.props.vkService.setAccessToken(accessToken);
      this.setState({
        userId: userId
      });
    });
  }
  
  render() {
    if (this.state.userId)
      return <Redirect to = { `/profile/${this.state.userId}` } />
    return (
      <div className="auth">
        <a href = { this.props.vkService.getAuthUrl() }>Войти</a>
      </div>
    );
  }
}

Auth.defaultProps = {
  onReciveAccessToken: () => { }
}

export default compose(withVkService(), withRouter)(Auth);