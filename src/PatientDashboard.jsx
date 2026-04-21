import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Clock,
  AlertTriangle,
  LogOut,
  Info,
  ShieldCheck,
  Share2,
  Activity,
  MessageSquare,
  Users,
  Lightbulb,
  LayoutDashboard,
  Send,
  User,
  HelpCircle,
  Search,
  Bell,
} from 'lucide-react';
import CuriositiesView from './CuriositiesView';
import CommunityView from './CommunityView';
import ChatView from './ChatView';

const PatientDashboard = ({ onLogout, urgency }) => {
  const [activeTab, setActiveTab] = useState('Home');

  // Configuração de cores e mensagens baseada no nível de urgência
  const statusConfig = {
    'Emergência': {
      color: 'bg-red-500',
      lightColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
      title: 'Status: Crítico (Emergência)',
      message: 'Sua solicitação foi classificada como Emergência e disparou alertas imediatos para todos os doadores compatíveis e hospitais da rede na sua região.',
      icon: <AlertTriangle className="w-8 h-8 text-white" />
    },
    'Urgente': {
      color: 'bg-orange-500',
      lightColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-200',
      title: 'Status: Moderado (Urgente)',
      message: 'Sua solicitação está como Urgente. Os doadores compatíveis estão sendo notificados para comparecerem ao hospital o mais breve possível.',
      icon: <Clock className="w-8 h-8 text-white" />
    },
    'Programada': {
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      title: 'Status: Programada',
      message: 'Sua doação programada está no sistema. Doadores estão sendo agendados para garantir que as bolsas estejam prontas na data necessária.',
      icon: <ShieldCheck className="w-8 h-8 text-white" />
    }
  };

  const config = statusConfig[urgency] || statusConfig['Urgente'];

  const menuItems = [
    { name: 'Home', icon: <LayoutDashboard size={20} /> },
    { name: 'Comunidade', icon: <Users size={20} /> },
    { name: 'Curiosidades', icon: <Lightbulb size={20} /> },
    { name: 'Chat', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="flex h-screen w-full bg-[#F8F9FA] font-sans overflow-hidden">

      {/* Sidebar Lateral */}
      <div className="w-24 lg:w-64 bg-white border-r border-gray-100 flex flex-col justify-between py-8 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col items-center lg:items-start lg:px-8 gap-12">
          <div className="flex items-center gap-3">
            <div className="bg-brand-red-light/20 p-2 lg:p-3 rounded-xl">
              <Heart className="w-6 h-6 lg:w-8 lg:h-8 fill-brand-red text-brand-red" />
            </div>
            <span className="hidden lg:block text-2xl font-extrabold tracking-tight text-gray-900">
              Doe<span className="text-brand-red">Vida</span>
            </span>
          </div>

          <nav className="w-full flex flex-col gap-2 px-4 lg:px-0">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${activeTab === item.name
                    ? 'bg-brand-red text-white shadow-lg shadow-brand-red/20'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                {item.icon}
                <span className="hidden lg:block">{item.name === 'Home' ? 'Meu Quadro' : item.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="px-4 lg:px-8">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center lg:justify-start gap-4 px-4 py-4 rounded-2xl text-gray-500 hover:bg-red-50 hover:text-brand-red font-bold transition-all"
          >
            <LogOut className="w-6 h-6" />
            <span className="hidden lg:block">Sair da conta</span>
          </button>
        </div>
      </div>

      {/* Main Content Render */}
      {activeTab === 'Curiosidades' ? (
        <CuriositiesView userType="paciente" onBack={() => setActiveTab('Home')} />
      ) : activeTab === 'Comunidade' ? (
        <CommunityView userType="paciente" onBack={() => setActiveTab('Home')} />
      ) : activeTab === 'Chat' ? (
        <ChatView userType="paciente" onBack={() => setActiveTab('Home')} />
      ) : activeTab === 'Configurações' ? (
        <SettingsView userType="paciente" onBack={() => setActiveTab('Home')} />
      ) : (
        <div className="flex-1 overflow-y-auto p-8 lg:p-16">
          <div className="max-w-5xl mx-auto space-y-8">

            <header className="mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Painel do Paciente</h1>
              <p className="text-gray-500 text-lg">Acompanhe o status da sua solicitação e comunique-se com a rede.</p>
            </header>

            {/* Banner de Status */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-[32px] border ${config.borderColor} ${config.lightColor} overflow-hidden shadow-sm`}
            >
              <div className={`${config.color} p-6 text-white flex items-center gap-4`}>
                {config.icon}
                <h2 className="text-2xl font-bold">{config.title}</h2>
              </div>
              <div className="p-8 lg:p-10">
                <p className={`text-xl ${config.textColor} font-medium leading-relaxed mb-8`}>
                  {config.message}
                </p>

                <div className="flex flex-wrap gap-4">
                  <button className={`px-6 py-3 rounded-xl font-bold text-white ${config.color} hover:brightness-90 transition-all flex items-center gap-2 shadow-lg`}>
                    <Share2 size={20} />
                    Compartilhar Campanha
                  </button>
                  <button onClick={() => setActiveTab('Chat')} className="px-6 py-3 rounded-xl font-bold bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all flex items-center gap-2">
                    <MessageSquare size={20} />
                    Falar com o Hospital
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Dicas e Informações */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">

              <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <Info size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Como funciona a rede?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Nossa plataforma cruza seus dados com os de milhares de doadores ativos. Assim que alguém compatível demonstra interesse, o hospital é notificado e a bolsa de sangue é preparada com prioridade máxima.
                </p>
              </div>

              <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Segurança e Privacidade</h3>
                <p className="text-gray-600 leading-relaxed">
                  Seus dados médicos e de localização estão seguros. Apenas o hospital onde você está internado e os doadores estritamente compatíveis que aceitarem o chamado terão acesso às informações necessárias para a doação.
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default PatientDashboard;
