import * as React from 'react';
import { Image, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLanguage } from 'redux-i18n';
import css from './Language.scss';
import ANavDropdown from './dropdown/ANavDropdown';

const flags = [];
flags.de = 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg';
flags.en = 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg';

/**
 * Component which can change the language of the whole application
 */
class Language extends React.Component {
  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.createFragmentForLang = this.createFragmentForLang.bind(this);
  }

  createFragmentForLang(pLangTag) {
    return (
      <React.Fragment>
        <Image className={`${css.langFlag} mr-2`} src={flags[pLangTag]} />
        {this.context.t('langs')[pLangTag]}
      </React.Fragment>
    );
  }

  render() {
    return (
      <ANavDropdown title={this.createFragmentForLang(this.props.lang)}>
        {Object.entries(this.context.t('langs'))
          .filter(([key]) => key !== this.props.lang)
          .map(([key]) => (
            <NavDropdown.Item key={key} onClick={() => this.props.dispatch(setLanguage(key))}>
              {this.createFragmentForLang(key)}
            </NavDropdown.Item>
          ))}
      </ANavDropdown>
    );
  }
}

const mapStateToProps = state => ({
  lang: state.i18nState.lang,
});

export default connect(mapStateToProps)(Language);
