/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Label } from '@shopify/polaris';
import { findIndex } from 'lodash';
import CustomDrop from './CustomDropDown';
import styles from './FontInput.module.scss';

const fonts = [
  {
    caption: 'Lato',
    'font-family': 'Lato',
    class: 'Font-Lato',
  },
  {
    caption: 'Arial',
    'font-family': 'Arial',
    class: 'Font-Arial',
  },
  {
    caption: 'Roboto',
    'font-family': 'Roboto',
    class: 'Font-Roboto',
  },
  {
    caption: 'Raleway',
    'font-family': 'Raleway',
    class: 'Font-Raleway',
  },
  {
    caption: 'Josefin Slab',
    'font-family': 'Josefin Slab',
    class: 'Font-Josefin_Slab',
  },
  {
    caption: 'Open Sans',
    'font-family': 'Open Sans',
    class: 'Font-Open_Sans',
  },
  {
    caption: 'Montserrat',
    'font-family': 'Montserrat',
    class: 'Font-Montserrat',
  },
  {
    caption: 'Ubuntu',
    'font-family': 'Ubuntu',
    class: 'Font-Ubuntu',
  },
  {
    caption: 'Bitter',
    'font-family': 'Bitter',
    class: 'Font-Bitter',
  },
  {
    caption: 'Pacifico',
    'font-family': 'Pacifico',
    class: 'Font-Pacifico',
  },
  {
    caption: 'Noto Sans',
    'font-family': 'Noto Sans',
    class: 'Font-Noto_Sans',
  },
  {
    caption: 'Acme',
    'font-family': 'Acme',
    class: 'Font-Acme',
  },
  {
    caption: 'Archivo',
    'font-family': 'Archivo',
    class: 'Font-Archivo',
  },
  {
    caption: 'Asap',
    'font-family': 'Asap',
    class: 'Font-Asap',
  },
  {
    caption: 'Barlow',
    'font-family': 'Barlow',
    class: 'Font-Barlow',
  },
  {
    caption: 'Cabin',
    'font-family': 'Cabin',
    class: 'Font-Cabin',
  },
  {
    caption: 'Catamaran',
    'font-family': 'Catamaran',
    class: 'Font-Catamaran',
  },
  {
    caption: 'Didact',
    'font-family': 'Didact Gothic',
    class: 'Font-Didact',
  },
  {
    caption: 'Fjalla',
    'font-family': 'Fjalla One',
    class: 'Font-Fjalla',
  },
  {
    caption: 'Fredoka',
    'font-family': 'Fredoka One',
    class: 'Font-Fredoka',
  },
  {
    caption: 'Hammersmith',
    'font-family': 'Hammersmith One',
    class: 'Font-Hammersmith',
  },
  {
    caption: 'Josefin Sans',
    'font-family': 'Josefin Sans',
    class: 'Font-Josefin',
  },
  {
    caption: 'Kalam',
    'font-family': 'Kalam',
    class: 'Font-Kalam',
  },
  {
    caption: 'Lora',
    'font-family': 'Lora',
    class: 'Font-Lora',
  },
  {
    caption: 'Manjari',
    'font-family': 'Manjari',
    class: 'Font-Manjari',
  },
  {
    caption: 'Mansalva',
    'font-family': 'Mansalva',
    class: 'Font-Mansalva',
  },
  {
    caption: 'Notable',
    'font-family': 'Notable',
    class: 'Font-Notable',
  },
  {
    caption: 'Oswald',
    'font-family': 'Oswald',
    class: 'Font-Oswald',
  },
  {
    caption: 'Overpass',
    'font-family': 'Overpass',
    class: 'Font-Overpass',
  },
  {
    caption: 'Neuton',
    'font-family': 'Neuton',
    class: 'Font-Neuton',
  },
  {
    caption: 'Ultra',
    'font-family': 'Ultra',
    class: 'Font-Ultra',
  },
  {
    caption: 'Vidaloka',
    'font-family': 'Vidaloka',
    class: 'Font-Vidaloka',
  },
  {
    caption: 'Vollkorn',
    'font-family': 'Vollkorn',
    class: 'Font-Vollkorn',
  },
  {
    caption: 'Lexend',
    'font-family': 'Lexend Zetta',
    class: 'Font-Lexend',
  },
];

const FontInput = (props) => {
  const index = findIndex(fonts, ['font-family', props.input.value]);
  const classNameInputValue = index > -1 ? fonts[index].class : '';
  return (
    <div className={styles.FontInput}>
      <Label>{props.label}</Label>
      <CustomDrop
        {...props}
        classNameInputValue={classNameInputValue}
        options={fonts.map((item) => ({
          title: item.caption,
          value: item['font-family'],
          className: item.class,
        }))}
      />
    </div>
  );
};

export default FontInput;
