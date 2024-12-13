/*
This is AITutor.tsx
Create a fake AI math tutor. The tutor should:

Respond conversationally when I ask general questions like "How are you?"
Help me create a personalized study plan for learning math, considering my current skills (e.g., struggling with quadratic equations and complex fractions).
Generate example problems based on the topics I want to practice, including varying levels of difficulty.
Provide detailed solutions and explanations for each problem.
Check and give feedback on my answers to the problems.
Be supportive, encouraging, and adaptable to my learning pace.
*/
import React, { useState } from 'react';
import { Bot, Upload, Send, Loader2, BookOpen, Video, FileText, Trash2, Play, Download, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface UploadedFile {
  id: string;
  name: string;
  type: 'video' | 'pdf' | 'slides';
  icon: typeof Video | typeof FileText | typeof BookOpen;
  summary?: string;
}

const EXAMPLE_QUESTIONS = [
  "What are the key concepts covered in this material?",
  "Can you explain the main topic in simpler terms?",
  "What are the practical applications of this content?",
  "How does this relate to previous topics?",
];

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [showFileInfo, setShowFileInfo] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: crypto.randomUUID(),
        type: 'bot',
        content: 'Based on the content you\'ve shared, here\'s what I understand: This material covers several key concepts. First, it introduces the fundamental principles, then builds upon them with practical examples. The main takeaway is that these concepts can be applied in various real-world scenarios.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const fileType = file.type.includes('video') ? 'video' : 
                      file.type.includes('pdf') ? 'pdf' : 'slides';
      
      const icon = fileType === 'video' ? Video :
                  fileType === 'pdf' ? FileText : BookOpen;

      const newFile: UploadedFile = {
        id: crypto.randomUUID(),
        name: file.name,
        type: fileType,
        icon,
        summary: 'This document contains important information about the topic. Click to analyze.',
      };

      setUploadedFiles(prev => [...prev, newFile]);
    });
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
    if (selectedFile?.id === id) {
      setSelectedFile(null);
    }
  };

  const handleFileSelect = (file: UploadedFile) => {
    setSelectedFile(file);
    setShowFileInfo(true);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gray-50 pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1 border-r border-gray-200 p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Learning Materials</h3>
                  <label className="block">
                    <span className="sr-only">Upload files</span>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleFileUpload}
                      accept=".pdf,.ppt,.pptx,.mp4,.mov"
                    />
                    <div className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg hover:border-purple-400 cursor-pointer">
                      <div className="flex flex-col items-center space-y-2">
                        <Upload className="w-6 h-6 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Upload your learning materials
                        </span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="space-y-2">
                  {uploadedFiles.map(file => (
                    <div
                      key={file.id}
                      className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer ${
                        selectedFile?.id === file.id ? 'bg-purple-50' : ''
                      }`}
                      onClick={() => handleFileSelect(file)}
                    >
                      <div className="flex items-center">
                        <file.icon className="w-5 h-5 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-700 truncate">
                          {file.name}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile(file.id);
                        }}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-3 flex flex-col h-[calc(100vh-8rem)]">
              {/* File Info Panel */}
              <AnimatePresence>
                {showFileInfo && selectedFile && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-b border-gray-200 bg-gray-50"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <selectedFile.icon className="w-6 h-6 text-purple-600 mt-1" />
                          <div>
                            <h4 className="font-medium text-gray-900">{selectedFile.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{selectedFile.summary}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowFileInfo(false)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex space-x-3 mt-4">
                        <button className="flex items-center space-x-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200">
                          <Play className="w-4 h-4" />
                          <span>Analyze</span>
                        </button>
                        <button className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <Bot className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      AI Learning Assistant
                    </h3>
                    <p className="text-sm mb-4">
                      Upload your learning materials and ask me anything about them.
                      I'll help you understand the content better.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto">
                      {EXAMPLE_QUESTIONS.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setInputValue(question)}
                          className="text-left p-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map(message => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-lg rounded-lg px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {message.content}
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex space-x-4">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything about your learning materials..."
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}