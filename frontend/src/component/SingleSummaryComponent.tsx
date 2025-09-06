import { useEffect } from 'react'
import useSummary from '../hooks/useSummary'
import { useNavigate, useParams } from 'react-router-dom'
import { formatContent } from '../tools/FormatContent'

const SingleSummaryComponent = () => {
    const { getSingleSummary, singleSummary, deleteSummaryById } = useSummary()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!id) return;
        getSingleSummary(Number(id))
    }, [])


    return (
        <div>
            <div>{singleSummary?.content ? formatContent(singleSummary?.content) : <h2>There is no summary with this id</h2>}</div>
            <p>Created at: {singleSummary?.createdAt} by {singleSummary?.user.name}</p>
            <button onClick={() => { deleteSummaryById(Number(id)).then(() => navigate("/mySummaries")) }}>Delete Summary</button>
        </div>
    )
}

export default SingleSummaryComponent
