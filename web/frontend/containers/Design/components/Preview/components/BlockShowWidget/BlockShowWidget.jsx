import classNames from 'classnames';
import React from 'react';

function BlockShowWidget() {
  return (
    <>
      <div className={styles.itemsNav}>
        <div
          className={classNames(styles.item, {
            [styles.active]: activePopupStep == 1,
            [styles.disabled]: !(isMobile
              ? popup.rating.mobile_show
              : popup.rating.show),
          })}
          onClick={() => {
            if (isMobile ? popup.rating.mobile_show : popup.rating.show) {
              dispatch(setKey('activePopupStep', 1));
            }
          }}
        >
          <div className={styles.icon}>1</div>
          Rating & Branding
        </div>
        <div
          className={classNames(styles.item, {
            [styles.active]: activePopupStep == 2,
            [styles.disabled]: !(isMobile
              ? popup.category.mobile_show
              : popup.category.show),
          })}
          onClick={() => {
            if (isMobile ? popup.category.mobile_show : popup.category.show) {
              dispatch(setKey('activePopupStep', 2));
            }
          }}
        >
          <div className={styles.icon}>2</div>
          Category
        </div>
        <div
          className={classNames(styles.item, {
            [styles.active]: activePopupStep == 3,
            [styles.disabled]: !(isMobile
              ? popup.review.mobile_show
              : popup.review.show),
          })}
          onClick={() => {
            if (isMobile ? popup.review.mobile_show : popup.review.show) {
              dispatch(setKey('activePopupStep', 3));
            }
          }}
        >
          <div className={styles.icon}>3</div>
          Review
        </div>
        <div
          className={classNames(styles.item, {
            [styles.active]: activePopupStep == 4,
            [styles.disabled]: !(isMobile
              ? popup.link.mobile_show
              : popup.link.show),
          })}
          onClick={() => {
            if (isMobile ? popup.link.mobile_show : popup.link.show) {
              dispatch(setKey('activePopupStep', 4));
            }
          }}
        >
          <div className={styles.icon}>4</div>
          Link
        </div>
        <div
          className={classNames(styles.item, {
            [styles.active]: activePopupStep == 5,
            [styles.disabled]: !(isMobile
              ? popup.thank_you.mobile_show
              : popup.thank_you.show),
          })}
          onClick={() => {
            if (isMobile ? popup.thank_you.mobile_show : popup.thank_you.show) {
              dispatch(setKey('activePopupStep', 5));
            }
          }}
        >
          <div className={styles.icon}>5</div>
          Thank You
        </div>
      </div>
    </>
  );
}

export default BlockShowWidget;
