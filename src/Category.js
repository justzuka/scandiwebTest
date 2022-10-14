import React from "react";
import "./Category.css";
class Category extends React.Component {
	componentDidMount() {}

	render() {
		return (
			<button
				className={`category ${this.props.isActive && "active"}`}
				onClick={() => {
					this.props.navigate(`/${this.props.name}`);
				}}
			>
				<div>{this.props.name}</div>
			</button>
		);
	}
}

export default Category;
