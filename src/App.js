import { useCallback, useState } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import './App.css';
import { options } from './particles-options';

import { Button, Input, Layout, Space } from 'antd';
import WalletsTable from './WalletsTable';
import { find_in_db } from './db_service';
import svzLogo from './svz-logo.png'

const { TextArea } = Input;
const { Header, Content } = Layout

const headerStyle = {
  zIndex: 9999,
  color: '#fff',
  height: 64,
  lineHeight: '64px',
  backgroundColor: 'black',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between'
};

const contentStyle = {
  zIndex: 9999,
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '50px',
  color: '#fff',
  minWidth: '900px',
  paddingTop: '30px',
  paddingBottom: '30px'
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

let db_data = {}

function App() {
  const [wallets, setWallets] = useState('')
  const [db_result, setDbResult] = useState({})
  const [buttonFirstTimeClicked, setButtonFirstTimeClicked] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)
  
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
      await console.log();
  }, [])

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setWallets(newText);
  };

  const handleButtonClick = () => {
    setButtonLoading(true)

    const newLines = wallets.split('\n');
    
    if(buttonFirstTimeClicked === true) {
      import('./database.json').then(database => {
        db_data = database
        const result = find_in_db(db_data, newLines)
        setDbResult(result)
        setButtonLoading(false)
       })
       setButtonFirstTimeClicked(false)
    }else {
      const result = find_in_db(db_data, newLines)
      setDbResult(result)
      setButtonLoading(false)
    }

  }

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
      />
      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
        size={[0, 48]}
      >
        <Layout style={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Header style={headerStyle}>
            <div>
              <strong>
                APTOS GRAFFIO ANALYSIS
              </strong>
            </div>
            <div className="svz-banner">
              <div style={{ height: '40px', marginRight: '7px' }}>
                  <img 
                    className="svz-logo-img"
                    src={svzLogo}
                    alt="SVZ Telegram Channel"
                  />
                </div>
              <div>
                <a
                  className="svz-logo-text"
                  href="https://t.me/sybil_v_zakone"
                >
                  Сибил в законе
                </a>
              </div>
            </div>
          </Header>
          <Content style={contentStyle}>
            <h2 style={{ fontWeight: 800, fontSize: '25px' }}>APTOS GRAFFIO ANALYSIS</h2>
            <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'flex-start' }}>
              <strong style={{ color: 'white', textAlign: 'left', lineHeight: '25px', marginLeft: '5px', fontWeight: '300' }}>Insert your wallets</strong>
              <TextArea
                style={{ 
                  background: '#121212',
                  color: 'white',
                  border: '2px solid #383736'
                }}
                className='wallets-textarea'
                rows={10}
                value={wallets}
                onChange={handleTextChange}
              />
            </div>
            <Button
              style={{ 
                background: '#121212',
                color: 'white',
                border: '2px solid #383736'
               }}
              block
              onClick={handleButtonClick}
              loading={buttonLoading}
            >
              Get stats
            </Button>
            {Object.keys(db_result).length ?
              <WalletsTable
                data={db_result}
              />
              : <></>
            }
          </Content>
      </Layout>
      </Space>
    </>
  );
}

export default App;
