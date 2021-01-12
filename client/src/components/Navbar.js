import React from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../AuthContext';

import { Button, Input } from 'antd';
const { Search } = Input;

function Navbar() {
  const { logout } = useAuth();
  const history = useHistory();
  async function handleLogout(){
    try {
      await logout();
      history.push('/login');
    } catch (err) {
        console.log(err.message);
    }
}

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
            size="medium"
            style={{width: 630}}
        />

        {/* buttons */}
        <div>
            <Button type="primary" onClick={handleLogout}>
                Log Out
            </Button>
        </div>

    </div>
  );
}

export default Navbar;
