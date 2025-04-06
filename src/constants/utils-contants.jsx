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
    day: "abr 1",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 2",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 3",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 4",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 5",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 6",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 7",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 8",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 9",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 10",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 11",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 12",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 13",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 14",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 15",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 16",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 17",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 18",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 19",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 20",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 21",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 22",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 23",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 24",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 25",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 26",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 27",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 28",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 29",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
  {
    day: "abr 30",
    agenteA: Math.floor(Math.random() * 6),
    agenteB: Math.floor(Math.random() * 6),
    agenteC: Math.floor(Math.random() * 6),
  },
]
