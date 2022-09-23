import React from "react";

import "./Total.css";
class Total extends React.Component {
	state = {
		cartCount: this.props.cartCounts
			.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
			.toString(),
		total:
			Math.floor(
				this.props.cartProducts
					.map((product, index) => {
						if (product.prices.length !== 0) {
							return (
								product.prices[this.props.activeCurrency].amount *
								this.props.cartCounts[index]
							);
						}
						return 0;
					})
					.reduce(
						(previousValue, currentValue) => previousValue + currentValue,
						0
					) * 100
			) / 100,
	};

	render() {
		if (this.props.isForCartPage) {
			return (
				<div className="forCartPageContainer">
					<div className="tax">
						<div className="txt">Tax 20%:</div>
						<div className="val">
							{this.props.cartProducts.length === 0
								? ""
								: this.props.cartProducts[0].prices[this.props.activeCurrency]
										.currency.symbol}
							{Math.floor((this.state.total / 5) * 100) / 100}
						</div>
					</div>
					<div className="quantity">
						<div className="txt">Quantity:</div>
						<div className="val">{this.state.cartCount}</div>
					</div>
					<div className="totalContainerCartPage">
						<div className="ttl">Total:</div>
						<div className="prc">
							{this.props.cartProducts.length === 0
								? ""
								: this.props.cartProducts[0].prices[this.props.activeCurrency]
										.currency.symbol}
							{this.state.total}
						</div>
					</div>

					<button onClick={this.props.order} className="order">
						ORDER
					</button>
				</div>
			);
		}

		return (
			<div className="totalContainer">
				<div className="ttl">Total</div>
				<div className="prc">
					{this.props.cartProducts.length === 0
						? ""
						: this.props.cartProducts[0].prices[this.props.activeCurrency]
								.currency.symbol}
					{this.state.total}
				</div>
			</div>
		);
	}
}

export default Total;
