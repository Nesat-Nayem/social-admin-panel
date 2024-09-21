import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// routes
// components
import { CustomAvatar } from '../../../components/custom-avatar';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
  const { user } = useAuthContext();
  const role = localStorage.getItem('role');

  return (
    <Link component={RouterLink} underline="none" color="inherit">
      <StyledRoot>
        <CustomAvatar src={user?.photoURL} alt={user?.name} name={user?.name} />

        <Box sx={{ ml: 2, minWidth: 0 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name || 'Partha Sarathi Das'}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {/* {user?.role} */}
            {role}
          </Typography>
        </Box>
      </StyledRoot>
    </Link>
  );
}
