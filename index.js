
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const INSTANCE_ID = process.env.INSTANCE_ID;
const TOKEN = process.env.TOKEN;
const ULTRA_BASE_URL = `https://api.ultramsg.com/${INSTANCE_ID}/messages/chat`;

const stories = {
  "1": {
    title: "Enyamasano ya Bosongo",
    url: "https://drive.google.com/uc?export=download&id=19dp88_t8Wcff6dbjRxZJK7eiCfL3elKr"
  },
  "2": {
    title: "Obokano bwa Gekondo",
    url: "https://drive.google.com/uc?export=download&id=1QXY3ZHNK8NrNo6b55c9FQUzQzNAanNLx"
  },
  "3": {
    title: "Chimbeba ne Chinkondi",
    url: "https://drive.google.com/uc?export=download&id=1yqiKXXMx_A4S7bTWbkb-zb1yJHT9ASKZ"
  }
};

app.post('/webhook', async (req, res) => {
  const message = req.body;
  const from = message.from;
  const text = message.body?.trim();

  let reply;

  if (stories[text]) {
    const { title, url } = stories[text];
    reply = `🎙️ *${title}*
Listen: ${url}`;
  } else {
    reply = `👋 Welcome to the *Gusii Audio Library*!
Reply with a number to hear a story:
1. Enyamasano ya Bosongo
2. Obokano bwa Gekondo
3. Chimbeba ne Chinkondi`;
  }

  await axios.post(ULTRA_BASE_URL, {
    token: TOKEN,
    to: from,
    body: reply
  });

  res.sendStatus(200);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`WhatsApp bot running on port ${PORT}`));
