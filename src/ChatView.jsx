import React, { useState } from 'react';
import { Heart, User, Send } from 'lucide-react';

const ChatView = ({ userType, onBack }) => {
  const isPatient = userType === 'paciente';
  
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'hospital', 
      text: 'Olá! Recebemos sua solicitação. O médico responsável estará analisando o seu caso em breve.', 
      time: '10:00' 
    },
    { 
      id: 2, 
      sender: 'hospital', 
      text: 'Você tem alguma dúvida sobre o procedimento?', 
      time: '10:01' 
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages([...messages, {
      id: Date.now(),
      sender: isPatient ? 'patient' : 'hospital',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewMessage('');

    // Simulate other side responding
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: isPatient ? 'hospital' : 'patient',
        text: isPatient 
          ? 'Nossa equipe anotou sua mensagem. Entraremos em contato assim que tivermos doadores confirmados.'
          : 'Obrigado por avisar! Estou aguardando novidades.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
  };

  return (
    <div className="flex-1 overflow-hidden p-6 lg:p-12 h-full flex flex-col bg-[#F8F9FA]">
      <div className="max-w-4xl mx-auto w-full h-full flex flex-col bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isPatient ? 'bg-red-100 text-brand-red' : 'bg-blue-100 text-blue-600'}`}>
              {isPatient ? <Heart size={24} /> : <User size={24} />}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {isPatient ? 'Hospital Central' : 'Paciente Amanda'}
              </h2>
              <p className="text-sm text-green-500 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Online agora
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
          {messages.map(msg => {
            // Se isPatient for true, as mensagens do 'patient' ficam na direita.
            // Se isPatient for false (Hospital), as mensagens do 'hospital' ficam na direita.
            const isMe = isPatient ? msg.sender === 'patient' : msg.sender === 'hospital';

            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[80%] ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${msg.sender === 'patient' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-brand-red'}`}>
                    {msg.sender === 'patient' ? <User size={20} /> : <Heart size={20} />}
                  </div>
                  <div className={`p-4 rounded-2xl ${
                    isMe 
                      ? 'bg-brand-red text-white rounded-tr-none shadow-md shadow-brand-red/10' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm'
                  }`}>
                    <p className="text-[15px] leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-2 text-right ${isMe ? 'text-white/70' : 'text-gray-400'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input */}
        <div className="p-6 bg-white border-t border-gray-100">
          <form onSubmit={handleSend} className="flex gap-4">
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Digite sua mensagem para ${isPatient ? 'o hospital' : 'o paciente'}...`}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-red focus:bg-white transition-all"
            />
            <button 
              type="submit"
              disabled={!newMessage.trim()}
              className={`px-8 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                newMessage.trim() 
                  ? 'bg-brand-red text-white hover:bg-red-700 shadow-md shadow-brand-red/20' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Enviar
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
