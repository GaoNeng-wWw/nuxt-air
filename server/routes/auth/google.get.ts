export default defineOAuthGoogleEventHandler({
  config: {
    clientId: '807761297417-1ibu6p28fc61kiqhu4raefkjgn84dtet.apps.googleusercontent.com',
    clientSecret: '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',
    redirectURL: 'http://localhost:3000/auth/google',
    authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
    tokenURL: 'https://oauth2.googleapis.com/token'
  },
  onSuccess: (event, result) => {
    console.log(result)
    return sendRedirect(event, '/')
  },
  onError: (event, err) => {
    console.log(err);
  }
})