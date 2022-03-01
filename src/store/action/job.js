import Job from "../../model/Job"

export const addJobOpening = (jobPost, noOpening, jobDescription, skills, mode, type, lastdate, city) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.userid
        const response = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${uid}/jobs.json`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jobPost,
                noOpening,
                jobDescription,
                skills,
                mode,
                type,
                lastdate,
                city
            })
        })
        const resData = await response.json()
        await fetch('https://resume-parser-bf8d9-default-rtdb.firebaseio.com/JobPost.json', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jobId: resData.name,
                companyId: uid,
                jobPost,
                noOpening,
                jobDescription,
                skills,
                mode,
                type,
                lastdate,
                city
            })
        })
        dispatch({
            type: "ADD_JOB", data: {
                id: resData.name,
                jobPost,
                noOpening,
                jobDescription,
                skills,
                mode,
                type,
                lastdate,
                city
            }
        })
    }
}

export const DeleteJob = (id) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.userid
        const response = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${uid}/jobs/${id}.json`, {
            method: "DELETE"
        })
        dispatch({ type: "DELETE_JOB", id: id })

    }
}

export const fetchJob = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.userid
        console.log(uid)
        const response = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${uid}/jobs.json`)
        const resData = await response.json()
        console.log(resData)
        const job = []
        for (const key in resData) {
            const data = new Job(key, resData[key].jobPost, resData[key].noOpening,
                resData[key].jobDescription, resData[key].skills, resData[key].mode, resData[key].type, resData[key].lastdate, resData[key].city)
            job.push(data)
        }
        dispatch({
            type: "FETCH_JOB",
            data: job
        })
    }
}


