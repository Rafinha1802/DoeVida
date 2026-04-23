import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, ArrowRight, ChevronLeft, Building, Activity, FileText } from 'lucide-react';

const PatientAnamnesisForm = ({ onComplete, onCancel }) => {
  const [formData, setFormData] = useState({
    nomeResponsavel: '',
    parentesco: '',
    hospital: '',
    prontuario: '',
    motivo: '',
    tipoDoacao: '',
    quantidade: '',
    urgencia: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isComplete = () => {
    const requiredFields = [
      'nomeResponsavel', 'parentesco', 
      'hospital', 'motivo', 'tipoDoacao', 'quantidade', 'urgencia'
    ];
    // Prontuário is optional
    return requiredFields.every(key => formData[key].trim() !== '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isComplete()) return;
    
    // Pass the urgency level to the parent so the dashboard knows what to render
    onComplete(formData.urgencia);
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row font-sans bg-gray-50">
      {/* Lado Esquerdo - Info */}
      <div className="relative w-full lg:w-1/3 bg-brand-red p-10 flex flex-col justify-between overflow-hidden">
        <div className="relative z-10 flex flex-col gap-6">
          <button 
            onClick={onCancel}
            className="flex items-center gap-2 text-white/80 hover:text-white font-medium mb-10 transition-colors self-start"
          >
            <ChevronLeft size={20} />
            Voltar ao Cadastro
          </button>
          
          <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-4">
            <Activity size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-white leading-tight">Solicitação de Sangue</h1>
          <p className="text-brand-red-light text-lg">
            Complete estas informações para que os hospitais e doadores possam priorizar e atender a sua necessidade o mais rápido possível.
          </p>
        </div>
        
        <div className="absolute -bottom-20 -right-20 opacity-10">
          <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="w-full lg:w-2/3 p-8 lg:p-16 flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-xl p-10 border border-gray-100 relative">
          
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
            <h2 className="text-2xl font-bold text-gray-800">Detalhes da Necessidade</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Responsável */}
              <div className="md:col-span-2 border-b border-gray-100 pb-4 mb-2">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <User size={20} className="text-brand-red" />
                  Responsável pelo Paciente
                </h3>
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Nome do Responsável</label>
                <input
                  type="text"
                  name="nomeResponsavel"
                  value={formData.nomeResponsavel}
                  onChange={handleChange}
                  placeholder="Nome de quem está acompanhando"
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Grau de Parentesco</label>
                <select 
                  name="parentesco"
                  value={formData.parentesco}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all appearance-none"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Pai/Mãe">Pai / Mãe</option>
                  <option value="Filho(a)">Filho(a)</option>
                  <option value="Cônjuge">Cônjuge</option>
                  <option value="Irmão/Irmã">Irmão / Irmã</option>
                  <option value="Outro">Outro familiar / Amigo</option>
                  <option value="O Próprio">O Próprio Paciente</option>
                </select>
              </div>

              {/* Hospital */}
              <div className="md:col-span-2 border-b border-gray-100 pb-4 mt-6 mb-2">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Building size={20} className="text-brand-red" />
                  Localização Hospitalar
                </h3>
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Hospital onde está internado</label>
                <input
                  type="text"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  placeholder="Ex: Hospital Santa Casa"
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide flex justify-between">
                  <span>Número do Prontuário</span>
                  <span className="text-gray-400 font-normal normal-case">(Opcional)</span>
                </label>
                <input
                  type="text"
                  name="prontuario"
                  value={formData.prontuario}
                  onChange={handleChange}
                  placeholder="Apenas se aplicável"
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                />
              </div>

              {/* Informações Médicas */}
              <div className="md:col-span-2 border-b border-gray-100 pb-4 mt-6 mb-2">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <FileText size={20} className="text-brand-red" />
                  Informações Médicas
                </h3>
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Motivo da necessidade</label>
                <input
                  type="text"
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  placeholder="Ex: Cirurgia, Tratamento oncológico, Acidente..."
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Tipo de doação</label>
                <select 
                  name="tipoDoacao"
                  value={formData.tipoDoacao}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all appearance-none"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Sangue Total">Sangue Total</option>
                  <option value="Plaquetas">Plaquetas</option>
                  <option value="Plasma">Plasma</option>
                  <option value="Medula Óssea">Medula Óssea</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Qtd. de Bolsas</label>
                <input
                  type="number"
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={handleChange}
                  placeholder="Ex: 3"
                  min="1"
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Nível de Urgência</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, urgencia: 'Emergência'})}
                    className={`flex-1 py-4 rounded-xl font-bold border-2 transition-all ${
                      formData.urgencia === 'Emergência' 
                        ? 'border-red-500 bg-red-50 text-red-700' 
                        : 'border-gray-100 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    Emergência
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, urgencia: 'Urgente'})}
                    className={`flex-1 py-4 rounded-xl font-bold border-2 transition-all ${
                      formData.urgencia === 'Urgente' 
                        ? 'border-orange-500 bg-orange-50 text-orange-700' 
                        : 'border-gray-100 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    Urgente
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, urgencia: 'Programada'})}
                    className={`flex-1 py-4 rounded-xl font-bold border-2 transition-all ${
                      formData.urgencia === 'Programada' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-100 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    Programada
                  </button>
                </div>
              </div>

            </div>

            <button
              type="submit"
              disabled={!isComplete()}
              className={`w-full mt-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
                isComplete() 
                  ? 'bg-brand-red text-white hover:bg-red-700 shadow-brand-red/30 cursor-pointer' 
                  : 'bg-gray-200 text-gray-400 shadow-none cursor-not-allowed'
              }`}
            >
              Finalizar Solicitação
              <ArrowRight size={20} />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default PatientAnamnesisForm;
