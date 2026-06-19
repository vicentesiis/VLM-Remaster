export const initUserMocks = (mock) => {
  // 1. GET /users/me
  mock.onGet("/users/me").reply((config) => {
    console.log("[Mock] GET /users/me")
    return [
      200,
      {
        data: {
          id: "mock-user-123",
          email: "admin@northentry.com",
          name: "Administrador Mock",
          role: "super_admin",
          agent_type: "leader",
          group: "Grupo A",
        },
      },
    ]
  })

  // 2. GET /users/user
  mock.onGet("/users/user").reply(() => {
    console.log("[Mock] GET /users/user")
    return [
      200,
      {
        data: {
          id: "mock-user-123",
          email: "admin@northentry.com",
          name: "Administrador Mock",
          role: "super_admin",
          agent_type: "leader",
          group: "Grupo A",
        },
      },
    ]
  })

  // 3. GET /stats/dashboard
  mock.onGet("/stats/dashboard").reply(() => {
    console.log("[Mock] GET /stats/dashboard")
    return [
      200,
      {
        data: {
          group_monthly_sales: 125000000, // in cents (e.g. $1,250,000.00)
          personal_goals: {
            tokens: 45,
            to_payoff: 18000000, // in cents
            monthly_sales: 32000000, // in cents
          },
          top_sellers: [
            { name: "Sofía Rodríguez", username: "sofia.r", total_sales: 45000000 },
            { name: "Carlos Mendoza", username: "carlos.m", total_sales: 38000000 },
            { name: "Ana Gómez", username: "ana.g", total_sales: 35000000 },
          ],
          program_pricing: [
            { program_name: "program_a", price: 150000, price_local: 2700000, currency: "MXN" },
            { program_name: "program_a", price: 150000, price_local: 600000000, currency: "COP" },
            { program_name: "program_b", price: 250000, price_local: 4500000, currency: "MXN" },
            { program_name: "program_b", price: 250000, price_local: 1000000000, currency: "COP" },
            { program_name: "program_c", price: 400000, price_local: 7200000, currency: "MXN" },
            { program_name: "program_c", price: 400000, price_local: 1600000000, currency: "COP" },
          ],
          exchange_rates: [
            { currency: "MXN", rate_to_usd: 18.0 },
            { currency: "COP", rate_to_usd: 4000.0 },
            { currency: "BRL", rate_to_usd: 5.5 },
          ],
        },
      },
    ]
  })

  // 4. GET /reports/my-potential-sales
  mock.onGet("/reports/my-potential-sales").reply(() => {
    console.log("[Mock] GET /reports/my-potential-sales")
    return [
      200,
      {
        total_amount: 14500000, // in cents
      },
    ]
  })

  // 5. GET /users/users (List of users)
  mock.onGet(/\/users\/users.*/).reply(() => {
    console.log("[Mock] GET /users/users")
    return [
      200,
      {
        data: [
          { id: "mock-user-123", name: "Administrador Mock", email: "admin@northentry.com", role: "super_admin", agent_type: "leader", group: "Grupo A", active: true },
          { id: "mock-user-2", name: "Sofía Rodríguez", email: "sofia@northentry.com", role: "agent", agent_type: "agent", group: "Grupo A", active: true },
          { id: "mock-user-3", name: "Carlos Mendoza", email: "carlos@northentry.com", role: "agent", agent_type: "agent", group: "Grupo B", active: true },
        ],
      },
    ]
  })

  // 6. GET /jobs/jobs
  mock.onGet(/\/jobs\/jobs.*/).reply(() => {
    console.log("[Mock] GET /jobs/jobs")
    return [
      200,
      {
        data: [
          { id: "job-1", title: "Software Engineer", category: "technology", country: "Mexico", status: "active" },
          { id: "job-2", title: "Product Manager", category: "product", country: "Colombia", status: "active" },
        ],
      },
    ]
  })

  // 7. GET /records/records and /records/records_by_user
  const handleRecordsRequest = (config) => {
    console.log("[Mock] GET records requested with params:", config.params)
    return [
      200,
      {
        total: 2,
        data: [
          {
            id: "rec-1",
            public_id: "rec-pub-1",
            searchable_id: "rec-1",
            name: "Juan Pérez",
            status: "lead",
            email: "juan@example.com",
            phone: "+521234567890",
            created_at: "2026-06-10T12:00:00Z",
            updated_at: "2026-06-18T18:00:00Z",
            assignment_date: "2026-06-11T12:00:00Z",
            record_type: "lead",
            channel: "facebook",
            program: "program_a",
            amount_owed_local: 2700000, // $27,000.00 MXN in cents
            amount_owed: 150000, // $1,500.00 USD in cents
            currency: "MXN",
            comments: "Interesado en vacante de ingeniería, pendiente de validación.",
          },
          {
            id: "rec-2",
            public_id: "rec-pub-2",
            searchable_id: "rec-2",
            name: "María López",
            status: "prospect",
            email: "maria@example.com",
            phone: "+521234567891",
            created_at: "2026-06-11T14:30:00Z",
            updated_at: "2026-06-17T09:15:00Z",
            assignment_date: "2026-06-12T10:00:00Z",
            record_type: "prospect",
            channel: "whatsapp",
            program: "program_b",
            amount_owed_local: 4500000, // $45,000.00 MXN in cents
            amount_owed: 250000, // $2,500.00 USD in cents
            currency: "MXN",
            comments: "Habló por WhatsApp, solicita facilidades de pago.",
          },
        ],
      },
    ]
  }

  mock.onGet(/\/records\/records.*/).reply(handleRecordsRequest)
  mock.onGet(/\/records\/records_by_user.*/).reply(handleRecordsRequest)

  // 8. GET /groups/all
  mock.onGet("/groups/all?with_members=true").reply(() => {
    console.log("[Mock] GET /groups/all")
    return [
      200,
      {
        data: [
          { id: "group-a", name: "Grupo A", leader: { name: "Administrador Mock" } },
          { id: "group-b", name: "Grupo B", leader: { name: "Carlos Mendoza" } },
        ],
      },
    ]
  })

  // ===== CODEX MOCKS =====
  mock.onGet("/codex/record-statuses").reply(() => {
    console.log("[Mock] GET /codex/record-statuses")
    return [
      200,
      {
        data: [
          { id: "lead", name: "Lead" },
          { id: "prospect", name: "Prospecto" },
          { id: "client", name: "Cliente" },
          { id: "finalized", name: "Finalizado" },
        ],
      },
    ]
  })

  mock.onGet("/codex/record-types").reply(() => {
    console.log("[Mock] GET /codex/record-types")
    return [
      200,
      {
        data: [
          { id: "lead", name: "Lead" },
          { id: "prospect", name: "Prospecto" },
        ],
      },
    ]
  })

  mock.onGet("/codex/programs").reply(() => {
    console.log("[Mock] GET /codex/programs")
    return [
      200,
      {
        data: [
          { id: "program_a", name: "Programa A" },
          { id: "program_b", name: "Programa B" },
          { id: "program_c", name: "Programa C" },
        ],
      },
    ]
  })

  mock.onGet("/codex/channels").reply(() => {
    console.log("[Mock] GET /codex/channels")
    return [
      200,
      {
        data: [
          { id: "facebook", name: "Facebook" },
          { id: "instagram", name: "Instagram" },
          { id: "whatsapp", name: "WhatsApp" },
          { id: "telegram", name: "Telegram" },
          { id: "tiktok", name: "TikTok" },
          { id: "email", name: "Correo" },
          { id: "phone", name: "Teléfono" },
          { id: "web", name: "Web" },
          { id: "other", name: "Otro" },
        ],
      },
    ]
  })

  mock.onGet("/codex/nationalities").reply(() => {
    console.log("[Mock] GET /codex/nationalities")
    return [
      200,
      {
        data: [
          { id: "mexicana", name: "Mexicana" },
          { id: "colombiana", name: "Colombiana" },
          { id: "argentina", name: "Argentina" },
        ],
      },
    ]
  })

  mock.onGet("/codex/mexico-states").reply(() => {
    console.log("[Mock] GET /codex/mexico-states")
    return [
      200,
      {
        data: [
          { id: "NL", name: "Nuevo León" },
          { id: "CDMX", name: "CDMX" },
          { id: "JAL", name: "Jalisco" },
        ],
      },
    ]
  })

  mock.onGet("/codex/roles").reply(() => {
    console.log("[Mock] GET /codex/roles")
    return [
      200,
      {
        data: [
          { id: "super_admin", name: "Super Admin" },
          { id: "admin", name: "Admin" },
          { id: "agent", name: "Agente" },
        ],
      },
    ]
  })

  mock.onGet("/codex/agent_types").reply(() => {
    console.log("[Mock] GET /codex/agent_types")
    return [
      200,
      {
        data: [
          { id: "leader", name: "Líder" },
          { id: "agent", name: "Agente" },
        ],
      },
    ]
  })

  mock.onGet("/codex/job-categoies").reply(() => {
    console.log("[Mock] GET /codex/job-categoies")
    return [
      200,
      {
        data: [
          { id: "technology", name: "Tecnología" },
          { id: "product", name: "Producto" },
        ],
      },
    ]
  })

  mock.onGet("/codex/country-states").reply(() => {
    console.log("[Mock] GET /codex/country-states")
    return [
      200,
      {
        MX: [
          { id: "NL", name: "Nuevo León" },
          { id: "CDMX", name: "CDMX" },
        ],
        CO: [
          { id: "DC", name: "Bogotá D.C." },
          { id: "ANT", name: "Antioquia" },
        ],
      },
    ]
  })

  // Fallback for reports, cut-off etc.
  mock.onGet(/\/reports\/collections\/.*/).reply(() => [200, { data: [] }])
  mock.onGet(/\/reports\/cut-off.*/).reply(() => [200, { data: [] }])
  mock.onGet(/\/reports\/tasks.*/).reply(() => [200, { data: [] }])
  mock.onGet(/\/orders\/.*/).reply(() => [200, { data: [] }])
}
