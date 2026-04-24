import { AppError } from "../utils/app-error.js";
import { z } from "zod";

const errorMiddleware = (err, req, res, next) => {
  try {
    let statusCode = err.statusCode || 500;
    let status = err.status || "error";
    let message = err.message || "Internal Server Error";
    let details = err.details || null;
    let errors = null;

    // Detect ZodError by name or instance
    if (err instanceof z.ZodError || err.name === "ZodError") {
      statusCode = 400;
      status = "fail";
      message = "Validation failed";
      const zodIssues = err.issues || err.errors || [];
      errors = Array.isArray(zodIssues)
        ? zodIssues.reduce((acc, e) => {
            const path = Array.isArray(e.path)
              ? e.path.join(".")
              : String(e.path);
            acc[path] = e.message;
            return acc;
          }, {})
        : null;
    } else if (err instanceof AppError) {
      statusCode = err.statusCode;
      status = err.status;
    } else {
      // Unexpected errors
      console.error("UNEXPECTED ERROR 💥:", err);
      if (process.env.NODE_ENV !== "development") {
        message = "Something went very wrong!";
      }
    }

    res.status(statusCode).json({
      success: false,
      status,
      message,
      errors,
      details,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  } catch (handlerError) {
    console.error("CRITICAL ERROR IN ERROR HANDLER 😱:", handlerError);
    // Fallback to minimal response if handler itself fails
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Critical error in error handling",
      });
    }
  }
};

export default errorMiddleware;
