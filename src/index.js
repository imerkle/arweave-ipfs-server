import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import ArweaveIpfs from 'arweave-ipfs'

var fs = require('fs');

const arw = new ArweaveIpfs();
const jwk = JSON.parse(fs.readFileSync(process.env.JWK, 'utf8'));

const app = express();
app.use(cors());
app.use(express.json()) 

app.get('/get', async (req, res) => {
  if(req.query.args){
    try{
      let hashes = req.query.args.split(",");
      res.send(await arw.get(hashes, jwk));
    }catch(e){
      res.json({error: e})
    }
  }else{
    res.send({error: "Invalid query 'args' params not found"});
  }
});
app.get('/get/:hash', async (req, res) => {
  const s = await arw.get(req.params.hash, jwk);
  res.send(s[req.params.hash])
});

app.post('/add', async (req, res) => {
  if(req.body.args){
    res.send(await arw.add(req.body.args, jwk));
  }else{
    res.send({error: "Invalid query 'args' params not found"});
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Arweave-Ipfs server listening on port ${process.env.PORT}!`),
);