import { useEffect } from 'react'
import useSummary from '../hooks/useSummary'
import { formatContent } from '../tools/FormatContent'
import "../style/page.css"
import { capitalizeFirstLetter } from '../tools/capitalizeFirstLetter'

const AdminGetAllSummaries = () => {
    const { getAdminAllSummaries, getAllAdminSummaries, deleteSummaryById } = useSummary()

    useEffect(() => {
        getAllAdminSummaries()
    }, [])

    console.log(getAdminAllSummaries)

    return (
        <div id='contentPage'>
            {getAdminAllSummaries && getAdminAllSummaries.map((item) => {
                return (
                    <div key={item.id} className='contentDiv'>
                        <h2>{capitalizeFirstLetter(item.title)}</h2>
                        <div className='text'>{formatContent(item.content)}</div>
                        <p className='date'>created at: {item.createdAt.slice(0, 10)}</p>
                        <button onClick={async () => { await deleteSummaryById(item.id); await getAllAdminSummaries() }}>Delete Summary</button>
                    </div>
                )
            })

            }
        </div>
    )
}

export default AdminGetAllSummaries
