import { DialogTitle, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import { useAuthContext } from 'auth/useAuthContext';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { PATH_AUTH } from 'routes/paths';
import { useGetVSOById } from 'services/VSO.Services';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});
VsoDialogbox.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
export default function VsoDialogbox({ open, setOpen }) {
  const [openPopover, setOpenPopover] = React.useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
  const { id, name } = user;
  const { data } = useGetVSOById('vso', id);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClosePopover = () => {
    setOpenPopover(null);
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleLogout = async () => {
    try {
      logout();
      navigate(PATH_AUTH.login, { replace: true });
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
    >
      <DialogTitle
        id="alert-dialog-slide-title"
        // sx={{ textAlign: 'center', textTransform: 'uppercase' }}
        sx={{
          backgroundColor: 'primary.lighter',
        }}
      >
        Date &nbsp;: &nbsp;23-12-1999
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          backgroundColor: 'primary.lighter',
        }}
      >
        <Typography variant="h6">VSO Logged In</Typography>
        <Typography variant="h6" color="primary">
          {name}
        </Typography>
        <Typography variant="h6">ID No &nbsp;: &nbsp; :{id} </Typography>
        <Typography variant="h6">Total Visit &nbsp;: &nbsp;{data && data.total_visit} </Typography>
        <Typography variant="h6">Total Expense &nbsp;: &nbsp;0</Typography>
      </DialogContent>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
        pt={2}
        sx={{
          backgroundColor: 'primary.lighter',
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            color: 'primary.dark',
            backgroundColor: '#fff !important',
            display: 'flex',
            flexDirection: 'column',

            ' & :hover': {
              backgroundColor: 'primary.lighter',
            },
          }}
          onClick={() => {
            navigate('/dashboard/vso-profile');
            handleClose();
          }}
        >
          Profile
        </Button>
        <Button
          variant="contained"
          size="large"
          sx={{
            color: 'primary.dark',
            backgroundColor: '#fff !important',
            display: 'flex',
            flexDirection: 'column',

            ' & :hover': {
              backgroundColor: 'primary.lighter',
            },
          }}
          onClick={() => {
            navigate('/dashboard/vso-visit');
            handleClose();
          }}
        >
          Vist
        </Button>
      </Stack>

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
        pt={2}
        sx={{
          backgroundColor: 'primary.lighter',
        }}
      >
        <Button
          onClick={handleLogout}
          variant="contained"
          size="large"
          sx={{
            color: '#000',
            backgroundColor: '#8faadc !important',
            display: 'flex',
            flexDirection: 'column',
            m: 2,
          }}
        >
          Logout
        </Button>
      </Stack>
    </Dialog>
  );
}
