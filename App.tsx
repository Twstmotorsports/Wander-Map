// App.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { auth, db } from './src/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import HomeApp from './home';

export default function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleOpenAuth = () => {
    setShowAuth(true);
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setErrorMessage('Email and password are required.');
      return;
    }

    if (authMode === 'signup' && trimmedPassword !== confirmPassword.trim()) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      setIsSubmitting(true);

      if (authMode === 'signup') {
        const cred = await createUserWithEmailAndPassword(
          auth,
          trimmedEmail,
          trimmedPassword
        );

        const user = cred.user;

        // Create a document in `users` collection for this new account
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email ?? trimmedEmail,
          createdAt: serverTimestamp(),
        });

        setSuccessMessage('Account created. You are now signed in.');
        setIsAuthenticated(true);
      } else {
        await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
        setSuccessMessage('Logged in successfully.');
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      setErrorMessage(error?.message ?? 'Authentication error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // After login/sign-up, show the main Wander-Map app from home.tsx
  if (isAuthenticated) {
    return <HomeApp />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={handleOpenAuth}
          activeOpacity={0.8}
        >
          <MaterialIcons name="map" size={48} color="#4f46e5" />
        </TouchableOpacity>

        <Text style={styles.title}>Wander-Map</Text>
        <Text style={styles.subtitle}>
          Plan your trips and travel guides in one place
        </Text>
      </View>

      {showAuth && (
        <View style={styles.authCard}>
          <View style={styles.authTabs}>
            <TouchableOpacity
              style={[
                styles.authTab,
                authMode === 'login' && styles.authTabActive,
              ]}
              onPress={() => setAuthMode('login')}
            >
              <Text
                style={[
                  styles.authTabText,
                  authMode === 'login' && styles.authTabTextActive,
                ]}
              >
                Log in
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.authTab,
                authMode === 'signup' && styles.authTabActive,
              ]}
              onPress={() => setAuthMode('signup')}
            >
              <Text
                style={[
                  styles.authTabText,
                  authMode === 'signup' && styles.authTabTextActive,
                ]}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {authMode === 'signup' && (
              <TextInput
                style={styles.input}
                placeholder="Confirm password"
                placeholderTextColor="#9ca3af"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            )}

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.primaryButtonText}>
                  {authMode === 'login' ? 'Log in' : 'Create account'}
                </Text>
              )}
            </TouchableOpacity>

            {errorMessage && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
            {successMessage && (
              <Text style={styles.successText}>{successMessage}</Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#4f46e5',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7c3aed',
    textAlign: 'center',
  },
  authCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  authTabs: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 999,
    padding: 4,
    marginBottom: 16,
  },
  authTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
  },
  authTabActive: {
    backgroundColor: '#4f46e5',
  },
  authTabText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  authTabTextActive: {
    color: '#ffffff',
  },
  form: {
    gap: 10,
  },
  input: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: '#ffffff',
  },
  primaryButton: {
    marginTop: 8,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  errorText: {
    marginTop: 8,
    color: '#dc2626',
    fontSize: 13,
    textAlign: 'center',
  },
  successText: {
    marginTop: 8,
    color: '#16a34a',
    fontSize: 13,
    textAlign: 'center',
  },
});