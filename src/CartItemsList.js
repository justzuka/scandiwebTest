import React from "react";
import plus from "./SVGs/Plus.svg";
import minus from "./SVGs/Minus.svg";
import Attribute from "./Attribute";
import Line from "./Line";
class CartItemsList extends React.Component {
	state = {
		cartCount: this.props.cartCounts
			.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
			.toString(),
	};

	render() {
		return (
			<div className="cartDropDownItemsList">
				{this.props.cartProducts.map((product, index) => {
					if (this.props.cartCounts[index] === 0) {
						return "";
					}
					return (
						<div key={index}>
							<div
								key={index}
								className={`cartDropDownItem
								${!this.props.isBigger && "forCartDropDown"}`}
							>
								<div className="cartFirst">
									<div className={this.props.isBigger && "bigBrand"}>
										{product.brand}
									</div>
									<div className={this.props.isBigger && "bigName"}>
										{product.name}
									</div>
									<div className="cartDropDownPrice">
										{product.prices.length !== 0 && (
											<div
												className={
													this.props.isBigger ? "bigPrice" : "cartDropDownPrice"
												}
											>
												{
													product.prices[this.props.activeCurrency].currency
														.symbol
												}
												{product.prices[
													this.props.activeCurrency
												].amount.toFixed(2)}
											</div>
										)}{" "}
									</div>
									{product.attributes.map((attribute, index) => {
										return (
											<Attribute
												forCartDropDown={this.props.isBigger ? false : true}
												isInteractable={false}
												attributeIndex={index}
												key={index}
												actives={product.actives}
												type={attribute.name}
												items={attribute.items}
											/>
										);
									})}
								</div>

								<div className="cartSecond">
									<div className="cartCount">
										<button
											onClick={() => {
												this.props.increaseCount(index);
											}}
											className="addSub"
										>
											<img src={plus} alt="" />
										</button>
										<div> {this.props.cartCounts[index]}</div>
										<button
											onClick={() => {
												this.props.decreaseCount(index);
											}}
											className="addSub"
										>
											<img src={minus} alt="" />
										</button>
									</div>
									<img src={product.photo} alt="" />
								</div>
							</div>
							{this.props.hasLine && <Line />}
						</div>
					);
				})}
			</div>
		);
	}
}

export default CartItemsList;
