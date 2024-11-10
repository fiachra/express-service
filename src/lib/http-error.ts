export default class HttpError extends Error {
  status: number;
  metadata: any;

  constructor(message: string, status: number, metadata = {}) {
    super(message);
    this.name = 'HttpError';
    this.status = status || 500;
    this.metadata = { ...metadata };
  }
}
