const functions = require('firebase-functions');

const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

/* AUTH FUNCTIONS */
exports.onUserCreation = functions.auth.user().onCreate((user) => {
	const uid = user.uid;

	return db.collection('users').doc(uid).set({codes: []});
});

exports.onUserDeletion = functions.auth.user().onDelete((user) => {
	const uid = user.uid;

	// TODO: also delete all of user's team entries
	return db.collection('users').doc(uid).delete();
});
