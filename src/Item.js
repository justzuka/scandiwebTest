import React from "react";
import cartSVG from "./SVGs/Cart.svg";
import "./Item.css";
class Item extends React.Component {
	render() {
		return (
			<div
				className="itemContainer"
				onClick={() => {
					this.props.navigate(`/item/${this.props.id}`);
				}}
			>
				<div className="photoContainer">
					{!this.props.inStock && (
						<div className="outOfStock">
							<div className="outOfStockText"> OUT OF STOCK</div>
						</div>
					)}
					<img
						className={`itemPhoto ${!this.props.inStock && "opacity"}`}
						src={this.props.photo}
						alt="dadad"
					/>
				</div>
				{this.props.inStock && (
					<button
						className="itemCartContainer"
						onClick={(e) => {
							e.stopPropagation();
							let actvs = [];
							for (let i = 0; i < this.props.product.attributes.length; i++) {
								actvs.push(0);
							}

							this.props.addCartProduct({
								...this.props.product,
								photo: this.props.photo,
								actives: actvs,
							});
						}}
					>
						<img className="itemCart" src={cartSVG} alt="cart" />
					</button>
				)}
				<div className="itemName">{this.props.name}</div>
				<div className="itemPrice">{this.props.price}</div>
			</div>
		);
	}
}

export default Item;
