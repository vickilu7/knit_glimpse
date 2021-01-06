import React, {useState} from 'react';
import { Form, Input, Select, Button} from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;


const AddProject = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [stage, setStage] = useState("");
    var typeArray = [];

    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    const handleChange = types => {typeArray = types;}

    const onSubmitForm = async () => {
        try {
            const t = [];
            typeArray.forEach(type=> {
                t.push(type.value);
            });

            console.log(t);
            
            const body = 
                {
                    title: title,
                    description : description,
                    stage : stage,
                    types: t
                   }
            
            const response = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response);
            window.location = "/";

        } catch (err) {
            console.error(err.message);
        }
}

    return(
        <div>
            <h1>Add Project</h1>

            <Form form={form} name="control-hooks" onFinish={onSubmitForm}>
                <Form.Item
                    name="title"
                    label="Project Title"
                    rules={[{required: true}]}
                    onChange={e => setTitle(e.target.value)}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{required: true}]}
                    onChange={e => setDescription(e.target.value)}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="stage"
                    label="Stage"
                    rules={[{required: true}]}
                    onChange={e => setStage(e.target.value)}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="type"
                    label="Project Type"
                    rules={[{required: true}]}
                >
                    <Select
                    placeholder="Mobile, Web, etc."
                    mode="multiple"
                    allowClear
                    labelInValue
                    onChange={handleChange}
                    >
                        <Option value="mobile" label="mobile">Mobile (iOS, Android)</Option>
                        <Option value="web" label="web">Web (Website, Web-apps)</Option>
                        <Option value="game" label="game">Game</Option>
                    </Select>
                </Form.Item>
        
                <Form.Item >
                    <Button type="primary" htmlType="submit">Submit</Button>
                    <Button htmlType="button" onClick={onReset}>Reset</Button>
                </Form.Item>
            </Form>

        </div>
    );
};

export default AddProject;
