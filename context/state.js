import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const [formHidden, setFormHidden] = useState(true);
    const [formEditHidden, setFormEditHidden] = useState(true);
    const [list, setList] = useState([]);
    const [formUsers, setFormUsers] = useState([]);
    const [projectInfo, setProjectInfo] = useState({});
    const [sectionsList, setSectionsList] = useState([]);
    let AppState = {
        state: {
            formHidden,
            formEditHidden,
            list,
            formUsers,
            projectInfo,
            sectionsList,
        },
        setFormHidden,
        setFormEditHidden,
        setList,
        setFormUsers,
        setProjectInfo,
        setSectionsList,
      }

  return (
    <AppContext.Provider value={AppState}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}