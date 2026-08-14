// Mock authentication service.
//
// IMPORTANT: This is frontend-only mock authentication for demo purposes.
// Passwords are stored in plain text in localStorage, which is NOT secure.
// A production build must replace every function below with real calls to
// a backend that handles hashing, sessions/JWTs and validation server-side.

import { mockUserStore } from '../mock/users';

const DELAY = 500;
const wait = (ms = DELAY) => new Promise((r) => setTimeout(r, ms));

export async function registerUser({ fullName, email, mobile, password }) {
  await wait();
  const users = mockUserStore.readUsers();

  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error('An account with this email already exists.');
  }

  const newUser = {
    id: `user_${Date.now()}`,
    fullName,
    email,
    mobile,
    password, // mock only — never store plain-text passwords in production
    createdAt: new Date().toISOString(),
  };

  mockUserStore.writeUsers([...users, newUser]);

  const { password: _pw, ...safeUser } = newUser;
  localStorage.setItem(mockUserStore.SESSION_KEY, JSON.stringify(safeUser));
  return safeUser;
}

export async function loginUser({ email, password, rememberMe }) {
  await wait();
  const users = mockUserStore.readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user || user.password !== password) {
    throw new Error('Invalid email or password.');
  }

  const { password: _pw, ...safeUser } = user;
  const payload = JSON.stringify(safeUser);

  if (rememberMe) {
    localStorage.setItem(mockUserStore.SESSION_KEY, payload);
  } else {
    sessionStorage.setItem(mockUserStore.SESSION_KEY, payload);
  }

  return safeUser;
}

export async function logoutUser() {
  await wait(200);
  localStorage.removeItem(mockUserStore.SESSION_KEY);
  sessionStorage.removeItem(mockUserStore.SESSION_KEY);
}

export function getCurrentUser() {
  const fromLocal = localStorage.getItem(mockUserStore.SESSION_KEY);
  const fromSession = sessionStorage.getItem(mockUserStore.SESSION_KEY);
  const raw = fromLocal || fromSession;
  return raw ? JSON.parse(raw) : null;
}

export async function requestPasswordReset(email) {
  await wait(600);
  // Mock only — in production this triggers a real email with a reset link.
  return { success: true, message: `If an account exists for ${email}, a reset link has been sent.` };
}
