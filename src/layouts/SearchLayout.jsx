import * as React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Image, Loader } from 'semantic-ui-react';
import Header from '../components/header/Header';
import css from './SearchLayout.scss';
import ResultFilters from '../components/filters/ResultFilters';
import Footer from '../components/footer/Footer';
import Navigation from '../components/search/Navigation';

const SearchLayout = ({ loading, children }) => {
  let container = null;

  if (loading)
    container = (
      <div className={css.loader}>
        <Loader inline active />
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
              <Image className={`${css.logo}`} src="/static/retailplanet-logo_dark.svg" />
            </a>
          </Link>
          <ResultFilters className={css.filter} />
          <Footer className={css.footer} withLang />
        </div>
        <div className={css.container}>
          <Header className={css.header} withSearch />
          <Navigation className={css.navigation} />
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
