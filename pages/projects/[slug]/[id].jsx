import Nav from "../../../components/Nav";
import styles from "../../../styles/ProjectSection.module.scss";
import { Status } from "../../../components/Status";
import { Button, Card, Spacer, Collapse, Popover} from '@nextui-org/react';
import {ProjectFormAddItem} from "../../../components/Forms";
import Link from "next/link";
import { IconFastForward, IconPlus} from "../../../components/icons";
import RewindPopover from "../../../components/RewindPopover";
import db from "../../../db";
import {nest} from "../../../nest";
import {parse} from "../../../helpers";
import { useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';

const projectSection = ({section, id, slug, project}) => {
    const [items, setItems ] = useState(section.Items)
    //console.log(items)
    const [formHidden, setFormHidden] = useState(true)
    const phaseIndex = project[0].PhaseId-2
    const checkArray = (arr) => {
        if(arr.length == 0){
          return false;
        } else {
          return true;
        }
      }

    const handleItemDelete = async (id) => {
        setItems(prev => prev.filter((e) => e.id !== id))
        try {
          const response = await axios({
            method: 'delete',
            url: 'http://localhost:3000/api/item',
            data: {
              id,
            }
          });
          console.log(response)
        } catch(error) {
          console.log(error)
        }
    }
    const handleThreadDelete = async (item, id) => {
        const itemsRem = items.filter((e) => e.id !== item.id)
        const threadsRem = item.Threads.filter((e) => e.id !== id)
        setItems([...itemsRem, {...item, Threads: [...threadsRem]}])
        try {
          const response = await axios({
            method: 'delete',
            url: 'http://localhost:3000/api/thread',
            data: {
              id,
            }
          });
          console.log(response)
        } catch(error) {
          console.log(error)
        }
      }
    
    const handleThreadAdd = async (item) => {
        const itemsRem = items.filter((e) => e.id !== item.id)
        setItems([...itemsRem, {...item, Threads: [...item.Threads, {id: nanoid(10), Elements: [{id: nanoid(10), PhaseId: project[0].PhaseId, Text: " ", ScreenshotPath: ""}]}]}])
        let newThreadId = 0
        let newElementId = 0
        try {
            const response = await axios({
              method: 'post',
              url: 'http://localhost:3000/api/thread',
              data: {
                  Item_id: item.id
              }
            });
            newThreadId = response.data[0]
          } catch(error) {
            console.log(error)
          }
          try {
            const response = await axios({
              method: 'post',
              url: 'http://localhost:3000/api/element',
              data: {
                  Phase_id: project[0].PhaseId,
                  Thread_id: newThreadId,
                  Text: " ",
                  ScreenShotPath: "",
              }
            });
            newElementId = response.data[0]
          } catch(error) {
            console.log(error)
          }
        console.log(newThreadId, newElementId)
        setItems([...itemsRem, {...item, Threads: [...item.Threads, {id: newThreadId, Elements: [{id: newElementId, PhaseId: project[0].PhaseId, Text: " ", ScreenshotPath: ""}]}]}])
    }
    const handleElementSave = async (e, item, thread, elementId, elementSsp) => {
        e.preventDefault()
        const itemsRem = items.filter((el) => el.id !== item.id)
        const threadsRem = item.Threads.filter((el) => el.id !== thread.id)
        const elementsRem = thread.Elements.filter((el) => el.id !== elementId)
        const newValue = e.target.childNodes[1].value
        setItems([...itemsRem, {...item, Threads: [...threadsRem, {id: thread.id, Elements: [...elementsRem, {id: elementId, PhaseId: project[0].PhaseId, Text: newValue, ScreenshotPath: elementSsp}]}]}])
        if(elementId === 0) {
            try {
                const response = await axios({
                  method: 'post',
                  url: 'http://localhost:3000/api/element',
                  data: {
                      Phase_id: project[0].PhaseId,
                      Thread_id: thread.id,
                      Text: newValue,
                      ScreenShotPath: elementSsp,
                  }
                });
                setItems([...itemsRem, {...item, Threads: [...threadsRem, {id: thread.id, Elements: [...elementsRem, {id: response.data[0], PhaseId: project[0].PhaseId, Text: newValue, ScreenshotPath: elementSsp}]}]}])
              } catch(error) {
                console.log(error)
              }
        }else{
            try {
                const response = await axios({
                    method: 'patch',
                    url: 'http://localhost:3000/api/element',
                    data: {
                        id: elementId,
                        Phase_id: project[0].PhaseId,
                        Thread_id: thread.id,
                        Text: newValue,
                        ScreenShotPath: elementSsp,
                  }
                })
            } catch(error) {
                console.log(error)
            }
        }
    }

    return (
    <>
      <Nav />
        <div className={styles.sectionContainer}>
            <div className={styles.sectionRibbon}>
                <Link href={`/projects/${slug}`}>
                    <h2>{project[0].ProjectName}</h2>
                </Link>
                <Status type={project[0].Status.toLowerCase()}>{project[0].Status}</Status>
                <Status type="phase">{project[0].Phase}</Status>
                <Spacer y={1} />
                <Collapse.Group accordion={false}>
                    <Collapse title="Sections" expanded={true} css={{h3: {fontSize: "20px"}}}>
                        <ul>
                            {project.map((section) => {
                                return <li key={section.id}><Link href={`/projects/${slug}/${section.id}`}>{section.SectionName}</Link></li>
                            })}
                        </ul>
                    </Collapse>
                </Collapse.Group>
            </div>
            <div className={styles.sectionBody}>
                <div className={styles.sectionTopRibbon} >
                    <Card bordered shadow={false} 
                        css={{ 
                            width: "100%",
                            flexDirection: "row",
                            justifyContent: "space-between", 
                            alignItems: "center",
                            div: {flexDirection: "row", alignItems: "center"},
                        }}>
                        <div>
                            <h1>{section.SectionName}</h1>
                            <h2><b>Type:</b> {section.SectionType}</h2>
                        </div>
                        <Button onClick={() => setFormHidden(false)} aria-label="Add item" color="secondary" auto iconRight={<IconPlus />}>
                            Add item
                        </Button>
                    </Card>
                </div>
                <Collapse.Group accordion={false}>
                    {!items.length && <p>No items to display</p> || items.map((item) => {
                        //console.log(item)
                        const threads = item.Threads
                        return (
                            <Collapse key={item.id} title={item.ItemName} css={{h3: {fontSize: "18px"},}}>
                            <div className={styles.buttons}>
                                <Button onClick={() => handleThreadAdd(item)} aria-label="Add thread" color="secondary" auto>Add thread</Button>
                                <Popover placement="left">
                                    <Popover.Trigger>
                                        <Button bordered color="error">Delete item</Button>
                                    </Popover.Trigger>
                                    <Popover.Content css={{padding: "25px"}}>
                                        <p>Are you sure you want to delete this item?</p>
                                        <Button onClick={() => handleItemDelete(item.id)} color="error" auto>Delete</Button>
                                    </Popover.Content>
                                </Popover>
                            </div>
                            {!threads.length && null || threads.map((thread) => {
                                //console.log(thread.Elements)
                                const elements = thread.Elements.filter((el) => el.PhaseId <= phaseIndex)
                                const displayEl = thread.Elements.filter((el) => el.PhaseId == phaseIndex+1)
                                const inputElId = 0
                                try{
                                    inputElId = thread.Elements.filter((el) => el.PhaseId == phaseIndex+2)[0].id
                                }
                                catch(error){}
                                const newText = ""
                                try{
                                    newText = thread.Elements.filter((el) => el.PhaseId == phaseIndex+2)[0].Text
                                }
                                catch(error){}
                                const inputElSsp = ""
                                //const inputElId = thread.Elements.filter((el) => el.PhaseId == phaseIndex+2)[0].id || 0
                                //const inputElSsp = thread.Elements.filter((el) => el.PhaseId == phaseIndex+2)[0].ScreenShotPath || ""
                                const showRewind = checkArray(elements)
                                //const lastComment = thread.Elements[phaseIndex].Text;
                                return (
                                    <div key={thread.id} className={styles.thread}>
                                        <Popover placement="left">
                                            <Popover.Trigger>
                                                <Button auto bordered color="error">Delete</Button>
                                            </Popover.Trigger>
                                            <Popover.Content css={{padding: "25px"}}>
                                                <p>Are you sure you want to delete this thread?</p>
                                                <Button onClick={() => handleThreadDelete(item, thread.id)} color="error" auto>Delete</Button>
                                            </Popover.Content>
                                        </Popover>
                                        <div className={styles.rewind}>
                                            <Popover placement="right">
                                                <Popover.Trigger>
                                                    {showRewind && 
                                                        <button>
                                                            <IconFastForward active />
                                                        </button> ||
                                                        <IconFastForward />
                                                    }
                                                </Popover.Trigger>
                                                <Popover.Content css={{ maxWidth: "700px" }}>
                                                    <RewindPopover elements={elements} />
                                                </Popover.Content>
                                            </Popover>
                                        </div>
                                        <div className={styles.lastComment}>
                                            <p>Last comment</p>
                                            <div css={{minHeight: "20px"}}>
                                                {/*thread.Elements.length > 1 && thread.Elements[phaseIndex].Text || null*/}
                                                {checkArray(thread.Elements) && checkArray(displayEl) && thread.Elements.filter((el) => el.PhaseId == phaseIndex+1)[0].Text || null}
                                            </div>
                                        </div>
                                        <div className={styles.response}>
                                            <form onSubmit={(e) => handleElementSave(e, item, thread, inputElId, inputElSsp)}>
                                                <label htmlFor="response">Response</label>
                                                <textarea name="" cols="30" rows="5" defaultValue={newText}></textarea>
                                                <Button type='submit' className={styles.saveButton} auto color="secondary">Save</Button>
                                            </form>
                                        </div>
                                    </div>
                                )
                            })}
                        </Collapse>)
                    })}
                </Collapse.Group>
            </div>
        </div>
        {!formHidden && <ProjectFormAddItem sectionId={id} setFormHidden={setFormHidden} items={items} setItems={setItems}/>}
    </>
  )
}

export default projectSection

export const getServerSideProps = async (context) => {
    const {params: {slug, id}} = context;
    const project = parse(await db
        .select("Project_id","projects.Name as ProjectName","sections.id","SectionName", "SectionType", "phase.Phase", "status.Name as Status", "CurrentPhase_id as PhaseId")
        .from("sections")
        .innerJoin('projects', 'Project_id', 'projects.id')
        .innerJoin('phase', 'projects.CurrentPhase_id', 'phase.id')
        .innerJoin('status', 'projects.Status_id', 'status.id')
        .where("Project_id", slug)
      );
    const data = parse(await db
        .select("feedbackelements.id as FbId","threads.id as ThreadId","Text","ScreenShotPath","phase.id as PhaseId","items.id as ItemId","ItemName","sections.id as SectionId","SectionName","SectionType")
        .from("feedbackelements")
        .innerJoin('phase', 'Phase_id', 'phase.id')
        .rightJoin('threads', 'Thread_id', 'threads.id')
        .rightJoin('items', 'item_id', 'items.id')
        .rightJoin('sections', 'section_id', 'sections.id')
        .where("sections.id", id)
        );
    const definition = [{
        id: {column: 'SectionId'},
        SectionName: 'SectionName',
        SectionType: 'SectionType',
        Items: [{
            id: {column: 'ItemId'},
            ItemName: 'ItemName',
            Threads: [{
                id: {column: 'ThreadId', type: 'NUMBER'},
                Elements: [{
                    id: {column: 'FbId', type: 'NUMBER'},
                    PhaseId: 'PhaseId',
                    Text: 'Text',
                    ScreenShotPath: 'ScreenShotPath'
                }] || []
            }] || []
        }] || []
    }];
    const sections = nest(data, definition)
    return {
      props: {
        section: sections[0],
        id,
        slug,
        project,
      },
    };
  }