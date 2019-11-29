# arweave-ipfs-server
> A user-friendly server to offer users a service for "permawebifying" their IPFS hashes into Arweave blockchain.

This server uses [arweave-ipfs](https://github.com/imerkle/arweave-ipfs) at its core.

## IPFS+Arweave Hackathon

This project is part of IPFS+Arweave Hackathon:-

This project contains three repos:
 - [arweave-ipfs](https://github.com/imerkle/arweave-ipfs) - Cross-Compatible (js client & node server) library to easily integrate IPFS+Arweave in your apps.
 - [arweave-ipfs-server](https://github.com/imerkle/arweave-ipfs-server) - Centralized server for running IPFS-Arweave service
 - [arweave-ipfs-explorer](https://github.com/imerkle/arweave-ipfs-explorer) - Interactive GUI to get and post ipfs hashes


If you just want to see it in action:

[Server-Less](https://arweave.net/5ljkBHQs2m4JLag-U51YEdG45rvhmO_NYENl7t8umrY) 
> Requires a wallet doesn't depends on any central service, it's permanently available on internet as long as IPFS & Arweave nodes exists

[Server-Backed](https://arweave.net/-L0hP1RghjcaN6LAsy3s-YlbtjEJYUOvos11lb4X1Tg) 
> Does not requires any wallet, automatically pins ipfs hashes not existing in arweave even if you're just viewing them.

It also displays/downloads the content you have uploaded , just add `#/your-ipfs-hash` at end of url


[QmQeEyDPA47GqnduyVVWNdnj6UBPXYPVWogAQoqmAcLx6y on Server-Less](https://arweave.net/5ljkBHQs2m4JLag-U51YEdG45rvhmO_NYENl7t8umrY#QmQeEyDPA47GqnduyVVWNdnj6UBPXYPVWogAQoqmAcLx6y)
[Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a on Server-Less](https://arweave.net/5ljkBHQs2m4JLag-U51YEdG45rvhmO_NYENl7t8umrY#Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a)

[QmQeEyDPA47GqnduyVVWNdnj6UBPXYPVWogAQoqmAcLx6y on Server-Backed](https://arweave.net/-L0hP1RghjcaN6LAsy3s-YlbtjEJYUOvos11lb4X1Tg#QmQeEyDPA47GqnduyVVWNdnj6UBPXYPVWogAQoqmAcLx6y)
[Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a on Server-Backed](https://arweave.net/-L0hP1RghjcaN6LAsy3s-YlbtjEJYUOvos11lb4X1Tg#Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a)


## Features 

- Checks for duplicate hashes before pinning 
- Supports multiple hashes permafying hundreds of ipfs data in one request
- Highly customizable options
- Zero Installation, works with a single HTTP Request (for users)
- Doesn't requires a wallet to post ipfs hashes (for users)
- Automatically pins IPFS Hashes not found in Arweave even while just fetching.

## Try 

It's hosted at https://3b565264.ngrok.io as part of bounty challenge.
Try a `curl -X POST 'https://3b565264.ngrok.io/add/Qmaisz6NMhDB51cCvNWa1GMS7LU1pAxdF4Ld6Ft9kZEP2a'` to see it working


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
`/get` wraps the [get function](https://github.com/imerkle/arweave-ipfs#get) of [arweave-ipfs](https://github.com/imerkle/arweave-ipfs) library.

It fetches the raw file content from ipfs/arweave.

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

It submits ipfs hash to arweave and returns the txid. It can also be used to get arweave txid of a previously pinned ipfs hash.

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
