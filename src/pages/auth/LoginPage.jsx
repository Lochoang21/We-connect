import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/authSlice";

const LoginPage = () => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const payload = { username: data.email, password: data.password };
    const result = await dispatch(login(payload));
    if (login.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Login</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
          rules={{ required: "Password is required" }}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Signing in..." : "Sign in"}
        </Button>
        {error && (
          <p className="text-center text-red-600 text-sm">{error}</p>
        )}
      </form>
      <p className="text-center mt-4">
        New on our platform?{" "}
        <Link to="/register" className="text-primary">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;