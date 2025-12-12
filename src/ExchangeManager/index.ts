import * as ccxt from 'ccxt';

class ExchangeManager {
	public exchange: ccxt.binance | undefined = undefined;

	public async initialize(): Promise<void> {
		try {
			this.exchange = await this.createExchange();
		} catch (err) {
			console.error(err);
		}
	}

	private async createExchange(): Promise<ccxt.binance | undefined> {
		const apiKey = process.env.API_KEY || '';
		const secret = process.env.SECRET || '';

		if (!apiKey || !secret) {
			throw new Error('apiKey or secret are missing.');
		}

		const exchange = new ccxt.binance({
			apiKey,
			secret,
			enableRateLimit: true,
			options: {
				adjustForTimeDifference: true,
			},
		});

		const isAuthenticated = await this.checkAuthentication(exchange);

		if (isAuthenticated) {
			return exchange;
		}
	}

	private async checkAuthentication(exchange: ccxt.binance): Promise<boolean> {
		try {
			await exchange.fetchBalance((balance: ccxt.Balances) => balance);

			console.log('Authenticated');
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}
}

export default ExchangeManager;
