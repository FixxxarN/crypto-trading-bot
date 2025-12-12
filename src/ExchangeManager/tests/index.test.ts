import ccxt from 'ccxt';
import ExchangeManager from '..';

jest.mock('ccxt');

describe('ExchangeManager', () => {
	const previousEnvironmentVariables = { ...process.env };

	beforeEach(() => {
		process.env.API_KEY = 'fakeApiKey';
		process.env.SECRET = 'fakeSecret';
	});

	afterAll(() => {
		process.env = previousEnvironmentVariables;
	});

	it('should catch an error if apiKey is missing from process.env and log it', async () => {
		const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
		delete process.env.API_KEY;

		const exchangeManager = new ExchangeManager();
		await exchangeManager.initialize();

		expect(logSpy).toHaveBeenCalledWith(
			new Error('apiKey or secret are missing.')
		);
	});

	it('should catch an error if secret is missing from process.env and log it', async () => {
		const logSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
		delete process.env.SECRET;

		const exchangeManager = new ExchangeManager();
		await exchangeManager.initialize();

		expect(logSpy).toHaveBeenCalledWith(
			new Error('apiKey or secret are missing.')
		);
	});

	it('should fail authentication if fetchBalance throws an error', async () => {
		(ccxt.binance as jest.Mock).mockImplementation(() => ({
			fetchBalance: jest.fn(() => {
				throw new Error();
			}),
		}));

		const exchangeManager = new ExchangeManager();
		await exchangeManager.initialize();

		expect(exchangeManager.exchange).toBeUndefined();
	});

	it('should not fail authentication if fetchBalance returns a balance', async () => {
		(ccxt.binance as jest.Mock).mockImplementation(() => ({
			fetchBalance: jest.fn(() => 100),
		}));

		const exchangeManager = new ExchangeManager();
		await exchangeManager.initialize();

		expect(exchangeManager.exchange).not.toBeUndefined();
	});
});
