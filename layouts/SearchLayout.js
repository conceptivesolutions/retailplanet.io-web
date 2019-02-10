import SearchHeader from "../components/search/SearchHeader";
import css from './SearchLayout.scss';
import Footer from "../components/navigation/Footer";

//noinspection JSUnusedGlobalSymbols
export default (props) => (
    <div>
      <SearchHeader session={props.session} query={props.query} onSubmit={props.onSubmit} withLogo fixedTop/>
      <div className={`${css.filterContainer} d-flex flex-column`}>

      </div>
      <div className={`${css.container} d-flex flex-column`}>
        {props.children}
      </div>
      <Footer/>
    </div>
);