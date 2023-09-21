import React,{ createContext,useState} from 'react';

export const addData=createContext();
export const updateData=createContext();
export const dltData=createContext();

const ContextProvider = ({children}) => {

    const [userAdd,setUserAdd]=useState("");
    const [update,setUpdate]=useState("");
    const [deleteData,setDeleteData]=useState("");

  return (
    <div>
        <addData.Provider value={{userAdd,setUserAdd}}>
          <updateData.Provider value={{update,setUpdate}}>
            <dltData.Provider value={{deleteData,setDeleteData}}>
              {children}
            </dltData.Provider>
          </updateData.Provider>
        </addData.Provider>
    </div>
  )
}

export default ContextProvider