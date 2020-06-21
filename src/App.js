import React, { Component } from "react";

import { weatherApi } from "./api/weatherApi";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: "",
			weather: {},
		};
	}

	search = async (e) => {
		if (e.key === "Enter") {
			const data = await weatherApi(this.state.query);
			this.setState({ weather: data });
			this.setState({ query: "" });
		}
	};

	render() {
		return (
			<div className="main-container">
				<input
					type="text"
					className="search"
					placeholder="Search..."
					value={this.state.query}
					onChange={(e) => this.setState({ query: e.target.value })}
					onKeyPress={this.search}
				/>
				{this.state.weather.main && (
					<div className="city">
						<h2 className="city-name">
							<span>{this.state.weather.name}</span>
							<sup>{this.state.weather.sys.country}</sup>
						</h2>
						<div className="city-temp">
							{Math.round(this.state.weather.main.temp)}
							<sup>&deg;C</sup>
						</div>
						<div className="info">
							<img
								className="city-icon"
								src={`https://openweathermap.org/img/wn/${this.state.weather.weather[0].icon}@2x.png`}
								alt={this.state.weather.weather[0].description}
							/>
							<p>{this.state.weather.weather[0].description}</p>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default App;
