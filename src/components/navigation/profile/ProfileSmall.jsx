import * as React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import css from './ProfileSmall.scss';
import ANavDropdown from '../dropdown/ANavDropdown';

/**
 * props.session = Die aktuelle Session (optional)
 *
 * @author w.glanzer, 27.01.2019
 */
class ProfileSmall extends React.Component {

  constructor(props) {
    super(props);
    this.createUserComp = this.createUserComp.bind(this);
  }

  createUserComp() {
    return (
      <React.Fragment>
        <img src={`/api/profile/avatar/${encodeURIComponent(this.props.user.profile.id)}.png`}
          alt="avatar" className={`${css.profilepic} mr-2 rounded-circle`} />
        {this.props.user.profile.username}
      </React.Fragment>
    );
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
