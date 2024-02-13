import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const SignUp = () => {
    
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
    });
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
          <Button
            className='loginBtn'
            size="small"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2, color: 'whitesmoke' }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;