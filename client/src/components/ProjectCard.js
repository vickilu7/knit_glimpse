import React, {useEffect, useState} from 'react';

import { Avatar, Button, Tag } from 'antd';
import './projects.css';

function ProjectCard(props) {
    const [user, setUser] = useState([]);
    const [interests, setInterests] = useState([]);

    const getUser = async () => {
      const response = await fetch(`/api/users/${props.projects.creator_id}`);
      const jsonData = await response.json();
      setUser(jsonData);
    }

    const getInterests = async () => {
      const response = await fetch(`/api/projects/${props.projects.id}`);
      const jsonData = await response.json();
      setInterests(jsonData);
    }

    useEffect(()=> {
      getUser();
      getInterests();
    }, []);


    return (
        <div className="card">
            <div style={{width: 600}}>
              {/* title */}
              <div className="proj-title">{props.projects.title}</div>

              {/* tags */}
              <div style={{marginBottom: 36}}>
                  {interests.map(i => <Tag color="#E0C8FB" className="proj-tags" key={i.interest}>{ i.interest }</Tag>)}
              </div>

              {/* description */}
              <p>{props.projects.description}</p>

              {/* user who posted */}
              <div className="proj-speaker">
                  <Avatar style={{
                    color: '#f56a00', backgroundColor: '#fde3cf', marginRight: "8px" }}>
                      {/* {user.first_name.charAt(0)}{user.last_name.charAt(0)} */}
                      {user.first_name}
                  </Avatar>
                  <div className="subtext">
                    {user.first_name} {user.last_name}, {user.role}
                </div>
              </div>
            </div>

            <div style={{width: 240}}>
                {/* buttons */}
                <div className="dual-buttons">
                    <Button>Save</Button>
                    <Button type="primary">Apply</Button>
                </div>
            </div>
        </div>

    );
}

export default ProjectCard;
