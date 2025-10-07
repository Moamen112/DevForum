import { NextResponse } from "next/server";
import { RequestError, ValidationError } from "../http.errors";
import { ZodError } from "zod";
import logger from "../logger";
import { error } from "console";

export type ResponseType = "api" | "server";

const formateResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]>
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };

  return responseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

const handleError = (error: unknown, responseType: ResponseType = "server") => {
  if (error instanceof RequestError) {
    logger.error(
      { err: error },
      `${responseType.toUpperCase()} Error: ${error.message}`
    );
    return formateResponse(
      responseType,
      error.statusCode,
      error.message,
      error.error
    );
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );

    logger.error(
      { err: error },
      `Validation Error: ${validationError.message}`
    );
    return formateResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.error
    );
  }

  if (error instanceof Error) {
    logger.error(error.message);
    return formateResponse(responseType, 500, error.message);
  }
  logger.error({ err: error }, `Unexpected Error has occurred`);
  return formateResponse(responseType, 500, "An unexpected error occurred");
};

export default handleError;
