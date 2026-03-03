import React from 'react';
import { Box, Button, Typography, Stack, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CharacterLimitedTextField from '../common/CharacterLimitedTextField';

interface TalkFormProps {
  content: string;
  setContent: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  nickname?: string;
  isGuest?: boolean;
  onLoginClick?: () => void;
}
const TalkForm: React.FC<TalkFormProps> = ({ content, setContent, onSubmit, nickname, isGuest = false, onLoginClick }) => {
  const d = new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  return (
    <Box sx={{
      mb: 4,
      mx: 0,
      p: { xs: 2, sm: 2 },
      borderRadius: 2,
      bgcolor: 'grey.50',
      border: '1px solid',
      borderColor: 'grey.200'
    }}>
      <Stack direction="row" spacing={2} sx={{ mb: 1.5, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <AccountCircleIcon fontSize="small" color="action" />
          <Typography variant="body2" fontWeight="bold">
            {nickname || '익명 사용자'}
          </Typography>
        </Box>
        <Tooltip title="1년후에 자동으로 숨겨집니다" placement="top" arrow>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', cursor: 'help' }}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="caption">
              {today}
            </Typography>
          </Box>
        </Tooltip>
      </Stack>

      <form onSubmit={onSubmit}>
        <CharacterLimitedTextField
          fullWidth
          multiline
          rows={3}
          maxLength={250}
          placeholder={isGuest ? "톡을 남기려면 로그인이 필요합니다." : "이 책에 대한 생각을 자유롭게 남겨주세요."}
          value={content}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setContent(e.target.value)}
          variant="outlined"
          disabled={isGuest}
          sx={{ mb: 1, bgcolor: isGuest ? 'grey.100' : 'white' }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          {isGuest ? (
            <Button
              type="button"
              variant="outlined"
              onClick={onLoginClick}
              sx={{
                px: 4,
                color: '#5c2d91',
                borderColor: '#5c2d91',
                '&:hover': {
                  borderColor: '#4b0082',
                  backgroundColor: 'rgba(92, 45, 145, 0.04)'
                }
              }}
            >
              로그인 하기
            </Button>
          ) : (
            <Button
              type="submit"
              variant="outlined"
              disabled={!content.trim()}
              sx={{
                px: 4,
                color: '#5c2d91',
                borderColor: '#5c2d91',
                '&:hover': {
                  borderColor: '#4b0082',
                  backgroundColor: 'rgba(92, 45, 145, 0.04)'
                },
                '&.Mui-disabled': {
                  borderColor: 'rgba(0, 0, 0, 0.12)',
                  color: 'rgba(0, 0, 0, 0.26)'
                }
              }}
            >
              Talk 등록
            </Button>
          )}
        </Box>
      </form>
    </Box >
  );
};

export default TalkForm;
