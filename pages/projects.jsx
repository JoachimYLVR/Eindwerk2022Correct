import Nav from "../components/Nav";
import ProjectForm from "../components/ProjectForm";
import styles from "../styles/Projects.module.scss";
import { Table, Card, Button, Input } from '@nextui-org/react';
import { Status } from "../components/Status.js";
import Link from "next/link"
import { IconSearch, IconPlus } from "../components/icons";
import db from "../db";
import {parse} from "../helpers";
import { useState } from 'react';

const Projects = ({projectsList, usersList}) => {
  const [projects, setProjects] = useState(projectsList)
  const [searchString, setSearchString] = useState("")
  const [formHidden, setFormHidden] = useState(true)

  const handleSearch = (e) => {
    e.preventDefault()
    
    const tokens = searchString.toLowerCase().split(' ').filter((token) => {
      return token.trim() !== '';
    });
    if(tokens.length){
      const searchTermRegex = new RegExp(tokens.join('|'), 'gim');
      const filteredList = projects.filter((project) => {
        let completeString = '';
        for(let key in project) {
          if(project.hasOwnProperty(key) && project[key] !== '') {
            completeString += project[key].toString().toLowerCase().trim() + ' ';
          }
        }
        return completeString.match(searchTermRegex);
      });
      setProjects(filteredList)
    }
    else{
      setProjects(projectsList)
    }
  }

  return (
    <div>
      <Nav />
      <div className={styles.ProjectsRibbon} >
        <Card bordered shadow={false} 
          css={{ 
            width: "100%",
            div: {flexDirection: "row"},
          }}>
          <form onSubmit={handleSearch}>
            <Input 
              css={{
                width: "300px",
              }}
              aria-label="Project name"
              placeholder="Search by project name"
              contentRight={<IconSearch />}
              onChange={e => setSearchString(e.target.value)}
            />
          </form>
          <Button 
            onClick={() => setFormHidden(false)} 
            iconRight={<IconPlus />} 
            aria-label="Add project" 
            color="secondary" 
            auto
          >
            Add a project
          </Button>
        </Card>
      </div>
      <div className={styles.ProjectsTable} >
      <Table
      aria-label="Projects"
      selectionMode="single"
      css={{
        height: "auto",
        //minWidth: "100%",
      }}
      >
      <Table.Header>
        <Table.Column 
          css={{
            fontSize: "14px",
          }}
        >PROJECT NAME</Table.Column>
        <Table.Column
          css={{
            fontSize: "14px",
          }}
        >SUBJECT</Table.Column>
        <Table.Column
          css={{
            fontSize: "14px",
          }}
        >STATUS</Table.Column>
        <Table.Column
          css={{
            fontSize: "14px",
          }}
        >LAST EDITED ON</Table.Column>
      </Table.Header>
      <Table.Body>
        {projects.map((project, index) => 
          <Table.Row key={index+1}>
            <Table.Cell
              css={{a: {color: "#333333"}}}
            >
              <Link href={`/projects/${project.id}`}>{project.name}</Link>
            </Table.Cell>
            <Table.Cell>{project.Subject}</Table.Cell>
            <Table.Cell>
              <Status type={project.Status.toLowerCase()}>{project.Status}</Status>
            </Table.Cell>
            <Table.Cell>{project.LastEdited.slice(0, 10)}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
      <Table.Pagination
        shadow
        noMargin
        align="center"
        rowsPerPage={10}
        onPageChange={(page) => console.log({ page })}
      />
    </Table>
      </div>
      {!formHidden && <ProjectForm users={usersList} setProjects={setProjects} setFormHidden={setFormHidden}/>}
    </div>
  )
}

export default Projects

export const getServerSideProps = async () => {
  const projectsList = parse(await db
    .select("projects.id", "status.name as Status","status.id as StatusId","phase.Phase as CurrentPhase","phase.id as PhaseId","Owner_id as OwnerId","InputUser_id as InputUserId","AssessmentUser_id as AssessmentUserId","projects.name","ProjectCode","Subject","CreationDate","LastEdited")
    .from("projects")
    .where("Owner_id", "225699")
    .orWhere("InputUser_id", "225699")
    .orWhere("AssessmentUser_id", "225699")
    .innerJoin('phase', 'projects.CurrentPhase_id', 'phase.id')
    .innerJoin('status', 'projects.Status_id', 'status.id')
    .orderBy("projects.name")
  );
  const usersList = parse(await db
    .select("id", "UserFirstName as FirstName","UserLastName as LastName")
    .from("users")
    );
  return {
    props: {
      projectsList,
      usersList,
    },
  };
}

//