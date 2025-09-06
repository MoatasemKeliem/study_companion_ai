import { useEffect } from 'react'
import useFlashcards from '../hooks/useFlashcards'
import { useNavigate, useParams } from 'react-router-dom'

const SingleFlashcardComponent = () => {
    const { getSingleFlashcard, singleFlashcards, deleteFlashcardById } = useFlashcards()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getSingleFlashcard(Number(id))
    }, [])

    return (
        <div>
            <h2>{singleFlashcards?.title}</h2>
            <div>{singleFlashcards?.text}</div>
            <p>Created At: {singleFlashcards?.createdAt.slice(0, 10)}</p>
            <button onClick={() => { deleteFlashcardById(Number(id)).then(() => navigate("/myFlashcards")) }}>Delete Flashcard</button>
        </div>
    )
}

export default SingleFlashcardComponent
