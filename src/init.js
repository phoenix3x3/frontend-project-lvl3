// @ts-check

import View from './View';

export default () => {
  const element = document.getElementById('point');
  const obj = new View(element);
  obj.init();
};
