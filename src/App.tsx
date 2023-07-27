import { useState } from 'react'
import './App.css'
import Game from './components/Game'
import rulesImg from './assets/image-rules.svg'
import { faX, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {

  const [rulesModal, setRulesModal] = useState(false);

  function toggleRulesModal() {
    setRulesModal(prevState => !prevState)
  }

  return (
    <>
      <div className='container'>
        <Game />
      </div>

      <button onClick={toggleRulesModal} className="rules-button" tabIndex={1}>
        <FontAwesomeIcon icon={faQuestionCircle} />
      </button>
      <div className={`modal ${rulesModal ? 'show-modal' : ''}`}>
        <div className="modal-container">
          <header className="modal-header">
            <h2 className="modal-heading">RULES</h2>
            <button onClick={toggleRulesModal} className="close-button">
              <FontAwesomeIcon icon={faX} />
            </button>
          </header>
          <img src={rulesImg} alt="rules" className="rules-img" />
        </div>
      </div>
    </>
  )
}

export default App
