import * as React from 'react';
import Link from 'next/link';
import { Image, Menu } from 'semantic-ui-react';
import ProfileSmall from './profile/HeaderProfile';
import css from './Header.scss';
import HeaderSearchbar from './search/HeaderSearchbar';

/**
 * props.withLogo = If set, the retailplanet logo will be rendered at the left upper corner
 * props.withSearch = If set, a searchbar will be presented
 *
 * @author w.glanzer, 14.01.2019
 */
export default class Header extends React.Component {
  static renderLogo() {
    return (
      <Menu.Item>
        <Link href="/">
          <a>
            <Image className={`${css.logo}`} src="/static/retailplanet-logo.svg" />
          </a>
        </Link>
      </Menu.Item>
    );
  }

  static renderSearch() {
    return (
      <Menu.Item>
        <HeaderSearchbar className={css.searchBar} />
      </Menu.Item>
    );
  }

  render() {
    return (
      <Menu className={`${css.pageHeader} ${this.props.className || ''}`} secondary>
        {this.props.withLogo ? Header.renderLogo() : ''}
        <Menu.Menu position="right">
          {this.props.withSearch ? Header.renderSearch() : ''}
          <Menu.Item>
            <ProfileSmall />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
