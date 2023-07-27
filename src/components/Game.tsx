import { useState } from "react";
import { faHandScissors, faHand, faHandBackFist } from "@fortawesome/free-solid-svg-icons";
import logo from '../assets/logo.svg';
import './Game.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IChoice {
  name: string,
  beats: string
}

export default function Game() {

  const [playerScore, setPlayerScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState('');
  const [cpuChoice, setCpuChoice] = useState('');
  const [outcome, setOutcome] = useState('');
  const options: Array<IChoice> = [
    {
      name: 'paper',
      beats: 'rock'
    },
    {
      name: 'scissors',
      beats: 'paper'
    },
    {
      name: 'rock',
      beats: 'scissors'
    }
  ];

  function handleChoice(playerChoice: string) {
    setPlayerChoice(playerChoice);
    const choiceObject = options.find(choice => choice.name === playerChoice);
    if (choiceObject) compareChoices(choiceObject);
  }

  function compareChoices(playerChoice: IChoice) {
    const cpuChoice = determineCpuChoice();
    determineWinner(playerChoice, cpuChoice)
  }

  function determineCpuChoice() {
    const rand = Math.floor(Math.random() * options.length);
    setTimeout(() => {
      setCpuChoice(options[rand].name);
    }, 1000)
    return options[rand];
  }

  function determineWinner(playerChoice: IChoice, cpuChoice: IChoice) {
    setTimeout(() => {
      if (playerChoice.beats === cpuChoice.name) {
        // Player Wins
        setOutcome('YOU WIN');
        setPlayerScore(prevScore => prevScore + 1)
      } else if (cpuChoice.beats === playerChoice.name) {
        // CPU Wins
        setOutcome('YOU LOSE')
        setPlayerScore(prevScore => prevScore - 1)
      } else {
        // Tie
        setOutcome('TIE')
      }
    }, 1500);
  }

  function resetGame() {
    setCpuChoice('');
    setPlayerChoice('');
    setOutcome('')
  }

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={logo} />
        </div>
        <div className="score-container">
          <h3 className="score-title">SCORE</h3>
          <h2 className="score-score">{playerScore}</h2>
        </div>
      </header>
      {playerChoice ? null : <section className="game">
        <button onClick={() => handleChoice('paper')} className="choice-button" value='paper'>
          <div className="choice paper">
            <FontAwesomeIcon icon={faHand} />
          </div>
        </button>

        <button onClick={() => handleChoice('rock')} className="choice-button" value='rock'>
          <div className="choice rock">
            <FontAwesomeIcon icon={faHandBackFist} />
          </div>
        </button>

        <button onClick={() => handleChoice('scissors')} className="choice-button" value='scissors'>
          <div className="choice scissors">
            <FontAwesomeIcon icon={faHandScissors} />
          </div>
        </button>
      </section>}
      {playerChoice ? <section className="results">
        <h2 className="results-heading player">You Picked...</h2>
        <h2 className="results-heading cpu">The CPU Picked...</h2>
        <div className={`results-result player ${outcome === 'YOU WIN' ? 'won' : null}`}>
          {playerChoice ? <div className="result-container-player">
            <div className={`choice ${playerChoice}`}>
              {playerChoice === 'paper' ?<FontAwesomeIcon icon={faHand} /> : null}
              {playerChoice === 'rock' ?<FontAwesomeIcon icon={faHandBackFist} /> : null}
              {playerChoice === 'scissors' ?<FontAwesomeIcon icon={faHandScissors} /> : null}
            </div>
          </div> : null}
        </div>
        {outcome ? <div className="results-outcome">
          <h3 className="results-text">{outcome}</h3>
          <button className="play-again-button" onClick={resetGame}>PLAY AGAIN</button>
        </div> : null}
        <div className={`results-result cpu ${outcome === 'YOU LOSE' ? 'won' : null}`}>
          {cpuChoice ? <div className="result-container-cpu">
            <div className={`choice cpu ${cpuChoice}`}>
              {cpuChoice === 'paper' ?<FontAwesomeIcon icon={faHand} /> : null}
              {cpuChoice === 'rock' ?<FontAwesomeIcon icon={faHandBackFist} /> : null}
              {cpuChoice === 'scissors' ?<FontAwesomeIcon icon={faHandScissors} /> : null}
            </div>
          </div> : null}
        </div>
      </section> : null}
    </>
  )
}