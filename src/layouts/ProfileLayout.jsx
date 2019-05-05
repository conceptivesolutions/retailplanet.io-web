import React from 'react';
import { Container} from 'react-bootstrap';
import css from './ProfileLayout.scss';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

/**
 * Layout for the profile page
 *
 * @author w.glanzer, 04.05.2019
 */
export default ({ nav, children }) => (
  <div className={css.page}>
    <Header withLogo />
    <Container className={css.content}>
      {nav}
      {children}
    </Container>
    <Footer withLogo />
  </div>
);
