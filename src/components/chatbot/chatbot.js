import React, { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me about restaurants! 🍽️", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botReply = generateBotResponse(input);
      setMessages((prevMessages) => [...prevMessages, botReply]);
    }, 1000);

    setInput("");
  };

  const generateBotResponse = (input) => {
    input = input.toLowerCase();
    const responses = {
        "recommend": "I recommend trying The Food Hub! 🍽️ They have amazing dishes!",
        "best": "Our top-rated restaurant is Gourmet Delights! 🌟 They offer premium quality food!",
        "top": "Our top-rated restaurant is Gourmet Delights! 🌟 They offer premium quality food!",
        "cheap": "For budget-friendly meals, try Budget Bites! 🥙 They have great deals!",
        "affordable": "For budget-friendly meals, try Budget Bites! 🥙 They have great deals!",
        "hours": "Most restaurants are open from 10 AM to 10 PM. Would you like details on a specific one?",
        "open": "Most restaurants are open from 10 AM to 10 PM. Would you like details on a specific one?",
        "dishes": "Gourmet Delights offers exquisite seafood, while The Food Hub specializes in Italian cuisine. 🍝",
        "food": "Gourmet Delights offers exquisite seafood, while The Food Hub specializes in Italian cuisine. 🍝",
        "far": "Gourmet Delights is 2 miles away, and The Food Hub is 3.5 miles away. 🚗",
        "distance": "Gourmet Delights is 2 miles away, and The Food Hub is 3.5 miles away. 🚗",
        "reservation": "You can make a reservation by calling the restaurant or using online booking services like OpenTable.",
        "menu": "Most restaurants have their menu available on their website or platforms like Yelp and Zomato.",
        "vegan": "Try Green Bites! 🌱 They offer a wide variety of delicious vegan options.",
        "gluten free": "The Wellness Cafe has great gluten-free dishes for health-conscious diners! 🍏",
        "delivery": "Many restaurants offer delivery through apps like Uber Eats, DoorDash, or their own website.",
        "takeout": "Most places allow takeout. Would you like recommendations for good takeout spots?",
        "special": "Check the restaurant’s website or call them to ask about their current specials! 🍽️",
        "specials": "Check the restaurant’s website or call them to ask about their current specials! 🍽️",
        "atmosphere": "For a cozy ambiance, try Candlelight Bistro. For a lively place, check out The Social Spot! 🎶",
        "kid friendly": "Family Feast is great for kids, with a play area and a special kids' menu! 👶🍕",
        "romantic": "For a romantic dinner, try Sunset View Restaurant with candlelit tables and a great wine list. 🍷",
        "parking": "Most restaurants have parking, but some rely on street parking or nearby garages.",
        "cuisine": "Are you looking for Italian, Chinese, Mexican, or something else? Let me know! 🍜🌮🍕",
        "bar": "For a great bar scene, try The Taphouse. They have excellent cocktails and craft beer. 🍻",
        "wifi": "Some cafes and restaurants offer free WiFi, like Cozy Cafe and Work & Dine. 📶",
        "outdoor seating": "Sunset Terrace has beautiful outdoor seating with a great view! 🌅",
        "happy hour": "The Social Spot has a fantastic happy hour from 4-7 PM with great drink deals. 🍹",
        "private dining": "For private dining, check out The Gourmet Room. Perfect for special events! 🎉"
      };
  

    for (const key in responses) {
      if (input.includes(key)) {
        return { text: responses[key], sender: "bot" };
      }
    }
    return { text: "I'm not sure, but I can help with restaurant recommendations! 🍔 Try asking about top or affordable places.", sender: "bot" };
  };

  return (
    <>
      <div 
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#007bff",
          color: "white",
          padding: "10px",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "24px",
          textAlign: "center",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle size={32} />
      </div>

      {isOpen && (
        <div style={{ position: "fixed", bottom: "80px", right: "20px", width: "350px", padding: "15px", borderRadius: "10px", background: "#fff", boxShadow: "0px 4px 10px rgba(0,0,0,0.2)", fontFamily: "Arial, sans-serif" }}>
          <div style={{ background: "#007bff", color: "white", padding: "10px", borderRadius: "10px 10px 0 0", fontWeight: "bold", textAlign: "center" }}>Restaurant Chatbot 🍽️</div>
          <div style={{ height: "300px", overflowY: "auto", padding: "10px", background: "#f9f9f9", borderBottom: "1px solid #ddd" }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left", marginBottom: "8px" }}>
                <span style={{ background: msg.sender === "user" ? "#007bff" : "#ddd", padding: "8px 12px", borderRadius: "15px", color: msg.sender === "user" ? "white" : "black", display: "inline-block", maxWidth: "80%" }}>
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div style={{ display: "flex", padding: "10px", background: "#fff", borderRadius: "0 0 10px 10px" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about restaurants..."
              style={{ flex: 1, padding: "8px", borderRadius: "5px", border: "1px solid #ddd" }}
            />
            <button onClick={handleSend} style={{ marginLeft: "8px", padding: "8px 12px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;