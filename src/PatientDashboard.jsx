import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Clock, AlertTriangle, LogOut, Info, ShieldCheck, Share2,
  MessageSquare, Users, Lightbulb, LayoutDashboard, Bell, Settings,
  Calendar, Droplets, History, Check, Smartphone, Instagram, Link,
  Edit, X, User, Activity, FileText, UploadCloud, Search, HelpCircle, TrendingUp, MapPin
} from 'lucide-react';
import CuriositiesView from './CuriositiesView';
import CommunityView from './CommunityView';
import ChatView from './ChatView';
import SettingsView from './SettingsView';

const PatientDashboard = ({ onLogout, urgency }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [headerTab, setHeaderTab] = useState('Dashboard');
  const [patientStatus, setPatientStatus] = useState(urgency || 'Urgente');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // New states for campaign
  const [campaignGoal, setCampaignGoal] = useState('');
  const [campaignMessage, setCampaignMessage] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  // Mock Data
  const campaign = { received: 3, goal: 5, donors: 3 };
  const progressPercent = Math.min((campaign.received / campaign.goal) * 100, 100);

  const confirmedDonors = [
    { id: 1, name: 'Carlos Santos', blood: 'O+', date: 'Amanhã', time: '09:00', status: 'A Caminho', avatar: 'https://i.pravatar.cc/150?u=carlos' },
    { id: 2, name: 'Marina Silva', blood: 'O-', date: 'Hoje', time: '14:30', status: 'Concluído', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop' }
  ];

  const history = [
    { id: 1, date: '12 Ago 2023', type: 'Cirurgia', received: '2 Bolsas' },
    { id: 2, date: '05 Mar 2022', type: 'Emergência', received: '1 Bolsa' }
  ];

  const notifications = [
    { id: 1, type: 'donor', title: 'Novo doador compatível!', message: 'Rafael C. demonstrou interesse.', time: 'Agora mesmo', icon: <User className="text-blue-500" /> },
    { id: 2, type: 'success', title: 'Doação confirmada!', message: 'Marina S. realizou a doação.', time: 'Há 2h', icon: <Check className="text-green-500" /> }
  ];

  const menuItems = [
    { name: 'Home', icon: <LayoutDashboard size={20} /> },
    { name: 'Comunidade', icon: <Users size={20} /> },
    { name: 'Curiosidades', icon: <Lightbulb size={20} /> },
    { name: 'Chat', icon: <MessageSquare size={20} /> },
    { name: 'Configurações', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen w-full bg-[#F8F9FA] overflow-hidden font-sans">
      {/* Sidebar - MATCHES DONOR */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col p-6 z-20">
        <div className="flex items-center gap-2 mb-10">
          <div className="text-brand-red">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-brand-red">DoaVida</span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveTab(item.name); setHeaderTab('Dashboard'); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === item.name
                ? 'bg-brand-red-light text-brand-red font-semibold'
                : 'text-gray-400 hover:bg-gray-50'
                }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </motion.button>
          ))}
        </nav>

        <div className="mt-auto pt-6 space-y-2 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors">
            <HelpCircle size={20} />
            <span>Suporte</span>
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      {activeTab === 'Curiosidades' ? (
        <CuriositiesView userType="paciente" onBack={() => setActiveTab('Home')} />
      ) : activeTab === 'Comunidade' ? (
        <CommunityView userType="paciente" onBack={() => setActiveTab('Home')} />
      ) : activeTab === 'Chat' ? (
        <ChatView userType="paciente" onBack={() => setActiveTab('Home')} />
      ) : activeTab === 'Configurações' ? (
        <SettingsView userType="paciente" onBack={() => setActiveTab('Home')} />
      ) : (
        <main className="flex-1 overflow-y-auto p-10 lg:p-16 relative">
          <div className="max-w-[1600px] mx-auto">

            {patientStatus === 'Emergência' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-600 text-white p-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-red-600/20 mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
                <span className="font-bold">Prioridade Automática Ativada:</span>
                <span className="text-sm font-medium">Sua solicitação ganhou visibilidade máxima na rede.</span>
              </motion.div>
            )}

            {/* Header matches Donor Dashboard */}
            <header className="flex items-center justify-between mb-12">
              <div className="flex gap-8">
                {['Dashboard', 'Meus Documentos', 'Minha Campanha', 'Histórico'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setHeaderTab(tab)}
                    className={`font-semibold pb-1 transition-all ${headerTab === tab ? 'text-brand-red border-b-2 border-brand-red' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Pesquise aqui"
                    className="bg-gray-100 rounded-full py-2 pl-10 pr-4 outline-none w-64 focus:ring-2 focus:ring-brand-red/20 transition-all"
                  />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="text-gray-400 hover:text-gray-600 relative"
                  >
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-red rounded-full border-2 border-white"></span>
                  </button>
                  {/* Notifications Dropdown */}
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-4 w-80 lg:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                      >
                        <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50">
                          <h3 className="font-bold text-gray-900">Notificações</h3>
                          <span className="text-xs bg-brand-red text-white px-2 py-1 rounded-full font-bold">2 Novas</span>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto">
                          {notifications.map((notif) => (
                            <div key={notif.id} className="p-5 border-b border-gray-50 hover:bg-gray-50 transition-colors flex gap-4">
                              <div className="mt-1">{notif.icon}</div>
                              <div>
                                <h4 className="text-sm font-bold text-gray-900">{notif.title}</h4>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{notif.message}</p>
                                <span className="text-[10px] text-gray-400 font-bold mt-2 block">{notif.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
              </div>
            </header>

            {headerTab === 'Meus Documentos' ? (
              <div className="space-y-8">
                <header className="mb-8">
                  <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Upload de Documentos Médicos</h1>
                  <p className="text-gray-500 text-lg">Envie solicitações, exames e laudos para agilizar a triagem do hospital.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['Solicitação Médica', 'Exames', 'Laudos'].map((docType, idx) => (
                    <div key={idx} className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50 flex flex-col">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                          <FileText size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{docType}</h3>
                      </div>

                      <div className="flex-1 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 bg-gray-50/50 hover:bg-gray-50 hover:border-brand-red transition-all cursor-pointer group">
                        <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <UploadCloud className="text-gray-400 group-hover:text-brand-red transition-colors" size={32} />
                        </div>
                        <p className="text-sm font-bold text-gray-700 text-center mb-1">Clique para fazer upload</p>
                        <p className="text-xs text-gray-400 text-center">PDF, JPG, PNG (Max 5MB)</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : headerTab === 'Minha Campanha' ? (
              <div className="max-w-4xl mx-auto space-y-8 h-full">
                <header className="mb-8">
                  <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Sua Campanha de Doação</h1>
                  <p className="text-gray-500 text-lg">Crie uma campanha personalizada para compartilhar com a comunidade e nas suas redes sociais.</p>
                </header>

                <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-50">
                  {isPublished ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                        <Check size={48} />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">Campanha Publicada!</h2>
                      <p className="text-gray-500 mb-8 max-w-md mx-auto">Sua campanha já está visível para a comunidade DoaVida. Agora compartilhe nas redes para alcançar mais pessoas.</p>
                      <div className="flex flex-wrap items-center justify-center gap-4">
                        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/20">
                          <Instagram size={20} /> Compartilhar no Instagram
                        </button>
                        <button className="px-6 py-3 bg-green-500 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20">
                          <Smartphone size={20} /> Compartilhar no WhatsApp
                        </button>
                        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
                          <Link size={20} /> Copiar Link
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); if(agreeTerms) setIsPublished(true); }} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">Meta de Bolsas</label>
                          <input 
                            type="number" 
                            placeholder="Ex: 15" 
                            required
                            value={campaignGoal}
                            onChange={(e) => setCampaignGoal(e.target.value)}
                            className="w-full rounded-2xl bg-gray-50 border border-gray-100 p-4 text-gray-800 outline-none focus:ring-2 focus:ring-brand-red/20 focus:bg-white transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700">Hospital/Local</label>
                          <input 
                            type="text" 
                            value="Hospital Central - São Paulo" 
                            disabled
                            className="w-full rounded-2xl bg-gray-100 border border-gray-100 p-4 text-gray-500 outline-none cursor-not-allowed"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Sua Mensagem</label>
                        <textarea 
                          placeholder="Conte um pouco da sua história para emocionar e incentivar as pessoas a doarem..." 
                          required
                          value={campaignMessage}
                          onChange={(e) => setCampaignMessage(e.target.value)}
                          rows="4"
                          className="w-full rounded-2xl bg-gray-50 border border-gray-100 p-4 text-gray-800 outline-none focus:ring-2 focus:ring-brand-red/20 focus:bg-white transition-all resize-none"
                        ></textarea>
                      </div>

                      <div className="bg-orange-50 p-6 rounded-[24px] border border-orange-100">
                        <label className="flex items-start gap-4 cursor-pointer group">
                          <div className="relative flex items-center justify-center mt-1">
                            <input 
                              type="checkbox" 
                              checked={agreeTerms}
                              onChange={(e) => setAgreeTerms(e.target.checked)}
                              className="peer sr-only" 
                            />
                            <div className="w-6 h-6 border-2 border-orange-300 rounded-lg peer-checked:bg-brand-red peer-checked:border-brand-red transition-all flex items-center justify-center">
                              <Check className="text-white opacity-0 peer-checked:opacity-100 w-4 h-4 transition-opacity" />
                            </div>
                          </div>
                          <div>
                            <span className="font-bold text-orange-800 block mb-1 text-sm">Termo de Consentimento e Privacidade</span>
                            <span className="text-xs text-orange-600/80 leading-relaxed block">
                              Estou ciente e concordo livremente que as informações fornecidas (incluindo meu nome, tipo sanguíneo, local de internação e história) se tornarão <strong>públicas</strong> na plataforma DoaVida e poderão ser compartilhadas por terceiros nas redes sociais com o único propósito de buscar doadores de sangue. Posso cancelar essa campanha a qualquer momento.
                            </span>
                          </div>
                        </label>
                      </div>

                      <button 
                        type="submit" 
                        disabled={!agreeTerms}
                        className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
                          agreeTerms 
                            ? 'bg-brand-red text-white hover:bg-red-700 shadow-xl shadow-brand-red/20 active:scale-[0.98]' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Share2 size={20} />
                        Publicar e Compartilhar Campanha
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ) : headerTab === 'Histórico' ? (
              <div className="bg-white rounded-[32px] p-8 border border-gray-50 shadow-sm flex flex-col h-full max-w-3xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-gray-100 p-3 rounded-xl text-gray-600">
                    <History size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Seu Histórico Clínico</h3>
                </div>

                <div className="space-y-6 flex-1">
                  {history.map((item) => (
                    <div key={item.id} className="relative pl-6 border-l-2 border-gray-100 pb-2">
                      <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-brand-red"></span>
                      <p className="text-xs font-bold text-gray-400 mb-1">{item.date}</p>
                      <h4 className="font-bold text-gray-900">{item.type}</h4>
                      <p className="text-sm text-brand-red font-medium mt-1">{item.received}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Welcome Section */}
                <div className="flex justify-between items-start mb-10">
                  <div className="max-w-xl">
                    <h1 className="text-3xl font-bold mb-4">Bem Vindo (a) de volta, <span className="text-brand-red">Rafael.</span></h1>
                    <p className="text-gray-500 leading-relaxed">
                      Você está acompanhando a sua solicitação atual. Continue atualizando seus dados para atrair mais doadores.
                    </p>
                  </div>

                  {/* Patient Status Switcher style (Livre/Ocupado style adapted) */}
                  <div className="bg-gray-100 p-1 rounded-full flex relative w-48 h-12">
                    <button
                      onClick={() => setIsUpdatingStatus(true)}
                      className="flex-1 flex items-center justify-center gap-2 relative z-10 transition-colors text-gray-800 font-bold bg-white rounded-full shadow-sm"
                    >
                      <span className={`w-2 h-2 rounded-full ${patientStatus === 'Emergência' ? 'bg-red-500' : patientStatus === 'Urgente' ? 'bg-orange-500' : 'bg-blue-500'}`}></span>
                      {patientStatus}
                    </button>
                  </div>
                </div>

                {/* Stats Grid matching Donor Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                  {/* Blood Type Card - Red */}
                  <div className="bg-brand-red rounded-[32px] p-8 text-white relative overflow-hidden h-64 flex flex-col justify-between">
                    <div className="relative z-10">
                      <p className="text-sm font-medium opacity-80 mb-2 uppercase tracking-wider">Sangue Solicitado</p>
                      <h2 className="text-6xl font-bold">O-</h2>
                    </div>
                    <div className="relative z-10 flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/40 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium opacity-90">Prioridade Máxima</span>
                    </div>
                    <div className="absolute right-[-20px] bottom-[-20px] opacity-20">
                      <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                  </div>

                  {/* Impact Card - White (Campaign Progress) */}
                  <div className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-gray-50 flex gap-8 h-64">
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Progresso da Campanha</p>
                        <h2 className="text-4xl font-bold mb-4">{campaign.received} de {campaign.goal} Bolsas</h2>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-2">
                          <span className="text-gray-400">Progresso para o status concluído</span>
                          <span className="text-brand-red">{progressPercent}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-brand-red rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-48 bg-blue-50 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-4">
                        <Droplets size={32} />
                      </div>
                      <span className="text-blue-800 text-xs font-bold uppercase tracking-tighter">{campaign.donors} Doadores</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Grid matching Donor Dashboard layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                  {/* Recent Activities -> Updates / Notificações */}
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Atualizações Recentes</h3>
                      <button className="text-brand-red text-sm font-semibold hover:underline">Ver tudo</button>
                    </div>
                    <div className="space-y-4">
                      {notifications.map((notif, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-2xl flex items-center justify-between border border-gray-50 hover:shadow-md transition-shadow">
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-800">{notif.title}</span>
                            <span className="text-xs text-gray-400 mt-1">{notif.message}</span>
                          </div>
                          <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-md">
                            {notif.time}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setHeaderTab('Histórico')}
                      className="mt-8 bg-brand-red text-white w-full py-4 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-brand-red/20 flex items-center justify-center gap-2"
                    >
                      <History size={20} />
                      Ver Histórico Completo
                    </button>
                  </div>

                  {/* Urgent Cases -> Doadores Confirmados */}
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold flex items-center gap-2">
                        Doadores Confirmados
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {confirmedDonors.map((donor, idx) => (
                        <div key={idx} className="bg-white rounded-[24px] p-6 border border-gray-100 flex flex-col h-full relative overflow-hidden group">
                          <div className="absolute top-0 left-0 w-1 h-full bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="flex justify-between items-start mb-6">
                            <span className="text-brand-red font-bold text-sm bg-brand-red-light/30 px-2 py-0.5 rounded-md">Tipo {donor.blood}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{donor.date} às {donor.time}</span>
                          </div>
                          <div className="mb-8">
                            <h4 className="font-bold text-lg leading-tight mb-1">{donor.name}</h4>
                            <p className={`text-xs font-bold ${donor.status === 'Concluído' ? 'text-green-500' : 'text-blue-500'}`}>{donor.status}</p>
                          </div>
                          <button className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${idx === 0 ? 'bg-brand-red text-white hover:bg-red-700' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
                            Ver Detalhes
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Share Preview / Ad */}
                    <div className="relative rounded-[32px] overflow-hidden h-40 bg-gray-200 flex items-center justify-center">
                      <img
                        src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-80 grayscale"
                        alt="Map"
                      />
                      <div className="absolute inset-0 bg-red-900/40 mix-blend-multiply"></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                        <p className="text-sm font-bold mb-2">Compartilhe sua campanha para alcançar mais vidas</p>
                        <button className="bg-white text-brand-red px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
                          <Share2 size={12} /> Compartilhar Agora
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </>
            )}

            {/* Modal de Atualizar Estado */}
            <AnimatePresence>
              {isUpdatingStatus && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-[32px] p-8 md:p-10 w-full max-w-lg shadow-2xl relative"
                  >
                    <button
                      onClick={() => setIsUpdatingStatus(false)}
                      className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors bg-gray-100 rounded-full p-2"
                    >
                      <X size={20} />
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Atualizar Status</h2>
                    <p className="text-sm text-gray-500 mb-8">Defina a urgência atual do seu pedido de doação.</p>

                    <div className="space-y-4">
                      {['Emergência', 'Urgente', 'Programada'].map((statusOption) => (
                        <button
                          key={statusOption}
                          onClick={() => {
                            setPatientStatus(statusOption);
                            setIsUpdatingStatus(false);
                          }}
                          className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${patientStatus === statusOption
                            ? 'border-brand-red bg-brand-red-light/10'
                            : 'border-gray-100 hover:border-gray-200 bg-white'
                            }`}
                        >
                          <span className={`font-bold ${patientStatus === statusOption ? 'text-brand-red' : 'text-gray-700'}`}>
                            {statusOption}
                          </span>
                          {patientStatus === statusOption && <Check className="text-brand-red" size={20} />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        </main>
      )}

    </div>
  );
};

export default PatientDashboard;
