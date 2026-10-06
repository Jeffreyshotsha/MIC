/**
 * Icon set — inline SVG, no external dependency.
 * All icons accept the same props (className, title) and render at 24×24.
 */
/* oxlint-disable react/only-export-components -- icon map / context helpers */

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

const make = (paths) =>
  function Icon({ className = 'size-5', ...rest }) {
    return (
      <svg {...base} className={className} {...rest}>
        {paths}
      </svg>
    )
  }

export const ArrowRight = make(
  <>
    <path d="M5 12h14" />
    <path d="m13 5 7 7-7 7" />
  </>
)

export const ArrowLeft = make(
  <>
    <path d="M19 12H5" />
    <path d="m11 19-7-7 7-7" />
  </>
)

export const ArrowUpRight = make(
  <>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </>
)

export const ChevronDown = make(<path d="m6 9 6 6 6-6" />)

export const ArrowUp = make(
  <>
    <path d="M12 20V4" />
    <path d="m5 11 7-7 7 7" />
  </>
)
export const ChevronRight = make(<path d="m9 6 6 6-6 6" />)

export const Menu = make(
  <>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </>
)

export const Close = make(
  <>
    <path d="M6 6 18 18" />
    <path d="m18 6-12 12" />
  </>
)

export const Check = make(<path d="m5 13 4 4L19 7" />)

export const CheckCircle = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </>
)

export const AlertCircle = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5" />
    <path d="M12 16.5h.01" />
  </>
)

export const Quote = make(
  <>
    <path
      d="M9 7c-2.2 0-4 1.8-4 4 0 2 1.5 3.5 3.5 3.5.3 0 .6 0 .8-.1-.4 1.6-1.6 2.7-3 3.1v1.6c2.9-.6 4.9-2.8 4.9-5.9V11c0-2.2-1-4-2.2-4Z"
      fill="currentColor"
      stroke="none"
    />
    <path
      d="M19 7c-2.2 0-4 1.8-4 4 0 2 1.5 3.5 3.5 3.5.3 0 .6 0 .8-.1-.4 1.6-1.6 2.7-3 3.1v1.6c2.9-.6 4.9-2.8 4.9-5.9V11c0-2.2-1-4-2.2-4Z"
      fill="currentColor"
      stroke="none"
    />
  </>
)

export const Sparkles = make(
  <>
    <path d="M12 3.5 13.6 8 18 9.6 13.6 11.2 12 15.6 10.4 11.2 6 9.6 10.4 8 12 3.5Z" />
    <path d="M18.5 15.5 19.4 18l2.1.9-2.1.9-.9 2.2-.9-2.2-2.1-.9 2.1-.9.9-2.5Z" />
    <path d="M5.5 14.5 6.1 16l1.6.7-1.6.7-.6 1.6-.6-1.6-1.6-.7 1.6-.7.6-1.5Z" />
  </>
)

export const Users = make(
  <>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19.5c.6-3.1 2.9-5 5.5-5s4.9 1.9 5.5 5" />
    <path d="M16 5.4a3.2 3.2 0 0 1 0 5.2" />
    <path d="M17.6 14.9c1.6.8 2.6 2.4 2.9 4.6" />
  </>
)

export const User = make(
  <>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.8 20c.7-3.5 3.5-5.5 7.2-5.5s6.5 2 7.2 5.5" />
  </>
)

export const Shield = make(
  <>
    <path d="M12 3.2 5 5.8v5.4c0 4.3 2.9 7.6 7 9.6 4.1-2 7-5.3 7-9.6V5.8L12 3.2Z" />
    <path d="m9.2 12 2 2 3.6-4" />
  </>
)

export const Heart = make(
  <path d="M12 20s-7-4.3-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.7-7 9-7 9Z" />
)

export const HandHeart = make(
  <>
    <path d="M11 9.5 8.6 7a1.9 1.9 0 0 0-2.7 2.7l5 5.6" />
    <path d="M13 9.5 15.4 7a1.9 1.9 0 0 1 2.7 2.7l-4 4.4" />
    <path d="M8.9 15.3 7 17.2A2.6 2.6 0 0 0 8.6 21h.6a5 5 0 0 0 4-2l4.9-6.1" />
  </>
)

