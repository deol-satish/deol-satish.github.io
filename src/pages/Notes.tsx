import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const STORAGE_KEY = 'deol-notes-list';

type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
};

function newId(): string {
  return crypto.randomUUID?.() ?? `n-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getTitleFromContent(content: string): string {
  const firstLine = content.trim().split('\n')[0] ?? '';
  const withoutMarkdown = firstLine.replace(/^#+\s*/, '').trim();
  return withoutMarkdown || 'Untitled note';
}

function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // ignore
  }
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const selected = notes.find((n) => n.id === selectedId);
  const isEditing = editingId !== null;

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

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

  const handleSelectNote = (id: string) => {
    setSelectedId(id);
    setEditingId(null);
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
        n.id === editingId
          ? { ...n, title, content, updatedAt: new Date().toISOString() }
          : n
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
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverId(id);
  };

  const handleDragLeave = () => {
    setDragOverId(null);
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

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Notes</h1>
        <button
          type="button"
          onClick={handleNewNote}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          New note
        </button>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Note list */}
        <aside className="w-full shrink-0 lg:w-56">
          <ul className="space-y-2">
            {notes.length === 0 ? (
              <li className="rounded-lg border border-dashed border-zinc-300 px-4 py-6 text-center text-sm text-zinc-500 dark:border-zinc-600 dark:text-zinc-400">
                No notes yet. Click “New note” to create one.
              </li>
            ) : (
              notes.map((note) => (
                <li key={note.id}>
                  <button
                    type="button"
                    draggable
                    data-note-id={note.id}
                    onClick={() => handleSelectNote(note.id)}
                    onDragStart={(e) => handleDragStart(e, note.id)}
                    onDragOver={(e) => handleDragOver(e, note.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, note.id)}
                    onDragEnd={handleDragEnd}
                    className={`group flex w-full cursor-grab active:cursor-grabbing items-center justify-between gap-2 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                      selectedId === note.id
                        ? 'border-zinc-400 bg-zinc-100 dark:border-zinc-500 dark:bg-zinc-800'
                        : 'border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800/50'
                    } ${draggedId === note.id ? 'opacity-50' : ''} ${dragOverId === note.id ? 'ring-2 ring-zinc-400 dark:ring-zinc-500' : ''}`}
                  >
                    <span className="flex min-w-0 shrink items-center gap-2">
                      <span className="shrink-0 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" aria-hidden>
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      </span>
                      <span className="min-w-0 truncate font-medium text-zinc-900 dark:text-white">
                        {note.title}
                      </span>
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => handleDeleteNote(e, note.id)}
                      className="shrink-0 rounded p-1 text-zinc-400 opacity-0 hover:bg-zinc-200 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-zinc-700 dark:hover:text-red-400"
                      aria-label="Delete note"
                    >
                      <svg className="size-4" fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </aside>

        {/* Preview or Edit */}
        <div className="min-w-0 flex-1">
          {!selected ? (
            <div className="rounded-lg border border-dashed border-zinc-200 px-6 py-12 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              Select a note or create a new one.
            </div>
          ) : isEditing && editingId === selected.id ? (
            <div className="flex flex-col gap-3">
              <label htmlFor="note-edit" className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Edit (Markdown)
              </label>
              <textarea
                id="note-edit"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[320px] w-full resize-y rounded-lg border border-zinc-200 bg-white px-4 py-3 font-mono text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-500"
                placeholder="Write in Markdown..."
                spellCheck="false"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50/50 dark:border-zinc-700 dark:bg-zinc-900/50">
              <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">{selected.title}</h2>
                <button
                  type="button"
                  onClick={handleStartEdit}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-600 hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-zinc-700"
                >
                  Edit
                </button>
              </div>
              <div className="notes-preview max-h-[80vh] overflow-y-auto px-4 py-4 text-zinc-700 dark:text-zinc-300">
                {selected.content ? (
                  <ReactMarkdown>{selected.content}</ReactMarkdown>
                ) : (
                  <p className="text-zinc-500 dark:text-zinc-400">Empty note. Click Edit to add content.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
