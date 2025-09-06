import { useState } from "react"
import type { ISummary } from "../model/Summary"
import axios from "axios"
import { URL } from "../tools/utils"

const useSummary = () => {
    const [getAdminAllSummaries, setAdminGetAllSummaries] = useState<ISummary[] | null>(null)
    const [userAllSummaries, setUserAllSummaries] = useState<ISummary[] | null>(null)
    const [singleSummary, setSingleSummar] = useState<ISummary | null>(null)

    const getAllAdminSummaries = async () => {
        try {
            const response = await axios.get(`${URL}/studies/summaries`, { withCredentials: true })
            setAdminGetAllSummaries(response.data)
        } catch (error) {
            console.error("Couldn't get all summaries for admin", error)
            throw new Error();
        }
    }

    const getSingleSummary = async (id: number) => {
        try {
            const response = await axios.get(`${URL}/studies/summarry/${id}`, { withCredentials: true });
            setSingleSummar(response.data);
        } catch (error) {
            console.error(`Couldn't get summary with the id of ${id} `, error);
            throw new Error();
        }
    }

    const getSummaryByUser = async () => {
        try {
            const response = await axios.get(`${URL}/studies/summaries/me`, { withCredentials: true });
            setUserAllSummaries(response.data);
        } catch (error) {
            console.error("Couldn't get all your summaries.", error)
            throw new Error();
        }
    }

    const deleteSummaryById = async (id: number) => {
        try {
            return await axios.delete(`${URL}/studies/summarry/${id}`, { withCredentials: true })
        } catch (error) {
            console.error(`Couldn't delete summary with the id of ${id}`, error)
            throw new Error();
        }
    }



    return { getAllAdminSummaries, getAdminAllSummaries, getSingleSummary, singleSummary, getSummaryByUser, userAllSummaries, deleteSummaryById }
}

export default useSummary
