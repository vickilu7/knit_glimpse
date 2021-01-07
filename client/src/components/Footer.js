import React from 'react';

import { Button } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  AimOutlined,
} from '@ant-design/icons';

function Footer() {
  return (
    <div className="App-footer">
          {/* logo */}
          <div className="logo">Knit.</div>

          {/* about */}
          <div style={{width: 500}}>
            <div className="section">About</div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
              ut aliquip ex ea commodo consequat.
            </p>
            <div style={{marginTop: 30}}>
              {/*fix this marginRight later*/}
              <Button style={{marginRight:25}}>
                Log In
              </Button>
              <Button type="primary">
                  Sign Up
              </Button>
            </div>
          </div>

          {/* contact */}
          <div>
            <div className="section">Contact</div>
            <p><MailOutlined />  email@email.com</p>
            <p><PhoneOutlined /> +1 (123) 456-7890</p>
            <p><AimOutlined /> Address City, NJ 00000</p>
          </div>
    </div>
);
}

export default Footer;
