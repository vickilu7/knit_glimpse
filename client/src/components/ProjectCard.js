import React, {useEffect, useState} from 'react';
// import Button from '@material-ui/core/Button';

import { Avatar, Button, Tag } from 'antd';
import 'antd/dist/antd.css';
import './projects.css';

function ProjectCard(props) {
    const [user, setUser] = useState([]);
    const [tags, setTags] = useState([]);

    const getUser = async () => {
      const response = await fetch(`/api/users/${props.projects.creator_id}`);
      const jsonData = await response.json();
      setUser(jsonData);
    }

    const getTags = async () => {
      const response = await fetch(`/api/projects/${props.projects.id}`);
      const jsonData = await response.json();
      setTags(jsonData);
    }

    useEffect(()=> {
      getUser();
      getTags();
    }, []);


    return (
        <div className="card">
            <div style={{width: 600}}>
              {/* title */}
              <div className="proj-title">{props.projects.title}</div>

              {/* tags */}
              <div style={{marginBottom: 36}}>
                  {tags.map(tag => <Tag color="#E0C8FB" key={tag.type}>{ tag.type }</Tag>)}
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

                {/* team members */}
                {/* <div style={{marginTop: 40}}>
                    <p className="subheader">Team Members</p>
                    <div>
                        <Avatar size="large">{props.projects.title.charAt(0)}</Avatar>
                        <Avatar size="large"></Avatar>
                        <Avatar size="large"></Avatar>
                        <Avatar size="large"></Avatar>
                    </div>
                </div> */}
            </div>
        </div>

    );
}

export default ProjectCard;
