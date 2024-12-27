import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { FC, useState } from 'react';

const PasswordTextField: FC<TextFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () =>
    setShowPassword((prevState) => !prevState);

  return (
    <TextField
      {...props}
      type={showPassword ? 'text' : 'password'}
      inputProps={{
        autoComplete: 'new-password',
        dir: 'ltr',
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="end">
            <IconButton
              tabIndex={-1}
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordTextField;
