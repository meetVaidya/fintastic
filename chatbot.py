from flask import Flask, request, jsonify
import yfinance as yf

app = Flask(__name__)

# Class to simulate account and stock transactions
class StockTradingBot:
    def __init__(self, balance=0):
        self.balance = balance
        self.portfolio = {}
        self.transaction_history = []

    def deposit_funds(self, amount):
        self.balance += amount
        return f"${amount} has been deposited. Current balance: ${self.balance}"

    def check_balance(self):
        return f"Current balance: ${self.balance}"

    def buy_shares(self, ticker, num_shares):
        stock = yf.Ticker(ticker)
        try:
            current_price = stock.history(period="1d")['Close'][0]
        except IndexError:
            return f"Unable to fetch data for {ticker}. Please check the ticker and try again."
        
        total_cost = current_price * num_shares
        if self.balance >= total_cost:
            self.balance -= total_cost
            self.portfolio[ticker] = self.portfolio.get(ticker, 0) + num_shares
            self.transaction_history.append(f"Bought {num_shares} shares of {ticker} at ${current_price} each.")
            return f"Bought {num_shares} shares of {ticker} for ${total_cost}. Remaining balance: ${self.balance}"
        else:
            return f"Not enough funds to buy {num_shares} shares of {ticker}. You need ${total_cost}, but only have ${self.balance}."

    def sell_shares(self, ticker, num_shares):
        stock = yf.Ticker(ticker)
        try:
            current_price = stock.history(period="1d")['Close'][0]
        except IndexError:
            return f"Unable to fetch data for {ticker}. Please check the ticker and try again."
        
        if ticker in self.portfolio and self.portfolio[ticker] >= num_shares:
            total_sale = current_price * num_shares
            self.balance += total_sale
            self.portfolio[ticker] -= num_shares
            if self.portfolio[ticker] == 0:
                del self.portfolio[ticker]
            self.transaction_history.append(f"Sold {num_shares} shares of {ticker} at ${current_price} each.")
            return f"Sold {num_shares} shares of {ticker} for ${total_sale}. New balance: ${self.balance}"
        else:
            return f"Not enough shares of {ticker} to sell. You own {self.portfolio.get(ticker, 0)} shares."

    def view_portfolio(self):
        return {"portfolio": self.portfolio, "balance": self.balance}

    def view_transactions(self):
        return {"transactions": self.transaction_history}

# Initialize the bot
bot = StockTradingBot()

# Flask Routes
@app.route('/deposit', methods=['POST'])
def deposit():
    data = request.get_json()
    amount = data.get('amount')
    if not isinstance(amount, (int, float)) or amount <= 0:
        return jsonify({"error": "Invalid amount"}), 400
    return jsonify({"message": bot.deposit_funds(amount)})

@app.route('/balance', methods=['GET'])
def balance():
    return jsonify({"balance": bot.check_balance()})

@app.route('/buy', methods=['POST'])
def buy():
    data = request.get_json()
    ticker = data.get('ticker')
    num_shares = data.get('num_shares')
    if not ticker or not isinstance(num_shares, int) or num_shares <= 0:
        return jsonify({"error": "Invalid input"}), 400
    return jsonify({"message": bot.buy_shares(ticker.upper(), num_shares)})

@app.route('/sell', methods=['POST'])
def sell():
    data = request.get_json()
    ticker = data.get('ticker')
    num_shares = data.get('num_shares')
    if not ticker or not isinstance(num_shares, int) or num_shares <= 0:
        return jsonify({"error": "Invalid input"}), 400
    return jsonify({"message": bot.sell_shares(ticker.upper(), num_shares)})

@app.route('/portfolio', methods=['GET'])
def portfolio():
    return jsonify(bot.view_portfolio())

@app.route('/transactions', methods=['GET'])
def transactions():
    return jsonify(bot.view_transactions())

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Stock Trading Bot API. Use the documented endpoints to interact with the bot."})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