export const Megaphone = make(
  <>
    <path d="M4 10.5v3a1.5 1.5 0 0 0 1.5 1.5H8l8 4.5V6.5L8 11H5.5A1.5 1.5 0 0 0 4 12.5Z" />
    <path d="M8 15v3.5a1.5 1.5 0 0 0 1.5 1.5H10" />
    <path d="m19 9 2 6" />
  </>
)

export const Graduation = make(
  <>
    <path d="M2.8 8.5 12 4.2l9.2 4.3L12 12.8 2.8 8.5Z" />
    <path d="M6.5 10.6v4.6c0 1.6 2.5 2.9 5.5 2.9s5.5-1.3 5.5-2.9v-4.6" />
    <path d="M21.2 8.5v5" />
  </>
)

export const Leaf = make(
  <>
    <path d="M20 4c0 8-5 12-11 12a5.5 5.5 0 0 1 0-11c5 0 8-1 11-1Z" />
    <path d="M4.5 20C7 16 11 13.5 15.5 12" />
  </>
)

export const Scale = make(
  <>
    <path d="M12 4v16" />
    <path d="M6 20h12" />
    <path d="M4 8h16" />
    <path d="M4 8 1.8 13.2a2.6 2.6 0 0 0 4.4 0L4 8Z" />
    <path d="m20 8-2.2 5.2a2.6 2.6 0 0 0 4.4 0L20 8Z" />
    <circle cx="12" cy="5" r="1.4" />
  </>
)

export const MessageCircle = make(
  <>
    <path d="M20.5 11.5c0 4.4-3.8 8-8.5 8a9.6 9.6 0 0 1-2.6-.35L4.2 20.8l1.3-3.7A7.7 7.7 0 0 1 3.5 11.5c0-4.4 3.8-8 8.5-8s8.5 3.6 8.5 8Z" />
  </>
)

export const Handshake = make(
  <>
    <path d="m11 8-2.2 2.2a2 2 0 0 0 2.8 2.8L13 11.6" />
    <path d="m6 12 4.5 4.5a1.6 1.6 0 0 0 2.3 0L19 10.8" />
    <path d="M3 10.5 6.5 7l4 1.5" />
    <path d="M21 10.5 17.5 7l-3.4.6" />
    <path d="M12.3 14.2 14 16l-1.6 1.6a1.6 1.6 0 0 1-2.3 0L8.5 16" />
  </>
)

export const Calendar = make(
  <>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 9.5h17" />
    <path d="M8 3.5V6" />
    <path d="M16 3.5V6" />
  </>
)

export const MapPin = make(
  <>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </>
)

export const Mail = make(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.8 7 7.1 5.3a2 2 0 0 0 2.2 0L20.2 7" />
  </>
)

export const Phone = make(
  <path d="M7.5 3.5h-2A2.5 2.5 0 0 0 3 6.2C3 13.9 10.1 21 17.8 21a2.5 2.5 0 0 0 2.7-2.5v-2l-4.2-1.4-2 2.4a13.5 13.5 0 0 1-7.4-7.4l2.4-2L7.5 3.5Z" />
)

export const Clock = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3 2" />
  </>
)

export const Download = make(
  <>
    <path d="M12 3.5v11" />
    <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
    <path d="M4.5 19.5h15" />
  </>
)

export const FileText = make(
  <>
    <path d="M14 3.5H7.5A2 2 0 0 0 5.5 5.5v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8L14 3.5Z" />
    <path d="M13.8 3.6V8h4.6" />
    <path d="M8.5 13h7" />
    <path d="M8.5 16.5h4.5" />
  </>
)

export const BookOpen = make(
  <>
    <path d="M12 6.5C10.5 5 8.4 4.4 5.5 4.4a1 1 0 0 0-1 1v11.2a1 1 0 0 0 1 1c2.9 0 5 .6 6.5 2.1 1.5-1.5 3.6-2.1 6.5-2.1a1 1 0 0 0 1-1V5.4a1 1 0 0 0-1-1c-2.9 0-5 .6-6.5 2.1Z" />
    <path d="M12 6.5v13.2" />
  </>
)

