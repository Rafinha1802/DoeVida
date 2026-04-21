import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Map,
  Users,
  Lightbulb,
  Settings,
  Search,
  Bell,
  LogOut,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react';
import MapView from './MapView';
import CuriositiesView from './CuriositiesView';
import CommunityView from './CommunityView';
import SettingsView from './SettingsView';
import DonorActivityView from './DonorActivityView';

const Dashboard = ({ onLogout }) => {
  const [status, setStatus] = useState('livre'); // 'livre' or 'ocupado'
  const [activeTab, setActiveTab] = useState('Home');
  const [headerTab, setHeaderTab] = useState('Dashboard');

  const menuItems = [
    { name: 'Home', icon: <LayoutDashboard size={20} /> },
    { name: 'Mapa', icon: <Map size={20} /> },
    { name: 'Comunidade', icon: <Users size={20} /> },
    { name: 'Curiosidades', icon: <Lightbulb size={20} /> },
    { name: 'Configurações', icon: <Settings size={20} /> },
  ];

  const recentActivities = [
    { hospital: 'Hospital Português', date: 'Out 12, 2023', status: 'COMPLETO' },
    { hospital: 'Cruz Vermelha', date: 'Ago 28, 2023', status: 'COMPLETO' },
    { hospital: 'Hospital Unimed', date: 'Mai 15, 2023', status: 'COMPLETO' },
  ];

  const urgentCases = [
    {
      type: 'Emergência',
      blood: 'O+',
      dist: '1.2 km distância',
      location: 'Hospital Pediátrico',
      color: 'bg-red-500'
    },
    {
      type: 'Preparando Cirurgia',
      blood: 'A-',
      dist: '3.8 km distância',
      location: 'Centro Metropolitano de Traumas',
      color: 'bg-gray-200'
    },
  ];

  return (
    <div className="flex h-screen w-full bg-[#F8F9FA] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col p-6">
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
              onClick={() => setActiveTab(item.name)}
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
      {activeTab === 'Mapa' ? (
        <MapView userType="doador" onBack={() => setActiveTab('Home')} />
      ) : activeTab === 'Curiosidades' ? (
        <CuriositiesView userType="doador" onBack={() => setActiveTab('Home')} />
      ) : activeTab === 'Comunidade' ? (
        <CommunityView userType="doador" onBack={() => setActiveTab('Home')} />
      ) : activeTab === 'Configurações' ? (
        <SettingsView userType="doador" onBack={() => setActiveTab('Home')} />
      ) : (
        <main className="flex-1 overflow-y-auto p-10 lg:p-16">
          <div className="max-w-[1600px] mx-auto">
            {/* Header */}
            <header className="flex items-center justify-between mb-12">
              <div className="flex gap-8">
                <button 
                  onClick={() => setHeaderTab('Dashboard')}
                  className={`font-semibold pb-1 transition-all ${headerTab === 'Dashboard' ? 'text-brand-red border-b-2 border-brand-red' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setHeaderTab('Minhas Atividades')}
                  className={`font-semibold pb-1 transition-all ${headerTab === 'Minhas Atividades' ? 'text-brand-red border-b-2 border-brand-red' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Minhas Atividades
                </button>
                <button 
                  onClick={() => setHeaderTab('Análise')}
                  className={`font-semibold pb-1 transition-all ${headerTab === 'Análise' ? 'text-brand-red border-b-2 border-brand-red' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Análise
                </button>
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
                <button className="text-gray-400 hover:text-gray-600 relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-red rounded-full border-2 border-white"></span>
                </button>
                <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
              </div>
            </header>

            {headerTab === 'Minhas Atividades' ? (
              <DonorActivityView />
            ) : (
            <>
            {/* Welcome Section */}
            <div className="flex justify-between items-start mb-10">
              <div className="max-w-xl">
                <h1 className="text-3xl font-bold mb-4">Bem Vindo (a) de volta, <span className="text-brand-red">Amanda.</span></h1>
                <p className="text-gray-500 leading-relaxed">
                  Com a sua contribuição você ajudou diretamente a salvar 14 vidas nesse ano. Está pronto para continuar essa jornada de salvar vidas?
                </p>
              </div>

              {/* Status Switcher */}
              <div className="bg-gray-100 p-1 rounded-full flex relative w-48 h-12">
                <motion.div
                  className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm"
                  initial={false}
                  animate={{
                    x: status === 'livre' ? 0 : 92,
                    width: status === 'livre' ? '92px' : '92px'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <button
                  onClick={() => setStatus('livre')}
                  className={`flex-1 flex items-center justify-center gap-2 relative z-10 transition-colors ${status === 'livre' ? 'text-gray-800 font-bold' : 'text-gray-400'}`}
                >
                  <span className={`w-2 h-2 rounded-full ${status === 'livre' ? 'bg-red-500' : 'bg-gray-300'}`}></span>
                  Livre
                </button>
                <button
                  onClick={() => setStatus('ocupado')}
                  className={`flex-1 flex items-center justify-center relative z-10 transition-colors ${status === 'ocupado' ? 'text-gray-800 font-bold' : 'text-gray-400'}`}
                >
                  Ocupado
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              {/* Blood Type Card */}
              <div className="bg-brand-red rounded-[32px] p-8 text-white relative overflow-hidden h-64 flex flex-col justify-between">
                <div className="relative z-10">
                  <p className="text-sm font-medium opacity-80 mb-2 uppercase tracking-wider">Grupo Sanguíneo</p>
                  <h2 className="text-6xl font-bold">O+</h2>
                </div>
                <div className="relative z-10 flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/40 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium opacity-90">Doador Universal</span>
                </div>
                {/* Background elements */}
                <div className="absolute right-[-20px] bottom-[-20px] opacity-20">
                  <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>

              {/* Impact Card */}
              <div className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-gray-50 flex gap-8 h-64">
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">Impactos Causados</p>
                    <h2 className="text-4xl font-bold mb-4">14 Vidas Salvas</h2>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-gray-400">Progresso para o status dourado</span>
                      <span className="text-brand-red">80%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '80%' }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-brand-red rounded-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-48 bg-blue-50 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-4">
                    <TrendingUp size={32} />
                  </div>
                  <span className="text-blue-800 text-xs font-bold uppercase tracking-tighter">Status de Herói</span>
                </div>
              </div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Recent Activities */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Atividades Recentes</h3>
                  <button className="text-brand-red text-sm font-semibold hover:underline">Ver tudo</button>
                </div>
                <div className="space-y-4">
                  {recentActivities.map((activity, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-2xl flex items-center justify-between border border-gray-50 hover:shadow-md transition-shadow">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800">{activity.hospital}</span>
                        <span className="text-xs text-gray-400">{activity.date}</span>
                      </div>
                      <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-md">
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="mt-8 bg-brand-red text-white w-full py-4 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-brand-red/20">
                  Poste alguma urgência
                </button>
              </div>

              {/* Urgent Cases */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    Casos Urgentes por Perto
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  </h3>
                  <button className="text-brand-red text-sm font-semibold flex items-center gap-1">
                    <MapPin size={14} />
                    Ver Mapa
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {urgentCases.map((caseItem, idx) => (
                    <div key={idx} className="bg-white rounded-[24px] p-6 border border-gray-100 flex flex-col h-full relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-brand-red font-bold text-sm">{caseItem.blood}</span>
                        <span className="text-[10px] text-gray-400 font-medium">{caseItem.dist}</span>
                      </div>
                      <div className="mb-8">
                        <h4 className="font-bold text-lg leading-tight mb-1">{caseItem.type}</h4>
                        <p className="text-xs text-gray-400">{caseItem.location}</p>
                      </div>
                      <button className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${idx === 0 ? 'bg-brand-red text-white hover:bg-red-700' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                        }`}>
                        {idx === 0 ? 'Responda agora' : 'Ver Detalhes'}
                      </button>
                    </div>
                  ))}
                </div>
                {/* Map Preview */}
                <div className="relative rounded-[32px] overflow-hidden h-40 bg-gray-200">
                  <img
                    src="/map.png"
                    className="w-full h-full object-cover opacity-80"
                    alt="Map"
                  />
                  <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
                  <div className="absolute bottom-4 left-6 text-white">
                    <p className="text-sm font-bold">Rota mais rápida: Centro da Cidade</p>
                    <p className="text-[10px] opacity-80">- 8 min</p>
                  </div>
                </div>
              </div>
            </div>
            </>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default Dashboard;
