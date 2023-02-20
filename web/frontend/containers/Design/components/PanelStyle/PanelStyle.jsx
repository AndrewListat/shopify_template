import React, { useCallback, useState } from 'react';
import { formValueSelector, getFormValues, reduxForm } from 'redux-form/dist/redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '@shopify/polaris';
import GroupButton from '../../../../components/GroupButton/GroupButton';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import styles from './style.module.scss';
import Smartphone  from '../../../../assets/icons/smartphone.svg';
import { Web }  from '../../../../assets';
import { setKey, updateWidget } from '../../actions';
import Banner from './components/Banner/Banner';

function PanelStyle({ handleSubmit, change }) {
  const isMobile = useSelector((state) => state.widget.isMobile);
  const activeTab = useSelector((state) => state.widget.activeTab);

  const formValues = useSelector((state) => getFormValues('design')(state));
  const dispatch = useDispatch();

  const selector = formValueSelector('design');
  const active = useSelector((state) => selector(state, 'active'));

  const [message, setMessage] = useState(null);

  const setActiveTab = (v) => {
    dispatch(setKey('activeTab', v));
  };

  const handleSave = (data) => {
    dispatch(updateWidget(data));
    setMessage('Changes saved and published.');
  };

  const toggleActive = useCallback(() => setMessage((active) => null), []);

  const toastMarkup = message ? (
    <Toast content={message} onDismiss={toggleActive} />
  ) : null;

  const forms = [
    {
      indexTab: 1,
      title: 'Banner',
      component: <Banner changeRoot={change} />,
    },
  ];

  return (
    <div className={styles.PanelStyle}>
      <Header activeTab={activeTab} tabs={forms} setActiveTab={setActiveTab} />
      <div className={styles.container}>
        <GroupButton
          options={[
            {
              title: 'Desktop',
              icon: <img width={16} src={Web} alt="" />,
              onClick: () => {
                dispatch(setKey('isMobile', false));
              },
              active: !isMobile,
            },
            {
              title: 'Mobile',
              icon: <img width={12} src={Smartphone} alt="" />,
              onClick: () => {
                dispatch(setKey('isMobile', true));
              },
              active: isMobile,
            },
          ]}
        />
        {
          (forms.find((_i) => _i.indexTab == activeTab) || { component: null })
            .component
        }
      </div>
      <Footer
        onSubmit={handleSubmit(handleSave)}
        activeTab={activeTab}
        setActiveTab={(v) => setActiveTab(v)}
        forms={forms}
      />
      {toastMarkup}
    </div>
  );
}

export default reduxForm({
  form: 'design',
  enableReinitialize: true,
})(PanelStyle);
