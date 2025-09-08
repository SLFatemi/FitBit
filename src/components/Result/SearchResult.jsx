import "./_SearchResult.scss";
import ExerciseImage from "../../assets/DecoyImg.png";

// [
//     {
//         "bodyPart": "upper arms",
//         "equipment": "barbell",
//         "id": "0023",
//         "name": "barbell alternate biceps curl",
//         "target": "biceps",
//         "secondaryMuscles": [
//             "forearms"
//         ],
//         "instructions": [
//             "Stand up straight with your feet shoulder-width apart and hold a barbell in each hand, palms facing forward.",
//             "Keep your upper arms stationary and exhale as you curl the weights while contracting your biceps.",
//             "Continue to raise the barbells until your biceps are fully contracted and the barbells are at shoulder level.",
//             "Hold the contracted position for a brief pause as you squeeze your biceps.",
//             "Inhale as you slowly begin to lower the barbells back to the starting position.",
//             "Repeat for the desired number of repetitions, alternating arms."
//         ],
//         "description": "The barbell alternate biceps curl is a strength exercise targeting the biceps, performed by alternately curling a barbell with each arm while standing. It also engages the forearms as secondary muscles.",
//         "difficulty": "beginner",
//         "category": "strength"
//     },

function SearchResult({ result }) {
	return (
		<li>
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
