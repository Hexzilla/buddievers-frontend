import * as Yup from 'yup';
import { isAddress } from './index';

declare module 'yup' {
  interface StringSchema {
    isAddress(errorMessage: string): StringSchema;
  }
}

export const initalizeValidation = () => {
  Yup.addMethod<Yup.StringSchema>(
    Yup.string,
    'isAddress',
    function (errorMessage) {
      return this.test(`is-address`, errorMessage, function (value) {
        const { path, createError } = this;

        return (
          (value ? isAddress(value) !== false : false) ||
          createError({ path, message: errorMessage })
        );
      });
    }
  );
};

initalizeValidation();
