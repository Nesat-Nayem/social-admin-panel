import PropTypes from 'prop-types';
// @mui
import { Typography, Stack, Box } from '@mui/material';
// components
import Logo from '../../components/logo';
import Image from '../../components/image';
import CRMLogo from '../../components/Crmlogo/crm.jpeg';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginLayout({ children, illustration, title }) {
  return (
    <StyledRoot>
      {/* <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      /> */}
      <Box sx={{ zIndex: 9, position: 'absolute', mt: { xs: 1.5, md: 5 }, ml: { xs: 2, md: 5 } }}>
        <img src={CRMLogo} alt="logo" height={100} width={150} />
      </Box>

      <StyledSection>
        <Typography variant="h3" sx={{ mb: 10, mt:10, maxWidth: 480, textAlign: 'center' }}>
          {title || 'Hi, Welcome back'}
        </Typography>

        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={illustration || '/assets/illustrations/illustration_dashboard.png'}
          sx={{ maxWidth: 720 }}
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1  }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
