const page = require('./openAI');
const path = require('path');

const express = require('express');

const app = express();
const PORT = 3000;

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/pages/index.html'));
});

app.post('/submit', async (req, res) => {
  const inputData = req.body.numberValue;
  // console.log('Received data:', inputData);
  try {
    const responseFromOpenAI = await page.main(inputData); // Call the main function to get the response
    // res.send(responseFromOpenAI); // Send the response from OpenAI to the page
    res.json({ result: responseFromOpenAI });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error occurred'); // Handle errors and send an error message
  }
  // Sending a JSON response
});

app.get('/translate', async (req, res) => {
  try {
    const responseFromOpenAI = await page.main(); // Call the main function to get the response
    res.send(responseFromOpenAI); // Send the response from OpenAI to the page
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error occurred'); // Handle errors and send an error message
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
