import { Button, Input, Spacer } from '@nextui-org/react';
import styles from "../styles/ProjectForm.module.scss";
import { useAppContext } from '../context/state';
import { useRef, useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import axios from 'axios';

const ProjectFormAddSection = ({projectId, setSections, setSectionFormHidden}) => {
  //const {state, setFormHidden} = useAppContext();
  const inputElement = useRef();
  const [sectionName, setSectionName] = useState("");
  const [sectionType, setSectionType] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const id = nanoid(10)
    const formData = {
      id,
      Project_id: projectId,
      SectionName: sectionName,
      SectionType: sectionType,
    }
    setSections(prev => [...prev, formData])
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/section',
        data: {
          id,
          Project_id: projectId,
          SectionName: sectionName,
          SectionType: sectionType,
        }
      });
      console.log(response)
    } catch(error) {
      console.log(error)
    }
    setSectionFormHidden(true)
  }

  useEffect(() => {
    inputElement.current.focus()
  }, [])

  return (
    <>
    <div className={styles.greyedOut}></div>
    <div className={styles.projectForm}>
        <form onSubmit={handleFormSubmit}>
            <div className={styles.title}>Add a section</div>
            <Spacer y={1} />
            <Input required ref={inputElement} value={sectionName} onChange={e => setSectionName(e.target.value)} clearable bordered label="Section name" placeholder="Enter a section name" width="100%" />
            <Spacer y={1} />
            <Input required value={sectionType} onChange={e => setSectionType(e.target.value)} clearable bordered label="Section type" placeholder="Enter a section type" width="100%"/>
            <Spacer y={4} />
            <Button className={styles.confirm} type='submit' shadow color="secondary" auto>
              Confirm
            </Button>
            <Button className={styles.cancel} onClick={() => setSectionFormHidden(true)} bordered color="error" auto>
              Cancel
            </Button>
          </form>
        </div>
        </>
  )
}

export default ProjectFormAddSection