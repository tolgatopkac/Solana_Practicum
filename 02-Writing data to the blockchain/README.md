# Writing Data to the blockchain


### Keypairs

Web3.js library functions

- Create a new keypair
` const ownerKeypair = Keypair.generate() `

- Get the public key (address)
` const publicKey = ownerKeypair.publicKey `

- Get the secret key 
` const secretKey = ownerKeypair.secretKey `

Secret keys can have a couple of different formats -
1.  Mnemonic phrase - this is the most common
` pill tomorrow foster begin walnut borrow virtual kick shift mutual shoe scatter `
2.   A bs58 string - wallets sometimes export this
` 5MaiiCavjCmn9Hs1o3eznqDEhRwxo7pXiAYez7keQUviUkauRiTMD8DrESdrNjN8zd9mTmVhRvBJeg5vhyvgrAhG `
3.  Bytes - when writing code, we usually deal with the raw bytes as an array of numbers
` [ 174, 47, 154, 16, 202, 193, 206, 113, 199, 190, 53, 133, 169, 175, 31, 56, 222, 53, 138, 189, 224, 216, 117,173, 10, 149, 53, 45, 73, 251, 237, 246, 15, 185, 186, 82, 177, 240, 148, 69, 241, 227, 167, 80, 141, 89, 240, 121, 121, 35, 172, 247, 68, 251, 226, 218, 48, 63, 176, 109, 168, 89, 238, 135, ] `


- private key as an array of bytes
`const secret =  JSON.parse(process.env.PRIVATE_KEY ?? "") as number[] `
` const secretKey = Uint8Array.from(secret) `
`const keypairFromSecretKey = Keypair.fromSecretKey(secretKey) `

### Make & send a transaction
- create a transfer transaction

       const transaction = new Transaction()
        
        const sendSolInstruction = SystemProgram.transfer({
            fromPubkey: sender,
            toPubkey: recipient,
            lamports: LAMPORTS_PER_SOL * amount
        })
        
        transaction.add(sendSolInstruction)

- send a transaction

    const signature = sendAndConfirmTransaction(
        connection,
        transaction,
     [senderKeypair]
    )

### Instructions

    export type TransactionInstructionCtorFields = {
      keys: Array<AccountMeta>;
      programId: PublicKey;
      data?: Buffer;
    };

- An array of keys of type `AccountMeta`
- The public key/address of the program you're calling
- Optionally -a `Buffer`containing data to the program


- `pubkey` the public key of the account
- `isSigner` a boolean representing whether or not the account is a signer on the transaction
- `isWritable` a boolean representing whether or not the account is written to during the transaction's execution

### Example

    async function callProgram(
        connection: web3.Connection,
        payer: web3.Keypair,
        programId: web3.PublicKey,
        programDataAccount: web3.PublicKey
    ) {
        const instruction = new web3.TransactionInstruction({
            // We only have one key here
            keys: [
                {
                    pubkey: programDataAccount,
                    isSigner: false,
                    isWritable: true
                },
            ],
            
            // The program we're interacting with
            programId
            
            // We don't have any data here!
        })
    
        const sig = await web3.sendAndConfirmTransaction(
            connection,
            new web3.Transaction().add(instruction),
            [payer]
        )
    }


[https://spl-token-faucet.com/](spl_token_faucet)