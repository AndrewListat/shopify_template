import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Frame, Spinner } from '@shopify/polaris';
import styles from './style.module.scss';
import { getShop } from '../../redux/actions';
import { setApp } from '../../lib/fetch';
import { useAppBridge } from '@shopify/app-bridge-react';
import Header from '../Header/Header';
import Instruction from '../Instruction/Instruction';
import Plans from '../Plans/Plans';

function Layout({ children }) {
  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.shop.loaded);
  const app = useAppBridge();

  useEffect(() => {
    setApp(app)
    dispatch(getShop())
  }, []);


  if (!loaded) {
    return (
      <div className={styles.Spinner}>
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <Frame>
      <div className={classNames(styles.Layout)}>
        <Header />
        <Plans />
        <Instruction />
        {children}
      </div>
    </Frame>
  );
}

export default Layout;
