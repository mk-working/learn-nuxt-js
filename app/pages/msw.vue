<template>
  <div class="min-h-screen bg-slate-900 p-8 font-sans text-slate-100">
    <div class="mx-auto max-w-4xl space-y-8">
      <!-- Header / Learning Banner -->
      <div
        class="flex items-center justify-between rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-6 shadow-xl"
      >
        <div>
          <span
            class="rounded-full bg-black/30 px-3 py-1 font-mono text-xs tracking-wider text-emerald-200 uppercase"
            >MSW v2 Learning Sandbox</span
          >
          <h1 class="mt-2 text-3xl font-extrabold text-white">
            Full CRUD Request/Response Interception
          </h1>
          <p class="mt-1 text-sm text-emerald-100">
            Open browser DevTools Console & Network tab to watch MSW intercept requests in
            real-time!
          </p>
        </div>
        <button
          @click="fetchNotes"
          class="flex items-center gap-2 rounded-xl bg-white px-4 py-2 font-semibold text-emerald-900 shadow transition hover:bg-emerald-50 active:scale-95"
        >
          <span>🔄</span> Refresh List (GET)
        </button>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- CREATE Form Column -->
        <div class="h-fit rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
          <h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-emerald-400">
            <span>✨</span> Create Note (POST)
          </h2>
          <form @submit.prevent="createNote" class="space-y-4">
            <div>
              <label class="mb-1 block text-xs font-medium text-slate-400 uppercase">Title</label>
              <input
                v-model="newTitle"
                type="text"
                placeholder="e.g. Master MSW HTTP Handlers"
                required
                class="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm transition focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label class="mb-1 block text-xs font-medium text-slate-400 uppercase"
                >Category</label
              >
              <select
                v-model="newCategory"
                class="w-full rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm transition focus:border-emerald-500 focus:outline-none"
              >
                <option value="learning">📘 Learning</option>
                <option value="work">💼 Work</option>
                <option value="idea">💡 Idea</option>
              </select>
            </div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full rounded-xl bg-emerald-600 py-2.5 font-medium text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500 disabled:opacity-50"
            >
              Add Note via POST
            </button>
          </form>

          <div class="mt-6 space-y-2 border-t border-slate-700/60 pt-6 text-xs text-slate-400">
            <p class="font-semibold text-slate-300">💡 How it works:</p>
            <p>
              1. Form sends <code class="text-emerald-400">POST /api/notes</code> via
              <code class="text-teal-400">$fetch</code>.
            </p>
            <p>
              2. MSW intercepts it, pushes the item to an in-memory array, and returns a
              <code class="text-amber-400">201 Created</code> JSON response.
            </p>
          </div>
        </div>

        <!-- READ / UPDATE / DELETE List Column -->
        <div class="space-y-4 md:col-span-2">
          <div class="flex items-center justify-between">
            <h2 class="flex items-center gap-2 text-xl font-bold text-slate-200">
              <span>📋</span> Current In-Memory Notes (GET)
            </h2>
            <span
              class="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-400"
            >
              {{ notes.length }} items
            </span>
          </div>

          <div v-if="loading && notes.length === 0" class="py-12 text-center text-slate-500">
            Loading intercepted data...
          </div>

          <div
            v-else-if="notes.length === 0"
            class="rounded-2xl border border-dashed border-slate-700 bg-slate-800/50 p-8 text-center text-slate-400"
          >
            No notes found in MSW memory. Create one using the form on the left!
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="note in notes"
              :key="note.id"
              class="flex items-center justify-between gap-4 rounded-xl border border-slate-700 bg-slate-800 p-4 transition hover:border-slate-600"
            >
              <div class="flex flex-1 items-center gap-3">
                <input
                  type="checkbox"
                  :checked="note.completed"
                  @change="toggleNote(note)"
                  class="h-5 w-5 cursor-pointer rounded border-slate-600 bg-slate-900 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <h3
                    :class="{ 'text-slate-500 line-through': note.completed }"
                    class="font-medium text-slate-200"
                  >
                    {{ note.title }}
                  </h3>
                  <div class="mt-1 flex items-center gap-2">
                    <span
                      :class="{
                        'border-blue-800/50 bg-blue-950/60 text-blue-300':
                          note.category === 'learning',
                        'border-purple-800/50 bg-purple-950/60 text-purple-300':
                          note.category === 'work',
                        'border-amber-800/50 bg-amber-950/60 text-amber-300':
                          note.category === 'idea'
                      }"
                      class="rounded border px-2 py-0.5 text-[10px] font-semibold uppercase"
                    >
                      {{ note.category }}
                    </span>
                    <span class="text-[10px] text-slate-500">ID: {{ note.id }}</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-2">
                <button
                  @click="toggleNote(note)"
                  class="rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-600"
                >
                  {{ note.completed ? 'Mark Undone' : 'Complete' }} (PUT)
                </button>
                <button
                  @click="deleteNote(note.id)"
                  class="rounded-lg border border-rose-900/40 bg-rose-950/40 p-1.5 text-rose-400 transition hover:bg-rose-900/60"
                  title="Delete Note (DELETE)"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>

          <!-- Activity Log Console -->
          <div
            class="mt-6 space-y-2 rounded-2xl border border-slate-800 bg-black/40 p-4 font-mono text-xs"
          >
            <div
              class="mb-2 flex items-center justify-between border-b border-slate-800 pb-2 font-semibold text-slate-400"
            >
              <span>⚡ Recent Interception Logs (App-level view)</span>
              <button @click="logs = []" class="text-[10px] text-slate-500 hover:text-slate-300">
                Clear
              </button>
            </div>
            <div v-if="logs.length === 0" class="text-slate-600 italic">
              Make a CRUD request to see activity...
            </div>
            <div v-for="(log, i) in logs" :key="i" class="flex items-center gap-2">
              <span class="text-slate-500">[{{ log.time }}]</span>
              <span :class="log.color" class="font-bold">{{ log.method }}</span>
              <span class="text-slate-300">{{ log.url }}</span>
              <span class="ml-auto text-emerald-400">{{ log.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

definePageMeta({
  layout: 'default'
});

useHead({
  title: 'MSW CRUD Learning Sandbox'
});

interface Note {
  id: string;
  title: string;
  category: 'learning' | 'work' | 'idea';
  completed: boolean;
}

const notes = ref<Note[]>([]);
const loading = ref(false);
const newTitle = ref('');
const newCategory = ref<'learning' | 'work' | 'idea'>('learning');
const logs = ref<
  Array<{ time: string; method: string; url: string; status: string; color: string }>
>([]);

function addLog(method: string, url: string, status: string, color: string) {
  const time = new Date().toLocaleTimeString();
  logs.value.unshift({ time, method, url, status, color });
  if (logs.value.length > 8) logs.value.pop();
}

// 1. READ: Fetch all notes from MSW handler
async function fetchNotes() {
  loading.value = true;
  try {
    const data = await $fetch<Note[]>('/api/notes');
    notes.value = data;
    addLog('GET', '/api/notes', '200 OK', 'text-emerald-400');
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    addLog('GET', '/api/notes', 'ERROR', 'text-rose-400');
  } finally {
    loading.value = false;
  }
}

// 2. CREATE: Send a POST request to MSW handler
async function createNote() {
  if (!newTitle.value.trim()) return;
  loading.value = true;
  try {
    await $fetch<Note>('/api/notes', {
      method: 'POST',
      body: {
        title: newTitle.value,
        category: newCategory.value
      }
    });
    addLog('POST', '/api/notes', '201 Created', 'text-blue-400');
    newTitle.value = '';
    await fetchNotes();
  } catch (error) {
    console.error('Failed to create note:', error);
  } finally {
    loading.value = false;
  }
}

// 3. UPDATE: Send a PUT request to MSW handler
async function toggleNote(note: Note) {
  try {
    await $fetch(`/api/notes/${note.id}`, {
      method: 'PUT',
      body: {
        completed: !note.completed
      }
    });
    addLog('PUT', `/api/notes/${note.id}`, '200 OK', 'text-amber-400');
    await fetchNotes();
  } catch (error) {
    console.error('Failed to update note:', error);
  }
}

// 4. DELETE: Send a DELETE request to MSW handler
async function deleteNote(id: string) {
  try {
    await $fetch(`/api/notes/${id}`, {
      method: 'DELETE'
    });
    addLog('DELETE', `/api/notes/${id}`, '200 OK', 'text-rose-400');
    await fetchNotes();
  } catch (error) {
    console.error('Failed to delete note:', error);
  }
}

// Fetch on mount
onMounted(() => {
  fetchNotes();
});
</script>
