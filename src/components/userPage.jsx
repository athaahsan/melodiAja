import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react';
import dropmenu from "./dropmenu.jsx"
import stats from "./stats.jsx";
import "./styles/userPage.css"

const userPageModel = (() => {
	const fetchInfo = async(setter) => {
		const {id} = useParams();

		useEffect(() => {
			if(id == "me") {
				setter( {
					name: "Heidi Bournevilla",
					username: "heidinOne",
					pfpPath: "/defaults/defaultFemale.jpg",
					nFollowers: 200,
					nMusics: 10,
					nCollections: 5000, // Album + playlist
				})
			} else {
				fetch(`https://reqres.in/api/users/${id}`)
					.then((response) => {
						if(response.ok) {
							return response.json();
						}
						throw new Error();
					})
					.then((response) => response["data"])
					.then((data) => {
						setter({
							name: `${data["first_name"]} ${data["last_name"]}`,
							username: `${data["first_name"][0]}${data["last_name"]}`,
							pfpPath: data["avatar"],
							nFollowers: 200,
							nMusics: 10,
							nCollections: 5000, // Album + playlist
						});
					})
					.catch((err) => {
						console.log(err);
						setter({
							name: "UserFetchError",
							username: "userFetchError",
							pfpPath: "/img/user.png",
							nFollowers: -1,
							nMusics: -1,
							nCollections: -1,
						});
					});
			}
		}, [id]);
	}

	return {fetchInfo} 
})()

const userPageView = (() => {
	let Stats = stats().render;
	let dropmenuObj = dropmenu("userSetting");
	let Dropmenu = dropmenuObj.render;

	function render({name, username, pfpPath, nFollowers, nMusics, nCollections}) {
		const userID = useParams().id
		const isOtherUser = nCollections > -1 && userID !== "me"
		return (
			<section id="userPage">
				<section id="userPage__top">
					<div className="userPage__imgWrapper" >
						<img src={pfpPath} alt={`${username}'s picture`} />
					</div>
					<div id="userPage__profileSect">
						<div id="profileSect__profile">
							<div className="profile__names">
								<p className="profile__name"> {name} </p>
								<p className="profile__username"> {`@${username}`} </p>
							</div>
							{
								(!isOtherUser)? (
									<div className="profile__settings">
										<div className="icon icon--small" 
											onClick={() => dropmenuObj.toggle()}>
											<img src="/icons/setting.png" alt="Settings Icon" />
										</div>
										<Dropmenu
											menuList={[
												{
													name: "Change Password",
													handler: () => window.location.replace("/changePassword")
												},
												{
													name: "Account Settings",
													handler: () => {
													}
												}
											]}
										/>
									</div>
								): (
									<></>
								)
							}
						</div>
						<Stats opts= {
								{
									"border": true,
								}
							}
							statsItems={
								{
								"Followers": [nFollowers], 
								"Musics": [nMusics], 
								"Collections": [nCollections]
								}
							} 
						/>
						{
							(isOtherUser)? (
								<section id="profileSect__actions">
									<button type="button" id="button--follow" className="hover--bright"> Follow </button>
									<button type="button" id="button--share" className="hover--bright"> Share </button>
								</section>
							):(
								<></>
							)
						}
					</div>
				</section>
			</section>
		)
	}

	return {render}
})()

function UserPage() {
	let model = userPageModel;
	let view = userPageView;

	const render = () => {
		const [currentUser, setCurrentUser] = useState({
			name: "...", 
			username: "...", 
			pfpPath: "/img/Load_gif2.gif", 
			nFollowers: -1, 
			nMusics: -1, 
			nCollections: -1
		});

		model.fetchInfo(setCurrentUser);
		return view.render(currentUser);
	}

	return {render};
}

let userPage = UserPage();
export default {
	render: userPage.render,
};
