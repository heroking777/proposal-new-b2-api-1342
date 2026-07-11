import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

interface PrintLabelRequest {
  orderId: string;
  recipientName: string;
  recipientAddress: string;
}

app.post('/print-label', async (req, res) => {
  const { orderId, recipientName, recipientAddress }: PrintLabelRequest = req.body;

  try {
    // Assuming you have an API key and endpoint for the Yamato B2 Cloud API
    const apiKey = 'YOUR_YAMATO_API_KEY';
    const yamatoApiUrl = 'https://api.yamato.com/b2cloud/print-label';

    const response = await axios.post(yamatoApiUrl, {
      orderId,
      recipientName,
      recipientAddress,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      res.json({
        message: 'Label printed successfully',
        labelData: response.data.labelData, // Assuming the API returns label data
      });
    } else {
      res.status(response.status).json({
        error: 'Failed to print label',
        details: response.statusText,
      });
    }
  } catch (error) {
    console.error('Error printing label:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});