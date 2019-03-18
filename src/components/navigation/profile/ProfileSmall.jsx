import * as React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { push } from 'connected-next-router';
import css from './ProfileSmall.scss';
import ANavDropdown from '../dropdown/ANavDropdown';

/**
 * props.session = Die aktuelle Session (optional)
 *
 * @author w.glanzer, 27.01.2019
 */
class ProfileSmall extends React.Component {
  createUserComp() {
    return (
      <React.Fragment>
        <i className={`fa fa-dragon ${css.profilepic} mr-2 rounded-circle`} />
        {this.props.user.profile.username}
      </React.Fragment>
    );
  }

  render() {
    if (this.props.user.profile) {
      return (
        <ANavDropdown title={this.createUserComp()} alignRight>
          <NavDropdown.Item onClick={() => this.props.logout()}>Logout</NavDropdown.Item>
        </ANavDropdown>
      );
    }
    return (
      // eslint-disable-next-line
      <div className={`nav-link ${css.login}`} onClick={() => this.props.login()}>
        Login
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  login: () => {
    dispatch(push('/login'));
  },
  logout: () => {
    dispatch(push('/logout'));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSmall);
