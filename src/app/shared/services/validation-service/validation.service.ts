import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  /**
   *
   * @param validatorName Return key of the validation methods
   * @param validatorValue
   * @param labelName Custom error message passed to the control-message component
   * @returns Error message.
   */
  public static getValidationErrorMessage(
    validatorName: string,
    validatorValue?: any,
    labelName?: string,
  ) {
    const data = {
      required:
        labelName === '' ? 'This field is required' : (labelName as string),
      invalidPassword: `Invalid password`,
      invalidPasswordLength: 'Password must be at least 8 characters long',
      invalidPasswordContent: 'Must contain a special character and a digit',
      invalidEmailAddress: `Invalid email address`,
      invalidPhoneNumber: `Invalid phone number.`,
      invalidPhoneLength: `Phone number must contain 10 digits.`,
    };
    return data[validatorName as keyof typeof data];
  }

  /**
   * @description This method validates phone number length and also whether it is entered.
   * @param control Abstract control from the form
   * @returns validatorName
   */
  static phoneNumberValidator(control: AbstractControl) {
    const number: string = control.value;
    if (number === null || number === '') {
      return { required: true };
    }
    if (number) {
      if (number.length < 10) {
        return { invalidPhoneLength: true };
      }
    }
    return false;
  }

  /**
   * @description This method validates if the password contains atleast 8 chars, 1 digit and 1 special char
   * @param control Abstract control from the form
   * @returns validatorName
   */
  static passwordValidator(control: AbstractControl) {
    const password = control.value;

    if (password === null || password === '') {
      return { required: true };
    }

    if (password.length < 8) {
      return { invalidPasswordLength: true };
    }

    if (!control.value.match(/^(?=.*[^\w\s])(?=.*\d).+/)) {
      return { invalidPasswordContent: true };
    }

    return false;
  }

  /**
   * @description This method validates if the email is entered and whether it is valid or not.
   * @param control Abstract control from the form
   * @returns validatorName
   */
  static emailValidator(control: AbstractControl) {
    const email = control.value;
    if (email === null || email === '') {
      return { required: true };
    }
    if (email.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,15})?$/)) {
      return false;
    }
    return { invalidEmailAddress: true };
  }
}
