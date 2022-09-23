import React from "react";

import "./Home.css";
class Home extends React.Component {
	render() {
		return (
			<div className="homeContainer">
				{this.props.NavbarComp}
				{this.props.ItemsComp}
			</div>
		);
	}
}

export default Home;
