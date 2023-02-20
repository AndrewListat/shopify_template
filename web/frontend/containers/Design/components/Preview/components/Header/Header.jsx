import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from 'react-switch';
import classNames from 'classnames';
import { Button, Modal, Toast } from '@shopify/polaris';
import { AiOutlineMobile } from 'react-icons/ai';
import { FaDesktop } from 'react-icons/fa';
import GroupButton from '../../../../../../components/GroupButton/GroupButton';
import { setKey, updateWidget } from '../../../../actions';
import styles from './style.module.scss';
import { Web } from '../../../../../../assets';
import { default as Smartphone } from '../../../../../../assets/icons/smartphone.svg';
import ToggleSwitch from '../../../../../../components/Fields/ToggleSwitch';

function Header() {
  const [open, setOpen] = useState(false);
  const isMobile = useSelector((state) => state.widget.isMobile);
  const widget = useSelector((state) => state.widget.data);
  const dispatch = useDispatch();
  const [active, setActive] = useState(null);

  const toggleActive = useCallback(() => setActive((active) => null), []);

  const toastMarkup = active ? (
    <Toast content={active} onDismiss={toggleActive} />
  ) : null;

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className={styles.Header}>
      <Modal open={open} onClose={closeModal} titleHidden small>
        <Modal.Section>
          <div className={styles.ModalBody}>
            <img src="/assets/icons/modal_img2.svg" />
            <div className={styles.title}>Deactivate Feedback Button</div>
            <div className={styles.text}>
              The Feedback Button will become inactive and not visibile on your
              website.
            </div>
            <div className={styles.actions}>
              <Button fullWidth onClick={closeModal}>
                Cancel
              </Button>
              <Button
                primary
                fullWidth
                onClick={() => {
                  dispatch(updateWidget({ id: widget.id, active: false }));
                  closeModal();
                  setActive('Feedback Button deactivated.');
                }}
              >
                Deactivate
              </Button>
            </div>
          </div>
        </Modal.Section>
      </Modal>
      <div className={styles.text}>Preview</div>
      <GroupButton
        options={[
          {
            icon: <img src={Web} width={16} />,
            onClick: () => {
              dispatch(setKey('isMobile', false));
            },
            active: !isMobile,
          },
          {
            icon: <img src={Smartphone} width={12} />,
            onClick: () => {
              dispatch(setKey('isMobile', true));
            },
            active: isMobile,
          },
        ]}
      />
      <div className={styles.activeInput}>
        <div
          className={classNames(styles.text, {
            [styles.active]: widget.active,
          })}
        >
          {widget.active ? 'Active' : 'Inactive'}
        </div>
        <ToggleSwitch
          onChange={() => {
            const active = !widget.active;
            if (!active) {
              setOpen(true);
              return;
            }
            dispatch(updateWidget({ id: widget.id, active }));
            setActive(
              active
                ? 'Feedback Button published and is now available on your website.'
                : 'Feedback Button deactivated.'
            );
          }}
          value={widget.active}
        />
      </div>
      {toastMarkup}
    </div>
  );
}

export default Header;
