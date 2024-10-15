import { Image } from 'semantic-ui-react'
import '../styles/Header.css';

function Header() {

  return <>
    <div className='header-container'>
      <Image className='sticky-icon' src='/sticky note with push pin icon.png' size='small' />
      <h1>Neighborhood Jobs</h1>
    </div>
  </>;
}

export default Header;