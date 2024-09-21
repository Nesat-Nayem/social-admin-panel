import { DialogContent, DialogTitle, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useParams } from 'react-router';
import { useGetItemById } from 'services/Master.Services';
import CouponCollectedForm from '../form/CouponCollected/CouponCollectedForm';
import CouponSettledForm from '../form/CouponSettled/CouponSettledForm';
import SampleGivenForm from '../form/SampleGiven/SampleGivenForm';
import SpecialGiftForm from '../form/SpecialGift/SpecialGiftForm';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});
CouponDialogbox.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  cardData: PropTypes.string,
};
export default function CouponDialogbox({ open, setOpen, cardData }) {
  const { name } = useParams();
  const doctor_id = name;
  const { refetch } = useGetItemById('doctor', doctor_id);
  const handleClose = () => {
    setOpen(false);
    refetch();
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
        sx={{
          backgroundColor: 'primary.lighter',
        }}
      >
        <Typography variant="h6" sx={{ textTransform: 'uppercase' }}>
          {cardData}
        </Typography>
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
          '&::-webkit-scrollbar': {
            // display: "none",
            width: '3px',
          },

          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
            borderRadius: '10px',
            backgroundColor: 'primary',
          },

          '&::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            boxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
            // backgroundColor: "#03cc83",
          },
        }}
      >
        {cardData === 'Coupon Collected' && (
          <CouponCollectedForm doctor_id={doctor_id} setOpen={setOpen} />
        )}
        {cardData === 'Sample Given' && <SampleGivenForm doctor_id={doctor_id} setOpen={setOpen} />}
        {cardData === 'Special Gift' && <SpecialGiftForm doctor_id={doctor_id} setOpen={setOpen} />}
        {cardData === 'Coupon Settled' && (
          <CouponSettledForm doctor_id={doctor_id} setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
}
