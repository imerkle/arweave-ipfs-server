# arweave-ipfs-server
> A user-friendly server to offer users a service for "permawebifying" their IPFS hashes into Arweave blockchain.

This server uses [arweave-ipfs](https://github.com/imerkle/arweave-ipfs) at its core.

## Features 

- Checks for duplicate hashes before pinning 
- Supports multiple hashes in one request
- Highly customizable options


It's hosted at https://3b565264.ngrok.io as part of bounty challenge.

## Setup

* `git clone https://github.com/imerkle/arweave-ipfs-server.git`
* `cd arweave-ipfs-server`
* `yarn install`

## Start Server
`PORT=3001 JWK=~/path/to/arweavekeyfile.json yarn run start`

You can create an also create an `.env` file in project root and specify all environment variables or use your cloud provider's environmental config panel.

Full list of default environmental configs
```
PORT=3001
JWK=secret.json
IPFS_HOST="ipfs.infura.io"
IPFS_PORT=5001
IPFS_PROTOCOL="https"
AR_HOST="arweave.net"
AR_PORT=443
AR_PROTOCOL="https"
```

## API

##### /get
`/get` wraps the [get function](https://github.com/imerkle/arweave-ipfs#get) of [arweave-ipfs](https://github.com/imerkle/arweave-ipfs) library

You can `/get` two ways the recommended way is: 
```
curl -X GET 'http://localhost:3001/get?args=Qmx...,Qmy...,1U5...'
```
###### response
```
{
    "Qmx...": [1,2,3,4,5,6],
    "Qmy...": [1,2,3,4,5,6],
    "1U5...": [1,2,3,4,5,6],
}
```
Or
```
curl -X GET 'http://localhost:3001/get/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a'
```
###### response
```
[72,101,108,108,111...107,101,114,10]
```

##### /add
`/add` wraps the [add function](https://github.com/imerkle/arweave-ipfs#add) of [arweave-ipfs](https://github.com/imerkle/arweave-ipfs) library

You can `/add` two ways the recommended way is: 
```
curl -X POST \
    http://localhost:3001/add \
    -H 'Content-Type: application/json' \  
    -d '{
        "args": ["Qmx...", "Qmy...", Qmz...]
    }'  
```
###### response
```
{
    "Qmx...": "1U5...",
    "Qmy...": "1Kx...",
    "Qmz...": "1F5...",
}
```
Or
```
curl -X POST http://localhost:3001/add/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a
```
###### response
```
1U5kug5cr6j7vBt71FJYNLDFmqliUMm_1BCG6fjLSW8
```

##### error handling
In case of an error it returns: 
```
{
    error: "..."
}
```


# arweave-ipfs library

If you want to use ipfs with arweave directly without a server take a look at [arweave-ipfs](https://github.com/imerkle/arweave-ipfs).


# Arweave-IPFS Explorer

[arweave-ipfs-explorer](https://github.com/imerkle/arweave-ipfs-explorer) is an easy to use permaweb dapp that uses [arweave-ipfs](https://github.com/imerkle/arweave-ipfs) and[arweave-ipfs-server](https://github.com/imerkle/arweave-ipfs-server) to display and store ipfs hashes into blockchain.
