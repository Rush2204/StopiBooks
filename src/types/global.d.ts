// src/types/global.d.ts

interface Window {
  webkitSpeechRecognition: typeof SpeechRecognition;
  SpeechRecognition: typeof SpeechRecognition;
}

// Definición de la variable global
declare var webkitSpeechRecognition: typeof SpeechRecognition;

// Definición del resultado del reconocimiento de voz
interface SpeechRecognitionResult {
  transcript: string; // La transcripción del reconocimiento
  confidence: number; // La confianza en la transcripción
}

// Lista de resultados del reconocimiento de voz
interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
}

// Definición del evento de reconocimiento de voz
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList; // Lista de resultados
}

// Definición del error de reconocimiento de voz
interface SpeechRecognitionError extends Event {
  error: string; // El tipo de error
  message: string; // Mensaje relacionado con el error
}

// Definiciones adicionales de SpeechRecognition, si es necesario
interface SpeechRecognition {
  // Aquí puedes agregar otros métodos y propiedades relevantes que necesites
}
