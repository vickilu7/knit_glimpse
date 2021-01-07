import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Drawer, Form, Button, Col, Row, Input, Select} from 'antd';

const { Option } = Select;

const AddProjDrawerForm = () => {
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

  const onSubmitForm = async () => {
    try {
        const t = [];
        const i = [];
        typeArray.forEach(type=> t.push(type.value));
        interestArray.forEach(interest => i.push(interest.value));

        const body = {
            title: title,
            description : description,
            stage : stage,
            types: t,
            interests: i
        }
        
        const response = await fetch("/api/projects", {
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
        <Button type="primary" onClick={showDrawer}>
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
              <Button onClick={onClose} style={{ marginRight: 8 }}>
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
                    <Option value="mobile" label="mobile">Mobile (iOS, Android)</Option>
                    <Option value="web" label="web">Web (Website, Web-apps)</Option>
                    <Option value="game" label="game">Game</Option>
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
                    placeholder="Social good, Healthcare, etc..."
                    mode="multiple"
                    allowClear
                    labelInValue
                    onChange={handleInterestChange}
                    >
                        <Option value="crypto" label="crypto">Cryptocurrency</Option>
                        <Option value="social" label="social">Social Good</Option>
                        <Option value="health" label="health">Health</Option>
                        <Option value="ai" label="ai">Artificial Intelligence</Option>
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