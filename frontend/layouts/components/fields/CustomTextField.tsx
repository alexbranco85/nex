import React from 'react';
import { FormControl, TextField, InputProps as MuiInputProps } from "@mui/material";
import { Controller, Control, FieldValues, FieldPath, FieldError, FieldErrors } from "react-hook-form";

interface CustomTextFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  required?: boolean;
  error?: FieldErrors<any>;
  autoComplete?: string;
  label?: string;
  size?: 'small' | 'medium';
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  type?: string;
}

const CustomTextField = <T extends FieldValues>(props: CustomTextFieldProps<T>) => {
  const {
    name,
    control,
    required,
    error,
    autoComplete,
    label,
    size,
    onKeyDown,
    type
  } = props;

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => (
          <TextField
            onChange={field.onChange}
            value={field.value}
            size={size ?? "medium"}
            autoComplete={autoComplete ?? "off"}
            label={required ? `* ${label}` : label}
            error={!!error?.[name]}
            required={false}
            onKeyDown={(e) => onKeyDown ? onKeyDown(e) : (e.keyCode === 13 && e.preventDefault())}
            fullWidth
            type={type}
          />
        )}
      />
    </FormControl>
  );
};

export default CustomTextField;