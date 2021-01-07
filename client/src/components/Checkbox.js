import React, {useState} from 'react';
import {Checkbox} from 'antd';


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

function CheckBox(props){
    const [checked, setChecked] = useState([]); // array
    

    const handleToggle = (v) => {
        const currentIndex = checked.indexOf(v);
        const newChecked = [...checked];

        if (currentIndex === -1) { //not previously checked, so check it
            newChecked.push(v);
        } else { // already checked, so uncheck it
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        props.handleFilters(newChecked); //ex: [1, 2, 3, ]
    }

    const renderCheckboxList = () => interests.map( (value, index) => (
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
            {renderCheckboxList()}
        </div>
    );
}

export default CheckBox;