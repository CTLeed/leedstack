import { Auth0Client } from '@auth0/auth0-spa-js';
import { writable } from 'svelte/store';

const domain = import.meta.env.PUBLIC_AUTH0_DOMAIN || '';
const clientId = import.meta.env.PUBLIC_AUTH0_CLIENT_ID || '';
const audience = import.meta.env.PUBLIC_AUTH0_AUDIENCE || '';

let auth0Client: Auth0Client;

export const isAuthenticated = writable(false);
export const user = writable(null);
export const token = writable('');

async function createClient() {
  auth0Client = new Auth0Client({
    domain,
    clientId,
    authorizationParams: {
      audience,
      redirect_uri: window.location.origin + '/callback'
    },
    cacheLocation: 'localstorage'
  });

  return auth0Client;
}

export async function initAuth() {
  if (!auth0Client) {
    await createClient();
  }

  try {
    const isAuth = await auth0Client.isAuthenticated();
    isAuthenticated.set(isAuth);

    if (isAuth) {
      const userInfo = await auth0Client.getUser();
      user.set(userInfo);

      const accessToken = await auth0Client.getTokenSilently();
      token.set(accessToken);
    }
  } catch (err) {
    console.error('Auth init error:', err);
  }
}

export async function login() {
  if (!auth0Client) {
    await createClient();
  }
  await auth0Client.loginWithRedirect();
}

export async function handleCallback() {
  if (!auth0Client) {
    await createClient();
  }

  try {
    await auth0Client.handleRedirectCallback();
    const userInfo = await auth0Client.getUser();
    const accessToken = await auth0Client.getTokenSilently();

    isAuthenticated.set(true);
    user.set(userInfo);
    token.set(accessToken);

    return true;
  } catch (err) {
    console.error('Callback error:', err);
    return false;
  }
}

export async function logout() {
  if (!auth0Client) {
    await createClient();
  }

  await auth0Client.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  });

  isAuthenticated.set(false);
  user.set(null);
  token.set('');
}

export async function getToken() {
  if (!auth0Client) {
    await createClient();
  }

  try {
    return await auth0Client.getTokenSilently();
  } catch (err) {
    console.error('Get token error:', err);
    return '';
  }
}
