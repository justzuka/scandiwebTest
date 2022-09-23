import React from "react";
import Item from "./Item";
import "./Items.css";
class Items extends React.Component {
	componentDidMount() {}
	render() {
		return (
			<div className="itemsContainer">
				<div className="categoryName">{this.props.categoryName}</div>
				<div className="itemsGrid">
					{this.props.products.map((product) => {
						let price = product.prices.find(
							(price) =>
								price.currency.symbol === this.props.activeCurrencySymbol
						);

						return (
							<Item
								product={product}
								addCartProduct={this.props.addCartProduct}
								attributes={product.attributes}
								inStock={product.inStock}
								navigate={this.props.navigate}
								key={product.id}
								id={product.id}
								name={product.name}
								photo={product.gallery[0]}
								price={this.props.activeCurrencySymbol + " " + price.amount}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Items;
