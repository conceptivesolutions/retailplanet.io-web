import {Container} from "react-bootstrap";
import PageHeader from "../components/navigation/PageHeader.js";
import PageFooter from "../components/navigation/PageFooter.js";
import css from './IndexLayout.scss'

/**
 * Layout für die Index-Seite mit der Haupt-Suche
 *
 * @author w.glanzer, 14.01.2019
 */
export default (props) => (
    <div className={css.rootContainer}>
      <PageHeader session={props.session} fixedTop withLogo/>
      <Container className="h-100">
        {props.children}
      </Container>
      <PageFooter/>
    </div>
);