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
    <div className="flex flex-col h-full w-full bg-[#F8F9FA] font-sans">
      {/* Cabeçalho de Curiosidades */}
      <div className="bg-brand-red px-10 py-8 lg:px-16 lg:py-10 text-white relative overflow-hidden shadow-md">
        <div className="absolute -top-10 right-0 opacity-10">
          <svg width="250" height="250" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-[1600px] mx-auto w-full flex flex-col items-start">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white font-medium mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar ao Painel
          </button>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <Lightbulb size={24} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Curiosidades do Sangue</h1>
          </div>
          <p className="text-brand-red-light max-w-2xl text-base">
            Descubra fatos fascinantes sobre doação de sangue e entenda como um pequeno gesto pode fazer uma enorme diferença.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 lg:p-16 pb-20">
        <div className="max-w-4xl mx-auto w-full">
          
          {/* Seção de Adição (Apenas Hospital) */}
          {userType === 'hospital' && (
            <div className="mb-10">
              {!isAdding ? (
                <button 
                  onClick={() => setIsAdding(true)}
                  className="w-full bg-white border-2 border-dashed border-gray-300 rounded-[24px] p-6 text-gray-500 font-bold hover:border-brand-red hover:text-brand-red hover:bg-brand-red-light/10 transition-all flex flex-col items-center justify-center gap-2"
                >
                  <Plus size={32} />
                  <span>Adicionar Nova Curiosidade</span>
                </button>
              ) : (
                <motion.form 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleAddSubmit}
                  className="bg-white rounded-[24px] p-8 shadow-lg border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Lightbulb size={24} className="text-brand-red" />
                    Nova Curiosidade
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Pergunta</label>
                      <input 
                        type="text" 
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder="Ex: Pode doar sangue menstruada?"
                        className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Resposta</label>
                      <textarea 
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                        placeholder="A resposta detalhada para a curiosidade..."
                        rows={4}
                        className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all resize-none"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="px-6 py-3 rounded-xl font-bold bg-brand-red text-white hover:bg-red-700 transition-colors shadow-lg shadow-brand-red/20"
                    >
                      Salvar Curiosidade
                    </button>
                  </div>
                </motion.form>
              )}
            </div>
          )}

          {/* Lista de Curiosidades */}
          <div className="space-y-4">
            {curiosities.map((item) => (
              <motion.div 
                key={item.id}
                layout
                className={`bg-white rounded-[24px] border border-gray-100 overflow-hidden transition-all ${
                  openId === item.id ? 'shadow-xl ring-2 ring-brand-red/20' : 'shadow-sm hover:shadow-md'
                }`}
              >
                <button 
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-6 flex items-center justify-between text-left gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl transition-colors ${
                      openId === item.id ? 'bg-brand-red text-white' : 'bg-gray-50 text-brand-red'
                    }`}>
                      {item.icon}
                    </div>
                    <span className={`text-lg font-bold transition-colors ${
                      openId === item.id ? 'text-brand-red' : 'text-gray-800'
                    }`}>
                      {item.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={24} className={openId === item.id ? 'text-brand-red' : 'text-gray-400'} />
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
                      <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 mt-2">
                        {item.answer}
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
