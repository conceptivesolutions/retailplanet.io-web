import * as React from 'react';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import css from './SearchLayout.scss';

// noinspection JSUnusedGlobalSymbols
export default props => (
  <div>
      <Header session={props.session} query={props.query} onSubmit={props.onSubmit} withLogo fixedTop />
      <div className={`${css.filterContainer} d-flex flex-column`} />
    <div className={`${css.container} d-flex flex-column`}>
      {props.children}
    </div>
      <Footer />
  </div>
);
