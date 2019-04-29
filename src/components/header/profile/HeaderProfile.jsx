import * as React from 'react';
import { NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import css from './HeaderProfile.scss';

/**
 * @author w.glanzer, 27.01.2019
 */
class HeaderProfile extends React.Component {
  constructor(props) {
    super(props);
    this.getUserDisplayName = this.getUserDisplayName.bind(this);
  }

  /**
   * @returns {string} Returns the current users displayname
   */
  getUserDisplayName() {
    const { username, name } = this.props.user.profile;
    if (name) {
      const { givenName, familyName } = name;
      if (givenName && familyName)
        return `${givenName} ${familyName}`;
    }

    return username;
  }

  render() {
    if (this.props.user.profile && !this.props.disableLogin)
      return (
        <NavDropdown className={`${css.innerDrop} d-flex align-items-center`}
          title={(
            <React.Fragment>
              <img src={`/api/profile/avatar/${encodeURIComponent(this.props.user.profile.id)}.png`}
                alt="avatar" className={`${css.profilepic} mr-2 rounded-circle`} />
              {this.getUserDisplayName()}
              <i className={`${css.dropdownToggleCustom} fa fa-angle-down`} />
            </React.Fragment>
          )} id="basic-nav-dropdown" alignRight>
          <NavDropdown.Item onClick={() => this.props.router.push('/logout')}>Logout</NavDropdown.Item>
        </NavDropdown>
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

export default withRouter(connect(mapStateToProps)(HeaderProfile));
