import * as React from 'react';
import { withRouter } from 'next/router';
import ProfileLayout from '../src/layouts/ProfileLayout';
import withAuth from '../src/auth/withAuth';
import css from './profile.scss';

class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.createSidebar = this.createSidebar.bind(this);
  }

  createSidebar() {
    return (
      <div className={}>
        asdf
      </div>
    );
  }

  render() {
    return (
      <ProfileLayout nav={this.createSidebar()}>
        <div className={css.content} />
      </ProfileLayout>
    );
  }
}

// noinspection JSUnusedGlobalSymbols
export default withRouter(withAuth(Profile, {
  loginRequired: true,
}));
