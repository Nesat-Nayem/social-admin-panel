import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
// @mui
import { Box, Drawer, Stack } from '@mui/material';
// hooks
import { useAuthContext } from 'auth/useAuthContext';
import useResponsive from 'hooks/useResponsive';
// config
import { NAV } from 'config-global';
// components
import Scrollbar from 'components/scrollbar';
//
import CRMLogo from 'components/Crmlogo/crm.jpeg';
import { NavSectionVertical } from 'components/nav-section';
import NavAccount from './NavAccount';
import NavToggleButton from './NavToggleButton';
import navConfig from './config-navigation';

// ----------------------------------------------------------------------

NavVertical.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function NavVertical({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');
  const { user } = useAuthContext();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const currentNavConfig = navConfig?.find((item) => item.role === user.role)?.values || [];
  // const currentNavConfig = navConfig?.find((item) => item.role === 'ADMIN')?.values || [];

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          backgroundColor: 'primary.lighter',
        }}
      >
        {/* <Logo /> */}
        <img src={CRMLogo} alt="logo" height={60} width={100} style={{margin:"auto"}} />  
        <NavAccount />
      </Stack>

      <NavSectionVertical
        data={currentNavConfig}
        sx={{
          backgroundColor: 'primary.lighter',
        }}
      />

      <Box sx={{ flexGrow: 1, backgroundColor: 'primary.lighter' }} />

      {/* <NavDocs /> */}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD },
      }}
    >
      <NavToggleButton />

      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              zIndex: 0,
              width: NAV.W_DASHBOARD,
              bgcolor: 'transparent',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
