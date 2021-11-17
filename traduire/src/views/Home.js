import pic1 from '../images/robot.png';
import '../App.css';
import { Link } from 'react-router-dom';

const Home = (props) => {
    return (
        <div className="container mainContainer">
            <div className="firstPage">
                <div className="firstPage-pic">
                    <i class="fas fa-robot"></i>
                </div>
                <div className="firstPage-words">
                    <h1>Welcome to Traduire!</h1>
                    <h2>Using IBM Watson to do your translations we hope to give you the best translation. Come and start learning now!</h2>
                </div>
                <a style={{display:'none'}}href='https://www.freepik.com/vectors/people'>People vector created by pch.vector - www.freepik.com</a>
            </div>
            <div className="firstPage-btns">
                <button className="btn btn-primary btn-login" ><Link to="/login">Login</Link></button>
                <button className="btn btn-warning btn-register"><Link to="/register">Register</Link></button>
            </div>
        </div>
    )
}

export default Home;