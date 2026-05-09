<<<<<<< HEAD
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Activity, HeartPulse, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const HospitalAnalytics = () => {
  const kpis = [
    { title: 'Doadores Ativos', value: '1.240', trend: '+12.5%', isPositive: true, icon: <Users size={24} /> },
    { title: 'Bolsas Coletadas', value: '3.450', trend: '+5.2%', isPositive: true, icon: <Activity size={24} /> },
    { title: 'Vidas Salvas', value: '10.350', trend: '+5.2%', isPositive: true, icon: <HeartPulse size={24} /> },
    { title: 'Tempo Médio', value: '15min', trend: '-2.4%', isPositive: true, icon: <Clock size={24} /> },
  ];

  const monthlyData = [
    { month: 'Jan', value: 65 },
    { month: 'Fev', value: 45 },
    { month: 'Mar', value: 80 },
    { month: 'Abr', value: 55 },
    { month: 'Mai', value: 90 },
    { month: 'Jun', value: 75 },
    { month: 'Jul', value: 100 },
  ];

  const bloodTypeDistribution = [
    { type: 'O+', percentage: 38, color: 'bg-brand-red' },
    { type: 'A+', percentage: 34, color: 'bg-blue-500' },
    { type: 'B+', percentage: 9, color: 'bg-orange-500' },
    { type: 'O-', percentage: 7, color: 'bg-red-500' },
    { type: 'A-', percentage: 6, color: 'bg-blue-400' },
    { type: 'AB+', percentage: 3, color: 'bg-purple-500' },
    { type: 'Outros', percentage: 3, color: 'bg-gray-400' },
  ];

  const patientCampaigns = [
    { name: 'Lucas P. (Emergência)', type: 'O-', target: 10, current: 8, daysLeft: 2 },
    { name: 'Maria F. (Cirurgia)', type: 'A+', target: 20, current: 5, daysLeft: 5 },
    { name: 'Roberto S. (Tratamento)', type: 'O+', target: 15, current: 15, daysLeft: 0 },
  ];

  return (
    <div className="h-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Análise de Desempenho</h2>
          <p className="text-gray-500 text-sm mt-1">Métricas gerais e estatísticas de captação.</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
          Exportar Relatório
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50 hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600 mb-6 group-hover:scale-110 transition-transform group-hover:bg-brand-red group-hover:text-white">
              {kpi.icon}
            </div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{kpi.title}</p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-gray-800">{kpi.value}</span>
              <div className={`flex items-center gap-1 text-sm font-bold mb-1 ${kpi.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {kpi.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="xl:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="text-brand-red" size={24} />
              Captação Mensal
            </h3>
            <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-bold text-gray-600 outline-none">
              <option>Últimos 6 meses</option>
              <option>Este ano</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4 mt-8">
            {monthlyData.map((data, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 gap-4 group">
                <div className="w-full bg-gray-50 rounded-t-xl relative flex items-end justify-center group-hover:bg-gray-100 transition-colors h-[200px]">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${data.value}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="w-full bg-brand-red rounded-t-xl opacity-90 group-hover:opacity-100 shadow-lg shadow-brand-red/20"
                  />
                  {/* Tooltip */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-lg">
                    {data.value}k
=======
import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  AlertCircle,
  Share2,
  Maximize2,
  Filter,
  ChevronRight,
  MessageSquare,
  Calendar,
  Check,
  X,
  AlertTriangle,
  FileText
} from 'lucide-react';
import MapView from './MapView';
import CuriositiesView from './CuriositiesView';
import HospitalAnalytics from './HospitalAnalytics';
import SettingsView from './SettingsView';
import ChatView from './ChatView';

const HospitalDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [headerTab, setHeaderTab] = useState('Dashboard');
  const [appointments, setAppointments] = useState([
    { id: 1, name: 'Amanda Silva', blood: 'O+', date: 'Hoje', time: '14:30', status: 'PENDENTE', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop' },
    { id: 2, name: 'Carlos Santos', blood: 'A-', date: 'Amanhã', time: '09:00', status: 'PENDENTE', avatar: 'https://i.pravatar.cc/150?u=carlos' },
  ]);

  const handleUpdateAppointment = (id, newStatus) => {
    setAppointments(appointments.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt));
  };

  const [patientRequests, setPatientRequests] = useState([
    { id: 1, name: 'Lucas P.', blood: 'O-', type: 'Emergência', location: 'Hospital Central', distance: '1.2 km', priority: 1, docs: 2 },
    { id: 2, name: 'Maria F.', blood: 'A+', type: 'Urgente', location: 'Hospital Norte', distance: '3.5 km', priority: 2, docs: 1 },
    { id: 3, name: 'Roberto S.', blood: 'O+', type: 'Programada', location: 'Clínica Sul', distance: '5.0 km', priority: 3, docs: 0 },
  ]);

  const sortedRequests = [...patientRequests].sort((a, b) => a.priority - b.priority);

  const menuItems = [
    { name: 'Home', icon: <LayoutDashboard size={20} /> },
    { name: 'Mapa', icon: <Map size={20} /> },
    { name: 'Chat', icon: <MessageSquare size={20} /> },
    { name: 'Curiosidades', icon: <Lightbulb size={20} /> },
    { name: 'Configurações', icon: <Settings size={20} /> },
  ];

  const inventory = [
    { type: 'A+ Positivo', units: 12, status: 'Positivo', color: 'bg-blue-600' },
    { type: 'O+ Positivo', units: 6, status: 'Moderado', color: 'bg-orange-400' },
    { type: 'O- Negativo', units: 1, status: 'Crítico', color: 'bg-red-500' },
    { type: 'B+ Positivo', units: 18, status: 'Positivo', color: 'bg-blue-600' },
  ];

  const responses = [
    { name: 'Marcus T.', dist: '2.4 km distância', status: 'Incoming', avatar: 'https://i.pravatar.cc/150?u=marcus' },
    { name: 'Sarah L.', dist: 'Confirmando match...', status: '', avatar: 'https://i.pravatar.cc/150?u=sarah' },
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

        <div className="mt-auto pt-6 space-y-2">
          <button className="w-full bg-brand-red text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-brand-red/20 mb-6">
            Poste alguma urgência
          </button>
          <div className="space-y-2 border-t border-gray-100 pt-6">
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
        </div>
      </aside>

      {/* Main Content */}
      {activeTab === 'Mapa' ? (
        <MapView userType="hospital" onBack={() => setActiveTab('Home')} />
      ) : activeTab === 'Curiosidades' ? (
        <CuriositiesView userType="hospital" onBack={() => setActiveTab('Home')} />
      ) : activeTab === 'Chat' ? (
        <ChatView userType="hospital" onBack={() => setActiveTab('Home')} />
      ) : activeTab === 'Configurações' ? (
        <SettingsView userType="hospital" onBack={() => setActiveTab('Home')} />
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
                  onClick={() => setHeaderTab('Inventário')}
                  className={`font-semibold pb-1 transition-all ${headerTab === 'Inventário' ? 'text-brand-red border-b-2 border-brand-red' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Inventário
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

            {headerTab === 'Análise' ? (
              <HospitalAnalytics />
            ) : (
              <div className="flex gap-8 h-full">
                <div className="flex-1 space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Critical Case Card */}
                    <div className="bg-red-50 rounded-[32px] p-8 border border-red-100 relative overflow-hidden">
                      <div className="flex items-center gap-2 text-red-600 mb-4">
                        <AlertCircle size={18} />
                        <span className="text-xs font-bold uppercase tracking-wider">Caso Crítico</span>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">Tipo O- Negativo</h2>
                      <p className="text-sm text-red-400 leading-relaxed mb-6 max-w-xs">
                        O estoque de sangue caiu mais que o normal. Múltiplas unidades estão precisando desse sangue.
                      </p>
                      <button className="bg-brand-red text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-brand-red/20">
                        Compartilhar alerta <Share2 size={16} />
                      </button>
                      {/* Background Blood Icon */}
                      <div className="absolute right-[-20px] bottom-[-20px] opacity-10 text-brand-red">
                        <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </div>
                    </div>

                    {/* Responses Card */}
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">Respostas</h3>
                          <p className="text-xs text-gray-400">Requisitos Ativos: #7721-B</p>
                        </div>
                        <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-md">
                          8 MATCHES
                        </span>
                      </div>
                      <div className="space-y-4">
                        {responses.map((resp, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50">
                            <img src={resp.avatar} alt={resp.name} className="w-10 h-10 rounded-full" />
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-sm text-gray-800">{resp.name}</span>
                                <span className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                              </div>
                              <p className="text-[10px] text-gray-400">{resp.dist} {resp.status && `ÔÇó ${resp.status}`}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Appointments Card */}
                  <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-brand-red" size={24} />
                        <h3 className="text-xl font-bold text-gray-800">Agendamentos de Doadores</h3>
                      </div>
                      <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-3 py-1 rounded-md">
                        {appointments.filter(a => a.status === 'PENDENTE').length} PENDENTES
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      {appointments.length === 0 && (
                        <p className="text-gray-400 text-sm">Nenhum agendamento pendente no momento.</p>
                      )}
                      {appointments.map((apt) => (
                        <div key={apt.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100 transition-all hover:bg-gray-50">
                          <div className="flex items-center gap-4">
                            <img src={apt.avatar} alt={apt.name} className="w-12 h-12 rounded-full shadow-sm object-cover" />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-800">{apt.name}</span>
                                <span className="text-brand-red text-xs font-bold bg-brand-red-light/30 px-2 py-0.5 rounded-md">{apt.blood}</span>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {apt.date} às {apt.time}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {apt.status === 'PENDENTE' ? (
                              <>
                                <button 
                                  onClick={() => handleUpdateAppointment(apt.id, 'ACEITO')}
                                  className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors"
                                  title="Aceitar Agendamento"
                                >
                                  <Check size={20} />
                                </button>
                                <button 
                                  onClick={() => handleUpdateAppointment(apt.id, 'REJEITADO')}
                                  className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                                  title="Rejeitar Agendamento"
                                >
                                  <X size={20} />
                                </button>
                              </>
                            ) : (
                              <span className={`text-[10px] font-bold px-3 py-1 rounded-md ${apt.status === 'ACEITO' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {apt.status}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Network Requests (Prioridade Automática) */}
                  <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="text-brand-red" size={24} />
                        <h3 className="text-xl font-bold text-gray-800">Solicitações da Rede</h3>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {sortedRequests.map((req) => (
                        <div key={req.id} className={`relative flex items-center justify-between p-4 rounded-2xl border transition-all ${req.type === 'Emergência' ? 'bg-red-50/50 border-red-200' : 'bg-gray-50/50 border-gray-100 hover:bg-gray-50'}`}>
                          {req.type === 'Emergência' && (
                            <span className="absolute -top-3 left-6 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md animate-pulse flex items-center gap-1">
                              <AlertTriangle size={10} />
                              PRIORIDADE AUTOMÁTICA
                            </span>
                          )}
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${req.type === 'Emergência' ? 'bg-red-500' : req.type === 'Urgente' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                              {req.blood}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-800">{req.name}</span>
                                {req.docs > 0 && (
                                  <span className="flex items-center gap-1 text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md font-bold" title={`${req.docs} Documentos anexados`}>
                                    <FileText size={10} /> {req.docs} docs
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 mt-1">
                                {req.location} • {req.distance}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2">
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-md ${req.type === 'Emergência' ? 'bg-red-100 text-red-700' : req.type === 'Urgente' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                              {req.type.toUpperCase()}
                            </span>
                            <button className="text-xs text-brand-red font-bold hover:underline">Ver Detalhes</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nearest Donor Map */}
                  <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold">Doador mais próximo</h3>
                      <div className="flex gap-2">
                        <button className="p-2 bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"><Filter size={18} /></button>
                        <button className="p-2 bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600"><Maximize2 size={18} /></button>
                      </div>
                    </div>
                    <div className="relative rounded-[24px] overflow-hidden h-[400px] bg-gray-100">
                      <img
                        src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover grayscale opacity-50"
                        alt="Map"
                      />
                      <div className="absolute inset-0 bg-gray-200/40 mix-blend-multiply"></div>
                      {/* Custom Map Markers */}
                      <div className="absolute top-1/4 left-1/3">
                        <div className="w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg relative">
                          <div className="absolute top-0 left-0 w-full h-full bg-red-500 rounded-full animate-ping opacity-25"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-1/3 right-1/4">
                        <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-2">
                          <div className="w-6 h-6 bg-brand-red rounded-lg flex items-center justify-center text-white">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <path d="M12 2v20M2 12h20" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-800">HOSPITAL</p>
                            <p className="text-[8px] text-gray-400">H-Zona Norte</p>
                          </div>
                        </div>
                      </div>
                    </div>
>>>>>>> deff5666f1b536483bfc58093f2be80175b2785c
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-400 group-hover:text-gray-800 transition-colors">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

<<<<<<< HEAD
        {/* Distribution Section */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50">
          <h3 className="text-xl font-bold text-gray-800 mb-8">Distribuição Sanguínea</h3>
          
          <div className="space-y-6">
            {bloodTypeDistribution.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-700">{item.type}</span>
                  <span className="text-sm font-bold text-gray-400">{item.percentage}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1.2, delay: idx * 0.1 }}
                    className={`h-full rounded-full ${item.color}`}
                  />
=======
                {/* Right Sidebar - Inventory */}
                <div className="w-80 bg-white rounded-[32px] p-8 shadow-sm border border-gray-50 flex flex-col h-full max-h-[85vh]">
                  <h3 className="text-xl font-bold mb-8">Inventário Geral</h3>
                  <div className="flex-1 space-y-8 overflow-y-auto pr-2">
                    {inventory.map((item, idx) => (
                      <div key={idx} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-800">{item.type}</span>
                          <span className={`text-[10px] font-bold ${item.status === 'Crítico' ? 'text-red-500' :
                              item.status === 'Moderado' ? 'text-orange-400' : 'text-blue-600'
                            }`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.units / 20) * 100}%` }}
                            transition={{ duration: 1.5, delay: idx * 0.1 }}
                            className={`h-full rounded-full ${item.color}`}
                          />
                        </div>
                        <p className="text-[10px] text-gray-400 font-medium">{item.units} Unidades Disponíveis</p>
                      </div>
                    ))}
                  </div>
                  <button className="mt-8 text-brand-red text-sm font-bold flex items-center justify-center gap-1 hover:underline w-full pt-4 border-t border-gray-50">
                    Ver mais
                  </button>
>>>>>>> deff5666f1b536483bfc58093f2be80175b2785c
                </div>
              </div>
            )}
          </div>
<<<<<<< HEAD
          
          <div className="mt-8 p-6 bg-brand-red-light/30 rounded-[24px] border border-brand-red-light text-center">
             <p className="text-sm font-bold text-brand-red mb-1">Dica do Sistema</p>
             <p className="text-xs text-gray-600 leading-relaxed">
               As reservas de sangue O- estão 15% abaixo do ideal esperado para este período do ano.
             </p>
          </div>
        </div>
      </div>

      {/* Patient Campaigns Section */}
      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-brand-red" size={24} />
            Análise de Campanhas de Pacientes
          </h3>
          <button className="text-sm font-bold text-brand-red hover:underline">Ver Todas</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {patientCampaigns.map((campaign, idx) => {
            const progress = (campaign.current / campaign.target) * 100;
            const isCompleted = progress >= 100;
            return (
              <div key={idx} className="p-6 rounded-[24px] border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors relative overflow-hidden group">
                {isCompleted && (
                  <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md">
                    CONCLUÍDO
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm ${
                    campaign.type === 'O-' ? 'bg-red-500' : 
                    campaign.type === 'A+' ? 'bg-blue-500' : 'bg-orange-500'
                  }`}>
                    {campaign.type}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm truncate max-w-[150px]">{campaign.name}</h4>
                    {!isCompleted && (
                      <p className="text-xs text-orange-500 font-bold mt-0.5">{campaign.daysLeft} dias restantes</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-500">Progresso</span>
                    <span className={isCompleted ? 'text-green-500' : 'text-brand-red'}>
                      {campaign.current} / {campaign.target} bolsas
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className={`h-full rounded-full ${isCompleted ? 'bg-green-500' : 'bg-brand-red'}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
=======
        </main>
      )}
>>>>>>> deff5666f1b536483bfc58093f2be80175b2785c
    </div>
  );
};

<<<<<<< HEAD
export default HospitalAnalytics;
=======
export default HospitalDashboard;
>>>>>>> deff5666f1b536483bfc58093f2be80175b2785c
