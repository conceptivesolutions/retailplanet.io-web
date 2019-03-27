import * as React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import css from './ProfileSmall.scss';
import ANavDropdown from '../dropdown/ANavDropdown';
import bearerFetch from '../../../auth/bearerFetch';

/**
 * props.session = Die aktuelle Session (optional)
 *
 * @author w.glanzer, 27.01.2019
 */
class ProfileSmall extends React.Component {
  state = {
    filled: false,
    avatar: null,
  };

  constructor(props) {
    super(props);
    this.updateUserProfileInfos = this.updateUserProfileInfos.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
    this.createUserComp = this.createUserComp.bind(this);
  }

  componentDidUpdate() {
    this.updateUserProfileInfos();
  }

  /**
   * Fetches new user informations, and transfers them into current state.
   * Does nothing, if the state is already set
   */
  updateUserProfileInfos() {
    const { user } = this.props;
    if (user && !this.state.filled)
      bearerFetch('/api/profile', user)
        .then(pResult => pResult.json())
        .then(json => this.setState({
          avatar: json.avatar,
          filled: true,
        }));
    else if (!user && this.state.filled)
      this.setState({
        filled: false,
        avatar: null,
      });
  }

  createUserComp() {
    return (
      <React.Fragment>
        {this.renderAvatar()}
        {this.props.user.profile.username}
      </React.Fragment>
    );
  }

  /**
   * Renders the current users avatar
   */
  renderAvatar() {
    if (this.state.avatar)
      return <img src={`data:image/png;base64, ${this.state.avatar}`} alt="avatar" className={`${css.profilepic} mr-2 rounded-circle`} />;
    return <React.Fragment />;
  }

  render() {
    if (this.props.user.profile)
      return (
        <ANavDropdown title={this.createUserComp()} alignRight>
          <NavDropdown.Item onClick={() => this.props.router.push('/logout')}>Logout</NavDropdown.Item>
        </ANavDropdown>
      );

    return (
      // eslint-disable-next-line
      <div className={`nav-link ${css.login}`} onClick={() => this.props.router.push('/login')}>
        Login
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(ProfileSmall));
