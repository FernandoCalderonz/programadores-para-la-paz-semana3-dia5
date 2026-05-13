const http = require("http")

const datos = "Publicar avisos comunitarios con lenguaje claros."

const opciones = {
  hostname: "localhost",
  port: 2005,
  path: "/propuestas",
  method: "POST",
  headers: {
    "Content-Type": "text/plain; charset=utf-8",
    "Content-Length": Buffer.byteLength(datos)
  }
}

const solicitud = http.request(opciones, (respuesta) => {
  let cuerpoRespuesta = ""

  respuesta.on("data", (parte) => {
    cuerpoRespuesta = cuerpoRespuesta + parte
  })

  respuesta.on("end", () => {
    console.log("Respuesta del servidor:")
    console.log(cuerpoRespuesta)
  })
})

solicitud.on("error", (error) => {
  console.log("No se pudo enviar la solicitud POST.")
  console.log("Verifica que el servidor esté funcionando con npm start.")
  console.log("Detalle del error:", error.message)
})

solicitud.write(datos)
solicitud.end()
