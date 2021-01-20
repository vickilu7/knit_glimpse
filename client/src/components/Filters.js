import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

function FiltersComponent(props) {
    var selectPlaceholder='';
    var optionsList = [];

    if (props.filterKind === 'Types'){
      selectPlaceholder = 'Mobile, Web, etc...';
      optionsList = [
        {
            placeholder : 'Mobile (iOS, Android)',
            value : 'Mobile'
        },
        {
            placeholder : 'Web (Website, Web-apps)',
            value : 'Web'
        },
        {
            placeholder : 'Hardware',
            value : 'Hardware'
        }
      ];
    } else if (props.filterKind === 'Interests'){
      selectPlaceholder = 'Social, Finance, etc...';
      optionsList = [
        {
            placeholder : 'Social',
            value : 'Social'
        },
        {
            placeholder : 'Cryptocurrency',
            value : 'Crypto'
        },
        {
            placeholder : 'Health',
            value : 'Health'
        },
        {
          placeholder : 'Artificial Intelligence',
          value : 'AI'
      }
      ];
    }

    const renderOptionsList = () => optionsList.map( (option, index) => (
        <React.Fragment key={index}>
              <Option value={option.value} label={option.value}>
                <div className="demo-option-label-item">
                  {option.placeholder}
                </div>
              </Option>
        </React.Fragment>
    ))

    return (
          <div style={{width: "inherit"}}>
              <h1 className="section">{props.filterKind}</h1>

              <Select
                mode="multiple"
                className="filters-item"
                size="medium"
                placeholder={selectPlaceholder}
                optionLabelProp="label"
                onChange={(value) => props.handleFilters(value)}
                allowClear
              >
                {renderOptionsList()}
              </Select>

          </div>
    );
}

export default FiltersComponent;