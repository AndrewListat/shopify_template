/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable @next/next/no-html-link-for-pages */
import { Button, Modal, Toast } from '@shopify/polaris';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Context } from '@shopify/app-bridge-react';
import { Redirect } from '@shopify/app-bridge/actions';
import { useDispatch, useSelector } from 'react-redux';
import {FiCopy} from 'react-icons/fi'
import {BiCopy} from 'react-icons/bi'
import styles from './style.module.scss';
import { getThemes } from './actions';
import { updateWidget } from '../Design/actions';

function Instruction() {
  const [show, setShow] = useState(true);
  const showInstruction = useSelector((state) => state.widget.showInstruction);
  const [url, setUrl] = useState('/themes');
  const [url2, setUrl2] = useState('/themes');
  const widget = useSelector((state) => state.widget.data);
  const dispatch = useDispatch();
  const textArea = useRef(null);
  const [active, setActive] = useState(false);

  const getData = async () => {
    const data = await getThemes();

    const theme = data.find((_i) => _i.role == 'main');
    if (theme) {
      setUrl(`/themes/${theme.id}/editor?context=apps`);
      setUrl2(`/themes/${theme.id}?key=layout/theme.liquid`);
    }
  };

  const onClose = () => {
    // show_instruction
    dispatch(updateWidget({ show_instruction: false, id: widget.id }));
    setShow(false);
    dispatch({
      type: 'SET_KEY_WIDGET',
      key: 'showInstruction',
      data: false,
    });
  };

  const copyToClipboard = (e) => {
    if (textArea.current) {
      textArea.current.select();
      document.execCommand('copy');
      setActive(true);
      // this.setState({ copySuccess: 'Copied!' });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // if (!widget || !widget.show_instruction) {
  //   return null;
  // }
  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Code copied" onDismiss={toggleActive} />
  ) : null;

  return (
    <>
      <Modal open={showInstruction} title="Instruction" onClose={onClose} large>
        <div className={styles.Instruction}>
          <div className={styles.v1}>
            <div className={styles.Block}>
              <div className={styles.title}>
                Switch on the {process.env.APP_NAME}
              </div>
              <div className={styles.title2}>For Themes 2.0</div>
              <div className={styles.text}>
                To make the {process.env.APP_NAME} visible for your
                visitors, you need to turn it on in Shopify Theme Editor and
                save changes. It's simple and takes only 3 clicks.
              </div>
              <div className={styles.actions}>
                <Context.Consumer>
                  {(app) => (
                    <Button
                      primary
                      onClick={() => {
                        const redirect = Redirect.create(app);
                        redirect.dispatch(Redirect.Action.ADMIN_PATH, {
                          path: url,
                          newContext: true,
                        });
                        onClose();
                      }}
                    >
                      Activate Widget
                    </Button>
                  )}
                </Context.Consumer>
                {/* <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    window.open(
                      process.env.NEXT_PUBLIC_APP_INSTRUCTION_URL,
                      '_blank'
                    );
                  }}
                >
                  View Installation Guide
                </a> */}
              </div>
            </div>
            <div className={styles.BlockImage}>
              <img src="/assets/icons/instruction3.png" />
            </div>
          </div>
          <div className={styles.v2}>
            <div className={styles.Block}>
              <div className={styles.title}>
                Banner not visible? Looks like you are using theme 1.0. Follow
                the instruction below:
              </div>
              <div className={styles.title2}>For Themes 1.0</div>
              <div className={styles.text}>
                To make the {process.env.APP_NAME} visible on Shopify theme
                1.0, you need to copy the code below
              </div>
              <div className={styles.code}>
                <textarea
                  ref={textArea}
                  readOnly
                  value={`<script src="${process.env.APP_API_URL}/widget/script?shop=${widget.shopify_domain}"></script>`}
                />
                <Button onClick={copyToClipboard} primary>
                  <BiCopy />
                  Copy code
                </Button>
              </div>
              <div className={styles.text}>
                Click on the Add Code button below and paste it as it’s shown on
                the video. Click on the Save button to save the changes.
              </div>
              <div className={styles.actions}>
                <Context.Consumer>
                  {(app) => (
                    <Button
                      primary
                      onClick={() => {
                        const redirect = Redirect.create(app);
                        redirect.dispatch(Redirect.Action.ADMIN_PATH, {
                          path: url2,
                          newContext: true,
                        });
                        onClose();
                      }}
                    >
                      Add Code
                    </Button>
                  )}
                </Context.Consumer>
                {/* <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    window.open(
                      process.env.NEXT_PUBLIC_APP_INSTRUCTION_URL,
                      '_blank'
                    );
                  }}
                >
                  View Installation Guide
                </a> */}
              </div>
            </div>
            {/* <div className={styles.BlockImage}>
              <iframe
                id="ytplayer"
                type="text/html"
                width="427"
                height="285"
                src="https://www.youtube.com/embed/r6ADcTZLTuA"
                frameBorder="0"
              />
            </div> */}
          </div>
        </div>
      </Modal>
      {toastMarkup}
    </>
  );
}

export default Instruction;
