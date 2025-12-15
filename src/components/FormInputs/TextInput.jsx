import { TextField, InputAdornment } from "@mui/material";

const TextInput = ({ onChange, value, name, type = "text", icon }) => {
  return (
    <TextField
      fullWidth
      slotProps={{
        input: {
          className: "h-12 px-3 py-2",
          endAdornment: icon ? (
            <InputAdornment position="end">{icon}</InputAdornment>
          ) : null,
        },
        htmlInput: { className: "!p-0" },
      }}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#E8E8E8',
          borderRadius: '8px',
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: '#246AA3',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#246AA3',
          },
        },
      }}
    />
  );
};
export default TextInput;
