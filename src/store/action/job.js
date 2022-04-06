import Job from "../../model/Job"

export const addJobOpening = (jobPost, noOpening, jobDescription, skills, mode, type, lastdate, city) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.userid
        const data = getState().auth.userData
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
                companyName: data.name,
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
        await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${uid}/jobs/${id}.json`, {
            method: "DELETE"
        })
        const response = await fetch('https://resume-parser-bf8d9-default-rtdb.firebaseio.com/JobPost.json')
        const resData = await response.json()
        const data = []
        for (const key in resData) {
            data.push({ id: key, cid: resData[key].jobId })
        }
        var id2;
        for (var i = 0; i < data.length; i++) {
            if (data[i].cid === id) {
                id2 = data[i].id
            }
        }
        await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/JobPost/${id2}.json`, {
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
        const response2 = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${uid}/Applicants.json`)
        const resData2 = await response2.json()
        console.log(resData2)
        const job = []
        const applied = []
        for (const key in resData2) {
            const data = { jobid: resData2[key].jobId }
            applied.push(data)
        }
        for (const key in resData) {
            const count = applied.filter(x => x.jobid === key)
            const data = new Job(key, resData[key].jobPost, resData[key].noOpening,
                resData[key].jobDescription, resData[key].skills, resData[key].mode, resData[key].type, resData[key].lastdate, resData[key].city, count.length)
            job.push(data)
        }
        dispatch({
            type: "FETCH_JOB",
            data: job
        })
    }
}

export const displayJob = () => {
    return async (dispatch) => {
        const response = await fetch('https://resume-parser-bf8d9-default-rtdb.firebaseio.com/JobPost.json')
        const resData = await response.json()
        const job = []
        for (const key in resData) {
            job.push({ id: key, companyName: resData[key].companyName, skills: resData[key].skills, lastdate: resData[key].lastdate, mode: resData[key].mode, type: resData[key].type, jobPost: resData[key].jobPost, city: resData[key].city, cid: resData[key].companyId, jid: resData[key].jobId, description: resData[key].jobDescription, noopening: resData[key].noOpening })
        }
        dispatch({ type: "DISPLAY_JOB", data: job })
    }
}

export const editJob = (id, jobPost, noOpening, jobDescription, skills, mode, type, lastdate, city) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.userid
        const data = getState().auth.userData
        await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${uid}/jobs/${id}.json`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jobPost: jobPost,
                noOpening: noOpening,
                jobDescription: jobDescription,
                skills: skills,
                mode: mode,
                type: type,
                lastdate: lastdate,
                city: city
            })
        })
        const response = await fetch('https://resume-parser-bf8d9-default-rtdb.firebaseio.com/JobPost.json')
        const resData = await response.json()
        let kid;
        for (const key in resData) {
            if (resData[key].jobId === id) {
                kid = key
            }
        }
        await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/JobPost/${kid}.json`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jobId: resData.name,
                companyName: data.name,
                companyId: uid,
                jobPost: jobPost,
                noOpening: noOpening,
                jobDescription: jobDescription,
                skills: skills,
                mode: mode,
                type: type,
                lastdate: lastdate,
                city: city
            })
        })

    }
}

