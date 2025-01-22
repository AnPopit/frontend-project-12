const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  onlyPublickPath: () => '/',
  onlyLoginPath: () => '/login',
  editChannelsPath: (id) => [apiPath, 'channels', id].join('/'),
  onlySignupPath: () => '/signup',
  signupPath: () => [apiPath, 'signup'].join('/'),
};
