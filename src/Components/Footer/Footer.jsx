import './Footer.css'

import fb from '../../assets/icons/facebook.svg'
import x from '../../assets/icons/twitter.svg'
import ig from '../../assets/icons/instagram.svg'
import { useNavigate } from 'react-router-dom'

function Footer() {

    const navigator = useNavigate();
    const goTo = (e, link) => {
        e.preventDefault();
        navigator(`/${link}`)
    }

  return (
    <div className='footer'>
        <ul className="links site-info">
            <li className="link-item">
                <h2 style={{margin:0}} >Customer Services</h2>
            </li>
            <li className="link-item">
                <a className='link' onClick={(e) => goTo(e,'contact')}>
                    Contact us
                </a>
            </li>
        </ul>
        <div>

        </div>
        <ul className="links social">
            <li className="link-item">
                <a className="link" href=""><img className="icon social-icon" src={ig} alt=""/></a>
            </li>
            <li className="link-item">
                <a className="link" href=""><img className="icon social-icon icon-x" src={x} alt=""/></a>
            </li>
            <li className="link-item">
                <a className="link" href=""><img className="icon social-icon" src={fb} alt=""/></a>
            </li>
        </ul>
    </div>
  )
}

export default Footer