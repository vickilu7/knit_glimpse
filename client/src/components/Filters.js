import React from 'react';

import { Select, Button} from 'antd';
const { Option } = Select;

//function Filters(props)
function FiltersComponent() { 
    // const handleChange = (type, value) => {
    //   console.log(`selected ${type}.${value}`);
    //   props.allFilterClickListener(type, value);
    // }
    return (
      <div className="App-filters">
              {/* main filters button */}
              <Button block>
                  Filters
              </Button>

              {/* filters list */}
              <div style={{margin: "30px auto", width: "inherit"}}>
                  <h1 className="section">Project Type</h1>
                  <Select
                    mode="multiple"
                    className="filters-item"
                    size="large"
                    placeholder="Mobile, Web, etc."
                    // onChange={(value) => handleChange("projectType", value)}
                    optionLabelProp="label"
                  >
                    <Option value="mobile" label="Mobile">
                      <div className="demo-option-label-item">
                        Mobile (iOS, Android)
                      </div>
                    </Option>
                    <Option value="web" label="Web">
                      <div className="demo-option-label-item">
                        Web (Website, Web-apps)
                      </div>
                    </Option>
                    <Option value="game" label="Game">
                      <div className="demo-option-label-item">
                        Game
                      </div>
                    </Option>
                  </Select>

                  <h1 className="section">Interest</h1>
                  <Select
                    mode="multiple"
                    className="filters-item"
                    size="large"
                    placeholder="Health, Finance, etc."
                    // onChange={(value) => handleChange("interest", value)}
                    optionLabelProp="label"
                  >
                    <Option value="health" label="Health">
                      <div className="demo-option-label-item">
                        Health
                      </div>
                    </Option>
                    <Option value="finance" label="Finance">
                      <div className="demo-option-label-item">
                        Finance
                      </div>
                    </Option>
                    <Option value="gaming" label="Gaming">
                      <div className="demo-option-label-item">
                        Gaming
                      </div>
                    </Option>
                  </Select>
              </div>
      </div>
    );
}

export default FiltersComponent;
