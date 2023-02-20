import React, { useState } from 'react';
import { Button, Modal } from '@shopify/polaris';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getFormValues } from 'redux-form/dist/redux-form';
import styles from './style.module.scss';
import RatingApp from './components/RatingApp/RatingApp';
import { updateWidget } from '../Design/actions';

function Header() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // const router = useRouter();
  const formValues = useSelector((state) => getFormValues('design')(state));
  const initialValues = useSelector((state) => state.widget.data);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className={styles.Header}>
      <div className={classNames(styles.Rating)}>
        {!initialValues.click_rating && <RatingApp />}
      </div>
      <div className={classNames(styles.FAQ)}>
        <Button
          onClick={() => {
            dispatch({ type: 'SET_SHOP_KEY', key: 'showPlans', data: true });
          }}
        >
          Change Plan
        </Button>
        <Button
          onClick={() => {
            window.open(process.env.APP_API_FAQ);
          }}
        >
          FAQ & Support
        </Button>
        <Button
          onClick={() => {
            dispatch({
              type: 'SET_KEY_WIDGET',
              key: 'showInstruction',
              data: true,
            });
          }}
        >
          How to Install
        </Button>
      </div>
    </div>
  );
}

export default Header;
