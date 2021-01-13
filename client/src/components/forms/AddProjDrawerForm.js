import React, {useEffect, useState} from 'react';
import {useAuth} from '../../AuthContext';
import './forms.css';
import { Drawer, Form, Button, Col, Row, Input, Select} from 'antd';

const { Option } = Select;

const AddProjDrawerForm = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stage, setStage] = useState('');
  var typeArray = [];
  var interestArray = [];

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  const handleTypeChange = types => {typeArray = types}
  const handleInterestChange = interests => {interestArray = interests}

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
        const t = [];
        const i = [];
        typeArray.forEach(type=> t.push(type.value));
        interestArray.forEach(interest => i.push(interest.value));

        const body = {
            creatorID : user.id,
            title: title,
            description : description,
            stage : stage,
            types: t,
            interests: i
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
        <Button onClick={showDrawer}>
            Add a Project Idea
        </Button>
        <Drawer
          title="Create a new project"
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
                    name="description"
                    label="Description"
                    rules={[{required: true, message: 'Please enter description'}]}
                    onChange={e => setDescription(e.target.value)}
                >
                  <Input.TextArea rows={4} placeholder="Describe your project" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                    name="stage"
                    label="Stage"
                    rules={[{required: true, message: 'Please enter a stage'}]}
                    onChange={e => setStage(e.target.value)}
                >
                  <Input placeholder="Early, Late, etc..." />
                </Form.Item>
              </Col>

            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Project Type"
                  rules={[{ required: true, message: 'Please select what type(s) of project this is' }]}
                >
                  <Select placeholder="Mobile, Web, etc..."
                    mode="multiple"
                    allowClear
                    labelInValue
                    onChange={handleTypeChange}
                  >
                    <Option value="Mobile" label="Mobile">Mobile (iOS, Android)</Option>
                    <Option value="Web" label="Web">Web (Website, Web-apps)</Option>
                    <Option value="Hardware" label="Hardware">Hardware</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                    name="interests"
                    label="Interest Areas"
                    rules={[{ required: true, message: 'Please select what interest(s) this project has' }]}
                >
                    <Select
                    placeholder="Social, Healthcare, etc..."
                    mode="multiple"
                    allowClear
                    labelInValue
                    onChange={handleInterestChange}
                    >
                        <Option value="Social" label="Social">Social</Option>
                        <Option value="Crypto" label="Crypto">Cryptocurrency</Option>
                        <Option value="Health" label="Health">Health</Option>
                        <Option value="AI" label="AI">Artificial Intelligence</Option>
                    </Select>
                </Form.Item>
              </Col>
            </Row>
 
          </Form>
        </Drawer>
      </>
    );
}

export default AddProjDrawerForm;