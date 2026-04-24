class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);

    this.name = this.constructor.name; // "NotFoundError", "BadRequestError", etc.
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // Distinguish operational errors from programmer bugs
    this.details = details; // Extra context (e.g. validation field errors)

    Error.captureStackTrace(this, this.constructor);
  }
}

// 400 — Malformed request or invalid input
class BadRequestError extends AppError {
  constructor(message = "Bad Request", details = null) {
    super(message, 400, details);
  }
}

// 401 — Missing or invalid authentication
class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized", details = null) {
    super(message, 401, details);
  }
}

// 403 — Authenticated but not allowed
class ForbiddenError extends AppError {
  constructor(message = "Forbidden", details = null) {
    super(message, 403, details);
  }
}

// 404 — Resource not found
class NotFoundError extends AppError {
  constructor(message = "Not Found", details = null) {
    super(message, 404, details);
  }
}

// 405 — HTTP method not supported
class MethodNotAllowedError extends AppError {
  constructor(message = "Method Not Allowed", details = null) {
    super(message, 405, details);
  }
}

// 409 — Conflict (e.g. duplicate email/username, duplicate order)
class ConflictError extends AppError {
  constructor(message = "Conflict", details = null) {
    super(message, 409, details);
  }
}

// 422 — Request understood but semantically invalid (e.g. business rule violations)
class UnprocessableEntityError extends AppError {
  constructor(message = "Unprocessable Entity", details = null) {
    super(message, 422, details);
  }
}

// 429 — Too many requests (rate limiting)
class TooManyRequestsError extends AppError {
  constructor(message = "Too Many Requests", details = null) {
    super(message, 429, details);
  }
}

// 500 — Unexpected server error
class InternalServerError extends AppError {
  constructor(message = "Internal Server Error", details = null) {
    super(message, 500, details);
  }
}

// 503 — Service temporarily unavailable (e.g. DB down, external API down)
class ServiceUnavailableError extends AppError {
  constructor(message = "Service Unavailable", details = null) {
    super(message, 503, details);
  }
}

export {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  MethodNotAllowedError,
  ConflictError,
  UnprocessableEntityError,
  TooManyRequestsError,
  InternalServerError,
  ServiceUnavailableError,
};

export default AppError;
