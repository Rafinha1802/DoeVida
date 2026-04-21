import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Image as ImageIcon,
  MoreHorizontal,
  Activity,
  Star
} from 'lucide-react';

const DonorActivityView = () => {
  const [filter, setFilter] = useState('Todos');

  const stats = [
    { label: 'Publicações', value: 12, icon: <ImageIcon size={18} /> },
    { label: 'Comentários', value: 34, icon: <MessageCircle size={18} /> },
    { label: 'Curtidas Recebidas', value: 156, icon: <Heart size={18} /> },
  ];

  const activities = [
    {
      id: 1,
      type: 'post',
      content: 'Hoje completei minha 5ª doação de sangue no Hospital Português! A equipe foi maravilhosa e o processo super rápido. Recomendo a todos que têm dúvidas.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop',
      likes: 45,
      comments: 12,
      time: 'Há 2 dias',
    },
    {
      id: 2,
      type: 'comment',
      targetPost: 'Campanha de Doação para a Maria Eduarda',
      content: 'Estarei lá amanhã cedo para doar! Força para a família.',
      likes: 8,
      time: 'Há 5 dias',
    },
    {
      id: 3,
      type: 'post',
      content: 'Alguém sabe me informar quanto tempo preciso esperar para doar novamente depois de ter tido uma gripe leve? Quero muito ajudar na campanha de O negativo.',
      likes: 12,
      comments: 4,
      time: 'Há 1 semana',
    },
    {
      id: 4,
      type: 'comment',
      targetPost: 'Novo Hemocentro da Zona Norte',
      content: 'Ficou muito bem estruturado! Passei na frente ontem e a fachada está linda.',
      likes: 3,
      time: 'Há 2 semanas',
    }
  ];

  const filteredActivities = filter === 'Todos' 
    ? activities 
    : activities.filter(a => a.type === filter.toLowerCase() || (filter === 'Publicações' && a.type === 'post') || (filter === 'Comentários' && a.type === 'comment'));

  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-16 h-full font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Stats */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" 
                  alt="Amanda" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">Amanda Silva</h2>
                <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
                  <Activity size={16} />
                  Doadora Dourada
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl p-4 w-32">
                  <div className="text-brand-red mb-2">{stat.icon}</div>
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 border-b border-gray-200 pb-4">
          {['Todos', 'Publicações', 'Comentários'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                filter === f 
                  ? 'bg-brand-red text-white shadow-md' 
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="space-y-6 pb-20">
          {filteredActivities.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'post' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                    {item.type === 'post' ? <ImageIcon size={20} /> : <MessageCircle size={20} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {item.type === 'post' ? 'Você fez uma publicação' : 'Você comentou em uma publicação'}
                    </h3>
                    <span className="text-xs text-gray-400 font-medium">{item.time}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-brand-red">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Card Content */}
              {item.type === 'comment' && (
                <div className="mb-4 text-sm font-medium text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-200">
                  Em resposta a: <span className="text-gray-900">{item.targetPost}</span>
                </div>
              )}
              
              <p className="text-gray-700 leading-relaxed mb-6">
                {item.content}
              </p>

              {item.image && (
                <div className="rounded-[24px] overflow-hidden mb-6 max-h-[300px]">
                  <img src={item.image} alt="Post" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Card Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                <button className="flex items-center gap-2 text-brand-red font-bold hover:text-red-700 transition-colors">
                  <Heart size={20} className="fill-brand-red" />
                  <span>{item.likes}</span>
                </button>
                {item.type === 'post' && (
                  <button className="flex items-center gap-2 text-gray-500 font-bold hover:text-gray-900 transition-colors">
                    <MessageCircle size={20} />
                    <span>{item.comments}</span>
                  </button>
                )}
                <button className="flex items-center gap-2 text-gray-500 font-bold hover:text-gray-900 transition-colors ml-auto">
                  <Share2 size={20} />
                  <span>Compartilhar</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DonorActivityView;
