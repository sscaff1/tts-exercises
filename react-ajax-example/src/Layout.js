import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './Layout.module.css';

function Layout({ children, location, history }) {
  const goBack = e => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <div>
      <div className={styles.header}>
        <Link to="/">
          <h1>React Ajax App</h1>
        </Link>
      </div>
      <div className={styles.body}>
        {location.pathname !== '/' ? (
          <a href="#" onClick={goBack}>
            {'<- Go Back'}
          </a>
        ) : (
          <Link to="createPost">Create Post</Link>
        )}
        {children}
      </div>
      <div className={styles.footer}>Footer</div>
    </div>
  );
}

export default withRouter(Layout);
