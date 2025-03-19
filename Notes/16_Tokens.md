# Tokens - Access Token vs Refresh Token

- Access Token: Grants temporary access to protected resources.
  - Usually short-lived to reduce risk


- Refresh Token: Allows us to obtain a new access token once current expires and without re-authenticating.
  - Compared to access token, long lived. To limit frequency of user logins.


- How both Tokens works together:
  - Initial Login: User logs in and auth server issues both tokens.
  
  - Accessing Resources: Access token is used to authenticate requests for secured endpoints.
  
  - Token Renewal:
    - When the "Access Token" expires the "Refresh token" is sent to auth server.
    - Server returns a fresh "Access Token" — without needing to ask user's credentials again.