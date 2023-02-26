import { createContext, useState } from "react";

export interface IAuthProvider {
  children?: JSX.Element
}

export const AuthContext = createContext({} as any);

function AuthProvider({ children }: IAuthProvider) {
  const [needUpdateList, setNeedUpdateList] = useState(false)
  const [userCode, setUserCode] = useState();
  const [lastCheckId, setLastCheckId] = useState();
  const [userName, setUserName] = useState();

  return (
    <AuthContext.Provider value={{
      needUpdateList,
      setNeedUpdateList,
      userCode,
      setUserCode,
      lastCheckId,
      setLastCheckId,
      userName,
      setUserName

    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;