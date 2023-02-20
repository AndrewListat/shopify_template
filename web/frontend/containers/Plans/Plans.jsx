/* eslint-disable no-empty */
/* eslint-disable no-restricted-globals */
/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
import { Button, Modal, Spinner } from '@shopify/polaris';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.scss';
import AcceptMajor from '../../assets/icons/accept_major.svg';
import { changePlan, getPlans } from './action';

function Plans() {
  const shop = useSelector((state) => state.shop.data);
  const dispatch = useDispatch();
  const active = useSelector((state) => state.shop.showPlans);
  // const [active, setActive] = useState(!shop.pricing_plan);

  const [spinner, setSpinner] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [plans, setPlans] = useState([]);
  const handleChange = useCallback(
    () => dispatch({ type: 'SET_SHOP_KEY', key: 'showPlans', data: !active }),
    [active]
  );

  const onGetPlans = async () => {
    const data = await getPlans();
    setPlans(data);
    setLoaded(true);
  };

  useEffect(() => {
    onGetPlans();
    if (!shop.pricing_plan) {
      dispatch({ type: 'SET_SHOP_KEY', key: 'showPlans', data: true });
    }
  }, []);

  const onChangePlan = async (pricing_plan) => {
    try {
      setSpinner(true);
      const result = await changePlan({ pricing_plan, host: window.__SHOPIFY_DEV_HOST });
      if (result.confirmation_url) {
        if (typeof top != 'undefined') {
          top.window.location.href = result.confirmation_url;
        } else {
          window.location.href = result.confirmation_url;
        }
      } else if (result.id) {
        dispatch({ type: 'GET_SHOP', data: result });
        setSpinner(false);
        dispatch({ type: 'SET_SHOP_KEY', key: 'showPlans', data: false });
      }
    } catch (error) {
      setSpinner(true);
    }
  };

  if (!loaded) {
    return null;
  }

  return (
    <Modal
      open={active}
      onClose={shop.pricing_plan ? handleChange : null}
      large
    >
      <div className={styles.Plans}>
        {spinner && (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}
        <div className={styles.title}>Pricing Plans</div>
        <div className={styles.items}>
          {plans.map((_p) => (
            <div className={styles.item} key={_p.name}>
              {_p.best && <div className={styles.header}>most popular</div>}
              <div className={styles.name}>{_p.title}</div>
              <div className={styles.price}>
                {_p.price > 0 ? '$' + _p.price : 'Free'}
              </div>
              <div className={styles.text_items}>
                {_p.text_items.map((_t, i) => (
                  <div className={styles.text_item} key={'text' + i}>
                    <AcceptMajor /> {_t}
                  </div>
                ))}
              </div>
              {shop.pricing_plan == _p.name && (
                <div className={styles.current}>Your Current Plan</div>
              )}
              {shop.pricing_plan != _p.name && (
                <Button
                  outline
                  fullWidth
                  primary={_p.best}
                  onClick={() => {
                    onChangePlan(_p.name);
                  }}
                >
                  Get Started
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default Plans;
