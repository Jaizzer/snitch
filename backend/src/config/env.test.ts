describe('Config', () => {
	it('Server definitions should exist', () => {
		expect(!!process.env.PORT).toBeTruthy();
		expect(!!process.env.NODE_ENV).toBeTruthy();
	});

	it('Database definitions should exist', () => {
		expect(!!process.env.DATABASE_URL).toBeTruthy();
	});

	it('Vercel definitions should exist', () => {
		expect(!!process.env.VERCEL_TOKEN).toBeTruthy();
	});

	it('JWT definitions should exist', () => {
		expect(!!process.env.JWT_SECRET).toBeTruthy();
	});
});
