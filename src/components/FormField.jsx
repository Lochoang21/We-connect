/* eslint-disable no-unused-vars */
import { Controller } from "react-hook-form";

// Component prop is used in JSX below
const FormField = ({ control, label, name, type, Component, rules, icon }) => {
  return (
    <div>
      <p className="mb-2 font-semibold text-sm text-gray-700">{label}</p>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <Component
              {...field}
              type={type}
              control={control}
              error={error}
              icon={icon}
            />
            {error && (
              <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};
export default FormField;
