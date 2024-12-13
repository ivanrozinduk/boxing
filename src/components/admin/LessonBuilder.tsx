import React, { useState } from 'react';
import { 
  Plus, Video, FileText, Music, Image as ImageIcon,
  GripVertical, Trash2, Settings, Save 
} from 'lucide-react';

interface LessonBlock {
  id: string;
  type: 'text' | 'video' | 'audio' | 'image';
  content: string;
}

export default function LessonBuilder() {
  const [blocks, setBlocks] = useState<LessonBlock[]>([]);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');

  const addBlock = (type: LessonBlock['type']) => {
    const newBlock: LessonBlock = {
      id: crypto.randomUUID(),
      type,
      content: '',
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const updateBlockContent = (id: string, content: string) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {/* Lesson Details */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Lesson Title"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            className="w-full text-2xl font-bold border-0 border-b-2 border-gray-200 focus:border-purple-500 focus:ring-0 pb-2 mb-4"
          />
          <textarea
            placeholder="Lesson Description"
            value={lessonDescription}
            onChange={(e) => setLessonDescription(e.target.value)}
            className="w-full border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={3}
          />
        </div>

        {/* Block Tools */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => addBlock('text')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <FileText className="w-5 h-5" />
            <span>Add Text</span>
          </button>
          <button
            onClick={() => addBlock('video')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Video className="w-5 h-5" />
            <span>Add Video</span>
          </button>
          <button
            onClick={() => addBlock('audio')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Music className="w-5 h-5" />
            <span>Add Audio</span>
          </button>
          <button
            onClick={() => addBlock('image')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <ImageIcon className="w-5 h-5" />
            <span>Add Image</span>
          </button>
        </div>

        {/* Content Blocks */}
        <div className="space-y-4">
          {blocks.map((block) => (
            <div
              key={block.id}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 group"
            >
              <button className="mt-2 cursor-move text-gray-400 hover:text-gray-600">
                <GripVertical className="w-5 h-5" />
              </button>
              
              <div className="flex-1">
                {block.type === 'text' && (
                  <textarea
                    value={block.content}
                    onChange={(e) => updateBlockContent(block.id, e.target.value)}
                    placeholder="Enter your content here..."
                    className="w-full border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={4}
                  />
                )}
                {block.type === 'video' && (
                  <input
                    type="text"
                    value={block.content}
                    onChange={(e) => updateBlockContent(block.id, e.target.value)}
                    placeholder="Enter video URL..."
                    className="w-full border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                )}
                {block.type === 'audio' && (
                  <input
                    type="text"
                    value={block.content}
                    onChange={(e) => updateBlockContent(block.id, e.target.value)}
                    placeholder="Enter audio URL..."
                    className="w-full border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                )}
                {block.type === 'image' && (
                  <input
                    type="text"
                    value={block.content}
                    onChange={(e) => updateBlockContent(block.id, e.target.value)}
                    placeholder="Enter image URL..."
                    className="w-full border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                )}
              </div>

              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={() => removeBlock(block.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {blocks.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <Plus className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Add content blocks to build your lesson</p>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Save className="w-5 h-5" />
            <span>Save Lesson</span>
          </button>
        </div>
      </div>
    </div>
  );
}