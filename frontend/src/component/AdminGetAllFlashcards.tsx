import { useEffect } from 'react'
import useFlashcards from '../hooks/useFlashcards'
import { formatContent } from '../tools/FormatContent'
import { Link } from 'react-router-dom'
import "../style/flashcards.css"

const AdminGetAllFlashcards = () => {
    const { getAllAdminFlashcards, adminAllFlashcards, deleteFlashcardById } = useFlashcards()


    useEffect(() => {
        getAllAdminFlashcards()
    }, [])


    return (
        <div id='contentPageFlashcardQuestions'>
            {adminAllFlashcards ? adminAllFlashcards.map((item) => {
                return (
                    <div key={item.id} className='contentFlashcardQuestions'>
                        <h2>{item.title}</h2>
                        <div className='textFlashcardQuestions'>{formatContent(item.text)}</div>
                        <p className='date'>Created At: {item.createdAt.slice(0, 10)}</p>
                        <div><button className='buttons' onClick={() => { deleteFlashcardById(Number(item.id)).then(() => getAllAdminFlashcards()) }}>Delete Flashcard</button>
                            <Link to={`/singleFlashcard/${item.id}`}><button className='buttons'>View Flashcard</button></Link></div>

                    </div>
                )
            }) : <h2>You have not generated any flashcards</h2>}
        </div>
    )
}

export default AdminGetAllFlashcards
