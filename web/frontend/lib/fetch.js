/* eslint-disable no-undef */
/* eslint-disable no-console */
import { authenticatedFetch, getSessionToken } from '@shopify/app-bridge-utils';

let appBridge;

export const setApp = (app) => {
  appBridge = app;
};

/* eslint-disable import/no-anonymous-default-export, no-console */
export default async (url, options = {}) =>{
  const fetchFunction = authenticatedFetch(appBridge);
  const response = await fetchFunction(url, options);
  checkHeadersForReauthorization(response.headers, appBridge);
  return response.json();
}

function checkHeadersForReauthorization(headers, app) {
  if (headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1") {
    const authUrlHeader =
      headers.get("X-Shopify-API-Request-Failure-Reauthorize-Url") ||
      `/api/auth`;

    const redirect = Redirect.create(app);
    redirect.dispatch(
      Redirect.Action.REMOTE,
      authUrlHeader.startsWith("/")
        ? `https://${window.location.host}${authUrlHeader}`
        : authUrlHeader
    );
  }
}
  