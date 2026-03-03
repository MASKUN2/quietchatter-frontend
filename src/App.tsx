import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import BookSearch from './pages/BookSearch';
import BookDetail from './pages/BookDetail';
import NaverCallback from './pages/NaverCallback';
import TermsOfService from './pages/TermsOfService';
import AboutService from './pages/AboutService';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import MyPage from './pages/MyPage/MyPage';
import ProfileEditPage from './pages/MyPage/ProfileEditPage';
import { AuthProvider } from './context/AuthContext';
import { OnboardingProvider, useOnboardingRefsState } from './context/OnboardingContext';
import { Container, Stack, useTheme, useMediaQuery } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5c2d91', // Updated to Deep Violet to match button theme
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: [
      'Pretendard',
      '-apple-system',
      'BlinkMacSystemFont',
      'system-ui',
      'Roboto',
      '"Helvetica Neue"',
      '"Segoe UI"',
      '"Apple SD Gothic Neo"',
      '"Noto Sans KR"',
      '"Malgun Gothic"',
      'sans-serif',
    ].join(','),
    h4: {
      fontSize: '1.75rem', // 28px
      fontWeight: 700,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem', // 18px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem', // 16px
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.6,
    },
    caption: {
      fontSize: '0.75rem', // 12px
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none', // Prevent all-caps on buttons
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        /* Font loaded via index.html */
      `,
    },
  },
});

const AppContent: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const onboardingRefs = useOnboardingRefsState();

  return (
    <OnboardingProvider refs={onboardingRefs}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container maxWidth="md" disableGutters={isMobile} sx={{ flexGrow: 1 }}>
          <Stack spacing={{ xs: 2, md: 4 }} sx={{ py: { xs: 0, md: 2 }, height: '100%' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/books/search" element={<BookSearch />} />
                <Route path="/books/:bookId" element={<BookDetail />} />
                <Route path="/auth/login/naver/callback" element={<NaverCallback />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/mypage/profile" element={<ProfileEditPage />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/about" element={<AboutService />} />
              </Routes>
            </Box>
          </Stack>
        </Container>
        <Footer />
      </Box>
    </OnboardingProvider>
  );
};

import { ToastProvider } from './providers/ToastProvider';
import { ErrorBoundary } from 'react-error-boundary';
import GlobalErrorFallback from './components/common/GlobalErrorFallback';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastProvider>
        <AuthProvider>
          <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
            <Router>
              <ScrollToTop />
              <AppContent />
            </Router>
          </ErrorBoundary>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
