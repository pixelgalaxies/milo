import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import "./main.css";
import {card, roundOne, roundTwo, roundThree} from "./data";

const App = () => {
	const [phase, setPhase] = useState("landing");
	const [answerOne, setAnswerOne] = useState("");
	const [answerTwo, setAnswerTwo] = useState("");
	const [answerThree, setAnswerThree] = useState("");
	const [ranNum] = useState(Math.floor(Math.random() * Math.floor(3)));

	function handlePhase() {
		if (phase == "landing") {
			return <Landing setPhase={setPhase} />;
		}
		if (phase == "ask") {
			return <Ask setAnswerOne={setAnswerOne} setAnswerTwo={setAnswerTwo} setAnswerThree={setAnswerThree} setPhase={setPhase} ranNum={ranNum} />;
		}
		if (phase == "final") {
			return (
				<Final
					setAnswerOne={setAnswerOne}
					setAnswerTwo={setAnswerTwo}
					setAnswerThree={setAnswerThree}
					answerOne={answerOne}
					answerTwo={answerTwo}
					answerThree={answerThree}
					setPhase={setPhase}
					ranNum={ranNum}
				/>
			);
		}
	}
	return <React.Fragment>{handlePhase()}</React.Fragment>;
};

const Landing = (props) => {
	function handleStart() {
		props.setPhase("ask");
	}

	return (
		<div className="container">
			<h1>Milo</h1>
			<button className="btn start-btn" onClick={handleStart}>
				Start
			</button>
		</div>
	);
};

const Ask = (props) => {
	function handleStartOver() {
		props.setPhase("landing");
		props.setAnswerOne("");
		props.setAnswerTwo("");
		props.setAnswerThree("");
	}

	function handleAnswerOne(e) {
		props.setAnswerOne(e.target.value);
	}

	function handleAnswerTwo(e) {
		props.setAnswerTwo(e.target.value);
	}

	function handleAnswerThree(e) {
		props.setAnswerThree(e.target.value);
	}

	function handleNext() {
		props.setPhase("final");
	}

	return (
		<div className="container">
			<h1>Milo</h1>

			<div className="question-wrapper">
				<span className="question">{roundOne[props.ranNum].question}</span>
				<select name="answers" id="answersOne" onChange={(e) => handleAnswerOne(e)}>
					<option value="">Please Select</option>
					{roundOne[props.ranNum].answers.map((answer) => {
						return <option value={answer}>{answer}</option>;
					})}
				</select>

				<span className="question">{roundTwo[props.ranNum].question}</span>
				<select name="answers" id="answersTwo" onChange={(e) => handleAnswerTwo(e)}>
					<option value="">Please Select</option>
					{roundTwo[props.ranNum].answers.map((answer) => {
						return <option value={answer}>{answer}</option>;
					})}
				</select>

				<span className="question">{roundThree[props.ranNum].question}</span>
				<select name="answers" id="answersThree" onChange={(e) => handleAnswerThree(e)}>
					<option value="">Please Select</option>
					{roundThree[props.ranNum].answers.map((answer) => {
						return <option value={answer}>{answer}</option>;
					})}
				</select>

				<div className="btns-row">
					<button className=" btn next-btn" onClick={handleNext}>
						Next
					</button>

					<button className="btn restart-btn" onClick={handleStartOver}>
						Start Over
					</button>
				</div>
			</div>
		</div>
	);
};

const Final = (props) => {
	const [theOne, setTheOne] = useState("");

	function handleStartOver() {
		props.setPhase("landing");
		props.setAnswerOne("");
		props.setAnswerTwo("");
		props.setAnswerThree("");
	}

	function handleCardPick() {
		let possibleCards = [];

		if (props.ranNum === 0) {
			// question 1 from roundOne
			if (props.answerOne === "1900-1950") {
				possibleCards.push(card.death);
			}
			if (props.answerOne === "1951-Present") {
				possibleCards.push(card.temperance);
			}
			// question 1 from roundTwo
			if (props.answerTwo === "yes") {
				possibleCards.push(card.fool);
			}
			if (props.answerTwo === "no") {
				possibleCards.push(card.hermit);
			}
			// question 1 from roundThree
			if (props.answerThree === "yes") {
				possibleCards.push(card.empress);
			}
			if (props.answerThree === "no") {
				possibleCards.push(card.devil);
			}
		}

		if (props.ranNum === 1) {
			// question 2 from roundOne
			if (props.answerOne === "0-5" || props.answerOne === "11-15") {
				possibleCards.push(card.fiveCups);
			}
			if (props.answerOne === "6-10" || props.answerOne === "16+") {
				possibleCards.push(card.temperance);
			}
			// question 2 from roundTwo
			if (props.answerTwo === "0-2" || props.answerTwo === "6+") {
				possibleCards.push(card.sixWands);
			}
			if (props.answerTwo === "3-5") {
				possibleCards.push(card.nineCups);
			}
			// question 2 from roundThree
			if (props.answerThree === "0-5" || props.answerThree === "6-10") {
				possibleCards.push(card.aceSwords);
			}
			if (props.answerThree === "11+") {
				possibleCards.push(card.world);
			}
		}
		if (props.ranNum === 2) {
			// question 3 from roundOne
			if (props.answerOne === "green" || props.answerOne === "hazel" || props.answerOne === "not listed") {
				possibleCards.push(card.threeSwords);
			}
			if (props.answerOne === "brown" || props.answerOne === "blue") {
				possibleCards.push(card.justice);
			}

			// question 3 from roundTwo
			if (props.answerTwo === "yes") {
				possibleCards.push(card.sun);
			}
			if (props.answerTwo === "no") {
				possibleCards.push(card.moon);
			}
			// question 3 from roundThree
			if (props.answerThree === "yes") {
				possibleCards.push(card.lovers);
			}
			if (props.answerThree === "no") {
				possibleCards.push(card.wheelOfFortune);
			}
		}

		console.log("possible cards: ", possibleCards);
		setTheOne(possibleCards[Math.floor(Math.random() * Math.floor(3))]);
	}

	return (
		<div className="container">
			<h1>Milo</h1>
			{theOne && theOne.img ? (
				<div className="card-wrapper">
					<div className="theOneText">
						<span>{theOne.description}</span>
					</div>
					<div className="theOneImg">
						<img src={"https://milo-images.s3-us-west-2.amazonaws.com/" + theOne.img} alt="" />
					</div>
				</div>
			) : (
				<div className="card-wrapper">
					<span className="instructions">Pick A Card</span>
					<div className="cards-row">
						<div className="card1" onClick={handleCardPick}></div>
						<div className="card2" onClick={handleCardPick}></div>
						<div className="card3" onClick={handleCardPick}></div>
					</div>
				</div>
			)}
			<button className="btn restart-btn" onClick={handleStartOver}>
				Start Over
			</button>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("app"));
