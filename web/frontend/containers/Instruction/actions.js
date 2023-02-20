/* eslint-disable consistent-return */
import fetch from '../../lib/fetch';

export async function getThemes() {
  try {
    const data = await fetch('/api/shop/themes');
    return data;
  } catch (error) {
    return [];
  }
}
