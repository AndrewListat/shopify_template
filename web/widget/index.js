/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import ReactDOM from 'react-dom';
import WidgetContainer from './WidgetContainer';

const url = '{{__URL__}}';
const shop = '{{__SHOP__}}';
const shopId = '{{__SHOP_ID__}}';
const elementId = 'netvisio-banner';

const isMobile = window.innerWidth <= 520;

(() => {
  function genParentElementWidget(settings) {
    if (settings.text.font) {
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      const fontUrl = settings.text.font.split(' ').join('+');
      let urlGoogle = 'https://fonts.googleapis.com/css?family=' + fontUrl;
      urlGoogle =
        urlGoogle +
        '|' +
        settings.button.font.split(' ').join('+') +
        '&display=swap';
      fontLink.href = urlGoogle;
      document.head.appendChild(fontLink);
    }

    const div = document.createElement('div');
    div.setAttribute('id', elementId);
    div.className = '';

    div.style.position = 'fixed';
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.zIndex = '2147483640';
    div.style.width = '100%';

    return div;
  }

  function fetchSettings() {
    return fetch(`${url}/api/widget/setting?shop=${shop}&shop_id=${shopId}`, {
      method: 'GET',
    }).then((resp) => {
      return resp.json();
    });
  }

  function onClose() {
    const el = document.getElementById(elementId);
    if (el) {
      el.remove();
    }
  }

  Promise.all([
    fetchSettings(),
    // fetch(`${url}/fonts/SF-Pro-Display-Regular.otf`)
    //   .then((resp) => resp.arrayBuffer())
    //   .then((font) => {
    //     const fontFace = new FontFace('SF Pro Display', font);
    //     document.fonts.add(fontFace);
    //   }),
  ])
    .then(([widget]) => {
      if (!widget || !widget.active) {
        return null;
      }

      const div = genParentElementWidget(widget.setting);
      document.body.appendChild(div);

      ReactDOM.render(
        <WidgetContainer
          widget={widget}
          isMobile={isMobile}
          onClose={onClose}
        />,
        div
      );
    })
    .catch((err) => {
      console.log('🚀 ~ file: index.js ~ line 184 ~ ]).then ~ err', err);
      // logger.error('add to cart error', err);
    });
})();
