import PDFDocument from 'pdfkit';
import { generateDebateResponse } from '../services/openaiService.js';
import Debate from '../models/Debate.js';

const EXPERTS = {
  pro: {
    name: "George Church",
    prompt: `Eres George Church, genetista visionario. DEFIENDES la edición genética CRISPR. Tu misión: refutar a quien critique la edición genética con argumentos NUEVOS cada vez. Usa ejemplos: curar enfermedades hereditarias, seguridad alimentaria, conservación de especies. SE ESPECÍFICO con datos o casos reales. NO repitas argumentos ya usados. CONTRASTÁ los temores con evidencia científica. Límite: 60 palabras, español.`
  },
  against: {
    name: "Francis Fukuyama",
    prompt: `Eres Francis Fukuyama, filósofo crítico de la biotecnología. DEFIENDES las preocupaciones éticas sobre edición genética. Tu misión: criticar y cuestionar cada argumento a favor con perspectivas NUEVAS. Argumenta sobre: inequidad, sociedades divididas entre mejorados y no-mejorados, pérdida de diversidad humana, riesgos de eugenesia. SE ESPECÍFICO con problemas concretos. NO repitas argumentos ya usados. Límite: 60 palabras, español.`
  }
};

// Obtener el historial del debate
export const getDebateHistory = async (req, res) => {
  try {
    const history = await Debate.find().sort({ createdAt: 1 });
    res.status(200).json({
      success: true,  
      data: history
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener historial",
      error: error.message
    });
  }
};

// Añadir respuesta de experto
export const addExpertResponse = async (req, res) => {
  const { type } = req.params;
  const expert = EXPERTS[type];

  if (!expert) {
    return res.status(400).json({
      success: false,
      message: "Tipo de experto no válido"
    });
  }

  try {
    const history = await Debate.find().sort({ createdAt: 1 });
    const context = history.map(msg => `${msg.speaker}: ${msg.message}`).join('\n');

    const response = await generateDebateResponse(expert.prompt, context);

    const newMessage = await Debate.create({
      speaker: expert.name,
      message: response,
      role: type
    });

    res.status(201).json({
      success: true,
      data: newMessage
    });
  } catch (error) {
    console.error('Error en addExpertResponse:', error);
    res.status(500).json({
      success: false,
      message: "Error al generar respuesta",
      error: error.message
    });
  }
};

// Limpiar el historial
export const clearHistory = async (req, res) => {
  try {
    await Debate.deleteMany({});
    res.json({
      success: true,
      message: 'Historial limpiado correctamente'
    });
  } catch (error) {
    console.error('Error al limpiar historial:', error);
    res.status(500).json({
      success: false,
      message: 'Error al limpiar historial',
      error: error.message
    });
  }
};

// Exportar a PDF pdfkit
export const exportToPDF = async (req, res) => {
  try {
    const history = await Debate.find().sort({ createdAt: 1 });

    const doc = new PDFDocument();
    const filename = `debate_${new Date().toISOString().split('T')[0]}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    doc.pipe(res);

    doc.fontSize(20)
      .font('Helvetica-Bold')
      .text('Historial del Debate', { align: 'center' });

    doc.moveDown(0.5);
    doc.fontSize(10)
      .font('Helvetica')
      .text(`Generado el: ${new Date().toLocaleString()}`, { align: 'center' });

    doc.moveDown(1);

    history.forEach((msg, index) => {
      if (msg.role === 'moderator') {
        doc.fontSize(14)
          .fillColor('#333333')
          .text(msg.message, { align: 'center' });
      } else {
        const color = msg.role === 'pro' ? '#4CAF50' : '#F44336';
        doc.fontSize(12)
          .fillColor(color)
          .text(`${msg.speaker}:`, { continued: true })
          .fillColor('#333333')
          .text(` ${msg.message}`);

        doc.fontSize(8)
          .fillColor('#666666')
          .text(`Enviado el: ${new Date(msg.createdAt).toLocaleString()}`);
      }

      doc.moveDown(0.5);
      if (index < history.length - 1) {
        doc.moveTo(50, doc.y)
          .lineTo(550, doc.y)
          .strokeColor('#cccccc')
          .stroke();
        doc.moveDown(0.5);
      }
    });

    doc.end();

  } catch (error) {
    console.error('Error al generar PDF:', error);
    res.status(500).json({
      success: false,
      message: 'Error al generar PDF',
      error: error.message
    });
  }
};