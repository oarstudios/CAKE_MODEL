import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const [randomString, setRandomString] = useState("");
  
    const generateRandomString = (length = 6) => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numbers = "0123456789";
      let result = "#";  // Start with '#'
      
      // Add two numbers at random positions
      let numCount = 0;
      while (numCount < 2) {
        const randomChar = numbers.charAt(Math.floor(Math.random() * numbers.length));
        if (!result.includes(randomChar)) {  // Ensure the number is not repeated
          result += randomChar;
          numCount++;
        }
      }
    
      // Add random letters until the string reaches the desired length
      while (result.length < length) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    
      // Ensure the result has exactly the desired length
      setRandomString(result.slice(0, length));
    };
    
  
   


  const signup = async (username, email, password, userType) => {
    setIsLoading(true);
    setError(null);
    generateRandomString();

    try {
      const response = await fetch("http://localhost:3001/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, userType }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Signup failed");
        setIsLoading(false);
        return;
      }

      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // Update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setError(false); // Indicates success
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

export default useSignup;
