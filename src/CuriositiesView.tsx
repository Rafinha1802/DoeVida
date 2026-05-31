import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Lightbulb, 
  Plus, 
  ChevronDown, 
  Droplet,
  Heart,
  Activity,
  User,
  ShieldCheck
} from 'lucide-react';

const initialCuriosities = [
  {
    id: 1,
    question: 'Quem pode doar sangue?',
    answer: 'Para doar sangue, é necessário ter entre 16 e 69 anos, pesar mais de 50 kg, estar bem alimentado e com a saúde em dia. Menores de 18 anos precisam do consentimento dos responsáveis.',
    icon: <User size={24} />
  },
  {
    id: 2,
    question: 'Quanto sangue é retirado na doação?',
    answer: 'Uma doação padrão retira aproximadamente 450ml de sangue. Isso equivale a menos de 10% do total de sangue do seu corpo e é reposto em poucos dias.',
    icon: <Droplet size={24} />
  },
  {
    id: 3,
    question: 'Com que frequência posso doar?',
    answer: 'Homens podem doar a cada 2 meses, com um máximo de 4 doações por ano. Mulheres podem doar a cada 3 meses, com um máximo de 3 doações anuais, devido à perda de ferro na menstruação.',
    icon: <Activity size={24} />
  },
  {
    id: 4,
    question: 'A doação de sangue dói?',
    answer: 'Você sentirá apenas uma picada leve no momento em que a agulha é inserida, semelhante a tirar sangue para exames. O processo de doação em si é indolor e costuma durar cerca de 10 a 15 minutos.',
    icon: <Heart size={24} />
  },
  {
    id: 5,
    question: 'Por que existe uma triagem antes da doação?',
    answer: 'Para garantir a segurança tanto do doador quanto do receptor, precisamos fazer algumas perguntas rápidas sobre sua saúde e histórico recente, como tatuagens, viagens e sintomas de doenças.',
    icon: <ShieldCheck size={24} />
  }
];

const CuriositiesView = ({ userType, onBack }) => {
  const [curiosities, setCuriosities] = useState(initialCuriosities);
  const [openId, setOpenId] = useState(null);
  
  // States for Hospital to add a new curiosity
  const [isAdding, setIsAdding] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const newCuriosity = {
      id: Date.now(),
      question: newQuestion,
      answer: newAnswer,
      icon: <Lightbulb size={24} />
    };

    setCuriosities([newCuriosity, ...curiosities]);
    setNewQuestion('');
    setNewAnswer('');
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#F8F9FA] font-sans overflow-y-auto">
      {/* Cabeçalho de Curiosidades */}
      <div className="bg-white px-10 py-12 lg:px-16 lg:py-16 text-gray-900 relative overflow-hidden shrink-0">
        <div className="absolute top-0 right-0 opacity-[0.03] text-brand-red">
          <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-[1600px] mx-auto w-full flex flex-col items-start">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-brand-red font-bold text-sm uppercase tracking-widest mb-8 transition-colors group"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Voltar ao Painel
          </button>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="bg-brand-red text-white p-4 rounded-[24px] shadow-xl shadow-brand-red/20">
              <Lightbulb size={32} />
            </div>
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">Curiosidades</h1>
              <p className="text-gray-400 text-lg mt-1 font-medium">Fatos que salvam vidas e transformam o mundo.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-10 lg:p-16 pt-0 pb-20">
        <div className="max-w-4xl mx-auto w-full">
          
          {/* Seção de Adição (Apenas Hospital) */}
          {userType === 'hospital' && (
            <div className="mb-12">
              {!isAdding ? (
                <button 
                  onClick={() => setIsAdding(true)}
                  className="w-full bg-white border-2 border-dashed border-gray-200 rounded-[32px] p-10 text-gray-400 font-bold hover:border-brand-red hover:text-brand-red hover:bg-brand-red-light/10 transition-all flex flex-col items-center justify-center gap-4 group"
                >
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-brand-red-light transition-colors">
                    <Plus size={32} />
                  </div>
                  <span className="text-lg">Adicionar Nova Curiosidade</span>
                </button>
              ) : (
                <motion.form 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onSubmit={handleAddSubmit}
                  className="bg-white rounded-[40px] p-10 shadow-xl border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-brand-red-light/30 rounded-2xl flex items-center justify-center text-brand-red">
                      <Lightbulb size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Nova Curiosidade</h3>
                      <p className="text-sm text-gray-400 font-medium">Compartilhe conhecimento com a rede.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Pergunta Impactante</label>
                      <input 
                        type="text" 
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Ex: Pode doar sangue menstruada?"
                        className="w-full rounded-2xl bg-gray-50 border border-gray-100 p-5 outline-none ring-brand-red/20 focus:ring-4 focus:bg-white transition-all font-bold text-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3">Resposta Detalhada</label>
                      <textarea 
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                        placeholder="A resposta detalhada para a curiosidade..."
                        rows={4}
                        className="w-full rounded-2xl bg-gray-50 border border-gray-100 p-5 outline-none ring-brand-red/20 focus:ring-4 focus:bg-white transition-all resize-none font-medium text-gray-700"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end gap-4">
                    <button 
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-8 py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="px-8 py-4 rounded-xl font-bold bg-brand-red text-white hover:bg-red-700 transition-all shadow-xl shadow-brand-red/20 active:scale-95"
                    >
                      Salvar Curiosidade
                    </button>
                  </div>
                </motion.form>
              )}
            </div>
          )}

          {/* Lista de Curiosidades */}
          <div className="space-y-6">
            {curiosities.map((item) => (
              <motion.div 
                key={item.id}
                layout
                className={`bg-white rounded-[32px] border border-gray-100 overflow-hidden transition-all ${
                  openId === item.id ? 'shadow-2xl ring-1 ring-brand-red/10' : 'shadow-sm hover:shadow-md'
                }`}
              >
                <button 
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-8 flex items-center justify-between text-left gap-6"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                      openId === item.id ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30' : 'bg-gray-50 text-brand-red'
                    }`}>
                      {item.icon}
                    </div>
                    <span className={`text-xl font-bold transition-colors ${
                      openId === item.id ? 'text-brand-red' : 'text-gray-800'
                    }`}>
                      {item.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-2 rounded-full ${openId === item.id ? 'bg-brand-red-light/50 text-brand-red' : 'text-gray-300'}`}
                  >
                    <ChevronDown size={24} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-8 pt-0 text-gray-500 text-lg leading-relaxed border-t border-gray-50 mt-4">
                        <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                          {item.answer}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuriositiesView;