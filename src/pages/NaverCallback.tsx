import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography, Snackbar, Alert } from '@mui/material';
import { loginWithNaver, signupWithNaver } from '../api/auth';
import { useAuthStore } from '../store/useAuthStore';
import SignupModal from '../components/common/SignupModal';
import ReactivationModal from '../components/common/ReactivationModal';
import { ApiError } from '../api/client';

const NaverCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshMember } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('로그인 중입니다...');

  // 회원가입 관련 상태
  const [showSignup, setShowSignup] = useState(false);
  const [registerToken, setRegisterToken] = useState('');
  const [tempNickname, setTempNickname] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  // Reactivation 관련 상태
  const [showReactivation, setShowReactivation] = useState(false);
  const [reactivationToken, setReactivationToken] = useState('');

  // Snackbar 상태
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const hasFetched = React.useRef(false);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (hasFetched.current) return;
    hasFetched.current = true;

    if (code && state) {
      handleLogin(code, state);
    } else {
      showToast('잘못된 접근입니다.', 'error');
      const redirectUrl = localStorage.getItem('redirect_after_login') || '/home';
      localStorage.removeItem('redirect_after_login');
      setTimeout(() => navigate(redirectUrl, { replace: true }), 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (code: string, state: string) => {
    try {
      const response = await loginWithNaver(code, state);

      if (response.isRegistered) {
        await completeLogin('반갑습니다! 로그인되었습니다.');
      } else {
        // 미가입: 회원가입 모달 오픈
        setRegisterToken(response.registerToken || '');
        setTempNickname(response.tempNickname || '조용한 독서가');
        setShowSignup(true);
        setLoading(false);
        setStatusMessage('회원가입을 진행합니다.');
      }
    } catch (error: unknown) {
      console.error('Login failed:', error);
      if (error instanceof ApiError) {
        const data = error.response?.data as { type?: string; reactivationToken?: string };
        if (data?.type === '/errors/member-deactivated' && data?.reactivationToken) {
          setReactivationToken(data.reactivationToken);
          setShowReactivation(true);
          setLoading(false);
          setStatusMessage('계정 재활성화가 필요합니다.');
          return;
        }
      }
      showToast('로그인에 실패했습니다.', 'error');
      const redirectUrl = localStorage.getItem('redirect_after_login') || '/home';
      localStorage.removeItem('redirect_after_login');
      setTimeout(() => navigate(redirectUrl, { replace: true }), 2000);
    }
  };

  const completeLogin = async (message: string) => {
    setStatusMessage('로그인 완료! 이동합니다...');
    await refreshMember();
    showToast(message, 'success');
    const redirectUrl = localStorage.getItem('redirect_after_login') || '/home';
    console.log('[DEBUG] completeLogin read redirectUrl (before remove):', redirectUrl);
    localStorage.removeItem('redirect_after_login');
    setTimeout(() => navigate(redirectUrl, { replace: true }), 1500);
  };

  const handleSignup = async (nickname: string) => {
    setSignupLoading(true);
    try {
      await signupWithNaver(nickname, registerToken);
      setShowSignup(false);
      await completeLogin('환영합니다! 회원가입이 완료되었습니다.');
    } catch (error) {
      console.error('Signup failed:', error);
      showToast('회원가입에 실패했습니다.', 'error');
      setSignupLoading(false);
    }
  };

  const handleSignupCancel = () => {
    setShowSignup(false);
    showToast('회원가입이 취소되었습니다.', 'error');
    const redirectUrl = localStorage.getItem('redirect_after_login') || '/home';
    localStorage.removeItem('redirect_after_login');
    navigate(redirectUrl, { replace: true });
  };

  const handleReactivated = async (message: string) => {
    setShowReactivation(false);
    await completeLogin(message);
  };

  const handleReactivationCancel = () => {
    setShowReactivation(false);
    showToast('로그인이 취소되었습니다.', 'error');
    const redirectUrl = localStorage.getItem('redirect_after_login') || '/home';
    localStorage.removeItem('redirect_after_login');
    navigate(redirectUrl, { replace: true });
  };

  const handleTokenExpired = () => {
    setShowReactivation(false);
    showToast('재활성화 토큰이 만료되었습니다. 다시 로그인해주세요.', 'error');
    const redirectUrl = localStorage.getItem('redirect_after_login') || '/home';
    localStorage.removeItem('redirect_after_login');
    navigate(redirectUrl, { replace: true });
  };

  const showToast = (message: string, severity: 'success' | 'error') => {
    setToast({ open: true, message, severity });
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}>
      {loading && (
        <>
          <CircularProgress sx={{ color: '#5c2d91', mb: 2 }} />
          <Typography variant="body1">{statusMessage}</Typography>
        </>
      )}

      {showSignup && (
        <SignupModal
          open={showSignup}
          tempNickname={tempNickname}
          onSignup={handleSignup}
          onCancel={handleSignupCancel}
          loading={signupLoading}
        />
      )}

      <ReactivationModal
        open={showReactivation}
        reactivationToken={reactivationToken}
        onReactivated={handleReactivated}
        onCancel={handleReactivationCancel}
        onTokenExpired={handleTokenExpired}
      />

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast.severity} variant="filled" sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NaverCallback;
