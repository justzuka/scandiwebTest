import React from "react";

import "./Attribute.css";
class Attribute extends React.Component {
	render() {
		if (this.props.type.toLowerCase() === "color") {
			return (
				<div
					className={`${
						this.props.forCartDropDown && "forCartDropDown"
					} attributeContainer`}
				>
					<div
						className={`attributeType ${
							this.props.forCartDropDown && "attributeTypeCapitalize"
						}`}
					>
						{this.props.forCartDropDown ? "Color:" : "COLOR:"}
					</div>
					<div className="attributesList">
						{this.props.items.map((item, index) => {
							let col = item.value;
							if (col.toLowerCase() === "#ffffff") {
								col = "#f2f2f2";
							}
							return (
								<button
									onClick={() => {
										if (this.props.isInteractable) {
											this.props.changeActives(
												this.props.attributeIndex,
												index
											);
										}
									}}
									key={item.value}
									className={`colorItemContainer ${
										this.props.actives[this.props.attributeIndex] === index
											? "activeItem"
											: ""
									}`}
								>
									<div
										className="colorItem "
										style={{ backgroundColor: col }}
									></div>
								</button>
							);
						})}
					</div>
				</div>
			);
		}

		return (
			<div
				className={`${
					this.props.forCartDropDown && "forCartDropDown"
				} attributeContainer`}
			>
				<div
					className={`attributeType ${
						this.props.forCartDropDown && "attributeTypeCapitalize"
					}`}
				>
					{this.props.type}:
				</div>
				<div className="attributesList">
					{this.props.items.map((item, index) => {
						return (
							<button
								onClick={() => {
									if (this.props.isInteractable) {
										this.props.changeActives(this.props.attributeIndex, index);
									}
								}}
								key={item.value}
								className={`attributeItemContainer ${
									this.props.actives[this.props.attributeIndex] === index
										? "attributeActiveItem"
										: ""
								}`}
							>
								<div className="attributeItem">{item.value}</div>
							</button>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Attribute;
