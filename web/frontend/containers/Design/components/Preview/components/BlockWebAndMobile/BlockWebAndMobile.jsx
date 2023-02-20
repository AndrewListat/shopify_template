import React from 'react';
import ContentPreview from '../ContentPreview/ContentPreview';
import styles from './style.module.scss';

function BlockWebAndMobile({ isMobile, settings }) {
  return (
    <div className={styles.BlockWebAndMobile}>
      {!isMobile && (
        <div className={styles.web}>
          <div className={styles.header}>
            <div />
            <div />
            <div />
          </div>
          <div className={styles.content}>
            <ContentPreview isMobile={isMobile} settings={settings} />
          </div>
        </div>
      )}
      {isMobile && (
        <div className={styles.mobile_block}>
          <div className={styles.mobile}>
            <div className={styles.header}>
              <div className={styles.point} />
              <div className={styles.mic} />
            </div>
            <div className={styles.content}>
              <ContentPreview isMobile={isMobile} settings={settings} />
            </div>
            <div className={styles.footer}>
              <div />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlockWebAndMobile;
