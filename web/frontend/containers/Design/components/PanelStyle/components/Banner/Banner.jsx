import React from 'react';
import { useSelector } from 'react-redux';
import { Field, getFormValues } from 'redux-form/dist/redux-form';
import { required } from 'redux-form-validators';
import PositionField from './components/Fields/PositionField';
import SizeInput from '../../../../../../components/Fields/SizeInput';
import ChangeTheme from './components/ChangeTheme/ChangeTheme';
import { Tooltip } from '@shopify/polaris';

function Banner({ changeRoot }) {
  const isMobile = useSelector((state) => state.widget.isMobile);
  const shop = useSelector((state) => state.shop.data);
  const formValues = useSelector((state) => getFormValues('design')(state));
  return (
    <div style={{ marginTop: 20, position: 'relative' }}>
      <Tooltip content="Margins are used to create space around elements, outside of any defined borders">
        <Field
          label="Margin top"
          name={
            isMobile
              ? 'setting.banner.mobile_margin_top'
              : 'setting.banner.margin_top'
          }
          component={SizeInput}
          symbol="px"
          validate={[required()]}
          onChangeHandle={(value) => {
            if (!isMobile) {
              changeRoot('setting.banner.mobile_margin_top', value);
            }
          }}
        />
      </Tooltip>
    </div>
  );
}

export default Banner;
