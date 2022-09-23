import React from "react";
import "./DropDown.css";
import arrow from "./SVGs/Vector.svg";
class DropDown extends React.Component {
	state = {
		show: false,
	};

	toggleShow = () => {
		this.setState((prev) => ({ show: !prev.show }));
	};

	componentDidMount() {}

	render() {
		return (
			<div className="mainContainer">
				<div className={`dropDownList ${!this.state.show && "dontShow"}`}>
					{this.props.currencies.map((cur, index) => {
						if (index === this.props.activeCurrency) {
							return;
						}

						return (
							<button
								onClick={() => this.props.setActiveCurrency(index)}
								key={index}
								className="listComponent"
							>
								{cur.symbol} {cur.label}
							</button>
						);
					})}
				</div>

				<button className="container" onClick={this.toggleShow}>
					<div className="symbolContainer">
						{this.props.currencies.map((cur, index) => {
							if (index !== this.props.activeCurrency) {
								return;
							}
							return (
								<div key={index} className="symbol">
									{cur.symbol}
								</div>
							);
						})}
					</div>
					<div className="imgContainer">
						<img src={arrow} alt="" />
					</div>
				</button>
			</div>
		);
	}
}

export default DropDown;
