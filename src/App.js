import "./App.css";
import React from "react";
import Home from "./Home";
import ItemPage from "./ItemPage";
import Navbar from "./Navbar";
import Items from "./Items";
import { gql } from "@apollo/client";
import { client } from "./index";
import { useParams } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CartPage from "./CartPage";
import Cart from "./Cart";
class App extends React.Component {
	constructor(props) {
		super(props);
		this.backListener = null;
	}

	state = {
		categories: [],
		activeCategory: 0,
		currencies: [],
		activeCurrency: 0,
		products: [],
		cartProducts: [],
		cartCounts: [],
		showCart: false,
	};

	order = () => {
		this.setState({ cartProducts: [], cartCounts: [], showCart: false });
	};

	checkIfAlreadyExists = (input) => {
		for (let i = 0; i < this.state.cartProducts.length; i++) {
			const product = this.state.cartProducts[i];
			if (input.name === product.name) {
				let isSame = true;

				for (let j = 0; j < input.actives.length; j++) {
					if (input.actives[j] !== product.actives[j]) {
						isSame = false;
						break;
					}
				}

				if (isSame) {
					return { exists: true, index: i };
				}
			}
		}
		return { exists: false, index: 0 };
	};

	addCartProduct = (input) => {
		const info = this.checkIfAlreadyExists(input);
		if (info.exists) {
			let arr = this.state.cartCounts;
			arr[info.index] += 1;
			this.setState((prevState) => ({
				cartCounts: arr,
				showCart: false,
			}));
		} else {
			this.setState((prevState) => ({
				cartProducts: [...prevState.cartProducts, input],
				cartCounts: [...prevState.cartCounts, 1],
				showCart: false,
			}));
		}
	};

	setCategories = (input) => {
		const newArr = input.map((e) => e.name);
		this.setState({ categories: newArr, showCart: false });
	};

	setActiveCategory = (index) => {
		if (window.location.pathname === "/") {
			this.setState({ activeCategory: index, showCart: false });
		}
	};
	setCurrencies = (input) => {
		this.setState({ currencies: input, showCart: false });
	};

	setProducts = (input) => {
		this.setState({ products: input, showCart: false });
	};

	setActiveCurrency = (index) => {
		this.setState({ activeCurrency: index, showCart: false });
	};

	increaseCount = (index) => {
		let arr = this.state.cartCounts;
		arr[index] = arr[index] + 1;
		this.setState({ cartCounts: arr, showCart: true });
	};

	decreaseCount = (index) => {
		let arr = this.state.cartCounts;

		if (arr[index] !== 0) {
			arr[index] = arr[index] - 1;
			this.setState({ cartCounts: arr, showCart: true });
		}
	};

	increaseCountCartPage = (index) => {
		let arr = this.state.cartCounts;
		arr[index] = arr[index] + 1;
		this.setState({ cartCounts: arr, showCart: false });
	};

	decreaseCountCartPage = (index) => {
		let arr = this.state.cartCounts;

		if (arr[index] !== 0) {
			arr[index] = arr[index] - 1;
			this.setState({ cartCounts: arr, showCart: false });
		}
	};
	componentDidMount() {
		let newState = localStorage.getItem("state");

		if (newState !== "") {
			newState = JSON.parse(newState);
			this.setState(newState);
		}

		client
			.query({
				query: gql`
					{
						categories {
							name
						}

						currencies {
							label
							symbol
						}

						category(input:{title:"${
							this.state.categories.length !== 0
								? this.state.categories[this.state.activeCategory]
								: "all"
						}"}){
							products{
							  name
							  id
							  gallery
							  inStock
							  brand
							  prices{
								amount
								currency{
								  label
								  symbol
								}
							  }
							  attributes{
								id
							  }
							}
						}
					}
				`,
			})
			.then((result) => {
				this.setCategories(result.data.categories);
				this.setCurrencies(result.data.currencies);
				this.setProducts(result.data.category.products);
			});
	}

	componentDidUpdate(prevProps, prevState) {
		localStorage.setItem("state", JSON.stringify(this.state));

		if (prevState.activeCategory !== this.state.activeCategory) {
			client
				.query({
					query: gql`
					{
						category(input:{title:"${
							this.state.categories.length !== 0
								? this.state.categories[this.state.activeCategory]
								: "all"
						}"}){
							products{
							  name
							  id
							  gallery
							  inStock
							  brand
							  prices{
								amount
								currency{
								  label
								  symbol
								}
							  }
							  attributes{
								id
							  }

							}
						}
					}
				`,
				})
				.then((result) => {
					this.setProducts(result.data.category.products);
				});
		}
	}

	render() {
		const NavbarComp = () => {
			const navigate = useNavigate();
			return (
				<Navbar
					order={this.order}
					navigate={navigate}
					decreaseCount={this.decreaseCount}
					showCartDef={this.state.showCart}
					increaseCount={this.increaseCount}
					cartCounts={this.state.cartCounts}
					cartProducts={this.state.cartProducts}
					activeCategory={this.state.activeCategory}
					categories={this.state.categories}
					currencies={this.state.currencies}
					activeCurrency={this.state.activeCurrency}
					setActiveCurrency={this.setActiveCurrency}
					setActiveCategory={this.setActiveCategory}
				/>
			);
		};

		const Wrapper = () => {
			const params = useParams();

			return (
				<ItemPage
					activeCurrency={
						this.state.currencies.length !== 0
							? this.state.currencies[this.state.activeCurrency].symbol
							: "$"
					}
					id={params.id}
					addCartProduct={this.addCartProduct}
					NavbarComp={<NavbarComp />}
				></ItemPage>
			);
		};

		const ItemsComp = () => {
			const navigate = useNavigate();
			return (
				<Items
					addCartProduct={this.addCartProduct}
					navigate={navigate}
					categoryName={this.state.categories[this.state.activeCategory]}
					products={this.state.products}
					activeCurrencySymbol={
						this.state.currencies.length !== 0
							? this.state.currencies[this.state.activeCurrency].symbol
							: "non"
					}
				/>
			);
		};

		const CartPageComp = () => {
			return (
				<CartPage
					order={this.order}
					increaseCount={this.increaseCountCartPage}
					decreaseCount={this.decreaseCountCartPage}
					activeCurrency={this.state.activeCurrency}
					cartProducts={this.state.cartProducts}
					cartCounts={this.state.cartCounts}
					NavbarComp={<NavbarComp />}
				/>
			);
		};

		return (
			<>
				<div className="app">
					<BrowserRouter>
						<Routes>
							<Route
								exact
								path="/"
								element={
									<Home NavbarComp={<NavbarComp />} ItemsComp={<ItemsComp />} />
								}
							/>
							<Route exact path="/item/:id" element={<Wrapper />} />
							<Route exact path="/cartpage" element={<CartPageComp />} />
							<Route exact path="*" element={<div>Error</div>} />
						</Routes>
					</BrowserRouter>
				</div>
			</>
		);
	}
}

export default App;
