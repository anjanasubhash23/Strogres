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

export const fetchcount = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.userid
        const response = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${uid}/Applicants.json`)
        const resData = await response.json()
        const data = []
        for (const key in resData) {
            data.push({ id: key, url: resData[key].resume, parsedata: resData[key].parseData })
        }
        dispatch({ type: "FETCH_DATA", data: data })
    }
}