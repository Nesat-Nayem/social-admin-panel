// i18n
import './locales/i18n';

// scroll bar
import 'simplebar/src/simplebar.css';
// eslint-disable-next-line no-unused-vars
// lightbox
/* eslint-disable import/no-unresolved */
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';
import './utils/mapboxgl';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
// @mui
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// redux
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { persistor, store } from './redux/store';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// locales
import ThemeLocalization from './locales';
// components
import { MotionLazyContainer } from './components/animate';
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { SettingsProvider, ThemeSettings } from './components/settings';
import SnackbarProvider from './components/snackbar';

// Check our docs
// https://docs.minimals.cc/authentication/js-version

import { AuthProvider } from './auth/JwtContext';
// import { AuthProvider } from './auth/Auth0Context';
// import { AuthProvider } from './auth/FirebaseContext';
// import { AuthProvider } from './auth/AwsCognitoContext';

// ----------------------------------------------------------------------

export default function App() {
  const queryClient = new QueryClient();
  return (
    <AuthProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <SettingsProvider>
                  <BrowserRouter>
                    <ScrollToTop />
                    <MotionLazyContainer>
                      <ThemeProvider>
                        <ThemeSettings>
                          <ThemeLocalization>
                            <SnackbarProvider>
                              <StyledChart />
                              <Router />
                              <ReactQueryDevtools initialIsOpen={false} />
                            </SnackbarProvider>
                          </ThemeLocalization>
                        </ThemeSettings>
                      </ThemeProvider>
                    </MotionLazyContainer>
                  </BrowserRouter>
                </SettingsProvider>
              </LocalizationProvider>
            </PersistGate>
          </ReduxProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}
