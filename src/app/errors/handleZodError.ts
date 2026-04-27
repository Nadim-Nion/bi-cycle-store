import { ZodError } from 'zod';
import type { TErrorSources, TGenericErrorResponse } from '../interface/error';
//import { ZodError, ZodIssue } from 'zod';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue) => {
    // issue: ZodIssue
    return {
      path: issue?.path[issue.path.length - 1]?.toString() || 'unknown',
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
