import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Github, Instagram, MapPin, X, Phone, Mail, Chrome } from 'lucide-react';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

interface ContactCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('lucky002954@gmail.com');
    toast.success('Email copied to clipboard!');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-8 max-w-4xl w-full mx-4 shadow-2xl border border-gray-700/50 relative overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-4xl font-bold mb-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                      Contact Us
                    </span>
                  </h2>
                  <p className="text-gray-600 text-lg">Let's create something amazing together</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors bg-gray-800/50 p-2 rounded-full hover:bg-gray-700/50"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
                    {/* Remove the profile picture section and replace with just the name/title */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-1">Sachin Kumar</h3>
                      <p className="text-purple-400 text-lg">Full Stack Developer</p>
                    </div>

                    <div className="space-y-6">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-4 bg-gray-700/30 p-4 rounded-xl"
                      >
                        <Mail className="text-purple-400" size={20} />
                        <button
                          onClick={handleCopyEmail}
                          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                        >
                          <span>lucky002954@gmail.com</span>
                          <Copy size={16} />
                        </button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-4 bg-gray-700/30 p-4 rounded-xl"
                      >
                        <MapPin className="text-purple-400" size={20} />
                        <span className="text-gray-300">Bareilly, Uttar Pradesh</span>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-4 bg-gray-700/30 p-4 rounded-xl"
                      >
                        <Phone className="text-purple-400" size={20} />
                        <span className="text-gray-300">+91 9759938908</span>
                      </motion.div>
                    </div>

                    <div className="mt-8 flex space-x-4">
                      <a
                        href="https://github.com/Sachin-Kumar-007"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700/30 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all"
                      >
                        <Github size={24} />
                      </a>
                      <a
                        href="https://www.instagram.com/official__luc_ky/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700/30 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all"
                      >
                        <Instagram size={24} />
                      </a>
                      <a
                        href="https://developers.google.com/profile/u/101282811271903194130"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-700/30 p-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all"
                      >
                        <FaGoogle size={24} />
                      </a>

                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all h-32 resize-none"
                      placeholder="Your message"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-medium py-3 px-6 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/20"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactCard;