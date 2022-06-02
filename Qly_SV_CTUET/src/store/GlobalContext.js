import React, {createContext, useContext, useState} from "react";

const userContext = createContext({
    userInfo: null,
})

function UserProvider({children}){
    const [userInfo, setUserInfo] = useState()
    const classs = [
        'HTTT0118',
        'KTPM0118',
        'KHMT0118',];
    const genders = ['Nam', 'Nữ', 'Khác']

    return(
        <userContext.Provider value={{userInfo, setUserInfo, classs, genders}}>
            {children}
        </userContext.Provider>
    )
}

export {userContext,UserProvider}