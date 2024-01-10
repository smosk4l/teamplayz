import { ChangeEvent, FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Field, FieldProps, useFormikContext } from 'formik';

interface FormikDatePickerProps
  extends Omit<TextFieldProps, 'name' | 'type' | 'onChange'> {
  name: string;
}

const FormikDatePicker: FC<FormikDatePickerProps> = ({
  name,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, event.target.value);
  };

  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        const hasError = Boolean(form.errors[name] && form.touched[name]);
        return (
          <TextField
            {...field}
            {...otherProps}
            type="date"
            onChange={handleChange}
            error={hasError}
            className="w-full mt-2"
            InputLabelProps={{
              shrink: true,
            }}
          />
        );
      }}
    </Field>
  );
};

export default FormikDatePicker;
