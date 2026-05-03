import { http, HttpResponse } from 'msw';

export const handlers = [
    // Mock Logged-in User
    http.get('/api/auth/me', () => {
        return HttpResponse.json({
            role: 'REGULAR',
            nickname: 'MockUser',
            isLoggedIn: true,
            id: 'mock-user-123'
        });
    }),
    // Mock Book Details
    http.get('/api/books/:bookId', ({ params }) => {
        const { bookId } = params;
        return HttpResponse.json({
            id: bookId as string,
            title: 'Mock Book Title',
            author: 'Mock Author',
            isbn: '1234567890',
            description: 'This is a mock book description used for testing.',
            thumbnailImageUrl: 'https://via.placeholder.com/150',
            externalLinkUrl: 'https://example.com'
        });
    }),
    // Mock Talks List by Book
    http.get('/api/talks/book/:bookId', () => {
        return HttpResponse.json({
            content: [],
            empty: true,
            first: true,
            last: true,
            number: 0,
            numberOfElements: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            pageable: "INSTANCE",
            page: {
                first: true,
                last: true,
                number: 0,
                totalPages: 0
            }
        });
    }),
    // Mock Recommended Talks
    http.get('/api/talks/recommended', () => {
        return HttpResponse.json([]);
    }),
    // Mock Naver Login (force signup flow)
    http.post('/api/auth/login/naver', async () => {
        // To trigger the signup modal, we must return isRegistered: false
        return HttpResponse.json({
            isRegistered: false,
            registerToken: 'mock-signup-token-12345',
            tempNickname: 'NewQuietUser',
        });
    }),
    // Mock Naver Signup
    http.post('/api/auth/signup', async () => {
        return HttpResponse.json({}, { status: 200 });
    }),
    // Mock Reactivate
    http.post('/api/auth/reactivate', async () => {
        return HttpResponse.json({}, { status: 200 });
    }),
    // Mock My Talks (using /api/talks)
    http.get('/api/talks', ({ request }) => {
        const url = new URL(request.url);
        const memberId = url.searchParams.get('memberId');

        // memberId가 있으면 내 톡 조회로 간주
        if (memberId) {
            return HttpResponse.json({
                content: [
                    {
                        id: 'mock-talk-1',
                        content: 'This is my mock talk about a great book.',
                        bookId: 'mock-book-1',
                        memberId: memberId,
                        nickname: 'MockUser',
                        likeCount: 5,
                        supportCount: 2,
                        didILike: true,
                        didISupport: false,
                        isModified: false,
                        createdAt: new Date().toISOString(),
                        book: {
                            id: 'mock-book-1',
                            title: 'Mock Book Title',
                            author: 'Mock Author',
                            cover: 'https://via.placeholder.com/150'
                        }
                    }
                ],
                page: {
                    first: true,
                    last: true,
                    number: 0,
                    totalPages: 1
                }
            });
        }

        // bookId가 있으면 도서별 톡 조회 (v1 방식 호환용 모킹)
        return HttpResponse.json({
            content: [],
            page: { first: true, last: true, number: 0, totalPages: 0 }
        });
    }),
    // Mock Profile Update
    http.put('/api/members/me/profile', async () => {
        return HttpResponse.json({}, { status: 204 });
    }),
    // Mock Delete Account
    http.delete('/api/members/me', async () => {
        return HttpResponse.json({}, { status: 204 });
    }),
];
