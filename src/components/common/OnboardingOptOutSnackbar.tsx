import React, { useState, useEffect, useRef } from 'react';
import { Snackbar, Typography, Checkbox, FormControlLabel, Paper, Box } from '@mui/material';

interface Props {
    /** 3초가 지난 뒤 체크 상태를 전달하며 호출됨 */
    onTimeout: (isChecked: boolean) => void;
}

const DURATION_MS = 5000;

const OnboardingOptOutSnackbar: React.FC<Props> = ({ onTimeout }) => {
    const [isChecked, setIsChecked] = useState(false);
    const isCheckedRef = useRef(isChecked);

    // 최신 체크 상태를 ref에 동기화
    useEffect(() => {
        isCheckedRef.current = isChecked;
    }, [isChecked]);

    useEffect(() => {
        const timer = setTimeout(() => {
            onTimeout(isCheckedRef.current);
        }, DURATION_MS);

        return () => clearTimeout(timer);
    }, [onTimeout]);

    return (
        <Snackbar
            open={true}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{ mb: 4 }}
        >
            <Paper elevation={4} sx={{ px: 1.5, py: 1, maxWidth: 240, overflow: 'hidden', position: 'relative', borderRadius: 1.5, backgroundColor: 'primary.main', color: '#fff' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>
                        온보딩 가이드는 계속 해드릴게요.
                    </Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                size="small"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    p: 0.5,
                                    '&.Mui-checked': {
                                        color: '#fff',
                                    },
                                    '& .MuiSvgIcon-root': { fontSize: 18 }
                                }}
                            />
                        }
                        label={<Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.9)', whiteSpace: 'nowrap', fontWeight: 500 }}>괜찮아요</Typography>}
                        sx={{ m: 0 }}
                    />
                </Box>
            </Paper>
        </Snackbar>
    );
};

export default OnboardingOptOutSnackbar;
