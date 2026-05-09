import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Clock, 
  Plus, 
  Activity,
  Calendar,
  ChevronRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const HospitalInventoryView = () => {
  const bloodInventory = [
    { type: 'O+', units: 45, max: 100, status: 'Adequado', trend: 'up' },
    { type: 'O-', units: 5, max: 50, status: 'Crítico', trend: 'down' },
    { type: 'A+', units: 32, max: 80, status: 'Atenção', trend: 'down' },
    { type: 'A-', units: 12, max: 40, status: 'Adequado', trend: 'up' },
    { type: 'B+', units: 28, max: 60, status: 'Adequado', trend: 'up' },
    { type: 'B-', units: 8, max: 30, status: 'Atenção', trend: 'down' },
    { type: 'AB+', units: 15, max: 40, status: 'Adequado', trend: 'up' },
    { type: 'AB-', units: 2, max: 20, status: 'Crítico', trend: 'down' },
  ];

  const expiringSoon = [
    { id: '1029', type: 'A+', daysLeft: 2, quantity: 3 },
    { id: '1034', type: 'O-', daysLeft: 3, quantity: 1 },
    { id: '1041', type: 'B+', daysLeft: 5, quantity: 5 },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Crítico': return 'text-red-600 bg-red-50 border-red-200';
      case 'Atenção': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Adequado': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getProgressColor = (status) => {
    switch(status) {
      case 'Crítico': return 'bg-red-500';
      case 'Atenção': return 'bg-orange-500';
      case 'Adequado': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="h-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestão de Estoque</h2>
          <p className="text-gray-500 text-sm mt-1">Monitore níveis de sangue, validades e alertas.</p>
        </div>
        <button className="bg-brand-red text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-brand-red/20">
          <Plus size={20} />
          Solicitar Sangue Urgente
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10">
        {/* Main Inventory Grid */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Activity className="text-brand-red" size={24} />
                Níveis por Tipo Sanguíneo
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bloodInventory.map((item, idx) => (
                <div key={idx} className={`rounded-[24px] p-6 border ${getStatusColor(item.status)} transition-all hover:shadow-md cursor-pointer group`}>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl font-black">{item.type}</span>
                    {item.trend === 'up' ? 
                      <TrendingUp size={18} className="opacity-70 group-hover:scale-110 transition-transform" /> : 
                      <TrendingDown size={18} className="opacity-70 group-hover:scale-110 transition-transform" />
                    }
                  </div>
                  <div className="mb-3">
                    <span className="text-4xl font-bold">{item.units}</span>
                    <span className="text-xs font-bold opacity-70 ml-1 uppercase tracking-wider">unid.</span>
                  </div>
                  <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden mb-3">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.units / item.max) * 100}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className={`h-full rounded-full ${getProgressColor(item.status)}`}
                    />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-widest opacity-90">{item.status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Quick Stats */}
            <div className="bg-[#1e40af] text-white rounded-[32px] p-8 relative overflow-hidden flex flex-col justify-between">
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-blue-100 mb-6">Capacidade da Câmara Fria</h3>
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-6xl font-black">74%</span>
                  <span className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-2">Ocupada</span>
                </div>
                <p className="text-sm text-blue-200 leading-relaxed mt-4">
                  147 de 200 espaços totais utilizados atualmente nas geladeiras principais.
                </p>
              </div>
              {/* Background blood drop svg */}
              <div className="absolute right-[-30px] bottom-[-30px] opacity-10">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>

            {/* Input Action */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-[20px] flex items-center justify-center text-gray-400 mb-6 group-hover:bg-gray-100 transition-colors">
                <Plus size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Registrar Nova Bolsa</h3>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Adicione novas doações validadas ao inventário após o processo de triagem.
              </p>
              <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/10 active:scale-95">
                Adicionar Entrada
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Alerts */}
        <div className="space-y-8">
          {/* Expiry Alerts */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-50 rounded-[18px] flex items-center justify-center text-orange-500">
                  <AlertTriangle size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Vencimento Próximo</h3>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">Bolsas que precisam ser priorizadas nos próximos dias.</p>
            
            <div className="space-y-4">
              {expiringSoon.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 rounded-[24px] border border-orange-100 bg-orange-50/50 hover:bg-orange-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand-red font-black text-xl">
                      {item.type}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Lote #{item.id}</p>
                      <p className="text-xs text-orange-600 font-bold flex items-center gap-1 mt-1 bg-orange-100/50 inline-flex px-2 py-1 rounded-md">
                        <Clock size={12} /> {item.daysLeft} dias restantes
                      </p>
                    </div>
                  </div>
                  <div className="text-center bg-white w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-sm">
                    <span className="block text-xl font-black text-gray-800 leading-none">{item.quantity}</span>
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">QTD</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-8 w-full text-orange-600 text-sm font-bold flex items-center justify-center gap-2 hover:bg-orange-50 py-4 rounded-2xl transition-colors">
              Ver relatório completo <ChevronRight size={16} />
            </button>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-[18px] flex items-center justify-center text-blue-500">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Previsão do Dia</h3>
            </div>
            
            <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[24px] mb-6">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Agendamentos Hoje</p>
                <p className="text-4xl font-black text-gray-800">24</p>
              </div>
              <div className="w-14 h-14 bg-white rounded-[20px] flex items-center justify-center text-blue-500 shadow-sm">
                <Activity size={24} />
              </div>
            </div>
            
            <div className="space-y-5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Coletadas até agora</span>
                <span className="font-bold text-green-500 text-base bg-green-50 px-3 py-1 rounded-lg">12 bolsas</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Aguardando doadores</span>
                <span className="font-bold text-gray-800 text-base">12 pessoas</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-5 border-t border-gray-100">
                <span className="text-gray-500 font-medium">Previsão fim do dia</span>
                <span className="font-bold text-blue-600 text-base bg-blue-50 px-3 py-1 rounded-lg">+24 unidades</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalInventoryView;
