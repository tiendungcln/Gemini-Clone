import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  // Nhập dữ liệu đầu vào
  const [input, setInput] = useState("");
  // Nhấn nút gửi 
  const [recentPrompt, setRecentPrompt] = useState("");
  // Lưu lịch sử và hiển thị trong tab bên trái
  const [prevPrompts, setPrevPrompts] = useState([]);
  // Ẩn 4 văn bản phía trên
  const [showResult, setShowResult] = useState(false);
  // Nếu đúng sẽ hiển thị hình ảnh động loading
  const [loading, setLoading] = useState(false);
  // Show dữ liệu ra
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData(prev => prev + nextWord);
    }, 75 * index)
  }

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecentPrompt(prompt)
    }
    else {
      setPrevPrompts(prev => [...prev, input])
      setRecentPrompt(input);
      response = await run(input);
    }
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      }
      else {
        newResponse += "<b>" + responseArray[i] + "</b>"
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>")
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ")
    }
    setLoading(false);
    setInput("");
  };


  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
