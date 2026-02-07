'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast';
import { Edit2, Save, X, StickyNote } from 'lucide-react';

interface NoteEditorProps {
  note: string | undefined;
  onSave: (note: string) => void;
}

export function NoteEditor({ note, onSave }: NoteEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(note || '');
  const { addToast } = useToast();

  useEffect(() => {
    setValue(note || '');
  }, [note]);

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
    addToast({
      title: 'Nota salva',
      message: 'As alterações foram guardadas com sucesso.',
      variant: 'success',
    });
  };

  const handleCancel = () => {
    setValue(note || '');
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-900 flex items-center">
            <StickyNote className="w-4 h-4 mr-2" />
            Nota
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        </div>
        {note ? (
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{note}</p>
        ) : (
          <p className="text-sm text-gray-400 italic">Clique no ícone de editar para adicionar uma nota...</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
        <StickyNote className="w-4 h-4 mr-2" />
        Nota
      </h3>
      <Textarea
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
        placeholder="Adicione uma nota sobre este Pokémon..."
        className="min-h-[100px] resize-none"
      />
      <div className="flex justify-end gap-2 mt-3">
        <Button variant="outline" size="sm" onClick={handleCancel}>
          <X className="w-4 h-4 mr-1" />
          Cancelar
        </Button>
        <Button size="sm" onClick={handleSave} className="bg-red-500 hover:bg-red-600">
          <Save className="w-4 h-4 mr-1" />
          Guardar
        </Button>
      </div>
    </div>
  );
}
