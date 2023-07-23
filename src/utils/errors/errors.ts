// customError.ts
class CustomError extends Error {
  constructor(name: string, message: string, public statusCode: number) {
    super(message);
    this.name = name;
  }
}

export default CustomError;
