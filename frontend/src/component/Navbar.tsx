import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../style/Navbar.css"
import { Link } from "react-router-dom"

const Navbar = () => {
    const { logout, user } = useAuth()


    return (
        <nav>
            <Link className={"link"} to={"/myPage"}><h1>Study Buddy AI</h1></Link>
            {user &&
                <ul className="uList">
                    <li className="listItem"><NavLink className={"link"} to={"/myPage"}>My Page</NavLink></li>
                    <li className="listItem"><button onClick={logout}>Logout</button></li>

                </ul>}
            {
                !user &&
                <ul className="uList">
                    <li className="listItem"><NavLink className={"link"} to={"/login"}>Login</NavLink></li>
                    <li className="listItem"><NavLink className={"link"} to={"/register"}>Register</NavLink></li>
                </ul>
            }

        </nav>
    )
}

export default Navbar
