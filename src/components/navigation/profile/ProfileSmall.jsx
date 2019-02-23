import * as React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import css from './ProfileSmall.scss';
import ANavDropdown from '../dropdown/ANavDropdown';
import userManager from '../../../helpers/auth/userManager';

/**
 * props.session = Die aktuelle Session (optional)
 *
 * @author w.glanzer, 27.01.2019
 */
class ProfileSmall extends React.Component {
  static logout(e) {
    e.preventDefault();
  }

  static login(e) {
    e.preventDefault();
    userManager.signinRedirect();
  }

  createUserComp() {
    return (
      <React.Fragment>
        <i className={`fa fa-dragon ${css.profilepic} mr-2 rounded-circle`} />
        {this.props.user.name}
      </React.Fragment>
    );
  }

  render() {
    if (this.props.user) {
      return (
        <ANavDropdown title={this.createUserComp()} alignRight>
          <NavDropdown.Item onClick={e => ProfileSmall.logout(e)}>Logout</NavDropdown.Item>
        </ANavDropdown>
      );
    }
    return (
      // eslint-disable-next-line
      <div className={`nav-link ${css.login}`} onClick={e => ProfileSmall.login(e)}>
        Login
      </div>
    );
  }
}

export default connect()(ProfileSmall);
