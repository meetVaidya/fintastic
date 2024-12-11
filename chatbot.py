from flask import Flask, request, jsonify
import yfinance as yf

app = Flask(__name__)

# Class to manage stock transactions and portfolio
class StockTradingBot:
    def __init__(self, balance=0):
        self.balance = balance
        self.portfolio = {}  # Dictionary to store stocks and their quantities
        self.transaction_history = []  # List to track transaction details

    def deposit_funds(self, amount):
        """Deposit funds into the account."""
        self.balance += amount
        return f"${amount} has been deposited. Current balance: ${self.balance}"

    def check_balance(self):
        """Check the current account balance."""
        return f"Current balance: ${self.balance}"

    def buy_shares(self, ticker, num_shares):
        """Buy shares of a stock."""
        stock = yf.Ticker(ticker)
        try:
            # Fetch real-time price
            current_price = stock.history(period="1d")['Close'][0]
        except Exception:
            return f"Unable to fetch data for {ticker}. Please check the ticker symbol and try again."

        total_cost = current_price * num_shares
        if self.balance >= total_cost:
            self.balance -= total_cost
            self.portfolio[ticker] = self.portfolio.get(ticker, 0) + num_shares
            self.transaction_history.append(f"Bought {num_shares} shares of {ticker} at ${current_price:.2f} each.")
            return f"Bought {num_shares} shares of {ticker} for ${total_cost:.2f}. Remaining balance: ${self.balance:.2f}"
        else:
            return f"Not enough funds to buy {num_shares} shares of {ticker}. You need ${total_cost:.2f}, but only have ${self.balance:.2f}."

    def sell_shares(self, ticker, num_shares):
        """Sell shares of a stock."""
        stock = yf.Ticker(ticker)
        try:
            # Fetch real-time price
            current_price = stock.history(period="1d")['Close'][0]
        except Exception:
            return f"Unable to fetch data for {ticker}. Please check the ticker symbol and try again."

        if ticker in self.portfolio and self.portfolio[ticker] >= num_shares:
            total_sale = current_price * num_shares
            self.balance += total_sale
            self.portfolio[ticker] -= num_shares
            if self.portfolio[ticker] == 0:
                del self.portfolio[ticker]
            self.transaction_history.append(f"Sold {num_shares} shares of {ticker} at ${current_price:.2f} each.")
            return f"Sold {num_shares} shares of {ticker} for ${total_sale:.2f}. New balance: ${self.balance:.2f}"
        else:
            return f"Not enough shares of {ticker} to sell. You own {self.portfolio.get(ticker, 0)} shares."

    def view_portfolio(self):
        """View current portfolio with real-time values."""
        portfolio_summary = {}
        total_value = 0.0
        for ticker, shares in self.portfolio.items():
            stock = yf.Ticker(ticker)
            try:
                current_price = stock.history(period="1d")['Close'][0]
                value = current_price * shares
                portfolio_summary[ticker] = {
                    "shares": shares,
                    "current_price": round(current_price, 2),
                    "value": round(value, 2),
                }
                total_value += value
            except Exception:
                portfolio_summary[ticker] = {"shares": shares, "current_price": "N/A", "value": "N/A"}

        return {"portfolio": portfolio_summary, "total_value": round(total_value, 2), "balance": round(self.balance, 2)}

    def view_transactions(self):
        """View transaction history."""
        return {"transactions": self.transaction_history}

    def get_stock_price(self, ticker):
        """Fetch real-time stock price."""
        stock = yf.Ticker(ticker)
        try:
            current_price = stock.history(period="1d")['Close'][0]
            return {"ticker": ticker, "current_price": round(current_price, 2)}
        except Exception:
            return {"error": f"Unable to fetch data for {ticker}. Please check the ticker symbol and try again."}


# Initialize the bot
bot = StockTradingBot()

# Flask API Endpoints
@app.route('/deposit', methods=['POST'])
def deposit():
    """API endpoint to deposit funds."""
    data = request.get_json()
    amount = data.get('amount')
    if not isinstance(amount, (int, float)) or amount <= 0:
        return jsonify({"error": "Invalid amount. Please provide a positive number."}), 400
    return jsonify({"message": bot.deposit_funds(amount)})

@app.route('/balance', methods=['GET'])
def balance():
    """API endpoint to check account balance."""
    return jsonify({"balance": bot.check_balance()})

@app.route('/buy', methods=['POST'])
def buy():
    """API endpoint to buy shares."""
    data = request.get_json()
    ticker = data.get('ticker')
    num_shares = data.get('num_shares')
    if not ticker or not isinstance(num_shares, int) or num_shares <= 0:
        return jsonify({"error": "Invalid input. Provide a valid ticker and positive number of shares."}), 400
    return jsonify({"message": bot.buy_shares(ticker.upper(), num_shares)})

@app.route('/sell', methods=['POST'])
def sell():
    """API endpoint to sell shares."""
    data = request.get_json()
    ticker = data.get('ticker')
    num_shares = data.get('num_shares')
    if not ticker or not isinstance(num_shares, int) or num_shares <= 0:
        return jsonify({"error": "Invalid input. Provide a valid ticker and positive number of shares."}), 400
    return jsonify({"message": bot.sell_shares(ticker.upper(), num_shares)})

@app.route('/portfolio', methods=['GET'])
def portfolio():
    """API endpoint to view portfolio."""
    return jsonify(bot.view_portfolio())

@app.route('/transactions', methods=['GET'])
def transactions():
    """API endpoint to view transaction history."""
    return jsonify(bot.view_transactions())

@app.route('/stock_price/<ticker>', methods=['GET'])
def stock_price(ticker):
    """API endpoint to get real-time stock price."""
    return jsonify(bot.get_stock_price(ticker.upper()))

@app.route('/')
def home():
    """API root endpoint."""
    return jsonify({"message": "Welcome to the FinTastic Stock Trading API. Use the endpoints to interact with your portfolio."})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
