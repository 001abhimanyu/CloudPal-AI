
const chatArea = document.getElementById("chatArea");
const userInput = document.getElementById("userInput");

// Built-in learning database
const knowledge = {

    "cloud computing": `
        <b>Cloud Computing</b> is the delivery of computing services
        over the internet.

        <br><br><b>Examples:</b>
        <br>1. Microsoft Azure
        <br>2. Amazon Web Services (AWS)
        <br>3. Google Cloud Platform

        <br><br><b>Service Models:</b>
        <br>• IaaS - Infrastructure as a Service
        <br>• PaaS - Platform as a Service
        <br>• SaaS - Software as a Service
    `,

    "aws": `
        <b>Amazon Web Services (AWS)</b> is a cloud computing
        platform provided by Amazon.

        <br><br><b>Popular AWS Services:</b>
        <br>• EC2 - Virtual Servers
        <br>• S3 - Object Storage
        <br>• IAM - Identity and Access Management
        <br>• Lambda - Serverless Computing
        <br>• VPC - Virtual Private Cloud
    `,

    "azure": `
        <b>Microsoft Azure</b> is Microsoft's cloud computing
        platform.

        <br><br><b>Popular Azure Services:</b>
        <br>• Virtual Machines
        <br>• Azure Storage
        <br>• Virtual Network
        <br>• Azure SQL Database
        <br>• Azure Functions
        <br>• Microsoft Entra ID
    `,

    "devops": `
        <b>DevOps</b> is a combination of development and operations
        practices that helps teams build, test, and deliver
        applications faster.

        <br><br><b>Popular DevOps Tools:</b>
        <br>• Git and GitHub
        <br>• Jenkins
        <br>• Docker
        <br>• Kubernetes
        <br>• Terraform
        <br>• Ansible
    `,

    "docker": `
        <b>Docker</b> is a platform used to build, package,
        and run applications inside containers.

        <br><br><b>Important Docker Commands:</b>
        <br><code>docker --version</code>
        <br><code>docker images</code>
        <br><code>docker ps</code>
        <br><code>docker pull nginx</code>
        <br><code>docker run -d -p 80:80 nginx</code>
    `,

    "kubernetes": `
        <b>Kubernetes</b> is an open-source container
        orchestration platform.

        <br><br><b>Important Components:</b>
        <br>• Pod
        <br>• Node
        <br>• Cluster
        <br>• Deployment
        <br>• Service
        <br>• ConfigMap
    `,

    "linux": `
        <b>Linux</b> is an open-source operating system
        widely used in servers and cloud environments.

        <br><br><b>Basic Linux Commands:</b>
        <br><code>pwd</code> - Current directory
        <br><code>ls</code> - List files
        <br><code>mkdir</code> - Create directory
        <br><code>touch</code> - Create file
        <br><code>cat</code> - Read file
        <br><code>sudo</code> - Execute with elevated privileges
    `,

    "virtual machine": `
        <b>Virtual Machine (VM)</b> is a software-based computer
        that runs an operating system using virtualized hardware.

        <br><br><b>Examples:</b>
        <br>• Azure Virtual Machine
        <br>• AWS EC2
        <br>• Google Compute Engine

        <br><br>A VM can have its own CPU, RAM, storage,
        and operating system.
    `,

    "server": `
        A <b>server</b> is a computer or software system that
        provides services or resources to other computers.

        <br><br><b>Examples:</b>
        <br>• Web Server
        <br>• Database Server
        <br>• File Server
        <br>• Application Server
    `,

    "iam": `
        <b>IAM (Identity and Access Management)</b> helps
        control who can access cloud resources and what
        actions they can perform.

        <br><br>In AWS, IAM includes:
        <br>• Users
        <br>• Groups
        <br>• Roles
        <br>• Policies
    `,

    "terraform": `
        <b>Terraform</b> is an Infrastructure as Code (IaC)
        tool used to create and manage infrastructure.

        <br><br>It uses HashiCorp Configuration Language (HCL)
        to define infrastructure.

        <br><br><b>Common Commands:</b>
        <br><code>terraform init</code>
        <br><code>terraform plan</code>
        <br><code>terraform apply</code>
        <br><code>terraform destroy</code>
    `
};

// Interview questions
const interviewQuestions = [
    "What is the difference between Docker and a Virtual Machine?",
    "Explain the difference between IaaS, PaaS, and SaaS.",
    "What is Continuous Integration and Continuous Deployment?",
    "What is the purpose of a Kubernetes Pod?",
    "What is the difference between a public and private cloud?"
];

let interviewIndex = 0;

// Quiz questions
const quizQuestions = [
    {
        question: "Which AWS service provides virtual servers?",
        options: ["S3", "EC2", "IAM", "Lambda"],
        answer: "EC2"
    },
    {
        question: "Which tool is used for containerization?",
        options: ["Docker", "Excel", "Photoshop", "PowerPoint"],
        answer: "Docker"
    },
    {
        question: "What does CI/CD stand for?",
        options: [
            "Cloud Integration",
            "Continuous Integration and Continuous Delivery",
            "Computer Internet",
            "Code Installation"
        ],
        answer: "Continuous Integration and Continuous Delivery"
    }
];

let quizIndex = 0;

