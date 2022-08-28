import { Button, Input, Spacer } from '@nextui-org/react';
import styles from "../styles/ProjectForm.module.scss";
import { useAppContext } from '../context/state';
import { useRef, useEffect, useState } from "react";
import axios from 'axios';

const ProjectFormEdit = ({projectInfo : {id, name, ProjectCode, Subject, InputUserId, AssessmentUserId, CreationDate, CurrentPhase, PhaseId, OwnerId, Status, StatusId}, users, setProject, setEditFormHidden}) => {
  //const {state, setFormEditHidden} = useAppContext()
  const inputElement = useRef()
  const [pName, setPName] = useState(name);
  const [pCode, setPCode] = useState(ProjectCode);
  const [subject, setSubject] = useState(Subject);
  const [iUser, setIUser] = useState(InputUserId);
  const [aUser, setAUser] = useState(AssessmentUserId);

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    console.log("ik doe iets")
    const date = new Date().toISOString().split('T')[0]
    const formData = { 
      AssessmentUserId: aUser,
      CreationDate,
      CurrentPhase,
      PhaseId,
      InputUserId: iUser,
      LastEdited: date,
      OwnerId,
      ProjectCode: pCode,
      Status,
      StatusId,
      Subject: subject,
      id,
      name: pName,
    }
    setProject(formData)
    try {
      const response = await axios({
        method: 'patch',
        url: 'http://localhost:3000/api/project',
        data: {
          id,
          //Status_id,
          //CurrentPhase_id,
          //Owner_id: owner,
          InputUser_id: iUser,
          AssessmentUser_id: aUser,
          Name: pName,
          ProjectCode: pCode,
          Subject: subject,
          //CreationDate: date,
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
    setEditFormHidden(true)
  }

  useEffect(() => {
    inputElement.current.focus()
  }, [])

  return (
    <>
    <div className={styles.greyedOut}></div>
    <div className={styles.projectForm}>
        <form onSubmit={handleFormSubmit}>
            <div className={styles.title}>Edit project</div>
            <Spacer y={1} />
            <Input required ref={inputElement} value={pName} onChange={e => setPName(e.target.value)} clearable bordered label="Project name" Placeholder="Enter a project name" width="100%" />
            <Spacer y={1} />
            <Input required value={pCode} onChange={e => setPCode(e.target.value)} clearable bordered label="Project code" Placeholder="Enter a project code" width="100%"/>
            <Spacer y={1} />
            <Input required value={subject} onChange={e => setSubject(e.target.value)} clearable bordered label="Subject" Placeholder="Enter a project subject" width="100%"/>
            <Spacer y={1} />
            <div className={styles.select}>
                <label for="inputUser-select">Input User</label>
                <br></br>
                <select required value={iUser} onChange={e => setIUser(e.target.value)} name="inputUser" id="inputUser-select">
                    <option value="">Choose a user</option>
                    {users.map((user) => 
                      <option value={user.id}>{`${user.FirstName} ${user.LastName}`}</option>
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
                      <option value={user.id}>{`${user.FirstName} ${user.LastName}`}</option>
                    )}
                </select>
            </div>
            <Spacer y={4} />
            <Button type='submit' className={styles.confirm} shadow color="secondary" auto>
              Confirm
            </Button>
            <Button className={styles.cancel} onClick={() => setEditFormHidden(true)} bordered color="error" auto>
              Cancel
            </Button>
          </form>
        </div>
        </>
  )
}

export default ProjectFormEdit
