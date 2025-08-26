interface TreatmentNode {
  label: string;
  description?: string[];
  children?: TreatmentNode[];
}

export const treatments: TreatmentNode[] = [
  {
    label: "Cirugia plastica",
    children: [
      {
        label: "Abdomen y Cuerpo",
        description: [
          "Procedimientos quirúrgicos que remodelan y reafirman el contorno corporal, eliminando exceso de piel y grasa para lograr una silueta más firme y armoniosa.redefinir zonas específicas con resultados naturales y duraderos.",
          "Dermolipectomía abdominal sola",
          "Dermolipectomía abdominal + lipoaspiración",
          "Dermolipectomía abdominal + lipoaspiración + lipofilling",
          "Lipoaspiración",
          "Lipoaspiración HD",
          "Lipofilling",
          "Implantes glúteos",
          "Reducción de labios menores"
        ]
      },
      {
        label: "Mamas",
        description: [
          "Procedimientos quirúrgicos diseñados para mejorar la forma, tamaño y posición de las mamas, adaptados a las necesidades y expectativas de cada paciente.",
          "Aumento mamario",
          "Reducción mamaria",
          "Pexia mamaria (levantamiento)",
          "Aumento + pexia",
          "Ginecomastia bilateral",
          "Ginecomastia unilateral"
        ]
      },
      {
        label: "Rostro",
        description: [
          "Procedimientos quirúrgicos que buscan rejuvenecer y armonizar las facciones, mejorando el contorno y la expresión natural.",
          "Lifting cervicofacial",
          "Lifting facial + blefaroplastia",
          "Minilifting facial",
          "Rinoplastia (nariz)",
          "Blefaroplastia superior /inferior",
          "Blefaroplastia completa (superior e inferior)",
          "Auriculoplastia (corrección de orejas)",
          "Lipoaspiracion de papada"
        ]
      }
    ]
  },
  {
    label: "Estética Médica",
    children: [
      {
        label: "Tratamientos Faciales",
        children: [
          {
            label: "Cuidado Profundo de la Piel",
            description: [
              "Protocolos personalizados de higiene profunda, hidratación y renovación celular.",
              "Limpiezas con extracción, microdermoabrasión, electroporación y técnicas combinadas."
            ]
          },
          {
            label: "Manchas y pigmentación",
            description: [
              "Protocolos despigmentantes personalizados que combinan tecnología y activos médicos para unificar el tono, atenuar manchas y devolver luminosidad a la piel.",
              "Tecnologia láser, IPL, peelings combinados, Dermapen con activos despigmentantes, fotobiomodulación."
            ]
          },
          {
            label: "Arrugas finas y textura irregular",
            description: [
              "Tratamientos que estimulan colágeno y regeneración celular para suavizar líneas finas y mejorar la calidad, firmeza y uniformidad de la piel.",
              "Peelings superficiales, radiofrecuencia fraccionada , mesoterapia,dermapen."
            ]
          },
          {
            label: "Hidratación y revitalización",
            description: [
              "Protocolos con activos y tecnología que nutren en profundidad, devuelven frescura, elasticidad y luminosidad a la piel.",
              "Mesoterapia facial, bioestimulación con activos regeneradores, peelings hidratantes."
            ]
          },
          {
            label: "Patologías de la piel ,Acné, cicatrices, rosacea",
            description: [
              "Tratamientos médicos personalizados que regulan, calman y reparan la piel, mejorando textura, inflamación y lesiones sin agredir.",
              "Ipl, peelings específicos, laser fraccional, Dermapen."
            ]
          },
          {
            label: "Flacidez leve y tonicidad",
            description: [
              "Tratamientos que estimulan colágeno y firmeza, mejorando la elasticidad y redefiniendo contornos de forma natural y progresiva.",
              "Radiofrecuencia, ultrasonido focalizado, tratamientos combinados."
            ]
          }
        ]
      },
      {
        label: "Tratamientos Corporales",
        children: [
          {
            label: "Celulitis y textura irregular",
            description: [
              "Protocolos corporales que mejoran la circulación, estimulan el drenaje y actúan sobre el tejido adiposo para alisar, tonificar y redefinir la piel.",
              "Radiofrecuencia, cavitación, presoterapia, mesoterapia corporal."
            ]
          },
          {
            label: "Estrías y cicatrices corporales",
            description: [
              "Tratamientos integrales que regeneran la piel, mejoran la textura y disminuyen la visibilidad de estrías y cicatrices con técnicas avanzadas.",
              "Microagujas, peelings mecánicos, láseres específicos."
            ]
          },
          {
            label: "Flacidez y tonicidad corporal",
            description: [
              "Tratamientos que estimulan colágeno y elastina para mejorar la firmeza, redefinir contornos y devolver tono a la piel del cuerpo.",
              "Radiofrecuencia,mesoterapia , ultrasonido, terapias manuales, tratamientos combinados."
            ]
          },
          {
            label: "Reducción localizada",
            description: [
              "Tratamientos que actúan sobre adiposidad localizada, modelando el contorno corporal de forma no invasiva, segura y progresiva.",
              "Radiofrecuencia, Criolipólisis, cavitación, mesoterapia."
            ]
          },
          {
            label: "Abordaje post quirurgico kinesio estético",
            description: [
              "Protocolos especializados en recuperación estética tras cirugía, que reducen edemas, mejoran cicatrices y optimizan los resultados con técnicas manuales y aparatología.",
              "Radiofrecuencia ,Criolipólisis, cavitación, mesoterapia.Drenaje post quirurgico,drenaje linfático , presoterapia, terapias de movilización circulatoria."
            ]
          },
          {
            label: "Depilacion definitiva",
            description: [
              "Tecnología láser de última generación para eliminar el vello de forma progresiva, segura y eficaz, con protocolos por zona y tipo de piel.",
              "Tecnología láser médica de alta potencia y sistemas de luz pulsada intensa (IPL)"
            ]
          }
        ]
      }
    ]
  },
  {
    label: "Mini Invasivos",
    children: [
      {
        label: "Faciales",
        children: [
          {
            label: "Arrugas y líneas de expresión",
            description: [
              " Tratamientos que suavizan pliegues, relajan la musculatura y mejoran la firmeza de la piel, logrando un rostro más descansado y natural.",
              "Toxina botulínica, tratamiento de bruxismo con toxina, softlifting preventivo.acido hialurónico."
            ]
          },
          {
            label: "Volumen y contorno facial",
            description: [
              "Tratamientos que restauran y realzan el volumen natural del rostro, definiendo contornos y armonizando proporciones para una apariencia fresca y equilibrada.",
              "Ácido hialuronico, Radiesse ( Hidroxiapatita de calcio)"
            ]
          },
          {
            label: "Rejuvenecimiento facial y revitalización",
            description: [
              "Tratamientos que nutren, hidratan y estimulan la renovación celular para devolver luminosidad, frescura y firmeza a la piel.",
              "Plasma rico en plaquetas (PRP), bioestimulación facial, mesoterapia superficial y profunda. Long Lasting, Sculptra, Harmonyca."
            ]
          },
          {
            label: "Armonización Facial Integral/full face",
            description: [
              "Abordaje estético completo y personalizado que combina técnicas para realzar la belleza propia sin transformar, respetando la identidad y expresividad de cada rostro. "
            ]
          }
        ]
      },
      {
        label: "Corporales",
        children: [
          {
            label: "Tratamientos corporales médicos",
            description: [
              "Protocolos específicos que combaten celulitis, adiposidad localizada y flacidez, mejorando la textura, firmeza y circulación de la piel corporal.",
              "Plasma rico en plaquetas (PRP), bioestimulación facial, mesoterapia superficial y profunda. Long Lasting, Sculptra, Harmonyca."
            ]
          },
          {
            label: "Tratamientos correctivos",
            description: [
              "Procedimientos especializados para corregir imperfecciones como cicatrices, lunares y tatuajes, utilizando técnicas seguras y resultados precisos.",
              "Extracción de lunares, eliminación de tatuajes, hyaluronidasa correctiva."
            ]
          },
          {
            label: "Sudoración excesiva",
            description: [
              "Tratamiento que reduce la transpiración en zonas como axilas, manos o pies mediante aplicación localizada, mejorando el confort y la calidad de vida.",
              "Toxina botulínica para hiperhidrosis axilar."
            ]
          },
          {
            label: "Bioestimulación de la piel x zona",
            description: [
              "Tratamiento no quirúrgico que aplica sustancias biocompatibles con el objetivo de estimular la producción natural de colágeno y elastina. Mejora la firmeza, elasticidad y calidad de la piel de forma progresiva.",
              "Mesoterapia, Radiensse, Long Lasting. Sculptra, meso, long lasting."
            ]
          }
        ]
      }
    ]
  }
];
