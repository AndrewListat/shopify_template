/* eslint-disable no-param-reassign */
import { Button, ButtonGroup } from '@shopify/polaris';
import React from 'react';
import { useSelector } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import styles from './style.module.scss';

function Footer({ activeTab, setActiveTab, onSubmit, forms = [] }) {
  const selector = formValueSelector('design');
  const active = useSelector((state) => selector(state, 'active'));
  return (
    <div className={styles.Footer}>
      {forms.length > 1 ? (
        <ButtonGroup>
          <Button
            disabled={activeTab == 1}
            onClick={() => setActiveTab(activeTab - 1)}
          >
            <MdKeyboardArrowLeft />
            Back
          </Button>
          <Button
            disabled={activeTab >= forms.length}
            onClick={() => setActiveTab(activeTab + 1)}
          >
            Next
            <MdKeyboardArrowRight />
          </Button>
        </ButtonGroup>
      ) : (
        <div />
      )}
      <Button primary onClick={onSubmit}>
        {active ? 'Save' : 'Publish'}
      </Button>
    </div>
  );
}

export default Footer;
