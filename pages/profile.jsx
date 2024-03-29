import * as React from 'react';
import { withRouter } from 'next/router';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileLayout from '../src/layouts/ProfileLayout';
import withAuth from '../src/auth/withAuth';
import css from './profile.scss';
import pages from '../src/profile/pages/ProfilePages';
import { isAdmin } from '../src/helpers/rest/userHelper';

/**
 * Profile-Page
 *
 * @author w.glanzer, 08.05.2019
 */
class Profile extends React.Component {
  state = {
    activeItem: 'account',
  };

  constructor(props, context) {
    super(props, context);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.createSidebar = this.createSidebar.bind(this);
    this.createContent = this.createContent.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({
      activeItem: name,
    });
  }

  createSidebar() {
    const { t } = this.context;
    const { activeItem } = this.state;
    const adminMenu = (
      <Menu color="teal" inverted fluid vertical>
        <Menu.Item name="admin" active={activeItem === 'admin'} content={t('profile_admin')} onClick={this.handleItemClick} />
      </Menu>
    );

    return (
      <React.Fragment>
        <Menu fluid vertical>
          <Menu.Item icon="user" name="account" active={activeItem === 'account'} content={t('profile_account')} onClick={this.handleItemClick} />
        </Menu>
        <Menu fluid vertical>
          <Menu.Item name="clients" active={activeItem === 'clients'} content={t('profile_clients')} onClick={this.handleItemClick} />
          <Menu.Item name="products" active={activeItem === 'products'} content={t('profile_products')} onClick={this.handleItemClick} />
        </Menu>
        {this.props.admin ? adminMenu : null}
      </React.Fragment>
    );
  }

  createContent() {
    const Content = pages[this.state.activeItem];
    if (!Content)
      return <span>No content available</span>;

    return (
      <div className={css.content}>
        <Content />
      </div>
    );
  }

  render() {
    return (
      <ProfileLayout nav={this.createSidebar()}>
        {this.createContent()}
      </ProfileLayout>
    );
  }
}

Profile.contextTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  admin: isAdmin(state.user),
});

// noinspection JSUnusedGlobalSymbols
export default withRouter(withAuth(connect(mapStateToProps)(Profile), {
  loginRequired: true,
}));
