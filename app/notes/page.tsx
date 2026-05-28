'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { NotebookPen, Plus, Trash2, GripVertical, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'deol-notes-list';

type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
};

function newId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `n-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getTitleFromContent(content: string): string {
  const firstLine = content.trim().split('\n')[0] ?? '';
  return firstLine.replace(/^#+\s*/, '').trim() || 'Untitled note';
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setNotes(parsed);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {}
  }, [notes, hydrated]);

  const selected = notes.find((n) => n.id === selectedId);
  const isEditing = editingId !== null;

  const handleNewNote = () => {
    const note: Note = {
      id: newId(),
      title: 'Untitled note',
      content: '',
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [note, ...prev]);
    setSelectedId(note.id);
    setEditingId(note.id);
    setEditContent('');
  };

  const handleStartEdit = () => {
    if (!selected) return;
    setEditingId(selected.id);
    setEditContent(selected.content);
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    const content = editContent.trim();
    const title = getTitleFromContent(content || 'Untitled note');
    setNotes((prev) =>
      prev.map((n) =>
        n.id === editingId ? { ...n, title, content, updatedAt: new Date().toISOString() } : n
      )
    );
    setEditingId(null);
    setEditContent('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const handleDeleteNote = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!window.confirm('Delete this note? This cannot be undone.')) return;
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selectedId === id) {
      setSelectedId(notes.length > 1 ? notes.find((n) => n.id !== id)?.id ?? null : null);
      setEditingId(null);
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverId(id);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDragOverId(null);
    setDraggedId(null);
    const dragId = e.dataTransfer.getData('text/plain');
    if (!dragId || dragId === targetId) return;
    const from = notes.findIndex((n) => n.id === dragId);
    const to = notes.findIndex((n) => n.id === targetId);
    if (from === -1 || to === -1) return;
    const copy = notes.slice();
    const [removed] = copy.splice(from, 1);
    copy.splice(to, 0, removed);
    setNotes(copy);
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <NotebookPen className="size-6 text-muted-foreground" />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="gradient-text">Notes</span>
          </h1>
        </div>
        <Button onClick={handleNewNote}>
          <Plus />
          New note
        </Button>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-60">
          <ul className="space-y-2">
            {notes.length === 0 ? (
              <li>
                <Card>
                  <CardContent className="px-4 py-6 text-center text-sm text-muted-foreground">
                    No notes yet. Click &ldquo;New note&rdquo; to create one.
                  </CardContent>
                </Card>
              </li>
            ) : (
              notes.map((note) => (
                <li key={note.id}>
                  <button
                    type="button"
                    draggable
                    onClick={() => {
                      setSelectedId(note.id);
                      setEditingId(null);
                    }}
                    onDragStart={(e) => handleDragStart(e, note.id)}
                    onDragOver={(e) => handleDragOver(e, note.id)}
                    onDragLeave={() => setDragOverId(null)}
                    onDrop={(e) => handleDrop(e, note.id)}
                    onDragEnd={() => {
                      setDraggedId(null);
                      setDragOverId(null);
                    }}
                    className={cn(
                      'group flex w-full cursor-grab items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-sm backdrop-blur-sm transition-all active:cursor-grabbing',
                      selectedId === note.id
                        ? 'border-foreground/40 bg-accent/60'
                        : 'border-border/40 bg-card/30 hover:bg-accent/40',
                      draggedId === note.id && 'opacity-50',
                      dragOverId === note.id && 'ring-2 ring-foreground/30'
                    )}
                  >
                    <span className="flex min-w-0 shrink items-center gap-2">
                      <GripVertical className="size-4 shrink-0 text-muted-foreground" />
                      <span className="min-w-0 truncate font-medium">{note.title}</span>
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => handleDeleteNote(e, note.id)}
                      className="shrink-0 rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                      aria-label="Delete note"
                    >
                      <Trash2 className="size-4" />
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </aside>

        <div className="min-w-0 flex-1">
          {!selected ? (
            <Card>
              <CardContent className="px-6 py-12 text-center text-muted-foreground">
                Select a note or create a new one.
              </CardContent>
            </Card>
          ) : isEditing && editingId === selected.id ? (
            <div className="flex flex-col gap-3">
              <label htmlFor="note-edit" className="text-sm font-medium text-muted-foreground">
                Edit (Markdown)
              </label>
              <Textarea
                id="note-edit"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Write in Markdown..."
                spellCheck={false}
                className="min-h-[320px]"
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveEdit}>Save</Button>
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Card>
              <div className="flex items-center justify-between border-b border-border/40 px-5 py-3">
                <h2 className="text-xl font-semibold">{selected.title}</h2>
                <Button variant="ghost" size="sm" onClick={handleStartEdit}>
                  <Pencil />
                  Edit
                </Button>
              </div>
              <CardContent className="notes-preview max-h-[80vh] overflow-y-auto p-5">
                {selected.content ? (
                  <ReactMarkdown>{selected.content}</ReactMarkdown>
                ) : (
                  <p className="text-muted-foreground">Empty note. Click Edit to add content.</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
