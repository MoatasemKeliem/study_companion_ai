import { Link } from 'react-router-dom'

const UnAuthorized = () => {
    return (
        <div>
            <h1>You're not authorized to visit this page!</h1>
            <Link to={"/myPage"}>Go back to My Page</Link>
        </div>
    )
}

export default UnAuthorized
