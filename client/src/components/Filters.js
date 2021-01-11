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
            value : 'mobile'
        },
        {
            placeholder : 'Web (Website, Web-apps)',
            value : 'web'
        },
        {
            placeholder : 'Hardware',
            value : 'hardware'
        }
      ];
    } else if (props.filterKind === 'Interests'){
      selectPlaceholder = 'Social, Finance, etc...';
      optionsList = [
        {
            placeholder : 'Social',
            value : 'social'
        },
        {
            placeholder : 'Cryptocurrency',
            value : 'crypto'
        },
        {
            placeholder : 'Health',
            value : 'health'
        },
        {
          placeholder : 'Artificial Intelligence',
          value : 'ai'
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
                size="large"
                placeholder={selectPlaceholder}
                optionLabelProp="label"
                onChange={(value) => props.handleFilters(value)}
              >
                {renderOptionsList()}
              </Select>

          </div>
    );
}

export default FiltersComponent;