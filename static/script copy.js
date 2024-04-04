document.addEventListener("DOMContentLoaded", function() {
    const chatbox = document.querySelector(".chatbox");
    const chatInput = document.querySelector(".chat-input textarea");
    const sendChatBtn = document.querySelector(".chat-input span");

    let userMessage = null; // Variable to store user's message

    const createChatLi = (message, className) => {
        // Create a chat <li> element with passed message and className
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", `${className}`);
        let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
        chatLi.innerHTML = chatContent;
        chatLi.querySelector("p").textContent = message;
        return chatLi; // return chat <li> element
    }

    const generateResponse = (chatElement) => {
        const messageElement = chatElement.querySelector("p");

        // Define the properties and message for the API request
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                question: userMessage,
            })
        }

        // Send POST request to your Flask server's chat endpoint, get response and set the response as paragraph text
        fetch('/chat', requestOptions).then(res => res.json()).then(data => {
            // Update to match the format of the response you send from Flask
            messageElement.textContent = data.answer.trim();
        }).catch(() => {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    }

    const handleChat = () => {
        userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
        if(!userMessage) return;

        // Clear the input textarea and set its height to the default value
        chatInput.value = "";

        // Append the user's message to the chatbox
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            // Display "Thinking..." message while waiting for the response
            const incomingChatLi = createChatLi("Thinking...", "incoming");
            chatbox.appendChild(incomingChatLi);
            chatbox.scrollTo(0, chatbox.scrollHeight);
            generateResponse(incomingChatLi);
        }, 600);
    }

    chatInput.addEventListener("keydown", (e) => {
        // If Enter key is pressed without Shift key, handle the chat
        if(e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    });

    sendChatBtn.addEventListener("click", handleChat);
});

// Scroll to target
function scrollToSection() {
    var section = document.getElementById("SecondPage");
    section.scrollIntoView({ behavior: 'smooth' });
}

// Showing file name
function showFileName() {
    var fileInput = document.getElementById('files');
    var fileNameSpan = document.getElementById('fileNameSpan');

    // Check if a file is selected
    if (fileInput.files.length > 0) {
        // Display the selected file name
        var fileName = fileInput.files[0].name;
        
        // Update the span
        fileNameSpan.innerText = fileName;
        fileNameSpan.style.display = 'inline';

        addfiles.style.display = 'none';
    } else {
        // Hide the file name span if no file is chosen
        fileNameSpan.style.display = 'none';
    }
}

// Camera
function captureImage() {
    var video = document.getElementById('cameraFeed');
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
  
    // Show camera feed and canvas
    video.style.display = 'block';
    canvas.style.display = 'block';
  
    // Hide file input
    var fileInput = document.getElementById('imageUpload');
    fileInput.style.display = 'none';
  
    // Get access to the camera
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        video.srcObject = stream;
      })
      .catch(function(err) {
        console.error('Error accessing camera:', err);
      });
  
    // Capture image from video feed
    document.getElementById('submitButton').onclick = function() {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      var imageDataURL = canvas.toDataURL('image/png');
      // Assign the captured image to a hidden input field for form submission
      document.getElementById('imageData').value = imageDataURL;
      // Submit form
      document.querySelector('form').submit();
    };
}

// Additional Information Page
var infoOverview = document.getElementById("info-overview");
var infosymptoms = document.getElementById("info-symptoms");
var infotreatment = document.getElementById("info-treatment");
infoOverview.classList.add("clicked-overview");
var overview = document.getElementById("overview-summary");
var symptoms = document.getElementById("symptoms-summary");
var treatment = document.getElementById("treatment-summary");
symptoms.style.visibility = 'hidden';
treatment.style.visibility = 'hidden';
infoOverview.addEventListener("click", function() {
    infoOverview.classList.add("clicked-overview");
    infosymptoms.classList.remove("clicked-overview");
    infotreatment.classList.remove("clicked-overview");
    overview.style.visibility = 'visible';
    symptoms.style.visibility = 'hidden';
    treatment.style.visibility = 'hidden';
});
infosymptoms.addEventListener("click", function() {
    infoOverview.classList.remove("clicked-overview");
    infosymptoms.classList.add("clicked-overview");
    infotreatment.classList.remove("clicked-overview");
    overview.style.visibility = 'hidden';
    symptoms.style.visibility = 'visible';
    treatment.style.visibility = 'hidden';
});
infotreatment.addEventListener("click", function() {
    infoOverview.classList.remove("clicked-overview");
    infosymptoms.classList.remove("clicked-overview");
    infotreatment.classList.add("clicked-overview");
    overview.style.visibility = 'hidden';
    symptoms.style.visibility = 'hidden';
    treatment.style.visibility = 'visible';
});

// Doctor



// Map
document.querySelectorAll('.doctor').forEach(hospital => {
    hospital.addEventListener('click', function() {
        const mapId = this.getAttribute('data-map');
        document.querySelectorAll('.map').forEach(map => {
            if (map.id === mapId) {
                map.style.display = 'block';
            } else {
                map.style.display = 'none';
            }
        });
    });
});
