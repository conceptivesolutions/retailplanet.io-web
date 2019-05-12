import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Dropdown, Image } from 'semantic-ui-react';
import css from './HeaderProfile.scss';

/**
 * @author w.glanzer, 27.01.2019
 */
class HeaderProfile extends React.Component {
  constructor(props) {
    super(props);
    this.getUserDisplayName = this.getUserDisplayName.bind(this);
    this.createUserComp = this.createUserComp.bind(this);
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

  /**
   * @returns {*} the user comp, displayable directly in header
   */
  createUserComp() {
    return (
      <span>
        <Image avatar className={css.avatar} src={`/api/profile/avatar/${encodeURIComponent(this.props.user.profile.id)}.png`} />
        {this.getUserDisplayName()}
      </span>
    );
  }

  render() {
    const { user, disableLogin, router } = this.props;

    if (user && user.profile && !disableLogin)
      return (
        <Dropdown trigger={this.createUserComp()}>
          <Dropdown.Menu>
            <Dropdown.Header>{`Logged in as '${user.profile.username}'`}</Dropdown.Header>
            <Dropdown.Item text="My Profile" onClick={() => router.push('/profile')} />
            <Dropdown.Divider className={css.divider} />
            <Dropdown.Item text="Sign Out" onClick={() => router.push('/logout')} />
          </Dropdown.Menu>
        </Dropdown>
      );

    return (
      // eslint-disable-next-line
      <div className={css.login} onClick={() => router.push('/login')}>
        Login
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(HeaderProfile));
