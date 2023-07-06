# Guardrail : Restful API Development

## Context

In order to promote consistency, maintainability, and scalability across our software engineering projects, it is important to establish guardrails for Restful API development. These guardrails will serve as a set of guidelines and best practices to be followed by software engineers throughout the development lifecycle. By adhering to these guardrails, we can ensure that our Restful APIs are designed and implemented in a standardized manner, enabling easier collaboration and integration across different teams and projects.

## Decision

We have decided to establish the following guardrails for Restful API development. These guardrails consist of three categories: **Must**, **Should**, and **Could**. While **Must** denotes non-negotiable requirements that must be followed, **Should** and **Could** provide recommendations and suggestions to improve the overall quality and maintainability of our Restful APIs.

### Must

1. **Uniform Resource Identifier (URI) Design**: RESTful APIs must have well-designed URIs that are intuitive, descriptive, and follow a consistent naming convention. URIs should represent resources and their relationships, avoiding verbs and instead utilizing nouns and noun phrases.
2. **HTTP Methods**: RESTful APIs must use the appropriate HTTP methods (GET, POST, PUT, DELETE) for the corresponding actions (retrieve, create, update, delete). The usage of methods should align with the intended semantics of the RESTful API operations.
3. **Status Codes**: RESTful APIs must return appropriate HTTP status codes to indicate the outcome of each request. Common status codes should be used consistently. The intention of each status code is as follows:

   - 200 (OK): The request was successful, and the response body contains the requested resource or the result of the operation.
   - 201 (Created): The request to create a new resource was successful, and the response body contains the newly created resource.
   - 204 (No Content): The request was successful, but the response body is intentionally empty. Typically used for successful DELETE operations.
   - 400 (Bad Request): The request could not be understood or contained invalid parameters. The client should modify the request before retrying.
   - 401 (Unauthorized): The request requires authentication, and the client's credentials are either missing or invalid.
   - 403 (Forbidden): The server understood the request, but the client is not authorized to perform the requested action.
   - 404 (Not Found): The requested resource could not be found on the server.
   - 405 (Method Not Allowed): The requested HTTP method is not supported for the given resource.
   - 409 (Conflict): The request could not be completed due to a conflict with the current state of the target resource.
   - 500 (Internal Server Error): An unexpected error occurred on the server. The client should not retry the request without modifications.

### Should

1. **Versioning**: RESTful APIs should support versioning to ensure backward compatibility and enable future enhancements. Versioning can be achieved through URL versioning (e.g., `api/v1/endpoint`) or header-based versioning (e.g., `Accept-Version` header).
2. **Response Consistency**: RESTful APIs should follow consistent response structures and formats. This includes standardizing error payloads, success responses, and pagination formats, if applicable.
3. **Input Validation**: RESTful APIs should validate incoming request payloads for data integrity and format correctness. Input validation should be performed at both the endpoint level and the individual data field level, considering data types, constraints, and business rules.

### Could

1. **Resource Filtering**: RESTful APIs could provide flexible resource filtering options to allow clients to request only the necessary data. This can be achieved through query parameters, allowing fields, sorting, and filtering based on different criteria.
2. **Caching**: RESTful APIs could support caching mechanisms such as ETags and caching headers (e.g., `Cache-Control`, `Expires`) to reduce server load and improve performance for frequently accessed resources.
3. **Hypermedia as the Engine of Application State (HATEOAS)**: RESTful APIs could incorporate HATEOAS principles by including hyperlinks within API responses. This allows clients to navigate the API and discover related resources dynamically.

## Consequences

By not following this guardrail for Restful API development we may see several consequences:

1. **Consistency**: our Restful APIs will exhibit inconsistent design patterns and naming conventions, making it harder for software engineers to understand and collaborate on different projects.
2. **Maintainability**: our Restful APIs may lack clarity, modularity, and reusability.
3. **Scalability**: We may miss engineering efficiencies such as efficient resource management, effective versioning, and supporting caching mechanisms which would reduce server load and improve performance for frequently accessed resources.
4. **Interoperability**: It will be harder to integrate our Restful APIs with third-party systems and services, as they may not adhere to widely accepted standards and practices.
5. **Developer Productivity**: This the guardrail aims to reduce ambiguity and help developers make informed decisions. Not following this may ultimately affect productivity.
6. **Quality Assurance**: The guardrail will aid in quality assurance efforts by promoting consistent error handling, input validation, and response structures, ensuring that our Restful APIs are robust and reliable. By not using this guardrail we potentially impact our ability to cohesively assert quality of the APIs we deliver. T

By implementing and adhering to these guardrails, we will establish a solid foundation for Restful API development and foster a culture of excellence and collaboration among software engineers.
