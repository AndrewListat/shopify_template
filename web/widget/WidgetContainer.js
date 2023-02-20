import React from 'react';

function WidgetContainer({ widget, isMobile, onClose }) {
  return (
    <Banner settings={widget.setting} isMobile={isMobile} onClose={onClose} />
  );
}

export default WidgetContainer;
