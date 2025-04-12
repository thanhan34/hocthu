import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from './config';
import { RegistrationFormData } from '../utils/validationSchema';

// Collection reference
const registrationsRef = collection(db, 'hoc_thu_dang_ky');

// Define a type for Firebase timestamp
export interface FirebaseTimestamp {
  toDate: () => Date;
}

// Define a type for the registration data with metadata when creating
export interface RegistrationWithMetadata extends RegistrationFormData {
  submitTime: ReturnType<typeof serverTimestamp>;
  deviceType: string;
  id?: string;
}

// Define a type for the registration data as stored in Firestore
export interface StoredRegistration extends Omit<RegistrationFormData, 'submitTime'> {
  id: string;
  submitTime: FirebaseTimestamp | string | number | Date;
  deviceType: string;
  [key: string]: unknown;
}

// Add a new registration
export const addRegistration = async (data: RegistrationFormData) => {
  try {
    // Add timestamp and device type
    const deviceType = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? 'mobile'
      : 'desktop';

    const dataWithMetadata = {
      ...data,
      submitTime: serverTimestamp(),
      deviceType,
    };

    const docRef = await addDoc(registrationsRef, dataWithMetadata);
    return { id: docRef.id, ...dataWithMetadata };
  } catch (error) {
    console.error('Error adding registration: ', error);
    throw error;
  }
};

// Get all registrations
export const getRegistrations = async () => {
  try {
    const q = query(registrationsRef, orderBy('submitTime', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting registrations: ', error);
    throw error;
  }
};

// Update a registration
export const updateRegistration = async (id: string, data: Partial<StoredRegistration>) => {
  try {
    const docRef = doc(db, 'hoc_thu_dang_ky', id);
    await updateDoc(docRef, data);
    return { id, ...data };
  } catch (error) {
    console.error('Error updating registration: ', error);
    throw error;
  }
};

// Delete a registration
export const deleteRegistration = async (id: string) => {
  try {
    const docRef = doc(db, 'hoc_thu_dang_ky', id);
    await deleteDoc(docRef);
    return id;
  } catch (error) {
    console.error('Error deleting registration: ', error);
    throw error;
  }
};
