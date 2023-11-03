import "./styles/stats.css"

const statsView = (() => {
	function render({type, statsItems}) {
		switch(type) {
			case "user":
				console.log(statsItems)
				let {nFollowers, nMusics, nCollections} = statsItems;
				return (
					<section id="profileSect__stats" className="stats">
						<div className="stats__item">
							<p>{nFollowers} <span className="stats__criteria"> Followers </span> </p>
						</div>
						<div className="stats__item">
							<p>{nMusics} <span className="stats__criteria"> Musics </span> </p>
						</div>
						<div className="stats__item">
							<p>{nCollections} <span className="stats__criteria"> Collections </span> </p>
						</div>
					</section>
				)
			default:
		}
	}

	return {render}
})()

function Stats() {
	let view = statsView

	const render = (props) => {
		return view.render(props);
	}

	return {render};
}

let stats = Stats();
export default {
	render: () => stats.render
};
