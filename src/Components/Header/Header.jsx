import './Header.css';

import Logo from '../../assets/logo.png';
import Profile from '../../assets/icons/profile.svg';
import Cart from '../../assets/icons/cart.svg';
import { Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';


function Header({keyword, setKeyword, openProfileMenu}) {

  const navigator = useNavigate();

  const goTo = (e, path) => {
    e.preventDefault();
    navigator(`/${path}`)
  }

  const directToSearchPage = (e) => {
    e.preventDefault();
    navigator(`/search/${keyword}`)
  }

  return (
    <div className='header'>
      <div className="brand">
        <a className="link logo-link" onClick={(e) => goTo(e, '')}>
          <img className="logo-img" src={Logo} alt="Company Logo" />
          <span className="logo-text">Neat</span>
        </a>
      </div>
      <div className="search-bar">
        <input className="input-text search-bar-input" type="text" name="query" id="search-input" placeholder='Search for product' onChange={e => {setKeyword(e.target.value)}}/>        
        <button className='btn btn-search' onClick={directToSearchPage}>Search</button>
      </div>
      <div className="actions">
        <ul className="links">
          <li className="link-item">
            <IconButton onClick={(e) => goTo(e, '')} >
              <Home />
            </IconButton>
          </li>
          <li className="link-item">
            <a className='link' onClick={(e) => goTo(e, 'checkout')}><img className="icon icon-cart" src={Cart} alt="" /></a>
          </li>
          <li className="link-item">
            <a className='link' onClick={() => openProfileMenu(true)}><img className="icon icon-profile" src={Profile} alt="" /></a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header