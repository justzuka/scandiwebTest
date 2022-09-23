import React from "react";
import cartSVG from "./SVGs/Cart.svg";
import "./Item.css";
class Item extends React.Component {
	render() {
		return (
			<div
				className={`${
					this.props.inStock
						? "itemContainerNoHover"
						: this.props.attributes && this.props.attributes.length === 0
						? "itemContainerNoAttributes"
						: "itemContainer"
				}`}
				onClick={() => {
					if (!this.props.inStock) {
						this.props.navigate(`/item/${this.props.id}`);
					}
				}}
			>
				{this.props.inStock && (
					<div className="outOfStock">
						<div className="outOfStockText"> OUT OF STOCK</div>
					</div>
				)}
				<div className="photoContainer">
					<img className="itemPhoto" src={this.props.photo} alt="dadad" />
				</div>
				<button
					className="itemCartContainer"
					onClick={(e) => {
						e.stopPropagation();
						this.props.addCartProduct({
							...this.props.product,
							photo: this.props.photo,
							actives: [],
						});
					}}
				>
					<img className="itemCart" src={cartSVG} alt="cart" />
				</button>
				<div className="itemName">{this.props.name}</div>
				<div className="itemPrice">{this.props.price}</div>
			</div>
		);
	}
}

export default Item;
