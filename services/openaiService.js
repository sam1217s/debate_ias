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
    
    const fullPrompt = `${prompt}

CONTEXTO DEL DEBATE PREVIO:
${context}

INSTRUCCIONES CRÍTICAS:
- Analiza lo que dijo el oponente y RESPONDE DIRECTAMENTE a sus argumentos, contrarrestándolos con tus propios puntos
- NO repitas lo que el oponente dijo, usa TUS PROPIAS PALABRAS y perspectiva
- Crea una RESPUESTA DEBATE REAL: refuta, presenta nuevos argumentos o evidencia diferente
- Mantén tu posición (pro o contra edición genética) pero con argumentos NUEVOS y ÚNICOS
- Sé específico, usa ejemplos concretos o datos cuando sea posible
- Evita frases genéricas como "estoy de acuerdo" o "tienes razón"
- Máximo 60 palabras, sin introducciones ni despedidas
- Escribe como si estuvieras en un debate en vivo, defendiendo tu postura`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "Eres un experto debatiendo. Tu objetivo es refutar argumentos del oponente con puntos nuevos, evidencia diferente y perspectivas únicas. NUNCA repitas lo que el otro dijo, usa TUS PROPIAS palabras y TUS PROPIOS argumentos. Responde como si fuera un debate real donde debes defender tu posición con argumentos originales." 
        },
        { role: "user", content: fullPrompt }
      ],
      temperature: 0.85,
      max_tokens: 200
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