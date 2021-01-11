import React from 'react';

import { Button, Input } from 'antd';
const { Search } = Input;

function Navbar() {
  return (
    <div className="App-navbar">
        {/* logo */}
        <div className="logo">
          <a href="/" style={{color:"black"}}>
          Knit.</a>
        </div>

        {/* search */}
        <Search
            placeholder="Search"
            onSearch={value => console.log(value)}
            size="large"
            style={{width: 630}}
        />

        {/* buttons */}
        <div>
            <Button type="link">
                Log In
            </Button>
            <Button type="primary">
                Sign Up
            </Button>
        </div>

    </div>
  );
}

export default Navbar;
