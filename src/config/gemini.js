import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_API_KEY_GEMINI;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);

    // Kiểm tra và lấy dữ liệu đúng cách từ kết quả
    const text = result.response.text; // Hoặc cách đúng khác dựa trên tài liệu thư viện
    console.log(text());
    return text();
  } catch (error) {
    console.error('Error in run function:', error);
    throw error;
  }
}

export default run;

//Lấy api ở đây https://aistudio.google.com/app/prompts/new_chat
//B1 Tạo keyAPI
//B2 Get code
