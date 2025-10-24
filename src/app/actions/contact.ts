"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  nombre: string;
  email: string;
  localidad: string;
  mensaje: string;
}

/**
 * Submit contact form using Resend
 */
export async function submitContactForm(
  formData: ContactFormData
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate required fields
    if (
      !formData.nombre ||
      !formData.email ||
      !formData.localidad ||
      !formData.mensaje
    ) {
      return {
        success: false,
        message: "Todos los campos son obligatorios"
      };
    }

    console.log("📧 Sending email via Resend...");

    const { data, error } = await resend.emails.send({
      from: "contacto@centrosante.com.ar",
      to: ["santecirugia@gmail.com"],
      subject: "Mensaje desde Contacto Web",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px; border: 1px solid #e9ecef;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #333; font-size: 24px; margin: 0; font-weight: bold;">
                Nuevo Mensaje de Contacto Web
              </h1>
              <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">
                Has recibido una nueva consulta desde tu sitio web
              </p>
            </div>

            <div style="background-color: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #dee2e6;">
              <h2 style="color: #333; font-size: 18px; margin: 0 0 20px 0; font-weight: 600;">
                Información del Contacto
              </h2>

              <div style="margin-bottom: 15px;">
                <strong style="color: #495057; font-size: 14px;">Nombre:</strong>
                <p style="color: #333; font-size: 16px; margin: 5px 0 0 0; font-weight: 500;">
                  ${formData.nombre}
                </p>
              </div>

              <div style="margin-bottom: 15px;">
                <strong style="color: #495057; font-size: 14px;">Email:</strong>
                <p style="color: #333; font-size: 16px; margin: 5px 0 0 0; font-weight: 500;">
                  ${formData.email}
                </p>
              </div>

              <div style="margin-bottom: 15px;">
                <strong style="color: #495057; font-size: 14px;">Localidad:</strong>
                <p style="color: #333; font-size: 16px; margin: 5px 0 0 0; font-weight: 500;">
                  ${formData.localidad}
                </p>
              </div>
            </div>

            <div style="background-color: white; padding: 25px; border-radius: 8px; border: 1px solid #dee2e6;">
              <h2 style="color: #333; font-size: 18px; margin: 0 0 15px 0; font-weight: 600;">
                Mensaje
              </h2>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; border: 1px solid #e9ecef; white-space: pre-wrap; line-height: 1.6;">
                <p style="color: #333; font-size: 16px; margin: 0;">
                  ${formData.mensaje}
                </p>
              </div>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
              <p style="color: #6c757d; font-size: 12px; margin: 0;">
                Este mensaje fue enviado desde el formulario de contacto de tu sitio web
              </p>
              <p style="color: #6c757d; font-size: 12px; margin: 5px 0 0 0;">
                Fecha: ${new Date().toLocaleString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            </div>
          </div>
        </div>
      `
    });

    if (error) {
      console.error("Resend error:", error);
      console.error("Full error details:", JSON.stringify(error, null, 2));
      return {
        success: false,
        message:
          "Error al enviar el email. Por favor, inténtalo de nuevo o comunícate por WhatsApp."
      };
    }

    console.log("✅ Email sent successfully:", data);

    return {
      success: true,
      message:
        "¡Gracias por tu mensaje! Hemos recibido tu consulta y te responderemos pronto."
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      message:
        "Error de conexión. Por favor, inténtalo de nuevo o comunícate por WhatsApp."
    };
  }
}
