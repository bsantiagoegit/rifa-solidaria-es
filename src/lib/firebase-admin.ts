// src/lib/firebase-admin.ts
import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

// Configuración de Firebase Admin
const serviceAccount = JSON.parse(import.meta.env.FIREBASE_ADMIN_KEY_JSON || '{}');

// Inicialización de Firebase Admin
let app;
if (!getApps().length) {
	try {
		app = initializeApp({
			credential: cert(serviceAccount),
			databaseURL: import.meta.env.FIREBASE_DB_URL,
		});
	} catch (error) {
		console.error('Error al inicializar Firebase Admin:', error);
		throw error; // Esto asegura que el error sea visible
	}
} else {
	app = getApp();
	console.log('Usando instancia existente de Firebase');
}

export const db = getDatabase(app);
