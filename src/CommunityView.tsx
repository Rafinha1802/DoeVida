import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, User, ArrowLeft, Image as ImageIcon } from 'lucide-react';

const initialPosts = [
  {
    id: 1,
    author: 'Maria Silva',
    role: 'Paciente',
    avatar: 'bg-blue-100 text-blue-600',
    content: 'Hoje recebi minha segunda bolsa de sangue! Gostaria de agradecer imensamente a todos os doadores. Vocês salvam vidas todos os dias! 🙏❤️',
    likes: 24,
    liked: false,
    comments: 2,
    commentsList: [
      { id: 101, author: 'João Pedro', role: 'Doador', text: 'Que notícia maravilhosa, Maria! Fico muito feliz em ajudar.', time: '1 hora atrás' },
      { id: 102, author: 'Ana Clara', role: 'Doador', text: 'Muita saúde para você! Conte conosco.', time: '30 min atrás' }
    ],
    time: '2 horas atrás'
  },
  {
    id: 2,
    author: 'João Pedro',
    role: 'Doador',
    avatar: 'bg-red-100 text-red-600',
    content: 'Acabei de fazer minha 5ª doação no Hospital São Lucas. Fui super bem atendido e o processo durou só 15 minutos. Quem ainda tem medo, pode ir tranquilo!',
    likes: 42,
    liked: true,
    comments: 1,
    commentsList: [
      { id: 201, author: 'Maria Silva', role: 'Paciente', text: 'Parabéns pela atitude, João! Pessoas como você fazem a diferença.', time: '2 horas atrás' }
    ],
    time: '5 horas atrás'
  },
  {
    id: 3,
    author: 'Ana Clara',
    role: 'Doador',
    avatar: 'bg-red-100 text-red-600',
    content: 'Dica para quem vai doar pela primeira vez: comam bem antes, mas evitem alimentos gordurosos. E bebam muita água no dia anterior! 💧',
    likes: 15,
    liked: false,
    comments: 0,
    commentsList: [],
    time: 'Ontem'
  }
];

