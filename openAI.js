'use strict';
const OpenAI = require('openai');
require('dotenv').config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI(OPENAI_API_KEY);

module.exports = {
  main,
};

async function main(number) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content: `say  ${number} in french words without any other comments`,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0]['message']['content']);
  return completion.choices[0]['message']['content'];
}

// main();
