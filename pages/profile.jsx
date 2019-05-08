import * as React from 'react';
import { withRouter } from 'next/router';
import { Menu } from 'semantic-ui-react';
import ProfileLayout from '../src/layouts/ProfileLayout';
import withAuth from '../src/auth/withAuth';
import css from './profile.scss';
import pages from '../src/profile/pages/ProfilePages';

/**
 * Profile-Page
 *
 * @author w.glanzer, 08.05.2019
 */
class Profile extends React.Component {
  state = {
    activeItem: 'common',
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
    const { activeItem } = this.state;
    return (
      <Menu fluid vertical>
        <Menu.Item name="common" active={activeItem === 'common'} content="Allgemein" onClick={this.handleItemClick} />
      </Menu>
    );
  }

  createContent() {
    const Content = pages[this.state.activeItem];
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

// noinspection JSUnusedGlobalSymbols
export default withRouter(withAuth(Profile, {
  loginRequired: true,
}));