export const Package = make(
  <>
    <path d="m12 3 8 4.2v9.6L12 21l-8-4.2V7.2L12 3Z" />
    <path d="m4.2 7.3 7.8 4.1 7.8-4.1" />
    <path d="M12 11.4V21" />
    <path d="m8.4 5 7.6 4" />
  </>
)

export const Folder = make(
  <>
    <path d="M3.5 7.5A2 2 0 0 1 5.5 5.5h3.2a2 2 0 0 1 1.5.7l1 1.2h7.3a2 2 0 0 1 2 2v7.1a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7.5Z" />
  </>
)

export const Lock = make(
  <>
    <rect x="4.5" y="10" width="15" height="10.5" rx="2.5" />
    <path d="M8 10V7.8a4 4 0 0 1 8 0V10" />
  </>
)

export const Eye = make(
  <>
    <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
    <circle cx="12" cy="12" r="3" />
  </>
)

export const EyeOff = make(
  <>
    <path d="M4 4.5 20 20" />
    <path d="M9.5 6.5A8.7 8.7 0 0 1 12 6c6 0 9.5 6 9.5 6a17 17 0 0 1-3 3.7" />
    <path d="M6.4 8A16.8 16.8 0 0 0 2.5 12S6 18 12 18a9.6 9.6 0 0 0 3.3-.6" />
    <path d="M10 10.2a3 3 0 0 0 4.2 4.2" />
  </>
)

export const Search = make(
  <>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </>
)

export const Play = make(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m10.3 8.8 5 3.2-5 3.2V8.8Z" />
  </>
)

export const Expand = make(
  <>
    <path d="M9 4.5H4.5V9" />
    <path d="M15 4.5h4.5V9" />
    <path d="M9 19.5H4.5V15" />
    <path d="M15 19.5h4.5V15" />
  </>
)

export const Globe = make(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17" />
    <path d="M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.3-3.4-8.5S9.8 5.8 12 3.5Z" />
  </>
)

export const Language = make(
  <>
    <path d="M3.5 6h9" />
    <path d="M8 3.5V6" />
    <path d="M10.5 6c0 4-2.8 7.5-7 9" />
    <path d="M5 10.5c1.2 2.6 3.4 4.3 6 5" />
    <path d="m12.5 20.5 4-9.5 4 9.5" />
    <path d="M13.8 17h5.4" />
  </>
)

export const Chart = make(
  <>
    <path d="M4 20h16" />
    <path d="M7 20v-6" />
    <path d="M12 20V7" />
    <path d="M17 20v-9" />
  </>
)

export const Building = make(
  <>
    <path d="M4 20.5h16" />
    <path d="M6 20.5V6l6-2.5V20.5" />
    <path d="M12 9.5h6v11" />
    <path d="M8.8 8h1.4" />
    <path d="M8.8 11.5h1.4" />
    <path d="M8.8 15h1.4" />
    <path d="M14.5 12.5h1.4" />
    <path d="M14.5 16h1.4" />
  </>
)

export const Send = make(
  <>
    <path d="M21 3 10.5 13.5" />
    <path d="M21 3l-6.75 18-3.75-7.5L3 9.75 21 3Z" />
  </>
)

export const Home = make(
  <>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5.5 9.5V20a1 1 0 0 0 1 1H10v-5.5h4V21h3.5a1 1 0 0 0 1-1V9.5" />
  </>
)

export const Star = make(
  <>
    <path d="m12 3.6 2.6 5.3 5.8.85-4.2 4.1 1 5.75L12 16.9l-5.2 2.7 1-5.75-4.2-4.1 5.8-.85L12 3.6Z" />
  </>
)

export const Award = make(
  <>
    <circle cx="12" cy="9" r="5.5" />
    <path d="m8.5 13.6-1.3 6.9 4.8-2.6 4.8 2.6-1.3-6.9" />
  </>
)

export const Target = make(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </>
)

export const Compass = make(
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m15 9-1.6 4.4L9 15l1.6-4.4L15 9Z" />
  </>
)

export const Flag = make(
  <>
    <path d="M5.5 21V3.8" />
    <path d="M5.5 4.5h11l-2 3.5 2 3.5h-11" />
  </>
)

