export const handleSpeak = (text:string) => {
  if ('speechSynthesis' in window) {
    const message = new SpeechSynthesisUtterance();
    message.text = text;

    // Obtener todas las voces disponibles
    const voices = window.speechSynthesis.getVoices();

    // Filtrar y seleccionar la voz en español de América Latina
    const spanishVoiceLatino = voices.find((voice) => voice.lang === 'es-LA' || voice.lang === 'es-MX' || voice.lang === 'es-419');
    const spanishVoiceSpain = voices.find((voice) => voice.lang === 'es-ES');

    // Usar la voz en español de América Latina si está disponible, de lo contrario, usar la voz en español de España
    if (spanishVoiceLatino) {
      message.voice = spanishVoiceLatino;
    } else if (spanishVoiceSpain) {
      message.voice = spanishVoiceSpain;
    } else {
      console.log('Voz en español no encontrada.');
    }

    window.speechSynthesis.speak(message);
  }
};