import * as React from 'react';
import {NavDropdown} from 'react-bootstrap';
import {connect} from 'react-redux';
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
        {this.props.user.name}
      </React.Fragment>
    );
  }

  render() {
    if (this.props.user) {
      return (
        <ANavDropdown title={this.createUserComp()} alignRight>
          <NavDropdown.Item>Logout</NavDropdown.Item>
        </ANavDropdown>
      );
    }
    return (
      // eslint-disable-next-line
      <div className={`nav-link ${css.login}`}>
        Login
      </div>
    );
  }
}
export default connect()(ProfileSmall);