// Add message to chat
function addMessage(message, sender) {

    const welcome = document.getElementById("welcome");

    if (welcome) {
        welcome.remove();
    }

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = sender === "user" ? "👤" : "☁";

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    if (sender === "bot") {
        bubble.innerHTML = message;
    } else {
        bubble.textContent = message;
    }

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);

    chatArea.appendChild(messageDiv);

    chatArea.scrollTop = chatArea.scrollHeight;
}

// Send user message
function sendMessage() {

    const message = userInput.value.trim();

    if (!message) return;

    addMessage(message, "user");

    userInput.value = "";

    processMessage(message);
}

// Handle Enter key
function handleEnter(event) {

    if (event.key === "Enter") {
        sendMessage();
    }
}

// Sidebar topic selection
function askTopic(question) {

    addMessage(question, "user");
    processMessage(question);
}

// Process chatbot response
function processMessage(message) {

    const text = message.toLowerCase();

    let response = "";

    if (
        text.includes("quiz") ||
        text.includes("test me")
    ) {
        quizIndex = 0;
        showQuiz();
        return;
    }

    if (
        text.includes("interview") ||
        text.includes("interview question")
    ) {
        interviewIndex = 0;
        showInterview();
        return;
    }

    if (text.includes("hello") || text.includes("hi")) {

        response = `
            Hello! 👋 Welcome to CloudPal.

            <br><br>I'm here to help you learn:
            <br>• Cloud Computing
            <br>• AWS and Azure
            <br>• DevOps
            <br>• Docker and Kubernetes

            <br><br>What would you like to learn today?
        `;

    } else if (
        text.includes("help") ||
        text.includes("what can you do")
    ) {

        response = `
            I can help you with the following:

            <br><br>☁ Cloud Computing
            <br>🟠 AWS
            <br>🔵 Azure
            <br>⚙ DevOps
            <br>🐳 Docker
            <br>☸ Kubernetes
            <br>🐧 Linux

            <br><br>You can also ask me for a quiz or
            interview practice!
        `;

    } else {

        // Find matching topic
        for (const topic in knowledge) {

            if (text.includes(topic)) {
                response = knowledge[topic];
                break;
            }
        }

        // Command help
        if (!response && text.includes("command")) {

            response = `
                Here are some useful commands:

                <br><br><b>Linux:</b>
                <br><code>ls</code>
                <br><code>pwd</code>
                <br><code>mkdir demo</code>

                <br><br><b>Docker:</b>
                <br><code>docker images</code>
                <br><code>docker ps</code>

                <br><br><b>Git:</b>
                <br><code>git status</code>
                <br><code>git add .</code>
                <br><code>git commit -m "first commit"</code>
            `;
        }
    }

    if (!response) {

        response = `
            That's an interesting question! 😊

            <br><br>I currently have built-in learning content
            for Cloud Computing, AWS, Azure, DevOps, Docker,
            Kubernetes, Linux, Virtual Machines, and Terraform.

            <br><br>Try asking:
            <br>• What is AWS?
            <br>• Explain Docker
            <br>• What is a Virtual Machine?
            <br>• Give me a DevOps quiz
            <br>• Ask me an interview question

            <br><br>This version uses a predefined knowledge
            base rather than a live AI model.
        `;
    }

    setTimeout(() => {
        addMessage(response, "bot");
    }, 300);
}

// Quiz feature
function showQuiz() {

    if (quizIndex >= quizQuestions.length) {

        addMessage(
            "🎉 Congratulations! You completed the quiz. Start another quiz by typing 'quiz'.",
            "bot"
        );

        return;
    }

    const q = quizQuestions[quizIndex];

    let html = `<b>📝 Question ${quizIndex + 1}</b><br><br>`;
    html += q.question + "<br><br>";

    q.options.forEach(option => {

        html += `
            <button class="quiz-option"
                onclick="checkAnswer('${option.replace(/'/g, "\\'")}')">
                ${option}
            </button><br><br>
        `;
    });

    addMessage(html, "bot");
}

// Check quiz answer
function checkAnswer(selected) {

    const correct = quizQuestions[quizIndex].answer;

    if (selected === correct) {
        addMessage("✅ Correct answer! Great job.", "bot");
    } else {
        addMessage(
            `❌ Incorrect. The correct answer is <b>${correct}</b>.`,
            "bot"
        );
    }

    quizIndex++;

    setTimeout(showQuiz, 700);
}

// Interview practice
function showInterview() {

    if (interviewIndex >= interviewQuestions.length) {

        addMessage(
            "🎉 You have completed all interview questions. Type 'interview' to practice again.",
            "bot"
        );

        return;
    }

    addMessage(
        `<b>Interview Question ${interviewIndex + 1}</b><br><br>
        ${interviewQuestions[interviewIndex]}
        <br><br>
        Think about your answer and practice explaining it in your own words.
        <br><br>
        <button class="quiz-option" onclick="nextInterview()">
            Next Question →
        </button>`,
        "bot"
    );
}

function nextInterview() {

    interviewIndex++;
    showInterview();
}

// Clear conversation
function clearChat() {

    chatArea.innerHTML = `
        <div class="welcome" id="welcome">
            <div class="welcome-icon">☁️</div>
            <h1>Hey! I'm CloudPal 👋</h1>
            <p>Your friendly Cloud and DevOps learning assistant.</p>
        </div>
    `;
}