import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import * as web3 from "@solana/web3.js"

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [isExecutable,setIsExecutable] = useState(false)

  const addressSubmittedHandler = (address: string) => {
    // This will validate that whatever you pass in is actually a Solana address.
    try{
    const key = new web3.PublicKey(address);
    // key.toBase58. This is the encoding of Solana addresses as strings.
    setAddress(key.toBase58())

    // We're connecting to the devnet network. There's three networks - mainnet, testnet, and devnet. We'll use devnet for everything.
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))


    // GET BALANCE
    connection.getBalance(key).then(balance=>{
      setBalance(balance / web3.LAMPORTS_PER_SOL)
    })


// Is executable ?  
    connection.getAccountInfo(key).then(info => {
      setIsExecutable(info?.executable ?? false);
    })

  }catch (error) {
      setAddress('')
      setBalance(0)
      alert(error)
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Start Your Solana Journey
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>

        <p>{`Is it executable ? ${isExecutable ? 'Yep' : 'Nope'}`}</p>
      </header>
    </div>
  )
}

export default Home
