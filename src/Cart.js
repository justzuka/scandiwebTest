import React from "react";
import "./Cart.css";
import cart from "./SVGs/CartGray.svg";
import Total from "./Total";
import CartItemsList from "./CartItemsList";
class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

	componentDidMount() {
		this.myRef.current.scrollBy({
			top: localStorage.getItem("cartDropDownScroll"),
		});
	}
	state = {
		showCart: this.props.showCartDef,
		cartCount: this.props.cartCounts
			.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
			.toString(),
	};
	toggleShowCart = () => {
		this.setState((prevState) => {
			this.props.setShowBackground(!prevState.showCart);
			return { showCart: !prevState.showCart };
		});
	};

	onScroll = (e) => {
		localStorage.setItem("cartDropDownScroll", e.target.scrollTop);
	};

	render() {
		return (
			<div className="cartAllContainer">
				<div
					ref={this.myRef}
					onScroll={this.onScroll}
					className={`cartDropDown ${
						this.state.showCart && "cartDropDownActive"
					}`}
				>
					<div className="cartStart">
						<div className="cartMyBag">My bag,</div>
						<div className="cartItemsCount">{this.state.cartCount} items</div>
					</div>

					<CartItemsList
						increaseCount={this.props.increaseCount}
						decreaseCount={this.props.decreaseCount}
						activeCurrency={this.props.activeCurrency}
						cartProducts={this.props.cartProducts}
						cartCounts={this.props.cartCounts}
					/>

					<Total
						activeCurrency={this.props.activeCurrency}
						cartProducts={this.props.cartProducts}
						cartCounts={this.props.cartCounts}
					/>

					<div className="cartTwoButtons">
						<button
							onClick={() => {
								this.props.navigate("/cartpage");
							}}
							className="cartViewBagButton"
						>
							VIEW BAG
						</button>
						<button onClick={this.props.order} className="cartCheckoutButton">
							CHECKOUT
						</button>
					</div>
				</div>

				<button onClick={this.toggleShowCart}>
					<div
						className={
							this.state.cartCount === "0"
								? "cartCounterDisplayNone"
								: "cartCounter"
						}
					>
						<div className="cartCounterText">{this.state.cartCount}</div>
					</div>
					<img src={cart} alt="" />
				</button>
			</div>
		);
	}
}

export default Cart;
