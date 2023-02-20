/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from 'react';
import { StyleSheetManager } from 'styled-components';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import getStyleButton from '../../../../../../lib/getStyleButton';

function ContentPreview({ settings, isMobile }) {
  const ref = useRef();
  return (
    <Frame
      title="widget"
      width="100%"
      height="100%"
      id="widget"
      frameBorder="0"
      border="0"
      cellSpacing="0"
      scrolling="no"
      head={[
        <style key="default_css">
          {`
          body,.frame-root,.frame-content{
            margin: 0;
            width: 100%;
            height: 100%;
          }
          html {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
          }
          *, *:before, *:after {
            box-sizing: inherit;
          }
          @font-face {
            font-family: 'SF Pro Display';
            src: url("/fonts/SF-Pro-Display-Regular.otf") format("opentype");
          }
          @-moz-document url-prefix() {
            select {
              text-indent: -2px
            }
          }
        `}
        </style>,
        <link
          key="fon1"
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />,
        <link
          key="fon2"
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin
        />,
        <link
          key="fon3"
          href="https://fonts.googleapis.com/css?family=Acme|Bitter|Josefin+Slab|Lato|Montserrat|Noto+Sans|Open+Sans|Pacifico|Raleway|Roboto|Ubuntu&display=swap"
          rel="stylesheet"
        />,
        <link
          key="fon4"
          href="https://fonts.googleapis.com/css?family=Archivo|Asap|Barlow|Cabin|Catamaran|Didact+Gothic|Fjalla+One|Fredoka+One|Hammersmith+One|Josefin+Sans|Kalam|Lexend+Zetta|Lora|Manjari|Mansalva|Neuton|Notable|Oswald|Overpass|Ultra|Vidaloka|Vollkorn&display=swap"
          rel="stylesheet"
        />,
      ]}
    >
      <FrameContextConsumer>
        {(frameContext) => (
          <StyleSheetManager target={frameContext.document.head}>
            <div ref={ref} style={{}}>
              {/* <Banner settings={settings} isMobile={isMobile} /> */}
            </div>
          </StyleSheetManager>
        )}
      </FrameContextConsumer>
    </Frame>
  );
}

export default ContentPreview;
