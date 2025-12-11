/* eslint-disable no-unused-vars */
import { Controller } from "react-hook-form";

// Component prop is used in JSX below
const FormField = ({ control, label, name, type, Component, rules }) => {
  return (
    <div>
      <p className="mb-1 font-bold text-sm text-dark-100">{label}</p>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value, name }, fieldState: { error } }) => {
          return (
            <>
              <Component
                onChange={onChange}
                value={value}
                name={name}
                type={type}
                control={control}
                error={error}
              />
              {error && (
                <p className="mt-1 text-sm text-red-500">{error.message}</p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};
export default FormField;
