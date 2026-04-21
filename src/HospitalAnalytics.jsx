import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Droplet, Zap, Star, Download, ChevronRight, Calendar, UserCheck, Search, Bell } from 'lucide-react';

const HospitalAnalytics = () => {
  const [timeFilter, setTimeFilter] = useState('Anual');
  const [bloodTypeFilter, setBloodTypeFilter] = useState('Todos');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Generate dynamic data based on blood type filter
  const chartData = useMemo(() => {
    const baseData = [
      { month: 'JAN', base: 30 }, { month: 'FEV', base: 15 }, { month: 'MAR', base: 65 },
      { month: 'ABR', base: 40 }, { month: 'MAI', base: 35 }, { month: 'JUN', base: 85 },
      { month: 'JUL', base: 25 }, { month: 'AGO', base: 20 }, { month: 'SET', base: 50 },
      { month: 'OUT', base: 45 }, { month: 'NOV', base: 10 }, { month: 'DEZ', base: 5 }
    ];

    const multipliers = {
      'Todos': 1,
      'A+': 0.4,
      'O+': 0.5,
      'O-': 0.1,
      'AB+': 0.05
    };

    const multiplier = multipliers[bloodTypeFilter] || 0.2;

    return baseData.map(d => {
      // Add some randomness so charts look different
      const randomVariance = Math.floor(Math.random() * 10) - 5;
      let finalValue = Math.max(0, Math.round((d.base * multiplier) + (multiplier < 1 ? randomVariance : 0)));
      
      // If time filter is monthly, simulate days of the current month instead
      if (timeFilter === 'Mensal') {
         finalValue = Math.round(finalValue / 4); // Just lower numbers for 'days' illusion
      }

      return {
        month: timeFilter === 'Anual' ? d.month : `S${baseData.indexOf(d) + 1}`,
        value: finalValue,
        // Highlight logic: if value is relatively high compared to others
        highlight: finalValue > (40 * multiplier)
      };
    });
  }, [bloodTypeFilter, timeFilter]);

  // Max value for scaling the bars relative to the highest data point
  const maxValue = Math.max(...chartData.map(d => d.value), 10); // at least 10 to prevent division by zero

  // Mock data for the timeline
  const timelineData = [
    {
      id: 1,
      date: '01',
      month: "SET '23",
      hospital: 'Hemocentro Central',
      type: 'Sangue Total',
      verified: true,
      points: '+250 pts',
      impact: 'Impacto: 3 Vidas'
    },
    {
      id: 2,
      date: '14',
      month: "MAI '23",
      hospital: 'Hospital São Lucas',
      type: 'Plaquetas',
      verified: true,
      points: '+400 pts',
      impact: 'Impacto: 1 Vida'
    },
    {
      id: 3,
      date: '22',
      month: "JAN '23",
      hospital: 'Campanha Municipal',
      type: 'Sangue Total',
      verified: true,
      points: '+250 pts',
      impact: 'Impacto: 3 Vidas'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-16 bg-white font-sans text-gray-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Hero Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-xl">
            <h3 className="text-brand-red font-bold text-sm tracking-widest uppercase mb-4">VISÃO GERAL DO ESTOQUE</h3>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-2 leading-tight">
              Acompanhamento <br />
              <span className="text-brand-red">do Banco de Sangue.</span>
            </h1>
            <p className="text-gray-500 text-lg mt-6 leading-relaxed mb-8">
              A capacidade do banco de sangue está se normalizando. Atualmente, os tipos O- e AB+ requerem maior atenção para os próximos 14 dias. Mantenha as campanhas ativas.
            </p>
            <div className="flex gap-4">
              <button className="bg-brand-red text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30">
                <Calendar size={18} />
                Agendar Coletas
              </button>
              <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
                Ver Diretrizes
              </button>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full lg:w-96 shrink-0">
            <div className="flex justify-between items-start mb-2">
              <span className="text-gray-500 text-xs font-bold tracking-wider uppercase">CAPACIDADE DO ESTOQUE</span>
            </div>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-5xl font-extrabold">82%</h2>
              <Heart className="text-brand-red w-8 h-8" strokeWidth={2.5} />
            </div>
            
            <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '82%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full bg-brand-red rounded-full"
              />
            </div>
            
            <div className="flex justify-between text-xs text-gray-400 font-medium">
              <span>Atualização: Hoje</span>
              <span>Meta: 100%</span>
            </div>
          </div>
        </div>

        {/* Charts & Badges Row */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          
          {/* Chart Card */}
          <div className="flex-1 bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col">
            <div className="flex flex-wrap justify-between items-start mb-10 gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Tendência de Entradas</h3>
                <p className="text-sm text-gray-500">Bolsas recebidas ({timeFilter === 'Anual' ? 'Últimos 12 meses' : 'Últimas 12 semanas'})</p>
              </div>
              
              <div className="flex gap-2">
                <select 
                  value={bloodTypeFilter}
                  onChange={(e) => setBloodTypeFilter(e.target.value)}
                  className="bg-gray-50 border border-gray-100 text-sm font-semibold text-brand-red rounded-lg px-4 py-2 outline-none cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <option value="Todos">Todos os Tipos</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="O+">O+</option>
                  <option value="O-">O- (Crítico)</option>
                  <option value="AB+">AB+</option>
                </select>

                <select 
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="bg-gray-50 border border-gray-100 text-sm font-semibold text-gray-700 rounded-lg px-4 py-2 outline-none cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <option value="Anual">Anual</option>
                  <option value="Mensal">Mensal</option>
                </select>
              </div>
            </div>

            {/* Bar Chart Representation */}
            <div className="h-64 flex items-end justify-between gap-1 sm:gap-2 px-2 mt-auto">
              {chartData.map((data, index) => {
                const barHeightPercentage = (data.value / maxValue) * 100;
                
                return (
                  <div 
                    key={index} 
                    className="flex flex-col items-center flex-1 group relative h-full"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="relative w-full flex justify-center h-full items-end pb-2">
                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute -top-12 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex flex-col items-center whitespace-nowrap z-10 pointer-events-none"
                          >
                            <span>{data.value} bolsas</span>
                            <div className="absolute -bottom-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${barHeightPercentage}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className={`w-full max-w-[40px] rounded-t-md transition-colors cursor-pointer ${
                          data.highlight || hoveredIndex === index ? 'bg-brand-red' : 'bg-gray-200'
                        }`}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase text-center">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Metrics / Badges Card */}
          <div className="w-full lg:w-[400px] bg-[#F8F9FA] rounded-[32px] p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-8">Doadores Ativos</h3>
            
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white shrink-0 shadow-lg shadow-brand-red/30">
                <Star className="fill-white" size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">2.450</h2>
                <p className="text-sm text-gray-500 font-medium">Status Platinum (Rede de Apoio)</p>
              </div>
            </div>

            <h4 className="text-xs font-bold text-gray-500 tracking-wider uppercase mb-4">CONQUISTAS RECENTES DA COMUNIDADE</h4>
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm">
                <UserCheck size={20} />
              </div>
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-red shadow-sm">
                <Droplet size={20} />
              </div>
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-400 shadow-sm">
                <Zap size={20} />
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 font-bold text-sm shadow-sm">
                +4
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Histórico de Entradas</h2>
              <p className="text-gray-500">Histórico completo de contribuições na sua unidade</p>
            </div>
            <button className="text-brand-red font-bold text-sm hover:underline flex items-center gap-1">
              Baixar Relatório Completo <Download size={16} />
            </button>
          </div>

          <div className="space-y-4">
            {timelineData.map((item) => (
              <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex flex-col items-center justify-center w-20 shrink-0 border-r border-gray-100 pr-6">
                  <span className="text-3xl font-extrabold text-gray-900 leading-none">{item.date}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">{item.month}</span>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-brand-red transition-colors">{item.hospital}</h4>
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                    <span className="flex items-center gap-1"><Droplet size={14} /> {item.type}</span>
                    <span className="flex items-center gap-1 text-green-600"><UserCheck size={14} /> {item.verified ? 'Verificado' : 'Pendente'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-brand-red font-bold text-lg leading-tight">{item.points}</p>
                    <p className="text-xs text-gray-500">{item.impact}</p>
                  </div>
                  <ChevronRight className="text-gray-300 group-hover:text-brand-red transition-colors" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button className="bg-gray-100 text-gray-600 font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-gray-200 transition-colors">
              Carregar Mais Histórico
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HospitalAnalytics;
