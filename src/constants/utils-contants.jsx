import React from "react"

export const currentYear = new Date().getFullYear()
export const years = Array.from({ length: 4 }, (_, i) => currentYear - i)

export const currentMonth = new Date().getMonth()
export const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

// Remove this
export const groups = ["Todos", "Grupo A", "Grupo B", "Grupo C"]
export const logChartData = [
  {
    day: 1,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 2,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 3,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 4,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 5,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 6,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 7,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 8,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 9,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 10,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 11,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 12,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 13,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 14,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 15,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 16,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 17,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 18,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 19,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 20,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 21,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 22,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 23,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 24,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 25,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 26,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 27,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 28,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 29,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: 30,
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
]
