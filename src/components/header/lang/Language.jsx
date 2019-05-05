import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';
import css from './Language.scss';

const flags = [];
flags.de = 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg';
flags.en = 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg';

/**
 * Component which can change the language of the whole application
 */
const Language = (props) => (
  <React.Fragment>
    <Image className={`${css.langFlag} mr-2`} src={flags[props.lang]} />
  </React.Fragment>
);

Language.contextTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  lang: state.i18nState.lang,
});

export default connect(mapStateToProps)(Language);
