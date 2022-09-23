import React from "react";
import "./Category.css";
class Category extends React.Component {
	componentDidMount() {}

	render() {
		return (
			<button
				className={`category ${this.props.isActive && "active"}`}
				onClick={() => {
					console.log(this.props.navigate);
					this.props.navigate(`/`);
					this.props.setActiveCategory(this.props.index);
				}}
			>
				<div>{this.props.name}</div>
			</button>
		);
	}
}

export default Category;
