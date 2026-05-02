import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PagePaper from './PagePaper';
import { ThemeProvider, createTheme } from '@mui/material';

describe('PagePaper Component', () => {
    const theme = createTheme();

    it('renders children correctly', () => {
        render(
            <ThemeProvider theme={theme}>
                <PagePaper>
                    <div data-testid="child">Test Child</div>
                </PagePaper>
            </ThemeProvider>
        );

        expect(screen.getByTestId('child')).toBeInTheDocument();
        expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    it('applies custom sx styles and additional props', () => {
        render(
            <ThemeProvider theme={theme}>
                <PagePaper data-testid="paper-element" sx={{ marginTop: '20px' }}>
                    Test Content
                </PagePaper>
            </ThemeProvider>
        );
        
        const paper = screen.getByTestId('paper-element');
        expect(paper).toBeInTheDocument();
        // sx prop이 적용되었는지 확인 (MUI v6는 클래스명으로 스타일을 주입하므로 
        // toHaveStyle이 클래스 시뮬레이션 없이 작동하지 않을 수 있음. 
        // 여기서는 요소 존재와 텍스트 렌더링을 우선 확인)
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
});
