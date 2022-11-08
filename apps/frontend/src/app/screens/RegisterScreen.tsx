import {
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function RegisterScreen() {
  return (
    <Box
      sx={{
        my: 8,
        mx: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      maxWidth="xs"
    >
      <Avatar sx={{ m: 1, bgcolor: '#388e3c' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <Box component="form" sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="f_name"
          label="First Name"
          name="f_name"
          autoComplete="f_name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="m_name"
          label="Middle Name"
          name="m_name"
          autoComplete="m_name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="l_name"
          label="Last Name"
          name="l_name"
          autoComplete="l_name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign in
        </Button>
        <Grid container>
          <Link href="#" variant="body2" color="primary">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2" color="primary">
            Don't have and account? Sign Up
          </Link>
        </Grid>
      </Box>
    </Box>
  );
}

export default RegisterScreen;
