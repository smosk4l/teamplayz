import { emailRegex, messages } from '../../utils/constants';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(messages.fieldRequired),
  lastName: Yup.string().required(messages.fieldRequired),
  password: Yup.string().required(messages.fieldRequired),
  email: Yup.string()
    .email(messages.invalidEmail)
    .matches(emailRegex, messages.invalidEmail)
    .required(messages.fieldRequired),
  confirmPassword: Yup.string()
    .required(messages.fieldRequired)
    .oneOf([Yup.ref('password')], messages.passwordsDontMatch),
  isTermsAccepted: Yup.boolean().oneOf([true], messages.acceptTerms),
});