export const Link = make(
  <>
    <path d="M10.5 13.5a3.5 3.5 0 0 0 5 0l2.5-2.5a3.5 3.5 0 0 0-5-5l-1 1" />
    <path d="M13.5 10.5a3.5 3.5 0 0 0-5 0L6 13a3.5 3.5 0 0 0 5 5l1-1" />
  </>
)

/* ------------------------------------------------------------ Social --- */

export const Facebook = (props) => (
  <svg {...base} viewBox="0 0 24 24" {...props}>
    <path
      d="M14.5 8.5V6.8c0-.9.2-1.4 1.6-1.4h1.6V2.8h-2.6c-3.2 0-4.3 1.8-4.3 4.3v1.4H8.4v2.6h2.4V21h3.7v-9.9h2.6l.4-2.6h-3Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
)

export const XIcon = (props) => (
  <svg {...base} viewBox="0 0 24 24" {...props}>
    <path
      d="M17.7 3h3.3l-7.2 8.2L22 21h-6.6l-5.2-6.7L4.3 21H1l7.7-8.8L1.4 3H8l4.7 6.2L17.7 3Zm-1.2 16h1.8L7.6 4.9H5.7L16.5 19Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
)

export const Instagram = (props) => (
  <svg {...base} viewBox="0 0 24 24" {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1.2" fill="currentColor" stroke="none" />
  </svg>
)

export const Youtube = (props) => (
  <svg {...base} viewBox="0 0 24 24" {...props}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="m10.3 9.5 5 2.5-5 2.5V9.5Z" fill="currentColor" stroke="none" />
  </svg>
)

export const Linkedin = (props) => (
  <svg {...base} viewBox="0 0 24 24" {...props}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path
      d="M7.8 10.4v6.3M7.8 7.6v.1M11.5 16.7v-6.3M11.5 12.9c0-1.4.9-2.5 2.3-2.5s2.2 1 2.2 2.6v3.7"
      strokeWidth="1.9"
    />
  </svg>
)

export const Whatsapp = (props) => (
  <svg {...base} viewBox="0 0 24 24" {...props}>
    <path
      d="M3.5 20.5 5 16.4A8 8 0 1 1 8 19.4l-4.5 1.1Z"
    />
    <path d="M9 8.6c.2-.4.4-.4.6-.4h.5c.2 0 .4 0 .6.5l.7 1.6c.1.2 0 .4-.1.5l-.4.5c-.1.2-.2.3 0 .6a6.7 6.7 0 0 0 2.9 2.5c.3.1.4 0 .6-.2l.4-.4c.2-.2.3-.2.5-.1l1.5.8c.2.1.4.2.4.4v.5c-.1.4-.6 1-1 1.1-.5.2-1.4.2-3.5-.9-2.4-1.3-3.6-3.4-3.8-3.9-.2-.4-.7-1.2-.7-2.2 0-1 .5-1.5.6-1.7Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
)

export const Telegram = (props) => (
  <svg {...base} viewBox="0 0 24 24" {...props}>
    <path d="m21 4.5-3 15.5c-.2 1-1 1.3-1.9.8l-4.6-3.4-2.2 2.1c-.2.3-.5.5-1 .5l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2L6.2 13.7l-4.6-1.4c-1-.3-1-1 .2-1.5l18-6.9c.8-.3 1.5.2 1.2 1.1Z" />
  </svg>
)

export const Tiktok = (props) => (
  <svg {...base} viewBox="0 0 24 24" {...props}>
    <path
      d="M16.5 3c.4 2.2 1.9 3.8 4 4.1v2.7a7.4 7.4 0 0 1-3.8-1.2v5.6a5.6 5.6 0 1 1-4.8-5.5v2.8a2.9 2.9 0 1 0 2.1 2.8V3h2.5Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
)

/* ----------------------------------------------- Domain icon mapping --- */

export const DOMAIN_ICONS = {
  education: Graduation,
  mindset: Compass,
  antivaleurs: Shield,
  youth: Users,
  women: HandHeart,
  community: Megaphone,
  dialogue: MessageCircle,
  environment: Leaf,
}

export const VALUE_ICONS = {
  action: Target,
  discipline: Scale,
  change: Sparkles,
  integrity: Shield,
  patriotism: Flag,
  responsibility: Award,
  solidarity: Handshake,
  exemplarity: Compass,
}