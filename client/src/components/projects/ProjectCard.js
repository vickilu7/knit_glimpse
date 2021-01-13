import React, {useEffect, useState} from 'react';
import { Avatar, Button, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './projects.css';

function ProjectCard(props) {
    const [user, setUser] = useState([]);
    const [interests, setInterests] = useState([]);

    useEffect(()=> {
      const getUser = async () => {
        try {
          const response = await fetch(`/api/users/${props.projects.creator_id}`);
          const jsonData = await response.json();
          setUser(jsonData);
        } catch (err) {
          console.error(err.message);
        }
      }
  
      const getInterests = async () => {
        try {
          const response = await fetch(`/api/projects/${props.projects.id}`);
          const jsonData = await response.json();
          setInterests(jsonData);          
        } catch (err) {
          console.error(err.message);
        }
      }

      getUser();
      getInterests();
    }, [props.projects]);

    const getTagColor = (interest) => {
      const tagMappings = {
        'Social':'#E0C8FB',
        'Crypto': '#F9E8C5',
        'Health' : '#D8FAFA',
        'AI' : '#FDE3CF'
      }
      return tagMappings[interest];
    }

    return (
        <div className="card">
            <div style={{width: 600}}>
              {/* title */}
              <div className="proj-title">{props.projects.title}</div>

              {/* tags */}
              <div style={{marginBottom: 36}}>
                  {interests.map(i => 
                  <Tag id="proj-tags" 
                    style={{backgroundColor: getTagColor(i.interest)}}
                    key={i.interest}>
                      { i.interest }
                  </Tag>)}
              </div>

              {/* description */}
              <p>{props.projects.description}</p>

              {/* user who posted */}
              <div className="proj-speaker">
                  <Avatar style={{
                    color: '#FFF', backgroundColor: '#A1A1A1', marginRight: "8px" }}
                    icon={<UserOutlined />}
                  />
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
