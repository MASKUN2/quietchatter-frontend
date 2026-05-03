import React, { useState, useEffect, useRef } from 'react';
import { Snackbar, Typography, LinearProgress, Checkbox, FormControlLabel, Paper } from '@mui/material';

interface Props {
    /** 3초가 지난 뒤 체크 상태를 전달하며 호출됨 */
    onTimeout: (isChecked: boolean) => void;
}

const DURATION_MS = 5000;
const INTERVAL_MS = 30;

const OnboardingOptOutSnackbar: React.FC<Props> = ({ onTimeout }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [progress, setProgress] = useState(100);
    const isCheckedRef = useRef(isChecked);

    // 최신 체크 상태를 ref에 동기화
    useEffect(() => {
        isCheckedRef.current = isChecked;
    }, [isChecked]);

    useEffect(() => {
        const startTime = Date.now();
        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, 100 - (elapsed / DURATION_MS) * 100);
            setProgress(remaining);

            if (elapsed >= DURATION_MS) {
                clearInterval(timer);
                onTimeout(isCheckedRef.current);
            }
        }, INTERVAL_MS);

        return () => clearInterval(timer);
    }, [onTimeout]);

    return (
        <Snackbar
            open={true}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            sx={{ mb: 4 }}
        >
            <Paper elevation={4} sx={{ p: 2, minWidth: 320, overflow: 'hidden', position: 'relative', borderRadius: 2, backgroundColor: 'primary.main', color: '#fff' }}>
                <Typography variant="body1" sx={{ mb: 1.5, fontWeight: 600, color: '#fff' }}>
                    온보딩 가이드를 계속 해드릴게요.
                </Typography>
                <FormControlLabel
                    control={
                        <Checkbox
                            size="small"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                            sx={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                '&.Mui-checked': {
                                    color: '#fff',
                                },
                            }}
                        />
                    }
                    label={<Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>다시 보지 않기</Typography>}
                    sx={{ mb: 1, ml: -0.5 }}
                />
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#fff',
                            transition: 'transform 30ms linear',
                        }
                    }}
                />
            </Paper>
        </Snackbar>
    );
};

export default OnboardingOptOutSnackbar;
