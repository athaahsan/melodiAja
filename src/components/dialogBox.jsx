import "./styles/dialogBox.css"
import {useState} from "react";

const popUpView = () => {
	const render = (status, {id, heading}, {Component}) => {
		console.log(Component)
		return ( status.get == true? (
			<section id={`${id}Dialog`}>
				<div className="dialog__box">
					<div className="dialog__top">
						<h3 className="dialog__name"> {heading} </h3>
						<div className="icon icon--small"
							onClick = {() => status.set(false)}
						>
							<div className="icon icon--small">
								<img src="/icons/music.png" alt="close icon" />
							</div>
						</div>
					</div>
					<div className="dialog__body">
						<Component />
					</div>
				</div>
				<div className="dialog__shade" > </div>
			</section>
			): <></>
		)
	}
	
	return {render};
}

export default function popUp(popUpID, popUpName) {
	let view = popUpView();
	let props = {
		id: popUpID,
		heading: popUpName,
	};

	const render = (content) => {
		const [isShowing, setShowing] = useState(true);
		return view.render({get: isShowing, set: setShowing}, props, content);
	}

	return {render};
}
