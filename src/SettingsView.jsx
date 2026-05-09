import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Pencil, ShieldCheck, Mail, AlertCircle, Save, Megaphone, Info, CheckCircle2, X } from 'lucide-react';

const SettingsView = ({ userType, onBack }) => {
  const isHospital = userType === 'hospital';
  const isPatient = userType === 'paciente';

  // State for form data
  const [formData, setFormData] = useState({
    name: isHospital ? 'Hospital São Lucas' : isPatient ? 'Ricardo Santos' : 'Amanda Oliveira',
    email: isHospital ? 'contato@saolucas.com' : isPatient ? 'ricardo.santos@email.com' : 'amanda.oliveira@email.com',
    bio: isHospital 
      ? 'Hospital de referência na região metropolitana, contando com um banco de sangue ativo 24 horas por dia.' 
      : isPatient 
      ? 'Aguardando doadores compatíveis para procedimento cirúrgico. Agradeço imensamente a todos os heróis!'
      : 'Doadora ativa e apaixonada por ajudar o próximo. Já salvei 14 vidas!',
    extra: isHospital ? '12.345.678/0001-99' : isPatient ? 'O-' : 'Ela / Dela',
    // Patient Campaign Fields
    bloodType: 'O-',
    urgency: 'Urgente',
    hospital: 'Hospital Português',
    isCampaignActive: false
  });

  const [showConsentModal, setShowConsentModal] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleToggleCampaign = () => {
    if (!formData.isCampaignActive) {
      setShowConsentModal(true);
    } else {
      setFormData(prev => ({ ...prev, isCampaignActive: false }));
    }
  };

  const confirmPublication = () => {
    if (hasConsented) {
      setFormData(prev => ({ ...prev, isCampaignActive: true }));
      setShowConsentModal(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 p-10 lg:p-16 bg-[#F8F9FA] font-sans text-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Configurações de Perfil</h1>
            <p className="text-gray-500">Gerencie sua identidade visual e informações na rede DoaVida.</p>
          </div>
          <button className="bg-brand-red text-white px-8 py-4 rounded-[20px] font-bold flex items-center gap-2 hover:bg-red-700 transition-all shadow-xl shadow-brand-red/20 active:scale-95">
            <Save size={20} />
            Salvar Alterações
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Side - Profile Picture & Summary */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="relative group mb-6">
                <div className="w-48 h-48 rounded-[48px] overflow-hidden border-4 border-white shadow-2xl bg-gray-100 relative z-10">
                  <img 
                    src={isHospital ? "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=500&auto=format&fit=crop" : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&auto=format&fit=crop"} 
                    alt="Profile" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[48px] backdrop-blur-sm cursor-pointer">
                    <Camera className="text-white w-10 h-10" />
                  </div>
                </div>
                {/* Decoration */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-red rounded-2xl flex items-center justify-center text-white shadow-lg z-20">
                  <Pencil size={20} />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900">{formData.name}</h3>
              <p className="text-gray-400 text-sm mb-6">
                {isHospital ? 'Instituição Verificada' : isPatient ? 'Paciente Prioritário' : 'Doadora Prata'}
              </p>
              
              {!isHospital && (
                <div className="w-full pt-6 border-t border-gray-50 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tipo</p>
                    <p className="text-xl font-bold text-brand-red">{isPatient ? 'O-' : 'O+'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      {isPatient ? 'Status' : 'Vidas'}
                    </p>
                    <p className="text-xl font-bold text-brand-red">{isPatient ? 'Urgente' : '14'}</p>
                  </div>
                </div>
              )}

              {isHospital && (
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl flex items-start gap-3 border border-emerald-100 w-full text-left mt-4">
                  <ShieldCheck size={20} className="shrink-0 mt-0.5" />
                  <p className="text-xs font-medium leading-relaxed">
                    Sua conta está verificada e pronta para postar urgências.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-brand-red" />
                Segurança
              </h4>
              <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600">Alterar Senha</button>
              <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-600">Autenticação em 2 Etapas</button>
              <button className="w-full text-left p-3 rounded-xl hover:bg-red-50 transition-colors text-sm font-medium text-red-500 mt-2">Excluir Conta</button>
            </div>
          </div>
          
          {/* Right Side - Form Sections */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-50">Informações Básicas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Field */}
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    {isHospital ? 'Nome do Hospital' : 'Nome Completo'}
                  </label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:bg-white transition-all font-bold"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    {isHospital ? 'E-mail Institucional' : 'E-mail Público'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:bg-white transition-all font-bold"
                    />
                  </div>
                </div>

                {/* Extra Field (Pronouns / CNPJ / Blood Type) */}
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    {isHospital ? 'CNPJ' : isPatient ? 'Tipo Sanguíneo' : 'Pronomes'}
                  </label>
                  {isHospital || isPatient ? (
                    <input 
                      type="text"
                      name="extra"
                      value={formData.extra}
                      onChange={handleChange}
                      readOnly={isPatient}
                      className={`w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:bg-white transition-all font-bold ${isPatient ? 'cursor-not-allowed opacity-70' : ''}`}
                    />
                  ) : (
                    <div className="relative">
                      <select 
                        name="extra"
                        value={formData.extra}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:bg-white transition-all font-bold appearance-none cursor-pointer"
                      >
                        <option value="Ela / Dela">Ela / Dela</option>
                        <option value="Ele / Dele">Ele / Dele</option>
                        <option value="Elu / Delu">Elu / Delu</option>
                        <option value="Não especificar">Não especificar</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <Pencil size={16} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bio Field */}
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                    {isHospital ? 'Sobre o Hospital' : 'Sua Biografia'}
                  </label>
                  <textarea 
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:bg-white transition-all font-medium resize-none"
                  />
                  <p className="text-xs text-gray-400 italic">
                    Conte um pouco sobre sua jornada como doador ou a missão de sua instituição.
                  </p>
                </div>
              </div>
            </div>

            {isPatient && (
              <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-red-light rounded-xl flex items-center justify-center text-brand-red">
                      <Megaphone size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Minha Campanha</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${formData.isCampaignActive ? 'text-emerald-500' : 'text-gray-400'}`}>
                      {formData.isCampaignActive ? 'Ativa' : 'Inativa'}
                    </span>
                    <button 
                      onClick={handleToggleCampaign}
                      className={`w-12 h-6 rounded-full transition-colors relative ${formData.isCampaignActive ? 'bg-emerald-500' : 'bg-gray-200'}`}
                    >
                      <motion.div 
                        animate={{ x: formData.isCampaignActive ? 26 : 2 }}
                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                      />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Tipo Sanguíneo</label>
                    <select 
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:bg-white transition-all font-bold appearance-none cursor-pointer"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Nível de Urgência</label>
                    <select 
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:bg-white transition-all font-bold appearance-none cursor-pointer"
                    >
                      <option value="Estável">Estável</option>
                      <option value="Urgente">Urgente</option>
                      <option value="Emergência">Emergência</option>
                    </select>
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Hospital de Internação</label>
                    <input 
                      type="text"
                      name="hospital"
                      value={formData.hospital}
                      onChange={handleChange}
                      placeholder="Ex: Hospital Central"
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:bg-white transition-all font-bold"
                    />
                  </div>
                </div>

                {formData.isCampaignActive && (
                  <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-emerald-700 font-medium">
                      Sua campanha está visível para doadores compatíveis na rede DoaVida.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          
        </div>
      </div>

      {/* Consent Modal */}
      <AnimatePresence>
        {showConsentModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[40px] p-10 max-w-xl w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setShowConsentModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors bg-gray-100 rounded-full p-2"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <Info size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Termos de Privacidade</h2>
                  <p className="text-sm text-gray-400">Proteção de Dados (LGPD)</p>
                </div>
              </div>

              <div className="space-y-4 mb-8 text-gray-600 leading-relaxed">
                <p>Ao ativar sua campanha, você concorda em tornar público para a rede de doadores do <strong>DoaVida</strong>:</p>
                <ul className="list-disc pl-5 space-y-2 text-sm font-medium">
                  <li>Seu nome completo e foto de perfil;</li>
                  <li>Seu tipo sanguíneo e nível de urgência;</li>
                  <li>O hospital onde você se encontra internado.</li>
                </ul>
                <p className="text-sm italic bg-gray-50 p-4 rounded-xl border border-gray-100">
                  Estes dados são essenciais para que doadores compatíveis possam encontrá-lo e realizar a doação. Você pode desativar a campanha a qualquer momento.
                </p>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="peer hidden" 
                      checked={hasConsented}
                      onChange={(e) => setHasConsented(e.target.checked)}
                    />
                    <div className="w-6 h-6 border-2 border-gray-200 rounded-md peer-checked:bg-brand-red peer-checked:border-brand-red transition-all flex items-center justify-center">
                      <CheckCircle2 size={16} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 transition-colors">
                    Eu li e concordo em divulgar minhas informações para a rede de doadores.
                  </span>
                </label>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={confirmPublication}
                    disabled={!hasConsented}
                    className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${hasConsented ? 'bg-brand-red text-white hover:bg-red-700 shadow-brand-red/20' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  >
                    Publicar Campanha
                  </button>
                  <button 
                    onClick={() => setShowConsentModal(false)}
                    className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SettingsView;
