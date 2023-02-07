const History = ({ players }) => {
	const playersFromLocalStorage = JSON.parse(localStorage.getItem("player"));
	const playersArray = playersFromLocalStorage ? playersFromLocalStorage : players;
	return (
		<div className="history" >
			<h2>TOP 10 PLAYERS:</h2>
			<table className="history_table">
				<thead>
					<tr>
						<th>Rank</th>
						<th>Name</th>
						<th>Moves</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>
					{playersArray.map((player, index) => (
						<tr key={`${index}_${player.id}`}>
							<td>
								<span>{index + 1}</span>
							</td>
							<td>
								<span>{player.player}</span>
							</td>
							<td>
								<span>{player.numberOfTurns}</span>
							</td>
							<td>
								<span>{player.finishedGame}</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default History;
