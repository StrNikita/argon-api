export class SuccessDto {
  success: boolean;

  constructor(success: boolean) {
    this.success = success;
  }
}

export const SUCCESS_TRUE = new SuccessDto(true);
export const SUCCESS_FALSE = new SuccessDto(false);
