import {Container} from 'react-bootstrap';
import Header from '../components/navigation/Header.js';
import Footer from '../components/navigation/Footer.js';
import css from './IndexLayout.scss';

/**
 * Layout für die Index-Seite mit der Haupt-Suche
 *
 * @author w.glanzer, 14.01.2019
 */
export default (props) => (
    <div className={css.rootContainer}>
      <Header session={props.session} fixedTop withLogo/>
      <Container className="h-100">
        {props.children}
      </Container>
      <Footer fixedBottom/>
    </div>
);