import React from "react";
import Item from "./Item";
import "./Items.css";
class Items extends React.Component {
	state = {
		products: [],
		categoryName: "",
	};

	handleScroll = (event) => {
		sessionStorage.setItem("windowScroll", window.scrollY);
	};

	setProducts = (input) => {
		this.setState({ products: input });
	};
	setCategoryName = (input) => {
		this.setState({ categoryName: input });
	};

	getAndSetProducts = async () => {
		const pr = await this.props.getCurrentCategotyItems(
			this.props.categoryName
		);

		this.setProducts(pr);
	};

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll);
		this.getAndSetProducts();
	}
	componentDidUpdate() {
		if (this.state.categoryName !== this.props.categoryName) {
			this.setCategoryName(this.props.categoryName);
			this.getAndSetProducts();
		}

		window.scrollTo(0, sessionStorage.getItem("windowScroll"));
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}
	render() {
		return (
			<div className="itemsContainer">
				<div className="categoryName">{this.props.categoryName}</div>
				<div className="itemsGrid">
					{this.state.products.map((product) => {
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
								price={
									this.props.activeCurrencySymbol +
									" " +
									price.amount.toFixed(2)
								}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Items;
