type TRoute = {
  href?: string;
  as?: string;
  icon?: React.ReactChild;
  text: string;
  isCollapsible?: boolean;
  privilege?: number;
  subLinks?: Array<{
    href: string;
    as: string;
    text: string;
  }>;
};

const routes: Array<TRoute> = [
  {
    text: 'Inicio',
    href: '/app',
    as: '/app',
    isCollapsible: false,
    privilege: 3,
    icon: (
      <svg
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5 mr-1"
      >
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    text: 'Usuarios',
    href: '/app/users',
    as: '/app/users',
    isCollapsible: false,
    privilege: 1,
    icon: (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="mr-1 w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    text: 'Clientes',
    href: '/app/clients',
    as: '/app/clients',
    isCollapsible: false,
    privilege: 3,
    icon: (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="mr-1 w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    text: 'Mantenimiento',
    isCollapsible: true,
    privilege: 1,
    icon: (
      <svg
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5 mr-1"
      >
        <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    subLinks: [
      {
        text: 'Áreas',
        href: '/app/areas',
        as: '/app/areas',
      },
    ],
  },
];

export default routes;
