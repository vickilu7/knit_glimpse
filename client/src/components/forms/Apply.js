import React, {useEffect, useState} from 'react';
import {useAuth} from '../../AuthContext';
import './forms.css';
import { Drawer, Form, Button, Col, Row, Input, Select} from 'antd';

const { Option } = Select;

const Apply = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});

  const [visible, setVisible] = useState('');
  const [title, setTitle] = useState('');
  const [description, setMessage] = useState('');

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);


  useEffect(()=> {
    async function getCurrentUserInfo(){
        const response = await fetch(`api/users/${currentUser.email}`);
        const jsonData = await response.json();
        setUser(jsonData);
    }
      getCurrentUserInfo();
  }, [currentUser.email]);

  const onSubmitForm = async () => {
    try {

        const body = {
            creatorID : user.id,
            title: title,
            description : description
        }
        
        await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        window.location = "/";

    } catch (err) {
        console.error(err.message);
    }
}


  return (
      <>
        <Button onClick={showDrawer} type='primary'>
            Apply
        </Button>
        <Drawer
          title="Apply for project"
          width={720}
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={onClose} style={{ marginRight: 12 }}>
                Cancel
              </Button>
              <Button onClick={onSubmitForm} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                    name="title"
                    label="Project Title"
                    rules={[{required: true, message: 'Please enter a title'}]}
                    onChange={e => setTitle(e.target.value)}
                >
                  <Input placeholder="My Awesome Project" />
                </Form.Item>
              </Col>
            </Row>
                       
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                    name="message"
                    label="Additional Message"
                    onChange={e => setMessage(e.target.value)}
                >
                  <Input.TextArea rows={4} placeholder="Anything else you would like to say?" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>


            </Row>
 
          </Form>
        </Drawer>
      </>
    );
}

export default Apply;