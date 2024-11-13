import './Header.css';
import OlxLogo from '../../assets/olxLogo.png';
import { ChevronDown, Plus, SearchIcon } from 'lucide-react';
import { useFirebase } from '../../Store/FirebaseContext';
import { getAuth, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';


function Header() {
  const {isAuthenticated} = useFirebase()
  const navigate = useNavigate()

  const handleLogout = () =>{
    try {
      const auth = getAuth();
      signOut(auth).then(()=>{
        navigate('/login')
      }).catch((err)=>{
        console.log(err);
      })
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to='/'>
          <img src={OlxLogo} alt="OLX Logo" className="brandName" />
          </Link>
        </div>
        <div className="placeSearch">
          <SearchIcon aria-label="Search location" />
          <input type="text" placeholder="Search location" />
          <ChevronDown />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone, and more..."
            />
          </div>
          <div className="searchAction">
            <SearchIcon aria-label="Search products" />
          </div>
        </div>
        <div className="language">
          <span>ENGLISH</span>
          <ChevronDown />
        </div>
        <div className="loginPage">
          {isAuthenticated?<span onClick={handleLogout}>Logout</span>:<Link to='/login'>Login</Link>}
          
          <hr />
        </div>
        <Link to='/sell' className=" border-4 rounded-2xl px-3 py-1 border-t-cyan-300 border-b-blue-500 border-r-blue-500 border-l-yellow-400">
          <div className="sellMenuContent">
            <Plus aria-label="Sell product" />
            <span>SELL</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
