
const chatApp = document.querySelector(".chat-app");
const user_chatbox = document.querySelector(".chat-window");
const userInput = document.querySelector("#user-input");
const button = document.querySelectorAll("button");

// prevent form submission
chatApp.addEventListener("submit", (e) => {
  e.preventDefault();
 e.target[1].classList.add("disabled");
 setTimeout(() =>{
   e.target[1].classList.remove("disabled");
 },1500);

});


// user input functionality
userInput.addEventListener("change", () => {
  if (userInput.value.trim() === "") {
    alert("Please enter a valid input");
    return;
  }

  let div = document.createElement("div");
  div.classList.add("message", "user"); // RIGHT side
  let bubble = document.createElement("div");
  bubble.classList.add("bubble"); // bubble style
  bubble.textContent = userInput.value;
  
  div.appendChild(bubble);
  user_chatbox.appendChild(div);
  sendMessage(userInput.value);
  user_chatbox.scrollTop = user_chatbox.scrollHeight;
  userInput.value = "";
});


// button functionalities
button.forEach((btn) => {
  if (btn.classList.contains("clearBtn")) {
    return btn.addEventListener("click", () => {
      user_chatbox.innerHTML = "";
    });
  }
  // auto scroll down

  if (btn.classList.contains("chip")) {
    btn.addEventListener("click", () => {
      let div = document.createElement("div");
      div.classList.add("message", "user"); // RIGHT side

      let bubble = document.createElement("div");
      bubble.classList.add("bubble"); // bubble style
      btn_textcontent = btn.innerText;
      bubble.textContent = btn_textcontent; // chip text
      
      div.appendChild(bubble);
      user_chatbox.appendChild(div);
      user_chatbox.scrollTop = user_chatbox.scrollHeight;
      sendMessage(btn_textcontent);
    });
  }

   

});


async function sendMessage(userInput) {
  // sendBtn.button.style.disabled = true;
  const OPENAI_API_KEY = "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";
  
  try {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method:"POST",
    headers :{
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        { role: "user", content: userInput}
      ],
      
    })
  });
  
  const data = await response.json();
   dta = data.choices[0].message.content;
  console.log(dta);
  
  let div = document.createElement("div");
  div.classList.add("message", "bot"); // LEFT side
  let bubble = document.createElement("div");
  bubble.classList.add("bubble"); // bubble style
  bubble.textContent = dta;
  div.appendChild(bubble);
  user_chatbox.appendChild(div);
  user_chatbox.scrollTop = user_chatbox.scrollHeight;
  
}
catch(error) {
  console.log("Something went wrong:", error);
}

}




