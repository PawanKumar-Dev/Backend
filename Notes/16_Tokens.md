# Tokens - Access Token vs Refresh Token

- Access Token: Grants temporary access to protected resources.
  - Usually short-lived to reduce risk

- Refresh Token: Allows us to obtain a new access token once current expires and without re-authenticating.
  - Compared to access token, long lived. To limit frequency of user logins.