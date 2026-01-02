// src/services/lifeScienceConferenceService.ts
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp, orderBy, query, Timestamp } from 'firebase/firestore';
import { z } from 'zod';

export interface LifeScienceConference {
    id: string;
    heading: string;
    link: string;
    createdAt: string; // Changed to string to be serializable
}

const schema = z.object({
  heading: z.string().min(5, "Heading must be at least 5 characters."),
  link: z.string().url("Please enter a valid URL."),
});

export type LifeScienceConferenceData = z.infer<typeof schema>;

export async function addLifeScienceConference(data: LifeScienceConferenceData): Promise<{ success: boolean; message: string }> {
  try {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      return { success: false, message: validationResult.error.errors[0].message };
    }

    await addDoc(collection(db, 'lifeScienceConferences'), {
      ...validationResult.data,
      createdAt: serverTimestamp(),
    });

    return { success: true, message: 'Life Science Conference added successfully!' };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, message: `Failed to add conference: ${message}` };
  }
}

export async function getLifeScienceConferences(): Promise<LifeScienceConference[]> {
    try {
        const q = query(collection(db, "lifeScienceConferences"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            const createdAtTimestamp = data.createdAt as Timestamp;
            return {
                id: doc.id,
                heading: data.heading,
                link: data.link,
                createdAt: createdAtTimestamp?.toDate().toISOString() || new Date().toISOString(),
            } as LifeScienceConference;
        });
    } catch (error) {
        console.error("Error fetching life science conferences: ", error);
        return [];
    }
}

export async function updateLifeScienceConference(id: string, data: LifeScienceConferenceData): Promise<{ success: boolean; message: string }> {
    try {
        const validationResult = schema.safeParse(data);
        if (!validationResult.success) {
            return { success: false, message: validationResult.error.errors[0].message };
        }
        
        const conferenceRef = doc(db, 'lifeScienceConferences', id);
        await updateDoc(conferenceRef, { ...validationResult.data, updatedAt: serverTimestamp() });

        return { success: true, message: 'Life Science Conference updated successfully!' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to update conference: ${message}` };
    }
}

export async function deleteLifeScienceConference(id: string): Promise<{ success: boolean; message: string }> {
    try {
        await deleteDoc(doc(db, 'lifeScienceConferences', id));
        return { success: true, message: 'Life Science Conference deleted successfully.' };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { success: false, message: `Failed to delete conference: ${message}` };
    }
}
