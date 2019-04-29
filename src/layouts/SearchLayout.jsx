import * as React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Image } from 'react-bootstrap';
import Header from '../components/header/Header';
import LoadingIndicator from '../components/loading/LoadingIndicator';
import css from './SearchLayout.scss';
import ResultFilters from '../components/filters/ResultFilters';
import Footer from '../components/footer/Footer';
import Navigation from '../components/search/Navigation';

const SearchLayout = ({ loading, children }) => {
  let container = null;

  if (loading)
    container = (
      <div className="d-flex flex-column align-items-center justify-content-center h-100">
        <LoadingIndicator />
      </div>
    );
  else
    container = children;

  return (
    <div className={css.page}>
      <div className={css.content}>
        <div className={css.filterContainer}>
          <Link href="/">
            <a>
              <Image className={`${css.logo}`} src="/static/retailplanet-logo.svg" />
            </a>
          </Link>
          <ResultFilters className={css.filter} />
          <Footer className={css.footer} />
        </div>
        <div className={css.container}>
          <Header withSearch />
          <Navigation className={css.navigation}/>
          <div className={css.subcontent}>
            {container}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.search.loading,
});

export default connect(mapStateToProps)(SearchLayout);
