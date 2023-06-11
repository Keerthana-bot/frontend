import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Link,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import IMAGE from "../../Images/background.jpg";

const useStyles = makeStyles({
  root: {
    background: `url(${IMAGE}) no-repeat center / cover`,
  },
});

const LoginForm = () => {
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { isAuthenticated, user, SignIn, IsPermit } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    IsPermit();
    if (isAuthenticated) {
      if (user) {
        navigate("/Home");
      } else {
        navigate("/home");
      }
    }
  }, [isAuthenticated]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.email) {
      isValid = false;
      errors.email = "Email/Username is required";
    }

    if (!formData.password) {
      isValid = false;
      errors.password = "Password is required";
    }

    setErrors(errors);

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
      await SignIn(formData.email, formData.password)
        .then((response) => {
          if (response.status === 200) {
            const { user, token } = response.data;
            login(token, user.name, user.email, user._id, user.pic, "user");
            enqueueSnackbar("Logged In successfully", {
              variant: "success",
            });
            //await showToast("Logged In successfully", "success");
            navigate("/home");
          } else {
            setErrors({
              email: response.data.message,
              password: response.data.message,
            });
            enqueueSnackbar(response.data.message, { variant: "error" });
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            setErrors({
              email: error.response.data.message,
              password: error.response.data.message,
            });
            enqueueSnackbar(error.response.data.message, {
              variant: "error",
            });
          } else {
            setErrors({ email: "An error occurred" });
            enqueueSnackbar("An error occurred", { variant: "error" });
          }
        });
    }
  };

  return (
    <Box className={classes.root}>
      <Stack spacing={2}>
        <Typography variant="body2" sx={{ color: "#f80202" }}>
          {errors.email}
        </Typography>
        <FormControl>
          <InputLabel htmlFor="outlined-adornment-username-login">
            {"Email / Username"}
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-username-login"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            label={"Username"}
            error={!!errors.email}
            helperText={errors.email}
          />
        </FormControl>

        <Typography variant="body2" sx={{ color: "#f80202" }}>
          {errors.password}
        </Typography>
        <FormControl>
          <InputLabel htmlFor="outlined-adornment-password-login">
            {"Enter Password"}
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-login"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label={"password"}
            error={!!errors.password}
            helperText={errors.password}
          />
        </FormControl>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Checkbox name="remember" label="Remember me"></Checkbox>
          <Typography variant="body2">Keep me logged in</Typography>
        </Stack>
        <Link href="/forgot" variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>
      <Stack>
        <br />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading && <>{"Loading..."}</>}
          {!loading && <>{"LOGIN"}</>}
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default LoginForm;
