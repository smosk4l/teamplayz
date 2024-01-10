import { emailRegex, messages } from '../../utils/constants';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(messages.fieldRequired),
  lastName: Yup.string().required(messages.fieldRequired),
  password: Yup.string()
    // .min(8, 'Hasło musi mieć conajmniej 8 znaków')
    .oneOf([Yup.ref('confirmPassword')], messages.passwordsDontMatch)
    .required(messages.fieldRequired),
  email: Yup.string()
    .email(messages.invalidEmail)
    .matches(emailRegex, messages.invalidEmail)
    .required(messages.fieldRequired),
  confirmPassword: Yup.string()
    // .min(8, 'Hasło musi mieć conajmniej 8 znaków')
    .required(messages.fieldRequired)
    .oneOf([Yup.ref('password')], messages.passwordsDontMatch),
  isTermsAccepted: Yup.boolean().oneOf([true], messages.acceptTerms),
});
