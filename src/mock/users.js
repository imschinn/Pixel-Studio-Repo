// Mock user "database" held in memory + localStorage.
// THIS IS NOT REAL AUTHENTICATION. There is no backend, no password hashing,
// and no server-side validation. It exists purely so the Login/Register UI
// has something to talk to. Replace src/services/authService.js with real
// API calls before using this in production.

const STORAGE_KEY = 'pixelstudio_mock_users';
const SESSION_KEY = 'pixelstudio_mock_session';

function readUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export const mockUserStore = {
  readUsers,
  writeUsers,
  STORAGE_KEY,
  SESSION_KEY,
};
