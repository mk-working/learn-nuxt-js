import { http, HttpResponse } from 'msw';

// 1. Define the data model for our small learning dataset
export interface Note {
  id: string;
  title: string;
  category: 'learning' | 'work' | 'idea';
  completed: boolean;
}

// 2. In-Memory Database (resets when page/worker reloads)
let notes: Note[] = [
  { id: '1', title: 'Understand MSW request interception', category: 'learning', completed: true },
  { id: '2', title: 'Practice full CRUD operations with HTTP methods', category: 'learning', completed: false },
  { id: '3', title: 'Test UI requests in sandbox.vue', category: 'idea', completed: false },
];

export const handlers = [
  // ==========================================
  // READ (GET all notes)
  // ==========================================
  http.get('/api/notes', () => {
    console.log('[MSW] Intercepted GET /api/notes');
    return HttpResponse.json(notes, { status: 200 });
  }),

  // ==========================================
  // READ (GET single note by ID)
  // ==========================================
  http.get('/api/notes/:id', ({ params }) => {
    const { id } = params;
    console.log(`[MSW] Intercepted GET /api/notes/${id}`);
    
    const note = notes.find((n) => n.id === id);
    if (!note) {
      return HttpResponse.json(
        { error: `Note with id "${id}" not found` },
        { status: 404 }
      );
    }
    return HttpResponse.json(note, { status: 200 });
  }),

  // ==========================================
  // CREATE (POST a new note)
  // ==========================================
  http.post('/api/notes', async ({ request }) => {
    console.log('[MSW] Intercepted POST /api/notes');
    const body = (await request.json()) as Partial<Note>;

    if (!body.title) {
      return HttpResponse.json(
        { error: 'Title is required to create a note' },
        { status: 400 }
      );
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title: body.title,
      category: body.category || 'learning',
      completed: false,
    };

    notes.push(newNote);
    return HttpResponse.json(newNote, { status: 201 });
  }),

  // ==========================================
  // UPDATE (PUT / PATCH note by ID)
  // ==========================================
  http.put('/api/notes/:id', async ({ params, request }) => {
    const { id } = params;
    console.log(`[MSW] Intercepted PUT /api/notes/${id}`);
    const body = (await request.json()) as Partial<Note>;

    const index = notes.findIndex((n) => n.id === id);
    if (index === -1) {
      return HttpResponse.json(
        { error: `Note with id "${id}" not found` },
        { status: 404 }
      );
    }

    // Update item in place
    notes[index] = {
      ...notes[index],
      ...body,
    };

    return HttpResponse.json(notes[index], { status: 200 });
  }),

  // ==========================================
  // DELETE (DELETE note by ID)
  // ==========================================
  http.delete('/api/notes/:id', ({ params }) => {
    const { id } = params;
    console.log(`[MSW] Intercepted DELETE /api/notes/${id}`);

    const index = notes.findIndex((n) => n.id === id);
    if (index === -1) {
      return HttpResponse.json(
        { error: `Note with id "${id}" not found` },
        { status: 404 }
      );
    }

    const deletedNote = notes[index];
    notes = notes.filter((n) => n.id !== id);

    return HttpResponse.json(
      { message: 'Note successfully deleted', deletedNote },
      { status: 200 }
    );
  }),
];
