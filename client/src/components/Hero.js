import React from 'react';

import { Button} from 'antd';
import { ReactComponent as HeroImage} from './hero.svg';

function Hero() {
  return (
    <div className="App-hero">
      {/* stuff on left */}
      <div style={{width: 600}}>
          <h1 style={{fontSize: 56, fontWeight: 700}}>
            Catchy Header Maybe Two Lines
          </h1>

          <p style={{marginBottom: 60}}>
            Discover what your next dream team is working on or create an idea of your own!
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <Button>
            Add a Project Idea
          </Button>
      </div>

      {/* hero image */}
      <HeroImage height="auto"/>
    </div>
  );
}

export default Hero;
