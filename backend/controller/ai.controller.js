const { OpenAI } = require('openai');
require('dotenv').config()


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// const openai = OpenAIApi(configuration);

const searchProductByAi = async (req, res) => {
  const { prompt } = req.body;
  try {
    const aiRes = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: "system", content: "Bạn là trợ lý tìm kiếm sản phẩm laptop." },
        { role: "user", content: `Phân tích prompt và trả về dưới dạng JSON như sau: 
          { "price_max": ..., "ram_min": ..., "storage_min": ..., "category": ... }. Prompt: "${prompt}"` 
        }
      ],
      temperature: 0.2
      
    });

    console.log(aiRes.choices[0].message.content);
  }
  catch(err) {
    console.error(err);
  }
}

module.exports = { searchProductByAi }