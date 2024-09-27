import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Alert, Box, Link, Stack, Tooltip, Typography } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();

  return (

    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Sign in to Voiz</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link component={RouterLink} to={PATH_AUTH.register} variant="subtitle2">
            Create an account
          </Link>
        </Stack>

        <Tooltip title={method} placement="left">
          <Box
            component="img"
            alt={method}
            src={`/assets/icons/auth/ic_${method}.png`}
            sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
          />
        </Tooltip>
      </Stack>
      <Alert severity="info" sx={{ mb: 3 }}>
        {/* Use email : <strong>AD8787</strong> / password :<strong> demo1234</strong> */}
        <ul>
          {/* <li>
            VSO id : <strong>VSO622</strong> / Pass :<strong> 123456</strong>
          </li> */}
          <li>
            Admin Email : <strong>admin@admin.com</strong> / Pass :<strong> 123456</strong>
          </li>
          <li>
            MLA : <strong>mla@gmail.com</strong> / Pass :<strong> 123456</strong>
          </li>
          <li>
            Hospital : <strong>hospital@gmail.com</strong> / Pass :<strong> 123456</strong>
          </li>
          <li>
            Consultant : <strong>consultant@gmail.com</strong> / Pass :<strong> 123456</strong>
          </li>
        </ul>
      </Alert>

      <AuthLoginForm />
      <AuthWithSocial />
    </LoginLayout>

  );
}
