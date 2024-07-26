import { FormControl, InputLabel, MenuItem, Select, useTheme } from "@mui/material";
import { useRef } from "react";
import { Controller, Control, FieldValues, FieldPath, FieldError, FieldErrors } from "react-hook-form";

// Definindo o tipo para opções
type Option = {
  [key: string]: string | number;
};

interface CustomSelectFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  required?: boolean;
  error?: FieldErrors<T>;
  options?: Option[];
  label?: string;
  size?: 'small' | 'medium';
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  itemvalue: string;
  itemcontent: string;
  customOptions?: React.ReactNode;
}

export const CustomSelectField = <T extends FieldValues>(props: CustomSelectFieldProps<T>) => {
  const {
    name,
    control,
    required,
    error,
    options,
    label,
    size,
    itemvalue,
    itemcontent,
    customOptions
  } = props;

  const selectRef = useRef<HTMLSelectElement>(null);
  const theme = useTheme();

  const selectType = () => {
    if (customOptions) {
      return customOptions;
    } else if (options && options.length > 0) {
      return options.map((item, index) => (
        <MenuItem key={index} value={item[itemvalue]}>
          {item[itemcontent]}
        </MenuItem>
      ));
    } else {
      return <MenuItem value="">Sem registros.</MenuItem>;
    }
  };

  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => (
          <>
            <InputLabel
              id={`${name}-select`}
              {...(error && { error: !!error[name] })}
            >
              {label}
            </InputLabel>
            <Select
              ref={selectRef}
              onChange={field.onChange}
              value={field.value || ''}
              size={size ?? "medium"}
              required={false}
              label={required ? `* ${label}` : label}
              labelId={`${name}-select`}
              {...(error && { error: !!error[name] })}
            >
              {selectType()}
            </Select>
          </>
        )}
      />
    </FormControl>
  );
};