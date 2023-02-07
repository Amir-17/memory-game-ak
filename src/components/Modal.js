import { useState } from "react";

function Modal({
	setHiddenMessage,
	closingAction,
	matchingCards,
	enableButton,
	EndGameTime,
	setPlayer,
	player,
	moves,
}) {
	const [playerMessage, setPlayerMessage] = useState(true);
	const [input, setInput] = useState("");

	const hideModal = () => {

		if (input.length === 0) {
			setPlayerMessage(false);
			return
		}

		closingAction();
		enableButton();
		setInput("");
		setHiddenMessage(false);

		let currentPlayer = {
			id: Math.random() * 100,
			player: input,
			finishedGame: EndGameTime,
			numberOfTurns: moves,
			isPlayer: true,
		};

		player.push(currentPlayer);

		let realPlayers = player.filter((a) => {
			return a.isPlayer;
		});

		realPlayers.sort((a, b) => a.numberOfTurns - b.numberOfTurns);

		let defaultPlayer = player.filter((a) => {
			return a.player === "unknown";
		});

		let listOfPlayers = [...realPlayers, ...defaultPlayer];
		while (listOfPlayers.length > 10) {
			listOfPlayers.pop();
		}

		setPlayer(listOfPlayers);
		localStorage.setItem("player", JSON.stringify(listOfPlayers));
		matchingCards.length = 0;
	};

	const handleChange = (e) => {
		
		setInput(e.target.value);
	};

	return (
		<div className="modal">
			<div className="modal_header">
				<h2>Well done you are in top 10 now!</h2>
				<h3>Please add your name.</h3>
			</div>
			<div className="modal_body">
				<input
					required
					value={input}
					type="text"
					className="input_name"
					placeholder="Players name"
					onChange={(e) => handleChange(e)} />
				<h4 hidden={playerMessage}>Input field cannot be empty!</h4>
				<div className="modal_buttons">
					<button
						id="ok"
						className="button_ok"
						onClick={() => hideModal()}>
						OK
					</button>
					<button
						id="cancel"
						className="button_cancel"
						onClick={() => closingAction()}>
						CANCEL
					</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;