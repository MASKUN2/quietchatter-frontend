import React, { useState, useRef } from 'react';
import { Card, CardContent, Typography, Box, Button, IconButton, Stack, Tooltip, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { updateTalk, deleteTalk } from '../../api/talks';
import type { Talk } from '../../types';
import CharacterLimitedTextField from '../common/CharacterLimitedTextField';
import { useToast } from '../../hooks/useToast';
import { MESSAGES } from '../../constants';

interface TalkItemProps {
  talk: Talk;
  onReaction: (talkId: string, type: 'LIKE' | 'SUPPORT', hasReacted: boolean) => void;
  currentMemberId?: string | null;
  onUpdate: () => void;
  showBookInfo?: boolean;
  isMyPageMode?: boolean;
  isHiddenMode?: boolean;
  onRestore?: (talkId: string) => void;
}
const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const TalkItem: React.FC<TalkItemProps> = ({ talk, onReaction, currentMemberId, onUpdate, showBookInfo, isMyPageMode, isHiddenMode, onRestore }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(talk.content);
  const [loading, setLoading] = useState(false);
  const [confirmType, setConfirmType] = useState<'hide' | 'delete' | 'restore' | null>(null);
  const lastConfirmType = useRef(confirmType);
  if (confirmType !== null) lastConfirmType.current = confirmType;
  const displayType = confirmType ?? lastConfirmType.current;
  const { showToast } = useToast();

  const isMine = currentMemberId && String(talk.memberId) === String(currentMemberId);

  const handleUpdate = async () => {
    if (!editContent.trim() || editContent === talk.content) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    try {
      await updateTalk(talk.id, editContent);
      setIsEditing(false);
      onUpdate();
    } catch (error: unknown) {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      } else {
        showToast(MESSAGES.ERROR.TALK_UPDATE_FAILED, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    const type = confirmType;
    setConfirmType(null);

    if (type === 'restore') {
      onRestore?.(talk.id);
      return;
    }

    setLoading(true);
    try {
      await deleteTalk(talk.id);
      showToast(type === 'hide' ? MESSAGES.SUCCESS.TALK_HIDDEN : MESSAGES.SUCCESS.TALK_DELETED, 'success');
      onUpdate();
    } catch (error: unknown) {
      showToast(
        error instanceof Error ? error.message : type === 'hide' ? MESSAGES.ERROR.TALK_HIDE_FAILED : MESSAGES.ERROR.TALK_DELETE_FAILED,
        'error'
      );
      setLoading(false);
    }
  };

  return (
    <Card variant="outlined" sx={{ mx: 0 }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        {showBookInfo && talk.book && (
          <Box sx={{ display: 'flex', gap: 2, mb: 1.5, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Link to={`/books/${talk.book.id}`}>
              <Avatar
                variant="rounded"
                src={talk.book.cover || '/images/quiet-chatter-icon.png'}
                alt={talk.book.title}
                sx={{ width: 44, height: 64, boxShadow: 1, '&:hover': { opacity: 0.8 } }}
              />
            </Link>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
              <Typography
                component={Link}
                to={`/books/${talk.book.id}`}
                variant="subtitle2"
                fontWeight={700}
                color="text.primary"
                noWrap
                sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' }, display: 'block' }}
              >
                {talk.book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {talk.book.author}
              </Typography>
            </Box>
          </Box>
        )}

        <Tooltip title="1년후에 자동으로 숨겨집니다" placement="top" arrow>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', mb: 1.5, cursor: 'help', width: 'fit-content' }}>
            <AccessTimeIcon sx={{ fontSize: '0.875rem' }} />
            <Typography variant="caption">
              {formatDate(talk.createdAt)}
              {talk.isModified && ' (수정됨)'}
            </Typography>
            <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 500 }}>
              by {talk.nickname}
            </Typography>
          </Box>
        </Tooltip>

        {isEditing ? (
          <Box sx={{ mb: 2 }}>
            <CharacterLimitedTextField
              fullWidth
              multiline
              rows={3}
              maxLength={250}
              value={editContent}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEditContent(e.target.value)}
              disabled={loading}
              sx={{ mb: 1 }}
              slotProps={{ htmlInput: { style: { fontSize: '1rem' } } }}
            />
            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <Button size="small" onClick={() => setIsEditing(false)} disabled={loading}>취소</Button>
              <Button
                size="small"
                variant="outlined"
                onClick={handleUpdate}
                disabled={loading}
                sx={{
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'rgba(92, 45, 145, 0.04)'
                  }
                }}
              >
                저장
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="body1" sx={{ flexGrow: 1, whiteSpace: 'pre-wrap' }}>
              {talk.content}
            </Typography>
            {isMine && isHiddenMode && (
              <Box sx={{ ml: 1, mt: -0.5 }}>
                <Button
                  size="small"
                  variant="outlined"
                  disabled={loading}
                  onClick={() => setConfirmType('restore')}
                  sx={{ textTransform: 'none', color: 'primary.main', borderColor: 'primary.main' }}
                >
                  숨김 해제
                </Button>
              </Box>
            )}
            {isMine && !isMyPageMode && !isHiddenMode && (
              <Box sx={{ ml: 1, mt: -0.5 }}>
                <IconButton size="small" onClick={() => setIsEditing(true)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => setConfirmType('delete')} color="error">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
            {isMine && isMyPageMode && !isHiddenMode && (
              <Box sx={{ ml: 1, mt: -0.5 }}>
                <Tooltip title="숨김 처리">
                  <IconButton size="small" onClick={() => setConfirmType('hide')} color="default">
                    <VisibilityOffIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {isMyPageMode ? (
              <>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <ThumbUpAltIcon fontSize="small" sx={{ mr: 0.5, color: 'text.disabled' }} />
                  {talk.likeCount ?? 0}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                  <FavoriteIcon fontSize="small" sx={{ mr: 0.5, color: 'text.disabled' }} />
                  {talk.supportCount ?? 0}
                </Typography>
              </>
            ) : (
              <>
                <Button
                  size="small"
                  color={talk.didILike ? "primary" : "inherit"}
                  startIcon={talk.didILike ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                  onClick={() => onReaction(talk.id, 'LIKE', talk.didILike)}
                >
                  {talk.likeCount}
                </Button>
                <Button
                  size="small"
                  color={talk.didISupport ? "error" : "inherit"}
                  startIcon={talk.didISupport ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  onClick={() => onReaction(talk.id, 'SUPPORT', talk.didISupport)}
                >
                  {talk.supportCount}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </CardContent>

      <Dialog open={confirmType !== null} onClose={() => setConfirmType(null)} maxWidth="xs" fullWidth>
        <DialogTitle>
          {displayType === 'restore' ? '숨김 해제' : displayType === 'hide' ? '숨김 처리' : '톡 삭제'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {displayType === 'restore' && '이 톡의 숨김을 해제하시겠습니까? 공개 목록에 다시 표시됩니다.'}
            {displayType === 'hide' && '이 톡을 숨김 처리하시겠습니까? 숨겨진 톡은 마이페이지에서 다시 공개할 수 있습니다.'}
            {displayType === 'delete' && '이 톡을 삭제하시겠습니까?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmType(null)} sx={{ textTransform: 'none' }}>취소</Button>
          <Button
            onClick={handleConfirm}
            color={displayType === 'restore' ? 'primary' : 'error'}
            sx={{ textTransform: 'none' }}
          >
            {displayType === 'restore' ? '해제' : displayType === 'hide' ? '숨김' : '삭제'}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default TalkItem;