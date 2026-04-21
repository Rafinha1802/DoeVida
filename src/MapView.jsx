import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  Clock, 
  TrendingUp, 
  User, 
  Send,
  Bell,
  Search,
  Maximize2,
  Filter,
  ChevronRight
} from 'lucide-react';

const MapView = ({ userType, onBack }) => {
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [isLaunching, setIsLaunching] = useState(false);

  const donors = [
    { id: 1, name: 'Marcus T.', blood: 'O+', dist: '1.2 km', pos: { top: '30%', left: '40%' } },
    { id: 2, name: 'Sarah L.', blood: 'A-', dist: '2.5 km', pos: { top: '60%', left: '20%' } },
    { id: 3, name: 'Ricardo G.', blood: 'O+', dist: '0.8 km', pos: { top: '75%', left: '30%' } },
  ];

  const hospitals = [
    { id: 1, name: 'Hospital Português', dist: '1.2 km', pos: { top: '35%', left: '45%' }, time: '12 min', status: 'Necessidade Urgente' },
    { id: 2, name: 'Cruz Vermelha', dist: '3.5 km', pos: { top: '75%', left: '25%' }, time: '25 min', status: 'Estoque Moderado' },
    { id: 3, name: 'Hospital Unimed', dist: '4.8 km', pos: { top: '25%', left: '15%' }, time: '35 min', status: 'Necessidade Crítica' },
  ];

  const handleLaunch = () => {
    setIsLaunching(true);
    setTimeout(() => setIsLaunching(false), 3000);
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden relative font-sans">
      {/* Barra de Topo */}
      <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between pointer-events-none">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="pointer-events-auto flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-xl font-bold text-gray-800 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={20} className="text-brand-red" />
          Voltar ao Painel
        </motion.button>

        <div className="pointer-events-auto flex gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar local..." 
              className="bg-white rounded-2xl py-3 pl-12 pr-6 outline-none w-80 shadow-xl focus:ring-2 focus:ring-brand-red/20 transition-all"
            />
          </div>
          <button className="bg-white p-3 rounded-2xl shadow-xl text-gray-400 hover:text-brand-red transition-colors">
            <Maximize2 size={22} />
          </button>
        </div>
      </div>

      {/* Mapa (Simulado com Imagem e Overlays) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/map.png" 
          className="w-full h-full object-cover opacity-80"
          alt="Map"
        />
        <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
        
        {/* Marcadores do Mapa */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className={`bg-brand-red p-3 rounded-2xl shadow-2xl text-white ${userType === 'doador' ? 'bg-blue-600' : ''}`}>
              {userType === 'hospital' ? <MapPin size={32} fill="currentColor" /> : <User size={32} fill="currentColor" />}
            </div>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-xl whitespace-nowrap">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                {userType === 'hospital' ? 'Seu Hospital' : 'Sua Localização'}
              </p>
              <p className="text-xs font-bold text-gray-800">
                {userType === 'hospital' ? 'DoaVida Central' : 'Você'}
              </p>
            </div>
          </div>
        </div>

        {userType === 'hospital' && donors.map(donor => (
          <motion.div 
            key={donor.id}
            initial={{ scale: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, x: "-50%", y: "-50%" }}
            className="absolute z-20 cursor-pointer"
            style={{ top: donor.pos.top, left: donor.pos.left }}
            onClick={() => setSelectedDonor(donor)}
          >
            <div className="relative group">
              <div className="bg-blue-600 p-2 rounded-full border-4 border-white shadow-lg transition-transform group-hover:scale-110">
                <User size={20} className="text-white" />
              </div>
              <AnimatePresence>
                {selectedDonor?.id === donor.id && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white p-4 rounded-2xl shadow-2xl min-w-[150px]"
                  >
                    <p className="font-bold text-gray-800">{donor.name}</p>
                    <p className="text-[10px] text-blue-600 font-bold">{donor.blood}</p>
                    <p className="text-[10px] text-gray-400">{donor.dist}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        {userType === 'doador' && hospitals.map(hospital => (
          <motion.div 
            key={hospital.id}
            initial={{ scale: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, x: "-50%", y: "-50%" }}
            className="absolute z-20 cursor-pointer"
            style={{ top: hospital.pos.top, left: hospital.pos.left }}
            onClick={() => setSelectedHospital(hospital)}
          >
            <div className="relative group">
              <div className={`p-2 rounded-full border-4 border-white shadow-lg transition-transform group-hover:scale-110 ${selectedHospital?.id === hospital.id ? 'bg-brand-red scale-110' : 'bg-red-400'}`}>
                <MapPin size={20} className="text-white" />
              </div>
              <AnimatePresence>
                {selectedHospital?.id === hospital.id && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-white p-4 rounded-2xl shadow-2xl min-w-[150px]"
                  >
                    <p className="font-bold text-gray-800">{hospital.name}</p>
                    <p className="text-[10px] text-brand-red font-bold">{hospital.status}</p>
                    <p className="text-[10px] text-gray-400">{hospital.dist}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        {(selectedHospital || selectedDonor) && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <motion.line
              key={selectedHospital?.id || selectedDonor?.id}
              x1="50%"
              y1="50%"
              x2={(selectedHospital || selectedDonor).pos.left}
              y2={(selectedHospital || selectedDonor).pos.top}
              stroke="#B21E24"
              strokeWidth="4"
              strokeDasharray="8 8"
              initial={{ pathLength: 0, strokeDashoffset: 0 }}
              animate={{ pathLength: 1, strokeDashoffset: -50 }}
              transition={{ 
                pathLength: { duration: 1.5, ease: "easeInOut" },
                strokeDashoffset: { repeat: Infinity, duration: 1, ease: "linear" }
              }}
            />
          </svg>
        )}
      </div>

      {/* Painel Lateral de Informações */}
      <AnimatePresence>
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="absolute right-0 top-0 bottom-0 w-[450px] bg-white shadow-2xl z-[60] p-10 flex flex-col"
        >
          {userType === 'doador' ? (
            <div className="flex-1 flex flex-col">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Hospitais Próximos</h2>
                <p className="text-gray-400">Selecione um hospital para ver a rota.</p>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                {hospitals.map(hospital => (
                  <motion.div 
                    key={hospital.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedHospital(hospital)}
                    className={`p-6 rounded-[28px] border-2 transition-all cursor-pointer flex items-center gap-4 ${
                      selectedHospital?.id === hospital.id 
                        ? 'border-brand-red bg-brand-red-light/30 shadow-lg' 
                        : 'border-gray-50 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${selectedHospital?.id === hospital.id ? 'bg-brand-red text-white' : 'bg-white text-gray-400'}`}>
                      <MapPin size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">{hospital.name}</p>
                      <p className="text-xs text-gray-400">{hospital.dist} ÔÇó {hospital.time}</p>
                      <p className="text-[10px] text-brand-red font-bold mt-1">{hospital.status}</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-300" />
                  </motion.div>
                ))}
              </div>

              <AnimatePresence>
                {selectedHospital && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <button className="mt-6 bg-brand-red text-white w-full py-5 rounded-[24px] font-bold text-xl hover:bg-red-700 transition-all shadow-xl shadow-brand-red/20 active:scale-95 flex items-center justify-center gap-3">
                      <Navigation size={24} />
                      Iniciar Navegação
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Doadores Próximos</h2>
                <p className="text-gray-400">Visualize e solicite doações dos heróis mais próximos.</p>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                {donors.map(donor => (
                  <motion.div 
                    key={donor.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedDonor(donor)}
                    className={`p-6 rounded-[28px] border-2 transition-all cursor-pointer flex items-center gap-4 ${
                      selectedDonor?.id === donor.id 
                        ? 'border-brand-red bg-brand-red-light/30 shadow-lg' 
                        : 'border-gray-50 bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                      <User size={24} className={selectedDonor?.id === donor.id ? 'text-brand-red' : 'text-gray-400'} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">{donor.name}</p>
                      <p className="text-xs text-gray-400">{donor.dist} ÔÇó {donor.blood}</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-300" />
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 space-y-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Ação do Hospital</p>
                <button 
                  onClick={handleLaunch}
                  disabled={isLaunching}
                  className="w-full bg-brand-red text-white py-5 rounded-[24px] font-bold text-xl hover:bg-red-700 transition-all shadow-xl shadow-brand-red/20 active:scale-95 flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:shadow-none"
                >
                  {isLaunching ? (
                    <>
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Send size={24} />
                      </motion.div>
                      Lançando Localização...
                    </>
                  ) : (
                    <>
                      <Send size={24} />
                      Lançar Localização
                    </>
                  )}
                </button>
                <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                  Ao lançar a localização, todos os doadores selecionados receberão um alerta de urgência com a rota para este hospital.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Notificação de Sucesso */}
      <AnimatePresence>
        {isLaunching && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute bottom-10 left-10 bg-green-500 text-white px-8 py-5 rounded-[24px] shadow-2xl z-[70] flex items-center gap-4"
          >
            <div className="bg-white/20 p-2 rounded-xl">
              <Bell size={24} />
            </div>
            <div>
              <p className="font-bold text-lg">Localização Lançada!</p>
              <p className="text-sm opacity-90">Alertas enviados com sucesso para os doadores.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapView;
