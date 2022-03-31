import Applicant from "../../model/Applicant";
import Company from "../../model/Company";


export const RegisterCompany = (companyname, email, password, hrname, about) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8nN8qN-nzR39dajT5wEalzdwML9scQ0U', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })
        if (!response.ok) {
            const errordata = await response.json();
            const errorid = errordata.error.message;
            let message = 'Something Went Wrong'
            if (errorid === 'email-already-exists') {
                message = "Enter Email-Id Already Exists Please Enter Different Email-ID"
            }
            throw new Error(message);
        }
        const resData = await response.json()
        localStorage.setItem('data', JSON.stringify({
            token: resData.idToken
        }))
        const uid = resData.localId
        const response2 = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${uid}/CompanyData.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                companyname,
                email,
                hrname,
                about
            })
        })
        const resData2 = await response2.json()
        dispatch({
            type: "REGISTER_COMPANY", uid: resData.localId, token: resData.idToken, data: {
                id: resData2.id,
                companyname,
                email,
                hrname,
                about
            }
        })
    }

}

export const registerApplicant = (email, password, firstname, lastname, city, job, url) => {

    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8nN8qN-nzR39dajT5wEalzdwML9scQ0U', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })
        if (!response.ok) {
            const errordata = await response.json();
            const errorid = errordata.error.message;
            throw new Error(errorid);
        }
        const resData = await response.json()
        localStorage.setItem('data', JSON.stringify({
            token: resData.idToken
        }))
        const uid = resData.localId
        console.log(url)
        const response2 = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Applicant/${uid}/info.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                city,
                job,
                url

            })
        })
        const resData2 = await response2.json()
        dispatch({
            type: "REGISTER_APPLICANT", uid: resData.localId, token: resData.idToken, data: {
                id: resData2.id,
                firstname,
                lastname,
                email,
                city,
                job,
                url

            }
        })
    }
}

export const LoginHandler = (email, password, option) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8nN8qN-nzR39dajT5wEalzdwML9scQ0U', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })
        const resData = await response.json()
        const data = {
            token: resData.idToken
        }
        console.log(data)
        localStorage.setItem('data', JSON.stringify(data))
        console.log(resData.localId)
        dispatch({ type: 'LOGIN_USER', token: resData.idToken, uid: resData.localId, admin: option })
    }
}
export const AdminData = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.userid
        const response = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${uid}/CompanyData.json`)
        const resData = await response.json()
        const data = []
        for (const key in resData) {
            data.push(new Company(key, resData[key].companyname, resData[key].email, resData[key].hrname, resData[key].about))
        }
        console.log(data)
        dispatch({
            type: "FETCH_COMPANY",
            data: data
        })
    }
}

export const ApplicantData = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.userid
        console.log("starting")
        const response = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Applicant/${uid}/info.json`)
        const resData = await response.json()
        console.log(resData)
        const data = []
        for (const key in resData) {
            data.push(new Applicant(key, resData[key].firstname, resData[key].lastname, resData[key].city, resData[key].job, resData[key].email, resData[key].url))
        }
        console.log(data)
        dispatch({
            type: "FETCH_APPLICANT",
            data: data
        })
    }
}


export const LogOut = () => {
    return async dispatch => {
        const data = JSON.parse(localStorage.getItem('data'))
        data['token'] = " "
        localStorage.setItem('data', JSON.stringify(data))
        dispatch({ type: "LOGOUT" })
    }
}

