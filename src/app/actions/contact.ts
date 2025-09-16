"use server";

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          localidad: formData.localidad,
          mensaje: formData.mensaje
        })
      }
    );

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error("Failed to parse response as JSON:", parseError);
      return {
        success: false,
        message:
          "Error al procesar la respuesta del servidor. Por favor, inténtalo de nuevo o comunícate por WhatsApp."
      };
    }

    if (!response.ok) {
      return {
        success: false,
        message:
          data?.error ||
          "Error al enviar el formulario. Por favor, inténtalo de nuevo o comunícate por WhatsApp."
      };
    }

    return {
      success: true,
      message:
        data.message ||
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
