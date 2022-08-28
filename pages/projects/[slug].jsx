import Nav from "../../components/Nav";
import styles from "../../styles/ProjectDetails.module.scss";
import { Status } from "../../components/Status";
import { Button, Card, Spacer, Collapse, Popover} from '@nextui-org/react';
import {ProjectFormEdit, ProjectFormAddSection} from "../../components/Forms";
import Link from "next/link"
import { IconPlus } from "../../components/icons";
import db from "../../db";
import {parse} from "../../helpers";
import { useEffect, useState } from 'react';
import axios from 'axios';
 
const ProjectDetail = ({sectionsList, projectInfo, usersList, slug}) => {
  const [project, setProject] = useState(projectInfo)
  const [sections, setSections] = useState(sectionsList)
  const [sectionFormHidden, setSectionFormHidden] = useState(true)
  const [editFormHidden, setEditFormHidden] = useState(true)

  const findUserName = (value) => {
    const user = usersList.filter(el => el.id === value)
      .map(el => {
        return el.FirstName+" "+el.LastName
      })
    return user
  }

  const handleDelete = async (id) => {
    console.log(id)
    setSections(prev => prev.filter((e) => e.id !== id))
    try {
      const response = await axios({
        method: 'delete',
        url: 'http://localhost:3000/api/section',
        data: {
          id,
        }
      });
      console.log(response)
    } catch(error) {
      console.log(error)
    }
  }

  const handleCompleteProject = async () => {
    const date = new Date().toISOString().split('T')[0]
    setProject({
      ...project,
      Status: "Completed",
      StatusId: 2,
    })
    try {
      const response = await axios({
        method: 'patch',
        url: 'http://localhost:3000/api/project',
        data: {
          id: projectInfo.id,
          Status_id: 2,
          LastEdited: date, 
        }
      });
      console.log(response)
    } catch(error) {
      console.log(error)
    }
  }

  const handleGoToNextPhase = async () => {
    const phase = [
      "Input phase 1",
      "Assessment phase 1",
      "Input phase 2",
      "Assessment phase 2",
      "Input phase 3",
      "Assessment phase 3",
      "Input phase 3",
      "Assessment phase 3",
      "Input phase 4",
      "Assessment phase 4",
      "Input phase 5",
      "Assessment phase 5"
    ]
    const date = new Date().toISOString().split('T')[0]
    setProject({
      ...project,
      CurrentPhase: phase[project.PhaseId],
      PhaseId: project.PhaseId+1,
    })
    try {
      const response = await axios({
        method: 'patch',
        url: 'http://localhost:3000/api/project',
        data: {
          id: projectInfo.id,
          CurrentPhase_id: project.PhaseId+1,
          LastEdited: date, 
        }
      });
      console.log(response)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <>
      <Nav /> 
      <div className={styles.detailContainer}>
        <div className={styles.detailRibbon}>
          <h2>{project.name}</h2>
          <Status type={project.Status.toLowerCase()}>{project.Status}</Status>
          <Status type="phase">{project.CurrentPhase}</Status>
          <Spacer y={1} />
          <ul>
            <li><b>Subject:</b> {project.Subject}</li>
            <li><b>Project code:</b> {project.ProjectCode}</li>
            <li><b>Project owner:</b> {findUserName(project.OwnerId)}</li>
            <li><b>Input user:</b> {findUserName(project.InputUserId)}</li>
            <li><b>Assessment user:</b> {findUserName(project.AssessmentUserId)}</li>
          </ul>
          <Spacer y={2} />
          <Button onClick={() => setEditFormHidden(false)} shadow color="primary" auto>
            Edit settings
          </Button>
        </div>
        <div className={styles.detail}>
          <div className={styles.detailTopRibbon} >
            <Card bordered shadow={false} 
              css={{ 
                width: "100%",
                padding: "12px 7px",
                div: {flexDirection: "row", padding: "0px"},
              }}>
              <Button className={styles.addSection} onClick={() => setSectionFormHidden(false)} aria-label="Add section" color="secondary" auto
                iconRight={<IconPlus />}
              >
                Add a section
              </Button>
              {project.StatusId == 1 &&
                <Popover placement="left">
                  <Popover.Trigger>
                    <Button bordered color="primary" auto>
                      Next phase
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content css={{padding: "25px", maxWidth: "350px"}}>
                    <p>Are you sure you want to complete the current phase and move on to the next?</p>
                    <Button onClick={handleGoToNextPhase} color="primary" auto>
                      Next phase
                    </Button>
                  </Popover.Content>
                </Popover>
              }
              {project.StatusId == 1 && 
                <Popover placement="left">
                  <Popover.Trigger>
                    <Button bordered color="secondary" auto>
                      Complete project
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content css={{padding: "25px", maxWidth: "350px"}}>
                    <p>Are you sure you want to change the status of this project?</p>
                    <Button onClick={handleCompleteProject} color="secondary" auto>
                      Complete project
                    </Button>
                  </Popover.Content>
                </Popover>
              } 
            </Card>
          </div>
          <Collapse.Group accordion={false}>
            {sections.map((section) => 
              <Collapse key={section.id} title={section.SectionName} css={{h3: {fontSize: "20px"},}}>
                <div className={styles.buttons}>
                  <Button aria-label="Add section" color="primary" auto css={{a: {color: "white"}}}>
                    <Link href={`/projects/${slug}/${section.id}`}>Show all section threads</Link> 
                  </Button>
                  <Popover placement="left">
                    <Popover.Trigger>
                      <Button bordered color="error">Delete</Button>
                    </Popover.Trigger>
                    <Popover.Content css={{padding: "25px"}}>
                      <p>Are you sure you want to delete this section?</p>
                    <Button onClick={() => handleDelete(section.id)} color="error" auto>Delete</Button>
                    </Popover.Content>
                  </Popover>
                </div>
                <ul>
                  <li><b>Type:</b> {section.SectionType}</li>
                </ul>
            </Collapse>
            )}
          </Collapse.Group>
        </div>
      </div>
      {!editFormHidden && <ProjectFormEdit projectInfo={project} users={usersList} setProject={setProject} setEditFormHidden={setEditFormHidden}/>}
      {!sectionFormHidden && <ProjectFormAddSection projectId={slug} setSections={setSections} setSectionFormHidden={setSectionFormHidden}/>}
    </>
  )
}

export default ProjectDetail

export const getServerSideProps = async (context) => {
  const {params: {slug}} = context;
  //console.log(context)
  const sectionsList = parse(await db
    .select("id","Project_id","SectionName", "SectionType")
    .from("sections")
    .where("Project_id", slug)
  );
  const projects = parse(await db
    .select("projects.id", "status.name as Status","status.id as StatusId","phase.Phase as CurrentPhase","phase.id as PhaseId","Owner_id as OwnerId","InputUser_id as InputUserId","AssessmentUser_id as AssessmentUserId","projects.name","ProjectCode","Subject","CreationDate","LastEdited")
    .from("projects")
    .where("projects.id", slug)
    .innerJoin('phase', 'projects.CurrentPhase_id', 'phase.id')
    .innerJoin('status', 'projects.Status_id', 'status.id')
  );
  const usersList = parse(await db
    .select("id", "UserFirstName as FirstName","UserLastName as LastName")
    .from("users")
    );
  //console.log(sections, project)
  return {
    props: {
      sectionsList,
      projectInfo: projects[0],
      usersList,
      slug,
    },
  };
}