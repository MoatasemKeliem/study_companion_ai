import { useEffect } from 'react'
import useFlashcards from '../hooks/useFlashcards'
import { Link } from 'react-router-dom'
import "../style/flashcards.css"


const UserFlashcard = () => {
    const { getFlashcardsByUser, userAllFlashcards, deleteFlashcardById } = useFlashcards()


    useEffect(() => {
        getFlashcardsByUser()
    }, [])


    return (
        <div id='contentPageFlashcardQuestions'>
            {userAllFlashcards ? userAllFlashcards.map((item) => {
                return (
                    <div key={item.id} className='contentFlashcardQuestions'>
                        <h2>{item.title}</h2>
                        <div className='textFlashcardQuestions'>{item.text}</div>
                        <p className='date'>Created At: {item.createdAt.slice(0, 10)}</p>
                        <div>
                            <button className='buttons' onClick={() => { deleteFlashcardById(item.id).then(() => getFlashcardsByUser()) }}>Delete Flashcard</button>
                            <Link className='buttons' to={`/singleFlashcard/${item.id}`}><button>View Flashcard</button></Link>
                        </div>
                    </div>
                )
            }) : <h2>You have not generated any flashcards</h2>}
        </div>
    )
}

export default UserFlashcard
