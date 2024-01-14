/**
 * Default CustomError will by pass being retried because it's non-transient.
 *
 * Possible cases where CustomError might want to retry is if a transaction in
 * the Saga failed. Since transactions in the Saga are local transactions in other
 * microservices it is crucial that they are retried.
 */
export class CustomError extends Error {
  public byPassRetry: boolean;
  public statusCode: number;
  constructor(
    message: string,
    name?: string,
    byPassRetry?: boolean,
    statusCode: number = 500,
  ) {
    super(message);
    this.name = name ?? 'Error';
    this.byPassRetry = typeof byPassRetry === 'boolean' ? byPassRetry : true;
    this.statusCode = statusCode;
  }
}
