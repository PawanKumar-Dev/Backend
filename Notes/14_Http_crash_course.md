# Http Crash Course

- "HTTP" is a protocol that facilitates the exchange of information over the Internet.
  - Simply, HTTP is language that client browser(or any application) communicate with server(or where data is stored).


- HTTP operates on "Request-Response Model" where a client sends a request to the server, and server responds with data.


- Note: HTTP is a stateless protocol.
  - Meaning each request from a client to a server is independent.
  - There is no inherent memory of previous interactions in Http protocol.
  - Though additional tech (like cookies or sessions) can provide stateful behavior.


- HTTP headers are key-value pairs sent along with both HTTP requests and responses.
  - They carry metadata such as content type, caching instructions, authentication tokens, and much more.
  - They don’t carry the main content (which is in the body) but provide essential context for processing the request or response.