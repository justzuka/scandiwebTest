import React from "react";
import "./Navbar.css";
import Category from "./Category";
import logo from "./SVGs/a-logo.svg";
import DropDown from "./DropDown";
import Cart from "./Cart";
class Navbar extends React.Component {
	state = {
		showBackground: this.props.showCartDef,
	};

	setShowBackground = (val) => {
		this.setState({ showBackground: val });
	};

	render() {
		return (
			<>
				{this.state.showBackground && <div className="grayBackground"></div>}
				<div className="navbar">
					<div className="categories">
						{this.props.categories.map((name, index) => {
							let isActive = index === this.props.activeCategory;
							if (this.props.categoryName) {
								isActive = this.props.categoryName === name;
							}
							return (
								<Category
									navigate={this.props.navigate}
									key={name}
									name={name}
									isActive={isActive}
									index={index}
								/>
							);
						})}
					</div>
					<div className="logo">
						<img src={logo} alt="logo" />
					</div>
					<div className="dropDownAndCart">
						<DropDown
							activeCurrency={this.props.activeCurrency}
							currencies={this.props.currencies}
							setActiveCurrency={this.props.setActiveCurrency}
						/>
						<Cart
							order={this.props.order}
							showCartDef={this.props.showCartDef}
							navigate={this.props.navigate}
							setShowBackground={this.setShowBackground}
							increaseCount={this.props.increaseCount}
							decreaseCount={this.props.decreaseCount}
							activeCurrency={this.props.activeCurrency}
							cartProducts={this.props.cartProducts}
							cartCounts={this.props.cartCounts}
						/>
					</div>
				</div>
			</>
		);
	}
}

export default Navbar;
