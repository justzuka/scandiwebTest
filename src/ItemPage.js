import React from "react";
import { gql } from "@apollo/client";
import { client } from "./index";
import "./ItemPage.css";
import Attribute from "./Attribute";
import Parser from "html-react-parser";
class ItemPage extends React.Component {
	state = {
		gallery: [],
		prices: [],
		attributes: [],
		brand: "",
		name: "",
		description: "",
		actives: [],
	};

	changeActives = (attributeIndex, index) => {
		let arr = this.state.actives;
		arr[attributeIndex] = index;
		this.setState({ actives: arr });
	};

	handleAddToCart = () => {
		const prod = {
			photo: this.state.gallery[0],
			prices: this.state.prices,
			brand: this.state.brand,
			name: this.state.name,
			actives: this.state.actives,
			attributes: this.state.attributes,
		};
		this.props.addCartProduct(prod);
	};

	componentDidMount() {
		client
			.query({
				query: gql`
					{
						product(id: "${this.props.id.toString()}") {
							id,
                            name,
                            gallery,
                            description,
                            category,
							inStock,
                            brand,
                            attributes{
                                id,
                                name,
                                type,
                                items{
                                    displayValue,
                                    value,
                                    id,

                                }
                            }

							prices{
								amount
								currency{
								  label
								  symbol
								}
							}
						}
					}
				`,
			})
			.then((result) => {
				const product = result.data.product;
				let actvs = [];

				for (let i = 0; i < product.attributes.length; i++) {
					actvs.push(0);
				}
				this.setState({
					gallery: product.gallery,
					prices: product.prices,
					attributes: product.attributes,
					brand: product.brand,
					name: product.name,
					description: product.description,
					actives: actvs,
				});
			});
	}

	render() {
		return (
			<>
				{this.props.NavbarComp}
				<div className="itemPageContainer">
					<div className="itemPagePhotos">
						{this.state.gallery.map((photo, index) => {
							if (index === 0) {
								return "";
							}

							return (
								<div key={index} className="itemPagePhotoContainer">
									<img className="itemPageSmallPhoto" src={photo} alt="photo" />
								</div>
							);
						})}
					</div>
					<div className="itemPageBigPhotoContainer">
						<img
							className="itemPageBigPhoto"
							src={this.state.gallery[0]}
							alt="bigPhoto"
						/>
					</div>

					<div className="info">
						<div className="itemPageBrand">{this.state.brand}</div>
						<div className="itemPageName">{this.state.name}</div>

						<div className="itemPageAttributesContainer">
							{this.state.attributes.map((attribute, index) => {
								return (
									<Attribute
										isInteractable={true}
										changeActives={this.changeActives}
										attributeIndex={index}
										key={index}
										actives={this.state.actives}
										type={attribute.name}
										items={attribute.items}
									/>
								);
							})}

							<div>
								<div className="itemPagePriceContainer">PRICE:</div>
								<div className="itemPagePrice">
									{this.props.activeCurrency}
									{this.state.prices.length !== 0 &&
										this.state.prices.find((e) => {
											return e.currency.symbol === this.props.activeCurrency;
										}).amount}
								</div>
							</div>

							<button
								onClick={this.handleAddToCart}
								className="itemPageAddToCart"
							>
								ADD TO CART
							</button>

							<div className="itemPageDescription">
								{Parser(this.state.description)}
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default ItemPage;
