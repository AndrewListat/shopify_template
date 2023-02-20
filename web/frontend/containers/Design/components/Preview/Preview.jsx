import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formValueSelector, getFormValues } from 'redux-form';
import BlockWebAndMobile from './components/BlockWebAndMobile/BlockWebAndMobile';
import Header from './components/Header/Header';
import styles from './style.module.scss';

function Preview() {
  const selector = formValueSelector('design');
  const formValues = useSelector((state) => getFormValues('design')(state));
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.widget.isMobile);
  const activeTab = useSelector((state) => state.widget.activeTab);
  const activePopupStep = useSelector((state) => state.widget.activePopupStep);

  return (
    <div className={styles.Preview}>
      <Header />
      <BlockWebAndMobile isMobile={isMobile} settings={formValues.setting} />
    </div>
  );
}

export default Preview;
