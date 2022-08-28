import { Button, Input, Spacer } from '@nextui-org/react';
import styles from "../styles/ProjectForm.module.scss";
import { useRef, useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import axios from 'axios';


const ProjectForm = ({users, setProjects, setFormHidden}) => {
  const inputElement = useRef();
  const [pName, setPName] = useState("");
  const [pCode, setPCode] = useState("");
  const [subject, setSubject] = useState("");
  const [iUser, setIUser] = useState("");
  const [aUser, setAUser] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const owner = "225699"
    //hier nog owner-id uit userfront halen eens geïmplementeerd
    //const date = new Date().toISOString().slice(0,10)
    const date = new Date().toISOString().split('T')[0]
    const id = nanoid(10)
    const formData = { 
      AssessmentUserId: aUser,
      CreationDate: date,
      CurrentPhase: "Input phase 1",
      PhaseId: 1,
      InputUserId: iUser,
      LastEdited: date,
      OwnerId: owner,
      ProjectCode: pCode,
      Status: "active",
      StatusId: 1,
      Subject: subject,
      id,
      name: pName,
    }
    setProjects(prev => [...prev, formData])
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/project',
        data: {
          id,
          Status_id: 1,
          CurrentPhase_id: 1,
          Owner_id: owner,
          InputUser_id: iUser,
          AssessmentUser_id: aUser,
          Name: pName,
          ProjectCode: pCode,
          Subject: subject,
          CreationDate: date,
          LastEdited: date, 
        }
      });
      console.log(response)
    } catch(error) {
      console.log(error)
    }

    setPName("")
    setPCode("")
    setSubject("")
    setIUser("")
    setAUser("")
    setFormHidden(true)
  }

  useEffect(() => {
    inputElement.current.focus()
  }, [])

  return (
    <>
    <div className={styles.greyedOut}></div>
    <div className={styles.projectForm}>
        <form onSubmit={handleFormSubmit}>
            <div className={styles.title}>Add a project</div>
            <Spacer y={1} />
            <Input required ref={inputElement} value={pName} onChange={e => setPName(e.target.value)} clearable bordered label="Project name" Placeholder="Enter a project name" width="100%" />
            <Spacer y={1} />
            <Input required value={pCode} onChange={e => setPCode(e.target.value)} clearable bordered label="Project code" Placeholder="Enter a project code" width="100%"/>
            <Spacer y={1} />
            <Input required value={subject} onChange={e => setSubject(e.target.value)} clearable bordered label="Subject" Placeholder="Enter a project subject" width="100%"/>
            <Spacer y={1} />
            <div className={styles.select}>
                <label htmlFor="inputUser-select">Input User</label>
                <br></br>
                <select required value={iUser} onChange={e => setIUser(e.target.value)} name="inputUser" id="inputUser-select">
                    <option value="">Choose a user</option>
                    {users.map((user) => 
                      <option key={user.id} value={user.id}>{`${user.FirstName} ${user.LastName}`}</option>
                    )}
                </select>
            </div>
            <Spacer y={1} />
            <div className={styles.select}>
                <label htmlFor="assessmentUser-select">Assessment User</label>
                <br></br>
                <select required value={aUser} onChange={e => setAUser(e.target.value)} name="assessmentUser" id="assessmentUser-select">
                    <option value="">Choose a user</option>
                    {users.map((user) => 
                      <option key={user.id} value={user.id}>{`${user.FirstName} ${user.LastName}`}</option>
                    )}
                </select>
            </div>
            <Spacer y={4} />
            <Button type='submit' className={styles.confirm} shadow color="secondary" auto>
              Confirm
            </Button>
            <Button className={styles.cancel} onClick={() => setFormHidden(true)} bordered color="error" auto>
              Cancel
            </Button>
          </form>
        </div>
        </>
  )
}

export default ProjectForm