import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import "../style/myPage.css"

const MyPage = () => {

    const { user } = useAuth()
    return (
        <div id="myPage">
            {user?.role === "ADMIN" && <div className="myPageDiv">
                <h2>Admin</h2>
                <Link to={"/admin/adminSummary"}><button>Admin Summary</button></Link>
                <Link to={"/admin/adminFlashcards"}><button>Admin Flashcard</button></Link>
                <Link to={"/admin/adminQuestions"}><button>Admin Questions</button></Link>
            </div>}
            <div className="myPageDiv">
                <h2>Do you want to generate study material?</h2>
                <Link to={"/Generate/generateSummary"}><button>Generate Summary</button></Link>
                <Link to={"/Generate/generateFlashcard"}><button>Generate Flashcards</button></Link>
                <Link to={"/Generate/generateQuestion"}><button>Generate Questions</button></Link>
            </div>
            <div className="myPageDiv">
                <h2>Do You want to see your study material?</h2>
                <Link to={"/myFlashcards"}><button>My Flashcards</button></Link>
                <Link to={"/mySummaries"}><button>My Summarries</button></Link>
                <Link to={"/myQuestions"}><button>My Questions</button></Link>
            </div>

        </div>
    )
}

export default MyPage
