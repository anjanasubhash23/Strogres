import Job from "../../model/Job"

export const addJobOpening = (jobPost, noOpening, jobDescription, skills, mode) => {
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
                mode
            })
        })
        const resData = await response.json()
        dispatch({
            type: "ADD_JOB", data: {
                id: resData.name,
                jobPost,
                noOpening,
                jobDescription,
                skills,
                mode
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
                resData[key].jobDescription, resData[key].skills, resData[key].mode)
            job.push(data)
        }
        dispatch({
            type: "FETCH_JOB",
            data: job
        })
    }
}

export const parseResume = (url) => {
    return async (dispatch, getState) => {
        const response = await fetch('/extractData', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                url: url
            })
        })
        const resData = await response.json()
        console.log(resData)
        dispatch({ type: "PARSE_RESUME", data: resData })
    }
}
