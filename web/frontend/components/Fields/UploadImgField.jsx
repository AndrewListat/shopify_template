/* eslint-disable consistent-return */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { InlineError, Spinner } from '@shopify/polaris';
import React, { useState } from 'react';
import styles from './UploadImgField.module.scss';
import Delete from '../../assets/icons/delete.svg';
import File from '../../assets/icons/file-plus.svg';

function UploadImgField({
  label,
  input,
  onChangeHandle = () => {},
  uploadImg = () => {},
}) {
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState(false);

  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setError(false);
      if (
        !['.svg', '.png', '.jpeg', '.jpg', '.webp'].some(
          (type) => img.name.indexOf(type) > -1
        )
      ) {
        setError(true);
        return true;
      }

      setLoaded(false);
      const data = await uploadImg(img);
      if (data && data.url) {
        input.onChange(data.url + '?=' + Date.now());
        onChangeHandle(data.url + '?=' + Date.now());
      }
      setLoaded(true);
    }
  };

  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onImageChange({ target: { files: e.dataTransfer.files } });
      e.dataTransfer.clearData();
    }
  };

  return (
    <div className={styles.UploadImgField}>
      {!loaded && (
        <div className={styles.spinner}>
          <Spinner size="large" />
        </div>
      )}

      {!input.value && (
        <label
          className={styles.block_upload}
          onDrop={dropHandler}
          onDragOver={dropHandler}
        >
          <div className={styles.title}>{label}</div>
          <div className={styles.text}>or drop file to upload</div>
          <input type="file" onChange={onImageChange} />
        </label>
      )}
      {input.value && (
        <div className={styles.image}>
          <img src={input.value} />
          <div className={styles.actions}>
            <div
              className={styles.action}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                input.onChange('');
                onChangeHandle('');
              }}
            >
              <Delete /> Delete
            </div>
            <label className={styles.action}>
              <input type="file" onChange={onImageChange} />
              <File /> Select File
            </label>
          </div>
        </div>
      )}
      {error && (
        <div className={styles.error}>
          <InlineError message="Only svg, png or jpeg files can be uploaded." />
        </div>
      )}
    </div>
  );
}

export default UploadImgField;
