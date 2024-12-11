import { useState, ChangeEvent } from 'react';

interface UseFormProps<T> {
  initialValues: T;
  validate: (values: T) => Partial<Record<keyof T, string>>;
}

export const useForm = <T extends Record<string, unknown>>({
  initialValues,
  validate
}: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValues = {
      ...values,
      [name]: e.target.type === 'number' ? parseFloat(value) : value
    };
    setValues(newValues);
    const validationErrors = validate(newValues);
    setErrors(validationErrors);
  };

  const resetForm = (newValues: T = initialValues) => {
    setValues(newValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    resetForm,
    isValid: Object.keys(errors).length === 0
  };
};