# Http Crash Course

- "HTTP" is a protocol that facilitates the exchange of information over the Internet.
  - Simply, HTTP is language that client browser(or any application) communicate with server(or where data is stored).


- HTTP operates on "Request-Response Model" where a client sends a request to the server, and server responds with right data.


- Note: HTTP is a stateless protocol.
  - Meaning each request from a client to a server is independent.
  - There is no inherent memory of previous interactions in Http protocol.
  - Though additional tech (like cookies or sessions) can provide stateful behavior.


- HTTP headers are key-value pairs sent with both HTTP requests and responses.
  - They have metadata such as : content type, caching instructions, authentication tokens, etc.
  - They don’t carry the main content (which is in the body)
  - But provide context for processing the request or response.
  - For e.g., server might look at "Accept header" in request to determine the format (JSON, XML, etc.) in which to return data.


- HTTP methods are set of request types defined by the HTTP protocol.

- GET: Retrieve data from server without any side effects. Used to fetch and view content.
  - Parameters are appended to the URL as query strings.
  - Responses can be cached.
    
    ```
    GET /search?query=javascript HTTP/1.1
    Host: www.example.com
    ```
 
- POST: Send data to server to create new resource or update existing one.
  - Used for submitting forms, uploading files etc.
  - Data is carried in body of request rather than URL.
  - Usally not cached by default.
    
    ```
    POST /submit-form HTTP/1.1
    Host: www.example.com
    Content-Type: application/json
    Content-Length: 45

    { "username": "user123", "password": "securePass" }
    ```

- PUT: Replace an existing resource entirely with a new data.
  - Like POST, new complete data is sent within the body.


- PATCH: Make partial changes or updates to an existing resource.
  - Only fields that need to be updated are sent in request body.
  - More efficient if few fields need to be changed.


- DELETE: Removes specific data from server.
  - Typically sent through URL.
  
    ```
    DELETE /user/123 HTTP/1.1
    Host: www.example.com
    ```


- HEAD: Only returns HTTP Headers(metadata) from a request.
  - Returns no body data.
  - Useful when need to check info about a resource (like size or type) without waiting for whole content to be downloaded.
    
    ```
    HEAD /index.html HTTP/1.1
    Host: www.example.com
    ```