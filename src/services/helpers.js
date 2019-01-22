export const getAccessToken = user => {
  if (user && user.token && user.token.access_token) {
    return user.token.access_token;
  }

  throw new Error(`Unable to retrieve access token.`);
};
