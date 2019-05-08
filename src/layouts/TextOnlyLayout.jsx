import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import css from './TextOnlyLayout.scss';

/**
 * @author w.glanzer, 19.01.2019
 */
export default ({ children }) => (
  <div className={css.rootContainer}>
    <Header fixedTop withLogo />
    <Container>{children}</Container>
    <Footer fixedBottom withLogo />
  </div>
);
