import * as React from "react";

interface ContactFormData {
  nombre: string;
  email: string;
  localidad: string;
  mensaje: string;
}

export function EmailTemplate({
  nombre,
  email,
  localidad,
  mensaje
}: ContactFormData) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px"
      }}
    >
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "30px",
          borderRadius: "10px",
          border: "1px solid #e9ecef"
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1
            style={{
              color: "#333",
              fontSize: "24px",
              margin: "0",
              fontWeight: "bold"
            }}
          >
            Nuevo Mensaje de Contacto Web
          </h1>
          <p style={{ color: "#666", fontSize: "14px", margin: "10px 0 0 0" }}>
            Has recibido una nueva consulta desde tu sitio web
          </p>
        </div>

        {/* Contact Information */}
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #dee2e6"
          }}
        >
          <h2
            style={{
              color: "#333",
              fontSize: "18px",
              margin: "0 0 20px 0",
              fontWeight: "600"
            }}
          >
            Información del Contacto
          </h2>

          <div style={{ marginBottom: "15px" }}>
            <strong style={{ color: "#495057", fontSize: "14px" }}>
              Nombre:
            </strong>
            <p
              style={{
                color: "#333",
                fontSize: "16px",
                margin: "5px 0 0 0",
                fontWeight: "500"
              }}
            >
              {nombre}
            </p>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <strong style={{ color: "#495057", fontSize: "14px" }}>
              Email:
            </strong>
            <p
              style={{
                color: "#333",
                fontSize: "16px",
                margin: "5px 0 0 0",
                fontWeight: "500"
              }}
            >
              {email}
            </p>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <strong style={{ color: "#495057", fontSize: "14px" }}>
              Localidad:
            </strong>
            <p
              style={{
                color: "#333",
                fontSize: "16px",
                margin: "5px 0 0 0",
                fontWeight: "500"
              }}
            >
              {localidad}
            </p>
          </div>
        </div>

        {/* Message */}
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "8px",
            border: "1px solid #dee2e6"
          }}
        >
          <h2
            style={{
              color: "#333",
              fontSize: "18px",
              margin: "0 0 15px 0",
              fontWeight: "600"
            }}
          >
            Mensaje
          </h2>
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "6px",
              border: "1px solid #e9ecef",
              whiteSpace: "pre-wrap",
              lineHeight: "1.6"
            }}
          >
            <p style={{ color: "#333", fontSize: "16px", margin: "0" }}>
              {mensaje}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "1px solid #dee2e6"
          }}
        >
          <p style={{ color: "#6c757d", fontSize: "12px", margin: "0" }}>
            Este mensaje fue enviado desde el formulario de contacto de tu sitio
            web
          </p>
          <p
            style={{ color: "#6c757d", fontSize: "12px", margin: "5px 0 0 0" }}
          >
            Fecha:{" "}
            {new Date().toLocaleString("es-ES", {
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
  );
}
