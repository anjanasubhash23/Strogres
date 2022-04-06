
export const parseResume = (url) => {
    return async (dispatch, getState) => {
        console.log("starting...")
        const uid = getState().auth.userid
        const response = await fetch('/extract', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                url: url
            })
        })
        const resData = await response.json()
        console.log(resData)
        const response2 = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${uid}/Applicants.json`, {
            method: "POST",
            headers: { "content-Type": "application.json" },
            body: JSON.stringify({
                resume: url,
                parseData: resData
            })
        })
        const resData2 = await response2.json()
        console.log(resData2)
        dispatch({
            type: "RESUME_DATA", data: {
                id: resData2.name,
                parsedata: resData,
                url: url
            }
        })
    }
}

export const parseSpecific = (jid, url) => {
    return async (dispatch, getState) => {
        console.log("starting...")
        const uid = getState().auth.userid
        const response = await fetch('/extract', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                url: url
            })
        })
        const resData = await response.json()
        console.log(resData)
        const response2 = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${uid}/Applicants.json`, {
            method: "POST",
            headers: { "content-Type": "application.json" },
            body: JSON.stringify({
                jobId: jid,
                resume: url,
                parseData: resData,
                estatus: false,
                status: "",
                appuid: null,
                appliedId: null
            })
        })
        const resData2 = await response2.json()
        console.log(resData2, jid)
        dispatch({
            type: "SPECIFIC_DATA", data: {
                id: resData2.name,
                jobid: jid,
                parsedata: resData,
                url: url,
                estatus: false,
                status: "",
                appuid: null,
                appliedId: null
            }
        })
    }
}

export const applyData = (cid, jid, jobName, companyName, jobType, appliedDate, type, url, urlid) => {
    return async (dispatch, getState) => {
        if (!type) {
            const url = getState().auth.userData.url
            console.log(url)
            const uid = getState().auth.userid
            const response = await fetch('/extract', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    url: url
                })
            })
            const resData = await response.json()
            const response2 = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Applicant/${uid}/AppliedData.json`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    jobName,
                    jid,
                    companyName,
                    cid,
                    jobType,
                    appliedDate,
                    url: url,
                    status: 'Applied'
                })
            })
            const resData2 = await response2.json()
            await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${cid}/Applicants.json`, {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({
                    appuid: uid,
                    appliedId: resData2.name,
                    resume: url,
                    parseData: resData,
                    jobId: jid,
                    estatus: false,
                    status: ''
                })
            })
            dispatch({
                type: "APPLY_DATA", data: {
                    id: resData2.name,
                    jobname: jobName,
                    companyname: companyName,
                    jobtype: jobType,
                    applieddate: appliedDate,
                    url: url
                }
            })
        }
        else {
            console.log(url)
            const uid = getState().auth.userid
            const response = await fetch('/extract', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    url: url
                })
            })

            const resData = await response.json()

            const response2 = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Applicant/${uid}/AppliedData.json`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    jobName,
                    jid,
                    companyName,
                    cid,
                    jobType,
                    appliedDate,
                    url: url,
                    status: 'Applied'
                })
            })
            const resData2 = await response2.json()
            await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${cid}/Applicants.json`, {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({
                    appuid: uid,
                    appliedId: resData2.name,
                    resume: url,
                    parseData: resData,
                    jobId: jid,
                    estatus: false,
                    status: ''
                })
            })
            await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Applicants/${uid}/info/${urlid}.json`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: url
                })
            })
            dispatch({
                type: "APPLY_DATA", data: {
                    id: resData2.name,
                    jobname: jobName,
                    companyname: companyName,
                    jobtype: jobType,
                    applieddate: appliedDate,
                    url: url
                }
            })
        }
    }
}

export const FetchAppliedJob = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.userid
        const response = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Applicant/${uid}/AppliedData.json`)
        const resData = await response.json()
        const data = []
        for (const key in resData) {
            data.push({ id: key, jobname: resData[key].jobName, companyname: resData[key].companyName, jobtype: resData[key].jobType, applieddate: resData[key].appliedDate, url: resData[key].url, cid: resData[key].cid, jid: resData[key].jid, status: resData[key].status })
        }
        dispatch({ type: "FETCH_APPLIED_DATA", data: data })
    }
}

export const fetchcount = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.userid
        const response = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${uid}/Applicants.json`)
        const resData = await response.json()
        const data = []
        for (const key in resData) {
            data.push({ id: key, url: resData[key].resume, parsedata: resData[key].parseData, jobid: resData[key].jobId, estatus: resData[key].estatus, status: resData[key].status, appuid: resData[key].appuid, appliedid: resData[key].appliedId })
        }
        dispatch({ type: "FETCH_DATA", data: data })
    }
}

export const fetchInfo = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.userid
        const response = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Applicants/${uid}/info.json`)
        const resData = await response.json()
        const data = {}
        for (const key in resData) {
            data['firstname'] = resData[key].firstname
            data['lastname'] = resData[key].lastname
            data['url'] = resData[key].url
            data['email'] = resData[key].email
            data['city'] = resData[key].city
            data['job'] = resData[key].job
            data['url'] = resData[key].url
        }
        dispatch({ type: "FETCH_INFO", data: data })
    }
}

export const updateStatus = (id, type, status, uid, appid) => {
    return async (dispatch, getState) => {
        const userid = getState().auth.userid
        console.log("happening")
        if (type) {
            await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${userid}/Applicants/${id}.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    estatus: true
                })
            })
            dispatch({ type: "UPDATE_STATUS", data: { id: id, type: type } })
        }
        else {
            await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${userid}/Applicants/${id}.json`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    status: status
                })
            })
            console.log(uid, appid)
            if (uid !== null) {
                await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Applicant/${uid}/AppliedData/${appid}.json`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        status: status
                    })
                })
            }

            dispatch({ type: "UPDATE_STATUS", data: { id: id, type: type, status: status } })
        }
    }
}

export const updateInfo = (id, firstname, lastname, url, email, city, job) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.userid
        const response = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Applicants/${uid}/info/${id}.json`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                city: city,
                job: job,
                url: url
            })
        })


    }
}

export const updateResume = (id, url) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.userid
        const response = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Applicants/${uid}/info/${id}.json`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: url
            })
        })
    }
}