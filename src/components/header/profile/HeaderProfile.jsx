import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { Dropdown, Image } from 'semantic-ui-react';
import css from './HeaderProfile.scss';

/**
 * @author w.glanzer, 27.01.2019
 */
class HeaderProfile extends React.Component {
  options = [
    {
      key: 'logout',
      value: 'logout',
      text: 'Sign out',
    },
  ];

  constructor(props) {
    super(props);
    this.getUserDisplayName = this.getUserDisplayName.bind(this);
    this.createUserComp = this.createUserComp.bind(this);
    this.handlePopupClick = this.handlePopupClick.bind(this);
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
        <Image avatar src={`/api/profile/avatar/${encodeURIComponent(this.props.user.profile.id)}.png`} />
        {this.getUserDisplayName()}
      </span>
    );
  }

  /**
   * Function which executes when an item in the dropdown menu has been clicked
   *
   * @param e event
   * @param value clicked option value
   */
  handlePopupClick(e, { value }) {
    switch (value) {
      case 'logout':
        this.props.router.push('/logout');
        break;

      default:
        break;
    }
  }

  render() {
    if (this.props.user && this.props.user.profile && !this.props.disableLogin)
      return (
        <Dropdown
          className={css.innerDrop}
          trigger={this.createUserComp()}
          onChange={this.handlePopupClick}
          options={this.options}
          pointing="top left"
          icon={null} />
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
