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
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-400 group-hover:text-gray-800 transition-colors">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

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
                </div>
              </div>
            ))}
          </div>
          
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
    </div>
  );
};

export default HospitalAnalytics;