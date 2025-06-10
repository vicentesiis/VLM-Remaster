export const nameField = () => ({
  name: "name",
  label: "Nombre Completo",
  type: "input",
  placeholder: "Nombre completo",
})

export const emailField = () => ({
  name: "email",
  label: "Email",
  type: "input",
  placeholder: "ejemplo@correo.com",
})

export const phoneField = () => ({
  name: "phone",
  label: "Teléfono",
  type: "input",
  maxLength: 10,
  numericOnly: true,
  placeholder: "Número de teléfono (10 dígitos)",
})

export const dateOfBirthField = () => ({
  name: "date_of_birth",
  label: "Fecha de Nacimiento",
  type: "date",
  placeholder: "Selecciona la fecha de nacimiento",
})

export const nationalityField = (options) => ({
  name: "nationality",
  label: "Nacionalidad",
  type: "autocomplete",
  options,
  placeholder: "Selecciona una nacionalidad",
})

export const stateField = (options) => ({
  name: "state",
  label: "Estado",
  type: "autocomplete",
  options,
  placeholder: "Selecciona un estado",
})

export const passportField = () => ({
  name: "passport",
  label: "Pasaporte",
  type: "input",
  placeholder: "Ej. G20693408",
})

export const curpField = () => ({
  name: "curp",
  label: "CURP",
  type: "input",
  placeholder: "Ej. RASC050729MMCSHNA2",
})

export const jobField = () => ({
  name: "job",
  label: "ID de la Vacante",
  type: "input",
  placeholder: "Ingresa el ID de la vacante",
})

export const programField = (options) => ({
  name: "program",
  label: "Programa",
  type: "autocomplete",
  options,
  placeholder: "Selecciona el programa",
})

export const channelField = (options) => ({
  name: "channel",
  label: "Canal de Captación",
  type: "autocomplete",
  options,
  placeholder: "Selecciona el canal de captación",
})

export const commentsField = () => ({
  name: "comments",
  label: "Comentarios",
  type: "textarea",
  placeholder: "Comentarios...",
})
