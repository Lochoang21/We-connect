import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Register form data:', data);
    // Mock register - chỉ log dữ liệu
    alert(`Register with email: ${data.email}, name: ${data.fullName}`);
  };

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Register</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          name="fullName"
          label="Full Name"
          control={control}
          Component={TextInput}
          rules={{ required: "Full name is required" }}
        />
        <FormField
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
        />
        <FormField
          name="password"
          label="Password"
          control={control}
          type="password"
          Component={TextInput}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
        />
        <Button
          variant="contained"
          type="submit"
        >
          Sign up
        </Button>
      </form>
      <p className="text-center mt-4">
        Already have an account? <Link to="/login" className="text-primary">Sign in instead</Link>
      </p>
    </div>
  );
};

export default RegisterPage;