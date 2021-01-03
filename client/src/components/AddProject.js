import React, {useState} from 'react';

const AddProject = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [stage, setStage] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = 
                {
                    title: title,
                    description : description,
                    stage : stage,
                    create_date: 55555,
                    update_date: 44433
                   }
            
            const response = await fetch("http://localhost:5000/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
}

    return(
        <div>
            <h1>Add Project</h1>
            <form onSubmit={onSubmitForm}> 
                <label for="projtitle">Project Title</label><br/>
                <input type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    id="projtitle"
                /><br/>
                <label for="projdesc">Project Description</label><br/>
                <input type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    id="projdesc"
                /><br/>
                <label for="projstage">Project Stage</label><br/>
                <input type="text"
                    value={stage}
                    onChange={e => setStage(e.target.value)}
                    id="projstage"
                /><br/>
                <button>Add</button>
            </form>
        </div>
    );
};

export default AddProject;
