import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, ChevronLeft, Mail, Lock, Phone, Map, Stethoscope } from 'lucide-react';

const AnamnesisForm = ({ onComplete, onCancel }) => {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    cep: '',
    cidade: '',
    estado: '',
    peso: '',
    jaDoou: '',
    dataUltimaDoacao: '',
    doenca: '',
    medicamentos: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isComplete = () => {
    const requiredFields = ['email', 'senha', 'cep', 'cidade', 'estado', 'peso', 'jaDoou', 'doenca', 'medicamentos'];
    const hasAllRequired = requiredFields.every(key => formData[key].trim() !== '');
    if (!hasAllRequired) return false;
    
    if (formData.jaDoou === 'Sim' && formData.dataUltimaDoacao.trim() === '') return false;
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isComplete()) return;
    onComplete();
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
            <MapPin size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-white leading-tight">Quase lá!</h1>
          <p className="text-brand-red-light text-lg">
            Para finalizar seu cadastro e encontrar os hospitais mais próximos, preencha suas informações de contato, localização e responda a um breve questionário médico.
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
            <h2 className="text-2xl font-bold text-gray-800">Complete seu Perfil</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Contato e Segurança */}
              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                  <Mail size={16} className="text-brand-red" /> E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                  <Lock size={16} className="text-brand-red" /> Senha
                </label>
                <input
                  type="password"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Crie sua senha"
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                  required
                />
              </div>

              {/* Divisor - Anamnese */}
              <div className="md:col-span-2 border-t border-gray-100 my-4 pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Stethoscope size={20} className="text-brand-red" />
                  Triagem Médica
                </h3>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Peso (kg)</label>
                <input
                  type="number"
                  name="peso"
                  value={formData.peso}
                  onChange={handleChange}
                  placeholder="Ex: 65"
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Já doou sangue antes?</label>
                <select 
                  name="jaDoou"
                  value={formData.jaDoou}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all appearance-none"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>

              {formData.jaDoou === 'Sim' && (
                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Data da última doação</label>
                  <input
                    type="date"
                    name="dataUltimaDoacao"
                    value={formData.dataUltimaDoacao}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                    required
                  />
                </div>
              )}

              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Possui alguma doença?</label>
                <input
                  type="text"
                  name="doenca"
                  value={formData.doenca}
                  onChange={handleChange}
                  placeholder="Se sim, qual? Se não, digite 'Não'"
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Faz uso de medicamentos?</label>
                <input
                  type="text"
                  name="medicamentos"
                  value={formData.medicamentos}
                  onChange={handleChange}
                  placeholder="Se sim, quais? Se não, digite 'Não'"
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                  required
                />
              </div>

              {/* Divisor - Localização */}
              <div className="md:col-span-2 border-t border-gray-100 my-4 pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Map size={20} className="text-brand-red" />
                  Onde você mora?
                </h3>
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">CEP</label>
                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  placeholder="00000-000"
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Cidade</label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  placeholder="Sua cidade"
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Estado</label>
                <select 
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-gray-50 border border-gray-100 p-4 outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all appearance-none"
                  required
                >
                  <option value="">Selecione o estado</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="BA">Bahia</option>
                  <option value="PR">Paraná</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="PE">Pernambuco</option>
                  <option value="CE">Ceará</option>
                  <option value="PA">Pará</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="MA">Maranhão</option>
                  <option value="GO">Goiás</option>
                  <option value="AM">Amazonas</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="PB">Paraíba</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="AL">Alagoas</option>
                  <option value="PI">Piauí</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="SE">Sergipe</option>
                  <option value="RO">Rondônia</option>
                  <option value="TO">Tocantins</option>
                  <option value="AC">Acre</option>
                  <option value="AP">Amapá</option>
                  <option value="RR">Roraima</option>
                </select>
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
              Finalizar Cadastro
              <ArrowRight size={20} />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AnamnesisForm;
