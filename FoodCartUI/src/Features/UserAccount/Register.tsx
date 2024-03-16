import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import Agent from "../../Layout/Agent";
import { toast } from "react-toastify";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "} Bondhu Caterer {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "all",
  });

  function handleRegisterErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes("Password")) {
          setError("passWord", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("userName", { message: error });
        }
      });
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component={Paper} maxWidth="xs" sx={{ mt: 2, pb: 1, mb: 4 }}>
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit((data) =>
              Agent.user
                .register(data)
                .then(() => {
                  toast.success(
                    "Succesfully Regisrered! Please Login to the app."
                  );
                  history.push("/login");
                })
                .catch((errors: any) => handleRegisterErrors(errors))
            )}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="UserName"
              autoFocus
              {...register("userName", { required: "UserName is required" })}
              error={!!errors.userName}
              helperText={errors?.userName?.message?.toString()}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              autoFocus
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+[\w-.]*@\w+((-\w+)|(\w*)).[a-z]{2,3}$/,
                  message: "Not a valid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors?.email?.message?.toString()}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              {...register("passWord", {
                required: "Password is required",
                pattern: {
                  value:
                    /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                  message: "Password is not complex enough",
                },
              })}
              error={!!errors.passWord}
              helperText={errors?.passWord?.message?.toString()}
            />
            <LoadingButton
              disabled={!isValid}
              type="submit"
              fullWidth
              loading={isSubmitting}
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Register
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link to="/login">{"Already have an account? Sign in"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2, mb: 2 }} />
      </Container>
    </ThemeProvider>
  );
}
