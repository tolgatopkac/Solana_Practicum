import { FC,useState,useEffect } from 'react'
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import * as Web3 from "@solana/web3.js";
import styles from '../styles/Home.module.css'



export const SendSolForm: FC = () => {

    const { connection } = useConnection()
    const { publicKey, sendTransaction } = useWallet()

    const [transactionSignature, setTransactionSignature] = useState('')


    const transfer_sol = (event) => {
        event.preventDefault()

        if(!connection || !publicKey) {
            return
        }

        const recipient = new Web3.PublicKey(event.target.recipient.value)

        const transaction = new Web3.Transaction()
        const instruction = new Web3.TransactionInstruction(
            Web3.SystemProgram.transfer({
                fromPubkey : publicKey,
                toPubkey : recipient,
                lamports : event.target.amount.value * Web3.LAMPORTS_PER_SOL
            })
        )
    
        transaction.add(instruction)
    
        sendTransaction(transaction, connection).then(signature => {
            setTransactionSignature(signature)
        })

        console.log(`Send ${event.target.amount.value} SOL to ${event.target.recipient.value}`)
    }


  

     return (
        <div>
            {publicKey ? (
                <form onSubmit={transfer_sol} className={styles.form}>
                    <label htmlFor="amount">Amount (in SOL) to send:</label>
                    <input id="amount" type="text" className={styles.formField} placeholder="e.g. 0.1" required />
                   
                    <label htmlFor="recipient">Send SOL to:</label>
                    <input id="recipient" type="text" className={styles.formField} placeholder="e.g. AeVRH9jcRvGAaThsY9m2s1q1xfbrHisrzR4N3u4fTjzT" required />
                    <button type="submit" className={styles.formButton}>Send</button>
                </form>
            ) : 'Wallet not connected.'}
            {transactionSignature ? (
                <>
                    <p className={styles.form}><b>TRANSACTION SUCCESSFUL!!!</b></p>
                    <p className={styles.form}>Check your transaction on <a href={`https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`}>Solana Explorer</a></p>
                </>
            ) : ''}
        </div>
    )
}