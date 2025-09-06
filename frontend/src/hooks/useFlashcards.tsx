import { useState } from 'react'
import type { IFlashcards } from '../model/Flashcards'
import axios from 'axios'
import { URL } from "../tools/utils"


const useFlashcards = () => {
    const [adminAllFlashcards, setAdminAllFlashcards] = useState<IFlashcards[] | null>(null)
    const [singleFlashcards, setSingleFlashcards] = useState<IFlashcards | null>(null)
    const [userAllFlashcards, setUserAllFlashcards] = useState<IFlashcards[] | null>(null)


    const getAllAdminFlashcards = async () => {
        try {
            const response = await axios.get(`${URL}/studies/flashcards`, { withCredentials: true })
            setAdminAllFlashcards(response.data)
        } catch (error) {
            console.error("Couldn't get all flashcards for admin", error)
            throw new Error();
        }
    }

    const getSingleFlashcard = async (id: number) => {
        try {
            const response = await axios.get(`${URL}/studies/flashcard/${id}`, { withCredentials: true });
            setSingleFlashcards(response.data);
        } catch (error) {
            console.error(`Couldn't get flashcard with the id of ${id} `, error);
            throw new Error();
        }
    }

    const getFlashcardsByUser = async () => {
        try {
            const response = await axios.get(`${URL}/studies/flashcards/me`, { withCredentials: true });
            setUserAllFlashcards(response.data);
        } catch (error) {
            console.error("Couldn't get all your flashcards.", error)
            throw new Error();
        }
    }

    const deleteFlashcardById = async (id: number) => {
        try {
            return await axios.delete(`${URL}/studies/flashcard/${id}`, { withCredentials: true })
        } catch (error) {
            console.error(`Couldn't delete flashcard with the id of ${id}`, error)
            throw new Error();
        }
    }

    return { getAllAdminFlashcards, adminAllFlashcards, getSingleFlashcard, singleFlashcards, getFlashcardsByUser, userAllFlashcards, deleteFlashcardById }

}

export default useFlashcards