const CommunityView = ({ userType, onBack }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');
  
  // State for interactions
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [commentText, setCommentText] = useState('');

  const handlePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      author: userType === 'paciente' ? 'Você (Paciente)' : 'Você (Doador)',
      role: userType === 'paciente' ? 'Paciente' : 'Doador',
      avatar: userType === 'paciente' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-brand-red',
      content: newPost,
      likes: 0,
      liked: false,
      comments: 0,
      commentsList: [],
      time: 'Agora mesmo'
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.liked;
        return {
          ...post,
          liked: !isLiked,
          likes: isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const toggleComments = (postId) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null);
    } else {
      setExpandedPostId(postId);
      setCommentText(''); // Clear comment input when opening a new one
    }
  };

  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [
            ...post.commentsList,
            {
              id: Date.now(),
              author: userType === 'paciente' ? 'Você' : 'Você',
              role: userType === 'paciente' ? 'Paciente' : 'Doador',
              text: commentText,
              time: 'Agora'
            }
          ]
        };
      }
      return post;
    }));
    setCommentText('');
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-12 h-full flex flex-col relative bg-gradient-to-br from-pink-50 via-pink-100 to-rose-100">
      
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-10 text-brand-red opacity-20">
          <Heart size={80} fill="currentColor" />
        </motion.div>
        <motion.div animate={{ y: [0, -30, 0], rotate: [0, -15, 15, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-1/3 text-pink-500 opacity-20">
          <Heart size={40} fill="currentColor" />
        </motion.div>
        <motion.div animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 left-1/4 text-rose-400 opacity-20">
          <Heart size={60} fill="currentColor" />
        </motion.div>
        <motion.div animate={{ y: [0, -40, 0], rotate: [0, -20, 20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/3 right-10 text-pink-400 opacity-20">
          <Heart size={70} fill="currentColor" />
        </motion.div>
        <motion.div animate={{ y: [0, 25, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-1/3 right-1/4 text-brand-red opacity-15">
          <Heart size={50} fill="currentColor" />
        </motion.div>
        <motion.div animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-10 right-10 text-pink-300 opacity-30">
          <Heart size={90} fill="currentColor" />
        </motion.div>
        <motion.div animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 right-1/3 text-rose-500 opacity-15">
          <Heart size={30} fill="currentColor" />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 text-brand-red mb-2 cursor-pointer hover:underline w-max" onClick={onBack}>
              <ArrowLeft size={20} />
              <span className="font-semibold">Voltar ao Painel</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Comunidade DoeVida</h1>
            <p className="text-gray-600 mt-2 font-medium">Compartilhe sua jornada, tire dúvidas e inspire outras pessoas.</p>
          </div>
        </header>

        {/* Create Post */}
        <div className="bg-white/90 backdrop-blur-md rounded-[24px] p-6 shadow-sm border border-pink-100 mb-8">
          <form onSubmit={handlePost}>
            <div className="flex gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${userType === 'paciente' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-brand-red'}`}>
                <User size={24} />
              </div>
              <div className="flex-1">
                <textarea 
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder={userType === 'paciente' ? "Atualize os doadores sobre sua saúde..." : "Compartilhe sua experiência de doação..."}
                  className="w-full bg-white/80 rounded-xl border border-pink-100 p-4 min-h-[100px] outline-none ring-brand-red focus:ring-2 focus:bg-white resize-none transition-all"
                />
                <div className="flex justify-between items-center mt-4">
                  <button type="button" className="text-gray-400 hover:text-brand-red transition-colors flex items-center gap-2 font-medium">
                    <ImageIcon size={20} />
                    <span>Adicionar foto</span>
                  </button>
                  <button 
                    type="submit"
                    disabled={!newPost.trim()}
                    className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all ${
                      newPost.trim() ? 'bg-brand-red text-white hover:bg-red-700 shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Publicar
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={post.id} 
                className="bg-white/90 backdrop-blur-md rounded-[24px] p-6 shadow-sm border border-pink-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${post.avatar}`}>
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        {post.author}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${post.role === 'Paciente' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-brand-red'}`}>
                          {post.role}
                        </span>
                      </h3>
                      <p className="text-sm text-gray-500">{post.time}</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-800 leading-relaxed mb-6 text-lg">
                  {post.content}
                </p>

                <div className="flex items-center gap-6 border-t border-pink-50 pt-4">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 transition-colors font-medium ${post.liked ? 'text-brand-red' : 'text-gray-500 hover:text-brand-red'}`}
                  >
                    <Heart size={20} fill={post.liked ? 'currentColor' : 'none'} />
                    <span>{post.likes} Curtidas</span>
                  </button>
                  <button 
                    onClick={() => toggleComments(post.id)}
                    className={`flex items-center gap-2 transition-colors font-medium ${expandedPostId === post.id ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'}`}
                  >
                    <MessageCircle size={20} fill={expandedPostId === post.id ? 'currentColor' : 'none'} />
                    <span>{post.comments} Comentários</span>
                  </button>
                </div>

                {/* Área de Comentários (Expansível) */}
                <AnimatePresence>
                  {expandedPostId === post.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 overflow-hidden"
                    >
                      <div className="bg-pink-50/50 rounded-2xl p-4 border border-pink-100">
                        {/* Lista de Comentários */}
                        {post.commentsList.length > 0 ? (
                          <div className="space-y-4 mb-4">
                            {post.commentsList.map(comment => (
                              <div key={comment.id} className="flex gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${comment.role === 'Paciente' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-brand-red'}`}>
                                  <User size={16} />
                                </div>
                                <div className="flex-1 bg-white p-3 rounded-2xl rounded-tl-none border border-pink-50 shadow-sm">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-sm text-gray-900">{comment.author}</span>
                                    <span className="text-xs text-gray-400">{comment.time}</span>
                                  </div>
                                  <p className="text-gray-700 text-sm">{comment.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-sm mb-4 text-center">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
                        )}

                        {/* Input de Comentário */}
                        <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="flex gap-2">
                          <input 
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Escreva um comentário..."
                            className="flex-1 bg-white border border-pink-100 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-brand-red text-sm transition-all"
                          />
                          <button 
                            type="submit"
                            disabled={!commentText.trim()}
                            className={`px-4 rounded-xl flex items-center justify-center transition-all ${
                              commentText.trim() ? 'bg-brand-red text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            <Send size={16} />
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default CommunityView;
