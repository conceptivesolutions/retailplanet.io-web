import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import css from './IndexLayout.scss';

/**
 * Layout for the index page
 *
 * @author w.glanzer, 14.01.2019
 */
export default ({ children }) => (
  <div className={css.rootContainer}>
    <Header fixedTop withLogo transparent />
    <Container className={css.container}>{children}</Container>
    <Footer fixedBottom withLogo />
  </div>
);
