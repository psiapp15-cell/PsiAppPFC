export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class NotImplementedError extends AppError {
  constructor(message = 'Recurso ainda não implementado.') {
    super(501, message);
    this.name = 'NotImplementedError';
  }
}
