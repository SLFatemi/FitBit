import "./_SearchResult.scss";
import ExerciseImage from "../../assets/DecoyImg.png";

function SearchResult({ result, setSelected, selected }) {
	return (
		<li
			className={`${result?.id === selected?.id ? "selected" : ""}`}
			onClick={() => setSelected(result)}
		>
			<img alt={"Man doing exercise"} src={ExerciseImage} />
			<div className={"detail-wrapper"}>
				<h4 className={"name"}>
					{result.name.slice(0, 1).toUpperCase() + result.name.slice(1)}
				</h4>
				<div className={"tags"}>
					<p className={"equipments tag"}>{result.equipment}</p>
					<span className={"diff tag"}>{result.difficulty}</span>
				</div>
			</div>
		</li>
	);
}

export default SearchResult;
