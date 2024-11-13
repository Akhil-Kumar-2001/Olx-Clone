import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";


// Define the shape of FirebaseContext values
interface FirebaseContextType {
    isAuthenticated: boolean;  // true if user is logged in, false otherwise
    
}

// Create the FirebaseContext with an undefined default value
const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

// FirebaseProvider component to wrap around parts of the app that need Firebase context
export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Subscribe to auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser);
            setIsAuthenticated(!!currentUser); // true if user exists, false otherwise
            setLoading(false);
        });
        
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;  // Show loading indicator while waiting for Firebase state
      }

    return (
        <FirebaseContext.Provider value={{ isAuthenticated }}>
            {children}
        </FirebaseContext.Provider>
    );
};

// Custom hook for accessing FirebaseContext
export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error("useFirebase must be used within a FirebaseProvider");
    }
    return context;
};

// Optional: Export FirebaseContext if needed directly for testing or debugging
export { FirebaseContext };
