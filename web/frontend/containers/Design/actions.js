/* eslint-disable consistent-return */
import fetch from "../../lib/fetch";

export function setKey(key, data) {
  return (dispatch) => {
    dispatch({ type: 'SET_KEY_WIDGET', key, data });
  };
}

export async function uploadImg(file) {
  try {
    const formData = new FormData();
    formData.append('image', file);
    const data = await fetch('/api/widget/upload', {
      method: 'post',
      body: formData
    });
    console.log("🚀 ~ file: actions.js ~ line 17 ~ uploadImg ~ data", data)
    return data;
  } catch (error) {
    console.log("🚀 ~ file: actions.js ~ line 19 ~ uploadImg ~ error", error)
  }
}

export function updateWidget(body) {
  return async (dispatch) => {
    dispatch({ type: 'SET_KEY_WIDGET', key: 'loaded', data: false });
    const data = await fetch('/api/widget/' + body.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(body)
    })
    dispatch({ type: 'GET_WIDGET', data });
    dispatch({ type: 'SET_KEY_WIDGET', key: 'loaded', data: true });
  };
}
