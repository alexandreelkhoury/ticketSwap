import { useState, useEffect } from 'react';
import './App.css';
import './app.scss';
import WalletConnect from './components/WalletConnect';
import { getAccount } from '@wagmi/core'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import firebase from './Firebase';

const ref = firebase.firestore().collection('ticketswap');

function App() {

  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    setIsConnected(getAccount().isConnected);
  }, []);

  return (
    <div className="App">
      <div className='wc'>
        {isConnected ? (
          <div>
            <WalletConnect />
            <Link to="/app" relative="path">
              <Button
                className="btn-lg btn-block"
                style={{
                  borderColor: '#999999',
                  padding: '25px 50px',
                  fontSize: '30px',
                  marginTop: '190px'
                }}
                variant="outline-secondary"
              >
                Launch App
              </Button>
            </Link>
          </div>
        ) : (
          <div>

            <h1 className='title'>Connect your wallet to launch the app</h1>
            <span className='wc2' onClick={() => setIsConnected(true)}>
              <WalletConnect />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export {ref};
export default App;
