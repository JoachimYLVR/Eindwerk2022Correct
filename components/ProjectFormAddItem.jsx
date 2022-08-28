import { Button, Input, Spacer } from '@nextui-org/react';
import styles from "../styles/ProjectForm.module.scss";
import { useRef, useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import axios from 'axios';

const ProjectFormAddItem = ({sectionId, setFormHidden, items, setItems}) => {
  const inputElement = useRef();
  const [itemName, setItemName] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    let newItemId = 0
    //const formData = {id: nanoid(10), ItemName: itemName, Threads: []}
    setItems([...items, {id: nanoid(10), ItemName: itemName, Threads: []}])
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/item',
        data: {
          Section_id: sectionId,
          ItemName: itemName,
        }
      });
      console.log(response)
      newItemId = response.data[0]
    } catch(error) {
      console.log(error)
    }
    setItems([...items, {id: newItemId, ItemName: itemName, Threads: []}])
    setItemName("")
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
            <div className={styles.title}>Add item</div>
            <Spacer y={1} />
            <Input required ref={inputElement} value={itemName} onChange={e => setItemName(e.target.value)} clearable bordered label="Item name" placeholder="Enter an item name" width="100%" />
            <Spacer y={4} />
            <Button className={styles.confirm} type='submit' shadow color="secondary" auto>
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

export default ProjectFormAddItem