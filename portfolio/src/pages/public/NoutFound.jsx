
import { useNavigate } from 'react-router-dom';
import './notFound.scss'

const NoutFound = () => {
  const navigate = useNavigate();

  const gone = () => {
    navigate("/");
  }

  return (
    <div className='not__found'>
      <h1 className='not__found-titles'>404</h1>
      <div className="cloak__wrapper">
        <div className="cloak__container">
          <div className="cloak"></div>
        </div>
      </div>
      <div className="info">
        <h2 className='not__found-title'>We cant find that page</h2>
        <p className='not__found-text'>We are fairly sure that page used to be here, but seems to have gone missing. We do apologise on it is behalf.</p><a href="https://jhey.dev" target="_blank" rel="noreferrer noopener">Home</a>
      </div>
      <div>
        <button onClick={gone} className='not__found-btn'>HOME</button>
      </div>
    </div>
  )
}

export default NoutFound