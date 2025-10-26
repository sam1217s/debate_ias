import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const apiKey = process.env.OPENAI_API_KEY;
let openai;

if (apiKey) {
  openai = new OpenAI({
    apiKey: apiKey
  });
  console.log('✅ OpenAI API inicializada correctamente');
} else {
  console.warn('⚠️ Advertencia: No se encontró OPENAI_API_KEY en .env');
}

export const generateDebateResponse = async (prompt, context) => {
  try {
    
    const fullPrompt = `
${prompt}

Contexto actual del debate:
${context}

Instrucciones:
- Proporciona una respuesta bien argumentada en español
- Mantén el personaje y su estilo comunicativo (vocabulario, tono, nivel de análisis)
- Responde directamente al tema en discusión sin repetir el contexto
- Sé persuasivo, claro y fiel al enfoque filosófico o científico del personaje
- Evita ambigüedades y exageraciones; prioriza la precisión conceptual
- Utiliza un lenguaje accesible sin simplificar en exceso
- Limita tu respuesta a un máximo de 50 palabras
- No incluyas introducciones, despedidas ni frases genéricas
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Eres un experto en debate que responde de manera concisa y argumentativa." },
        { role: "user", content: fullPrompt }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error con OpenAI API:', {
      message: error.message,
      status: error.status,
      stack: error.stack
    });
    throw new Error('Error al generar la respuesta del debate');
  }
};