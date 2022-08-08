export const login = (body, dispatch) => {
    try {
        return dispatch({
            type: "LOGIN",
            payload: body
        })
    } catch (error) {
        console.log(error)
    }
}

export const logout = (dispatch) => {
    try {
        return dispatch({
            type: "LOGOUT",
            payload: []
        })
    } catch (error) {
        console.log(error)
    }
}