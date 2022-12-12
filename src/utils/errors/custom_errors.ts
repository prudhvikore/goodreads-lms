import status_codes from "./status_codes";

class Custom_error extends Error {
  status_code = 500;

  constructor(message: string, status: number) {
    super(message);

    this.status_code = status;

    this.message = message;
    
  }
}

export default Custom_error;
