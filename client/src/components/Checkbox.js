// can delete this

import React, {useState} from 'react';
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse

const interests = [
    {
        "id": 1,
        "name": "social"
    },
    {
        "id": 2,
        "name": "crypto"
    },
    {
        "id": 3,
        "name": "health"
    },
    {
        "id": 4,
        "name": "ai"
    }
];
const types = [
    {
        "id": 1,
        "name": "mobile"
    },
    {
        "id": 2,
        "name": "web"
    },
    {
        "id": 3,
        "name": "hardware"
    }
];

function CheckBox(props){
    const [checked, setChecked] = useState([]); // array ex: [1, 2, 3]
    
    var arr = [];
    if (props.filterKind === 'interests'){arr = interests} 
    else if (props.filterKind === 'types'){arr = types}

    const handleToggle = (v) => {
        const currentIndex = checked.indexOf(v);
        const newChecked = [...checked];

        if (currentIndex === -1) { //not previously checked, so check it
            newChecked.push(v);
        } else { // already checked, so uncheck it
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        console.log(newChecked);
        props.handleFilters(newChecked);
    }

    const renderCheckboxList = () => arr.map( (value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => handleToggle(value.name)}
                type="checkbox"
                checked={checked.indexOf(value.name) === -1 ? false : true}
            />
            <span>{value.name}</span>
        </React.Fragment>
    ))

    return(
        <div>
            <Collapse defaultActiveKey={['0']} >
                <Panel header={props.filterKind} key="1">
                    {renderCheckboxList()}
                </Panel>
            </Collapse>
        </div>
    );
}

export default CheckBox;