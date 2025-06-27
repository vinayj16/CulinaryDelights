<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { io } from 'socket.io-client'

const messages = ref([])
const newMessage = ref('')
const isOpen = ref(false)
const socket = ref(null)

const connect = () => {
  socket.value = io('http://localhost:5173', {
    transports: ['websocket']
  })

  socket.value.on('chat message', (msg) => {
    messages.value.push({
      text: msg,
      isServer: true,
      timestamp: new Date().toLocaleTimeString()
    })
    scrollToBottom()
  })

  socket.value.on('connect_error', (error) => {
    console.error('Connection Error:', error)
  })
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  const messageObj = {
    text: newMessage.value,
    isServer: false,
    timestamp: new Date().toLocaleTimeString()
  }

  messages.value.push(messageObj)
  socket.value.emit('chat message', newMessage.value)
  newMessage.value = ''
  scrollToBottom()
}

const scrollToBottom = () => {
  setTimeout(() => {
    const chatMessages = document.querySelector('.chat-messages')
    chatMessages.scrollTop = chatMessages.scrollHeight
  }, 50)
}

onMounted(() => {
  connect()
})

onBeforeUnmount(() => {
  if (socket.value) {
    socket.value.disconnect()
  }
})
</script>

<template>
  <div class="chat-widget" :class="{ 'chat-open': isOpen }">
    <button class="chat-toggle" @click="isOpen = !isOpen">
      <span v-if="!isOpen">💬 Chat with us</span>
      <span v-else>&times;</span>
    </button>

    <div class="chat-container" v-show="isOpen">
      <div class="chat-header">
        <h3>Live Chat</h3>
      </div>

      <div class="chat-messages" data-aos="fade-up">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.isServer ? 'server' : 'client']"
        >
          <div class="message-content">
            <p>{{ message.text }}</p>
            <span class="timestamp">{{ message.timestamp }}</span>
          </div>
        </div>
      </div>

      <div class="chat-input">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Type your message..."
          type="text"
        >
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chat-toggle {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.chat-toggle:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
}

.chat-container {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 300px;
  height: 400px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  background: var(--primary-color);
  color: white;
  padding: 15px;
  text-align: center;
}

.chat-messages {
  flex-grow: 1;
  padding: 15px;
  overflow-y: auto;
}

.message {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.message-content {
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 15px;
  position: relative;
}

.message.client .message-content {
  background: var(--primary-color);
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 5px;
}

.message.server .message-content {
  background: #f0f0f0;
  color: var(--text-color);
  align-self: flex-start;
  border-bottom-left-radius: 5px;
}

.timestamp {
  font-size: 0.7rem;
  opacity: 0.7;
  margin-top: 5px;
  display: block;
}

.chat-input {
  padding: 15px;
  background: #f8f9fa;
  display: flex;
  gap: 10px;
}

.chat-input input {
  flex-grow: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
}

.chat-input button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.chat-input button:hover {
  background: var(--secondary-color);
}

/* Custom scrollbar for chat messages */
.chat-messages::-webkit-scrollbar {
  width: 5px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 5px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: var(--secondary-color);
}
</style>