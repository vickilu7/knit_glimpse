import React from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../AuthContext';

import { Button } from 'antd';
import { MailOutlined, PhoneOutlined, AimOutlined } from '@ant-design/icons';

function Footer() {
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
    <div className="App-footer">
          {/* logo */}
          <div className="logo">Knit.</div>

          {/* about */}
          <div style={{width: 500}}>
            <div className="section">About</div>
            <p>
              Our vision is to connect self-starters to bring ideas to life. There
              is lost opportunity and a gap between people who have ideas and 
              people who want something to work on. Knit aims to help people find
              peers to collaborate with.
            </p>
            <div style={{marginTop: 30}}>
              <Button type="primary" onClick={handleLogout}>
                  Log Out
              </Button>
            </div>
          </div>

          {/* contact */}
          <div>
            <div className="section">Contact</div>
            <p><MailOutlined />  knit@gmail.com</p>
            <p><PhoneOutlined /> +1 (123) 456-7890</p>
            <p><AimOutlined /> Address City, NJ 00000</p>
          </div>
    </div>
);
}

export default Footer;
