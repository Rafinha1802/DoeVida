import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Pencil, ShieldCheck, Mail, AlertCircle, Save } from 'lucide-react';

const SettingsView = ({ userType, onBack }) => {
  // State for form data
  const [formData, setFormData] = useState({
    name: userType === 'hospital' ? 'Hospital São Lucas' : 'Amanda Silva',
    email: userType === 'hospital' ? 'contato@saolucas.com' : 'amanda.silva@email.com',
    bio: userType === 'hospital' 
      ? 'Hospital de referência na região metropolitana, contando com um banco de sangue ativo 24 horas por dia.' 
      : 'Estudante com paixão por ajudar o próximo e fazer a diferença através da doação de sangue.',
    extra: userType === 'hospital' ? '12.345.678/0001-99' : 'Ela / Dela'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isHospital = userType === 'hospital';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex-1 overflow-y-auto p-8 lg:p-16 bg-white font-sans text-gray-900"
    >
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 border-b border-gray-100 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Perfil Público</h1>
            <p className="text-gray-500 text-lg">Gerencie as informações que os outros usuários podem ver sobre você.</p>
          </div>
          <button className="bg-brand-red text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30">
            <Save size={18} />
            Salvar Alterações
          </button>
        </header>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Column - Form */}
          <div className="flex-1 w-full space-y-8">
            {/* Name Field */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-900">
                {isHospital ? 'Nome do Hospital' : 'Nome'}
              </label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all font-medium"
              />
              <p className="text-xs text-gray-500">
                Seu nome pode aparecer no painel e na comunidade. Você pode removê-lo a qualquer momento.
              </p>
            </div>

            {/* Email Field */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-900">
                {isHospital ? 'E-mail Institucional' : 'E-mail Público'}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all font-medium"
                />
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <AlertCircle size={12} />
                Você configurou seu endereço de e-mail como privado. Para alterar isso, acesse as configurações de conta.
              </p>
            </div>

            {/* Bio Field */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-900">
                {isHospital ? 'Sobre o Hospital' : 'Biografia'}
              </label>
              <textarea 
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all font-medium resize-none"
              />
              <p className="text-xs text-gray-500">
                Você pode mencionar outros perfis (@) para criar links diretos na comunidade.
              </p>
            </div>

            {/* Extra Field (Pronouns / CNPJ) */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-900">
                {isHospital ? 'CNPJ' : 'Pronomes'}
              </label>
              {isHospital ? (
                <input 
                  type="text"
                  name="extra"
                  value={formData.extra}
                  onChange={handleChange}
                  className="w-full max-w-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all font-medium"
                />
              ) : (
                <select 
                  name="extra"
                  value={formData.extra}
                  onChange={handleChange}
                  className="w-full max-w-sm bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all font-medium appearance-none cursor-pointer"
                >
                  <option value="Ela / Dela">Ela / Dela</option>
                  <option value="Ele / Dele">Ele / Dele</option>
                  <option value="Elu / Delu">Elu / Delu</option>
                  <option value="Não especificar">Não especificar</option>
                </select>
              )}
            </div>
            
          </div>

          {/* Right Column - Profile Picture */}
          <div className="flex flex-col items-start w-full lg:w-64 shrink-0">
            <h3 className="text-sm font-bold text-gray-900 mb-6">Foto de Perfil</h3>
            
            <div className="relative group">
              {/* Profile Image */}
              <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-100">
                <img 
                  src={isHospital ? "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=500&auto=format&fit=crop" : "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&auto=format&fit=crop"} 
                  alt="Profile" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full backdrop-blur-sm">
                  <Camera className="text-white w-10 h-10" />
                </div>
              </div>
              
              {/* Edit Button */}
              <button className="absolute bottom-2 left-6 bg-white border border-gray-200 shadow-lg px-4 py-2 rounded-lg text-sm font-bold text-gray-700 flex items-center gap-2 hover:bg-gray-50 hover:text-brand-red transition-colors group-hover:-translate-y-1">
                <Pencil size={14} />
                Editar
              </button>
            </div>
            
            {isHospital && (
              <div className="mt-8 bg-green-50 text-green-700 p-4 rounded-xl flex items-start gap-3 border border-green-100 w-full">
                <ShieldCheck size={20} className="shrink-0 mt-0.5" />
                <p className="text-xs font-medium leading-relaxed">
                  Conta verificada. Seu hospital está habilitado para receber doações.
                </p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsView;
