const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  onlyPublicPath: () => '/',
  onlyLoginPath: () => '/login',
  onlyErrorPath: () => '/*',
  editChannelsPath: (id) => [apiPath, 'channels', id].join('/'),
  onlySignupPath: () => '/signup',
  signupPath: () => [apiPath, 'signup'].join('/'),
};
