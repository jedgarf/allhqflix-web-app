import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    alert("Under development");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{  
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={(event) => handleSubmit(event)} noValidate sx={{ mt: 0 }}>
          <TextField
            size="small"
            margin="normal"
            // required
            fullWidth
            id="email"
            label="Email"
            name="email"
            sx={{ color: 'whitesmoke' }}
            // autoComplete="email"
            autoComplete="off"
            autoFocus
          />
          <TextField
            size="small"
            margin="normal"
            // required
            fullWidth
            name="password"
            sx={{ color: 'whitesmoke' }}
            label="Password"
            type="password"
            id="password"
            // autoComplete="current-password"
            autoComplete="off"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            className='loginBtn'
            size="small"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2, color: 'whitesmoke' }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;