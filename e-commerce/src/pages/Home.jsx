import React from "react";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Query from "../components/Query";
import Footer from "../components/Footer";

const Home = () => {
	return (
		<div>
			<Navbar />
			<Slider />
			<Categories />
			<Query />
			<Footer />
		</div>
	);
};

export default Home;
