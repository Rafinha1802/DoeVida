import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Download, Share2, Verified, Droplet, Calendar, Trophy, Star, Coffee, Zap, ShieldCheck } from 'lucide-react';

const DonorCardView = () => {
  const donorInfo = {
    name: "Amanda Oliveira",
    bloodType: "O+",
    id: "DV-2026-0854",
    since: "Maio 2023",
    lastDonation: "12 Set 2025",
    totalLivesSaved: 14,
    status: "Doador Ativo",
    level: "Doador Prata"
  };

  const benefits = [
    {
      id: 1,
      title: "Isenção em Concursos",
      description: "Você desbloqueou o direito de isenção em taxas de inscrições para concursos públicos estaduais.",
      icon: <ShieldCheck className="text-emerald-500" size={24} />,
      status: "Desbloqueado",
      color: "bg-emerald-50"
    },
    {
      id: 2,
      title: "Meia-Entrada Cultural",
      description: "Acesso a 50% de desconto em cinemas, teatros e eventos culturais parceiros.",
      icon: <Star className="text-amber-500" size={24} />,
      status: "Desbloqueado",
      color: "bg-amber-50"
    },
    {
      id: 3,
      title: "Check-up Prioritário",
      description: "Exames de sangue completos e gratuitos realizados anualmente em nossa rede.",
      icon: <Zap className="text-blue-500" size={24} />,
      status: "Desbloqueado",
      color: "bg-blue-50"
    },
    {
      id: 4,
      title: "Vantagens em Parceiros",
      description: "Descontos exclusivos em cafeterias e academias parceiras da rede DoaVida.",
      icon: <Coffee className="text-orange-500" size={24} />,
      status: "Desbloqueado",
      color: "bg-orange-50"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sua Carteira Digital</h2>
        <p className="text-gray-500">Sua identificação oficial como herói do DoaVida</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
        {/* Physical Card Mockup */}
        <motion.div 
          initial={{ opacity: 0, rotateY: -20 }}
          animate={{ opacity: 1, rotateY: 0 }}
          className="relative w-[400px] h-[250px] group perspective-1000"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-red to-red-900 rounded-[24px] shadow-2xl p-6 text-white overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
            {/* Glossy Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            
            {/* Card Content */}
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <Droplet className="fill-white" size={20} />
                  </div>
                  <span className="font-bold tracking-tight">DoaVida</span>
                </div>
                <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full backdrop-blur-md border border-white/20">
                  <Verified size={12} className="text-white" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Verificado</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Doador de Sangue</p>
                <h3 className="text-2xl font-bold tracking-tight">{donorInfo.name}</h3>
                <p className="text-xs opacity-80 mt-1">ID: {donorInfo.id}</p>
              </div>

              <div className="flex justify-between items-end mt-auto">
                <div className="flex gap-6">
                  <div>
                    <p className="text-[8px] uppercase tracking-widest opacity-60 mb-1">Tipo</p>
                    <p className="text-2xl font-black">{donorInfo.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-widest opacity-60 mb-1">Membro Desde</p>
                    <p className="text-sm font-bold">{donorInfo.since}</p>
                  </div>
                </div>
                <div className="bg-white p-1.5 rounded-lg">
                  <QrCode size={40} className="text-brand-red" />
                </div>
              </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12">
              <Droplet size={200} />
            </div>
          </div>
        </motion.div>

        {/* Info & Actions */}
        <div className="flex-1 w-full max-w-md space-y-6">
          <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-brand-red-light rounded-xl flex items-center justify-center text-brand-red">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Última Doação</p>
                <p className="text-lg font-bold text-gray-800">{donorInfo.lastDonation}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <Droplet size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Vidas Salvas</p>
                <p className="text-lg font-bold text-gray-800">{donorInfo.totalLivesSaved} Vidas</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 bg-brand-red text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-brand-red/20">
                <Download size={20} />
                Baixar
              </button>
              <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all active:scale-95">
                <Share2 size={20} />
                Compartilhar
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 leading-relaxed px-6">
            Esta carteirinha digital é válida em todos os hemocentros parceiros da rede DoaVida. Apresente o QR Code no momento do atendimento.
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-amber-50 rounded-xl">
            <Trophy className="text-amber-500" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Benefícios Desbloqueados</h3>
            <p className="text-sm text-gray-500">Pelo seu impacto de {donorInfo.totalLivesSaved} vidas salvas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm flex gap-5 items-start transition-all hover:shadow-md"
            >
              <div className={`w-14 h-14 ${benefit.color} rounded-2xl flex items-center justify-center shrink-0`}>
                {benefit.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {benefit.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 p-8 bg-brand-red/5 rounded-[32px] border border-brand-red/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-red/20">
              <Trophy size={32} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">Próximo Nível: Doador Ouro</h4>
              <p className="text-sm text-gray-500">Faltam apenas 2 doações para desbloquear Check-up Premium.</p>
            </div>
          </div>
          <div className="w-full md:w-48">
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-gray-400">Progresso</span>
              <span className="text-brand-red">80%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-brand-red w-[80%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorCardView;
