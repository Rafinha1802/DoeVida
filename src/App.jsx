import React, { useState, useEffect } from 'react';
import { Heart, Building2, UserCircle2, Bell, LogIn, ChevronLeft, ChevronRight } from 'lucide-react';
import Dashboard from './Dashboard';
import HospitalDashboard from './HospitalDashboard';
import AnamnesisForm from './AnamnesisForm';
import PatientAnamnesisForm from './PatientAnamnesisForm';
import PatientDashboard from './PatientDashboard';

const images = [
  'fotos/sangue.jpg',
  'fotos/sangue2.jpg',
  'fotos/sangue3.jpg',
  'fotos/sangue 4.jpg',
  'fotos/sangue5.jpg'
];

const App = () => {
  const [role, setRole] = useState('doador'); // 'doador', 'hospital', 'paciente'
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isScreening, setIsScreening] = useState(false);
  const [isLoginView, setIsLoginView] = useState(false);
  const [patientUrgency, setPatientUrgency] = useState('Urgente');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    if (role === 'doador' || role === 'hospital' || role === 'paciente') {
      if (isLoginView || role === 'hospital') {
        setUserType(role);
        setIsLoggedIn(true);
      } else {
        setIsScreening(true);
      }
    } else {
      alert('Selecione um perfil para continuar.');
    }
  };

  if (isLoggedIn) {
    if (userType === 'hospital') {
      return <HospitalDashboard onLogout={() => setIsLoggedIn(false)} />;
    }
    if (userType === 'paciente') {
      return <PatientDashboard urgency={patientUrgency} onLogout={() => setIsLoggedIn(false)} />;
    }
    return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
  }

  if (isScreening) {
    if (role === 'paciente') {
      return (
        <PatientAnamnesisForm
          onComplete={(urgency) => {
            setPatientUrgency(urgency);
            setIsScreening(false);
            setUserType('paciente');
            setIsLoggedIn(true);
          }}
          onCancel={() => setIsScreening(false)}
        />
      );
    }

    return (
      <AnamnesisForm
        onComplete={() => {
          setIsScreening(false);
          setUserType('doador');
          setIsLoggedIn(true);
        }}
        onCancel={() => setIsScreening(false)}
      />
    );
  }

  const roles = [
    { id: 'doador', label: 'Doador', icon: <UserCircle2 className="w-6 h-6" /> },
    { id: 'hospital', label: 'Hospital', icon: <Building2 className="w-6 h-6" /> },
    { id: 'paciente', label: 'Paciente', icon: <Heart className="w-6 h-6" /> },
  ];

  return (
    <div className="flex h-screen w-full flex-col md:flex-row font-sans text-gray-800 overflow-hidden">
      {/* Lado Esquerdo - Hero com Carrossel */}
      <div className="relative flex w-full flex-col justify-start pt-32 lg:pt-40 bg-gray-900 p-8 md:w-1/2 lg:p-16 overflow-hidden shrink-0">
        {/* Carrossel de Imagens */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center ${index === currentImage ? 'opacity-50' : 'opacity-0'
              }`}
            style={{
              backgroundImage: `url('${img}')`,
            }}
          />
        ))}

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 to-transparent" />

        {/* Controles do Carrossel */}
        <div className="absolute bottom-8 left-8 z-30 flex gap-2 md:left-16">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2 rounded-full transition-all ${index === currentImage ? 'w-8 bg-brand-red' : 'w-2 bg-white/50 hover:bg-white'
                }`}
            />
          ))}
        </div>

        {/* Setas de Navegação (Opcional) */}
        <div className="absolute top-1/2 left-4 right-4 z-30 flex -translate-y-1/2 justify-between px-4 md:hidden lg:flex">
          <button
            onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
            className="rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
            className="rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="relative z-20 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-white">
            <Heart className="h-8 w-8 fill-brand-red text-brand-red" />
            <span className="text-2xl font-bold">DoaVida</span>
          </div>

          <h1 className="max-w-md text-5xl font-extrabold leading-tight text-white md:text-6xl">
            Se junte para <br />
            <span className="text-brand-red-light">Salvar Vidas</span>
          </h1>

          <p className="max-w-md text-lg text-gray-300">
            Bem-vindo à nossa rede de doação de sangue. Aqui, cada cadastro representa uma nova chance de salvar vidas. Conectamos pessoas dispostas a ajudar com quem mais precisa, de forma rápida, segura e solidária.
          </p>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="flex w-full flex-col items-center bg-white p-8 md:w-1/2 lg:p-16 xl:p-24 overflow-hidden">
        <div className="w-full max-w-lg space-y-8 my-auto">
          {/* Header do Formulário */}
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
              {isLoginView ? 'Bem-vindo de volta' : 'Crie uma conta'}
            </h2>
            <p className="text-lg text-gray-500">
              {isLoginView ? 'Ainda não tem uma conta?' : 'Já tem uma conta?'}{' '}
              <button
                onClick={() => setIsLoginView(!isLoginView)}
                className="font-semibold text-brand-red hover:underline"
              >
                {isLoginView ? 'Cadastre-se' : 'Log in'}
              </button>
            </p>
          </div>

          {/* Seleção de Role */}
          <div className="grid grid-cols-3 gap-3">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl border-2 p-3 transition-all ${role === r.id
                  ? 'border-brand-red bg-brand-red-light text-brand-red'
                  : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                  }`}
              >
                <div className="scale-90">{r.icon}</div>
                <span className="text-xs font-semibold">{r.label}</span>
              </button>
            ))}
          </div>

          {/* Campos do Formulário */}
          <form className="space-y-4" onSubmit={handleRegister}>
            {role === 'hospital' && !isLoginView ? (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Nome do Hospital</label>
                    <input
                      type="text"
                      placeholder="Nome da instituição"
                      className="w-full rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">CNPJ</label>
                    <input
                      type="text"
                      placeholder="00.000.000/0000-00"
                      className="w-full rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Telefone</label>
                    <input
                      type="tel"
                      placeholder="(00) 0000-0000"
                      className="w-full rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Nome do Responsável</label>
                    <input
                      type="text"
                      placeholder="Nome do contato principal"
                      className="w-full rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">E-mail Institucional</label>
                    <input
                      type="email"
                      placeholder="contato@hospital.com.br"
                      className="w-full rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Senha</label>
                    <input
                      type="password"
                      placeholder="********"
                      className="w-full rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </>
            ) : isLoginView ? (
              <>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">
                      E-mail
                    </label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      className="w-full rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                    />
                  </div>
                  {role === 'hospital' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">
                        CNPJ
                      </label>
                      <input
                        type="text"
                        placeholder="00.000.000/0000-00"
                        className="w-full rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Senha</label>
                    <input
                      type="password"
                      placeholder="********"
                      className="w-full rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </>
            ) : role === 'paciente' && !isLoginView ? (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Nome Completo</label>
                    <input
                      type="text"
                      placeholder="Nome do paciente"
                      className="w-full rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">CPF</label>
                    <input
                      type="text"
                      placeholder="000.000.000-00"
                      className="w-full rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Data de Nascimento</label>
                    <input
                      type="date"
                      className="w-full rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Tipo Sanguíneo</label>
                    <div className="flex gap-2">
                      <select className="flex-1 rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all appearance-none">
                        <option value="">Tipo</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                      </select>
                      <select className="w-20 rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all appearance-none">
                        <option value="">RH</option>
                        <option value="+">+</option>
                        <option value="-">-</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Nome Completo</label>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      className="w-full rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">CPF</label>
                    <input
                      type="text"
                      placeholder="000.000.000-00"
                      className="w-full rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Data de Nascimento</label>
                    <input
                      type="date"
                      className="w-full rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Sexo</label>
                    <select className="w-full rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all appearance-none">
                      <option value="">Selecione</option>
                      <option value="M">Masculino</option>
                      <option value="F">Feminino</option>
                      <option value="O">Outro</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Tipo Sanguíneo</label>
                    <div className="flex gap-2">
                      <select className="flex-1 rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all appearance-none">
                        <option value="">Tipo</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                      </select>
                      <select className="w-20 rounded-xl bg-gray-50 border border-gray-100 p-3 text-sm outline-none ring-brand-red focus:ring-2 focus:bg-white transition-all appearance-none">
                        <option value="">RH</option>
                        <option value="+">+</option>
                        <option value="-">-</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-brand-red p-4 font-bold text-base text-white transition-all hover:bg-red-800 shadow-lg shadow-brand-red/20 active:scale-95"
            >
              {isLoginView ? 'Entrar' : 'Completar Registro'}
            </button>
          </form>

          {/* Social Proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-white"
                  src={`https://i.pravatar.cc/150?u=${i}`}
                  alt="Avatar"
                />
              ))}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-[10px] font-bold text-white">
                +12k
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Se juntaram +12,000 doadores para fazer a diferença.
            </p>
          </div>
        </div>

        {/* Notificação Urgente (Bottom Right no Desktop) */}
        <div className="absolute bottom-6 right-6 hidden lg:block z-50">
          <div className="flex items-center gap-3 rounded-xl border border-brand-red-light bg-white/80 p-3 shadow-xl backdrop-blur-md max-w-[280px]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red text-white animate-pulse">
              <Bell className="h-4 w-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-black text-brand-red uppercase tracking-tighter truncate">URGENTE: O- NEGATIVO</span>
              <span className="text-[9px] text-gray-500 leading-tight">Hospital precisa de doadores agora</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
