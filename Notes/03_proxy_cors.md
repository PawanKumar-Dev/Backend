# CORS & CORS Proxy

- CORS stands for "Cross-Origin Resource Sharing". It's security mechanism.
- Controls how resources hosted on one domain can be requested by a web page from another domain.
    - For e.g., if our application hosted on https://example.com tries to fetch data from https://api.anotherdomain.com.
    - Then proper cross-origin request is needed.

- CORS proxy acts as intermediary. How it works:
    - 1st: client side(frontend) sends a request to CORS proxy not to server directly.
    - 2nd: Then proxy makes request to server.
    - 3rd: After this proxy reciving "response" from server.
    - 4th: CORS proxy modifies and attach necessary header to "response".
    - 4th: Modified response goes back to browser. Now accepted becoz proper CORS rules followed.

- This way CORS proxy essentially tricks browser by making it think that resource came from server that supports CORS.