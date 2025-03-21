// Class designed to structure the responses API sends back to clients in standardized-consistent format.
// "statusCode" : represents HTTP status code of response
// "data": contains the payload of response
// "message": provides a human-readable message about API call.
class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export default ApiResponse