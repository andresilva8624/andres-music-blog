import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<ul><nav>
			<li><a href="/">Home</a></li>
			<li><Link to="/savedlesson">Favorites</Link></li>
			
			<li><Link to="/about">About</Link></li>
			<li><Link to="/contact">Contact</Link></li>
			<li><Link to="/login">Login</Link></li>
			<li><Link to="/signup">Signup</Link></li>
			
		</nav></ul>
		
	);	
	
}

export default Navbar;