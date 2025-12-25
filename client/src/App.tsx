import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [socket, setSocket] = useState<WebSocket>();
  function sendMessage() {
    const message = inputRef.current?.value;
    socket?.send(message as any);
  }
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");
    setSocket(ws);
    ws.onmessage = (m) => {
      alert(m.data);
    };
  }, []);

  return (
    <>
      <div>
        <input type="text" placeholder="message" ref={inputRef} />
        <button onClick={sendMessage}>send</button>
      </div>
    </>
  );
}

export default App;

