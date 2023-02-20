/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import { Toast } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import Rating from 'react-rating';
import { useDispatch, useSelector } from 'react-redux';
import { updateWidget } from '../../../Design/actions';
import styles from './style.module.scss';

function SVGIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#FFBF3A"
        d="M11.082 1.133c.347-.806 1.49-.806 1.836 0l2.633 6.112a1 1 0 00.826.6l6.626.614c.873.081 1.227 1.168.567 1.747l-5 4.392a1 1 0 00-.315.971l1.463 6.492c.193.856-.731 1.528-1.486 1.08l-5.721-3.398a1 1 0 00-1.022 0l-5.721 3.398c-.755.448-1.68-.224-1.486-1.08l1.463-6.492a1 1 0 00-.316-.97l-5-4.393C-.23 9.627.125 8.54.998 8.46l6.626-.614a1 1 0 00.827-.6l2.632-6.112z"
      />
    </svg>
  );
}

function SVGIcon2(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#E7E2DD"
        d="M11.082 1.133c.347-.806 1.49-.806 1.836 0l2.633 6.112a1 1 0 00.826.6l6.626.614c.873.081 1.227 1.168.567 1.747l-5 4.392a1 1 0 00-.315.971l1.463 6.492c.193.856-.731 1.528-1.486 1.08l-5.721-3.398a1 1 0 00-1.022 0l-5.721 3.398c-.755.448-1.68-.224-1.486-1.08l1.463-6.492a1 1 0 00-.316-.97l-5-4.393C-.23 9.627.125 8.54.998 8.46l6.626-.614a1 1 0 00.827-.6l2.632-6.112z"
      />
    </svg>
  );
}

function RatingApp() {
  const dispatch = useDispatch();
  const widget = useSelector((state) => state.widget.data);

  return (
    <div className={styles.RatingApp}>
      <div className={styles.text}>Rate us on Shopify App Store</div>
      <Rating
        className={styles.rating}
        onChange={() => {
          dispatch(updateWidget({ id: widget.id, click_rating: true }));
          window.open(process.env.NEXT_PUBLIC_APP_STORE_URL);
        }}
        emptySymbol={<SVGIcon2 />}
        fullSymbol={<SVGIcon />}
      />
    </div>
  );
}

export default RatingApp;
