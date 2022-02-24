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

export const fetchJob = () => {
    return async dispatch => {

    }
}