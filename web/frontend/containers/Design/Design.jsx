import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWidget } from './actions';
import PanelStyle from './components/PanelStyle/PanelStyle';
import Preview from './components/Preview/Preview';
import styles from './style.module.scss';

function Design() {
  const initialValues = useSelector((state) => state.widget.data);
  const shop = useSelector((state) => state.shop.data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (shop.pricing_plan && initialValues?.id) {
      // dispatch(updateWidget({ first_show: false, id: initialValues.id }));
    }
  }, [shop.pricing_plan]);

  return (
    <div className={styles.Design}>
      {/* <div className="row"> */}
      <div className={styles.col1}>
        <PanelStyle initialValues={initialValues} />
      </div>
      <div className={styles.col2}>
        <Preview />
      </div>
      {/* </div> */}
    </div>
  );
}

export default Design;
