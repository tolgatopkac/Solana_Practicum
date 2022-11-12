// useMemo() is a hook that loads stuff only if one of the dependencies changes. In our case, if the network the user is connected to doesn't change, the value of clusterApiUrl won't change either.
import React, {useMemo} from "react"; 

// The first Solana import we have is wallet-adapter-network from @solana/wallet-adapter-base. This is just an enumerable object for the available networks.
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";

// The WalletModalProvider is exactly that lol - it's a fancy React component that will prompt the user to select their wallet. Ezpz.
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui";

// ConnectionProvider takes an RPC endpoint in and lets us talk directly to the nodes on the Solana blockchain. We'll use this throughout our app to send transactions.
// WalletProvider gives us a standard interface for connecting to all sorts of wallets, so we don't have to bother reading docs for each wallet hehe.
import {ConnectionProvider,WalletProvider} from "@solana/wallet-adapter-react";


// We'll use the imports from this to create a list of wallets we'll feed the WalletProvider. There's a bunch of other wallet adapters available, even some made for other blockchains! Check them out here. I just went with Phantom and Glow.
import {
  GlowWalletAdapter,
  PhantomWalletAdapter
} from "@solana/wallet-adapter-wallets";


import { clusterApiUrl } from "@solana/web3.js" //a function that generates an RPC endpoint for us based on the network we give it.


import '../styles/globals.css'

require("@solana/wallet-adapter-react-ui/styles.css")
require("../styles/globals.css")
require("../styles/Home.module.css")

const App = ({ Component, pageProps }) => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can provide a custom RPC endpoint here
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);


    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter()
    ],
    [network]
  );


    return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App
