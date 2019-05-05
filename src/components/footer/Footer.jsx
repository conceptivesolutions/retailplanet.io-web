import * as React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Image, Menu } from 'semantic-ui-react';
import css from './Footer.scss';
import Language from '../header/lang/Language';

/**
 * props.fixedBottom = If set, the footer will be fixed bottom
 * props.withLogo = If set, the logo will be shown
 *
 * @author w.glanzer, 14.01.2019
 */
class Footer extends React.Component {
  static renderLogo() {
    return (
      <Menu.Menu position="right">
        <Menu.Item>
          <Link href="/">
            <a>
              <Image className={`${css.logo}`} src="https://www.conceptive.io/static/logo/symbol_text/300_dark.png" />
            </a>
          </Link>
        </Menu.Item>
      </Menu.Menu>
    );
  }

  static renderLang() {
    return (
      <Menu.Item>
        <Language />
      </Menu.Item>
    );
  }

  render() {
    return (
      <Menu className={`${css.pageFooter} ${this.props.className || ''}`} inverted>
        <Menu.Item>
          <Link href="/imprint">
            <a>Impressum</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/privacy">
            <a>Datenschutz</a>
          </Link>
        </Menu.Item>
        {this.props.withLang ? Footer.renderLang() : ''}
        {this.props.withLogo ? Footer.renderLogo() : ''}
      </Menu>
    );
  }
}

export default connect()(Footer);
