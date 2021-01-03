import React, { Component} from 'react';
// import Button from '@material-ui/core/Button';

import { Avatar, Button, Tag } from 'antd';
import 'antd/dist/antd.css';
import './projects.css';

function ProjectCard(Project) {

    // const tags = Project.children.interests.map(tag => <Tag color="#D8FAFA">{ tag }</Tag>);
    
    return (
        <div className="card">
            <div style={{width: 600}}>
              {/* title */}
              <div className="proj-title">{Project.children.title}</div>

              {/* tags */}
              {/* <div style={{marginBottom: 36}}>
                  {tags}
                <Tag color="#D8FAFA">Tag</Tag>
                <Tag color="#D8FAFA">Tag</Tag>
                <Tag color="#E0C8FB">Tag</Tag>
                <Tag color="#F9E8C5">Tag</Tag>
              </div> */}

              {/* description */}
              <p>{Project.children.description}</p>

              {/* user who posted */}
              <div className="proj-speaker">
                  <Avatar style={{
                    color: '#f56a00', backgroundColor: '#fde3cf', marginRight: "8px" }}>
                      {/* {Project.children.members[0].firstName.charAt(0)} */}
                      {/* {Project.children.members[0].lastName.charAt(0)} */}
                      {Project.children.title.charAt(0)}
                  </Avatar>
                  <div className="subtext">
                    {Project.children.title}, Role
                      {/* {Project.children.members[0].firstName} {Project.children.members[0].lastName} */}
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
                <div style={{marginTop: 40}}>
                    <p className="subheader">Team Members</p>
                    <div>
                        <Avatar size="large">{Project.children.title.charAt(0)}</Avatar>
                        <Avatar size="large"></Avatar>
                        <Avatar size="large"></Avatar>
                        <Avatar size="large"></Avatar>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ProjectCard;
