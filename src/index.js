import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import ArweaveIpfs from 'arweave-ipfs'

var fs = require('fs');

const ipfs_opts = {
  host: process.env.IPFS_HOST || "ipfs.infura.io",
  port: process.env.IPFS_PORT || 5001,
  protocol: process.env.IPFS_PROTOCOL || "https",
};
const arweave_opts = {
  host: process.env.AR_HOST || "arweave.net",
  port: process.env.AR_PORT || 443,
  protocol: process.env.AR_PROTOCOL || "https",
};

const arw = new ArweaveIpfs(ipfs_opts, arweave_opts);

const jwk = JSON.parse(fs.readFileSync(process.env.JWK || "secret.json", 'utf8'));

const app = express();
app.use(cors());
app.use(express.json()) 

app.get('/get', async (req, res) => {
  if(req.query.args){
    try{
      let hashes = req.query.args.split(",");
      res.send(await arw.get(hashes, jwk));
    }catch(e){
      res.send({error: e})
    }
  }else{
    res.send({error: "Invalid query 'args' params not found"});
  }
});
app.get('/get/:hash', async (req, res) => {
  try{
  const s = await arw.get(req.params.hash, jwk);
  res.send(s[req.params.hash])
  }catch(e){
    res.send({error: e})
  }
});

app.post('/add', async (req, res) => {
  if(req.body.args){
    res.send(await arw.add(req.body.args, jwk));
  }else{
    res.send({error: "Invalid query 'args' params not found"});
  }
});
app.post('/add/:hash', async (req, res) => {
  const s = await arw.add(req.params.hash, jwk);
  res.send(s[req.params.hash])
});


app.listen(process.env.PORT, () =>
  console.log(`Arweave-Ipfs server listening on port ${process.env.PORT || 3001}!`),
);