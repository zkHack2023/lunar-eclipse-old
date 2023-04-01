import logo from './logo.svg';
import './App.css';
import { MantaPrivateWallet, SbtMantaPrivateWallet, Environment, Network, MantaUtilities } from 'manta.js';


const privateWalletConfig = {
  environment: Environment.Production,
  network: Network.Manta,
}

const getPolkadotSignerAndAddress = async () => {
  const extensions = await web3Enable('Polkadot App');
  if (extensions.length === 0) {
    throw new Error("Polkadot browser extension missing. https://polkadot.js.org/extension/");
  }
  const allAccounts = await web3Accounts();
  let account = allAccounts[0];

  const injector = await web3FromSource(account.meta.source);
  const polkadotSigner = injector.signer;
  const polkadotAddress = account.address;
  return {
    polkadotSigner,
    polkadotAddress
  }
}

const privateTransferOnlySignTest = async () => {
  const privateWallet = await MantaPrivateWallet.init(privateWalletConfig);
  const polkadotConfig = await getPolkadotSignerAndAddress();

  console.log(polkadotConfig);
  console.log(privateWallet);

}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          {privateTransferOnlySignTest()}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
