import { useEffect } from 'react'
import useSummary from '../hooks/useSummary'
import { formatContent } from '../tools/FormatContent'
import "../style/page.css"
import { capitalizeFirstLetter } from '../tools/capitalizeFirstLetter'

const UserSummary = () => {
    const { getSummaryByUser, userAllSummaries, deleteSummaryById } = useSummary()


    useEffect(() => {
        getSummaryByUser()
    }, [])

    return (
        <div id='contentPage'>
            {userAllSummaries ? userAllSummaries.map((item) => {
                return (
                    <div key={item.id} className='contentDiv'>
                        <h2>{capitalizeFirstLetter(item.title)}</h2>
                        <div className='text'>{formatContent(item.content)}</div>
                        <p className='date'>Created at: {item.createdAt.slice(0, 10)} by {item.user.name}</p>
                        <button onClick={async () => { await deleteSummaryById(item.id); await getSummaryByUser() }}>Delete Summary</button>
                    </div>
                )
            }) : <h2>You have not generated any summaries</h2>}
        </div>
    )
}

export default UserSummary
