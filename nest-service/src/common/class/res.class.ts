export class ResponseDto<T> {
  readonly data: T;
  readonly code: number;
  readonly message: string;

  constructor(code: number, data?: any, message = 'success') {
    this.data = data;
    this.code = code;
    this.message = message;
  }

  static success(data?: any) {
    return new ResponseDto(200, data);
  }
}