import backgroundImage from "../assets/background/background-cards.png";

const Cards = ({
	pickingCard,
	isFlipped,
	allcards,
	setMoves,
	disabled,
	moves,
	cols,
}) => {
	const clickCard = () => {
		if (!disabled) {
			pickingCard(allcards);
		}
		setMoves(moves + 1);
	};
	return (
		<div className="card">
			<div className={isFlipped ? "isflipped" : "null"}>
				<img
					src={allcards.src}
					className="front"
					id={`size-card-front-${cols}`}
					alt="front"></img>
				<img
					src={backgroundImage}
					className="back"
					id={`size-card-back-${cols}`}
					onClick={() => clickCard()}
					alt="back"></img>
			</div>
		</div>
	);
};

export default Cards;
