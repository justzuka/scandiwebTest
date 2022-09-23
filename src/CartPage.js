import React from "react";
import Line from "./Line";
import "./CartPage.css";
import CartItemsList from "./CartItemsList";
import Total from "./Total";
class CartPage extends React.Component {
	render() {
		return (
			<>
				{this.props.NavbarComp}
				<div className="cartPageContainer">
					<div className="cartPageCartHeader">Cart</div>
					<Line />
					<CartItemsList
						hasLine={true}
						isBigger={true}
						increaseCount={this.props.increaseCount}
						decreaseCount={this.props.decreaseCount}
						activeCurrency={this.props.activeCurrency}
						cartProducts={this.props.cartProducts}
						cartCounts={this.props.cartCounts}
					/>

					<Total
						order={this.props.order}
						isForCartPage={true}
						activeCurrency={this.props.activeCurrency}
						cartProducts={this.props.cartProducts}
						cartCounts={this.props.cartCounts}
					/>
				</div>
			</>
		);
	}
}

export default CartPage;
