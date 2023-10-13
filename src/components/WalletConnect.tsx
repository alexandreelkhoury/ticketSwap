import { createWeb3Modal, useWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import { arbitrum, goerli } from 'wagmi/chains'

const projectId = '0e9c1bb6c31e5ee7c37c2bf30fbc74bc'

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [goerli, arbitrum]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains, themeMode: 'dark', themeVariables: {
    '--w3m-color-mix': '#999999',
    '--w3m-color-mix-strength': 25,
    '--w3m-accent': '#999999', // color grey
    '--w3m-font-size-master' : '15px'
  } })

function WalletConnect() {
    return (
    <div className="App">
      <WagmiConfig config={wagmiConfig} >
        <w3m-button />
      </WagmiConfig>
    </div>
    );
};

export default WalletConnect;
