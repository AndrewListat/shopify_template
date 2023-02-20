// eslint-disable-next-line import/no-anonymous-default-export
export default (setting, isMobile) => {
  const style = {
    position: 'fixed',
    zIndex: 2147483640,
    'box-sizing': 'border-box',
    display: 'grid',
  };

  const position = isMobile ? setting.mobile_position : setting.position;

  switch (position) {
    case 'left':
      style.left = 0;
      style.top = '50%';
      style.transform = 'translateY(-50%)';
      break;
    case 'bottom_left':
      style.left = '10%';
      style.bottom = 0;
      break;
    case 'bottom_right':
      style.right = '10%';
      style.bottom = 0;
      break;
    case 'right':
      style.right = 0;
      style.top = '50%';
      style.transform = 'translateY(-50%)';
      break;
    default:
      break;
  }

  return style;
};
