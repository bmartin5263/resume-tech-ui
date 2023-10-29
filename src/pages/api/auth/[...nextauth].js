import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import nummiClient from '../../../util/nummiClient';

async function refreshAccessToken(token) {
  console.log("[refreshAccessToken] Refreshing Token");
  try {
      // Get a new set of tokens with a refreshToken
      const tokenResponse = await nummiClient.post('refresh-token', {
        userId: token.userId,
        refreshToken: token.refreshToken
      });

      console.log("[refreshAccessToken] Successfully refreshed token");
      return {
          ...token,
          accessToken: tokenResponse.data.token,
          expiresAt: tokenResponse.data.expiresAt,
          refreshToken: tokenResponse.data.refreshToken
      }
  } catch (error) {
    console.log("[refreshAccessToken] Failed to refresh token " + token.userId + ", " + token.refreshToken);
    // console.log(error);
    return {
        ...token,
        error: "RefreshAccessTokenError",
    }
  }
}

export const nextAuthOptions = (req, res) => {
  return {
    secret: "xugI4O7FHPoME8yEMheMBjlD+hwGKscbqC52f7LIAIJ5zcrs32yK/Edjt4IAyU6jUVjRyiCTch+lHQWBZUYMjKM9+jmmZGkq8y11KgnBCBKYL4u0qw1qJhTcY9/2FBzwfQ/RvpCCaTydJHPFfH1zg3MKU57d9Of2apdIY4QZ3b9R3V9+9Ox0Hx9Uak3aj/1+hX3TcOGUgKfDdUXMs52JFYIqGvhMPv3kL98Lrw==",
    providers: [
      CredentialsProvider({
        async authorize(credentials) {
          try {
            console.log("[authorize] Logging In");
            const response = await nummiClient.post('/login', {}, {
              auth: {
                username: credentials.username,
                password: credentials.password,
              }
            });
            res.setHeader('Set-Cookie', response.headers['set-cookie']);
            res.setHeader('Access-Control-Allow-Origin', response.headers['access-control-allow-origin']);
            res.setHeader('Access-Control-Allow-Methods', response.headers['access-control-allow-methods']);
            res.setHeader('Access-Control-Allow-Headers', response.headers['access-control-allow-headers']);
            res.setHeader('Access-Control-Allow-Credentials', response.headers['access-control-allow-credentials']);
            return response.data
          } catch (error) {
            console.log("[authorize] Failed to Login");
            console.log(error?.response?.data?.userMessage);
            return Promise.reject(new Error(error?.response?.data?.userMessage ?? "Unable to Login at this time. Please try again in a few minutes"));
          } 
        }
      })
    ],
    session: {
      // Choose how you want to save the user session.
      // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
      // If you use an `adapter` however, we default it to `"database"` instead.
      // You can still force a JWT session by explicitly defining `"jwt"`.
      // When using `"database"`, the session cookie will only contain a `sessionToken` value,
      // which is used to look up the session in the database.
      strategy: "jwt",
    
      // Seconds - How long until an idle session expires and require a new login
      maxAge: 60 * 60 * 12, // 12 hours
    },
    callbacks: {
      // User -> API Response
      // Token
      //    1st call -> {name: 'Bob', email: undefined, picture: undefined, sub: undefined}
      //    2nd call -> {iat: 1687734882, exp: 1690326882, jti: '8dd729cd-56f7-459f-8584-82091fb3999c'}
      // Account -> Not relevant, used for other providers
      // Trigger -> The event that got us here
      async jwt({user, token, account, trigger, isNewUser}) {
        if (user?.token) {
          console.log("[jwt] Obtained JWT")
          token.accessToken = user.token;
          token.expiresAt = user.expiresAt;
          token.userId = user.userId;
          token.refreshToken = user.refreshToken;
          return Promise.resolve(token);
        }
      
        console.log("[jwt] jwt(refreshToken=" + token.refreshToken + ")")
        // on subsequent calls, token is provided and we need to check if it's expired
        const now = Date.now() / 1000;
        console.log("[jwt] " + now + " < " + token.expiresAt + " ?");
        if (now < token.expiresAt) {
          console.log("[jwt] yes, no refresh needed");
          return Promise.resolve(token);
        }

        token = await refreshAccessToken(token);
        if (token?.error) {
          return Promise.reject();
        }

        console.log("[jwt] Refreshed!! " + token.refreshToken)
        return Promise.resolve(token);

        // if (token?.accessTokenExpires && Date.now() / 1000 < token.accessTokenExpires) {
        //   console.log("Not Expired");
        //   return { ...token, ...user };
        // } 
        // else if (token?.refreshToken) {
        //   console.log("Refreshing");
        //   return refreshAccessToken(token);
        // }
      
        // console.log("Regular Return");
        // return { ...token, ...user };
      },
      async session ({ session, token }) {
        // Here we pass accessToken to the client to be used in authentication with your API
        console.log("[session] Session Request")
        session.accessToken = token.accessToken;
        session.expiresAt = token.expiresAt;
        session.userId = token.userId;
        session.refreshToken = token.refreshToken;
        session.error = token.error;
        return Promise.resolve(session);
      },
    },
    pages: {
      signIn: '/login',
      signOut: '/register',
      error: '/login', // Error code passed in query string as ?error=
      verifyRequest: '/auth/verify-request', // (used for check email message)
      newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
  }
}

export default (req, res) => {
    return NextAuth(req, res, nextAuthOptions(req, res))
}