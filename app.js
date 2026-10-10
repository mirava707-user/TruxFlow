const { useState, useEffect, useMemo, useRef, Component, Fragment } = React;
const { createPortal } = ReactDOM;

// ---- Minimal inline icon set (replaces lucide-react for the no-build CDN version) ----
function Icon({ path, size = 18, color = "currentColor", strokeWidth = 2, fill = "none", children }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {path ? <path d={path} /> : children}
    </svg>
  );
}
const Plus = (p) => <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>;
const X = (p) => <Icon {...p}><path d="M18 6 6 18M6 6l12 12" /></Icon>;
const Truck = (p) => <Icon {...p}><path d="M1 3h13v13H1zM14 8h4l3 3v5h-7V8zM5 21a2 2 0 100-4 2 2 0 000 4zM17.5 21a2 2 0 100-4 2 2 0 000 4z" /></Icon>;
const Package = (p) => <Icon {...p}><path d="M21 8l-9-5-9 5 9 5 9-5zM3 8v8l9 5 9-5V8M12 13v8" /></Icon>;
const DollarSign = (p) => <Icon {...p}><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></Icon>;
const BarChart3 = (p) => <Icon {...p}><path d="M3 3v18h18M8 17V10M13 17V6M18 17v-4" /></Icon>;
const FileText = (p) => <Icon {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M8 13h8M8 17h8M8 9h2" /></Icon>;
const Trash2 = (p) => <Icon {...p}><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16zM10 11v6M14 11v6" /></Icon>;
const Pencil = (p) => <Icon {...p}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" /></Icon>;
const ChevronDown = (p) => <Icon {...p}><path d="M6 9l6 6 6-6" /></Icon>;
const ChevronRight = (p) => <Icon {...p}><path d="M9 18l6-6-6-6" /></Icon>;
const ChevronLeft = (p) => <Icon {...p}><path d="M15 18l-6-6 6-6" /></Icon>;
const ChevronUp = (p) => <Icon {...p}><path d="M18 15l-6-6-6 6" /></Icon>;
const Printer = (p) => <Icon {...p}><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z" /></Icon>;
const MapPin = (p) => <Icon {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" fill="none" /></Icon>;
const CheckCircle2 = (p) => <Icon {...p}><path d="M12 22a10 10 0 100-20 10 10 0 000 20zM9 12l2 2 4-4" /></Icon>;
const SettingsIcon = (p) => <Icon {...p}><circle cx="12" cy="12" r="3" fill="none" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9c.14.36.22.75.22 1.15" /></Icon>;
const Users = (p) => <Icon {...p}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></Icon>;
const User = (p) => <Icon {...p}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></Icon>;
const Sun = (p) => <Icon {...p}><circle cx="12" cy="12" r="5" fill="none" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></Icon>;
const Moon = (p) => <Icon {...p}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="none" /></Icon>;
const MessageCircle = (p) => <Icon {...p}><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" fill="none" /></Icon>;
const MessageSquare = (p) => <Icon {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></Icon>;
const List = (p) => <Icon {...p}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></Icon>;
const Building2 = (p) => <Icon {...p}><path d="M6 22V4a1 1 0 011-1h6a1 1 0 011 1v18M6 8h8M6 12h8M6 16h8M14 22V9h5a1 1 0 011 1v12M17 13h.01M17 17h.01" /></Icon>;
const Warehouse = (p) => <Icon {...p}><path d="M2 8l10-6 10 6v13a1 1 0 01-1 1H3a1 1 0 01-1-1V8zM6 22V12h12v10" /></Icon>;
const UploadCloud = (p) => <Icon {...p}><path d="M16 16l-4-4-4 4M12 12v9" /><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 104 16.3" fill="none" /></Icon>;
const Fuel = (p) => <Icon {...p}><line x1="3" x2="15" y1="22" y2="22" /><line x1="4" x2="14" y1="9" y2="9" /><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" fill="none" /><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" fill="none" /></Icon>;
const Clock = (p) => <Icon {...p}><circle cx="12" cy="12" r="10" fill="none" /><polyline points="12 6 12 12 16 14" fill="none" /></Icon>;
const ShieldCheck = (p) => <Icon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" /><path d="M9 12l2 2 4-4" fill="none" /></Icon>;
const Home = (p) => <Icon {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" /><polyline points="9 22 9 12 15 12 15 22" fill="none" /></Icon>;
const Phone = (p) => <Icon {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" fill="none" /></Icon>;
const Copy = (p) => <Icon {...p}><rect width="14" height="14" x="8" y="8" rx="2" ry="2" fill="none" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" fill="none" /></Icon>;
const Check = (p) => <Icon {...p}><path d="M20 6 9 17l-5-5" fill="none" /></Icon>;
const LayoutGrid = (p) => <Icon {...p}><rect width="7" height="7" x="3" y="3" rx="1" fill="none" /><rect width="7" height="7" x="14" y="3" rx="1" fill="none" /><rect width="7" height="7" x="14" y="14" rx="1" fill="none" /><rect width="7" height="7" x="3" y="14" rx="1" fill="none" /></Icon>;
const Hash = (p) => <Icon {...p}><line x1="4" x2="20" y1="9" y2="9" /><line x1="4" x2="20" y1="15" y2="15" /><line x1="10" x2="8" y1="3" y2="21" /><line x1="16" x2="14" y1="3" y2="21" /></Icon>;
const Percent = (p) => <Icon {...p}><line x1="19" x2="5" y1="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" fill="none" /><circle cx="17.5" cy="17.5" r="2.5" fill="none" /></Icon>;
const Lock = (p) => <Icon {...p}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" fill="none" /><path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" /></Icon>;
const Bell = (p) => <Icon {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" fill="none" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" fill="none" /></Icon>;
const Download = (p) => <Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" fill="none" /><polyline points="7 10 12 15 17 10" fill="none" /><line x1="12" x2="12" y1="15" y2="3" /></Icon>;
const Send = (p) => <Icon {...p}><path d="M22 2 11 13" fill="none" /><path d="M22 2 15 22 11 13 2 9 22 2z" fill="none" /></Icon>;
const Search = (p) => <Icon {...p}><circle cx="11" cy="11" r="8" fill="none" /><path d="M21 21l-4.35-4.35" /></Icon>;
const Calculator = (p) => <Icon {...p}><rect x="4" y="2" width="16" height="20" rx="2" fill="none" /><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" /></Icon>;
const Calendar = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="18" rx="2" fill="none" /><path d="M16 2v4M8 2v4M3 10h18" /></Icon>;
const TrendingUp = (p) => <Icon {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" fill="none" /><polyline points="16 7 22 7 22 13" fill="none" /></Icon>;
const TrendingDown = (p) => <Icon {...p}><polyline points="22 17 13.5 8.5 8.5 13.5 2 7" fill="none" /><polyline points="16 17 22 17 22 11" fill="none" /></Icon>;
const RefreshCw = (p) => <Icon {...p}><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" fill="none" /><path d="M3 3v5h5" fill="none" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" fill="none" /><path d="M16 16h5v5" fill="none" /></Icon>;

const LOGO_DATA_URI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAIAAABt+uBvAAARv0lEQVR4nO1be5BU1Zn/fd+5t6ebgRkGZnhE3oMGRcIj8n5EBEKKR0RRcSBmk6yLYXxEhQ3qptzalLtSG7NrdmuTWtc1FY2KD/DBY9VVii1KGUUFonEQhAHJAA7zEIZ5dN97zrd/nNvdt4cZGIYZ4I/+1RT0vX373u/8zvc+5wJZZJFFFllkkUUWWWSRRRZZZJFFFllkkUUW7QVdbAFaAWX8B0jqn4uAS4IgAojABABGYFojgwlMEIGg9Qu6TraLhhQvvsk4z4RcFzEFJmhBk49GP4MUIiiCFkjXM3VxCCKACUYCw2HClQU0vi/GFdGVPemymOkZpZgiEtGCJkNfN8vhenzyNT48jg++koP1ATGKulyhLgJBdvItJvanxcNp7kCM7AkVAQxgAEnaUkpAESgCEUTqG/FhDa2rwCv7zZEGsTdMcd3puKAEMUEAEUQYt3yT7vgWpl3GUEBctC+KCA6BAAEE8EWDxYgikEOAgCwNZNXv+Cm8dAD//iezpy6gSXcBSReOIIcDX7PsSlo9gUb1BTQ8D64CXIJPR0+Y3dW0uxqfVZvKRqqLS4MHIkQY+TlUmIPifBldxKML6Yo8kxNBoFBN9MRn9OhHuqZZukKVLgRBRCDACEYX0WPX8uxiwJd4gnKigMKhGry2TzYcwI5jciJ+9tER4coCzB3Mi4bSlL7ixAiCA1Wy6j28UmGIgE7lqMsJss4YwH3f5n+cTrEcaW5CNIfgoOwv9LuPzSv7pD4hqYttsJfMQVopiSCSYUcT+9PtV9EtQyUvnxHHmh3y0PtGQg89f3QtQdYv9Ijgye/xLSOhm2FAbi4+PYJHtsuL5cEoHIZIe60jlRxoE1w/ohetGst//U2DXF63S36wxTTrTuOocwii1jJdxdAGg3rQKzfyuMuk6ZTEoqxB/7TdPLrdNPkggBnGdNwimEAIdGrWQPrnSTRuKN78jK7frD0JAsIlCmspQ/Joz+1KHuCGu1keUnv+hqcPCKZEcWc+y2EA6Obg8RksK2ndXAcIQuKlCDuxI3rR0TtZHlayWsnD6n9L3MIYAXC4S+RWyZv+eATJzyNrJnH4ZIfhnO8N2oBi3HkNVzZjzz6J5tCfq2jFG55n0sG+E2ENXAsIUIzf75FjTd7meVT2Fb9aYc4zP+q0uSQ7XRSYvfWRYcmYoOy3nac/2gAAK0WUvqnLaEpg0eX8i287c19PnPTOHviNMcZ09ryFwRfP1pk7z5m1hk4YmVWWmMJNxTSlH2IKAiICREQIJERkDADRma0MY2CsQlEQ5gFokIhIMgYZW1tQKCQRAPgauS6e2sufVvsL5s+bNn16PB4HyCqCiEBMQkMxQbTWBiE10VpDoI0vIr6vI5HI7t27t27dysyn69H5+iDLzuQ+9ORMXNWHIAIi2HzWDh32I2UkA5I8omD8aaRqsdRl6bMI7qyBbrR9v/q7ssSUyZNefe11pdT5jGLy5MltfXVeBFn/961e9OZC7hGVRDOIGSKABPUFALHJvyQ5sidTo00izJEEv0xfYPUIAogWch3Zc5i+t9Hv3rvP888/z8zxeJyZMxoACOVm1NohoH0djUVLS0vLysqUUlrr08fYcROjpOt573qeMACJBLmcFIFavW0L8UMK0mIALURL/07EQEgScKauk51Vesvbb82cNdv3fOW0Q4MkzTgBvtaO47z99ttz5sxxHEdrLa2llR33cLbdd98omjCIvDhaZ4fSdhZ8soccOi/JJsbprFJSRg4u1EQqRy3fgp1V/q9/tWbmrNme52Wy03a8CglmjGHiE1+fWL58OREZY1plBx02McvO8Hx6eDwl4kIMDZDtrosQkiV8+qFJNRCAwCmlCNxT8lcIHHagW5L+tYj4Gjm58m87I3/8vKlkyc33r/q573mOUgDEhMvblkMNKSgRBIDW2o1EfnbvvRUVFW0ZV/i35wZbLjqELfN56nBBgqBCbhUp7aA2zUqHqiRp6dBZZf5IAAiEEMVb+5y5r8WvvmrEe9vfz83NBazXA517orF+/frFixc7juP7/hku64gGWfWZ2A+5UZQdIkWwYR0EhhCBQMwiABMxAwJlHaiBqwCDIT3gBC6VkooHe8SE6rhq9gwlnyVE0EYTvVGulr8Tv+wb33jxpXU98vJ831dKiQgzf11Xd+LkSWa2mkih5IgIBA5cvogAzHz06NHS0lJrXGcebMed9Dml8HaCLVmje/P2m1iJgEGUtCiBCFihqonHveTXxQO3Q0QCKCJPm0Yf182a/dST/zV4yBDta1YMm2yJTJs2defOXdbXEhGFnHGQkwWmTJbQhoYGYwwRteV6UmiXBqX6WGGIBAtVijOtIRO2a2OTQDLQgnmDyI2I1ywOKNwZ0wC72PiZrjwVvk2QMsW6df/Nr355z733AdC+z0pBoI12HOf9svc/+GAHE3mel5QtQ5CwM0x91R520E6C2lrMszhr8ZlKCW2v7/ohAg22HfzUFQQ2AqPW7jeU7CXBGgiRUmrj669eN2uW9n0QcSotFAB4/PF/PXMp1TJ/sLbWvl7RWQiyFjC2F2YMZGMg2hATBMaAHd5w0ByqlyWXU3FPaAMCxIrJVgKQ67y2T5fXmVRna1RvGt2HjS8MSTpygogBVIQP1Mq2IxpIdwuZldb62pkzr5s1K5FIuK4bFB1EAjiO8n1/zNixgwYPtqmNiEDEiFgqtdae51lfY4yJRWNrX1hbU1MTmPb5E6QIvmDVOGfpWEGzgDgIKAIo1G6ivzTgP2ZQr16Aj+CrQGEYIohIopnK65IWKlgwCE5EvGY4nKpCBIARKCXrK6hZt9ISKSkpsXUdkIqPQcRWSq1evbo9QwVQtr3sqd8/ZX15O3/SppOmZN9LgJhL/bqBIdYuDKAICV8O1UOAvt2QHyUxKUcYzI1ieL7sPwkj6ce8u4gnD4Dvk8rMAQQA04QX9UfHJeX+rZvoVdDr872fFxYWGq2ptdpd+7rVfkbqCZaOkydPjhkzprKystWitC20qUGCdJA6lZAvEqnTLXGkAXaF8wwgghGMKKBr+pL4yfw9WZdqwHHx8VHsrBYKLSUrpXzfn79gfmFhoe95ynHscJPzEJCbzKRPazUlPZ/WvuO6K1etqqysPHNaeDpaIciK3TOCsYVEEC20swYNnlzTB4VREkk3vbQA0jLASSgtFqIdVVIXD1aHvz+E3Bi8JjicmRwaQOHF/WIkw77sPN92220Bx5K2r7Sg6aefZg1WSKMd112/bv3Tf/jDWdPCdhGkGL7BnaP4kdmEBkFM3fSS/95xKluq4BrY+3OQEKcFDTNkkj45xivfxL/sDmbs+4MJOlkShfoYjkK8idYf0AipjzWE4cOHz5gxwyYvGZWtpU/CzUJK9QECmYiM1spxjh07tqJ0xTlZ1pkIsvH1qT2yu1YI0KK3VUqTxuyXTXfXSCi547AfyTQyO05jTNlXYIJncHk+XdMH4iXtK9Ag0QLHwbuHZd8JCS9m2fHccsuSnJwcz/McJ0NUEWlPD8hec/ddd1VVVZ2rcVm0QpCV8GiDbKwIn8A7h0348ByewTCCBYMpJwqvOViiSVWQIgLm5/dbN51MKW096TpLl5YA4Bb9ExFmLi8vr62ptQ6IiWzODUApxUQg0r7vRiKbN29+ed26jrGDMzhpspUBgNCaZ1EOciPU5Et1M4ygfzfq5sIP+qbWedqSi46cCgJpKslcNJSSLbC05xDAVXTiFDYeNAjbl1Ja68mTJo8cOVJrw4pTvlmMMFP18epp06bV1ta2Z5BE1DF2cJYoljRYG3cn9eV3FxGzQOjqtYYd/lNJYOowgLGfGQJE+Pb/Mf/9ubFLYEZwRU+a1A/iSYZ9AVrALt7+Qo41yunF3bJlPwBgjGZ20m1Ao1m5GzdtrK2tdV23Vadr43pQP1NHXM/ZCQrDTuyBk/KLjymmcLJRvmwgV8mD70nMJd+AJejjMEBM2pitR4ylxlrNvEGI5KTyQ0nFLxLAYO0+oWS7GckJLygouOHGGxBetxAAopgBPPPMM0QkmY2uVN8n/UGgxXS8Im8nQVaEqiZ5dEdIUT2s+QinuSRpcWTn7sZhnG4xp8KQwHFw9CS9eVhnKKxNf+bNKyoqsj0N2GBFZIwopcrLy7dt2wa7PtHas4MyhSCC4jxEFGw234HtDOfQciXA4eCPMg9Tf/aOERV8lqR9Tewj4gkHzdYgzTMCuNh4CPVesmFkiTMGwA9/+FdIFd9iV0qCr5599lnP85RSZxhvSokWD6Wv48HnDuAcGmZyWuEePrQeZEZ/emEuscBh1MXVdzf4B+rl+iGIxOA3k+KM8oIBaFq714TFt9G9uLh4+ozp6VgeVDDiOE48Hn9h7VokyWoTBCOY0Z+L8+hoo+7wAnSnrc3bp9cl8H9HhAxcRTWN+oQnTHRzsYJvKGg1J9UHUI7sr6F3j2XGL2ZjTElJSTQa9RKe46YlNMYopbZs2fLF/v1nyPqsKytw0ejhF+Ppt59K+uy5o9MIsiP8pEZufcueCMQZWSBjemnxU2Wm2AUMY0QpWn9A4qHynQhaa8dxlixZAoCYkv0BwFYwRE8//TSSPLYljCLEPfrxVTw8jzZUaCJ0OI518sI2ERyGIjAh5oCA7w5kFWU/XSjZ8YpiiKaX9wuQ7swwKxGZOmXK1VdfrbVWzMGqM+B5nuu6Bw8e3LRp05nzGlsYx3Lksan49S6jJdhO3TF0MkEi8A2M3WLhgwlNhtmF0XaRnexWXi3EDj45jo+rTbh8tyzeWlIC62KsYxZjtI5EIrW1tUuXLq2vr+e2u6VB5Uy0fr5zPI7//LOxm/U6jM7fGmETnZmXqXFFrAV//Nx/8VPJyVesSAcpuYgAil7YZ3yTjl9E5Gtd0LPnokWLANgVCxvmleOsXfvCxIkTtm/fzsy6DYNJve3xxAxMHyortoqfyu4vHdhOWzcXv/uOumGITQfp/nHc8FOSezjxU9alypRSvFSNKCCEts7YcnTZsmUi4iUSiUTCrljs2rVr4cIF9hrV9mYXu5mMCU9ey/K3/MR3OmeHWZfAjrkwis+WRv5+QlBzj+9LZbcquZ/9O5X/M956gwNk9JJsxrx502bf9y07dXV1DzzwQDQahS1B22CHknsU+8SwcR7LSt55s+ruBh3RSxR25IN64Kuf8IYFPLA7AXAZj0x1Gu9SslqtGKWAZGWfZGd4cXFDQ4NVnOeee27YsGH227Y6GxS6w+wBtG8py/189CfqivwM3bxEYdV7YC4qb3dOlao7Rgbyji3E5kXO8J6t2NfDDz8sIjt27JgzZ07qPFErA7Vr3xa9c/D4VPbuYLmHqm5XE/oSLlnjagErZZ8YbbuJ5SG1fYmzcGhacIcCK7BroXl5eWVl7z/44EOu66INmyJAUXrwUYUVI+ngbSx3sdzNFT9S4wrJ3rmz0OU82xzfUbRmCq2cDAht+1L9dqe3oUIagnXQoMQvKCjokZd/oOIgAUF/K7lbxjYuwuuXfWK4dTgtH0kjCwEjiNCWg/jRO3K4Xjp3I+2FUMRUGT1/GD82AyMGEJpkb416Za9+/YDsqkGjFwrEpCBtJoEFUUzqRzcOpYWD0Le7bQig2ec1H8kjO4KcsHNfirpAlkrJPSF5Eawcz3eNpl75QNzAUwdO8o5K/8Nq+aJefVkvx07pRk2+wBjJUdTDlcIohuXTqF4YX0Rji9AvDyCBbx0YvVYh//CB7Dye0bHtXMkvHFLTOySfSsdQyQga0CO5zEwKPvy41CckLuwLjNY5Duc66MbCkWR3xwgUQaE5jjcO4Te7ZWuloCtfOrzQvt62um3u37sbFg6lxcWY2F8VRQzIgDgopYyAGcbu/mSQAQGs4p7sqpaNB7Buv5TXBlqDrnxttRMI6kAjgQkUKpH6dKNxRTK+H1/VE0N6oHeMc5UoESHytNQ0o7KZymvloyr5uBp76yR9E3TJa5hhXMxswb7dffreGpcRc+AwtMDTaPRbToFdR7owb89fEukUUdCJbeu1OhV0XC8cL2nZLujT2ofQojTQ0V5yFllkkUUWWWSRRRZZZJFFFllkkUUWWWSRxYXH/wNXe89a6NN1pwAAAABJRU5ErkJggg==";
const WORDMARK_DATA_URI = "data:image/webp;base64,UklGRgwvAABXRUJQVlA4WAoAAAAQAAAAfAEARwAAQUxQSL8RAAAB8If/n2FH/v89qqqTydj2LGaSEyeDtW3btkbJ2rZt27Njr20bg8ysRqe76nldjXpW9znJa1//RYQsSLLjthlEoEGJzr6Hg7hE/+M/fxCyMEG0KWTpLSc34//3IHHu/JmzZ8+eNWv2rDCEAmbPmjlrxsxQw8xIwswZM2fMmDVzxvQZs2JawhBeN23u3lBtiOfOnzVl2tTXpsbDa69Ni10X6gi1TJs+der06VOnTAmFvDrtJJRiv/lTZ0RCpk6d8uqUl6ePb93+U3iRChMmwWszUHg1O2c9iDI0cVJegNe6eTRYE2QfVgentCk8mZXnVge3hZwarLZLeaS18wQFBfjZp9PaFJ6hICtn3RlyBvl2KY+2zZzRpvBUdtwVMrGN4fECMaFN4ensuDtkwv8EJrXdTPzPyTMF5fH/0Nzl8pHH2mYmtt2Xnfafk6ez446INub0I/5qnw2aJeCFrfLHt2UY3zWs8m8LOb2N4RUqTDinLY6IHm5zENjz3MmTJ02YOHFSU1Pzmc3NkydNPn0G2X80dFfzOWc1N0W6zjrrnHPOPe+85jPHQLZVGPpyUnM8NEW+mtw0edKkSZFbm8/dFqVu44u2JpxDvhVN9RkXIyGlEK1sTslOQM+mEulhkgMp3Ncq/Kc8NpR5l7Fs5rXjxUk4roUIL6FApV4wcVYlZMZSpXDiFYuXHJwVMjELhPKUNVuUSGk8oypDSTJFqbyEZWOo7Eo/UNqnsqqX18p+EUsaL2WDiqsu6z10+ODupQkpxdiCFBi1bmV1VVVVdfm6sVACQAJ9jn3px2VELV89G2ntV15eUVVZPjKmbGT5UO4m16ViZFzzyIpcrro2pyCwTsW6iTCyPFeRqxrJlXWvKperzIWGxMM65b0gFJ7jeCkdqU/HJHffovmpD39pWbHq38U/vfP42Vt3j/TY/DWgKlcRuqSmsbGhob6hsRuETdPgmsrKXGV1TU1NVVVtbRlglVRXU1tbXVlZWVVdGwoozY5NHBDo1WK/ufrrQEqopsUWLRPRHtdwuTED0m7dHlznaHlPeDiIuO613lwoa4acxvVA9IpRkA68nJLx6ZCA2OKhP4gLvz+2s4CUSeVHcb45waZciHcZwXtA2ZjDSPq5I0Qh6bmEjA1TgRIMC+3yA21CIfngMJThavLtvMaxO9c5WtwVQmIW49GAZtm0CtntD1bV2VDRZdlyhgPM2X3fijzt+1qbKGgdH229vUfypMQo38RdZaLSbm6zIDFoJRmrUZdbJAl0XGT1mW8ehkJBWWzF0AbAkB8obyxat0Y7nikpWRSiUBsExtjFbm6xWbG9v0B/11GK6CPFgpAYMzd0WWDYyARhdr2wdtwcgZKvSVvNfENIi2N2dW9iFBq0sZeHI+Gh0JHVvp1F2RuUt+ZhnQtTMwAK90YZ6+ZTKfou14bRtC+U20cKhRCY6FOYv25BB7Rsb3iJBV+rdEPLukMkjbrcbpShlm42SUfZxZqgHLKY2BNXhy8rNdnT0jNEyv7LNNek7QIvIfRatjxMh4ITrxboI0LiFjJBqhmpqHGNST/UbqemDaGSidkUECspyZ1WNH3hQWTGplmw7QCumdCjXJiWkmW9ERstHE+BHfOekvHjwH/sR6NXVyR4NtvERGcU7rG01u4nL4hESgxdxdxRknsYBLq3kGHKiWXmTYi3STMrGh6KKdoi1MpkYR+U8kzPBEj5HnGHPRN5ez0FjEevhHIdX6hS5RZS4uHKsMVIGUw+1qMSAu9SYOX+RK4obMj1vwJ6LiFJoP+/TDbtV1RoavqGjF3qj+1QknXU0iuGwsZcm2E+LZUiPA5fYT9q/XtXKUJcLnuuINMaCgdFvk79z8+Pg2LbXU3vQTBNqVXS9+2Q8M0WpK0+Xj0MEsWTIFpqOHO/lS5Mz+B0YnKdO0VHw4taI1bNYVBwQtO7O+y0ww477bjDTrvsstPOO+4QD9vvsKWXBinW/kdrNou1jvUrGGM/a6+Ewi5WQw393SfuT8mvJhnS5ZAuw5qA3hUCRQURx3dOTMsIKQb/zdQt82Mn6YmqvGa6vvMhs57KXtMVwv0jCs+zRx0kBgLsLzsXSmDACjIOEw8CZT+SZgvJ/skK/bgV31wDr6hIajCx9Z7Apy+EExmctjVJ7OakUjZnA90A5b6IEzgFP1jUJQUKm7LlRhP9+9knX/mRAm4sP1RIgdeZN06FFzvWGMOXkesSuVvypdUATTtBFZgeix0iaw/RzIbIPtErgVDtPiNtP/zWTdYb7u5/B7yM144NLU2DxBSOgL4+YjDgjWxaxAny6Xqo2DjCygMxPBxLPrHRwnjnBcPz9nmIv6LyXdiPdHcgyqi/5jx43nl3TfmGZkO5kFUEhW3Z+8p5eIHpxOmWPkIWEQoVvuEy65VuiIfB87lpLLO0BzxsxtSfjwRiPMhj6M9YG+5Fdyd2ci3LKCMC+uXkAYiFsg13gfAKFbkMGYz5fW9uTB1vYSyns2W8A9F/wTp6Tgk8AQhZgo58j/twlKDzInsFWjkIEgIy0U5wSzBQERczVfRMeChw1IMnoLl9Aak8T6nkUDjbkfXSHhakWGuVTteN+LBUiSJCCOZOQMb8NRTK4p5a345vXoHiJnA1bQsFiWGrHdogn5rizemrTL9sfSgU2WlNCzqhRCRkKRVxTcGAwoUUsN0IfpaviJCo1oYdNnpW/zzCDlt7hIdTmBrUDM8ym8d66AUoCJRa+1+afu0AUWQJY1oG29QVPIKQ7b+x3NldPPkEPFh5stDEJtvsHlxTLqTNLLE+aSYXtgqpM8bKU7EhX3LRlxH5S5jBEhXabuuTUEBxfSSg8SiBlQJH8Pjya7/mr8FCFhl3cP55i6kQwmMaQ5/OCmn3vb0KfelFOTvXYr59kr8e0sMBTJf4WHgojoS92yYkz9UFBAozuaxkWxcULnGGU2IeBXYt17B23cm572kobjqbVg+HQo9lZJycdExUqm4k3zqNXQEJFNXgzo+N3FIzPVNkbDnH7RrzfQcpYmQ+uEtxWclXpO3+OYjBw4kOFdLDcVY07YBSbEra0mH8nkySe+AJvEWBTeRXJRDZLty7JRZxXCq89EzLFCjcRIHj+/vCK8xOuZXOUQn6/sM1HmOhGLu2ZPpg9FsnKOQCY+yTHe3RRL7l7n5mUoOmj6VAr+Vk7LOvHorgNMehcCD7CT0GKXv8TtrpNTvpBOfBCC2fMz8KC+bPmzdv7pw5c+fMnj1n7tyFL7R3Z0ieaah0DpKhgSsTK/pCCvkJafvShYeXKLCMH+pttW/NCGBjZr3z0OIjoL2zYGoWgzvG2fu5LGgZ808OMh0BvQhku3xZipHaiqEVQxgk1lrD6Fo1GJK5fWj6qSO6/54Up2mbMksdDmgv4HTrO7R6BGSxoWlLqEKzrDeL2MhoF5b2Fql5SZaIWGA2rQkZ53QXcobh74Esw1YyrBkRsau9T6VrsYExSRX/DMA8W/W7CnjEXkDeh0ARsIhrBDYpArhIKPUuBU6J+5mE68J95lHARUNZRvlcNCRMoN+/ZOztzdG2d96UkcetzfNHpNlp7Gwvy4SNig6FExzv35qfFFB4KkOcT6/hxqlV7OkxnIf/7QsBYR9O+HQR7kvi0w3A7rY3lnfqba2xmnaEKgYWZ8E1HDMzPS1FnxZtHC97S6qUiZezp/8KzoXj2Mu24S5b2i3WY7iAfPv9zXLjD2gfYLDFFENV65G2jsP6QBQFmUeaPlMQMSytfprTCnfbO67sfKZXMFzHF+2+JU1cNyiNVE2fKIh4x9fq0rVWkbEtDCu8aXnDHBKuL/DT2EU3st4wPYaWdGK4nfwUkUJDbGznltThmo4oFI7rCAJvciPra9lC9XDUcLDZJtD5D6vjW863Xf2OECW4wvbGPffZG8az4KEYPpI9ZPwaoazK3yeditkpRmwBM++Q/R7RSQ4o3M9UKX5ZvewHbk7phpjVCo9Zzc3/zMyKWJtIQ4utOWRoPajMKVh0JfnuX51UYqzR5I7C3tyLkajzFZD2y7JlotOE3vFc4Qzq7VuyxebsKs5BMTwc4Tzy3wWeQK8/o86D6+xqMdBzSRYcRQG3j6XMS2749DCVAneE7PQTO7YwxLU4Kk30SloyWUe4D55V6TOcg/LrxEqcxLp5u+NtPeQBkGE8y6KWmfV+PDy2jkhhe65MBnQ5lCfD4AHnhZrcUbiEU5X/mC3Ve8NLk8gcCO8L0kyNHm0xqwRbc0fzdqIxFOpTy7SLw0S4h3OteWflaHiZs2km0QYOSNRqw3qkKaGp4zUU8FPNPZNIUb4qMMzCaL/lxvAzqsWTgIfLWUd/3hUlSgqpSjA4rPuOz3nxLFPc/LYKD1CxyVWXeQF/JCSK47L0CHQKOyJs1i48etTAgQ0TYusi7pHCa2GRsLM1W4B9Oh/K/bJXskei3DfcLeGNEQmhdZ+T5ua0BkAm2Ndx5L9bZLZAN6fNbJo+kgJFi8NhGu+WIEytWhUT4EAyUtiVfb0Ir/OvhmmRVgwXsoi+iCcxlXwud5ZfvcWQHsO2u201Vzp9ejBplcRg61yT7Z2BMffJZMHlVN8cpYv0F7n2J9l/MSGxBxs4J4Ts8B2XwUElSvkd69F6bYE+Mslxp9xGbA5Fdq9YvpKIe5lA1wpl8f0bFLi8I0TcwLPIJwdVe0AVCYsyidZ12mlv28unHVE4k23aHoASst2X7F65raBc55RezTxyfESZiZVL7bBH9C6LUcmleteNicq6oYvbWVREUeo9MBIvk09pghtSDGG/fLFyhJBQ2J/tL39WKkVBJvQmOBA39i+tnUsns2Gyj5S27t1WDvka0J5xBLo6vBHQAggUS5QFCutTkCKbzfOax2lnuk83xiyS3kdG8/ugEomC8lhS/L6O34dha2G0Lct+v00sS7rs+Gf3nSanly6Ch+JP2Ee97oeApo8lzV7m8p0Mo/8dJGTMhF1YQX8nBT1TaCzOzqcmzz7dSGIqm6+BbUrEQzP5/JVbQBWATTNhQzekHLzMaOfSWz2aYXkfCAhV8iFxFetyyz1lFnvJI1CF+EXjXREe7kr7o4ltNHe7cbETTrbWxvAteteCJDZzopvTIo7bYWfS2ok1dEXUVPMJhQmczXpxdyksXtRc8d4YqhC4fwtS4eZ034IMFd0EJTinjjb86HX3pNECHX/l/fQiJIqE7hkBDweTy5smT49LsQXDku4QUgz8k90HfRo8+/wFwztCCScK9cwHIXFGPtX3f1edBIeRWek3UVeRXdS3uOkpzuF+tKc7G/ImGVKetqjT7sDDjn+EPjNcw0EPK4UtTRBZlpzx7QahcE/oG2NRo8137aVIInJ5bWwhtuFPOX3/N4sobprLN9/XXxB1a7kTCSUzGl2qi8K9xmeK4dsQ1k1ejKgwc+oKEQVmU7fEHw4fcTdj6OOxUV2gdWh44Ic59Pd4CA+bk+Ge+eBhPcMNZJldawr3EefGlt6QCk8Y39ifbpA2MvbIsM98EAe+G386XKDjhTnwYza9sSegnKzYn/yohNonlBzXnENtgYm+E5kRxugoxFQ7JnoutdmjTYoEYs7a5Ol/rZm19LZ1IIXCprHIoqY7VNmbJh+Za6mGb5dYmxgp1vmH4pkRNzhPd0ApPM11ZV5Nm+DK6uNsvwlyq1u/Y6Pvbt8qVh+dxk/DfGISu1krMDr9wOl/DArpEejbWF1VmauInmZTXdcweozbY1G8qtramuqa6uqqqtiTbTqmKU1SAkMPumn+ez8s/u2DeTcc0D9RejtUxp56U1NbX19fV5tTQLvGXC60tiJSUxdqaejFWrN2bWVVXGxobmUuVyMgMGJcY2N9fWNDfUNDqLVuGEQqn/YZHRpZU11VE9pb1zCWF6kAtN9g/L0LP/51+V8tv3644K7TxpUBKbKrdtzosWNGN9TXhqGmvr49Y8aIxvp4aBwzdty49ftBtNKH30nEcrl7l4SMQj0GsHU4TahEnencq0/Pzgm3qdb8t3OUo6+z/ss50vNkQoASrtKdjJHCxVgnsSrTv30jGJFKup6w6JH8s914R6goOPvJal8URGv/g0giY7tbv49EsfsJAFZQOCAmHQAAMGUAnQEqfQFIAD4pEIdCoaEKRF9GDAFCWwA0qmnfjH4m9YxZDpf48f1D/w/6D5Xqt/Nv6/+V/7D/6f8l0U1Af270A/IPzH/V/2D/FftT86f7L/RPZP/bv7t/QPz/+gD+mf0T/mf3f1sf2V9x/7VeoL9kP/H/mfdM/vP/M/unuR/a32AP5j/jfWK/2P//9yP+r/6j/8+4h/MP7z9+fy5f7b9vPgi/qP+z/cT/pfI5/Nf8N/6Pz/+QD/1eoB/2fYc/gH76dz9/dvxi8Ov8l+S37c+Zb6Z/AflR+6m/7/4v6AeBh9B/bv3P9lv+Z4U/EzUC/Jf5T/sN/L1f/S/8T1CPVz5t/qP7n+T/pg6nHeP/ee4B/Fv5R/mfzg/uHzn/dv9N5K30P/Mf6L3AP41/Q/8x/j/3d/zP0y/y3+8/y/7vf6H3B/mf+D/5H+U/JL7Bf41/Mv83/cP8r/7P8f////193fsC/aD2Hf1Q++8/AKmwf8P0HKDtD0O+KfMchCUj0QoqMoilSksUSOHzk9uW0tOGHXlHom7m9Xy9o7qxlv3w0+PnDV8gga8YC2+7lG53U+1Tw/+AcLVHOlRpVpmPwt8f9PpyyEfUA52UpHXduW4zqzpgDDp1cdLaPEN8UFWfyCBL2yV4dA9YBTC+S61TRrrrkQOGN8mFaMahzxUbguAcNEm0DAo/lR0SmL43hFEdWDlMJp5OMbfVNS/AfVQqmzmB6DAZocPu8DWegKc9PozJw+ctXATmxRh7yolL+mysuRZGQT0Z0lkDe8t2XwFKHrNSTCBoeSPtSBUdleZguZZeWcNZZIfcKXCuYv5A0ubKSjXj56gKIAQPln2eDYFoH7S+ilTs0NhHQvx+KfxYdYu6gQ62XJkBVH835VcjELU+LD/u3QmqPRzW+RBjvts0O3iaweKHWLfsffrvxV/lSfLtQLDJ41hScfC6ticUyN+y085U/2yP7iG2MM60zUBxzj7KddsVKleQNgZUAXx8zToWikuveX2Cjmrn4S/xxfQ5lL/eoTZUsi2dGwmEPHxCdoU+6Zc9RFCHyWVEgz6kpkPk/OC+eTi9QKD1EFRBYdnqneffyAAA/nLxkSDfJO8h/gjiqmfjWPewyqdQvsFxs07nZBlbZXvKpkbo/IWgNcwCaNc4PVt+Z+Bg7/XAxZWwLyiA2RNeaaN/tDquEgpxkCAETGZwBhlog/nwHKR3+S5F43hcJb0igfDZBDxV8JUjyS9cVRowxQ38foDzsQONXaIEF1K1lPLg3Kun7b+1ZmWm2+fObUvv/+LuZzh0vAAAAzewz7wb07E22KNXhXG0HFV8+vOryYuLB4pH97hVPFYLrWdhpnhrzcz8T8k9YQ2bkKZayMjkZMgaa5WGbAuaX3JbZlv15e4CIOrVDjEHEJCxgnU6DgvgDqQ+f7DQ0jYzbs03HyLrkUhuhaAJhQwbgzYUPcDwMahUa6AsMwiw/ppoESfj5eI5yTQDC+gPAmCIJLsDMF20wSjOPFDSYeixY2GBeLKA/BdonVUFtdZoNao0C2P0+82XdxCEtiT493ArAJvyNzNFdPF1pQpSTFYunPlO61ncwWW3biWOmAAAM2vsahqoDmDHdWcEg7sNQy6qoBO/92do7oRk6+Bdl8SDQpXNYdH8Qma++RbkZ1zvOVqUZV3Nr+W41vJvheXp0SNu1aq5G/DOD+fSBSVe1czuKCQs19YW9cs9mzHtGA10vKg0T4Lhhdn91BXQuvIqjykH20B/YnDMhCbIrFGBTi2fOExM7/ILwQVbt+ST84F5Yaq0MT/ar8e7iLpD3y4p+BUxAyYizvZg2s2eZeV1SJmlaW1F/XrKY6xjXpcxFYR0mOr0nu56qd6ieRJxzai9YtMmZChHjEhVYq1XKU434u0HNUFuFM8K5iiF0HiqHJ/Ubx7h4QYKVHeNqaCxqOeLz63W/zvMCtUT0RqBKldL+DsaEThEBbcnvOqjr9RXHRA0LR4TXiV7HWCwboXtwPGlGZb5PeeqjJ2NwbWG2OP7rYLEGCA4IjFHn4S6ZW4niWF6uYWYU/SrDf3Yu9qdvrcWGqGdQN5bKaJ+y/qwteiZbMNy4QTr7Pw2ceTUQzZFg259ZIG4GTl/PO20/17yo1QskPDvrYnVF2ra88/p8RAMEmEihvgkEIwmQYVkYiPq4m+Y9LE6WXww+4A8LoBlgY3rIhRduE3OUpFd14eCPLTEA3XCY9xpFZ1b1vVRI37eYd4ys0VOy761azLz/940H3GlUUl8b9RTXjvjpzhRFJ4yIr9+W/aUdM84sgkoO/kfzcQpecvIVTnY2ESdsMLrVo7uf+953U1kaSes3jkQrMrjEU+naFs1LMzSKB4uqqcIfUWqPycP4KzKqfcos+6EeZ+mWA4u/NYWGfFGxP8jpVjqWeTjw9XdGTx1tpdld9QhYhHnrTx4SltPeE//NdOn4ndtqcWqi0lqAhZI1hKHchXhX7Sswmio/3+/9nK+xil6VJETHxsgr7jSGa+5Sc1F3u0+W7HB3nx+VU5Nc08Hlb0fK2sJbOGh/C7mBTYdkBcVWZCJsyFkfqwJQcHbVU7iAM/Lguj9TakQhX1a5VPMvFNLjRuvzxM3m5px9Ns3/fsIyx+kc7WEDaTpyxC51eB7AE6NEKLUDV3EreKTHmCFNMjdBteRYuJfVBBG7C6CrU8JQ//SLh+j2z2vssHEzuTz7Ke7AjsO/bfcxlhHtkXc2+4602ng9ZLegf7LL52AR4OZKP83w2zW+Rp7eFiG9EBRUDyWETZg05MIghSSAiySxJ9Qe9QrqaBEZdYgYZPlt6wImAbuRAKvlpuXSJ83pYAV4k0GbidbdkQMIyiv4KB0vTl3GpvOB5Xx6Tl4t2gaLaFFZPTrs9RPDPvpoC+wg5mHpJu9gT5wqrXcGDKzi1QFxutsy04W5cmzdOV7DPMoEHcHszBs2ZcCeihpLj9zYiWhO+yycvegy4yZJpXvEqA6lS5lRUvC+t1LPu1e0n8o/AMdMKGvkgOo7QNpUhl2szDkKJM3FIemafGCBMUcSMHUxW7DNqmKQ055C80edT/9Mq6X+D2QSjHVzOV8XAU0CLdntDj4YHglix/JiTK8CyM1pUR5qY/YOh/CjhLRkOnIfrkYVYv/Yg/Mdoi7TesuDKfs/qVXMSRENQyjbVOSUoYv/Zovmz48a8UAmHDEmq665mjAeH6ECMSNW9CZGZ4xaBT7I7J5W2wsQ8ROjwAyZINNdpxIAU6PtVSHv386z+WafMeg59GWrPMCV4lmv/c69OyAF//FaseVHR0ehLHubGDv1goi1ehngAPQB5T7jrr0txvcfgQUuTjjM64JAAzgecl4DKbfmeTnpXiHg/vS2GuWGHxf9kwDPMExabycyErRUuOk63zYNyuaNJv94tkdQfrPU06jAzXiAuTYrVZMMVxtfXVxun1+Od6LAPr5qtEF91Rkvs8dejCHc2ozBiWj5FPMBggD3vYa1pdVaWKUAJVE/cv6bJp7kIue8+e6VXy8R5Z81XpVHp7k1Acl0P5pkJEq3R8k15cRXDCTYQ5QL36nTvqp0Rtsqx3mhRhERRbCcQJ8affXYL9lc36/N6Yz3bxwK9faEipm3mv/oP6vllpsHQu3l0/+UKw9jtFr707pg+oZzEXKPU35ES80ANqwlafmcRHOTPJvoowA7t0vzTN4rSr3ayaLFDTKGszAIfxnIwRQuDyKfwH/caJKTF/hSBdSXxCFydEgvomMzSD8Qw257o/c+PFiWNwNjz5/KvLmYEp6MhtUBi2oH6CzW49NveqJT6jpejDWMW0LRQxNnf1LwO+wWKUqEwLKoVe0T8kRysE51FTLx0JR2DKbYuZ1jNz8jjjLDAG6ra3vuUuCTK9Pxg/wTwtzc4Sj09uImQ3miGX32a/78kEoY++48G+V0Oijb1qyyx8qYWfxjT1XwkDlPOa1Uve7xtCkvD4gyFpMMbPx6CMVyCuP3CBHsDdK/08QYmwFecIytxk8OqFckUDKT8JvmQfWRw/0nbaFB3HltZ2b0a0BMd/EONfJ179N8UV9RXsu2B6EU/WVffs6/QWknwRvo8eZolIFxDNdV2dEPrXCsOF2pJXlC9eFdhU3A+ErUFPUOWFSbF6jiWwmQWpx3cOxB81jlaaZsnU4hAD3UtRjz8fgCbRI9bbdoeGFwkr2ywDawFxyWq7/3KpTSkSUJiN1W27eJhMlOMs0W+2mdcEWVVISuaA//30bHpt5qfhYit7g5r7R1GC5pra/JBNVo8kB6MgX3rAXCCtEiYFwvLmOFYtMpmA4vkeVwS5YUbZ8PJJI2vLDwafHNegAbYnu4ereUs6oRgUfV8dV9gHNYHIYxmqQXhrQ9i6KZLeqtIomcTEvWUCQYjSJbfrSc+gIsGK+Q51uxNhmNeGq/Je2K/OhZiUgk5cR7+GZfx1XzUpTI5cDLO4cZrgz3SaVgLc9ZPJINEmx55yrHrvcJ0p/bqrSre0v+kqeK360Knl+EKvURu3eNOT98DPUL4cwl3SEymNhWTvWVKzLco4ZoqSrB/QWcVG/pVCPf+38eVV9fJO1FijC4UTA7H+ZfY/zTsO2pslZSq/wB9w5AFd9RLZxAFDo/D/pnOQpnc1nW+rJ3+HAEDlDp0OJePBF4l+UshCg/3utIRYOQpXepEYQIQ1ocNsr4Yo6nHFyiYt+R0mfELx7yGWPRPxaMnowflG517hlz/9q2pRgJOX2bJkuu17icNj0B7RBG4NO/oOplOgxNImbd8Nmu+v5q/5lXjZfPmWQsMgUH7UfSIYL7uc4bbCFdxxg2E7oyV52BBwfGQiGmgBUTLoKcwI79Nxcpic6bzgcsE3xc58WsMCb4HmHxJUjSctvvWNP/9TWWV2iUvA4Pia2Y519+5lZo52C4B3FikVNJBldhXfj9MHWH6nkOB36xOB591AN/ETBniSwkMG99SdZj3Hd2fK4CMEOT3ckRJyTp4wFDRwRHpN1hRe3Qgcz6pVaN2efkS9ihSwvmNM0uu0imOgxrv/Tei8E1yrvMVEouBmzSTNmubbI4LLSkXVPkAmJJrq/nZK4slos2KmSEaDfMQ9bAQY373/ImKgOyKVICu4sIpM2KptL7jgKbtnAdvhcC11MK0ighX6LqNwVw4XjVBLoSPCWC5ud81bn5o1GVJXEB5kwwC9IWweLyxDYqZXq3ItsFPrYoWY2OinvOqtch2XLI0zQsi4gETwsEciZeAvwgW/x1v0jjzpuSQRHDCwv4QqDT7vSuCfNFgw65DATWZtGPK7KODTalaKvJxCQoV6bTlD275W37FJcjVkjoSY1f4Q9LfrJG+2B6iqWcUau6P2tkbs5CgRb33JosW7YdQQvStXJsi2w4UPSLjp7zH6f2DRJhoete0JMzn15Ye/LjBhaDVi4twizvXg48zo2mFjOUVHIbu9FkIrmqhXsbSx+Oj2v61jDuoyH8Fai9ntz40shCl1hxUEgFOeIvRXvqHFxDlxzJPoqNp8rMuzmJSLCTD3xnygRRZGrqu1VLfxeRvCStyKpxhb69jLGr725H5ER+tEnE61+vjRVPi5ObQSFg3E3s//ElHs02xmI1W4aWmqd57Vlyu15Ky6h0nYfZuTXO4Hml83/84Zpv9gk+ngCukb0s/tjOX/YDtTagUZCsV4SUPCnNK5TRo1A0dMge9exUVMbRKtM8Xsqi+Fs/RuKol5zJQxmJ9/dp/cBX9lKAFYV4V1tYOO4sb7NcXmrRrQVjS0mj9hRWxUA2c0IBkOIm8uDYtGqFoa05Fq4dw0k08N1mh76mpdbSxSVuy5pt6vGkdK6k5NVsn4WgRGGJP76i8aUucqUWmuwV3GNaPAxRUvUYPu8PvOyD7/TybFxADv3TVmvixncsXuve4HR+p64BpI91+f7d4nL7LymUhYM8j2bwDlM5Zat4hdZB8EG4psgsbVKWEkQgiY7K3rHPeUZkJtdLbiuiuBMdf0AqUwbcdcARFkMCZdHHrSfP0tsnkn5yMgJB2eFsx9HgBJwzZOhD3UPakYrA0qwr/OvwW2mJi524UhDlKQkR5n9xfqJot6vkU3XCBraWkWu/6o9Cp7Jez/Mvdq/fwGSAdpsJGNVFQiTBwLNtpcc+IzY6bB7xyRH4HmwO/v5V9s1fZV/xBJfLBPxO5eM/Iks6UkRKYNVl9vwgdhURnDyOcMgoaAHqG0cBS0lRF6HyMQhnr73QagWOyffoxJ6xfZLw4pdTw/B+cb+zm+v5hEv1A04cCRGVizwIkrlnhRGTQIGy7Tnz0USDKSTpv1A3VTox61Z/TD6Hv1QzeUcDVu9v+DWXuCqcXE6prG4RCfZljCjThLGay2kZZyiA7pfc7AEjJ4Khvb0Ag4YhHpNoPyazDnX0dCFmbEEj2qVeV9XdQdvFtidfePL8RQPKRIUcL8gzVi8jXodXcGZa/n07/IosSIuGTDSW7vfijrlrAwRWqVL8uZNjreLorbrkVbhoXuJIu7qM4C8qunZ98I4SYBME7MSThZsA2wd6yYbqcmzhX+3w78tnal77WlPGITu3edscCOdDJTs2cqGg3PVxw1ViGXWj+/O9TdYcIZF2GpZ6TqcCsR9z/UDsyZgG7htfs+PH3jDVzrvCxSQ3a4ATvZoLMlYWpGLOW7bwK4mBF8ym3HGIwjP0IpyjsfzphJ2V62TIuewEsYte13Dibra1B4cfPOkrFYDs5Vs+Om7VQnfMFFDGjSaIz2DhyhCKCbIpauPAuwrWnzMu6MO7H2Lhu/gni+iCIp0r6Ud5UYLRV3+AgiXIKNJQpnpXXeMQ8lMZNiVBNloaZt3FCwC7bsFae5Kmfb61+2CZsx8pkAJJHKFb34c5CUQgz5e58qn72rNS9tshWhzbgHhaA3uDsTQupbKHwnaxdqrC5nFgPSEMwBFsKOE9B2I77KCXVqiSTU2eRtHOYULPIWaDPaI/0zOd/DuCqgj6s4ceAREDlK/dF6qF6xps4I780TYLhXDXLEeEXWnH6ubNGG0vPHgxnOQYxY/Swe0L6lTNUFaJo5v3OPxGw3QNo+SnRFzzrvNRWg7WeijVjbBK+5dzjMSt+CFt6u43bakmHm1Gx1w7KJtG0xLrYS7wpBspKv7ahe77ahVa36PfZolORrEP91EFVqVfzQFJYsHXcz48ubW5GzqyQi7I+YyJCRC0Y2+qEj02qmrnm3l1QtChsxqrOE4FO54mPO273wczh8CyoJvlCWLAzYmBEoBi4RDlKXdzta9eC2RrCAc2ZqQHsqKbwdmwMYEaVFTceQBZtd9iBM3y8gslQw8poeyPvYhMjI0Nryd5w6cLFptjsXTJujzxbQPQ1vGGxjJl1No+U91l9YmbpUqxZ1KtTQY5UT7hhesp8swkzZ5e8BHITpnR+gPkbkMCIbRNsp42/ILoVWM5WZ2dBE6FrSM6Y1wsvozTBQhhWam3F6BPlpq1qyA22rK0BrNGP5pkGEU8TTMjY2vMcn9ATqWstFrff3dV5Z/1ohpQEqCRb5jssSBJb1Tz7kJEyYT/6/S/xMteyBwuSpHSaHupYE5WZR4T8LI4CeGICJGE9LQWYDLOnbqZzZ2WwwoUtQbcyY6a+U9HT34KgjVDvVP9MFPwIWmdwVhmwYNlFeWJiMW/LNjovAMvNC3HLkvhHT4iQ+1Tc2SE7x0lAfmUG6PUEMLre+xngYE3PNil24Flw6D8HHdTLnAH6lEceIwwqQdVKrMYDKOnYgX+VA17yeaVhxkOGpJtRixLJu9rRujfl3T2Hk1X6fNGFbpbBsBi3tC67B53Ip3khQWHiU3k3iPtby+862HWX91wC966ADyqrin2YnX9RaSTIDzaTVFRiKEVPzfoZX1TBg+aRSHGK9eOR30WGeFbz4ujz15lTnx13F+MoflGd6IttS3ItUxwkngvluh9qvYPxixM6k78DSumYKE+/JIzqR6ZdMeiEuCp+Zua7v+qWVFcuqAbGeMFXLQyaeWa5n9OQ+xcbT4pat71YkS/sF8cAJ21IWPwdDzdnGm/+/5dMG2SxhBJgGnKfVF5XHjasBbWNA8d8NUaeAlw9xIj4DJKSag7W2sk9fzEtQMKYbmfsQi+Lwc3Fzj3FIjXWEr6NfpvOXCFIA+u4uqTV3vBL16y4qfAisFk3KSvU4p7sqPmgF+KhFjWulQNjcIc9rlIDPTsufhnvfqgURcbuHhSsfTqnUYx4iouzD6PWHGvjMOC94C2czo90t8d6IZmUEpfTGWiYRBH1qDkM5nnU/iAXqDlJhi2jfv1H4rweQQp94YgHZP9zWh3oiWhgsmMq3Sr7isKdw7h2/dPkNaLmG+s7JNrh6svXFbxh4r9l9YWjfAY7Z/+3/1eQkC7Ez0NXe2h3Ef+olB3lICN0rbn4M+RrUACR7TzPJFiYzbuybgYF/ZDIvBofABZnrG9rHUlAvZuNL5JqgJk0ybbHRXdR8f5E14SSzfWJBOnjrtU9X4X5+3j9tblRCr0vObBTLOUocQ99q62qa1m6Uu9Gg0gc2RjUdltYxSO2sxloHfwsvVD9DM11OVZT7W5ZiqP6Z2nMKqPf0XS+tLWMzdilG2GW/ONgnfRmXHhGeR/Hcr3/pwayVbUcogcIqCt24H+f8dKb5jwSnP/p8jKj7c7l2nHWAy/u/tGmqgL81n3QXz9nTbnEywMruxR4Sii6EIXG0ySWbTsmRlTI4LBLwqzqOSshL0LAZL1T7U1qkDrvUqsrRU3K6lLlazGuwoSbAkWdwGGLOk6jSeHiVGeZinaUbEIUcbxx7Nj7GY62Sog5oTv26YKibtaqPyNSHmTvOrLqBneWC2Wk897GlvAD9vYz1ZDZ4AnOn8tCjW80FobR0zl/NhWyzNiFKFruuo6yQJPDchdLm7k5+zyDfVwayTxDBn5pzedoXE3/NKagO53V4OMsCsTlA6SloYg6J9uXm6q0DFBdfTEpq12oeQpk4eJCpDyN4fY6cSiAl8cEE7jjOBl0oAB9GKD5R5dorcyUmy1MJxDfb2iNBmlaAZcR97aOilPwj91qriTpLVHWCCXvLmNz36uHTQPmmPlBkAv7Thyp1233OQpnH1UQgL32Frid6cPXhjQqSTO77P13XFonWhIvxLgTZqdgazUmV4bMfWpktdNh+zyoZzgsDGYm+a+rvstWg5kkhI+iCtLPq5AiPgPmd7n1okWeL8y2OlrgB4b8gAhFrlY4IbC+fx4h5oOOIbrNn1Xfu06gyLiCX9MLlO4+HmuqJxTJt5hMA2XwmIS5cHe62MyZSxDuySMOq3fqnc1G4AIQdzyx4PU9V7ID4dCIr+GCE3dqj961v1DXvT/TuwDadLceGz2kubbrxmNST5oVirp1Ye7nuIlx1nNxMTzdVSHvImtK1ixVhzao91z6q2zJ4AxunhYXwmVVIDtbMtkFnmgrGBY1WLbamJV/g/O9uv0RMfucbjQ/bGo3jKAOshulB+nCF7qy93TkhUgg17LO+XLSA/IaCMwWJMhAe2/uEeTOj36ngNzy2hrdedshVa2++yL7JLgxXaUq+4a8wWSjSCVkLHGzoSmBoMlw8R+XO6huq4zYguhbxpkbnqyYNNF1SkWuEoA4TwxLL8HDOEFUoaY+nG3wBOF1iaN/ZPTsan4Kw0o5Y3Ph+7oEzVWzHXmkcASMddYRelfateGW26Ica4XOtXjWMASEFwtc9YPRqgu5mkkRHIo8kqVwNFF9B1oNA6PNzCF88cUZhlhgZhrsY5+DXrymHZUFKngiDBwfqrV1HsxOPtr20p3/frX0UM3D2LbUqZevcdWsH9+Wepgw8ZmdGtkLROVdmQ779mnrrkl/MNpPbm9AFtwg6qQ+JATOuiXpXDAM2vKzvpQo+lfRj6jXvz+5LteVS42TKGw3PewhkQuvU0H2aft13hnorPQbX/upJ95SNOo0wvF7Y2SBxlskMarioWKXY2YjlQGUrYf7/xlGGnOWY8b7OaeNs/AC6z4MScuJ8MzqAAAA==";
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');`;

function num(v) { const n = parseFloat(v); return isNaN(n) ? 0 : n; }
function money(n) {
  const v = num(n);
  const abs = Math.abs(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return v < 0 ? `-$${abs}` : `$${abs}`;
}
function compactMoney(n) {
  const v = num(n);
  const abs = Math.round(Math.abs(v)).toLocaleString();
  return v < 0 ? `-$${abs}` : `$${abs}`;
}
function fmtDate(d) {
  if (!d) return "—";
  const dt = new Date(d + "T00:00:00");
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
function shortDate(d) {
  if (!d) return "—";
  const dt = new Date(d + "T00:00:00");
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
function mmdd(d) {
  if (!d) return "—";
  const dt = new Date(d + "T00:00:00");
  if (isNaN(dt)) return d;
  return `${String(dt.getMonth() + 1).padStart(2, "0")}.${String(dt.getDate()).padStart(2, "0")}`;
}
function mmddyyyy(d) {
  if (!d) return "00000000";
  const dt = new Date(String(d).slice(0, 10) + "T00:00:00");
  if (isNaN(dt)) return "00000000";
  return `${String(dt.getMonth() + 1).padStart(2, "0")}${String(dt.getDate()).padStart(2, "0")}${dt.getFullYear()}`;
}
function mmddyyyySlash(d) {
  if (!d) return "—";
  const dt = new Date(String(d).slice(0, 10) + "T00:00:00");
  if (isNaN(dt)) return "—";
  return `${String(dt.getMonth() + 1).padStart(2, "0")}/${String(dt.getDate()).padStart(2, "0")}/${dt.getFullYear()}`;
}
function payPeriodLabel(start, end) {
  if (!start || !end) return "—";
  return `${shortDate(start)} - ${shortDate(end)}`;
}
function pickupCityState(l) {
  return cityState(l.shipperCity, l.shipperState) || l.shipperName || "—";
}
function deliveryCityState(l) {
  const stops = l.stops || [];
  const last = stops[stops.length - 1];
  if (!last) return "—";
  return cityState(last.city, last.state) || last.receiverName || "—";
}
let pdfLibsPromise = null;
function loadPdfLibs() {
  if (pdfLibsPromise) return pdfLibsPromise;
  pdfLibsPromise = new Promise((resolve, reject) => {
    if (window.jspdf && window.html2canvas) { resolve(); return; }
    let loaded = 0;
    function checkDone() { loaded += 1; if (loaded === 2) resolve(); }
    function onError() { reject(new Error("Failed to load PDF library")); }
    if (!window.html2canvas) {
      const s1 = document.createElement("script");
      s1.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      s1.onload = checkDone; s1.onerror = onError;
      document.head.appendChild(s1);
    } else { checkDone(); }
    if (!window.jspdf) {
      const s2 = document.createElement("script");
      s2.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s2.onload = checkDone; s2.onerror = onError;
      document.head.appendChild(s2);
    } else { checkDone(); }
  });
  return pdfLibsPromise;
}
async function generatePdf(filename) {
  let wrapper = null;
  try {
    await loadPdfLibs();
    const node = document.querySelector(".print-area");
    if (!node) return;
    const PDF_WIDTH = 780;
    const SCALE = 2;
    wrapper = document.createElement("div");
    wrapper.style.cssText = `position: fixed; left: -99999px; top: 0; width: ${PDF_WIDTH}px; background: #fff; z-index: -1;`;
    const clone = node.cloneNode(true);
    clone.classList.add("pdf-mode");
    clone.style.width = PDF_WIDTH + "px";
    clone.style.maxWidth = "none";
    clone.style.position = "static";
    clone.style.margin = "0";
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    // Measure, from the live clone, where the header zone ends and every row-like
    // element's bottom edge — these become the only places a page break is allowed
    // to land, so a page break can never cut through a row's text the way a blind
    // fixed-height slice could.
    //
    // The header boundary is measured as "everything before the first table" rather
    // than a specific class name — some documents (e.g. Dispatcher Statement) have a
    // period/summary line that sits as a sibling after .stub-header2, not inside it,
    // which previously made the measured header too short and let the repeated body
    // content overlap the tail end of the header on page 2+. Measuring up to the
    // first table catches that content regardless of which div wraps it, and a small
    // safety buffer protects against any remaining sub-pixel rounding.
    const cloneTop = clone.getBoundingClientRect().top;
    const firstTableEl = clone.querySelector("table, .ifta-table");
    const headerHeightCss = firstTableEl ? Math.max(0, firstTableEl.getBoundingClientRect().top - cloneTop) + 8 : 0;
    const rowEls = Array.from(clone.querySelectorAll("tr, .ifta-row"));
    const safeCutPointsCss = rowEls
      .map((el) => el.getBoundingClientRect().bottom - cloneTop)
      .sort((a, b) => a - b);

    const canvas = await window.html2canvas(clone, { scale: SCALE, backgroundColor: "#ffffff", useCORS: true, width: PDF_WIDTH, windowWidth: PDF_WIDTH });
    document.body.removeChild(wrapper);
    wrapper = null;

    const headerHeightPx = headerHeightCss * SCALE;
    const safeCutPointsPx = safeCutPointsCss.map((y) => y * SCALE);

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const MARGIN_X = 22, MARGIN_Y = 22, FOOTER_SPACE = 16;
    const imgWidthPt = pageWidth - MARGIN_X * 2;
    const pxPerPt = canvas.width / imgWidthPt;
    const headerHeightPt = headerHeightPx / pxPerPt;

    // Pre-render the header slice once (if this document has one), so it can be redrawn
    // at the top of every page after the first.
    let headerSliceData = null;
    if (headerHeightPx > 0) {
      const hCanvas = document.createElement("canvas");
      hCanvas.width = canvas.width;
      hCanvas.height = Math.round(headerHeightPx);
      const hctx = hCanvas.getContext("2d");
      hctx.fillStyle = "#ffffff";
      hctx.fillRect(0, 0, hCanvas.width, hCanvas.height);
      hctx.drawImage(canvas, 0, 0, canvas.width, hCanvas.height, 0, 0, canvas.width, hCanvas.height);
      headerSliceData = hCanvas.toDataURL("image/jpeg", 0.92);
    }

    // Work out where every page break falls, snapping each one to the nearest safe
    // row boundary at or before the point where the page would otherwise run out of
    // room — never in the middle of a row.
    const pageBreaks = [];
    {
      let pos = 0;
      let pageIndex = 0;
      while (pos < canvas.height) {
        const extraHeaderPt = pageIndex > 0 ? headerHeightPt : 0;
        const usableHeightPt = pageHeight - MARGIN_Y * 2 - FOOTER_SPACE - extraHeaderPt;
        const usableHeightPx = usableHeightPt * pxPerPt;
        const limit = pos + usableHeightPx;
        if (limit >= canvas.height) { pageBreaks.push(canvas.height); break; }
        let cut = limit;
        for (let i = safeCutPointsPx.length - 1; i >= 0; i--) {
          if (safeCutPointsPx[i] <= limit && safeCutPointsPx[i] > pos + 10) { cut = safeCutPointsPx[i]; break; }
        }
        pageBreaks.push(cut);
        pos = cut;
        pageIndex++;
      }
    }
    const totalPages = pageBreaks.length;

    let renderedPx = 0;
    for (let i = 0; i < totalPages; i++) {
      if (i > 0) pdf.addPage();
      let cursorY = MARGIN_Y;
      if (i > 0 && headerSliceData) {
        pdf.addImage(headerSliceData, "JPEG", MARGIN_X, cursorY, imgWidthPt, headerHeightPt);
        cursorY += headerHeightPt;
      }
      const sliceEndPx = pageBreaks[i];
      const sliceHeightPxActual = sliceEndPx - renderedPx;
      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = sliceHeightPxActual;
      const sctx = sliceCanvas.getContext("2d");
      sctx.fillStyle = "#ffffff";
      sctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
      sctx.drawImage(canvas, 0, renderedPx, canvas.width, sliceHeightPxActual, 0, 0, canvas.width, sliceHeightPxActual);
      const sliceData = sliceCanvas.toDataURL("image/jpeg", 0.92);
      const sliceHeightPt = sliceHeightPxActual / pxPerPt;
      pdf.addImage(sliceData, "JPEG", MARGIN_X, cursorY, imgWidthPt, sliceHeightPt);
      renderedPx = sliceEndPx;
      if (totalPages > 1) {
        pdf.setFontSize(9);
        pdf.setTextColor(120, 120, 120);
        pdf.text(`Page ${i + 1} of ${totalPages}`, pageWidth / 2, pageHeight - 12, { align: "center" });
      }
    }
    pdf.save(filename + ".pdf");
  } catch (e) {
    console.error("PDF generation failed", e);
    if (wrapper && wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);
    window.print();
  }
}
function loadConfirmationFilename(load) {
  return `LC${load.loadNumber}-${load.truck || "0"}-${mmddyyyy(load.pickupDate || load.deliveryDate)}`;
}
function driverPayFilename(stubRecord, tripsList) {
  const truck = (stubRecord.trucksUsed && stubRecord.trucksUsed[0]) || "0";
  let tripNum = "0";
  if (stubRecord.tripIds && stubRecord.tripIds.length > 0 && tripsList) {
    const t = tripsList.find((tr) => tr.id === stubRecord.tripIds[0]);
    if (t && t.tripNumber) tripNum = t.tripNumber;
  }
  return `Driver${truck}-T${tripNum}-${mmddyyyy(stubRecord.generatedAt)}`;
}
function dispatcherPayFilename(stubRecord) {
  const nameParts = (stubRecord.dispatcherName || "Dispatcher").trim().split(/\s+/);
  const lastName = nameParts[nameParts.length - 1] || "Dispatcher";
  const dateSrc = stubRecord.periodEnd || stubRecord.generatedAt || todayISO();
  const dt = new Date(String(dateSrc).slice(0, 10) + "T00:00:00");
  const month = isNaN(dt) ? "" : MONTH_NAMES[dt.getMonth()];
  const year = isNaN(dt) ? "" : dt.getFullYear();
  return `Dispatcher${lastName}${month}${year}`;
}
function iftaFilename(report) {
  const truckPart = report.truck === "ALL" ? "All" : report.truck;
  return `IFTA${report.quarter}Q${report.year}-${truckPart}`;
}
function invoiceFilename(load) {
  return `INV${load.loadNumber}-${mmddyyyy(load.invoicedAt ? load.invoicedAt.slice(0, 10) : todayISO())}`;
}
function fmtPeriodShort(start, end) {
  if (!start || !end) return "—";
  const a = new Date(start + "T00:00:00"), b = new Date(end + "T00:00:00");
  if (isNaN(a) || isNaN(b)) return `${start} – ${end}`;
  if (a.getFullYear() !== b.getFullYear()) return `${fmtDate(start)} – ${fmtDate(end)}`;
  const mo = (d) => d.toLocaleDateString(undefined, { month: "short" });
  if (a.getMonth() === b.getMonth()) return `${mo(a)} ${a.getDate()}–${b.getDate()}`;
  return `${mo(a)} ${a.getDate()} – ${mo(b)} ${b.getDate()}`;
}
function driverPayReportFilename(start, end) {
  return `DriverPay_${start || ""}_${end || ""}`;
}
function annualTaxFilename(driverName, truck, year) {
  const parts = (driverName || "").trim().split(/\s+/).filter(Boolean);
  const initials = parts.map((p) => p[0]).join("").toUpperCase() || "X";
  return `${initials}${truck || "0"}T${year}`;
}
function annualTaxAllFilename(year) {
  return `AnnualTaxReportAll${year}`;
}
// The business's chosen timezone for "what day is it" purposes, synced from
// settings.timezone. Defaults to Pacific. "local" means the device's own
// timezone (for overseas use) rather than a fixed US zone.
let appTimezone = "America/Los_Angeles";
const US_TIMEZONES = [
  { value: "America/Los_Angeles", label: "Pacific Time" },
  { value: "America/Denver", label: "Mountain Time" },
  { value: "America/Chicago", label: "Central Time" },
  { value: "America/New_York", label: "Eastern Time" },
  { value: "America/Anchorage", label: "Alaska Time" },
  { value: "Pacific/Honolulu", label: "Hawaii Time" },
  { value: "local", label: "Local Time (This Device)" },
];
// Resolves "today" (or any moment) to a Y-M-D string in the given timezone,
// using Intl.DateTimeFormat so DST transitions are handled automatically —
// this replaces the previous approach of converting to UTC, which silently
// returned the wrong calendar date during evening hours in any US timezone.
function dateStringInTimezone(tz, when) {
  const zone = tz === "local" ? undefined : tz;
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(when || new Date());
  const map = {};
  parts.forEach((p) => { if (p.type !== "literal") map[p.type] = p.value; });
  return `${map.year}-${map.month}-${map.day}`;
}
// Formats the current time for the header clock, e.g. "PDT 02:25 PM".
function formatClockInTimezone(tz) {
  const zone = tz === "local" ? undefined : tz;
  const now = new Date();
  const timeStr = new Intl.DateTimeFormat("en-US", { timeZone: zone, hour: "2-digit", minute: "2-digit", hour12: true }).format(now);
  const tzParts = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "short", hour: "numeric" }).formatToParts(now);
  const tzAbbr = (tzParts.find((p) => p.type === "timeZoneName") || {}).value || "";
  return `${tzAbbr} ${timeStr}`;
}
// Formats a specific stored timestamp (not "now") into a readable date+time
// string, e.g. "Sep 9, 2026 at 2:34 PM" — used for showing exactly when a
// record like an Oregon Permit filing was actually marked.
function formatStoredTimestamp(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const zone = appTimezone === "local" ? undefined : appTimezone;
  const dateStr = new Intl.DateTimeFormat("en-US", { timeZone: zone, month: "short", day: "numeric", year: "numeric" }).format(d);
  const timeStr = new Intl.DateTimeFormat("en-US", { timeZone: zone, hour: "numeric", minute: "2-digit", hour12: true }).format(d);
  return `${dateStr} at ${timeStr}`;
}
function todayISO() { return dateStringInTimezone(appTimezone); }
function daysAgoISO(n) {
  const d = new Date(todayISO() + "T00:00:00");
  d.setDate(d.getDate() - n);
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function inRange(dateStr, start, end) { if (!dateStr) return false; return dateStr >= start && dateStr <= end; }
function overlaps(aStart, aEnd, bStart, bEnd) { return aStart <= bEnd && aEnd >= bStart; }
function nextDayISO(iso) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function uid() { return Date.now() + Math.random(); }
// Retries a couple of times to ride out brief connection hiccups. Only "not saved
// yet" counts as empty: any other failure throws, so the app never opens with
// blank lists that the next save would write over the real data.
async function safeGet(key, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await window.storage.get(key);
    } catch (err) {
      if (err && err.notFound) return null;
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
    }
  }
}
function addr1line(street, city, state, zip) { return [street, city && state ? `${city}, ${state}` : city || state, zip].filter(Boolean).join(", "); }
function cityState(city, state) { return [city, state].filter(Boolean).join(", "); }
function abbrevName(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0][0]}. ${parts[parts.length - 1]}`;
}
function norm(s) { return (s || "").trim().toLowerCase(); }

const emptyStop = () => ({ id: null, receiverName: "", city: "", state: "", zip: "", warehouseCode: "", notes: "", trailer: "" });
const emptyLoad = () => ({
  id: null, loadNumber: null, billTo: "", workOrder: "", rate: "",
  driver: "", truck: "", dispatcher: "",
  shipperName: "", shipperCity: "", shipperState: "", shipperZip: "", shipperWarehouseCode: "", shipperNotes: "", shipperTrailer: "", pickupDate: "",
  stops: [{ ...emptyStop(), id: uid() }], deliveryDate: "",
  loadedMiles: "", deadheadMiles: "", orMiles: "", status: "active", paidStatus: "unpaid", paidStubId: null,
  bolDataUri: "", bolFileName: "", bolType: "",
  invoiceStage: "none", invoicedAt: null, paidAt: null, notes: "",
  dispatcherPaidStatus: "unpaid", dispatcherPaidStubId: null,
});
function normalizeLoad(load) {
  if (load.stops && load.stops.length) {
    return { paidStatus: "unpaid", paidStubId: null, bolDataUri: "", bolFileName: "", bolType: "", invoiceStage: "none", invoicedAt: null, paidAt: null, dispatcher: "", shipperWarehouseCode: "", shipperNotes: "", shipperTrailer: "", notes: "", dispatcherPaidStatus: "unpaid", dispatcherPaidStubId: null, orMiles: "", ...load, stops: load.stops.map((s) => ({ notes: "", trailer: "", ...s })) };
  }
  const stop = { id: uid(), receiverName: load.receiverName || "", city: load.receiverCity || "", state: load.receiverState || "", zip: load.receiverZip || "", warehouseCode: "", notes: "", trailer: "" };
  return { ...load, stops: [stop], paidStatus: load.paidStatus || "unpaid", paidStubId: load.paidStubId || null, bolDataUri: load.bolDataUri || "", bolFileName: load.bolFileName || "", bolType: load.bolType || "", invoiceStage: load.invoiceStage || "none", invoicedAt: load.invoicedAt || null, paidAt: load.paidAt || null, dispatcher: load.dispatcher || "", shipperWarehouseCode: load.shipperWarehouseCode || "", shipperNotes: load.shipperNotes || "", shipperTrailer: load.shipperTrailer || "", notes: load.notes || "", dispatcherPaidStatus: load.dispatcherPaidStatus || "unpaid", dispatcherPaidStubId: load.dispatcherPaidStubId || null, orMiles: load.orMiles || "" };
}
// Real arrival/departure times for a load, from its truck's ETA Board arrival
// log (live GPS or "Mark Arrived"). Newer log entries carry the load's id; older
// ones are matched by stop (code or city) and a date window around the load.
function loadArrivals(load, etaBoard) {
  const e = load && load.truck && (etaBoard || {})[load.truck];
  const log = (e && e.arrivalLog) || [];
  if (!log.length) return null;
  const rt = loadRoute(load);
  const from = load.pickupDate ? new Date(`${load.pickupDate}T00:00`).getTime() - 86400000 : null;
  const to = load.deliveryDate ? new Date(`${load.deliveryDate}T23:59`).getTime() + 86400000 : null;
  const ours = (x) => (x.loadId ? x.loadId === load.id
    : from != null && to != null && new Date(x.arrivedAt).getTime() >= from && new Date(x.arrivedAt).getTime() <= to);
  const at = (type, code, place) => {
    const hits = log.filter((x) => x.arrivedAt && x.type === type && ours(x)
      && ((code && (x.code || "").toUpperCase() === code) || (place && norm(x.place) === norm(place))));
    return hits.length ? hits[hits.length - 1] : null;
  };
  const out = { pickup: at("pickup", rt.fromCode, rt.pickupPlace), mids: rt.mids.map((m) => at("stop", m.code, m.place)), delivery: at("delivery", rt.toCode, rt.to) };
  return out.pickup || out.delivery || out.mids.some(Boolean) ? out : null;
}
function stopLabel(index, total) { return index === total - 1 ? "Final Delivery" : `Stop ${index + 1}`; }
function routeSummary(load) {
  const stops = load.stops || [];
  const origin = load.shipperWarehouseCode || cityState(load.shipperCity, load.shipperState) || load.shipperName || "—";
  if (stops.length === 0) return origin;
  const last = stops[stops.length - 1];
  const dest = last.warehouseCode || cityState(last.city, last.state) || last.receiverName || "—";
  const extra = stops.length > 1 ? ` (+${stops.length - 1} stop${stops.length - 1 > 1 ? "s" : ""})` : "";
  return `${origin} → ${dest}${extra}`;
}
// Amazon loads use short warehouse codes (e.g. "ONT8 → LAX9") that are
// meaningful at a glance. Other brokers mostly don't use codes at all, so
// the same field would show a city/state or a raw name instead — showing
// the broker's name there is more useful for a collapsed row.
function collapsedRouteDisplay(load) {
  const billTo = (load.billTo || "").trim();
  if (billTo.toLowerCase().includes("amazon")) return routeSummary(load);
  return billTo || routeSummary(load);
}
function routeFull(load) {
  const stops = load.stops || [];
  const origin = `Pickup: ${cityState(load.shipperCity, load.shipperState) || load.shipperName || "—"}`;
  const legs = stops.map((s, i) => `${stopLabel(i, stops.length)}: ${cityState(s.city, s.state) || s.receiverName || "—"}`);
  return [origin, ...legs].join(" → ");
}
function routeFullJSX(load) {
  // Legacy stubs saved before this format only have a plain "route" string (no stops/shipper data) — fall back gracefully.
  if (load.route && !load.stops) return load.route;
  const stops = load.stops || [];
  const originText = cityState(load.shipperCity, load.shipperState) || load.shipperName || "—";
  return (
    <>
      Pickup: <strong>{originText}</strong> ({mmdd(load.pickupDate)}) {stops.map((s, i) => (
        <Fragment key={i}>
          {" → "}{stopLabel(i, stops.length)}: <strong>{cityState(s.city, s.state) || s.receiverName || "—"}</strong>
        </Fragment>
      ))}
    </>
  );
}
const emptyDriver = () => ({ id: null, name: "", phone: "", companyName: "", taxId: "", payType: "percent", rate: "", dispatchFeePercent: "", notes: "", active: true, truckBalance: "" });
// Tidies a US phone number when the field is left: 5551234567 -> (555) 123-4567.
// Anything that isn't a plain 10-digit US number is left exactly as typed.
function formatPhone(v) {
  const raw = String(v || "").trim();
  let d = raw.replace(/\D/g, "");
  if (d.length === 11 && d[0] === "1") d = d.slice(1);
  if (d.length !== 10 || /[a-z]/i.test(raw)) return raw;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
  } catch { /* fall back below */ }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch { return false; }
}
const emptyTruck = () => ({ id: null, number: "", notes: "", active: true, assignedDriver: "" });
const emptyDispatcher = () => ({ id: null, name: "", payMethod: "percent", payValue: "", notes: "", active: true, position: "dispatcher" });
function computeDispatcherPay(dispatcher, grossTotal, loadCount, globalDefaultPct) {
  if (!dispatcher) return { method: "percent", value: globalDefaultPct, earnings: grossTotal * (globalDefaultPct / 100) };
  const hasCustom = dispatcher.payValue !== "" && dispatcher.payValue !== null && dispatcher.payValue !== undefined;
  if (!hasCustom) return { method: "percent", value: globalDefaultPct, earnings: grossTotal * (globalDefaultPct / 100) };
  const value = num(dispatcher.payValue);
  if (dispatcher.payMethod === "flat") return { method: "flat", value, earnings: value * loadCount };
  return { method: "percent", value, earnings: grossTotal * (value / 100) };
}
const emptyBillTo = () => ({ id: null, name: "", contact: "", phone: "", email: "", address: "", paymentTerms: "", active: true });
const emptyShipper = () => ({ id: null, companyName: "", warehouseCode: "", street: "", city: "", state: "", zip: "", contact: "" });
const emptyReceiver = () => ({ id: null, companyName: "", warehouseCode: "", street: "", city: "", state: "", zip: "", contact: "" });
const emptyTrip = () => ({
  id: null, tripNumber: "", truck: "", startDate: daysAgoISO(6), endDate: todayISO(),
  driver1: "", driver2: "", driver2Color: "clear",
  driverPay: "", advances: "", fuelCost: "", orPermit: "", logbook: "", insurance: "",
  logbookMonth: "", insuranceMonth: "", orPermitNote: "", truckPayNote: "",
  otherCharges: "", otherChargesList: [], refunds: "", refundsNote: "", truckPay: "",
  cancellations: "", cancellationsList: [],
  paidStatus: "unpaid", paidStubId: null, tripStatus: "active", tripNote: "", tripNoteColor: "clear",
});
function normalizeTrip(t) {
  const base = { paidStatus: "unpaid", paidStubId: null, driver2Color: "clear", otherChargesList: [], logbookMonth: "", insuranceMonth: "", orPermitNote: "", truckPayNote: "", tripStatus: "active", tripNote: "", tripNoteColor: "clear", refundsNote: "", cancellations: "", cancellationsList: [], ...t };
  // Migrate legacy single otherCharges/otherNotes into the itemized list, once.
  if ((!base.otherChargesList || base.otherChargesList.length === 0) && (num(base.otherCharges) > 0 || (base.otherNotes && base.otherNotes.trim()))) {
    base.otherChargesList = [{ id: uid(), amount: base.otherCharges || 0, note: base.otherNotes || "Other Charges" }];
  }
  return base;
}
function sumOtherCharges(list) { return (list || []).reduce((s, item) => s + num(item.amount), 0); }

const TRIP_EXPENSE_FIELDS = [
  { key: "driverPay", label: "Driver Pay" },
  { key: "advances", label: "Advances" },
  { key: "fuelCost", label: "Fuel Cost" },
  { key: "orPermit", label: "Oregon Permit" },
  { key: "logbook", label: "Logbook" },
  { key: "insurance", label: "Insurance" },
  { key: "otherCharges", label: "Other Charges" },
  { key: "truckPay", label: "Truck Pay" },
];

// Categories that deduct from a driver's own pay stub (spec-defined order).
// "driverPay" from TRIP_EXPENSE_FIELDS is excluded here — that's the owner's
// manual company-profit entry, not a per-driver deduction.
const DRIVER_DEDUCTION_FIELDS = [
  { key: "fuelCost", label: "Fuel Cost" },
  { key: "advances", label: "Advances" },
  { key: "orPermit", label: "Oregon Permit" },
  { key: "logbook", label: "Logbook" },
  { key: "insurance", label: "Insurance" },
  { key: "otherCharges", label: "Other Charges" },
  { key: "truckPay", label: "Truck Pay" },
];

// Dashboard "Expenses" report — company-wide totals pulled from Trips records.
const EXPENSE_REPORT_FIELDS = [
  { key: "advances", label: "Driver Advances" },
  { key: "fuelCost", label: "Fuel Costs" },
  { key: "orPermit", label: "Oregon Permits" },
  { key: "logbook", label: "Logbook Expenses" },
  { key: "insurance", label: "Insurance" },
  { key: "otherCharges", label: "Other Charges" },
  { key: "truckPay", label: "Truck Pay" },
  { key: "refunds", label: "Refunds Paid" },
];

const PAY_TYPES = [
  { key: "percent", label: "% of Gross" },
  { key: "cpm", label: "Per Mile ($)" },
  { key: "flat", label: "Flat Rate ($/load)" },
  { key: "salary", label: "Salary ($/period)" },
];

function resolveDisplayName(driver, displayAs) {
  if (!driver) return "";
  if (displayAs === "company" && driver.companyName) return driver.companyName;
  return driver.name;
}
function payLabel(driver) {
  if (!driver) return "";
  if (driver.payType === "cpm") return `${money(driver.rate)}/mi`;
  if (driver.payType === "flat") return `${money(driver.rate)} flat/load`;
  if (driver.payType === "salary") return `${money(driver.rate)}/period`;
  return `${num(driver.rate)}% of gross`;
}
function computeLoadPay(driver, load) {
  if (!driver) return 0;
  if (driver.payType === "cpm") return num(driver.rate) * (num(load.loadedMiles) + num(load.deadheadMiles));
  if (driver.payType === "flat") return num(driver.rate);
  if (driver.payType === "salary") return 0;
  return (num(driver.rate) / 100) * num(load.rate);
}
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Logbook/Insurance month values: "Jan".."Dec" mean that month in the trip's own
// start year (how they've always been saved); "Dec 25" / "Jan 27" carry their
// own 2-digit year. Returns a real "YYYY-MM" so totals match across years.
function monthChargeKey(value, tripStartDate) {
  if (!value) return null;
  const m = /^([A-Za-z]{3}) (\d{2})$/.exec(value);
  const idx = MONTH_ABBR.indexOf(m ? m[1] : value);
  if (idx < 0) return null;
  const year = m ? 2000 + parseInt(m[2], 10) : parseInt((tripStartDate || todayISO()).slice(0, 4), 10);
  return `${year}-${String(idx + 1).padStart(2, "0")}`;
}
const DEFAULT_DISPATCH_FEE = 13;
const DEFAULT_DISPATCHER_PAY = 3;
function isMileageOrHourly(driver) {
  return !!(driver && driver.payType === "cpm");
}
// A driver whose loads should be treated as pure company profit rather than
// personal pay: per-mile/hourly drivers (existing rule), plus a "percent of
// gross" driver whose rate is explicitly set to 0% — used for e.g. the owner
// driving their own truck, where the whole load is company revenue.
function isProfitOnlyDriver(driver) {
  if (!driver) return false;
  if (isMileageOrHourly(driver)) return true;
  return driver.payType === "percent" && num(driver.rate) === 0;
}
function dispatchFeePercentFor(driver) {
  if (!driver) return DEFAULT_DISPATCH_FEE;
  if (isMileageOrHourly(driver)) return 0;
  const v = driver.dispatchFeePercent;
  return (v === "" || v === null || v === undefined) ? DEFAULT_DISPATCH_FEE : num(v);
}
// Resolves a time-versioned reporting percentage (Dispatch Fee % / Dispatcher Pay %)
// for a given reporting period. Reports-only — never used for actual Stub/payout math.
function resolveScheduledPercent(schedule, year, month, fallback) {
  if (!schedule || !schedule.length) return fallback;
  const applicable = schedule.filter((e) => e.year < year || (e.year === year && e.month <= month));
  if (!applicable.length) return fallback;
  const sorted = [...applicable].sort((a, b) => (a.year - b.year) || (a.month - b.month));
  return num(sorted[sorted.length - 1].percent);
}
function normalizeDrivers(raw) {
  return raw.map((d) => (typeof d === "string"
    ? { id: uid(), name: d, companyName: "", taxId: "", payType: "percent", rate: "", dispatchFeePercent: "", notes: "", active: true, truckBalance: "" }
    : { dispatchFeePercent: "", notes: "", active: true, taxId: "", truckBalance: "", ...d }));
}
function normalizeTrucks(raw) {
  return raw.map((t) => (typeof t === "string" ? { id: uid(), number: t, notes: "", active: true, assignedDriver: "" } : { active: true, assignedDriver: "", ...t }));
}

async function geocode(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("geocode failed");
  const data = await res.json();
  if (!data || !data[0]) throw new Error("no match");
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}
async function routeMiles(a, b) {
  const url = `https://router.project-osrm.org/route/v1/driving/${a.lon},${a.lat};${b.lon},${b.lat}?overview=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("route failed");
  const data = await res.json();
  const meters = data?.routes?.[0]?.distance;
  if (!meters) throw new Error("no route");
  return Math.round(meters / 1609.34);
}
function haversineMiles(a, b) {
  const R = 3958.8;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLon = (b.lon - a.lon) * Math.PI / 180;
  const la1 = a.lat * Math.PI / 180, la2 = b.lat * Math.PI / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
}

// ---- Excel/CSV import helpers ----
function guessColumn(headers, aliases) {
  const lowered = headers.map((h) => norm(h));
  for (const alias of aliases) {
    const idx = lowered.findIndex((h) => h === norm(alias));
    if (idx !== -1) return headers[idx];
  }
  for (const alias of aliases) {
    const idx = lowered.findIndex((h) => h.includes(norm(alias)));
    if (idx !== -1) return headers[idx];
  }
  return "";
}
const IMPORT_CONFIGS = {
  billto: {
    label: "Bill To", matchField: "name",
    fields: [
      { key: "name", label: "Name", required: true, aliases: ["name", "bill to", "customer", "broker"] },
      { key: "contact", label: "Contact", aliases: ["contact", "contact name"] },
      { key: "phone", label: "Phone", aliases: ["phone", "telephone"] },
      { key: "email", label: "Email", aliases: ["email"] },
    ],
  },
  shippers: {
    label: "Shippers", matchField: "companyName",
    fields: [
      { key: "companyName", label: "Company Name", required: true, aliases: ["company", "company name", "name", "shipper"] },
      { key: "warehouseCode", label: "Warehouse Code", aliases: ["warehouse code", "code", "wh code"] },
      { key: "street", label: "Street", aliases: ["street", "address"] },
      { key: "city", label: "City", aliases: ["city"] },
      { key: "state", label: "State", aliases: ["state", "st"] },
      { key: "zip", label: "ZIP", aliases: ["zip", "zip code", "postal"] },
      { key: "contact", label: "Contact", aliases: ["contact", "contact name"] },
    ],
  },
  receivers: {
    label: "Receivers", matchField: "companyName",
    fields: [
      { key: "companyName", label: "Company Name", required: true, aliases: ["company", "company name", "name", "receiver"] },
      { key: "warehouseCode", label: "Warehouse Code", aliases: ["warehouse code", "code", "wh code"] },
      { key: "street", label: "Street", aliases: ["street", "address"] },
      { key: "city", label: "City", aliases: ["city"] },
      { key: "state", label: "State", aliases: ["state", "st"] },
      { key: "zip", label: "ZIP", aliases: ["zip", "zip code", "postal"] },
      { key: "contact", label: "Contact", aliases: ["contact", "contact name"] },
    ],
  },
};

// ---- IFTA ----
// US jurisdictions that participate in IFTA (Alaska, Hawaii, and DC do not).
const IFTA_US_JURISDICTIONS = [
  "AL", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "ID", "IL", "IN", "IA", "KS", "KY", "LA",
  "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND",
  "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];
const IFTA_CA_JURISDICTIONS = ["AB", "BC", "MB", "NB", "NL", "NS", "ON", "PE", "QC", "SK"];
const IFTA_JURISDICTIONS = [...IFTA_US_JURISDICTIONS, ...IFTA_CA_JURISDICTIONS];
// Starting defaults only — verified against multiple sources for Q2 2026, but IFTA rates
// change quarterly and MUST be checked against the official IFTA Inc. rate matrix
// (iftach.org) before filing. Oregon is intentionally $0 — OR uses a weight-mile tax
// instead of a per-gallon fuel tax; you still report OR miles but pay that tax separately.
// California conflicted between sources ($0.971 vs $1.090) — verify before relying on it.
// Everything else defaults to $0 and must be filled in by you each quarter.
const IFTA_DEFAULT_RATES = {
  CA: 0.971, OR: 0, MS: 0.180, OK: 0.190, LA: 0.200, PA: 0.741, IL: 0.607, IN: 0.630,
};
function emptyIftaReport(favoriteJurisdictions) {
  const now = new Date();
  const q = Math.floor(now.getMonth() / 3) + 1;
  const favRows = (favoriteJurisdictions || []).map((j) => ({ jurisdiction: j, miles: "", gallons: "" }));
  return { id: null, quarter: q, year: now.getFullYear(), truck: "ALL", excludedTrucks: [], rows: favRows, filingFee: "", savedAt: null };
}
function computeIftaTotals(rows, rates) {
  const totalMiles = rows.reduce((s, r) => s + num(r.miles), 0);
  const totalGallons = rows.reduce((s, r) => s + num(r.gallons), 0);
  const avgMpg = totalGallons > 0 ? totalMiles / totalGallons : 0;
  const perRow = rows.map((r) => {
    const rate = num((rates && rates[r.jurisdiction]) || 0);
    const taxableGallons = avgMpg > 0 ? num(r.miles) / avgMpg : 0;
    const taxDue = taxableGallons * rate;
    const taxPaid = num(r.gallons) * rate;
    const net = taxDue - taxPaid;
    return { ...r, rate, taxableGallons, taxDue, taxPaid, net };
  });
  const netTotal = perRow.reduce((s, r) => s + r.net, 0);
  return { totalMiles, totalGallons, avgMpg, perRow, netTotal };
}

// Small trendline used inside stat cards. No axes, no library — just a smooth
// SVG polyline scaled to fit its box, so it renders identically in the Claude
// preview and the plain-React deployed build (which has no chart library).
function Sparkline({ data, color, height = 40 }) {
  const width = 120;
  if (!data || data.length < 2) return <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} />;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1);
  const points = data.map((v, i) => [i * stepX, height - ((v - min) / range) * (height - 6) - 3]);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const areaPath = `${path} L${width},${height} L0,${height} Z`;
  const gradId = `spark-${color.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} stroke="none" />
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Bigger labeled bar chart for the Revenue Overview panel — same overall
// dimensions, grid, and axis labels as before, but each data point now
// renders as its own bar (height proportional to value) instead of a
// connected line, with the tallest bar highlighted.
function TrendChart({ data, labels, color, formatY }) {
  const [selected, setSelected] = useState(null);
  // Clear any tapped bar whenever the period changes (different bar count or
  // labels), so the popup can't point at a bar that no longer exists.
  const dataKey = (data ? data.length : 0) + "|" + (labels ? labels.join(",") : "");
  useEffect(() => { setSelected(null); }, [dataKey]);
  const width = 600, height = 220, padL = 58, padB = 22, padT = 14, padR = 10;
  const plotW = width - padL - padR, plotH = height - padT - padB;
  if (!data || data.length < 2) return <div style={{ height: 220 }} />;
  const min = 0, max = Math.max(...data) * 1.15 || 1;
  const gap = 4;
  const barW = Math.min(36, Math.max(2, plotW / data.length - gap));
  const xAt = (i) => padL + i * (plotW / data.length) + (plotW / data.length - barW) / 2;
  const yAt = (v) => padT + plotH - ((v - min) / (max - min)) * plotH;
  const peakIdx = data.indexOf(Math.max(...data));
  const gridLines = [0, 0.25, 0.5, 0.75, 1];
  const sel = selected != null && selected < data.length ? selected : null;
  const tipText = sel != null ? (formatY ? formatY(data[sel]) : String(Math.round(data[sel]))) : "";
  const tipW = Math.max(46, tipText.length * 7 + 16);
  const tipCenterX = sel != null ? Math.min(Math.max(xAt(sel) + barW / 2, padL + tipW / 2), width - padR - tipW / 2) : 0;
  const tipBarY = sel != null ? yAt(data[sel]) : 0;
  const tipY = Math.max(padT, tipBarY - 26);
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      {gridLines.map((g, i) => (
        <line key={i} x1={padL} x2={width - padR} y1={padT + plotH * g} y2={padT + plotH * g} stroke="var(--border)" strokeWidth="1" />
      ))}
      {gridLines.map((g, i) => (
        <text key={i} x={padL - 8} y={padT + plotH * (1 - g) + 4} fontSize="9" fill="var(--text-dim)" textAnchor="end" fontFamily="IBM Plex Mono, monospace">
          {formatY ? formatY(min + (max - min) * g) : Math.round(min + (max - min) * g)}
        </text>
      ))}
      {data.map((v, i) => {
        const barY = yAt(v);
        return (
          <rect
            key={i}
            x={xAt(i)} y={barY}
            width={barW} height={(padT + plotH) - barY}
            rx={Math.min(3, barW / 2)}
            fill={color}
            opacity={i === peakIdx ? 1 : 0.55}
            style={{ cursor: "pointer" }}
            onClick={() => setSelected((s) => (s === i ? null : i))}
          />
        );
      })}
      {labels && labels.map((l, i) => (
        (labels.length <= 8 || i % Math.ceil(labels.length / 7) === 0) && (
          <text key={i} x={xAt(i) + barW / 2} y={height - 4} fontSize="9" fill="var(--text-dim)" textAnchor="middle" fontFamily="IBM Plex Mono, monospace">{l}</text>
        )
      ))}
      {sel != null && (
        <g style={{ pointerEvents: "none" }}>
          <rect x={tipCenterX - tipW / 2} y={tipY} width={tipW} height={20} rx={5} fill="#14181F" stroke={color} strokeWidth="1" />
          <text x={tipCenterX} y={tipY + 14} fontSize="10.5" fill="#fff" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontWeight="700">{tipText}</text>
        </g>
      )}
    </svg>
  );
}

// Reusable custom dropdown card — replaces native <select> entirely so the open
// list can be fully styled (native select popups can't be styled beyond font/color)
// and so the whole card is one tap target, arrow included.
function FilterCard({ icon: Icon, label, value, options, onChange, fullWidth, compact, slim, hideLabel, accentBorder, pillStyle }) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => String(o.value) === String(value));
  const displayText = current ? (current.shortLabel || current.label) : "Select…";
  if (pillStyle) {
    return (
      <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
        <button type="button" className="loads-pill-btn" style={{ width: "100%" }} onClick={() => setOpen((v) => !v)}>
          <span className="loads-pill-circle"><Icon size={18} color="#1A1300" /></span>
          <span className="loads-pill-text">{displayText}</span>
        </button>
        {open && (
          <>
            <div className="color-picker-backdrop" onClick={() => setOpen(false)} />
            <div className="month-charge-popover dash-filter-popover">
              {options.map((opt) => (
                <div key={opt.value} className={`month-charge-item ${String(value) === String(opt.value) ? "selected" : ""}`} onClick={() => { onChange(opt.value); setOpen(false); }}>
                  <span>{opt.label}</span>
                  {opt.amountText && <span className="month-charge-amt" style={opt.amountColor ? { color: opt.amountColor } : undefined}>{opt.amountText}</span>}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
  return (
    <div
      className={`dash-filter-card ${compact ? "dash-filter-card-compact" : ""} ${slim ? "dash-filter-card-slim" : ""}`}
      style={{ position: "relative", gridColumn: fullWidth ? "1 / -1" : undefined, border: accentBorder ? "1.5px solid var(--accent)" : (open ? "1px solid var(--accent)" : undefined) }}
    >
      <button type="button" className="dash-filter-card-hit" onClick={() => setOpen((v) => !v)}>
        <div className="dash-filter-icon-wrap"><Icon size={compact ? 14 : 16} /></div>
        <div className="dash-filter-body">
          {!hideLabel && <div className="dash-filter-label">{label}</div>}
          <div className="dash-filter-value-text">{displayText}</div>
        </div>
        {!compact && <ChevronDown size={14} color="var(--text-dim)" />}
      </button>
      {open && (
        <>
          <div className="color-picker-backdrop" onClick={() => setOpen(false)} />
          <div className="month-charge-popover dash-filter-popover">
            {options.map((opt) => (
              <div key={opt.value} className={`month-charge-item ${String(value) === String(opt.value) ? "selected" : ""}`} onClick={() => { onChange(opt.value); setOpen(false); }}>
                <span>{opt.label}</span>
                {opt.amountText && <span className="month-charge-amt" style={opt.amountColor ? { color: opt.amountColor } : undefined}>{opt.amountText}</span>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Same exact look as FilterCard (identical CSS classes), but the value area
// is a real, typeable input instead of a static label — typing filters the
// dropdown list live, and pausing after a match auto-applies it, the same
// way AutocompleteInput already behaves elsewhere in the app. Tapping it
// with nothing typed still opens the full, untouched list as usual.
function TypeableFilterCard({ icon: Icon, label, value, options, onChange, fullWidth, compact, slim, hideLabel, accentBorder }) {
  const [open, setOpen] = useState(false);
  const [typedText, setTypedText] = useState(null);
  const current = options.find((o) => String(o.value) === String(value));
  // If the saved value isn't in the list (e.g. an old load's truck/driver that
  // has since been marked inactive), still show it rather than a blank field.
  const fallbackText = !current && value != null && String(value) !== "" ? String(value) : "";
  const displayValue = typedText != null ? typedText : (current ? (current.shortLabel || current.label) : fallbackText);
  function norm2(s) { return (s || "").trim().toLowerCase(); }
  function startsWithMatch(text, q) {
    if (!q) return false;
    const t = norm2(text);
    if (t.startsWith(q)) return true;
    return t.split(/[\s,·-]+/).some((word) => word.startsWith(q));
  }
  const q = norm2(typedText);
  // The empty "Select…" placeholder must never be matched by typing, or
  // typing "S" would auto-pick it and clear the field.
  const matchable = options.filter((o) => String(o.value) !== "");
  const filteredOptions = typedText ? matchable.filter((o) => startsWithMatch(o.label, q)) : options;
  useEffect(() => {
    if (typedText == null || !q) return;
    const timer = setTimeout(() => {
      const best = matchable.find((o) => startsWithMatch(o.label, q));
      if (best) { onChange(best.value); setTypedText(null); setOpen(false); }
    }, 1200);
    return () => clearTimeout(timer);
  }, [typedText]);
  return (
    <div
      className={`dash-filter-card ${compact ? "dash-filter-card-compact" : ""} ${slim ? "dash-filter-card-slim" : ""}`}
      style={{ position: "relative", gridColumn: fullWidth ? "1 / -1" : undefined, border: accentBorder ? "1.5px solid var(--accent)" : (open ? "1px solid var(--accent)" : undefined) }}
    >
      <div className="dash-filter-card-hit" style={{ cursor: "text" }}>
        <div className="dash-filter-icon-wrap"><Icon size={compact ? 14 : 16} /></div>
        <div className="dash-filter-body">
          {!hideLabel && <div className="dash-filter-label">{label}</div>}
          <input
            className="dash-filter-value-text typeable-filter-input"
            style={{ background: "transparent", border: "none", outline: "none", padding: 0, width: "100%", font: "inherit" }}
            value={displayValue}
            placeholder="Select…"
            onFocus={(e) => { setOpen(true); const el = e.target; setTimeout(() => el.select(), 0); }}
            onChange={(e) => setTypedText(e.target.value)}
          />
        </div>
        {!compact && <ChevronDown size={14} color="var(--text-dim)" onClick={() => setOpen((v) => !v)} style={{ cursor: "pointer" }} />}
      </div>
      {open && (
        <>
          <div className="color-picker-backdrop" onClick={() => { setOpen(false); setTypedText(null); }} />
          <div className="month-charge-popover dash-filter-popover">
            {filteredOptions.length === 0 && <div style={{ padding: "10px 14px", fontSize: 13, color: "var(--text-dim)" }}>No matches</div>}
            {filteredOptions.map((opt) => (
              <div key={opt.value} className={`month-charge-item ${String(value) === String(opt.value) ? "selected" : ""}`} onClick={() => { onChange(opt.value); setTypedText(null); setOpen(false); }}>
                <span>{opt.label}</span>
                {opt.amountText && <span className="month-charge-amt" style={opt.amountColor ? { color: opt.amountColor } : undefined}>{opt.amountText}</span>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Chevron-stepper field: a pill with a left/right chevron on each edge and
// the current value centered between them. Tapping a chevron steps to the
// adjacent option directly (wrapping around for cyclic lists like months;
// clamping at the ends for non-cyclic lists like years) without opening
// anything. Tapping the centered label still opens the same dropdown list
// as before, unchanged.
function ChevronStepperField({ icon: Icon, value, options, onChange, cyclic }) {
  const [open, setOpen] = useState(false);
  const selectedItemRef = useRef(null);
  const idx = options.findIndex((o) => String(o.value) === String(value));
  const current = idx >= 0 ? options[idx] : null;
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => {
      selectedItemRef.current?.scrollIntoView({ block: "center" });
    }, 0);
    return () => clearTimeout(timer);
  }, [open]);
  function step(dir) {
    if (idx < 0) return;
    let next = idx + dir;
    if (cyclic) {
      next = (next + options.length) % options.length;
    } else {
      next = Math.max(0, Math.min(options.length - 1, next));
    }
    onChange(options[next].value);
  }
  return (
    <div className="chevron-stepper-field" style={{ position: "relative" }}>
      <div className="chevron-stepper-row">
        <button type="button" className="chevron-stepper-btn" onClick={() => step(-1)}><ChevronLeft size={18} /></button>
        <div className="chevron-stepper-divider" />
        <button type="button" className="chevron-stepper-label" onClick={() => setOpen((v) => !v)}>{current ? current.label : "Select…"}</button>
        <div className="chevron-stepper-divider" />
        <button type="button" className="chevron-stepper-btn" onClick={() => step(1)}><ChevronRight size={18} /></button>
      </div>
      {open && (
        <>
          <div className="color-picker-backdrop" onClick={() => setOpen(false)} />
          <div className="month-charge-popover dash-filter-popover stepper-popover">
            {options.map((opt) => (
              <div key={opt.value} ref={String(value) === String(opt.value) ? selectedItemRef : null} className={`month-charge-item ${String(value) === String(opt.value) ? "selected" : ""}`} onClick={() => { onChange(opt.value); setOpen(false); }}>
                <span className="month-charge-name">{opt.shortLabel || opt.label}</span>
                <span className="month-charge-amt-wrap">
                  {opt.amountText && <span className="month-charge-amt" style={opt.amountColor ? { color: opt.amountColor } : undefined}>{opt.amountText}</span>}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
function CustomRangeField({ start, end, isActive, onApply }) {
  const [open, setOpen] = useState(false);
  const [draftStart, setDraftStart] = useState(start);
  const [draftEnd, setDraftEnd] = useState(end);

  function handleOpen() {
    if (isActive) {
      // Already on a custom range — keep editing what's there.
      setDraftStart(start);
      setDraftEnd(end);
    } else {
      // Opening fresh from a Quick Select preset — start from a sensible,
      // commonly-useful default (this month to date) rather than whatever
      // preset happened to be active, which could be a confusingly narrow
      // range like "This Week" to start editing from.
      const now = new Date();
      const y = now.getFullYear(), m = now.getMonth();
      setDraftStart(`${y}-${String(m + 1).padStart(2, "0")}-01`);
      setDraftEnd(todayISO());
    }
    setOpen(true);
  }
  function handleApply() {
    onApply(draftStart, draftEnd);
    setOpen(false);
  }

  return (
    <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
      <button type="button" className="loads-pill-btn" style={{ width: "100%" }} onClick={handleOpen}>
        <span className="loads-pill-text">{isActive ? `${shortDate(start)} – ${shortDate(end)}` : "Custom"}</span>
        <span className="loads-pill-circle"><Calendar size={18} color="#1A1300" /></span>
      </button>
      {open && (
        <>
          <div className="color-picker-backdrop" onClick={() => setOpen(false)} />
          <div className="month-charge-popover dash-filter-popover custom-range-popover">
            <div className="field" style={{ marginBottom: 10 }}><label>From</label><div className="date-input-clip"><input type="date" value={draftStart} max={draftEnd} onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} onChange={(e) => setDraftStart(e.target.value)} /></div></div>
            <div className="field" style={{ marginBottom: 12 }}><label>To</label><div className="date-input-clip"><input type="date" value={draftEnd} min={draftStart} max={todayISO()} onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} onChange={(e) => setDraftEnd(e.target.value)} /></div></div>
            <button type="button" className="btn" style={{ marginTop: 0 }} onClick={handleApply}>Apply</button>
          </div>
        </>
      )}
    </div>
  );
}

// ---- Account sidebar: menu list -> My Profile / Manage Users ----
// The Supabase client only exists in the deployed build (added via the auth
// footer); it isn't present in the Claude preview environment, so every call
// here is guarded to fail gracefully rather than crash the preview.
// ---- Company Info (moved out of Settings so it stands on its own) ----
function CompanyInfoSection({ onBack, settings, saveSettings }) {
  const [editing, setEditing] = useState(false);
  const [company, setCompany] = useState({
    companyName: settings.companyName || "", companyAddress: settings.companyAddress || "",
    dotNumber: settings.dotNumber || "", companyEmail: settings.companyEmail || "",
  });
  const [companySaved, setCompanySaved] = useState(false);
  const [logoSaved, setLogoSaved] = useState(false);
  const [logoError, setLogoError] = useState("");
  const logoInputRef = useRef(null);

  function startEditing() {
    setCompany({
      companyName: settings.companyName || "", companyAddress: settings.companyAddress || "",
      dotNumber: settings.dotNumber || "", companyEmail: settings.companyEmail || "",
    });
    setEditing(true);
  }

  async function handleSaveCompany() {
    await saveSettings(company);
    setCompanySaved(true);
    setTimeout(() => { setCompanySaved(false); setEditing(false); }, 900);
  }

  function handleLogoFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setLogoError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = async () => {
        const maxDim = 320;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        const dataUri = canvas.toDataURL("image/png");
        await saveSettings({ companyLogoDataUri: dataUri });
        setLogoSaved(true);
        setTimeout(() => setLogoSaved(false), 1400);
      };
      img.onerror = () => setLogoError("Couldn't read that image — try a different file.");
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
  async function handleRemoveLogo() { await saveSettings({ companyLogoDataUri: "" }); }

  if (!editing) {
    return (
      <div className="account-modal-body">
        <div className="section-view-row">
          <div className="section-view-label">Company Name</div>
          <div className="section-view-value">{settings.companyName || "Not set"}</div>
        </div>
        <div className="section-view-row">
          <div className="section-view-label">Address</div>
          <div className="section-view-value">{settings.companyAddress || "Not set"}</div>
        </div>
        <div className="section-view-row">
          <div className="section-view-label">DOT Number</div>
          <div className="section-view-value">{settings.dotNumber || "Not set"}</div>
        </div>
        <div className="section-view-row">
          <div className="section-view-label">Email</div>
          <div className="section-view-value">{settings.companyEmail || "Not set"}</div>
        </div>
        <div className="section-view-row" style={{ borderBottom: "none" }}>
          <div className="section-view-label">Company Logo</div>
          {settings.companyLogoDataUri ? (
            <img src={settings.companyLogoDataUri} alt="Company logo" style={{ height: 44, maxWidth: 150, objectFit: "contain", background: "#fff", borderRadius: 8, padding: 6, marginTop: 6 }} />
          ) : (
            <div className="section-view-value">No logo uploaded</div>
          )}
        </div>
        <button type="button" className="btn section-edit-btn" onClick={startEditing}><Pencil size={14} /> Edit Company Info</button>
      </div>
    );
  }

  return (
    <div className="account-modal-body">
      <div className="field-row"><div className="field"><label>Company Name</label><input value={company.companyName} onChange={(e) => setCompany({ ...company, companyName: e.target.value })} placeholder="e.g. TruxFlow Logistics LLC" style={{ fontFamily: "Inter" }} /></div></div>
      <div className="field-row"><div className="field"><label>Address</label><input value={company.companyAddress} onChange={(e) => setCompany({ ...company, companyAddress: e.target.value })} placeholder="Street, City, ST ZIP" style={{ fontFamily: "Inter" }} /></div></div>
      <div className="field-row">
        <div className="field"><label>DOT Number</label><input value={company.dotNumber} onChange={(e) => setCompany({ ...company, dotNumber: e.target.value })} placeholder="DOT #" /></div>
        <div className="field"><label>Email</label><input value={company.companyEmail} onChange={(e) => setCompany({ ...company, companyEmail: e.target.value })} placeholder="email@company.com" style={{ fontFamily: "Inter" }} /></div>
      </div>
      <button className="btn" style={{ marginTop: 4 }} onClick={handleSaveCompany}>{companySaved ? "Saved ✓" : "Save Company Info"}</button>
      <button type="button" className="btn secondary" style={{ marginTop: 8 }} onClick={() => setEditing(false)}>Cancel</button>

      <div style={{ height: 1, background: "var(--border)", margin: "18px 0 14px" }} />
      <label style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-dim)", fontWeight: 600, display: "block", marginBottom: 8 }}>Company Logo</label>
      {settings.companyLogoDataUri ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <img src={settings.companyLogoDataUri} alt="Company logo" style={{ height: 48, maxWidth: 150, objectFit: "contain", background: "#fff", borderRadius: 8, padding: 6 }} />
          <button type="button" className="btn danger" style={{ marginTop: 0, width: "auto", padding: "8px 14px", fontSize: 11 }} onClick={handleRemoveLogo}>Remove</button>
        </div>
      ) : (
        <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 10 }}>No logo uploaded yet.</div>
      )}
      <input type="file" accept="image/*" ref={logoInputRef} style={{ display: "none" }} onChange={handleLogoFile} />
      <button type="button" className="btn secondary" style={{ marginTop: 0 }} onClick={() => logoInputRef.current && logoInputRef.current.click()}>
        {logoSaved ? "Saved ✓" : settings.companyLogoDataUri ? "Replace Logo" : "Upload Logo"}
      </button>
      {logoError && <div style={{ fontSize: 11, color: "var(--red)", marginTop: 8 }}>{logoError}</div>}
      <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 8 }}>This appears at the top of every printed pay stub.</div>
    </div>
  );
}

// ---- About TruxFlow: a plain-language explainer of the app ----
// ---- Time Zone: which calendar day the app uses for "today" everywhere ----
function TimezoneSection({ settings, saveSettings, logActivity }) {
  const [saved, setSaved] = useState(false);
  async function handleChange(v) {
    const oldLabel = (US_TIMEZONES.find((t) => t.value === (settings.timezone || "America/Los_Angeles")) || {}).label || settings.timezone;
    const newLabel = (US_TIMEZONES.find((t) => t.value === v) || {}).label || v;
    await saveSettings({ timezone: v });
    if (logActivity && v !== (settings.timezone || "America/Los_Angeles")) logActivity("timezone_changed", `Changed Time Zone from ${oldLabel} to ${newLabel}`);
    setSaved(true);
    setTimeout(() => setSaved(false), 1400);
  }
  return (
    <div className="account-modal-body">
      <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 14, lineHeight: 1.5 }}>
        This decides what day it is for the whole team — new loads, weekly/monthly reports, and everything else all use this timezone, regardless of where anyone's own phone happens to be set.
      </div>
      <FilterCard
        icon={Calendar} label="Time Zone" value={settings.timezone || "America/Los_Angeles"} onChange={handleChange}
        options={US_TIMEZONES}
        fullWidth
      />
      {saved && <div style={{ fontSize: 11.5, color: "var(--green)", marginTop: 10 }}>Saved ✓</div>}
      <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 16, lineHeight: 1.5 }}>
        "Local Time" uses whatever timezone this specific device is set to, instead of a fixed US zone — useful if the app is being used overseas.
      </div>
    </div>
  );
}

function AboutTruxFlowSection() {
  return (
    <div className="account-modal-body" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text)" }}>
      <p style={{ marginTop: 0 }}>
        TruxFlow is a dispatch, pay, and accounting tool built for running a small trucking operation — tracking loads, trips, driver pay, and the business's numbers all in one place.
      </p>
      <div className="dash-filter-label" style={{ marginTop: 16, marginBottom: 6 }}>Loads</div>
      <p>Create a load for each pickup and delivery — shipper, receiver, rate, and dates. Mark it Active while it's on the road, then Completed once it's delivered. Completed loads are what feed every report and pay stub.</p>
      <div className="dash-filter-label" style={{ marginTop: 16, marginBottom: 6 }}>Trips</div>
      <p>A trip groups one driver's loads over a stretch of time into a single payout — gross revenue, expenses, and either a dispatch fee or a profit split, depending on how that driver is set up.</p>
      <div className="dash-filter-label" style={{ marginTop: 16, marginBottom: 6 }}>Stats</div>
      <p>A running picture of the business — revenue, profit, miles, and top performers over the week, month, or year.</p>
      <div className="dash-filter-label" style={{ marginTop: 16, marginBottom: 6 }}>Dash</div>
      <p>Reports for a specific driver, truck, broker, or time period, plus driver and dispatcher pay stubs ready to print or save as a PDF.</p>
      <div className="dash-filter-label" style={{ marginTop: 16, marginBottom: 6 }}>Fleet</div>
      <p>The master records everything else points back to — trucks, drivers, brokers, shippers, receivers, dispatchers — plus the IFTA calculator and accounting/invoicing tools.</p>
      <div style={{ height: 1, background: "var(--border)", margin: "18px 0 14px" }} />
      <p style={{ color: "var(--text-dim)", fontSize: 11.5 }}>
        Everyone on your team sees and edits the same data — trucks, loads, everything — in real time. Manage who has access from Manage Users.
      </p>
    </div>
  );
}

// ---- Help & Support: send a note, see what your team has sent ----
// ---- Activity log: shown to the owner inside Manage Users ----
function ActivityLogSection() {
  const hasBackend = typeof sb !== "undefined";
  const [logs, setLogs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmingClear, setConfirmingClear] = useState(false);
  const [clearing, setClearing] = useState(false);

  async function loadLogs() {
    if (!hasBackend) return;
    setLoading(true); setError("");
    try {
      const { data, error } = await sb.from("activity_log").select("*").order("created_at", { ascending: false }).limit(100);
      if (error) throw error;
      setLogs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Couldn't load activity.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLogs();
    // eslint-disable-next-line
  }, []);

  async function handleClearLog() {
    if (!hasBackend || typeof currentTeamId === "undefined" || !currentTeamId) return;
    setClearing(true); setError("");
    try {
      const { error } = await sb.from("activity_log").delete().eq("team_id", currentTeamId);
      if (error) throw error;
      setLogs([]);
      setConfirmingClear(false);
    } catch (err) {
      setError(err.message || "Couldn't clear the activity log.");
    } finally {
      setClearing(false);
    }
  }

  return (
    <div style={{ borderTop: "1px solid var(--border)", marginTop: 16, paddingTop: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div className="dash-filter-label" style={{ marginBottom: 0 }}>Team Activity</div>
        {logs && logs.length > 0 && !confirmingClear && (
          <button type="button" className="team-roster-remove-btn" onClick={() => setConfirmingClear(true)}>Clear Log</button>
        )}
      </div>
      {confirmingClear && (
        <div style={{ background: "var(--surface-2)", border: "1px solid var(--red)", borderRadius: 10, padding: 12, marginBottom: 12 }}>
          <div style={{ fontSize: 12.5, color: "var(--text)", marginBottom: 10, lineHeight: 1.5 }}>
            Permanently delete all activity history for this team? This can't be undone.
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" className="btn danger" style={{ marginTop: 0, flex: 1 }} disabled={clearing} onClick={handleClearLog}>
              {clearing ? "Clearing…" : "Yes, Clear It"}
            </button>
            <button type="button" className="btn secondary" style={{ marginTop: 0, flex: 1 }} disabled={clearing} onClick={() => setConfirmingClear(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div style={{ fontSize: 11.5, color: "var(--text-dim)", marginBottom: 10, lineHeight: 1.5 }}>
        Loads created and driver pay marked, going forward from today — this can't show anything from before this feature was added.
      </div>
      {loading && <div className="empty-state">Loading…</div>}
      {error && <div style={{ color: "var(--red)", fontSize: 12, marginBottom: 8 }}>{error}</div>}
      {!loading && logs && logs.length === 0 && <div className="empty-state">No activity yet.</div>}
      {!loading && logs && logs.length > 0 && (
        <div className="team-roster-list">
          {logs.map((log) => (
            <div className="team-roster-row" key={log.id} style={{ flexDirection: "column", alignItems: "stretch" }}>
              <div style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.5, marginBottom: 4 }}>{log.description}</div>
              <div className="team-roster-role">
                {log.user_email} · {new Date(log.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })} at {new Date(log.created_at).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HelpSupportSection({ isOwner }) {
  const hasBackend = typeof sb !== "undefined";
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [messages, setMessages] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  async function loadMessages() {
    if (!hasBackend) return;
    setLoadingMessages(true);
    try {
      const { data, error } = await sb.rpc("get_support_messages");
      if (error) throw error;
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      // Non-fatal — the compose box still works even if the history fails to load.
    } finally {
      setLoadingMessages(false);
    }
  }

  useEffect(() => {
    loadMessages();
    // Viewing this section clears the unread badge — best-effort, no need to
    // block or show an error if it fails.
    async function markSeen() {
      if (!hasBackend) return;
      try { await sb.rpc("mark_support_messages_seen"); } catch (e) {}
    }
    markSeen();
    // eslint-disable-next-line
  }, []);

  async function handleSend(e) {
    e.preventDefault();
    if (!hasBackend) { setSendError("Sending requires the deployed app — not available in this preview."); return; }
    if (!message.trim()) return;
    setSending(true); setSendError("");
    try {
      const { data: sessionData } = await sb.auth.getSession();
      const uid = sessionData && sessionData.session && sessionData.session.user && sessionData.session.user.id;
      const { data: membership } = await sb.from("team_members").select("team_id").eq("user_id", uid).maybeSingle();
      if (!membership) throw new Error("Couldn't find your team.");
      const { error } = await sb.from("support_messages").insert({ team_id: membership.team_id, user_id: uid, message: message.trim() });
      if (error) throw error;
      setMessage("");
      loadMessages();
    } catch (err) {
      setSendError(err.message || "Couldn't send your message.");
    } finally {
      setSending(false);
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    try {
      const { error } = await sb.from("support_messages").delete().eq("id", id);
      if (error) throw error;
      await loadMessages();
    } catch (err) {
      setSendError(err.message || "Couldn't delete that message.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="account-modal-body">
      <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 12, lineHeight: 1.5 }}>
        Leave a note, question, or issue for your team to see — everyone with access to this team can read what's posted here.
      </div>
      <form onSubmit={handleSend}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's going on?"
          rows={4}
          style={{ width: "100%", background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 11px", borderRadius: 8, fontSize: 13.5, fontFamily: "Inter, sans-serif", resize: "vertical", boxSizing: "border-box" }}
        />
        {sendError && <div style={{ color: "var(--red)", fontSize: 12, marginTop: 8 }}>{sendError}</div>}
        <button type="submit" className="btn" disabled={sending || !message.trim()}>{sending ? "Sending…" : "Send"}</button>
      </form>

      <div style={{ height: 1, background: "var(--border)", margin: "18px 0 14px" }} />
      {loadingMessages && <div className="empty-state">Loading…</div>}
      {!loadingMessages && messages && messages.length === 0 && <div className="empty-state">No messages yet.</div>}
      {!loadingMessages && messages && messages.length > 0 && (
        <div className="team-roster-list">
          {messages.map((m) => (
            <div className="team-roster-row" key={m.id} style={{ flexDirection: "column", alignItems: "stretch" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.5, marginBottom: 6, flex: 1 }}>{m.message}</div>
                {isOwner && (
                  <button type="button" className="team-roster-remove-btn" disabled={deletingId === m.id} onClick={() => handleDelete(m.id)}>
                    {deletingId === m.id ? "…" : "Delete"}
                  </button>
                )}
              </div>
              <div className="team-roster-role">
                {m.full_name || m.email}{m.is_me ? " (you)" : ""} · {new Date(m.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })} at {new Date(m.created_at).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Cached across sidebar opens within the same page load so "Manage Users"
// doesn't visibly pop in late every single time — only the very first open
// (or a hard refresh) waits on the network; after that it's instant, with a
// quiet background refresh to keep it current.
let cachedTeamRoster = null;

// Catches any render-time crash inside the account sidebar and shows a
// recoverable message with the actual error, instead of the whole app going
// blank with no way back in. Must be a class component — React doesn't
// support error boundaries via hooks.
class AccountSidebarErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("Account sidebar crashed:", error, info);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="account-modal-body">
          <div style={{ fontSize: 13, color: "var(--red)", marginBottom: 10, fontWeight: 600 }}>Something went wrong loading this.</div>
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 16, wordBreak: "break-word", fontFamily: "'IBM Plex Mono', monospace" }}>
            {String((this.state.error && this.state.error.message) || this.state.error)}
          </div>
          <button type="button" className="btn" onClick={() => this.setState({ error: null })}>Try Again</button>
          <button type="button" className="btn secondary" onClick={this.props.onClose}>Close</button>
        </div>
      );
    }
    return this.props.children;
  }
}


// ---- Name / Email / Role fields shown inside My Profile ----
function ProfileFields({ userEmail, isOwner, roster }) {
  const hasBackend = typeof sb !== "undefined";
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    if (!hasBackend) return;
    sb.auth.getSession().then(({ data }) => {
      const fullName = data && data.session && data.session.user && data.session.user.user_metadata && data.session.user.user_metadata.full_name;
      setName(fullName || "");
      setSavedName(fullName || "");
    });
    // eslint-disable-next-line
  }, []);

  async function handleSaveName() {
    if (!hasBackend) return;
    setSaving(true); setSaveMsg("");
    try {
      const { error } = await sb.auth.updateUser({ data: { full_name: name.trim() } });
      if (error) throw error;
      setSavedName(name.trim());
      setSaveMsg("Saved ✓");
      setTimeout(() => setSaveMsg(""), 1500);
    } catch (err) {
      setSaveMsg(err.message || "Couldn't save.");
    } finally {
      setSaving(false);
    }
  }

  const role = roster ? (isOwner ? "Owner" : "Member") : "—";

  return (
    <>
      <div className="field">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={{ fontFamily: "Inter" }} />
      </div>
      {name !== savedName && (
        <button type="button" className="btn" style={{ marginTop: 8 }} onClick={handleSaveName} disabled={saving}>{saving ? "Saving…" : "Save Name"}</button>
      )}
      {saveMsg && <div style={{ fontSize: 11.5, color: saveMsg.includes("✓") ? "var(--green)" : "var(--red)", marginTop: 6 }}>{saveMsg}</div>}
      <div className="field" style={{ marginTop: 14 }}>
        <label>Email</label>
        <div className="account-menu-email" style={{ padding: "10px 11px", background: "var(--surface-2)", borderRadius: 8, border: "1px solid var(--border)" }}>{userEmail || "—"}</div>
      </div>
      <div className="field" style={{ marginTop: 14 }}>
        <label>Role</label>
        <div style={{ padding: "10px 11px", background: "var(--surface-2)", borderRadius: 8, border: "1px solid var(--border)", fontSize: 13.5, fontWeight: 600, color: "var(--text)" }}>{role}</div>
      </div>
    </>
  );
}

function AccountSidebar({ userEmail, onSignOut, onClose, settings, saveSettings, saveStartingNumber, nextLoadNumber, askConfirm, unreadSupportCount, logActivity }) {
  const hasBackend = typeof sb !== "undefined";
  const [view, setView] = useState("menu"); // "menu" | "profile" | "manage"
  const [roster, setRoster] = useState(cachedTeamRoster);
  const [loadingRoster, setLoadingRoster] = useState(false);
  const [rosterError, setRosterError] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy Code");
  const [inviteEmail, setInviteEmail] = useState("");
  const [sendingInvite, setSendingInvite] = useState(false);
  const [inviteSentMsg, setInviteSentMsg] = useState("");
  const [inviteEmailError, setInviteEmailError] = useState("");
  const [busyUserId, setBusyUserId] = useState(null);

  async function loadRoster() {
    if (!hasBackend) { setRosterError("Team management requires the deployed app — not available in this preview."); return; }
    if (!cachedTeamRoster) setLoadingRoster(true);
    setRosterError("");
    try {
      const { data, error } = await sb.rpc("get_team_roster");
      if (error) throw error;
      cachedTeamRoster = Array.isArray(data) ? data : [];
      setRoster(cachedTeamRoster);
    } catch (err) {
      setRosterError(err.message || "Couldn't load your team.");
    } finally {
      setLoadingRoster(false);
    }
  }

  // Loaded immediately on open (not just when "Manage Users" is picked) so we
  // know whether this person is an owner before the menu itself is drawn —
  // otherwise a member would briefly see (or always see) an option that
  // isn't theirs to use.
  useEffect(() => {
    loadRoster();
    // eslint-disable-next-line
  }, []);

  const me = roster && roster.find((r) => r.is_me);
  const isOwner = me ? me.role === "owner" : false;

  async function handleSendEmailInvite(e) {
    e.preventDefault();
    if (!hasBackend) { setInviteEmailError("Team management requires the deployed app — not available in this preview."); return; }
    setSendingInvite(true); setInviteEmailError(""); setInviteSentMsg("");
    try {
      const { data: sessionData } = await sb.auth.getSession();
      const token = sessionData && sessionData.session && sessionData.session.access_token;
      if (!token) throw new Error("Your session expired — please sign in again.");
      const res = await fetch("https://zhxhfajlglhfoqftsvmp.supabase.co/functions/v1/invite-teammate", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: inviteEmail.trim() }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Couldn't send the invite.");
      setInviteSentMsg(`Invite sent to ${result.email}. They'll get an email to set up their login.`);
      setInviteEmail("");
      loadRoster();
    } catch (err) {
      setInviteEmailError(err.message || "Couldn't send the invite.");
    } finally {
      setSendingInvite(false);
    }
  }

  async function handleGenerateInvite() {
    setGenerating(true); setRosterError(""); setCopyLabel("Copy Code");
    try {
      const { data, error } = await sb.rpc("create_team_invite");
      if (error) throw error;
      setInviteCode(data);
    } catch (err) {
      setRosterError(err.message || "Couldn't create an invite code.");
    } finally {
      setGenerating(false);
    }
  }

  function handleCopyInvite() {
    if (!inviteCode) return;
    navigator.clipboard.writeText(inviteCode).then(() => {
      setCopyLabel("Copied ✓");
      setTimeout(() => setCopyLabel("Copy Code"), 1500);
    });
  }

  async function handleRemoveMember(userId) {
    setBusyUserId(userId); setRosterError("");
    try {
      const { error } = await sb.from("team_members").delete().eq("user_id", userId);
      if (error) throw error;
      await loadRoster();
    } catch (err) {
      setRosterError(err.message || "Couldn't remove that person.");
    } finally {
      setBusyUserId(null);
    }
  }

  async function handleLeaveTeam() {
    setBusyUserId(me.user_id); setRosterError("");
    try {
      const { error } = await sb.from("team_members").delete().eq("user_id", me.user_id);
      if (error) throw error;
      cachedTeamRoster = null;
      onClose();
      onSignOut();
    } catch (err) {
      setRosterError(err.message || "Couldn't leave the team.");
      setBusyUserId(null);
    }
  }

  return (
    <>
      <div className="account-sidebar-overlay" onClick={onClose} />
      <div className="account-sidebar-panel">
        <div className="account-sidebar-header">
          {view === "menu" ? (
            <img src={WORDMARK_DATA_URI} alt="TruxFlow" className="account-sidebar-wordmark" />
          ) : (
            <button type="button" className="account-sidebar-back" onClick={() => setView("menu")}><ChevronLeft size={18} /> {{ profile: "My Profile", manage: "Manage Users", companyInfo: "Company Info", settings: "Settings", timezone: "Time Zone", about: "About TruxFlow", help: "Help & Support" }[view] || "Back"}</button>
          )}
          <button type="button" className="account-modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <AccountSidebarErrorBoundary onClose={onClose}>
        {view === "menu" && (
          <div className="account-sidebar-menu">
            <button type="button" className="account-sidebar-menu-item" onClick={() => setView("profile")}>
              <span className="sidebar-pill-circle"><User size={18} color="#1A1300" /></span> <span className="sidebar-pill-label">My Profile</span> <span className="sidebar-pill-chevron"><ChevronRight size={18} /></span>
            </button>
            {loadingRoster && <div className="empty-state" style={{ padding: "20px 16px" }}>Loading…</div>}
            {isOwner && (
              <button type="button" className="account-sidebar-menu-item" onClick={() => setView("manage")}>
                <span className="sidebar-pill-circle"><Users size={18} color="#1A1300" /></span> <span className="sidebar-pill-label">Manage Users</span> <span className="sidebar-pill-chevron"><ChevronRight size={18} /></span>
              </button>
            )}
            <button type="button" className="account-sidebar-menu-item" onClick={() => setView("companyInfo")}>
              <span className="sidebar-pill-circle"><Building2 size={18} color="#1A1300" /></span> <span className="sidebar-pill-label">Company Info</span> <span className="sidebar-pill-chevron"><ChevronRight size={18} /></span>
            </button>
            <button type="button" className="account-sidebar-menu-item" onClick={() => setView("settings")}>
              <span className="sidebar-pill-circle"><SettingsIcon size={18} color="#1A1300" /></span> <span className="sidebar-pill-label">Settings</span> <span className="sidebar-pill-chevron"><ChevronRight size={18} /></span>
            </button>
            <button type="button" className="account-sidebar-menu-item" onClick={() => setView("timezone")}>
              <span className="sidebar-pill-circle"><Calendar size={18} color="#1A1300" /></span> <span className="sidebar-pill-label">Time Zone</span> <span className="sidebar-pill-chevron"><ChevronRight size={18} /></span>
            </button>
            <button type="button" className="account-sidebar-menu-item" onClick={() => setView("about")}>
              <span className="sidebar-pill-circle"><FileText size={18} color="#1A1300" /></span> <span className="sidebar-pill-label">About TruxFlow</span> <span className="sidebar-pill-chevron"><ChevronRight size={18} /></span>
            </button>
            <button type="button" className="account-sidebar-menu-item" onClick={() => setView("help")}>
              <span className="sidebar-pill-circle"><MessageCircle size={18} color="#1A1300" /></span> <span className="sidebar-pill-label">Help & Support</span> {unreadSupportCount > 0 && <span className="account-sidebar-menu-item-badge">{unreadSupportCount > 9 ? "9+" : unreadSupportCount}</span>} <span className="sidebar-pill-chevron"><ChevronRight size={18} /></span>
            </button>
            <div style={{ height: 16 }} />
            <button
              type="button"
              className="account-sidebar-menu-item account-sidebar-signout"
              onClick={() => askConfirm(
                "Are you sure you want to sign out?",
                () => { cachedTeamRoster = null; onClose(); onSignOut(); },
                { title: "Sign Out?", confirmLabel: "Sign Out", dangerous: true }
              )}
            >
              <span className="sidebar-pill-circle"><X size={18} color="#1A1300" /></span> <span className="sidebar-pill-label">Sign Out</span> <span className="sidebar-pill-chevron"><ChevronRight size={18} /></span>
            </button>
          </div>
        )}

        {view === "profile" && (
          <div className="account-modal-body">
            <ProfileFields userEmail={userEmail} isOwner={isOwner} roster={roster} />
            {roster && !isOwner && (
              <button type="button" className="btn danger" style={{ marginTop: 14, width: "100%" }} disabled={busyUserId === (me && me.user_id)} onClick={handleLeaveTeam}>
                {busyUserId === (me && me.user_id) ? "Leaving…" : "Leave This Team"}
              </button>
            )}
            {rosterError && <div style={{ color: "var(--red)", fontSize: 12.5, marginTop: 12 }}>{rosterError}</div>}
          </div>
        )}

        {view === "manage" && isOwner && (
          <div className="account-modal-body">
            {loadingRoster && <div className="empty-state">Loading your team…</div>}
            {rosterError && <div style={{ color: "var(--red)", fontSize: 12.5, marginBottom: 12 }}>{rosterError}</div>}
            {!loadingRoster && roster && (
              <>
                <div className="team-roster-list">
                  {roster.map((m) => (
                    <div className="team-roster-row" key={m.user_id}>
                      <div className="team-roster-info">
                        <div className="team-roster-email">{m.email}{m.is_me ? " (you)" : ""}</div>
                        <div className="team-roster-role">{m.role === "owner" ? "Owner" : "Member"}</div>
                      </div>
                      {!m.is_me && (
                        <button type="button" className="team-roster-remove-btn" disabled={busyUserId === m.user_id} onClick={() => handleRemoveMember(m.user_id)}>
                          {busyUserId === m.user_id ? "…" : "Remove"}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="account-modal-invite-section">
                  <div className="dash-filter-label" style={{ marginBottom: 8 }}>Invite a teammate</div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 10, lineHeight: 1.5 }}>
                    Send an invite email — they'll get a link to set up their own login, and once they do, they'll see and edit the same data you do: trucks, loads, everything.
                  </div>
                  <form onSubmit={handleSendEmailInvite} style={{ display: "flex", gap: 8 }}>
                    <input type="email" required placeholder="teammate@email.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} style={{ flex: 1, background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)", padding: "10px 11px", borderRadius: 8, fontSize: 13.5 }} />
                    <button type="submit" className="btn" style={{ marginTop: 0, width: "auto", padding: "10px 16px", flexShrink: 0 }} disabled={sendingInvite}>
                      {sendingInvite ? "Sending…" : "Send Invite"}
                    </button>
                  </form>
                  {inviteEmailError && <div style={{ color: "var(--red)", fontSize: 12, marginTop: 8 }}>{inviteEmailError}</div>}
                  {inviteSentMsg && <div style={{ color: "var(--green)", fontSize: 12, marginTop: 8 }}>{inviteSentMsg}</div>}

                  <div style={{ borderTop: "1px solid var(--border)", marginTop: 16, paddingTop: 14 }}>
                    <div style={{ fontSize: 11.5, color: "var(--text-dim)", marginBottom: 10, lineHeight: 1.5 }}>
                      Or share a code manually instead — useful if the email doesn't arrive. They enter it as an "Invite Code" when creating their account.
                    </div>
                    {inviteCode ? (
                      <div className="invite-code-display">
                        <span>{inviteCode}</span>
                        <button type="button" className="btn" style={{ marginTop: 0, width: "auto", padding: "8px 14px" }} onClick={handleCopyInvite}>{copyLabel}</button>
                      </div>
                    ) : (
                      <button type="button" className="btn secondary" onClick={handleGenerateInvite} disabled={generating}>
                        {generating ? "Generating…" : "Generate Invite Code Instead"}
                      </button>
                    )}
                    <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 8 }}>Codes expire after 7 days and can only be used once.</div>
                  </div>
                </div>

                <ActivityLogSection />
              </>
            )}
          </div>
        )}

        {view === "companyInfo" && <CompanyInfoSection settings={settings} saveSettings={saveSettings} />}
        {view === "settings" && <SettingsTab onBack={() => setView("menu")} settings={settings} saveSettings={saveSettings} saveStartingNumber={saveStartingNumber} nextLoadNumber={nextLoadNumber} askConfirm={askConfirm} />}
        {view === "timezone" && <TimezoneSection settings={settings} saveSettings={saveSettings} logActivity={logActivity} />}
        {view === "about" && <AboutTruxFlowSection />}
        {view === "help" && <HelpSupportSection isOwner={isOwner} />}
        </AccountSidebarErrorBoundary>
      </div>
    </>
  );
}

function DispatchApp({ onSignOut, userEmail } = {}) {
  const [tab, setTab] = useState("eta"); // the ETA Board is the home page
  const [dashUnlocked, setDashUnlocked] = useState(false);
  const [dashSubTab, setDashSubTab] = useState("reports"); // "reports" | "stub"
  const [pinEntry, setPinEntry] = useState("");
  const [pinError, setPinError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false); // data couldn't be loaded: never open with blank lists
  const [trucks, setTrucks] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [billTos, setBillTos] = useState([]);
  const [shippers, setShippers] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [loads, setLoads] = useState([]);
  const [trips, setTrips] = useState([]);
  const [history, setHistory] = useState([]);
  const [iftaReports, setIftaReports] = useState([]);
  const [fuelReports, setFuelReports] = useState([]);
  const [etaBoard, setEtaBoard] = useState({});
  const etaBoardRef = useRef({});
  etaBoardRef.current = etaBoard;
  const [iftaRates, setIftaRates] = useState(IFTA_DEFAULT_RATES);
  const [favoriteJurisdictions, setFavoriteJurisdictions] = useState([]);
  const [dispatchers, setDispatchers] = useState([]);
  const [dispatcherStubHistory, setDispatcherStubHistory] = useState([]);
  const [stubTypeTab, setStubTypeTab] = useState("driver"); // "driver" | "dispatcher"
  const [settings, setSettings] = useState({ startingLoadNumber: 1000, theme: "dark", companyName: "", companyAddress: "", dotNumber: "", companyEmail: "", dispatchFeeSchedule: [], dispatcherPaySchedule: [], companyLogoDataUri: "", oregonPermitRate: 0.251, timezone: "America/Los_Angeles" });
  useEffect(() => { appTimezone = settings.timezone || "America/Los_Angeles"; }, [settings.timezone]);
  const [headerClock, setHeaderClock] = useState("");
  // Trucks running late (In Transit/Covered, ETA time passed, not marked arrived) — shown on the ETA button.
  const etaLateCount = useMemo(() => {
    const tz = settings.timezone || "America/Los_Angeles";
    const now = Date.now();
    return (trucks || []).filter((t) => {
      if (t.active === false || !t.number) return false;
      const e = normEta((etaBoard || {})[t.number]);
      if (e.status !== "transit" && e.status !== "covered") return false;
      const leg = etaLeg(e);
      if (!leg.date || !leg.time || e[`${leg.key}ArrivedAt`]) return false;
      return zonedTimeToMs(leg.date, leg.time, tz) < now - 60000;
    }).length;
  }, [etaBoard, trucks, settings.timezone, headerClock]); // headerClock ticks, so this re-checks over time
  useEffect(() => {
    function tick() { setHeaderClock(formatClockInTimezone(settings.timezone || "America/Los_Angeles")); }
    tick();
    const interval = setInterval(tick, 30000);
    return () => clearInterval(interval);
  }, [settings.timezone]);

  const [loadForm, setLoadForm] = useState(emptyLoad());
  const [editingLoadId, setEditingLoadId] = useState(null);
  const [showLoadForm, setShowLoadForm] = useState(false);
  const [milesStatus, setMilesStatus] = useState("");

  const [tripForm, setTripForm] = useState(emptyTrip());
  const [expensesView, setExpensesView] = useState("list");
  const [tripsMonth, setTripsMonth] = useState(new Date().getMonth() + 1);
  const [tripsYear, setTripsYear] = useState(new Date().getFullYear());
  const [activeTripId, setActiveTripId] = useState(null);

  const [fleetView, setFleetView] = useState("menu"); // menu | trucks | drivers | billto | shippers | receivers
  const [driverForm, setDriverForm] = useState(emptyDriver());
  const [editingDriverId, setEditingDriverId] = useState(null);
  const [expandedDriverId, setExpandedDriverId] = useState(null);
  const [truckForm, setTruckForm] = useState(emptyTruck());
  const [editingTruckId, setEditingTruckId] = useState(null);
  const [billToForm, setBillToForm] = useState(emptyBillTo());
  const [editingBillToId, setEditingBillToId] = useState(null);
  const [shipperForm, setShipperForm] = useState(emptyShipper());
  const [editingShipperId, setEditingShipperId] = useState(null);
  const [receiverForm, setReceiverForm] = useState(emptyReceiver());
  const [editingReceiverId, setEditingReceiverId] = useState(null);
  const [dispatcherForm, setDispatcherForm] = useState(emptyDispatcher());
  const [editingDispatcherId, setEditingDispatcherId] = useState(null);
  const [fleetSearch, setFleetSearch] = useState("");

  const [importTarget, setImportTarget] = useState(null); // "billto" | "shippers" | "receivers" | null
  const [confirmModal, setConfirmModal] = useState(null); // { message, onConfirm } | null
  const [importRows, setImportRows] = useState([]);
  const [importHeaders, setImportHeaders] = useState([]);
  const [importMapping, setImportMapping] = useState({});
  const [importUpdateDupes, setImportUpdateDupes] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const fileInputRef = useRef(null);

  const [expandedLoadId, setExpandedLoadId] = useState(null);
  const [filterTruck, setFilterTruck] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("active");
  const [loadSearch, setLoadSearch] = useState("");
  const [tripLoadsFilter, setTripLoadsFilter] = useState(null); // { truck, start, end, tripLabel } | null

  const [dashPeriod, setDashPeriod] = useState("month"); // month | year | custom
  const [dashStart, setDashStart] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-01`);
  const [dashEnd, setDashEnd] = useState(todayISO());
  const [dashViewBy, setDashViewBy] = useState("driver"); // driver | truck | billto
  const [dashDriverFilter, setDashDriverFilter] = useState([]); // [] = all
  const [dashTruckFilter, setDashTruckFilter] = useState("ALL");
  const [dashBillToFilter, setDashBillToFilter] = useState("ALL");
  const [dashDispatcherFilter, setDashDispatcherFilter] = useState("");
  const [dashMilesGroupBy, setDashMilesGroupBy] = useState("driver");
  const [dashApplied, setDashApplied] = useState(null); // snapshot applied on "Update"
  const [annualTaxYear, setAnnualTaxYear] = useState(new Date().getFullYear());

  const [stubDriver, setStubDriver] = useState("");
  const [stubStart, setStubStart] = useState(daysAgoISO(6));
  const [stubEnd, setStubEnd] = useState(todayISO());
  const [stubDisplayAs, setStubDisplayAs] = useState("driver");
  const [viewingStubRecord, setViewingStubRecord] = useState(null); // frozen historical snapshot being viewed

  const [saveState, setSaveState] = useState("idle");
  const [saveError, setSaveError] = useState("");
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  // Refreshing is done with the round refresh button in the header.
  const [refreshing, setRefreshing] = useState(false);
  // Back-to-top button: appears after scrolling down, centered on the app
  // column just below the (frozen) header, on both phone and desktop.
  const headerRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollTopPos, setScrollTopPos] = useState(null);
  useEffect(() => {
    let visible = false;
    function measure() {
      const h = headerRef.current;
      if (!h) return;
      // Center of the app column itself (not the screen), so on desktop, where
      // the app sits beside the sidebar, it still lines up with the middle of
      // the app — e.g. the divider between Loads and New Load.
      const hb = h.getBoundingClientRect();
      setScrollTopPos({ top: Math.round(hb.bottom + 10), left: Math.round(hb.left + hb.width / 2) });
    }
    function onScroll() {
      const v = window.scrollY > 300;
      if (v !== visible) { visible = v; if (v) measure(); setShowScrollTop(v); }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", measure); };
  }, []);
  const [refreshedFlash, setRefreshedFlash] = useState(false);
  const contentRef = useRef(null);
  async function handleManualRefresh() {
    if (refreshing) return;
    setRefreshing(true);
    await loadAllData();
    setRefreshing(false);
    setRefreshedFlash(true);
    setTimeout(() => setRefreshedFlash(false), 1800);
  }
  const [unreadSupportCount, setUnreadSupportCount] = useState(0);

  // Logging failures must never block the actual action (creating a load,
  // marking pay) — this is best-effort visibility for the owner, not a
  // critical path. Uses async/await rather than chaining .catch() directly,
  // since Supabase's query builder isn't a full native Promise and doesn't
  // reliably support that (a real bug caught and fixed elsewhere in this app).
  async function logActivity(actionType, description) {
    if (typeof sb === "undefined" || typeof currentTeamId === "undefined" || !currentTeamId) return;
    try {
      await sb.from("activity_log").insert({
        team_id: currentTeamId,
        user_id: (typeof currentUserId !== "undefined" ? currentUserId : null),
        user_email: userEmail || "unknown",
        action_type: actionType,
        description,
      });
    } catch (e) {}
  }

  async function checkUnreadSupport() {
    if (typeof sb === "undefined") return;
    try {
      const { data } = await sb.rpc("count_unread_support_messages");
      setUnreadSupportCount(typeof data === "number" ? data : 0);
    } catch (e) {
      // Non-fatal — a failed check just means the badge doesn't update this cycle.
    }
  }

  useEffect(() => {
    checkUnreadSupport();
    const interval = setInterval(checkUnreadSupport, 60000);
    async function prefetchRoster() {
      if (typeof sb === "undefined") return;
      try {
        const { data } = await sb.rpc("get_team_roster");
        if (Array.isArray(data)) cachedTeamRoster = data;
      } catch (e) {}
    }
    prefetchRoster();
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);
  const [textScale, setTextScale] = useState("normal"); // "normal" | "large" -- desktop only

  async function loadAllData() {
    try {
      const keys = ["loads", "trucks", "drivers", "billTos", "shippers", "receivers", "tripExpenses", "payStubHistory", "settings", "iftaReports", "iftaRates", "iftaFavorites", "dispatchers", "dispatcherPayStubHistory", "fuelReports", "etaBoard"];
      const results = await Promise.all(keys.map((k) => safeGet(k)));
      const [t, tr, dr, bt, sh, rc, tp, hi, st, ifr, ifra, iff, dsp, dph, fur, eta] = results;
      setLoads((t ? JSON.parse(t.value) : []).map(normalizeLoad));
      setTrucks(normalizeTrucks(tr ? JSON.parse(tr.value) : []));
      setDrivers(normalizeDrivers(dr ? JSON.parse(dr.value) : []));
      setBillTos(bt ? JSON.parse(bt.value) : []);
      setShippers(sh ? JSON.parse(sh.value) : []);
      setReceivers(rc ? JSON.parse(rc.value) : []);
      setTrips((tp ? JSON.parse(tp.value) : []).map(normalizeTrip));
      setHistory(hi ? JSON.parse(hi.value) : []);
      const settingsDefaults = { startingLoadNumber: 1000, theme: "dark", companyName: "", companyAddress: "", dotNumber: "", companyEmail: "", dispatchFeeSchedule: [], dispatcherPaySchedule: [], companyLogoDataUri: "", pinCode: "", oregonPermitRate: 0.251, timezone: "America/Los_Angeles" };
      setSettings(st ? { ...settingsDefaults, ...JSON.parse(st.value) } : settingsDefaults);
      setIftaReports(ifr ? JSON.parse(ifr.value) : []);
      setIftaRates(ifra ? { ...IFTA_DEFAULT_RATES, ...JSON.parse(ifra.value) } : IFTA_DEFAULT_RATES);
      setFavoriteJurisdictions(iff ? JSON.parse(iff.value) : []);
      setDispatchers(dsp ? JSON.parse(dsp.value) : []);
      setDispatcherStubHistory(dph ? JSON.parse(dph.value) : []);
      setFuelReports(fur ? JSON.parse(fur.value) : []);
      setEtaBoard(eta ? JSON.parse(eta.value) || {} : {});
      return true;
    } catch (e) { console.error(e); return false; }
  }

  async function startUp() {
    setLoadFailed(false);
    if (await loadAllData()) {
      setLoaded(true);
      window.__truxflowReady = true; // tells the start page's stuck-loading check all is well
    } else {
      setLoadFailed(true);
      window.__truxflowReady = true; // the app answered (with a retry screen) — not stuck
    }
  }
  useEffect(() => { startUp(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function persist(key, value, setter) {
    setter(value);
    setSaveState("saving");
    try {
      await window.storage.set(key, JSON.stringify(value));
      setSaveState("saved");
      setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 900);
    } catch (e) {
      console.error(e);
      // A failed save must never be silent — the change above only exists in
      // this tab's memory until a save actually succeeds, so refreshing or
      // closing the app right now would lose it.
      setSaveState("error");
      setSaveError((e && e.message) || "Unknown error");
    }
  }

  const truckNumbers = useMemo(() => trucks.map((t) => t.number), [trucks]);
  const driverNames = useMemo(() => drivers.map((d) => d.name), [drivers]);
  const driverByName = useMemo(() => { const m = {}; drivers.forEach((d) => { m[d.name] = d; }); return m; }, [drivers]);
  // Active-only versions, specifically for assigning to a NEW load or trip —
  // an inactive truck/driver/bill-to shouldn't be selectable there, even
  // though the unfiltered lists above still need to include them for report
  // filters (so historical data for a now-inactive entity stays reachable).
  const activeTruckNumbers = useMemo(() => trucks.filter((t) => t.active !== false).map((t) => t.number), [trucks]);
  const activeDriverNames = useMemo(() => drivers.filter((d) => d.active !== false).map((d) => d.name), [drivers]);
  const activeBillTos = useMemo(() => billTos.filter((b) => b.active !== false), [billTos]);

  const nextLoadNumber = useMemo(() => {
    const nums = loads.map((l) => l.loadNumber).filter((n) => typeof n === "number");
    const naturalNext = nums.length ? Math.max(...nums) + 1 : 0;
    const startingFloor = num(settings.startingLoadNumber) || 1000;
    return Math.max(naturalNext, startingFloor);
  }, [loads, settings]);

  const nextStubNumber = useMemo(() => {
    const nums = history.map((h) => h.stubNumber).filter((n) => typeof n === "number");
    return nums.length ? Math.max(...nums) + 1 : 1;
  }, [history]);
  const nextDispatcherStubNumber = useMemo(() => {
    const nums = dispatcherStubHistory.map((h) => h.stubNumber).filter((n) => typeof n === "number");
    return nums.length ? Math.max(...nums) + 1 : 1;
  }, [dispatcherStubHistory]);

  function computeDispatcherStub(dispatcherName, start, end) {
    const matchingLoads = dispatcherName
      ? loads.filter((l) => l.dispatcher === dispatcherName && l.status === "completed" && (l.dispatcherPaidStatus || "unpaid") !== "paid" && inRange(l.deliveryDate || l.pickupDate, start, end))
      : [];
    const grossTotal = matchingLoads.reduce((s, l) => s + num(l.rate), 0);
    const loadCount = matchingLoads.length;
    const dispatcher = dispatcherByName[norm(dispatcherName)];
    const endDate = end ? new Date(end) : new Date();
    const globalDefaultPct = resolveScheduledPercent(settings.dispatcherPaySchedule, endDate.getFullYear(), endDate.getMonth() + 1, DEFAULT_DISPATCHER_PAY);
    const pay = computeDispatcherPay(dispatcher, grossTotal, loadCount, globalDefaultPct);
    return { dispatcher, loads: matchingLoads, grossTotal, loadCount, pay };
  }

  async function saveAndPrintDispatcherStub(dispatcherName, start, end, stubData) {
    if (!stubData || !dispatcherName) return;
    const loadSnapshots = stubData.loads.map((l) => ({ loadId: l.id, loadNumber: l.loadNumber, workOrder: l.workOrder, date: l.deliveryDate || l.pickupDate, rate: num(l.rate) }));
    const record = {
      id: uid(), stubNumber: nextDispatcherStubNumber, dispatcherName,
      generatedAt: new Date().toISOString(), periodStart: start, periodEnd: end,
      loadIds: stubData.loads.map((l) => l.id), loadSnapshots,
      grossTotal: stubData.grossTotal, loadCount: stubData.loadCount,
      payMethod: stubData.pay.method, payValue: stubData.pay.value, earnings: stubData.pay.earnings,
      voided: false,
    };
    const updatedHistory = [...dispatcherStubHistory, record];
    const includedIds = new Set(record.loadIds);
    const updatedLoads = loads.map((l) => (includedIds.has(l.id) ? { ...l, dispatcherPaidStatus: "paid", dispatcherPaidStubId: record.id } : l));
    await persist("dispatcherPayStubHistory", updatedHistory, setDispatcherStubHistory);
    await persist("loads", updatedLoads, setLoads);
    generatePdf(dispatcherPayFilename(record));
  }
  async function voidDispatcherStub(stubRecord) {
    const updatedLoads = loads.map((l) => (stubRecord.loadIds && stubRecord.loadIds.includes(l.id) ? { ...l, dispatcherPaidStatus: "unpaid", dispatcherPaidStubId: null } : l));
    const updatedHistory = dispatcherStubHistory.map((h) => (h.id === stubRecord.id ? { ...h, voided: true } : h));
    await persist("loads", updatedLoads, setLoads);
    await persist("dispatcherPayStubHistory", updatedHistory, setDispatcherStubHistory);
  }

  // ---- Loads ----
  function openNewLoad() { setLoadForm({ ...emptyLoad(), billTo: "Amazon", dispatcher: mainDispatcherName }); setEditingLoadId(null); setMilesStatus(""); setShowLoadForm(true); }
  async function saveLoad(e) {
    e.preventDefault();
    if (!loadForm.billTo || !loadForm.truck) return;
    let updated;
    const isNewLoad = !editingLoadId;
    if (editingLoadId) updated = loads.map((l) => (l.id === editingLoadId ? { ...loadForm, id: editingLoadId } : l));
    else updated = [...loads, { ...loadForm, id: uid(), loadNumber: nextLoadNumber, status: "active", paidStatus: "unpaid", paidStubId: null }];
    await persist("loads", updated, setLoads);
    if (isNewLoad) logActivity("load_created", `Created Load #${nextLoadNumber} (Truck ${loadForm.truck})`);
    else logActivity("load_edited", `Edited Load #${loadForm.loadNumber} (Truck ${loadForm.truck})`);
    setShowLoadForm(false); setLoadForm(emptyLoad()); setEditingLoadId(null);
  }
  function scrollContentToTop() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        const contentEl = document.querySelector(".content");
        if (contentEl) contentEl.scrollTop = 0;
      });
    });
  }
  function editLoad(l) {
    setLoadForm({ ...emptyLoad(), ...l, stops: (l.stops || []).map((s) => ({ ...s })) });
    setEditingLoadId(l.id);
    setShowLoadForm(true);
    scrollContentToTop();
  }
  function duplicateLoad(l) {
    setLoadForm({
      ...emptyLoad(),
      billTo: l.billTo, rate: l.rate, driver: l.driver, truck: l.truck, dispatcher: l.dispatcher || mainDispatcherName,
      shipperName: l.shipperName, shipperCity: l.shipperCity, shipperState: l.shipperState, shipperZip: l.shipperZip, shipperWarehouseCode: l.shipperWarehouseCode,
      stops: (l.stops || []).map((s) => ({ ...s, id: uid() })),
    });
    setEditingLoadId(null);
    setShowLoadForm(true);
    scrollContentToTop();
  }
  async function deleteLoad(id) {
    const target = loads.find((l) => l.id === id);
    await persist("loads", loads.filter((l) => l.id !== id), setLoads);
    if (target) logActivity("load_deleted", `Deleted Load #${target.loadNumber} (Truck ${target.truck})`);
  }
  async function closeLoad(id) { await persist("loads", loads.map((l) => (l.id === id ? { ...l, status: "completed" } : l)), setLoads); }
  async function closeAllActiveLoads() { await persist("loads", loads.map((l) => (l.status === "active" ? { ...l, status: "completed" } : l)), setLoads); }
  async function reopenLoad(id) { await persist("loads", loads.map((l) => (l.id === id ? { ...l, status: "active" } : l)), setLoads); }
  async function markLoadInvoiced(id) {
    const target = loads.find((l) => l.id === id);
    await persist("loads", loads.map((l) => (l.id === id ? { ...l, invoiceStage: "invoiced", invoicedAt: new Date().toISOString() } : l)), setLoads);
    if (target) logActivity("invoice_created", `Created invoice for Load #${target.loadNumber}`);
  }
  async function markLoadPaid(id) {
    const target = loads.find((l) => l.id === id);
    await persist("loads", loads.map((l) => (l.id === id ? { ...l, invoiceStage: "paid", paidAt: new Date().toISOString() } : l)), setLoads);
    if (target) logActivity("invoice_paid", `Marked invoice paid for Load #${target.loadNumber}`);
  }
  async function revertInvoiceStage(id, toStage) { await persist("loads", loads.map((l) => (l.id === id ? { ...l, invoiceStage: toStage } : l)), setLoads); }

  function applyShipper(name) {
    const match = shippers.find((s) => norm(s.companyName) === norm(name) || (s.warehouseCode && norm(s.warehouseCode) === norm(name)));
    if (match) {
      setLoadForm((f) => ({ ...f, shipperName: match.companyName, shipperCity: match.city, shipperState: match.state, shipperZip: match.zip, shipperWarehouseCode: match.warehouseCode || "" }));
    } else {
      setLoadForm((f) => ({ ...f, shipperName: name, shipperWarehouseCode: "" }));
    }
  }
  function applyReceiverToStop(stopId, name) {
    const match = receivers.find((r) => norm(r.companyName) === norm(name) || (r.warehouseCode && norm(r.warehouseCode) === norm(name)));
    if (match) updateStop(stopId, { receiverName: match.companyName, city: match.city, state: match.state, zip: match.zip, warehouseCode: match.warehouseCode || "" });
    else updateStop(stopId, { receiverName: name, warehouseCode: "" });
  }
  function addStop() { setLoadForm((f) => ({ ...f, stops: [...f.stops, { ...emptyStop(), id: uid() }] })); }
  function removeStop(stopId) { setLoadForm((f) => (f.stops.length <= 1 ? f : { ...f, stops: f.stops.filter((s) => s.id !== stopId) })); }
  function updateStop(stopId, patch) { setLoadForm((f) => ({ ...f, stops: f.stops.map((s) => (s.id === stopId ? { ...s, ...patch } : s)) })); }
  function moveStop(stopId, dir) {
    setLoadForm((f) => {
      const idx = f.stops.findIndex((s) => s.id === stopId);
      const swapWith = idx + dir;
      if (swapWith < 0 || swapWith >= f.stops.length) return f;
      const arr = [...f.stops];
      [arr[idx], arr[swapWith]] = [arr[swapWith], arr[idx]];
      return { ...f, stops: arr };
    });
  }

  async function calcMiles() {
    const waypoints = [
      cityState(loadForm.shipperCity, loadForm.shipperState) + (loadForm.shipperZip ? ` ${loadForm.shipperZip}` : ""),
      ...loadForm.stops.map((s) => cityState(s.city, s.state) + (s.zip ? ` ${s.zip}` : "")),
    ].map((w) => w.trim());
    if (waypoints.some((w) => !w)) { setMilesStatus("Fill in city/state for pickup and every stop first."); return; }
    setMilesStatus("Calculating…");
    try {
      const points = await Promise.all(waypoints.map(geocode));
      let total = 0;
      let usedFallback = false;
      for (let i = 0; i < points.length - 1; i++) {
        try { total += await routeMiles(points[i], points[i + 1]); }
        catch { total += haversineMiles(points[i], points[i + 1]); usedFallback = true; }
      }
      total = Math.round(total);
      setLoadForm((f) => ({ ...f, loadedMiles: String(total) }));
      setMilesStatus(usedFallback
        ? `Total: ${total} mi (some legs estimated straight-line — routing unavailable for part of the trip)`
        : `Total route distance: ${total} mi across ${points.length - 1} leg${points.length - 1 > 1 ? "s" : ""}`);
    } catch { setMilesStatus("Couldn't auto-calculate — enter miles manually."); }
  }

  // ---- Trip expense records ----
  function computeTripMilesGross(truck, start, end) {
    const matching = loads.filter((l) => l.truck === truck && l.status === "completed" && inRange(l.deliveryDate || l.pickupDate, start, end));
    return { miles: matching.reduce((s, l) => s + num(l.loadedMiles), 0), gross: matching.reduce((s, l) => s + num(l.rate), 0), loadCount: matching.length, orMiles: matching.reduce((s, l) => s + num(l.orMiles), 0) };
  }
  function computeTripProfit(record) {
    const { miles, gross } = computeTripMilesGross(record.truck, record.startDate, record.endDate);
    const expenseSum = TRIP_EXPENSE_FIELDS.reduce((s, f) => s + num(record[f.key]), 0);
    return { miles, gross, totalProfit: gross - expenseSum + num(record.refunds) + sumOtherCharges(record.cancellationsList) };
  }
  // Per-trip financial breakdown: percent/flat/salary drivers show a Dispatch Fee
  // (using that driver's own Fleet %); per-mile/hourly drivers show company profit
  // instead, since they don't get charged a dispatch fee.
  function computeTripFinancials(record) {
    const { miles, gross } = computeTripMilesGross(record.truck, record.startDate, record.endDate);
    const driver = driverByName[record.driver1];
    const companyExpenses = DRIVER_DEDUCTION_FIELDS.reduce((s, f) => s + num(record[f.key]), 0);
    if (isProfitOnlyDriver(driver)) {
      const driverPay = driver.payType === "cpm" ? num(driver.rate) * miles : (num(driver.rate) / 100) * gross;
      const refunds = num(record.refunds);
      const cancellations = sumOtherCharges(record.cancellationsList);
      const profit = gross - driverPay - companyExpenses - refunds - cancellations;
      return { miles, gross, mode: "profit", dispatchFee: 0, profit, feePct: 0 };
    }
    const feePct = dispatchFeePercentFor(driver);
    const dispatchFee = gross * (feePct / 100);
    return { miles, gross, mode: "fee", dispatchFee, profit: 0, feePct };
  }
  const nextTripNumber = useMemo(() => {
    const currentYear = String(new Date().getFullYear());
    const nums = trips
      .filter((t) => (t.startDate || "").slice(0, 4) === currentYear)
      .map((t) => parseFloat(t.tripNumber))
      .filter((n) => !isNaN(n));
    return nums.length ? Math.max(...nums) + 1 : 1;
  }, [trips]);
  // Next number within the year of the trip's OWN start date (not today's), so
  // a trip dated Jan 2 is Trip 1 of the new year even if entered on Dec 31, and
  // a late-entered Dec 30 trip continues last year's numbering.
  function nextTripNumberFor(startDate, excludeId) {
    const year = (startDate || todayISO()).slice(0, 4);
    const nums = trips
      .filter((t) => t.id !== excludeId && (t.startDate || "").slice(0, 4) === year)
      .map((t) => parseFloat(t.tripNumber))
      .filter((n) => !isNaN(n));
    return nums.length ? Math.max(...nums) + 1 : 1;
  }
  function openNewTrip() { setTripForm({ ...emptyTrip(), tripNumber: String(nextTripNumber) }); setActiveTripId(null); setExpensesView("detail"); }
  function openNewPendingTrip() { setTripForm({ ...emptyTrip(), tripNumber: "", tripStatus: "pending" }); setActiveTripId(null); setExpensesView("detail"); }
  function openTrip(t) { setTripForm({ ...t }); setActiveTripId(t.id); setExpensesView("detail"); }
  function closeTripDetail() { setExpensesView("list"); setTripForm(emptyTrip()); setActiveTripId(null); }
  async function saveTrip(e) {
    e.preventDefault();
    const isPending = tripForm.tripStatus === "pending";
    if (!isPending && (!tripForm.tripNumber || !tripForm.truck)) return;
    // Only re-check for a paid-date conflict if the truck or dates actually
    // changed from what was already saved. If they're untouched, any overlap
    // is a pre-existing situation, not something this save is introducing —
    // otherwise editing something unrelated (like notes) on a trip that
    // happens to already overlap another paid trip would get blocked by a
    // warning that has nothing to do with what's actually being changed.
    // Skip the conflict check entirely once this trip is itself already
    // paid — the whole point of this check is to stop a different, new
    // trip from accidentally overlapping dates that were already paid out.
    // It was never meant to gate editing this same paid trip's own notes or
    // other metadata after the fact.
    const original = activeTripId ? trips.find((t) => t.id === activeTripId) : null;
    const datesOrTruckChanged = !original || original.truck !== tripForm.truck || original.startDate !== tripForm.startDate || original.endDate !== tripForm.endDate;
    if (tripForm.paidStatus !== "paid" && datesOrTruckChanged && tripForm.truck && tripForm.startDate && tripForm.endDate) {
      const conflict = trips.find((t) =>
        t.id !== activeTripId && t.truck === tripForm.truck && t.paidStatus === "paid" &&
        t.startDate && t.endDate && overlaps(tripForm.startDate, tripForm.endDate, t.startDate, t.endDate)
      );
      if (conflict) {
        askConfirm(
          `Truck ${tripForm.truck} was already paid for ${fmtDate(conflict.startDate)} – ${fmtDate(conflict.endDate)} (Trip #${conflict.tripNumber || "—"}). Pick a date range that doesn't overlap an already-paid period, or those loads and earnings will be counted twice.`,
          () => {},
          { title: "Dates Already Paid", confirmLabel: "OK", dangerous: false }
        );
        return;
      }
    }
    let updated;
    const isNewTrip = !activeTripId;
    // A brand-new trip, or a pending trip being activated, takes the next number
    // in its own start year. Trips that were already active keep their number.
    const savedVersion = activeTripId ? trips.find((t) => t.id === activeTripId) : null;
    const becomingActive = !isPending && (!savedVersion || savedVersion.tripStatus === "pending");
    const tripToSave = becomingActive ? { ...tripForm, tripNumber: String(nextTripNumberFor(tripForm.startDate, activeTripId)) } : tripForm;
    if (activeTripId) updated = trips.map((t) => (t.id === activeTripId ? { ...tripToSave, id: activeTripId } : t));
    else updated = [...trips, { ...tripToSave, id: uid() }];
    await persist("tripExpenses", updated, setTrips);
    if (isNewTrip) logActivity("trip_created", `Created Trip #${tripToSave.tripNumber || "(pending)"} (Truck ${tripToSave.truck || "—"})`);
    else logActivity("trip_edited", `Edited Trip #${tripToSave.tripNumber || "(pending)"} (Truck ${tripToSave.truck || "—"})`);
    closeTripDetail();
  }
  async function deleteTrip(id) {
    const target = trips.find((t) => t.id === id);
    await persist("tripExpenses", trips.filter((t) => t.id !== id), setTrips);
    if (target) logActivity("trip_deleted", `Deleted Trip #${target.tripNumber || "(pending)"} (Truck ${target.truck || "—"})`);
    closeTripDetail();
  }

  // ---- Fleet: trucks ----
  async function saveTruck(e) {
    e.preventDefault();
    const number = truckForm.number.trim();
    if (!number) return;
    let updated;
    const isNewTruck = !editingTruckId;
    if (editingTruckId) updated = trucks.map((t) => (t.id === editingTruckId ? { ...truckForm, id: editingTruckId, number } : t));
    else updated = [...trucks, { ...truckForm, id: uid(), number }];
    await persist("trucks", updated, setTrucks);
    if (isNewTruck) logActivity("truck_created", `Created Truck ${number}`);
    else logActivity("truck_edited", `Edited Truck ${number}`);
    setTruckForm(emptyTruck()); setEditingTruckId(null);
  }
  function editTruck(t) { setTruckForm({ ...t }); setEditingTruckId(t.id); scrollContentToTop(); }
  async function removeTruck(id) {
    const target = trucks.find((t) => t.id === id);
    await persist("trucks", trucks.filter((t) => t.id !== id), setTrucks);
    if (target) logActivity("truck_deleted", `Deleted Truck ${target.number}`);
  }

  // ---- Fleet: drivers ----
  async function saveDriver(e) {
    e.preventDefault();
    const name = driverForm.name.trim();
    if (!name) return;
    let updated;
    const isNewDriver = !editingDriverId;
    if (editingDriverId) updated = drivers.map((d) => (d.id === editingDriverId ? { ...driverForm, id: editingDriverId, name } : d));
    else updated = [...drivers, { ...driverForm, id: uid(), name }];
    await persist("drivers", updated, setDrivers);
    if (isNewDriver) logActivity("driver_created", `Created Driver ${name}`);
    else logActivity("driver_edited", `Edited Driver ${name}`);
    setDriverForm(emptyDriver()); setEditingDriverId(null);
  }
  function editDriver(d) { setDriverForm({ ...d }); setEditingDriverId(d.id); scrollContentToTop(); }
  async function removeDriver(id) {
    const target = drivers.find((d) => d.id === id);
    await persist("drivers", drivers.filter((d) => d.id !== id), setDrivers);
    if (target) logActivity("driver_deleted", `Deleted Driver ${target.name}`);
  }
  async function saveDriverNotes(driverId, notes) {
    const updated = drivers.map((d) => (d.id === driverId ? { ...d, notes } : d));
    await persist("drivers", updated, setDrivers);
  }

  // ---- Fleet: bill to ----
  async function saveBillTo(e) {
    e.preventDefault();
    const name = billToForm.name.trim();
    if (!name) return;
    const isNewBillTo = !editingBillToId;
    const commit = async () => {
      let updated;
      if (editingBillToId) updated = billTos.map((b) => (b.id === editingBillToId ? { ...billToForm, id: editingBillToId, name } : b));
      else updated = [...billTos, { ...billToForm, id: uid(), name }];
      await persist("billTos", updated, setBillTos);
      if (isNewBillTo) logActivity("billto_created", `Created Bill To ${name}`);
      else logActivity("billto_edited", `Edited Bill To ${name}`);
      setBillToForm(emptyBillTo()); setEditingBillToId(null);
    };
    const isDupe = !editingBillToId && billTos.some((b) => norm(b.name) === norm(name));
    if (isDupe) askConfirm(`A Bill To named "${name}" already exists. Add it anyway?`, commit, { title: "Possible Duplicate", confirmLabel: "Add Anyway", dangerous: false });
    else await commit();
  }
  function editBillTo(b) { setBillToForm({ ...b }); setEditingBillToId(b.id); scrollContentToTop(); }
  async function removeBillTo(id) {
    const target = billTos.find((b) => b.id === id);
    await persist("billTos", billTos.filter((b) => b.id !== id), setBillTos);
    if (target) logActivity("billto_deleted", `Deleted Bill To ${target.name}`);
  }

  // ---- Fleet: shippers ----
  async function saveShipper(e) {
    e.preventDefault();
    const name = shipperForm.companyName.trim();
    if (!name) return;
    const isNewShipper = !editingShipperId;
    const commit = async () => {
      let updated;
      if (editingShipperId) updated = shippers.map((s) => (s.id === editingShipperId ? { ...shipperForm, id: editingShipperId, companyName: name } : s));
      else updated = [...shippers, { ...shipperForm, id: uid(), companyName: name }];
      await persist("shippers", updated, setShippers);
      if (isNewShipper) logActivity("shipper_created", `Created Shipper ${name}`);
      else logActivity("shipper_edited", `Edited Shipper ${name}`);
      setShipperForm(emptyShipper()); setEditingShipperId(null);
    };
    const isDupe = !editingShipperId && shippers.some((s) => norm(s.companyName) === norm(name));
    if (isDupe) askConfirm(`A shipper named "${name}" already exists. Add it anyway?`, commit, { title: "Possible Duplicate", confirmLabel: "Add Anyway", dangerous: false });
    else await commit();
  }
  function editShipper(s) { setShipperForm({ ...s }); setEditingShipperId(s.id); scrollContentToTop(); }
  async function removeShipper(id) {
    const target = shippers.find((s) => s.id === id);
    await persist("shippers", shippers.filter((s) => s.id !== id), setShippers);
    if (target) logActivity("shipper_deleted", `Deleted Shipper ${target.companyName}`);
  }
  async function removeShippers(ids) { const idSet = new Set(ids); await persist("shippers", shippers.filter((s) => !idSet.has(s.id)), setShippers); }
  async function removeAllShippers() { await persist("shippers", [], setShippers); }

  // ---- Fleet: receivers ----
  async function saveReceiver(e) {
    e.preventDefault();
    const name = receiverForm.companyName.trim();
    if (!name) return;
    const isNewReceiver = !editingReceiverId;
    const commit = async () => {
      let updated;
      if (editingReceiverId) updated = receivers.map((r) => (r.id === editingReceiverId ? { ...receiverForm, id: editingReceiverId, companyName: name } : r));
      else updated = [...receivers, { ...receiverForm, id: uid(), companyName: name }];
      await persist("receivers", updated, setReceivers);
      if (isNewReceiver) logActivity("receiver_created", `Created Receiver ${name}`);
      else logActivity("receiver_edited", `Edited Receiver ${name}`);
      setReceiverForm(emptyReceiver()); setEditingReceiverId(null);
    };
    const isDupe = !editingReceiverId && receivers.some((r) => norm(r.companyName) === norm(name));
    if (isDupe) askConfirm(`A receiver named "${name}" already exists. Add it anyway?`, commit, { title: "Possible Duplicate", confirmLabel: "Add Anyway", dangerous: false });
    else await commit();
  }
  function editReceiver(r) { setReceiverForm({ ...r }); setEditingReceiverId(r.id); scrollContentToTop(); }
  async function removeReceiver(id) {
    const target = receivers.find((r) => r.id === id);
    await persist("receivers", receivers.filter((r) => r.id !== id), setReceivers);
    if (target) logActivity("receiver_deleted", `Deleted Receiver ${target.companyName}`);
  }
  async function removeReceivers(ids) { const idSet = new Set(ids); await persist("receivers", receivers.filter((r) => !idSet.has(r.id)), setReceivers); }
  async function removeAllReceivers() { await persist("receivers", [], setReceivers); }
  async function addReceiverFromShipper(s) {
    if (receivers.some((r) => norm(r.companyName) === norm(s.companyName))) return;
    const newReceiver = { id: uid(), companyName: s.companyName, warehouseCode: s.warehouseCode, street: s.street, city: s.city, state: s.state, zip: s.zip, contact: s.contact };
    await persist("receivers", [...receivers, newReceiver], setReceivers);
  }
  async function addShipperFromReceiver(r) {
    if (shippers.some((s) => norm(s.companyName) === norm(r.companyName))) return;
    const newShipper = { id: uid(), companyName: r.companyName, warehouseCode: r.warehouseCode, street: r.street, city: r.city, state: r.state, zip: r.zip, contact: r.contact };
    await persist("shippers", [...shippers, newShipper], setShippers);
  }

  async function saveDispatcher(e) {
    e.preventDefault();
    const name = dispatcherForm.name.trim();
    if (!name) return;
    const isNewDispatcher = !editingDispatcherId;
    const commit = async () => {
      let updated;
      // Only one dispatcher can be "main" at a time -- demote any existing main.
      const clean = (d) => (dispatcherForm.position === "main" && d.id !== editingDispatcherId ? { ...d, position: "dispatcher" } : d);
      if (editingDispatcherId) updated = dispatchers.map(clean).map((d) => (d.id === editingDispatcherId ? { ...dispatcherForm, id: editingDispatcherId, name } : d));
      else updated = [...dispatchers.map(clean), { ...dispatcherForm, id: uid(), name }];
      await persist("dispatchers", updated, setDispatchers);
      if (isNewDispatcher) logActivity("dispatcher_created", `Created Dispatcher ${name}`);
      else logActivity("dispatcher_edited", `Edited Dispatcher ${name}`);
      setDispatcherForm(emptyDispatcher()); setEditingDispatcherId(null);
    };
    const isDupe = !editingDispatcherId && dispatchers.some((d) => norm(d.name) === norm(name));
    if (isDupe) askConfirm(`A dispatcher named "${name}" already exists. Add it anyway?`, commit, { title: "Possible Duplicate", confirmLabel: "Add Anyway", dangerous: false });
    else await commit();
  }
  function editDispatcher(d) { setDispatcherForm({ ...emptyDispatcher(), ...d }); setEditingDispatcherId(d.id); scrollContentToTop(); }
  async function removeDispatcher(id) {
    const target = dispatchers.find((d) => d.id === id);
    await persist("dispatchers", dispatchers.filter((d) => d.id !== id), setDispatchers);
    if (target) logActivity("dispatcher_deleted", `Deleted Dispatcher ${target.name}`);
  }
  const mainDispatcherName = useMemo(() => { const m = dispatchers.find((d) => d.position === "main"); return m ? m.name : ""; }, [dispatchers]);
  const dispatcherByName = useMemo(() => Object.fromEntries(dispatchers.map((d) => [norm(d.name), d])), [dispatchers]);

  async function saveStartingNumber(v) { await persist("settings", { ...settings, startingLoadNumber: num(v) || 1000 }, setSettings); }
  async function saveSettings(patch) { await persist("settings", { ...settings, ...patch }, setSettings); }
  async function saveIftaRates(patch) { await persist("iftaRates", { ...iftaRates, ...patch }, setIftaRates); }
  async function toggleFavoriteJurisdiction(j) {
    const updated = favoriteJurisdictions.includes(j) ? favoriteJurisdictions.filter((x) => x !== j) : [...favoriteJurisdictions, j];
    await persist("iftaFavorites", updated, setFavoriteJurisdictions);
  }
  async function saveIftaReport(report) {
    const isNewReport = !report.id;
    const record = { ...report, id: report.id || uid(), savedAt: new Date().toISOString() };
    const updated = report.id ? iftaReports.map((r) => (r.id === report.id ? record : r)) : [...iftaReports, record];
    await persist("iftaReports", updated, setIftaReports);
    if (isNewReport) logActivity("ifta_report_created", `Created IFTA report — Truck ${record.truck || "All"}, Q${record.quarter} ${record.year}`);
    return record;
  }
  // The ETA Board is shared by every open phone and computer. Each save starts
  // from the newest copy on the server and changes only the trucks this device
  // touched — so a device left open with old data can't wipe everyone else's
  // updates. Saves from this device run one at a time.
  const etaSaveChain = useRef(Promise.resolve());
  async function latestEtaBoard() {
    try {
      const r = await window.storage.get("etaBoard");
      const v = r && r.value ? JSON.parse(r.value) : null;
      if (v && typeof v === "object") return v;
    } catch { /* offline or not saved yet: use what this device has */ }
    return etaBoardRef.current;
  }
  function saveEtaChanges(apply) {
    const run = async () => {
      const next = apply({ ...(await latestEtaBoard()) });
      if (!next) return;
      etaBoardRef.current = next;
      await persist("etaBoard", next, setEtaBoard);
    };
    etaSaveChain.current = etaSaveChain.current.then(run, run);
    return etaSaveChain.current;
  }
  async function saveEtaEntry(truckNumber, entry) {
    await saveEtaChanges((b) => ({ ...b, [truckNumber]: entry }));
  }
  // Merges field changes into trips without touching "Updated" times. A patch can
  // be a function of the newest saved trip, so it's re-checked against fresh data.
  async function patchEtaEntries(patches) {
    await saveEtaChanges((b) => {
      let changed = false;
      Object.entries(patches).forEach(([t, patch]) => {
        if (!b[t]) return;
        const p = typeof patch === "function" ? patch(b[t]) : patch;
        if (p && Object.keys(p).length) { b[t] = { ...b[t], ...p }; changed = true; }
      });
      return changed ? b : null;
    });
  }
  // Adds road routes to trips without touching anything else (or "Updated" times).
  async function saveEtaRoutes(updates) {
    await saveEtaChanges((b) => {
      Object.entries(updates).forEach(([t, routes]) => { if (b[t]) b[t] = { ...b[t], routes: { ...(b[t].routes || {}), ...routes } }; });
      return b;
    });
  }
  // Picks up changes other devices saved (the ETA Board refreshes this every minute).
  async function reloadEtaBoard() {
    const v = await latestEtaBoard();
    if (v !== etaBoardRef.current && JSON.stringify(v) !== JSON.stringify(etaBoardRef.current)) { etaBoardRef.current = v; setEtaBoard(v); }
  }
  async function saveFuelReport(report) {
    const record = { ...report, id: report.id || uid(), importedAt: new Date().toISOString() };
    const updated = report.id ? fuelReports.map((r) => (r.id === report.id ? record : r)) : [...fuelReports, record];
    await persist("fuelReports", updated, setFuelReports);
    return record;
  }
  async function deleteFuelReport(id) { await persist("fuelReports", fuelReports.filter((r) => r.id !== id), setFuelReports); }
  async function deleteIftaReport(id) { await persist("iftaReports", iftaReports.filter((r) => r.id !== id), setIftaReports); }
  function askConfirm(message, onConfirm, opts) { setConfirmModal({ message, onConfirm, ...opts }); }

  // ---- Import from Excel ----
  function startImport(target) {
    setImportTarget(target);
    setImportRows([]); setImportHeaders([]); setImportMapping({}); setImportResult(null);
    setTimeout(() => fileInputRef.current && fileInputRef.current.click(), 0);
  }
  function handleFileSelected(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file || !importTarget) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const wb = XLSX.read(ev.target.result, { type: "array" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        if (!json.length) { setImportResult({ error: "No rows found in that file." }); return; }
        const headers = Object.keys(json[0]);
        const config = IMPORT_CONFIGS[importTarget];
        const mapping = {};
        config.fields.forEach((f) => { mapping[f.key] = guessColumn(headers, f.aliases); });
        setImportHeaders(headers);
        setImportRows(json);
        setImportMapping(mapping);
      } catch (err) { setImportResult({ error: "Couldn't read that file. Make sure it's .xlsx, .xls, or .csv." }); }
    };
    reader.readAsArrayBuffer(file);
  }
  async function commitImport() {
    const config = IMPORT_CONFIGS[importTarget];
    const matchKey = config.matchField;
    const nameHeader = importMapping[matchKey];
    if (!nameHeader) { setImportResult({ error: `Map the "${config.fields.find((f) => f.key === matchKey).label}" column before importing.` }); return; }

    let existing, setter, storageKey, emptyFn;
    if (importTarget === "billto") { existing = billTos; setter = setBillTos; storageKey = "billTos"; emptyFn = emptyBillTo; }
    else if (importTarget === "shippers") { existing = shippers; setter = setShippers; storageKey = "shippers"; emptyFn = emptyShipper; }
    else { existing = receivers; setter = setReceivers; storageKey = "receivers"; emptyFn = emptyReceiver; }

    let list = [...existing];
    let added = 0, updated = 0, skipped = 0;
    importRows.forEach((row) => {
      const record = { ...emptyFn(), id: uid() };
      config.fields.forEach((f) => { const col = importMapping[f.key]; if (col) record[f.key] = String(row[col] ?? "").trim(); });
      if (!record[matchKey]) { skipped++; return; }
      const dupIdx = list.findIndex((r) => norm(r[matchKey]) === norm(record[matchKey]));
      if (dupIdx !== -1) {
        if (importUpdateDupes) { list[dupIdx] = { ...record, id: list[dupIdx].id }; updated++; }
        else skipped++;
      } else { list.push(record); added++; }
    });
    await persist(storageKey, list, setter);
    setImportResult({ added, updated, skipped });
  }

  const loadsQuickStats = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const diffToMonday = day === 0 ? 6 : day - 1;
    const monday = new Date(now);
    monday.setDate(now.getDate() - diffToMonday);
    const mondayStr = monday.toISOString().slice(0, 10);
    const today = todayISO();
    const weekGross = loads
      .filter((l) => l.status === "completed" && inRange(l.deliveryDate || l.pickupDate, mondayStr, today))
      .reduce((s, l) => s + num(l.rate), 0);
    const activeValue = loads.filter((l) => l.status === "active").reduce((s, l) => s + num(l.rate), 0);
    const activeCount = loads.filter((l) => l.status === "active").length;
    return { weekGross, activeValue, activeCount };
  }, [loads]);

  const filteredLoads = useMemo(() => {
    if (tripLoadsFilter) {
      const field = tripLoadsFilter.matchField || "truck";
      return loads
        .filter((l) => l[field] === tripLoadsFilter.matchValue && l.status === "completed" && inRange(l.deliveryDate || l.pickupDate, tripLoadsFilter.start, tripLoadsFilter.end))
        .sort((a, b) => (b.loadNumber || 0) - (a.loadNumber || 0));
    }
    const cutoff = daysAgoISO(30);
    let list = loads.filter((l) => l.status === "active" || (l.deliveryDate || l.pickupDate || "") >= cutoff);
    if (filterTruck !== "ALL") list = list.filter((l) => l.truck === filterTruck);
    if (filterStatus !== "all") list = list.filter((l) => l.status === filterStatus);
    const q = norm(loadSearch);
    if (q) list = list.filter((l) => norm(String(l.loadNumber || "")).includes(q) || norm(l.billTo).includes(q) || norm(l.driver).includes(q) || norm(l.workOrder).includes(q) || norm(l.shipperTrailer).includes(q) || (l.stops || []).some((s) => norm(s.trailer).includes(q)));
    return list;
  }, [loads, filterTruck, filterStatus, loadSearch, tripLoadsFilter]);

  function onDashPeriodChange(period) {
    setDashPeriod(period);
    const now = new Date();
    if (period === "month") { setDashStart(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`); setDashEnd(todayISO()); }
    else if (period === "year") { setDashStart(`${now.getFullYear()}-01-01`); setDashEnd(todayISO()); }
    else if (period === "lastMonth") {
      const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const y = lastMonthDate.getFullYear(), m = lastMonthDate.getMonth();
      const lastDay = new Date(y, m + 1, 0).getDate();
      setDashStart(`${y}-${String(m + 1).padStart(2, "0")}-01`);
      setDashEnd(`${y}-${String(m + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`);
    } else if (period === "lastYear") {
      const y = now.getFullYear() - 1;
      setDashStart(`${y}-01-01`);
      setDashEnd(`${y}-12-31`);
    }
  }

  // Switching report type applies it immediately and resets the filters that
  // are shared between reports (truck, drivers, broker), so nothing picked for
  // one report silently carries into the next.
  function changeDashReport(v) {
    const start = dashStart, end = dashEnd;
    setDashViewBy(v);
    setDashTruckFilter("ALL");
    setDashDriverFilter([]);
    setDashBillToFilter("ALL");
    setDashApplied({ start, end, viewBy: v, drivers: [], truck: "ALL", billTo: "ALL", dispatcher: dashDispatcherFilter, milesGroupBy: dashMilesGroupBy });
  }
  function runDashUpdate() {
    setDashApplied({
      start: dashStart, end: dashEnd, viewBy: dashViewBy,
      drivers: dashDriverFilter, truck: dashTruckFilter, billTo: dashBillToFilter, dispatcher: dashDispatcherFilter, milesGroupBy: dashMilesGroupBy,
    });
  }

  function computeDriverPay(driverName, start, end) {
    const driver = driverByName[driverName];
    const driverLoads = loads.filter((l) => l.driver === driverName && l.status === "completed" && (l.paidStatus || "unpaid") !== "paid" && inRange(l.deliveryDate || l.pickupDate, start, end));
    const loadPays = driverLoads.map((l) => ({ ...l, driverPay: computeLoadPay(driver, l) }));
    let grossPay = loadPays.reduce((s, l) => s + l.driverPay, 0);
    if (driver && driver.payType === "salary") grossPay = num(driver.rate);
    const isMileage = isMileageOrHourly(driver);
    let loadedMilesPay = 0, emptyMilesPay = 0;
    if (isMileage) {
      loadedMilesPay = loadPays.reduce((s, l) => s + num(driver.rate) * num(l.loadedMiles), 0);
      emptyMilesPay = loadPays.reduce((s, l) => s + num(driver.rate) * num(l.deadheadMiles), 0);
    }
    const dispatchFeePercent = dispatchFeePercentFor(driver);
    const dispatchFee = grossPay * (dispatchFeePercent / 100);
    const driverTrips = trips.filter((t) => t.driver1 === driverName && (t.paidStatus || "unpaid") !== "paid" && overlaps(t.startDate, t.endDate, start, end));
    const expenseBreakdown = {};
    DRIVER_DEDUCTION_FIELDS.forEach((f) => {
      const appliesToThisDriver = !isMileage || f.key === "otherCharges";
      expenseBreakdown[f.key] = appliesToThisDriver ? driverTrips.reduce((s, t) => s + num(t[f.key]), 0) : 0;
    });
    const expenseTotal = DRIVER_DEDUCTION_FIELDS.reduce((s, f) => s + expenseBreakdown[f.key], 0);
    const refunds = driverTrips.reduce((s, t) => s + num(t.refunds), 0);
    const cancellations = driverTrips.reduce((s, t) => s + sumOtherCharges(t.cancellationsList), 0);
    const netPay = grossPay - dispatchFee - expenseTotal + refunds + cancellations;
    const trucksUsed = [...new Set(loadPays.map((l) => l.truck))];
    const tripIds = driverTrips.map((t) => t.id);
    const otherChargeItems = [];
    driverTrips.forEach((t) => {
      (t.otherChargesList || []).forEach((item) => {
        if (num(item.amount) > 0) otherChargeItems.push({ note: (item.note || "").trim() || "Other Charge", amount: num(item.amount) });
      });
    });
    const cancellationItems = [];
    driverTrips.forEach((t) => {
      (t.cancellationsList || []).forEach((item) => {
        if (num(item.amount) > 0) cancellationItems.push({ note: (item.note || "").trim() || "Cancellation", amount: num(item.amount) });
      });
    });
    const insuranceMonths = [...new Set(driverTrips.filter((t) => num(t.insurance) > 0 && t.insuranceMonth).map((t) => t.insuranceMonth))];
    const logbookMonths = [...new Set(driverTrips.filter((t) => num(t.logbook) > 0 && t.logbookMonth).map((t) => t.logbookMonth))];
    const orPermitNotes = [...new Set(driverTrips.filter((t) => num(t.orPermit) > 0 && t.orPermitNote && t.orPermitNote.trim()).map((t) => t.orPermitNote.trim()))];
    const truckPayNotes = [...new Set(driverTrips.filter((t) => num(t.truckPay) > 0 && t.truckPayNote && t.truckPayNote.trim()).map((t) => t.truckPayNote.trim()))];
    const refundsNotes = [...new Set(driverTrips.filter((t) => num(t.refunds) > 0 && t.refundsNote && t.refundsNote.trim()).map((t) => t.refundsNote.trim()))];
    return { driver, loadPays, grossPay, isMileage, loadedMilesPay, emptyMilesPay, dispatchFeePercent, dispatchFee, expenseBreakdown, expenseTotal, refunds, cancellations, cancellationItems, netPay, trucksUsed, tripIds, otherChargeItems, insuranceMonths, logbookMonths, orPermitNotes, truckPayNotes, refundsNotes };
  }

  const annualTaxReport = useMemo(() => {
    const yearStr = String(annualTaxYear);
    const rows = drivers.map((driver) => {
      const yearLoads = loads.filter((l) => l.driver === driver.name && l.status === "completed" && (l.deliveryDate || l.pickupDate || "").slice(0, 4) === yearStr);
      const total = yearLoads.reduce((s, l) => s + computeLoadPay(driver, l), 0);
      const totalMiles = yearLoads.reduce((s, l) => s + num(l.loadedMiles) + num(l.deadheadMiles), 0);
      const trucksUsed = [...new Set(yearLoads.map((l) => l.truck).filter(Boolean))];
      return { driver, loadCount: yearLoads.length, total, totalMiles, trucksUsed, isMileage: isMileageOrHourly(driver) };
    }).filter((r) => r.loadCount > 0).sort((a, b) => b.total - a.total);
    const grandTotal = rows.reduce((s, r) => s + r.total, 0);
    return { year: annualTaxYear, rows, grandTotal };
  }, [loads, drivers, annualTaxYear]);
  // Grand total for every year at once (same rules as the report above), so
  // the Tax Year picker can show each year's total next to it.
  const annualTaxTotalsByYear = useMemo(() => {
    const byName = {};
    drivers.forEach((d) => { byName[d.name] = d; });
    const totals = {};
    loads.forEach((l) => {
      const driver = byName[l.driver];
      if (!driver || l.status !== "completed") return;
      const yr = (l.deliveryDate || l.pickupDate || "").slice(0, 4);
      if (!yr) return;
      totals[yr] = (totals[yr] || 0) + computeLoadPay(driver, l);
    });
    return totals;
  }, [loads, drivers]);

  const dashReport = useMemo(() => {
    const f = dashApplied || { start: dashStart, end: dashEnd, viewBy: dashViewBy, drivers: dashDriverFilter, truck: dashTruckFilter, billTo: dashBillToFilter, dispatcher: dashDispatcherFilter, milesGroupBy: dashMilesGroupBy };
    let scoped = loads.filter((l) => l.status === "completed" && inRange(l.deliveryDate || l.pickupDate, f.start, f.end));
    if (f.drivers && f.drivers.length) scoped = scoped.filter((l) => f.drivers.includes(l.driver));
    if (f.truck && f.truck !== "ALL") scoped = scoped.filter((l) => l.truck === f.truck);
    if (f.billTo && f.billTo !== "ALL") scoped = scoped.filter((l) => l.billTo === f.billTo);

    if (f.viewBy === "miles") {
      const groupKey = f.milesGroupBy === "truck" ? "truck" : "driver";
      const groups = {};
      scoped.forEach((l) => {
        const key = l[groupKey] || "—";
        groups[key] = groups[key] || { loads: 0, miles: 0, emptyMiles: 0, gross: 0 };
        groups[key].loads += 1;
        groups[key].miles += num(l.loadedMiles);
        groups[key].emptyMiles += num(l.deadheadMiles);
        groups[key].gross += num(l.rate);
      });
      const rows = Object.entries(groups)
        .map(([key, g]) => ({ key, ...g, revPerMile: g.miles > 0 ? g.gross / g.miles : 0 }))
        .sort((a, b) => b.miles - a.miles);
      const totals = rows.reduce((acc, r) => ({ loads: acc.loads + r.loads, miles: acc.miles + r.miles, emptyMiles: acc.emptyMiles + r.emptyMiles, gross: acc.gross + r.gross }), { loads: 0, miles: 0, emptyMiles: 0, gross: 0 });
      totals.revPerMile = totals.miles > 0 ? totals.gross / totals.miles : 0;
      return { viewBy: f.viewBy, groupBy: groupKey, rows, totals, start: f.start, end: f.end };
    }

    if (f.viewBy === "dispatcher") {
      const selectedName = f.dispatcher || "";
      const matchingLoads = selectedName ? loads.filter((l) => l.status === "completed" && l.dispatcher === selectedName && inRange(l.deliveryDate || l.pickupDate, f.start, f.end) && (!f.truck || f.truck === "ALL" || l.truck === f.truck)) : [];
      const grossTotal = matchingLoads.reduce((s, l) => s + num(l.rate), 0);
      const totalMiles = matchingLoads.reduce((s, l) => s + num(l.loadedMiles), 0);
      const loadCount = matchingLoads.length;
      const dispatcher = dispatcherByName[norm(selectedName)];
      const endDate = f.end ? new Date(f.end) : new Date();
      const globalDefaultPct = resolveScheduledPercent(settings.dispatcherPaySchedule, endDate.getFullYear(), endDate.getMonth() + 1, DEFAULT_DISPATCHER_PAY);
      const pay = computeDispatcherPay(dispatcher, grossTotal, loadCount, globalDefaultPct);
      const avgPerMile = totalMiles > 0 ? grossTotal / totalMiles : 0;
      const companyGrossTotal = loads.filter((l) => l.status === "completed" && inRange(l.deliveryDate || l.pickupDate, f.start, f.end)).reduce((s, l) => s + num(l.rate), 0);
      return {
        viewBy: f.viewBy, selectedName, dispatcher, grossTotal, loadCount, totalMiles, avgPerMile, pay, companyGrossTotal,
        loads: matchingLoads.sort((a, b) => (b.loadNumber || 0) - (a.loadNumber || 0)),
        start: f.start, end: f.end,
      };
    }

    if (f.viewBy === "driverPay") {
      // One row per paid driver statement whose pay period overlaps the range.
      // "Trips" = gross revenue of the trips that statement paid out (same number
      // the Trips tab shows as Gross); older statements without trip links fall
      // back to the rates of the loads they paid.
      let recs = (history || []).filter((h) => !h.voided && h.periodStart && h.periodEnd && overlaps(h.periodStart, h.periodEnd, f.start, f.end));
      if (f.drivers && f.drivers.length) recs = recs.filter((h) => f.drivers.includes(h.driverName));
      const tripById = {};
      trips.forEach((t) => { tripById[t.id] = t; });
      const loadById = {};
      loads.forEach((l) => { loadById[l.id] = l; });
      const items = recs.map((h) => {
        let tripsGross = 0;
        if (h.tripIds && h.tripIds.length) {
          h.tripIds.forEach((id) => {
            const t = tripById[id];
            if (t && t.truck && t.startDate) tripsGross += computeTripMilesGross(t.truck, t.startDate, t.endDate || t.startDate).gross;
          });
        } else {
          (h.loadIds || []).forEach((id) => { const l = loadById[id]; if (l) tripsGross += num(l.rate); });
        }
        return { id: h.id, driver: h.driverName, stubNumber: h.stubNumber, periodStart: h.periodStart, periodEnd: h.periodEnd, tripsGross, netPay: num(h.netPay) };
      }).sort((a, b) => (b.periodEnd || "").localeCompare(a.periodEnd || ""));
      const totalTrips = items.reduce((s2, it) => s2 + it.tripsGross, 0);
      const totalNet = items.reduce((s2, it) => s2 + it.netPay, 0);
      return { viewBy: f.viewBy, items, totalTrips, totalNet, start: f.start, end: f.end };
    }

    if (f.viewBy === "cancellations") {
      let scopedTrips = trips.filter((t) => overlaps(t.startDate, t.endDate, f.start, f.end) && (t.cancellationsList || []).length > 0);
      if (f.drivers && f.drivers.length) scopedTrips = scopedTrips.filter((t) => f.drivers.includes(t.driver1));
      if (f.truck && f.truck !== "ALL") scopedTrips = scopedTrips.filter((t) => t.truck === f.truck);
      const groups = {};
      const items = [];
      scopedTrips.forEach((t) => {
        (t.cancellationsList || []).forEach((item) => {
          const amt = num(item.amount);
          if (amt <= 0) return;
          const key = t.driver1 || "—";
          groups[key] = groups[key] || { total: 0, count: 0 };
          groups[key].total += amt;
          groups[key].count += 1;
          items.push({ driver: key, truck: t.truck, tripNumber: t.tripNumber, note: item.note || "Cancellation", amount: amt, date: t.startDate });
        });
      });
      const rows = Object.entries(groups).map(([key, g]) => ({ key, total: g.total, count: g.count })).sort((a, b) => b.total - a.total);
      const grandTotal = rows.reduce((s, r) => s + r.total, 0);
      const totalCount = rows.reduce((s, r) => s + r.count, 0);
      items.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      return { viewBy: f.viewBy, rows, items, grandTotal, totalCount, start: f.start, end: f.end };
    }

    if (f.viewBy === "expenses") {
      let scopedTrips = trips.filter((t) => overlaps(t.startDate, t.endDate, f.start, f.end));
      if (f.drivers && f.drivers.length) scopedTrips = scopedTrips.filter((t) => f.drivers.includes(t.driver1));
      if (f.truck && f.truck !== "ALL") scopedTrips = scopedTrips.filter((t) => t.truck === f.truck);
      const expenseTotals = { advances: 0, fuelCost: 0, orPermit: 0, logbook: 0, insurance: 0, otherCharges: 0, truckPay: 0, refunds: 0 };
      scopedTrips.forEach((t) => {
        Object.keys(expenseTotals).forEach((k) => { expenseTotals[k] += num(t[k]); });
      });
      const expenseGrandTotal = Object.keys(expenseTotals).filter((k) => k !== "refunds").reduce((s, k) => s + expenseTotals[k], 0);
      return { viewBy: f.viewBy, expenseTotals, expenseGrandTotal, tripCount: scopedTrips.length, start: f.start, end: f.end };
    }

    if (f.viewBy === "profit") {
      // Company profit view, grouped by driver. Percent/flat/salary drivers contribute
      // their dispatch fee; per-mile/hourly drivers AND 0%-rate percent drivers (e.g. the
      // owner driving their own truck) contribute actual company profit instead
      // (Gross − Driver Pay − Company Expenses − Refunds), since they aren't charged a fee.
      const groups = {};
      scoped.forEach((l) => {
        const key = l.driver || "—";
        const driver = driverByName[l.driver];
        groups[key] = groups[key] || { loads: 0, gross: 0, driverPayTotal: 0, isProfitOnly: isProfitOnlyDriver(driver) };
        groups[key].loads += 1;
        groups[key].gross += num(l.rate);
        if (groups[key].isProfitOnly) groups[key].driverPayTotal += computeLoadPay(driver, l);
      });
      const rows = Object.entries(groups).map(([key, g]) => {
        let dispatchFee;
        if (g.isProfitOnly) {
          const driverTrips = trips.filter((t) => t.driver1 === key && overlaps(t.startDate, t.endDate, f.start, f.end));
          const companyExpenses = DRIVER_DEDUCTION_FIELDS.reduce((s, fld) => s + driverTrips.reduce((ss, t) => ss + num(t[fld.key]), 0), 0);
          const refunds = driverTrips.reduce((s, t) => s + num(t.refunds), 0);
          dispatchFee = g.gross - g.driverPayTotal - companyExpenses - refunds;
        } else {
          const driver = driverByName[key];
          dispatchFee = g.gross * (dispatchFeePercentFor(driver) / 100);
        }
        return { key, loads: g.loads, gross: g.gross, dispatchFee };
      }).sort((a, b) => b.dispatchFee - a.dispatchFee);
      const totals = rows.reduce((t, r) => ({ loads: t.loads + r.loads, gross: t.gross + r.gross, dispatchFee: t.dispatchFee + r.dispatchFee }), { loads: 0, gross: 0, dispatchFee: 0 });
      return { viewBy: f.viewBy, rows, totals, start: f.start, end: f.end };
    }

    const groupKey = f.viewBy === "truck" ? "truck" : f.viewBy === "billto" ? "billTo" : "driver";
    const groups = {};
    scoped.forEach((l) => {
      const key = l[groupKey] || "—";
      groups[key] = groups[key] || { loads: 0, gross: 0, miles: 0, emptyMiles: 0 };
      groups[key].loads += 1;
      groups[key].gross += num(l.rate);
      groups[key].miles += num(l.loadedMiles);
      groups[key].emptyMiles += num(l.deadheadMiles);
    });
    const rows = Object.entries(groups).map(([key, g]) => ({
      key, loads: g.loads, gross: g.gross, miles: g.miles, emptyMiles: g.emptyMiles,
      revPerMile: g.miles > 0 ? g.gross / g.miles : 0,
    })).sort((a, b) => b.gross - a.gross);
    const totals = rows.reduce((t, r) => ({
      loads: t.loads + r.loads, gross: t.gross + r.gross, miles: t.miles + r.miles, emptyMiles: t.emptyMiles + r.emptyMiles,
    }), { loads: 0, gross: 0, miles: 0, emptyMiles: 0 });
    totals.revPerMile = totals.miles > 0 ? totals.gross / totals.miles : 0;
    return { viewBy: f.viewBy, rows, totals, start: f.start, end: f.end };
  }, [loads, drivers, trips, history, dashApplied, dashStart, dashEnd, dashViewBy, dashDriverFilter, dashTruckFilter, dashBillToFilter, dashDispatcherFilter, dashMilesGroupBy, dispatcherByName, settings]);

  const stub = useMemo(() => { if (!stubDriver) return null; return computeDriverPay(stubDriver, stubStart, stubEnd); }, [loads, drivers, trips, stubDriver, stubStart, stubEnd]);

  async function saveAndPrintStub() {
    if (!stub || !stubDriver) return;
    const loadSnapshots = stub.loadPays.map((l) => ({ loadId: l.id, loadNumber: l.loadNumber, billTo: l.billTo, route: routeFull(l), miles: num(l.loadedMiles), driverPay: l.driverPay, shipperCity: l.shipperCity, shipperState: l.shipperState, shipperName: l.shipperName, pickupDate: l.pickupDate, stops: l.stops || [] }));
    const record = {
      id: uid(), stubNumber: nextStubNumber, driverName: stubDriver, displayedAs: resolveDisplayName(stub.driver, stubDisplayAs),
      generatedAt: new Date().toISOString(), periodStart: stubStart, periodEnd: stubEnd,
      loadIds: stub.loadPays.map((l) => l.id), loadSnapshots, tripIds: stub.tripIds || [],
      grossPay: stub.grossPay, isMileage: stub.isMileage, loadedMilesPay: stub.loadedMilesPay, emptyMilesPay: stub.emptyMilesPay,
      dispatchFeePercent: stub.dispatchFeePercent, dispatchFee: stub.dispatchFee,
      expenseBreakdown: stub.expenseBreakdown, expenseTotal: stub.expenseTotal, otherChargeItems: stub.otherChargeItems || [],
      insuranceMonths: stub.insuranceMonths || [], logbookMonths: stub.logbookMonths || [],
      orPermitNotes: stub.orPermitNotes || [], truckPayNotes: stub.truckPayNotes || [], refundsNotes: stub.refundsNotes || [],
      refunds: stub.refunds, cancellations: stub.cancellations || 0, cancellationItems: stub.cancellationItems || [], netPay: stub.netPay, trucksUsed: stub.trucksUsed, loadCount: stub.loadPays.length,
      voided: false,
    };
    const updatedHistory = [...history, record];
    const includedIds = new Set(record.loadIds);
    const includedTripIds = new Set(record.tripIds);
    const updatedLoads = loads.map((l) => (includedIds.has(l.id) ? { ...l, paidStatus: "paid", paidStubId: record.id } : l));
    const updatedTrips = trips.map((t) => (includedTripIds.has(t.id) ? { ...t, paidStatus: "paid", paidStubId: record.id } : t));
    await persist("payStubHistory", updatedHistory, setHistory);
    await persist("loads", updatedLoads, setLoads);
    await persist("tripExpenses", updatedTrips, setTrips);
    const loadNumbersStr = loadSnapshots.map((l) => l.loadNumber).filter(Boolean).join(", ");
    logActivity("driver_paid", `Paid ${stubDriver} for ${fmtDate(stubStart)} – ${fmtDate(stubEnd)}${loadNumbersStr ? ` — Loads: ${loadNumbersStr}` : ""}`);
    generatePdf(driverPayFilename(record, trips));
  }
  async function voidPayStub(stubRecord) {
    const updatedLoads = loads.map((l) => (stubRecord.loadIds && stubRecord.loadIds.includes(l.id) ? { ...l, paidStatus: "unpaid", paidStubId: null } : l));
    const updatedTrips = trips.map((t) => (stubRecord.tripIds && stubRecord.tripIds.includes(t.id) ? { ...t, paidStatus: "unpaid", paidStubId: null } : t));
    const updatedHistory = history.map((h) => (h.id === stubRecord.id ? { ...h, voided: true } : h));
    await persist("loads", updatedLoads, setLoads);
    await persist("tripExpenses", updatedTrips, setTrips);
    await persist("payStubHistory", updatedHistory, setHistory);
    setViewingStubRecord(null);
  }

  const fleetSearchLower = norm(fleetSearch);
  const filteredBillTos = billTos.filter((b) => !fleetSearchLower || norm(b.name).includes(fleetSearchLower));
  const filteredShippers = shippers.filter((s) => !fleetSearchLower || norm(s.companyName).includes(fleetSearchLower) || norm(s.warehouseCode).includes(fleetSearchLower));
  const filteredReceivers = receivers.filter((r) => !fleetSearchLower || norm(r.companyName).includes(fleetSearchLower) || norm(r.warehouseCode).includes(fleetSearchLower));
  const filteredDispatchers = dispatchers.filter((d) => !fleetSearchLower || norm(d.name).includes(fleetSearchLower));
  const filteredTrucks = trucks.filter((t) => !fleetSearchLower || norm(t.number).includes(fleetSearchLower) || norm(t.assignedDriver).includes(fleetSearchLower));
  const filteredDrivers = drivers.filter((d) => !fleetSearchLower || norm(d.name).includes(fleetSearchLower) || norm(d.companyName).includes(fleetSearchLower));

  if (!loaded) {
    return (
      <div style={{ background: "#14181F", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, boxSizing: "border-box" }}>
        {loadFailed ? (
          <div style={{ color: "#C9CED6", fontFamily: "Inter, sans-serif", textAlign: "center", maxWidth: 320, lineHeight: 1.5 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Couldn't load your data</div>
            <div style={{ fontSize: 13, color: "#8A93A3", marginBottom: 16 }}>Nothing was changed — your data is safe on the server. Check the connection and try again.</div>
            <button type="button" onClick={startUp} style={{ background: "#F2A93B", color: "#1A1300", border: "none", borderRadius: 10, padding: "11px 26px", fontWeight: 700, fontSize: 14, fontFamily: "inherit", cursor: "pointer" }}>Try again</button>
          </div>
        ) : (
          <div style={{ color: "#8A93A3", fontFamily: "Inter, sans-serif" }}>Loading…</div>
        )}
      </div>
    );
  }

  return (
    <div className={`theme-${settings.theme || "dark"}`} style={{ background: "var(--bg)", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <style>{STYLES}</style>
      <input type="file" ref={fileInputRef} accept=".xlsx,.xls,.csv" style={{ display: "none" }} onChange={handleFileSelected} />

      <div className="app-shell">
        <button
          type="button"
          className={`scroll-top-btn no-print ${showScrollTop ? "visible" : ""}`}
          style={scrollTopPos ? { top: scrollTopPos.top, left: scrollTopPos.left } : { display: "none" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          tabIndex={showScrollTop ? 0 : -1}
        >
          <ChevronUp size={18} />
        </button>
        <div className="header no-print" ref={headerRef}>
          <div className="header-row">
            <img src={WORDMARK_DATA_URI} alt="TruxFlow" className="header-wordmark-img" onClick={() => window.location.reload()} style={{ cursor: "pointer" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                type="button"
                className={`text-scale-btn ${textScale === "large" ? "scale-active" : ""}`}
                onClick={() => setTextScale((s) => (s === "normal" ? "large" : "normal"))}
                title={textScale === "large" ? "Switch to normal text size" : "Switch to larger text size"}
              >
                Aa
              </button>
              <button
                type="button"
                className={`theme-toggle-btn eta-home-btn ${tab === "eta" ? "eta-btn-active" : ""}`}
                onClick={() => setTab("eta")}
                title={etaLateCount ? `ETA Board — ${etaLateCount} late` : "ETA Board"}
                aria-label={etaLateCount ? `ETA Board, ${etaLateCount} truck${etaLateCount === 1 ? "" : "s"} late` : "ETA Board"}
              >
                <Clock size={16} color="#1A1300" />
                {etaLateCount > 0 && <span className="eta-late-badge">{etaLateCount > 9 ? "9+" : etaLateCount}</span>}
              </button>
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={() => saveSettings({ theme: (settings.theme || "dark") === "dark" ? "light" : "dark" })}
                title={(settings.theme || "dark") === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {(settings.theme || "dark") === "dark" ? <Moon size={15} /> : <Sun size={15} />}
              </button>
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={handleManualRefresh}
                title="Refresh"
                disabled={refreshing}
              >
                <RefreshCw size={15} className={refreshing ? "spinning" : ""} />
              </button>
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  className="dispatch-badge"
                  onClick={() => onSignOut && setAccountModalOpen(true)}
                  style={{ cursor: onSignOut ? "pointer" : "default", border: "none" }}
                >
                  <User size={16} />
                  {unreadSupportCount > 0 && <span className="unread-dot" />}
                </button>
                {accountModalOpen && onSignOut && (
                  <AccountSidebar
                    userEmail={userEmail} onSignOut={onSignOut} onClose={() => { setAccountModalOpen(false); checkUnreadSupport(); }}
                    settings={settings} saveSettings={saveSettings} saveStartingNumber={saveStartingNumber} nextLoadNumber={nextLoadNumber} askConfirm={askConfirm}
                    unreadSupportCount={unreadSupportCount} logActivity={logActivity}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="subtitle-row">
            <div className="subtitle">{trucks.length} trucks · {drivers.length} drivers · {loads.filter((l) => l.status === "active").length} active loads</div>
            <div className="subtitle header-clock">{headerClock}</div>
          </div>
          <div id="eta-header-slot" className="eta-header-slot" />
        </div>

        {(saveState === "saving" || saveState === "saved") && <div className="save-indicator no-print">{saveState === "saving" ? "saving…" : "saved"}</div>}
        {saveState === "error" && (
          <div className="save-error-banner no-print">
            <div className="save-error-banner-text">
              <strong>This change wasn't saved.</strong> Check your connection and try again — closing the app now could lose it.
              {saveError && <div className="save-error-detail">{saveError}</div>}
            </div>
            <button type="button" className="save-error-dismiss" onClick={() => { setSaveState("idle"); setSaveError(""); }}><X size={16} /></button>
          </div>
        )}

        {refreshedFlash && (
          // Centered on the app column (not the screen), same as the back-to-top
          // button — the header is already on screen by the time this appears.
          <div
            className="refreshed-flash no-print"
            style={headerRef.current ? (() => { const hb = headerRef.current.getBoundingClientRect(); return { left: Math.round(hb.left + hb.width / 2) }; })() : undefined}
          >
            ✓ Refreshed
          </div>
        )}

        <div
          className={`content ${textScale === "large" ? "text-large" : ""}`}
          ref={contentRef}
        >
          {tab === "eta" && (
            <EtaBoardPage {...{ trucks, drivers, loads, shippers, receivers, etaBoard, saveEtaEntry, saveEtaRoutes, patchEtaEntries, reloadEtaBoard, timezone: settings.timezone, routeKey: settings.routingApiKey || "", askConfirm, closeLoad }} />
          )}
          {tab === "loads" && (
            <LoadsTab {...{
              showLoadForm, openNewLoad, saveLoad, editingLoadId, loadForm, setLoadForm, nextLoadNumber,
              billTos, activeBillTos, shippers, receivers, applyShipper, applyReceiverToStop, truckNumbers, activeTruckNumbers, driverNames, activeDriverNames, dispatchers,
              addStop, removeStop, updateStop, moveStop,
              calcMiles, milesStatus, setShowLoadForm, setEditingLoadId,
              filterStatus, setFilterStatus, filterTruck, setFilterTruck, loadSearch, setLoadSearch,
              filteredLoads, expandedLoadId, setExpandedLoadId, editLoad, closeLoad, reopenLoad, deleteLoad, duplicateLoad, loadsQuickStats,
              companyInfo: settings, closeAllActiveLoads, askConfirm, tripLoadsFilter, setTripLoadsFilter, allLoads: loads, trucks, setTab, setFleetView, etaBoard,
            }} />
          )}

          {tab === "expenses" && expensesView === "list" && (
            <ExpensesList {...{ trips, computeTripProfit, computeTripFinancials, openTrip, openNewTrip, openNewPendingTrip, tripsMonth, setTripsMonth, tripsYear, setTripsYear, settings, truckNumbers, loads }} />
          )}
          {tab === "expenses" && expensesView === "detail" && (
            <ExpenseDetail {...{
              tripForm, setTripForm, activeTripId, truckNumbers, activeTruckNumbers, driverNames, activeDriverNames,
              computeTripMilesGross, computeTripProfit, saveTrip, deleteTrip, closeTripDetail,
              driverByName, askConfirm, nextTripNumber, nextTripNumberFor, settings, setTab, setTripLoadsFilter, trips, trucks,
              setDashSubTab, setStubTypeTab, setStubDriver, setViewingStubRecord, history,
            }} />
          )}

          {tab === "stats" && (
            <StatsTab {...{ loads, trips, computeTripProfit, computeTripFinancials, settings }} />
          )}

          {tab === "dashboard" && settings.pinCode && !dashUnlocked && (
            <div className="pin-lock-screen">
              <div className="pin-lock-icon">🔒</div>
              <div className="section-label" style={{ marginTop: 14, textAlign: "center" }}>Enter PIN</div>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pinEntry}
                onChange={(e) => { setPinEntry(e.target.value.replace(/\D/g, "").slice(0, 4)); setPinError(""); }}
                className="pin-input"
                placeholder="••••"
                autoFocus
              />
              {pinError && <div style={{ color: "var(--red)", fontSize: 12, marginTop: 8, textAlign: "center" }}>{pinError}</div>}
              <button
                className="btn"
                style={{ marginTop: 16 }}
                onClick={() => {
                  if (pinEntry === settings.pinCode) { setDashUnlocked(true); setPinEntry(""); setPinError(""); }
                  else { setPinError("Incorrect PIN"); setPinEntry(""); }
                }}
              >
                Unlock
              </button>
            </div>
          )}

          {tab === "dashboard" && (!settings.pinCode || dashUnlocked) && (
            <div>
              <div className="primary-tab-row">
                <button type="button" className={`loads-pill-btn ${dashSubTab === "reports" ? "tab-active" : ""}`} style={{ flex: 1, minWidth: 0 }} onClick={() => setDashSubTab("reports")}>
                  <span className="loads-pill-circle"><BarChart3 size={18} color="#1A1300" /></span>
                  <span className="loads-pill-text">Reports</span>
                </button>
                <button type="button" className={`loads-pill-btn ${dashSubTab === "stub" ? "tab-active" : ""}`} style={{ flex: 1, minWidth: 0 }} onClick={() => setDashSubTab("stub")}>
                  <span className="loads-pill-text">Stub</span>
                  <span className="loads-pill-circle"><FileText size={18} color="#1A1300" /></span>
                </button>
              </div>
              {dashSubTab === "reports" && (
                <DashboardTab {...{
                  dashPeriod, onDashPeriodChange, dashStart, setDashStart, dashEnd, setDashEnd,
                  dashViewBy, setDashViewBy, dashDriverFilter, setDashDriverFilter,
                  dashTruckFilter, setDashTruckFilter, dashBillToFilter, setDashBillToFilter,
                  dashDispatcherFilter, setDashDispatcherFilter, dispatchers,
                  dashMilesGroupBy, setDashMilesGroupBy,
                  runDashUpdate, changeDashReport, dashReport, driverNames, truckNumbers, billTos,
                  companyInfo: settings,
                  setTab, setTripLoadsFilter,
                }} />
              )}
              {dashSubTab === "stub" && (
                <div>
                  <div className="loads-status-row">
                    <button type="button" className={`loads-status-seg ${stubTypeTab === "driver" ? "active" : ""}`} onClick={() => setStubTypeTab("driver")}>
                      <User size={14} color={stubTypeTab === "driver" ? "#1A1300" : "var(--text-dim)"} /> Driver
                    </button>
                    <button type="button" className={`loads-status-seg ${stubTypeTab === "dispatcher" ? "active" : ""}`} onClick={() => setStubTypeTab("dispatcher")}>
                      <Users size={14} color={stubTypeTab === "dispatcher" ? "#1A1300" : "var(--text-dim)"} /> Dispatcher
                    </button>
                  </div>
                  {stubTypeTab === "driver" && (
                    <PayStubTab {...{
                      stubDriver, setStubDriver, driverByName, driverNames, setStubDisplayAs, stubDisplayAs,
                      stubStart, setStubStart, stubEnd, setStubEnd, stub, resolveDisplayName, saveAndPrintStub,
                      viewingStubRecord, setViewingStubRecord, voidPayStub, askConfirm,
                      companyInfo: settings, loads, history, trips,
                    }} />
                  )}
                  {stubTypeTab === "dispatcher" && (
                    <DispatcherStubTab {...{
                      dispatchers, loads, dispatcherStubHistory, computeDispatcherStub,
                      saveAndPrintDispatcherStub, voidDispatcherStub, askConfirm, companyInfo: settings,
                    }} />
                  )}
                </div>
              )}
            </div>
          )}

          {tab === "fleet" && fleetView === "menu" && (
            <FleetMenu {...{ setFleetView, trucks, drivers, billTos, shippers, receivers, dispatchers }} />
          )}
          {tab === "fleet" && fleetView === "trucks" && (
            <TrucksPage {...{ setFleetView, truckForm, setTruckForm, saveTruck, editingTruckId, setEditingTruckId, trucks, filteredTrucks, editTruck, removeTruck, askConfirm, driverNames, fleetSearch, setFleetSearch }} />
          )}
          {tab === "fleet" && fleetView === "drivers" && (
            <DriversPage {...{
              setFleetView, driverForm, setDriverForm, saveDriver, editingDriverId, setEditingDriverId, drivers, filteredDrivers, editDriver, removeDriver,
              expandedDriverId, setExpandedDriverId, history, loads, setStubDriver, setStubStart, setStubEnd, setStubDisplayAs, setTab, askConfirm,
              saveDriverNotes, setViewingStubRecord, fleetSearch, setFleetSearch,
            }} />
          )}
          {tab === "fleet" && fleetView === "billto" && (
            <BillToPage {...{ setFleetView, billToForm, setBillToForm, saveBillTo, editingBillToId, setEditingBillToId, filteredBillTos, editBillTo, removeBillTo, fleetSearch, setFleetSearch, startImport, askConfirm }} />
          )}
          {tab === "fleet" && fleetView === "shippers" && (
            <ShippersPage {...{ setFleetView, shipperForm, setShipperForm, saveShipper, editingShipperId, setEditingShipperId, filteredShippers, editShipper, removeShipper, removeShippers, removeAllShippers, fleetSearch, setFleetSearch, startImport, askConfirm, addReceiverFromShipper }} />
          )}
          {tab === "fleet" && fleetView === "receivers" && (
            <ReceiversPage {...{ setFleetView, receiverForm, setReceiverForm, saveReceiver, editingReceiverId, setEditingReceiverId, filteredReceivers, editReceiver, removeReceiver, removeReceivers, removeAllReceivers, fleetSearch, setFleetSearch, startImport, askConfirm, addShipperFromReceiver }} />
          )}
          {tab === "fleet" && fleetView === "dispatchers" && (
            <DispatchersPage {...{ setFleetView, dispatcherForm, setDispatcherForm, saveDispatcher, editingDispatcherId, setEditingDispatcherId, filteredDispatchers, editDispatcher, removeDispatcher, fleetSearch, setFleetSearch, askConfirm, settings }} />
          )}
          {tab === "fleet" && fleetView === "ifta" && (
            <IftaCalculatorPage {...{
              setFleetView, truckNumbers, iftaReports, iftaRates, saveIftaRates, saveIftaReport, deleteIftaReport,
              askConfirm, companyInfo: settings, favoriteJurisdictions, toggleFavoriteJurisdiction,
              fuelReports, saveFuelReport, deleteFuelReport,
            }} />
          )}
          {tab === "fleet" && fleetView === "oregon" && (
            <OregonPermitPage {...{ setFleetView, loads, trips, truckNumbers, companyInfo: settings, saveSettings, askConfirm }} />
          )}
          {tab === "fleet" && fleetView === "annualTax" && (
            <AnnualTaxPage {...{ setFleetView, annualTaxYear, setAnnualTaxYear, annualTaxReport, annualTaxTotalsByYear, companyInfo: settings, dashUnlocked, setDashUnlocked }} />
          )}
          {tab === "fleet" && fleetView === "accounting" && (
            <AccountingPage {...{
              setFleetView, loads, billTos, markLoadInvoiced, markLoadPaid, revertInvoiceStage,
              askConfirm, companyInfo: settings, setTab, editLoad, deleteLoad, reopenLoad, truckNumbers,
            }} />
          )}
          <div style={{ height: 40 }} aria-hidden="true" />
        </div>

        {confirmModal && (
          <div className="modal-overlay" onClick={() => setConfirmModal(null)}>
            <div className="modal-sheet" style={{ maxHeight: "none" }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-title">{confirmModal.title || "Confirm Delete"}</div>
              <div style={{ fontSize: 13.5, color: "var(--text-dim)", margin: "10px 0 20px", lineHeight: 1.5 }}>{confirmModal.message}</div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn secondary" style={{ marginTop: 0, flex: 1 }} onClick={() => setConfirmModal(null)}>Cancel</button>
                <button className={confirmModal.dangerous === false ? "btn" : "btn danger"} style={{ marginTop: 0, flex: 1 }} onClick={() => { const fn = confirmModal.onConfirm; setConfirmModal(null); fn(); }}>{confirmModal.confirmLabel || "Delete"}</button>
              </div>
            </div>
          </div>
        )}

        {importTarget && (
          <ImportModal {...{
            importTarget, importHeaders, importRows, importMapping, setImportMapping,
            importUpdateDupes, setImportUpdateDupes, importResult, commitImport,
            onClose: () => { setImportTarget(null); setImportRows([]); setImportResult(null); },
            onPickFile: () => fileInputRef.current && fileInputRef.current.click(),
          }} />
        )}

        <div className="tabbar no-print">
          <img src={WORDMARK_DATA_URI} alt="TruxFlow" className="sidebar-wordmark" onClick={() => window.location.reload()} style={{ cursor: "pointer" }} />
          <button className={`tab-btn ${tab === "loads" ? "active" : ""}`} onClick={() => setTab("loads")}><Package size={20} /> Loads</button>
          <button className={`tab-btn ${tab === "expenses" ? "active" : ""}`} onClick={() => setTab("expenses")}><DollarSign size={20} /> Trips</button>
          <button className={`tab-btn ${tab === "stats" ? "active" : ""}`} onClick={() => setTab("stats")}><TrendingUp size={20} /> Stats</button>
          <button className={`tab-btn ${tab === "dashboard" ? "active" : ""}`} onClick={() => setTab("dashboard")}><BarChart3 size={20} /> Dash</button>
          <button className={`tab-btn ${tab === "fleet" ? "active" : ""}`} onClick={() => { if (tab === "fleet") setFleetView("menu"); setTab("fleet"); }}><Truck size={20} /> Fleet</button>
        </div>
      </div>
    </div>
  );
}

const STYLES = `
  ${FONT_IMPORT}
  :root {
    --bg: #14181F; --surface: #1D2430; --surface-2: #262F3D;
    --accent: #F2A93B; --accent-2: #FF6B35; --text: #E8E6E1; --text-dim: #8A93A3;
    --green: #5FA777; --red: #D6584F; --border: #303A4A;
  }
  .theme-light {
    --bg: #EEF0F3; --surface: #FFFFFF; --surface-2: #E4E7EC;
    --accent: #DB8A2E; --accent-2: #E85A2A; --text: #1A2230; --text-dim: #6B7280;
    --green: #2F8F5C; --red: #C0392B; --border: #D7DBE1;
  }
  .theme-light .col-gross { color: #A85F14; }
  .theme-light .btn.danger { background: #FBE4E1; color: #B23A2E; }
  .theme-light .status-pill.active { background: #FCEBD3; color: #A8650F; }
  .theme-light .status-pill.completed { background: #DCF0E4; color: #1F7A4C; }
  .theme-light .row-line, .theme-light .list-row, .theme-light .history-item, .theme-light .trip-compact-row, .theme-light .trip-card, .theme-light .trip-card-top { border-color: #E4E7EC; }
  .theme-light .trip-card { border-left-color: var(--accent); }
  .theme-light .trip-compact-row:active { background: #E9EBEF; }
  .theme-light .refund-box { background: #E3F5EA; }
  .theme-light .paid-pill.paid { background: #DCF0E4; color: #1F7A4C; }
  .theme-light .paid-pill.unpaid { background: #FCEBD3; color: #A8650F; }
  * { box-sizing: border-box; }
  :root { color-scheme: dark; }
  .theme-light { color-scheme: light; }
  .app-shell { max-width: 460px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column; position: relative; color: var(--text); }
  .header { padding: calc(12px + env(safe-area-inset-top)) 18px 10px; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 50; background: var(--bg); }
  .eta-home-btn { position: relative; background: linear-gradient(180deg, #F7B24D, var(--accent)) !important; border-color: var(--accent) !important; color: #1A1300 !important; box-shadow: 0 2px 8px rgba(242,169,59,0.45); }
  .eta-btn-active { box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--accent) !important; }
  .eta-late-badge { position: absolute; top: -4px; right: -4px; min-width: 17px; height: 17px; padding: 0 4px; border-radius: 999px; background: #E53935; color: #fff; font-size: 10px; font-weight: 800; line-height: 17px; text-align: center; border: 2px solid var(--bg); box-sizing: content-box; }
  /* The ETA title, List/Map and status chips live inside the frozen app
     header (via a portal), so they stay still as one piece with it. */
  .eta-header-slot:empty { display: none; }
  .eta-header-slot { padding-top: 12px; }
  .eta-header-slot .eta-head { margin-top: 0; }
  .eta-header-slot .eta-tz-note { padding-bottom: 0; margin-bottom: 0; }
  .eta-head { display: flex; align-items: center; gap: 12px; margin-top: 4px; }
  .eta-head-line { flex: 1; height: 1px; background: var(--border); }
  .eta-view-toggle { display: flex; background: var(--surface-2); border-radius: 999px; padding: 3px; flex: none; }
  .eta-view-toggle button { border: none; background: transparent; color: var(--text-dim); font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; padding: 7px 24px; border-radius: 999px; cursor: pointer; }
  .eta-view-toggle button.active { background: var(--accent); color: #1A1300; }
  .eta-filter-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; padding: 2px 0 4px; margin-top: 12px; }
  .eta-tz-note { font-size: 10.5px; color: var(--text-dim); font-weight: 600; text-align: right; padding-bottom: 8px; margin-bottom: 4px; }
  .eta-filter-chip { min-width: 0; justify-content: center; height: 36px; display: inline-flex; align-items: center; gap: 6px; padding: 0 6px; font-size: 15px !important; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); font-size: 12px; font-weight: 700; cursor: pointer; white-space: nowrap; }
  .eta-filter-chip.active { border-color: var(--eta-c, var(--accent)); box-shadow: inset 0 0 0 1px var(--eta-c, var(--accent)); }
    .eta-card { display: block; width: 100%; text-align: left; background: var(--surface); border: 1px solid var(--border); border-left: 4px solid var(--border); border-radius: 12px; padding: 12px 14px; margin-bottom: 10px; color: var(--text); cursor: pointer; font: inherit; }
  .eta-card-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .eta-title { display: flex; align-items: baseline; gap: 6px; min-width: 0; }
  .eta-top-right { display: flex; align-items: center; gap: 4px; flex: none; }
  .eta-sheet .date-input-clip input[type="date"], .eta-sheet .date-input-clip input[type="time"] { height: 42px; padding: 0 11px; line-height: 42px; display: block; font-size: 15px; font-weight: 600; text-align: left; -webkit-appearance: none; appearance: none; }
  .eta-sheet .date-input-clip input::-webkit-date-and-time-value { text-align: left; line-height: 42px; margin: 0; min-height: 42px; }
  .eta-sheet .date-input-clip input::-webkit-datetime-edit { padding: 0; line-height: 42px; }
  .eta-sub-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 4px; min-height: 26px; }
  .eta-phone-line { display: flex; align-items: center; gap: 6px; min-width: 0; }
  .eta-updated-mini { flex: none; font-size: 10.5px; font-weight: 500; color: var(--text-dim); white-space: nowrap; padding-right: 22px; }
  .eta-updated-mini.stale { color: var(--accent); font-weight: 600; }
  .eta-place { display: inline-flex; align-items: center; gap: 4px; min-width: 0; }
  .eta-place span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .eta-arrow { color: var(--text-dim); flex: none; }
  .eta-progress { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
  .eta-progress-track { flex: 1; height: 7px; border-radius: 999px; background: var(--surface-2); overflow: hidden; }
  .eta-progress-fill { height: 100%; border-radius: 999px; transition: width 0.6s ease; }
  .eta-progress-pct { flex: none; font-size: 12.5px; font-weight: 800; color: var(--text); min-width: 34px; text-align: right; }
  .eta-stats { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 14px; margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border); }
  .eta-stat { display: flex; align-items: center; gap: 8px; color: var(--text-dim); min-width: 0; }
  .eta-stat + .eta-stat { padding-left: 14px; border-left: 1px solid var(--border); }
  .eta-act { margin-left: auto; margin-right: 0; flex: none; display: inline-flex; align-items: center; gap: 2px; height: 21px; padding: 0 7px; border-radius: 999px; font-size: 10.5px; font-weight: 800; letter-spacing: 0.1px; cursor: pointer; white-space: nowrap; font-family: inherit; }
  .eta-act.arrived { background: rgba(59,130,246,0.12); color: #3B82F6; border: 1px solid rgba(59,130,246,0.6); }
  .eta-act.next { background: var(--accent); color: #1A1300; border: 1px solid var(--accent); }
  .eta-undo { border: none; background: none; padding: 0; color: var(--accent); font: inherit; font-weight: 700; text-decoration: underline; cursor: pointer; }
  .eta-then { font-size: 11.5px; color: var(--text-dim); font-weight: 600; margin: 3px 0 0 21px; }
  .eta-leg-hint { font-size: 11.5px; color: var(--text-dim); font-weight: 600; margin: -4px 0 12px; }
  .eta-stat-label { font-size: 10.5px; font-weight: 600; color: var(--text-dim); line-height: 1.2; }
  .eta-stat-value { font-size: 13.5px; font-weight: 700; color: var(--text); line-height: 1.25; white-space: nowrap; }
  .eta-countdown-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; display: inline-block; margin-right: 4px; }
  .eta-zip-msg { font-size: 11.5px; font-weight: 600; color: var(--text-dim); margin: -6px 0 10px; }
  .eta-zip-msg.bad { color: var(--red); }
  .eta-map-box { position: relative; height: min(62vh, 560px); min-height: 360px; border-radius: 14px; overflow: hidden; border: 1px solid var(--border); background: #EEF1F4; }
  .eta-map-msg { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; text-align: center; padding: 20px; font-size: 13px; font-weight: 600; color: #4B5563; }
  .eta-map-bl { position: absolute; left: 8px; bottom: 8px; z-index: 3; display: flex; align-items: flex-end; gap: 6px; }
  .eta-map-truck-filter { position: relative; height: 26px; }
  .eta-map-truck-filter.trail { width: 104px; }
  .eta-map-truck-filter.trail.on .eta-mtf-btn { background: #7C3AED; border-color: #7C3AED; color: #fff; }
  .eta-mtf-menu.trail-menu { width: 150px; max-height: 300px; }
  .eta-mtf-menu.trail-menu button.sel { background: #7C3AED; color: #fff; }
  .trail-pick { display: block; font-size: 11px; font-weight: 700; color: #6B7280; padding: 6px 8px 4px; font-family: Inter, sans-serif; }
  .trail-pick input { display: block; width: 100%; margin-top: 4px; font-size: 12px; padding: 4px; border: 1px solid #D1D5DB; border-radius: 6px; background: #fff; color: #111; }
  .trail-summary { position: absolute; left: 50%; transform: translateX(-50%); top: 48px; z-index: 2; background: rgba(17,24,39,0.88); color: #fff; font-size: 11.5px; font-weight: 700; padding: 6px 11px; border-radius: 999px; white-space: nowrap; max-width: calc(100% - 20px); overflow: hidden; text-overflow: ellipsis; }
  .trail-pin { font-family: Inter, sans-serif; font-size: 10.5px; font-weight: 700; padding: 3px 7px; border-radius: 999px; border: 1.5px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.3); white-space: nowrap; }
  .trail-pin.start { background: #10B981; color: #fff; }
  .trail-pin.end { background: #111827; color: #fff; }
  .trail-pin.stop { background: #F59E0B; color: #1A1300; }
  .eta-mtf-btn { width: 100%; height: 100%; display: flex; align-items: center; gap: 5px; padding: 0 9px; background: #fff; color: #111; border: 1px solid rgba(0,0,0,0.12); border-radius: 999px; box-shadow: 0 1px 4px rgba(0,0,0,0.18); cursor: pointer; font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 0.3px; }
  .eta-mtf-btn span { flex: 1; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .eta-map-truck-filter.on .eta-mtf-btn { background: #F28C28; border-color: #F28C28; color: #1A1300; }
  .eta-mtf-menu { position: absolute; left: 0; right: 0; bottom: calc(100% + 4px); max-height: 210px; overflow-y: auto; background: #fff; border: 1px solid rgba(0,0,0,0.12); border-radius: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.22); padding: 3px; -webkit-overflow-scrolling: touch; }
  .eta-mtf-menu button { display: block; width: 100%; text-align: left; border: none; background: transparent; color: #111; font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 12.5px; padding: 6px 8px; border-radius: 8px; cursor: pointer; }
  .eta-mtf-menu button.sel { background: #F28C28; color: #1A1300; font-weight: 700; }
  .eta-map-tl { position: absolute; left: 10px; top: 10px; z-index: 2; display: flex; gap: 6px; }
  .eta-map-fit { border: 1px solid rgba(0,0,0,0.12); background: #fff; color: #111; font-size: 11.5px; font-weight: 800; border-radius: 999px; padding: 6px 11px; box-shadow: 0 1px 4px rgba(0,0,0,0.15); cursor: pointer; }
  .eta-map-fit.on { background: #1F2937; color: #fff; border-color: #1F2937; }
  .eta-map-marker { min-width: 30px; height: 24px; padding: 0 7px; border-radius: 12px; color: #fff; font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 12px; display: flex; align-items: center; justify-content: center; border: 2px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.35); cursor: pointer; }
  .eta-dest-flag { display: block; overflow: visible; pointer-events: none; filter: drop-shadow(0 1px 1.5px rgba(0,0,0,0.25)); }
  .eta-map-heading.below { top: calc(100% + 1px); }
  .eta-map-heading.above { bottom: calc(100% + 1px); }
  .eta-map-heading { position: absolute; left: 50%; width: 18px; height: 18px; line-height: 0; pointer-events: none; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.35)); }
  .eta-map-pop { color: #111; font-size: 12px; line-height: 1.4; }
  .eta-map-pop-title { font-weight: 800; font-size: 13px; }
  .eta-map-pop-status { font-weight: 700; }
  .eta-map-pop-note { font-size: 10.5px; color: #6B7280; margin-top: 2px; }
  .eta-map-pop-note.gps { font-weight: 600; color: #B26A00; }
  .eta-map-pop-note.gps.live { color: #1E8E3E; }
  .eta-map-marker.live::after { content: ""; position: absolute; top: -4px; right: -4px; width: 9px; height: 9px; border-radius: 50%; background: #22C55E; border: 2px solid #fff; box-shadow: 0 0 0 0 rgba(34,197,94,0.6); animation: eta-live-pulse 2s infinite; }
  @keyframes eta-live-pulse { 0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.55); } 70% { box-shadow: 0 0 0 7px rgba(34,197,94,0); } 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); } }
  .eta-gps-mini { display: inline-flex; align-items: center; gap: 4px; color: #B26A00; font-weight: 600; }
  .eta-gps-mini.live { color: var(--green); }
  .eta-gps-dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; display: inline-block; flex: none; }
  .eta-gps-mini.live .eta-gps-dot { animation: eta-live-pulse 2s infinite; }
  .eta-live-box { border: 1px solid var(--border); border-radius: 12px; padding: 11px 12px; margin: 4px 0 14px; background: var(--bg-elev, rgba(127,127,127,0.04)); }
  .eta-live-head { display: flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
  .eta-live-text { font-size: 12px; color: var(--text-dim); line-height: 1.45; display: flex; align-items: center; flex-wrap: wrap; gap: 0 5px; }
  .eta-live-text b { color: var(--text); font-weight: 600; }
  .eta-live-text.ok { color: var(--green); font-weight: 600; }
  .eta-live-text .eta-gps-dot.on { background: #22C55E; }
  .eta-live-text .eta-gps-dot.off { background: #9CA3AF; }
  .eta-live-link { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--text); background: var(--surface, rgba(127,127,127,0.08)); border: 1px dashed var(--border); border-radius: 8px; padding: 6px 8px; margin-top: 8px; word-break: break-all; user-select: all; -webkit-user-select: all; }
  .eta-live-actions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 9px; }
  .eta-live-btn { display: inline-flex; align-items: center; gap: 5px; height: 30px; padding: 0 11px; border-radius: 15px; border: 1px solid var(--border); background: transparent; color: var(--text); font-size: 12px; font-weight: 600; text-decoration: none; cursor: pointer; font-family: inherit; }
  .eta-live-btn.primary { background: #229ED9; border-color: #229ED9; color: #fff; }
  .eta-live-btn.danger { background: var(--red); border-color: var(--red); color: #fff; }
  .eta-live-btn:disabled { opacity: 0.6; }
  .eta-live-box > .eta-live-btn.primary { margin-top: 9px; }
  .eta-live-msg { font-size: 11.5px; font-weight: 600; color: var(--green); margin-top: 7px; }
  .eta-live-msg.bad { color: var(--red); }
  .eta-pin-note.far { color: var(--red); }
  /* ---- Trip sheet ---- */
  .modal-sheet.trip-sheet { padding-top: 14px; padding-bottom: 0; }
  .trip-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 10px; }
  .trip-title { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 22px; line-height: 1.1; color: var(--text); }
  .trip-sub { font-size: 12px; font-weight: 600; color: var(--text-dim); margin-top: 2px; }
  .trip-close { flex: none; width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--border); background: var(--surface-2); color: var(--text); display: flex; align-items: center; justify-content: center; cursor: pointer; }
  .trip-status-row { display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none; margin-bottom: 12px; }
  .trip-status-row::-webkit-scrollbar { display: none; }
  .trip-status-chip { flex: 1 0 auto; display: inline-flex; align-items: center; justify-content: center; gap: 5px; height: 32px; padding: 0 10px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface-2); color: var(--text); font-size: 12px; font-weight: 800; white-space: nowrap; cursor: pointer; font-family: inherit; }
  .trip-status-chip.active { background: var(--eta-c); border-color: var(--eta-c); color: #fff; }
  .trip-mm { position: relative; height: 150px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); background: #EEF1F4; margin-bottom: 12px; }
  .trip-mm-pin { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 11px; line-height: 1; padding: 4px 7px; border-radius: 999px; color: #fff; border: 2px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.35); white-space: nowrap; }
  .trip-mm-pin.truck { background: #3B82F6; }
  .trip-mm-pin.loc { background: #6B7280; }
  .trip-mm-pin.pu { background: #374151; border-radius: 8px 8px 8px 2px; }
  .trip-mm-pin.del { background: #E53935; border-radius: 8px 8px 8px 2px; }
  .trip-mm-pin.warn { background: #fff; color: #E53935; border-color: #E53935; border-style: dashed; }
  .trip-stops { margin-bottom: 4px; }
  .trip-stop { display: flex; gap: 10px; }
  .trip-rail { flex: none; width: 14px; position: relative; display: flex; justify-content: center; }
  .trip-rail::before { content: ""; position: absolute; top: 18px; bottom: -6px; width: 2px; background: var(--border); }
  .trip-stop:last-child .trip-rail::before { display: none; }
  .trip-dot { position: relative; z-index: 1; width: 12px; height: 12px; margin-top: 4px; border-radius: 50%; background: var(--bg); border: 2.5px solid #6B7280; }
  .trip-stop.pu .trip-dot { border-color: #9CA3AF; }
  .trip-stop.del .trip-dot { border-color: #E53935; background: #E53935; }
  .trip-stop.mid .trip-dot { border-color: #F59E0B; }
  .trip-dot.plus { display: flex; align-items: center; justify-content: center; border: 1.5px dashed var(--text-dim); color: var(--text-dim); width: 14px; height: 14px; margin-top: 9px; }
  .trip-stop.add .trip-stop-body { padding-bottom: 12px; }
  .trip-add-stop { width: 100%; display: flex; align-items: center; gap: 6px; border: 1.5px dashed var(--border); background: transparent; color: var(--accent); border-radius: 10px; padding: 8px 10px; font-size: 13px; font-weight: 800; cursor: pointer; font-family: inherit; text-align: left; }
  .trip-add-stop b { white-space: nowrap; font-weight: 800; }
  .trip-add-stop span { font-size: 11px; font-weight: 600; color: var(--text-dim); margin-left: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .trip-stop-tools { display: inline-flex; gap: 2px; margin-left: 4px; margin-right: auto; }
  .trip-stop-tools button { width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid var(--border); background: var(--surface-2); color: var(--text-dim); border-radius: 7px; cursor: pointer; padding: 0; }
  .trip-stop-tools button:disabled { opacity: 0.35; cursor: default; }
  .trip-stop-tools button:last-child { color: var(--red); }
  .trip-leg-hint { font-size: 11px; font-weight: 600; color: var(--text-dim); margin: -3px 0 7px; }
  .trip-mm-pin.mid { background: #D97706; border-radius: 8px 8px 8px 2px; }
  .trip-stop.next .trip-dot { box-shadow: 0 0 0 4px rgba(242,169,59,0.35); }
  .trip-stop-body { flex: 1; min-width: 0; padding-bottom: 8px; }
  .trip-stop-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; }
  .trip-kind { font-size: 12px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase; color: var(--text-dim); }
  .trip-stop.next .trip-kind { color: var(--accent); }
  .trip-next { border: 1px solid var(--border); background: transparent; color: var(--text-dim); font-size: 11px; font-weight: 700; border-radius: 999px; padding: 3px 9px; cursor: pointer; font-family: inherit; }
  .trip-next.on { border-color: var(--accent); background: rgba(242,169,59,0.14); color: var(--accent); cursor: default; }
  .trip-stop .field-row { gap: 8px; }
  .trip-stop .field { margin-bottom: 8px; }
  .trip-stop.yard .trip-dot { border-color: #8A94A6; background: #8A94A6; }
  .trip-yard-note { font-size: 11px; font-weight: 600; color: var(--text-dim); }
  .trip-yard-picks { display: flex; flex-wrap: wrap; gap: 6px; margin: -2px 0 8px; }
  .trip-yard-picks .favorite-chip { font-family: inherit; font-size: 11.5px; color: var(--text); }
  .trip-yard-picks .favorite-chip span { color: var(--text-dim); font-weight: 500; }
  .trip-yard-modes { display: flex; gap: 6px; margin: 2px 0 6px; }
  .trip-yard-modes .trip-status-chip { height: 30px; font-size: 11.5px; }
  .trip-yard-modes .trip-status-chip:disabled { opacity: 0.4; cursor: default; }
  .trip-yard-help { font-size: 11.5px; line-height: 1.45; color: var(--text-dim); margin-bottom: 4px; }
  .eta-act + .eta-act { margin-left: 5px; }
  .eta-act.yard { background: rgba(138,148,166,0.14); color: var(--text); border: 1px solid #8A94A6; }
  .eta-parked-mini { display: inline-flex; align-items: center; gap: 4px; color: var(--text-dim); font-weight: 600; }
  .trip-when { margin-top: -2px; }
  .trip-arrived { display: flex; align-items: center; flex-wrap: wrap; gap: 4px; font-size: 12px; font-weight: 700; color: var(--green); margin: -2px 0 6px; }
  .trip-sheet .trip-notes { margin-bottom: 16px; }
  .trip-more { border: 1px solid var(--border); border-radius: 12px; margin-bottom: 10px; overflow: hidden; }
  .trip-more > summary { list-style: none; display: flex; align-items: center; gap: 7px; padding: 11px 12px; cursor: pointer; font-size: 13px; color: var(--text); }
  .trip-more > summary::-webkit-details-marker { display: none; }
  .trip-more > summary b { font-weight: 700; }
  .trip-more > summary > svg:last-child { margin-left: 0; color: var(--text-dim); transition: transform 0.15s; }
  .trip-more[open] > summary > svg:last-child { transform: rotate(180deg); }
  .trip-more-state { margin-left: auto; font-size: 11.5px; font-weight: 700; color: var(--text-dim); }
  .trip-more-state.ok { color: var(--green); }
  .trip-more-state.bad { color: var(--red); }
  .trip-more .eta-live-box { border: none; border-top: 1px solid var(--border); border-radius: 0; margin: 0; }
  .trip-more .eta-live-head { display: none; }
  .trip-footer { position: sticky; bottom: 0; z-index: 2; display: flex; align-items: center; gap: 8px; margin: 6px -18px 0; padding: 10px 18px calc(10px + env(safe-area-inset-bottom)); background: var(--bg); border-top: 1px solid var(--border); }
  .trip-footer .btn { margin: 0; width: auto; }
  .trip-save { flex: 1.4; }
  .trip-cancel { flex: 1; }
  .trip-clear { flex: none; border: none; background: none; color: var(--text-dim); font-size: 12px; font-weight: 700; text-decoration: underline; cursor: pointer; padding: 0 4px; font-family: inherit; }
  .eta-place .eta-place-txt { display: flex; flex-direction: column; min-width: 0; line-height: 1.15; overflow: hidden; white-space: normal; }
  .eta-place .eta-place-main { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .eta-place .eta-place-sub { font-style: normal; font-size: 10.5px; font-weight: 500; color: var(--text-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 1px; }
  .eta-pin-note { display: flex; align-items: center; flex-wrap: wrap; gap: 4px 6px; font-size: 11px; font-weight: 600; color: var(--text-dim); margin: -6px 0 10px; }
  .eta-pin-note.exact { color: var(--green); }
  .eta-countdown.risk { color: #D97706; background: rgba(245,158,11,0.16); }
  /* No icons in the ETA row, so ETA, GPS ETA, detention and the status capsule fit on one line */
  .eta-stats { gap: 8px 10px; }
  .eta-stat { gap: 0; }
  .eta-stat > svg { display: none; }
  .eta-stat + .eta-stat { padding-left: 10px; }
  @media (max-width: 400px) { .eta-stat-value { font-size: 13px; } }
  .eta-stat.detention, .eta-stat.detention .eta-stat-label, .eta-stat.detention .eta-stat-value { color: var(--red); }
  .eta-gps-mini.lost { color: var(--red); }
  .eta-map-pop-btn { margin-top: 8px; width: 100%; border: none; border-radius: 8px; background: #F28C28; color: #1A1300; font-weight: 800; padding: 7px; cursor: pointer; }
  .eta-map-foot { font-size: 11px; color: var(--text-dim); margin: 8px 2px 10px; line-height: 1.45; }
  .eta-not-on-map { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 11.5px; color: var(--text-dim); font-weight: 600; margin-bottom: 14px; }
  .eta-truck { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 16px; letter-spacing: 0.4px; line-height: 1.25; }
  .eta-driver { font-size: 12.5px; color: var(--text-dim); font-weight: 600; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
  .eta-phone { display: inline-flex; align-items: center; gap: 4px; font-size: 12.5px; font-weight: 700; color: var(--text); white-space: nowrap; }
  .eta-copy-btn { display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; margin-left: 2px; border-radius: 50%; border: 1px solid var(--border); background: var(--surface-2); color: var(--accent); cursor: pointer; padding: 0; }
  .eta-copy-btn.copied { color: var(--green); border-color: var(--green); }
  .eta-copied-text { font-size: 11px; font-weight: 700; color: var(--green); }
  .eta-type-toggle { display: flex; background: var(--surface-2); border-radius: 999px; padding: 3px; margin: 2px 0 12px; }
  .eta-type-btn { flex: 1; border: none; background: transparent; color: var(--text-dim); font-weight: 800; font-size: 13px; padding: 9px 8px; border-radius: 999px; cursor: pointer; }
  .eta-type-btn.active { background: var(--accent); color: #1A1300; }
  .eta-status-pill { flex: none; margin-top: 1px; display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 800; letter-spacing: 0.4px; text-transform: uppercase; color: #fff; background: var(--surface-2); border-radius: 999px; padding: 4px 10px; }
  .eta-status-pill:not([style]) { color: var(--text-dim); border: 1px dashed var(--border); background: transparent; }
  .eta-route { display: flex; align-items: center; gap: 8px; margin-top: 8px; font-size: 14px; font-weight: 700; min-width: 0; }
  .eta-countdown { margin-left: auto; flex: none; display: inline-flex; align-items: center; font-size: 11.5px; font-weight: 800; border-radius: 999px; padding: 3px 8px; white-space: nowrap; }
  .eta-countdown.ontime { color: #22B573; background: rgba(34,181,115,0.14); }
  .eta-countdown.late { color: var(--red); background: rgba(225,92,79,0.14); }
  .eta-notes { margin-top: 6px; font-size: 12.5px; color: var(--text-dim); white-space: pre-wrap; }
  .eta-status-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; }
  .eta-status-btn { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 10px 8px; border-radius: 10px; border: 1px solid var(--border); background: var(--surface-2); color: var(--text); font-weight: 800; font-size: 13px; cursor: pointer; }
  .eta-status-btn.active { background: var(--eta-c); border-color: var(--eta-c); color: #fff; }
  .fuel-unit-band { display: flex; align-items: center; justify-content: space-between; gap: 8px; background: rgba(255,140,40,0.14); border-left: 3px solid var(--accent); border-radius: 6px; padding: 7px 10px; margin-bottom: 6px; font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.6px; text-transform: uppercase; color: var(--text); }
  .fuel-unit-cards { font-size: 10.5px; letter-spacing: 0.3px; text-transform: none; color: var(--text-dim); font-weight: 600; }
  .fuel-unit-check { font-family: inherit; font-size: 10.5px; letter-spacing: 0.3px; text-transform: none; color: var(--green); font-weight: 600; }
  .fuel-unit-warn { font-family: inherit; font-size: 10.5px; letter-spacing: 0.3px; text-transform: none; color: var(--red); font-weight: 600; }
  .fuel-total-row td { font-weight: 700; border-top: 2px solid var(--border); }
  .fuel-paste-box { width: 100%; min-height: 150px; box-sizing: border-box; background: var(--surface-2); color: var(--text); border: 1px solid var(--border); border-radius: 10px; padding: 10px; font-size: 12px; font-family: ui-monospace, Menlo, monospace; resize: vertical; }
  .fuel-report-card { display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; text-align: left; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 12px 14px; margin-top: 10px; color: var(--text); cursor: pointer; }
  .dp-check { width: 18px; height: 18px; accent-color: var(--accent); cursor: pointer; margin: 0; vertical-align: middle; }
  .scroll-top-btn { position: fixed; z-index: 45; left: 50%; width: 34px; height: 34px; margin-left: -17px; border-radius: 50%; background: var(--surface-2); border: 1px solid var(--border); color: var(--text); display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; box-shadow: 0 4px 14px rgba(0,0,0,0.25); opacity: 0; transform: translateY(-6px) scale(0.85); pointer-events: none; transition: opacity 0.18s ease, transform 0.18s ease; }
  .scroll-top-btn.visible { opacity: 1; transform: none; pointer-events: auto; }
  .header-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .header-wordmark-img { height: 27px; width: auto; object-fit: contain; }
  .account-sidebar-wordmark { height: 20px; width: auto; object-fit: contain; }
  .dispatch-badge { background: var(--accent); color: #1A1300; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative; }
  .unread-dot { position: absolute; top: -1px; right: -1px; width: 11px; height: 11px; border-radius: 50%; background: var(--red); border: 2px solid var(--bg); }
  .account-sidebar-menu-item .account-sidebar-menu-item-badge { flex: none; min-width: 18px; height: 18px; padding: 0 4px; border-radius: 9px; background: var(--red); color: #fff; font-family: 'Oswald', sans-serif; font-size: 10.5px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
  .theme-toggle-btn { background: var(--surface-2); border: 1px solid var(--border); color: var(--text); width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; cursor: pointer; }
  .theme-toggle-btn:hover { border-color: var(--accent); color: var(--accent); }
  .subtitle { color: var(--text-dim); font-size: 10.5px; margin-top: 9px; }
  .subtitle-row { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; }
  .header-clock { margin-top: 9px; white-space: nowrap; flex-shrink: 0; }
  .content { flex: 1; padding: 16px 16px 90px; overflow-y: auto; max-width: 460px; margin: 0 auto; width: 100%; }
  html, body { overscroll-behavior-y: none; }
  .refreshed-flash { position: fixed; top: max(16px, calc(env(safe-area-inset-top) + 8px)); left: 50%; transform: translateX(-50%); z-index: 90; background: var(--green); color: #fff; font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 12.5px; letter-spacing: 0.3px; padding: 8px 16px; border-radius: 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.3); animation: refreshed-flash-in 0.2s ease; }
  @keyframes refreshed-flash-in { from { opacity: 0; transform: translateX(-50%) translateY(-8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
  svg.spinning { animation: pull-refresh-spin 0.7s linear infinite; }
  @keyframes pull-refresh-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .field-row { display: flex; gap: 10px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 5px; min-width: 0; }
  .field label { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-dim); font-weight: 700; }
  .field input, .field textarea {
    background: var(--surface); border: 1px solid var(--border); color: var(--text);
    padding: 10px 11px; border-radius: 8px; font-size: 14px; font-family: 'IBM Plex Mono', monospace; outline: none; width: 100%; font-weight: 600;
  }
  /* Mobile Safari's native date input renders its own internal "chrome" (the
     day/month/year segments plus calendar affordance) which doesn't always
     shrink to fit a constrained container the way regular text does — this
     is what causes it to visually spill past its own border on a phone even
     though the exact same input renders perfectly fine on desktop. */
  .field input[type="date"] {
    min-width: 0; max-width: 100%; box-sizing: border-box; font-size: 14px; padding: 10px 6px; overflow: hidden;
  }
  .field input[type="date"]::-webkit-datetime-edit { max-width: 100%; overflow: hidden; }
  .field input[type="date"]::-webkit-datetime-edit-fields-wrapper { max-width: 100%; }
  .field input[type="date"]::-webkit-calendar-picker-indicator { margin-left: 0; padding: 0; width: 14px; height: 14px; }
  .field select {
    background-color: var(--surface); border: 1px solid var(--border); color: var(--text);
    padding: 10px 34px 10px 11px; border-radius: 8px; font-size: 13.5px; font-family: 'Oswald', sans-serif; font-weight: 600; outline: none; width: 100%;
    appearance: none; -webkit-appearance: none; -moz-appearance: none; cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%238A93A3' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center;
  }
  .field select:hover { border-color: var(--accent); }
  .field input:hover, .field textarea:hover { border-color: var(--accent); }
  .field select option { font-family: 'Oswald', sans-serif; background: var(--surface); color: var(--text); }
  .field input::placeholder, .field textarea::placeholder { color: #A7AFBD; opacity: 1; }
  .theme-light .field input::placeholder, .theme-light .field textarea::placeholder { color: #9BA3AF; }
  .field input:focus, .field select:focus, .field textarea:focus { border-color: var(--accent); }
  .section-label { font-family: 'Oswald', sans-serif; font-size: 12.5px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin: 18px 0 10px; display: flex; align-items: center; gap: 8px; }
  .stats-page { padding-bottom: 8px; }
  .stats-title { margin-top: 0; margin-bottom: 12px; }
  .stats-title::after { order: 1; }
  .stats-title-right { order: 2; font-family: 'Inter', sans-serif; text-transform: none; letter-spacing: 0; font-size: 12px; font-weight: 600; color: var(--text-dim); white-space: nowrap; }
  .custom-range-popover { padding: 12px; }
  .stats-range-note { font-size: 11px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; margin-bottom: 14px; }
  .stats-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
  .stats-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 12px 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .stats-card:hover { border-color: var(--accent); }
  .stats-card-lbl { font-size: 10.5px; color: var(--text-dim); font-weight: 600; margin-bottom: 4px; }
  .stats-card-val { font-family: 'Oswald', sans-serif; font-weight: 800; font-size: 19px; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .stats-card-delta { display: flex; align-items: center; gap: 3px; font-size: 10px; font-weight: 700; font-family: 'IBM Plex Mono', monospace; margin-top: 2px; margin-bottom: 4px; }
  .stats-card-delta.up { color: var(--green); }
  .stats-card-delta.down { color: var(--red); }
  .stats-main-row { display: flex; flex-direction: column; gap: 12px; margin-bottom: 12px; }
  .stats-panel { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 16px; flex: 1; min-width: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .stats-panel:hover { border-color: var(--accent); }
  .stats-panel-chart { min-height: 0; }
  .stats-panel-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
  .stats-panel-title { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 14px; color: var(--text); }
  .stats-metric-toggle { display: flex; gap: 4px; background: var(--surface-2); border-radius: 8px; padding: 3px; }
  .stats-metric-btn { border: none; background: transparent; color: var(--text-dim); font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 10.5px; padding: 5px 9px; border-radius: 6px; cursor: pointer; }
  .stats-metric-btn.active { background: var(--accent); color: #1A1300; }
  .stats-profit-row { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-bottom: 1px solid var(--border); font-size: 12.5px; color: var(--text-dim); }
  .stats-profit-row:last-child { border-bottom: none; }
  .stats-profit-val { font-family: 'IBM Plex Mono', monospace; font-weight: 700; font-size: 13.5px; color: var(--text); }
  .stats-profit-margin { background: var(--surface-2); margin: 6px -16px -16px; padding: 12px 16px; border-radius: 0 0 14px 14px; border-bottom: none; }
  .stats-profit-margin span:first-child { font-weight: 700; color: var(--text); }
  .stats-driver-row { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border); }
  .stats-driver-row:last-child { border-bottom: none; }
  .stats-driver-avatar { width: 26px; height: 26px; border-radius: 50%; background: var(--surface-2); color: var(--accent); font-family: 'Oswald', sans-serif; font-weight: 800; font-size: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .stats-driver-name { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 13px; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .stats-driver-sub { font-size: 10.5px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; margin-top: 1px; }
  .stats-driver-gross { font-family: 'IBM Plex Mono', monospace; font-weight: 700; font-size: 13px; color: var(--text); }
  .stats-insight-row { display: flex; align-items: flex-start; gap: 10px; padding: 9px 0; border-bottom: 1px solid var(--border); }
  .stats-insight-row:last-child { border-bottom: none; }
  .stats-insight-icon { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .stats-insight-icon.up { background: rgba(76,175,109,0.15); color: var(--green); }
  .stats-insight-icon.down { background: rgba(225,92,79,0.15); color: var(--red); }
  .stats-insight-text { font-size: 12.5px; color: var(--text); line-height: 1.4; }
  .stats-panel-subtitle { font-size: 10.5px; color: var(--text-dim); font-weight: 500; text-transform: none; letter-spacing: 0; margin-left: 6px; }
  .stats-loadrow { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border); }
  .stats-loadrow:last-child { border-bottom: none; }
  .stats-loadrow-num { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 12.5px; color: var(--text); }
  .stats-loadrow-route { font-size: 11px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .stats-loadrow-rpm { font-family: 'Oswald', sans-serif; font-weight: 800; font-size: 14px; }
  .stats-loadrow-rpm.up { color: var(--green); }
  .stats-loadrow-rpm.down { color: var(--red); }
  .stats-loadrow-sub { font-size: 10.5px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; margin-top: 1px; }
  @media (min-width: 900px) {
    .stats-card-grid { grid-template-columns: repeat(6, 1fr); }
    .stats-main-row { flex-direction: row; align-items: stretch; }
    .stats-panel-chart { flex: 2; }
  }
  .section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .section-label.no-line::after { display: none; }
  .section-label-row { display: flex; align-items: center; justify-content: space-between; margin: 0 0 12px; }
  .section-label-row .section-label { margin: 0; flex: 1; }
  .btn { width: 100%; background: var(--accent); color: #1A1300; border: none; border-radius: 10px; padding: 13px; font-family: 'Oswald', sans-serif; font-size: 14.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; cursor: pointer; margin-top: 14px; }
  .btn.secondary { background: var(--surface-2); color: var(--text-dim); }
  .btn.secondary.cancel-outline { border: 1.5px solid var(--red); color: var(--red); background: transparent; }
  .btn.secondary.cancel-outline:hover, .btn.secondary.cancel-outline:active { background: var(--red); color: #2A0E0E; }
  .load-entry-form .load-number-inline { font-weight: 800; }
  .trip-detail-form .field input, .trip-detail-form .field select, .trip-detail-form .field textarea,
  .load-entry-form .field input, .load-entry-form .field select, .load-entry-form .field textarea,
  .fleet-form .field input, .fleet-form .field select, .fleet-form .field textarea,
  .trip-detail-form .dash-filter-card, .load-entry-form .dash-filter-card, .fleet-form .dash-filter-card,
  .trip-detail-form .date-input-clip, .load-entry-form .date-input-clip, .fleet-form .date-input-clip,
  .trip-detail-form .month-select-btn {
    border-color: #12161D;
  }
  .theme-light .trip-detail-form .field input, .theme-light .trip-detail-form .field select, .theme-light .trip-detail-form .field textarea,
  .theme-light .load-entry-form .field input, .theme-light .load-entry-form .field select, .theme-light .load-entry-form .field textarea,
  .theme-light .fleet-form .field input, .theme-light .fleet-form .field select, .theme-light .fleet-form .field textarea,
  .theme-light .trip-detail-form .dash-filter-card, .theme-light .load-entry-form .dash-filter-card, .theme-light .fleet-form .dash-filter-card,
  .theme-light .trip-detail-form .date-input-clip, .theme-light .load-entry-form .date-input-clip, .theme-light .fleet-form .date-input-clip,
  .theme-light .trip-detail-form .month-select-btn {
    border-color: #A8AFB9;
  }
  .trip-detail-form .date-input-clip:focus-within, .load-entry-form .date-input-clip:focus-within, .fleet-form .date-input-clip:focus-within {
    border-color: var(--accent);
  }
  .trip-detail-form .field input:hover, .trip-detail-form .field select:hover, .trip-detail-form .field textarea:hover,
  .trip-detail-form .field input:focus, .trip-detail-form .field select:focus, .trip-detail-form .field textarea:focus,
  .load-entry-form .field input:hover, .load-entry-form .field select:hover, .load-entry-form .field textarea:hover,
  .load-entry-form .field input:focus, .load-entry-form .field select:focus, .load-entry-form .field textarea:focus,
  .fleet-form .field input:hover, .fleet-form .field select:hover, .fleet-form .field textarea:hover,
  .fleet-form .field input:focus, .fleet-form .field select:focus, .fleet-form .field textarea:focus {
    border-color: var(--accent);
  }
  .btn.danger { background: #3A1F1F; color: var(--red); }
  .btn.ghost { background: transparent; border: 1px solid var(--border); color: var(--text-dim); margin-top: 0; }
  .add-trip-btn { display: flex; align-items: center; gap: 5px; background: var(--accent); color: #1A1300; border: none; border-radius: 8px; padding: 7px 11px; font-family: 'Oswald', sans-serif; font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; cursor: pointer; flex-shrink: 0; }
  .pending-trip-btn { background: transparent; border: 1.5px solid #E15C4F; color: #E15C4F; }
  .pending-number-display { color: #E15C4F; font-weight: 800; font-family: 'Oswald', sans-serif; font-size: 15px; padding: 10px 0; }
  .trip-status-toggle { position: relative; width: 46px; height: 26px; border-radius: 13px; border: none; cursor: pointer; flex-shrink: 0; transition: background 0.2s ease; padding: 0; }
  .trip-status-toggle.active { background: var(--green); }
  .trip-status-toggle.pending { background: var(--red); }
  .trip-status-toggle-knob { position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%; background: #fff; transition: left 0.2s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.3); }
  .trip-status-toggle.active .trip-status-toggle-knob { left: 23px; }
  .stop-card { background: var(--bg); border: 1px solid var(--accent); border-radius: 10px; padding: 12px; margin-bottom: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.12); }
  .stop-card.pickup-card { margin-bottom: 18px; }
  .auto-calc-btn { background: transparent; border: 2px solid var(--green); color: var(--green); font-weight: 700; }
  .stub-loads-table { width: 100%; border-collapse: collapse; margin-bottom: 4px; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .stub-loads-table th, .stub-loads-table td { border: 1px solid var(--border); padding: 9px 10px; font-size: 11.5px; text-align: left; }
  .stub-loads-table th { background: var(--surface-2); color: var(--text-dim); font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.3px; font-weight: 700; }
  .stub-loads-table td { font-family: 'IBM Plex Mono', monospace; color: var(--text); background: var(--surface); }
  .stub-sheet .stub-loads-table th, .stub-sheet .stub-loads-table td { border-color: #EDEDED; }
  .stub-sheet .stub-loads-table th { background: #FDECD2; color: #7A4A0F; }
  .stub-sheet .stub-loads-table td { background: #fff; color: #1A1F27; }
  .stub-sheet .stub-loads-table tbody tr:nth-child(even) td { background: #FAFAFA; }
  .stub-total-gross-box { display: flex; justify-content: space-between; align-items: center; padding: 12px 14px; margin-top: 8px; background: var(--surface-2); border: 1.5px solid var(--accent); border-radius: 10px; font-weight: 800; font-size: 14px; }
  .stub-total-gross-box span:last-child { font-family: 'Oswald', sans-serif; font-weight: 800; color: var(--accent); font-size: 17px; }
  .auto-calc-btn:hover { background: var(--green); color: #0E2318; }
  .stop-card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .stop-card-label { font-family: 'Oswald', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--accent); }
  .stop-card-actions { display: flex; gap: 6px; }
  .mini-icon-btn { background: var(--surface-2); border: none; color: var(--text-dim); width: 26px; height: 26px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
  .mini-icon-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .refund-box { background: #16332140; border: 1px solid var(--green); border-radius: 10px; padding: 12px; margin: 12px 0; }
  textarea.notes-color-clear { background: var(--surface); }
  textarea.notes-color-green { background: #DFF3E4 !important; color: #14251A !important; border-color: #8FCB9F !important; }
  textarea.notes-color-red { background: #FBE1DE !important; color: #2B1210 !important; border-color: #E3958C !important; }
  input.notes-color-clear { background: var(--surface); }
  input.notes-color-green { background: #DFF3E4 !important; color: #14251A !important; border-color: #8FCB9F !important; }
  input.notes-color-red { background: #FBE1DE !important; color: #2B1210 !important; border-color: #E3958C !important; }
  .field-row.date-row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 10px; }
  .field-row.date-row .field { min-width: 0; }
  .date-input-clip { overflow: hidden; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); }
  .date-input-clip input[type="date"], .date-input-clip input[type="time"] { border: none; background: transparent; }
  .date-input-clip input[type="time"] { width: 100%; min-width: 0; box-sizing: border-box; -webkit-appearance: none; appearance: none; }
  .driver2-row { display: flex; gap: 6px; }
  .driver2-row input { flex: 1; min-width: 0; }
  .color-arrow-btn { flex-shrink: 0; width: 34px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; color: var(--text-dim); font-size: 13px; cursor: pointer; }
  .color-picker-popover { position: absolute; top: calc(100% + 4px); right: 0; z-index: 30; display: flex; gap: 10px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 10px 12px; box-shadow: 0 6px 18px rgba(0,0,0,0.35); }
  .month-select-btn { display: flex; align-items: center; justify-content: space-between; width: 100%; background: var(--surface); border: 1px solid var(--border); color: var(--text); padding: 10px 11px; border-radius: 8px; font-size: 14px; font-family: 'IBM Plex Mono', monospace; font-weight: 600; cursor: pointer; }
  .month-select-btn.trips-top-field { border: 1px solid var(--accent); }
  .month-charge-popover { position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 30; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 4px; box-shadow: 0 8px 20px rgba(0,0,0,0.35); max-height: 260px; overflow-y: auto; }
  .month-charge-item { display: flex; align-items: center; justify-content: space-between; padding: 9px 10px; border-radius: 6px; cursor: pointer; font-size: 13px; font-family: 'IBM Plex Mono', monospace; font-weight: 600; color: var(--text); }
  .month-charge-item:hover { background: var(--surface-2); }
  .month-charge-item:active { background: var(--surface-2); }
  .month-charge-item.selected { background: var(--surface-2); color: var(--accent); }
  .month-charge-amt { display: flex; align-items: center; gap: 4px; color: var(--green); font-size: 11.5px; font-weight: 700; }
  .stepper-popover .month-charge-item { justify-content: flex-start; gap: 10px; }
  .stepper-popover .month-charge-name { flex-shrink: 0; width: 40px; border-right: 1px solid var(--border); padding-right: 10px; }
  .stepper-popover .month-charge-amt-wrap { flex: 1; display: flex; justify-content: flex-end; }
  .account-menu-popover { position: absolute; top: calc(100% + 6px); right: 0; z-index: 30; min-width: 200px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 12px; box-shadow: 0 6px 18px rgba(0,0,0,0.35); }
  .account-menu-email { font-size: 11.5px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; word-break: break-all; }
  .account-sidebar-overlay { position: fixed; inset: 0; background: rgba(10,12,16,0.65); z-index: 60; }
  .account-sidebar-panel { position: fixed; top: 0; right: 0; bottom: 0; width: min(360px, 88vw); background: var(--surface); box-shadow: -10px 0 30px rgba(0,0,0,0.4); z-index: 61; overflow-y: auto; display: flex; flex-direction: column; }
  .account-sidebar-header { display: flex; align-items: center; justify-content: space-between; padding: 16px; padding-top: max(16px, env(safe-area-inset-top)); border-bottom: 1px solid var(--border); flex-shrink: 0; }
  .account-sidebar-title { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 16px; text-transform: uppercase; letter-spacing: 0.3px; color: var(--text); }
  .account-sidebar-back { display: flex; align-items: center; gap: 2px; background: none; border: none; color: var(--text); font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; padding: 0; }
  .account-sidebar-menu { display: flex; flex-direction: column; flex: 1; min-height: 0; padding: 14px 12px 12px; gap: 12px; }
  .account-sidebar-signout { color: var(--text); }
  .account-sidebar-menu-item { display: flex; align-items: center; gap: 12px; width: 100%; background: var(--surface-2); border: none; border-radius: 999px; padding: 4px; min-height: 48px; color: var(--text); font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 15px; letter-spacing: 0.2px; cursor: pointer; text-align: left; box-sizing: border-box; }
  .account-sidebar-menu-item:active { opacity: 0.85; }
  .sidebar-pill-circle { flex: none; width: 40px; height: 40px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; }
  .sidebar-pill-label { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sidebar-pill-chevron { flex: none; width: 40px; height: 40px; border-radius: 50%; background: var(--border); color: var(--text); display: flex; align-items: center; justify-content: center; }
  .account-menu-email { font-size: 11.5px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; word-break: break-all; }
  .account-modal-close { background: var(--surface-2); border: 1px solid var(--border); color: var(--text-dim); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
  .account-modal-body { padding: 16px; }
  .section-view-row { padding: 12px 0; border-bottom: 1px solid var(--border); }
  .section-view-label { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-dim); font-weight: 600; margin-bottom: 4px; }
  .section-view-value { font-size: 14.5px; color: var(--text); font-weight: 600; word-break: break-word; }
  .set-edit-top { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; margin: 2px 0 6px; border-radius: 999px; height: 44px; font-family: 'Oswald', sans-serif; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; font-size: 14px; }
  .set-group-label { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--accent); margin: 18px 4px 8px; }
  .set-group { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.08); }
  .set-group.set-pad { padding: 14px; margin-bottom: 8px; }
  .set-row { display: flex; align-items: center; gap: 12px; width: 100%; padding: 11px 12px; border: none; background: transparent; color: var(--text); text-align: left; font: inherit; }
  .set-row + .set-row { border-top: 1px solid var(--border); }
  .set-row.nav { cursor: pointer; }
  .set-row.nav:active { background: var(--surface-2); }
  .set-icon { flex: none; width: 34px; height: 34px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; }
  .set-icon.lg { width: 40px; height: 40px; }
  .set-label { flex: 1; min-width: 0; font-weight: 700; font-size: 14px; display: flex; flex-direction: column; }
  .set-sub { font-size: 11px; font-weight: 500; color: var(--text-dim); margin-top: 1px; }
  .set-value { flex: none; font-weight: 800; font-size: 14px; color: var(--text); text-align: right; }
  .set-pill { flex: none; font-size: 11px; font-weight: 800; letter-spacing: 0.4px; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; background: var(--surface-2); color: var(--text-dim); }
  .set-pill.on { background: rgba(34,181,115,0.15); color: #22B573; }
  .set-pill:empty { display: none; }
  .set-chev { width: 30px; height: 30px; }
  .set-back { display: inline-flex; align-items: center; gap: 4px; border: none; background: var(--surface-2); color: var(--text); font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; border-radius: 999px; padding: 8px 14px 8px 10px; cursor: pointer; margin-bottom: 14px; }
  .set-panel-title { display: flex; align-items: center; gap: 12px; font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 18px; letter-spacing: 0.5px; margin-bottom: 14px; }
  .set-note { font-size: 12px; color: var(--text-dim); line-height: 1.55; margin: 12px 4px 14px; }
  .set-btn { display: flex; align-items: center; justify-content: center; gap: 7px; }
  .section-edit-btn { display: flex; align-items: center; justify-content: center; gap: 7px; width: 100%; margin-top: 18px; }
  .team-roster-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .team-roster-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 12px; padding: 11px 14px; }
  .team-roster-info { min-width: 0; }
  .team-roster-email { font-size: 13px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .team-roster-role { font-size: 10.5px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.3px; margin-top: 2px; }
  .team-roster-remove-btn { background: transparent; border: 1px solid var(--red); color: var(--red); font-size: 11.5px; font-weight: 600; padding: 6px 12px; border-radius: 8px; cursor: pointer; flex-shrink: 0; }
  .account-modal-invite-section { border-top: 1px solid var(--border); padding-top: 14px; }
  .invite-code-display { display: flex; align-items: center; justify-content: space-between; background: var(--surface-2); border: 1.5px dashed var(--accent); border-radius: 10px; padding: 12px 14px; font-family: 'IBM Plex Mono', monospace; font-size: 18px; font-weight: 700; letter-spacing: 2px; color: var(--accent); }
  .color-picker-backdrop { position: fixed; inset: 0; z-index: 25; background: transparent; }
  .color-dot { width: 30px; height: 30px; border-radius: 50%; border: 2px solid var(--border); cursor: pointer; padding: 0; }
  .color-dot.dot-clear { background: var(--surface-2); }
  .color-dot.dot-green { background: #4CAF6D; }
  .color-dot.dot-red { background: #E15C4F; }
  .color-dot.dot-selected { border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent); }
  .refund-box label { color: var(--green) !important; }
  .pay-summary-box { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px; margin-top: 14px; }
  .monthly-summary-box { background: var(--surface); border: 1px solid var(--accent); border-radius: 10px; padding: 14px; margin-top: 16px; }
  .monthly-summary-title { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--accent); margin-bottom: 8px; }
  .schedule-entry-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #20293580; font-size: 12.5px; font-family: 'IBM Plex Mono', monospace; }
  .schedule-entry-row:last-child { border-bottom: none; }
  .expense-report-list { display: flex; flex-direction: column; gap: 8px; }
  .expense-report-row { display: flex; justify-content: space-between; align-items: center; padding: 13px 15px; border: 1px solid var(--border); border-radius: 12px; background: var(--surface); font-size: 13.5px; font-weight: 700; font-family: 'IBM Plex Mono', monospace; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .expense-report-row:hover { border-color: var(--accent); }
  .expense-report-row:last-child { border-bottom: none; }
  .pay-summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; }
  .pay-summary-row.net { border-top: 1px solid var(--border); margin-top: 4px; padding-top: 10px; font-weight: 700; font-size: 15.5px; }
  .back-btn { display: inline-flex; align-items: center; gap: 6px; background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: 'Oswald', sans-serif; font-size: 14.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; cursor: pointer; padding: 10px 16px; border-radius: 9px; margin-bottom: 14px; }
  .back-btn:active { background: var(--border); }
  .tabbar { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 460px; background: var(--surface); border-top: 1px solid var(--border); display: flex; padding: 8px 2px calc(8px + env(safe-area-inset-bottom)); z-index: 10; }
  .tab-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; background: none; border: none; color: var(--text-dim); padding: 5px 0; cursor: pointer; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1px; }
  .tab-btn.active { color: var(--accent); }
  .sidebar-wordmark { display: none; }
  .text-scale-btn { display: none; }

  /* ===== Desktop layout (≥900px) — sidebar nav instead of bottom tabs, wider content, centered dialogs ===== */
  @media (min-width: 900px) {
    .app-shell { max-width: 1080px; margin: 0 auto 0 232px; }
    .content { max-width: 1080px; padding: 24px 32px 60px; }
    .header { padding: 20px 32px 14px; }
    .tabbar {
      flex-direction: column; align-items: stretch; justify-content: flex-start;
      position: fixed; top: 0; left: 0; bottom: 0; transform: none;
      width: 216px; max-width: 216px; height: 100vh;
      padding: 24px 14px; gap: 4px;
      border-top: none; border-right: 1px solid var(--border);
    }
    .sidebar-wordmark { display: block; height: 24px; width: auto; object-fit: contain; margin: 0 10px 26px; }
    .tab-btn { flex: none; flex-direction: row; justify-content: flex-start; gap: 12px; padding: 12px 14px; border-radius: 10px; font-size: 12.5px; letter-spacing: 0.3px; }
    .tab-btn svg { width: 19px; height: 19px; }
    .tab-btn.active { background: var(--surface-2); color: var(--accent); }
    .modal-overlay { align-items: center; }
    .modal-sheet { max-width: 480px; border-radius: 16px; max-height: 82vh; }
    .text-scale-btn {
      display: flex; align-items: center; justify-content: center;
      width: 38px; height: 38px; border-radius: 50%;
      background: linear-gradient(180deg, var(--surface-2), var(--surface));
      border: 1px solid var(--border); color: var(--text-dim);
      font-family: 'Oswald', sans-serif; font-size: 13.5px; font-weight: 700; letter-spacing: 0.2px; cursor: pointer;
      box-shadow: 0 1px 3px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.04);
      transition: all 0.15s ease;
    }
    .text-scale-btn:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-1px); box-shadow: 0 3px 8px rgba(0,0,0,0.2); }
    .text-scale-btn.scale-active { background: linear-gradient(180deg, var(--accent), #D9922E); color: #1A1300; border-color: var(--accent); box-shadow: 0 2px 6px rgba(242,169,59,0.4); }
    .content.text-large { zoom: 1.18; }
  }
  /* Tablet tier: wider than mobile's fixed 460px column, but keeps the
     bottom tab bar (touch-friendly, familiar) rather than switching to
     the desktop's left sidebar — that's reserved for wider screens where
     a sidebar has room to breathe without crowding the content. */
  @media (min-width: 680px) and (max-width: 899px) {
    .app-shell { max-width: 680px; margin: 0 auto; }
    .content { max-width: 680px; padding: 20px 28px 90px; }
    .header { padding: calc(16px + env(safe-area-inset-top)) 28px 12px; }
    .tabbar { max-width: 680px; }
    .stats-card-grid { grid-template-columns: repeat(3, 1fr); }
    .stats-main-row { flex-direction: row; align-items: stretch; }
    .stats-panel-chart { flex: 2; }
    .fleet-menu-grid { grid-template-columns: repeat(3, 1fr); }
  }
  .card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 10px; overflow: hidden; }
  .card:hover { border-color: var(--accent); }
  .card-head { padding: 12px 14px; display: flex; flex-direction: column; gap: 6px; cursor: pointer; }
  .load-card-row1 { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .load-card-row1-left { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; min-width: 0; }
  .load-truck-plain { font-family: 'IBM Plex Mono', monospace; font-weight: 700; font-size: 13.5px; color: var(--text); flex-shrink: 0; margin-left: 8px; }
  .load-dot-sep { color: var(--text-dim); flex-shrink: 0; }
  .load-dates-inline { font-size: 11.5px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; font-weight: 600; flex-shrink: 0; margin-left: 2px; }
  .load-card-row2 { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .load-route-line { font-size: 12px; color: var(--text-dim); font-weight: 600; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .load-route-line-inline { font-family: 'Oswald', sans-serif; font-size: 12.5px; font-weight: 600; color: var(--text-dim); flex-shrink: 0; }
  .load-card-v2-row1 { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .load-card-v2-left { display: flex; align-items: center; gap: 14px; min-width: 0; }
  .load-card-v2-num { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 14px; color: var(--text); flex-shrink: 0; }
  .load-card-v2-route { font-family: 'Oswald', sans-serif; font-size: 12px; font-weight: 600; color: var(--text); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
  .load-card-v2-right-top { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
  .load-card-v2-meta { display: flex; align-items: center; gap: 3px; font-family: 'IBM Plex Mono', monospace; font-size: 14px; font-weight: 600; color: var(--text); white-space: nowrap; }
  .load-status-dot-red { width: 12px; height: 12px; border-radius: 50%; background: #E53935; flex-shrink: 0; box-shadow: 0 0 0 2px rgba(229,57,53,0.18); }
  .load-card-v2-row2 { display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; }
  .load-card-v2-wo { font-family: 'IBM Plex Mono', monospace; font-weight: 700; font-size: 16px; color: var(--green); letter-spacing: 0.6px; }
  .load-card-v2-right-bottom { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
  .import-btn.gps { border-color: #7C3AED; color: #7C3AED; }
  .gps-miles-card { margin: -2px 0 14px; }
  .gps-miles-title { font-size: 13px; font-weight: 800; color: var(--text); margin-bottom: 8px; }
  .gps-miles-table { border: 1px solid var(--border); border-radius: 10px; overflow: hidden; margin-bottom: 8px; }
  .gps-miles-row { display: grid; grid-template-columns: 1.2fr 1fr 1fr; padding: 6px 10px; font-size: 12.5px; font-weight: 600; color: var(--text); border-top: 1px solid var(--border); font-family: 'IBM Plex Mono', monospace; }
  .gps-miles-row span:not(:first-child) { text-align: right; }
  .gps-miles-row.head { border-top: none; font-family: Inter, sans-serif; font-size: 11px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.4px; background: var(--surface-2); }
  .gps-miles-row.total { font-weight: 800; background: var(--surface-2); }
  .gps-miles-row.off { color: var(--text-dim); text-decoration: line-through; }
  .gps-miles-note { font-size: 11.5px; color: var(--text-dim); line-height: 1.5; margin-bottom: 8px; }
  .gps-miles-check { display: flex; align-items: flex-start; gap: 7px; font-size: 12px; font-weight: 600; color: var(--text); margin-bottom: 10px; }
  .gps-miles-actions { display: flex; gap: 8px; }
  .gps-miles-actions .btn { margin: 0; flex: 1; }
  .load-arr-line, .row-line span:last-child .load-arr-line { display: block; font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 400; color: var(--green); margin-top: 2px; }
  .load-arr-line.late, .row-line span:last-child .load-arr-line.late { color: #D97706; }
  .load-card-v2-rate { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 15px; color: var(--text); }
  .loads-status-row { display: flex; background: var(--surface); border-radius: 999px; padding: 4px; margin-bottom: 10px; gap: 2px; }
  .loads-status-seg { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 0 10px; height: 29px; background: transparent; border: none; border-radius: 999px; color: var(--text); font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 13px; cursor: pointer; position: relative; }
  .loads-status-seg.active { background: var(--accent); color: #1A1300; }
  .loads-status-divider { width: 1px; height: 18px; background: var(--border); align-self: center; flex-shrink: 0; }
  .loads-status-dot { width: 12px; height: 12px; border-radius: 50%; background: #E53935; flex-shrink: 0; box-shadow: 0 0 0 2px rgba(229,57,53,0.18); }
  .loads-check-circle.lg { width: 18px; height: 18px; }
  .loads-check-circle { width: 16px; height: 16px; border-radius: 50%; background: #22B573; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .loads-status-count { font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 700; background: var(--surface-2); color: var(--text-dim); border-radius: 20px; padding: 1px 7px; margin-left: 2px; }
  .loads-status-seg.active .loads-status-count { background: rgba(255,255,255,0.25); color: #fff; }
  .loads-status-count-green { color: var(--green); }
  .loads-filter-row2 { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
  .loads-truck-dropdown-btn { display: flex; align-items: center; gap: 6px; background: var(--surface-2); border: none; border-radius: 999px; padding: 0 10px; height: 26px; color: var(--text); font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 11.5px; cursor: pointer; }
  .loads-truck-popover span { color: var(--text); font-family: 'Oswald', sans-serif; font-size: 12.5px; font-weight: 600; }
  .loads-close-all-btn { display: flex; align-items: center; gap: 6px; background: var(--surface-2); border: none; border-radius: 999px; padding: 0 10px; height: 26px; color: var(--red); font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 11.5px; cursor: pointer; }
  .loads-pill-btn { display: flex; align-items: center; background: var(--surface-2); border: none; border-radius: 999px; height: 40px; cursor: pointer; padding: 0; overflow: hidden; }
  .loads-pill-btn.tab-active { box-shadow: inset 0 0 0 2px var(--accent); }
  .theme-light .loads-pill-text:not(.pending-text) { color: #000; }
  .loads-pill-circle { flex-shrink: 0; width: 40px; height: 40px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; }
  .loads-pill-circle.pending-circle { background: #E15C4F; }
  .loads-pill-text { flex: 1; color: var(--accent); font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; text-align: center; padding: 0 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .loads-pill-text.pending-text { color: #E15C4F; }
  .loads-new-load-btn {
    display: flex; align-items: center; gap: 8px; border-radius: 19px; padding: 0 13px; height: 38px;
    color: #1A1300; font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 12.5px; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; white-space: nowrap;
    background: rgba(242, 169, 59, 0.55);
    -webkit-backdrop-filter: blur(14px) saturate(180%);
    backdrop-filter: blur(14px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.45);
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5), inset 0 -1px 6px rgba(154, 90, 8, 0.25), 0 3px 10px rgba(0, 0, 0, 0.18);
  }
  .theme-light .loads-new-load-btn { background: rgba(219, 138, 46, 0.5); }
  .loads-new-load-plus-box { width: 24px; height: 24px; border: 1px solid #1A1300; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #1A1300; }
  .card-detail { padding: 0 14px 14px; border-top: 1px dashed var(--border); margin-top: 2px; }
  .row-line { display: flex; justify-content: space-between; padding: 7px 0; font-size: 14px; font-weight: 600; color: var(--text-dim); border-bottom: 1.5px dotted #8A93A360; }
  .theme-light .row-line { border-bottom-color: #9BA3AF; color: #4B5563; }
  .row-line span:last-child { font-family: 'IBM Plex Mono', monospace; font-weight: 700; color: var(--text); text-align: right; }
  .empty-state { text-align: center; padding: 40px 20px; color: var(--text-dim); font-size: 13px; }
  .pin-lock-screen { display: flex; flex-direction: column; align-items: center; padding: 60px 20px 40px; }
  .pin-lock-icon { font-size: 40px; }
  .pin-input { width: 160px; text-align: center; font-size: 28px; letter-spacing: 14px; padding: 12px 0 12px 14px; border-radius: 10px; border: 2px solid var(--border); background: var(--surface); color: var(--text); font-family: 'IBM Plex Mono', monospace; margin-top: 4px; }
  .pin-input:focus { outline: none; border-color: var(--accent); }
  .mini-link { font-size: 11px; color: var(--text-dim); text-decoration: underline; cursor: pointer; }
  .filter-row { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 14px; }
  .scroll-fade-wrap { position: relative; margin-bottom: 14px; }
  .scroll-fade-wrap .filter-row { margin-bottom: 0; padding-right: 24px; }
  .scroll-fade-edge { position: absolute; top: 0; right: 0; bottom: 4px; width: 32px; pointer-events: none; background: linear-gradient(to right, transparent, var(--bg) 80%); }
  .chip { flex-shrink: 0; padding: 6px 13px; border-radius: 20px; border: 1px solid var(--border); background: var(--surface); color: var(--text-dim); font-size: 12px; font-weight: 600; cursor: pointer; }
  .close-all-chip { border-color: var(--red); color: var(--red); }
  .chip.active { background: var(--accent); color: #1A1300; border-color: var(--accent); }
  .stat-box { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 14px 10px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .stat-box:hover { border-color: var(--accent); }
  .stat-box .num { font-family: 'IBM Plex Mono', monospace; font-size: 15px; font-weight: 600; }
  .stat-box .lbl { font-size: 9px; text-transform: uppercase; letter-spacing: 0.4px; color: var(--text-dim); margin-top: 3px; }
  .report-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 16px; }
  .list-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #20293580; }
  .list-row:last-child { border-bottom: none; }
  .manage-row { background: var(--surface); border: 1px solid var(--accent); border-radius: 8px; margin-bottom: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.12); }
  .manage-row-head { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; cursor: pointer; }
  .manage-row-body { padding: 0 12px 12px; border-top: 1px dashed var(--border); }
  .add-row { display: flex; gap: 8px; margin-bottom: 16px; }
  .add-row input { flex: 1; background: var(--surface); border: 1px solid var(--border); color: var(--text); padding: 10px 11px; border-radius: 8px; font-family: 'IBM Plex Mono', monospace; }
  .icon-btn { background: var(--surface-2); border: none; color: var(--text-dim); width: 32px; height: 32px; border-radius: 7px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
  .icon-btn:hover { color: var(--red); }
  .save-indicator { position: fixed; top: 12px; right: 14px; font-size: 10px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; opacity: 0.7; z-index: 20; }
  .save-error-banner { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: var(--red); color: #fff; padding: calc(env(safe-area-inset-top) + 12px) 14px 12px; display: flex; align-items: flex-start; gap: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.3); }
  .save-error-banner-text { flex: 1; font-size: 12.5px; line-height: 1.5; }
  .save-error-detail { font-size: 10.5px; opacity: 0.85; margin-top: 4px; font-family: 'IBM Plex Mono', monospace; word-break: break-word; }
  .save-error-dismiss { background: rgba(255,255,255,0.2); border: none; color: #fff; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
  .preset-row { display: flex; gap: 6px; margin-bottom: 14px; }
  .driver-subnav { display: flex; gap: 6px; margin-bottom: 18px; }
  .primary-tab-row { display: flex; gap: 10px; margin-top: 12px; margin-bottom: 28px; }
  .primary-tab-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 16px 10px; border-radius: 14px; border: 2px solid var(--border); background: var(--surface); color: var(--text-dim); font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.4px; cursor: pointer; transition: all 0.15s ease; }
  .primary-tab-btn .primary-tab-icon { opacity: 0.5; }
  .primary-tab-btn.active { border-color: var(--accent); background: var(--surface-2); color: var(--text); box-shadow: 0 0 0 1px var(--accent) inset, 0 4px 10px rgba(0,0,0,0.15); }
  .primary-tab-btn.active .primary-tab-icon { opacity: 1; color: var(--accent); }
  .segment-row { display: flex; border: 1px solid var(--border); border-radius: 10px; overflow: hidden; margin-bottom: 18px; }
  .segment-btn { flex: 1; padding: 11px 10px; border: none; border-right: 1px solid var(--border); background: var(--surface-2); color: var(--text-dim); font-size: 12.5px; font-weight: 700; cursor: pointer; }
  .segment-btn:last-child { border-right: none; }
  .segment-btn.active { background: var(--accent); color: #1A1300; }
  .driver-subnav-btn { flex: 1; padding: 9px 10px; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); color: var(--text-dim); font-size: 12px; font-weight: 600; cursor: pointer; }
  .driver-subnav-btn.active { background: var(--accent); color: #1A1300; border-color: var(--accent); }
  .acct-filter-row { display: flex; gap: 8px; margin-bottom: 18px; }
  .acct-filter-select {
    flex: 1; padding: 10px 26px 10px 12px; border: 1px solid var(--border); border-radius: 10px;
    background-color: var(--surface); color: var(--text); font-family: 'Inter', sans-serif; font-size: 12.5px; font-weight: 600; text-align: left; min-width: 0;
    appearance: none; -webkit-appearance: none; -moz-appearance: none; cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%238A93A3' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 10px center;
  }
  .acct-filter-select:hover { border-color: var(--accent); }
  .acct-filter-select option { font-family: 'Inter', sans-serif; background: var(--surface); color: var(--text); }
  .ifta-table { border: 1px solid var(--accent); border-radius: 10px; overflow: hidden; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.12); }
  .trip-table { margin-bottom: 16px; }
  .trip-table-header, .trip-table-row { display: flex; align-items: center; padding: 14px 12px; }
  .tt-truck-header { cursor: pointer; display: flex; align-items: center; justify-content: flex-start; gap: 0; }
  .tt-truck-arrow { position: absolute; top: 100%; left: 0; margin-top: 1px; opacity: 0.85; }
  .trip-table-header { background: var(--accent); border-radius: 16px; }
  .trip-table-header span { font-family: 'Oswald', sans-serif; font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; color: #1A1300; }
  .trip-table-header .month-charge-popover span { color: var(--text); font-family: 'Oswald', sans-serif; font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; }
  .trip-table-header .month-charge-popover .month-charge-amt { color: var(--green); }
  .trip-table-row { border: 1px solid var(--border); border-radius: 16px; background: var(--surface); font-family: 'IBM Plex Mono', monospace; font-size: 14.5px; color: var(--text); cursor: pointer; margin-top: 9px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .tt-col-trip { width: 26px; flex-shrink: 0; text-align: left; }
  .tt-col-truck { width: 52px; flex-shrink: 0; text-align: left; }
  .tt-col-date { width: 54px; flex-shrink: 0; text-align: left; }
  .tt-col-gross { flex: 1.3; text-align: right; }
  .tt-col-fee { flex: 1; text-align: right; font-weight: 700; }
  .trip-table-dot { color: var(--text-dim); opacity: 0.9; font-weight: 700; flex-shrink: 0; width: 18px; text-align: center; }
  .trip-table-num { font-weight: 800; color: var(--accent); }
  .trip-table-truck { font-weight: 700; }
  .trip-table-date { font-weight: 700; color: var(--accent); }
  .trip-table-gross { font-weight: 800; }
  @media (min-width: 900px) {
    .tt-col-fee { flex: 1.4; }
    .tt-col-gross { flex: 1.8; }
  }
  .ifta-table-header, .ifta-row { display: grid; grid-template-columns: 68px 1fr 1fr 30px; gap: 6px; align-items: center; padding: 8px 8px; }
  .ifta-table-header { background: var(--surface-2); font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.4px; color: var(--text-dim); font-weight: 700; }
  .ifta-row { border-top: 1px solid var(--border); background: var(--surface); min-width: 0; }
  .ifta-row-state { display: flex; flex-direction: column; min-width: 0; }
  .ifta-row-state .code { font-family: 'IBM Plex Mono', monospace; font-weight: 700; font-size: 13px; color: var(--text); }
  .ifta-row-state .rate { font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 9px; color: var(--text-dim); }
  .ifta-row input { padding: 7px 6px; font-size: 12px; min-width: 0; width: 100%; box-sizing: border-box; }
  .ifta-row .mini-icon-btn { min-width: 30px; flex-shrink: 0; }
  .ifta-row-add { grid-template-columns: 1fr; background: var(--surface-2); }
  .ifta-row-add select { background: var(--surface); border: 1px solid var(--border); color: var(--text-dim); padding: 8px 10px; border-radius: 6px; font-size: 12.5px; }
  .cross-add-check { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-dim); font-weight: 600; cursor: pointer; height: 100%; padding-bottom: 2px; }
  .cross-add-check input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--accent); flex-shrink: 0; }
  .favorite-chip { padding: 6px 11px; border-radius: 20px; border: 1px solid var(--border); background: var(--surface); color: var(--text-dim); font-size: 12px; font-weight: 600; cursor: pointer; font-family: 'IBM Plex Mono', monospace; }
  .favorite-chip.active { background: var(--accent); color: #1A1300; border-color: var(--accent); }
  .exclude-chip { color: var(--text); }
  .exclude-chip.excluded { background: rgba(225,92,79,0.14); color: var(--red); border-color: var(--red); text-decoration: line-through; }
  .preset-btn { flex: 1; padding: 8px 4px; border-radius: 8px; border: 1px solid var(--border); background: var(--surface); color: var(--text-dim); font-size: 11.5px; font-weight: 600; cursor: pointer; text-align: center; }
  .preset-btn.active { background: var(--accent); color: #1A1300; border-color: var(--accent); }
  .pay-pill { font-size: 10px; padding: 2px 8px; border-radius: 20px; background: var(--surface-2); color: var(--accent); font-family: 'IBM Plex Mono', monospace; }
  .status-pill { font-size: 9.5px; padding: 2px 8px; border-radius: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; }
  .status-pill.active { background: #3A2E14; color: var(--accent); }
  .status-pill.completed { background: #16332180; color: var(--green); }
  .paid-pill { font-size: 9px; padding: 2px 7px; border-radius: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; }
  .paid-pill.paid { background: #16332180; color: var(--green); }
  .paid-pill.unpaid { background: #3A2E14; color: var(--accent); }
  .history-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #20293580; font-size: 12px; cursor: pointer; }
  .verify-chip { font-size: 11px; color: var(--green); margin-top: 4px; font-family: 'IBM Plex Mono', monospace; }
  .autocomplete-dropdown { position: absolute; top: calc(100% + 3px); left: 0; right: 0; z-index: 40; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; box-shadow: 0 8px 20px rgba(0,0,0,0.35); max-height: 220px; overflow-y: auto; }
  .autocomplete-item { padding: 9px 12px; border-bottom: 1px solid #20293580; cursor: pointer; }
  .autocomplete-item:last-child { border-bottom: none; }
  .autocomplete-item:active { background: var(--surface-2); }
  .autocomplete-item-name { font-size: 13px; color: var(--text); font-family: 'Inter', sans-serif; }
  .autocomplete-item-sub { font-size: 10.5px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; margin-top: 1px; }
  .truck-pill { font-size: 9.5px; padding: 2px 8px; border-radius: 20px; font-weight: 700; background: var(--surface-2); color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; }
  .load-pdf-number { font-family: 'IBM Plex Mono', monospace; font-size: 20px; font-weight: 700; color: #1A1F27; }
  .load-pdf-section-title { font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; color: #4D4D4D; margin: 14px 0 6px; }
  .load-number-inline {
    background: var(--accent); color: #1A1300; border: 1px solid var(--accent);
    padding: 10px 11px; border-radius: 8px; font-size: 16px; font-family: 'IBM Plex Mono', monospace;
    font-weight: 700; width: 100%; box-sizing: border-box;
  }
  .statement-history-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .statement-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 16px; margin-bottom: 12px; cursor: pointer; }
  .statement-card:active { background: var(--surface-2); }
  .statement-card-date { font-family: 'Oswald', sans-serif; font-size: 16px; font-weight: 700; color: var(--text); }
  .statement-card-top-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; gap: 10px; }
  .statement-card-trip { font-family: 'Oswald', sans-serif; font-size: 14px; font-weight: 600; color: var(--text-dim); flex-shrink: 0; }
  .statement-card-row { display: flex; justify-content: space-between; align-items: baseline; font-size: 13px; color: var(--text-dim); }
  .statement-card-amt { font-family: 'IBM Plex Mono', monospace; font-size: 20px; font-weight: 700; color: var(--green); }
  .history-item:last-child { border-bottom: none; }
  .miles-status { font-size: 11px; color: var(--text-dim); margin-top: -6px; margin-bottom: 12px; }
  .settings-card { background: var(--surface-2); border: 1px solid var(--accent); border-radius: 10px; padding: 14px; margin-bottom: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.12); }
  .search-box { display: flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 9px 12px; margin-bottom: 14px; }
  .trip-loads-banner { display: flex; align-items: center; justify-content: space-between; gap: 10px; background: var(--surface-2); border: 1px solid var(--accent); border-radius: 8px; padding: 10px 14px; margin-bottom: 14px; font-size: 12.5px; color: var(--text-dim); }
  .trip-loads-banner strong { color: var(--accent); }
  .notes-field-box { border-color: #B8A369; background: #B8A36914; }
  .bulk-select-bar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; }
  .bulk-select-all { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--text-dim); font-weight: 600; cursor: pointer; }
  .bulk-select-all input[type="checkbox"] { width: 17px; height: 17px; accent-color: var(--accent); }
  .bulk-btn { width: auto; margin-top: 0; padding: 8px 12px; font-size: 11px; }
  .search-box input { flex: 1; background: none; border: none; color: var(--text); font-family: 'Inter', sans-serif; font-size: 13px; outline: none; }

  .trip-compact-list { border: 1px solid var(--border); border-left: 4px solid #4A90D9; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.12); }
  .dash-card-list { display: flex; flex-direction: column; gap: 8px; }
  .dash-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .dash-card:hover { border-color: var(--accent); }
  .dash-card.dash-summary-card { border-left-color: var(--accent); background: var(--surface-2); }
  .dash-card-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 9px; padding-bottom: 8px; border-bottom: 1px dashed var(--border); }
  .dash-card-name { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 13.5px; color: var(--text); text-transform: uppercase; letter-spacing: 0.3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .dash-card-badge-wrap { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
  .dash-card-badge-loads { font-size: 11px; font-weight: 700; color: var(--accent); background: rgba(242,169,59,0.15); padding: 4px 12px; border-radius: 20px; cursor: pointer; }
  .dash-card-grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 12px; }
  .dash-card-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }
  .dash-card-grid4-lbl { font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.3px; color: var(--text-dim); font-weight: 700; margin-bottom: 4px; }
  .dash-card-grid4-val { font-family: 'IBM Plex Mono', monospace; font-weight: 800; font-size: 15px; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .dash-filter-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }
  .dash-filter-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; position: relative; }
  .dash-filter-card:hover { border-color: var(--accent); }
  .dash-filter-card-hit { display: flex; align-items: center; gap: 10px; width: 100%; background: transparent; border: none; padding: 12px 14px; cursor: pointer; text-align: left; }
  .dash-filter-card-compact .dash-filter-card-hit { flex-direction: column; align-items: center; gap: 4px; padding: 10px 4px; text-align: center; }
  .dash-filter-card-compact .dash-filter-icon-wrap { width: 26px; height: 26px; }
  .dash-filter-card-compact .dash-filter-label { font-size: 9px; margin-bottom: 0; }
  .dash-filter-card-compact .dash-filter-value-text { font-size: 12.5px; }
  .dash-filter-card-slim .dash-filter-card-hit { padding: 7px 14px; }
  .dash-filter-card-slim .dash-filter-icon-wrap { width: 28px; height: 28px; }
  .dash-filter-icon-wrap { width: 34px; height: 34px; border-radius: 10px; background: var(--surface-2); color: var(--accent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .dash-filter-body { flex: 1; min-width: 0; }
  .dash-filter-label { font-size: 10px; color: var(--text-dim); font-weight: 600; margin-bottom: 2px; }
  .dash-filter-value-text { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 13.5px; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .typeable-filter-input { color: #C9C6C0; -webkit-text-stroke: 0.4px #C9C6C0; }
  .theme-light .typeable-filter-input { color: #0D1119; -webkit-text-stroke: 0.4px #0D1119; }
  .dash-filter-popover { left: 0; right: 0; width: auto; max-width: none; }
  .dash-update-btn-v2 { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; background: var(--accent); color: #1A1300; border: none; border-radius: 12px; padding: 14px; font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; cursor: pointer; margin-bottom: 6px; }
  .dash-card-badge { font-size: 10px; font-weight: 700; color: var(--text-dim); background: var(--surface-2); padding: 3px 10px; border-radius: 20px; flex-shrink: 0; }
  .dash-card-badge-link { cursor: pointer; border: 1px solid var(--accent); color: var(--accent); }
  .dash-summary-card .dash-card-badge { background: var(--surface); }
  .dash-card-body { display: flex; gap: 18px; margin-bottom: 4px; }
  .dash-card-hero .lbl { font-size: 9px; text-transform: uppercase; letter-spacing: 0.4px; color: var(--text-dim); display: block; margin-bottom: 3px; font-weight: 700; }
  .dash-card-hero .val { font-family: 'IBM Plex Mono', monospace; font-weight: 800; font-size: 19px; color: var(--text); }
  .trip-miles-figure { flex-shrink: 0; }
  .trip-miles-val { font-size: 14.5px !important; font-weight: 700 !important; }
  .trip-stats-row { justify-content: space-between; align-items: center; }
  .trip-fee-gross-group { display: flex; gap: 10px; align-items: center; }
  .trip-paid-flag { color: #E15C4F; font-weight: 800; font-size: 10.5px; letter-spacing: 0.3px; white-space: nowrap; }
  .figure-pill { border: 1.5px solid var(--border); border-radius: 12px; padding: 5px 11px; background: var(--surface-2); }
  .figure-pill .val { font-size: 16.5px !important; }
  .trip-number-pill { display: inline-block; background: var(--accent); color: #1A1300; border-radius: 20px; padding: 2px 10px; font-size: 12px; font-weight: 700; }
  .trip-card-meta-bold { font-weight: 700; color: var(--text); }
  .dash-card-stats { display: flex; gap: 16px; font-size: 11px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; font-weight: 600; margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--border); }
  .dash-card-stats strong { color: var(--text); font-weight: 800; }
  .trip-compact-header, .trip-compact-row { display: flex; align-items: center; padding: 8px 6px; }
  .trip-compact-row.tall { padding: 11px 6px; }
  .trip-card-list { display: flex; flex-direction: column; gap: 8px; }
  .trip-card { background: var(--surface); border: 1px solid var(--border); border-left: 4px solid var(--accent); border-radius: 12px; padding: 10px 14px; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.12); }
  .trip-card:active { background: var(--surface-2); }
  .trip-card-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 7px; padding-bottom: 6px; border-bottom: 1px dashed var(--border); }
  .trip-card-id { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 13.5px; color: var(--text); }
  .trip-card-truck { font-family: 'IBM Plex Mono', monospace; font-weight: 700; color: var(--text); font-size: 13px; }
  .trip-card-meta { font-size: 11px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; flex-shrink: 0; }
  .trip-date-lg { font-size: 12.5px; }
  .truck-standout { display: inline-block; padding: 6px 13px; border-radius: 20px; border: 2px solid var(--green); background: transparent; color: var(--green); font-size: 12px; font-weight: 700; transition: all 0.15s ease; }
  .truck-standout:hover { background: var(--green); color: #0E2318; }
  .rate-field-input { border: 1px solid var(--green) !important; }
  .trips-month-card { padding: 8px 12px; }
  .trips-month-card-v2 { padding: 0 0 10px; margin-bottom: 4px; }
  .trips-month-card-v2 .field { gap: 3px; }
  .trips-month-card-v2 label { font-size: 9px; }
  .trip-compare-row { display: flex; gap: 10px; margin-bottom: 12px; }
  .trip-compare-card { flex: 1; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 12px 14px; min-width: 0; }
  .trip-compare-label { font-size: 11px; color: var(--text-dim); font-weight: 600; margin-bottom: 4px; }
  .trip-compare-value { font-family: 'Oswald', sans-serif; font-weight: 800; font-size: 19px; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .trip-compare-delta { font-size: 10.5px; font-weight: 700; margin-top: 3px; font-family: 'IBM Plex Mono', monospace; }
  .trip-compare-delta.up { color: var(--green); }
  .trip-compare-delta.down { color: var(--red); }
  .trip-stats-bar { display: flex; align-items: center; gap: 10px; background: var(--surface-2); border: 1.5px solid var(--accent); border-radius: 12px; padding: 12px 14px; margin-bottom: 16px; }
  .trip-stat-item { display: flex; flex-direction: column; align-items: center; flex: 1; min-width: 0; }
  .trip-stat-item.trip-stat-fixed-first { flex: none; width: 26px; }
  .trip-stat-item:first-child { flex: 0 0 26px; width: 26px; }
  .trip-stat-num { font-family: 'Oswald', sans-serif; font-weight: 800; font-size: 16px; color: var(--text); white-space: nowrap; }
  .trip-stat-lbl { font-size: 9.5px; color: var(--text-dim); font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; margin-top: 2px; }
  .trip-stat-truck-btn-v2 { position: relative; display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 50%; color: var(--text-dim); cursor: pointer; margin-bottom: 2px; }
  .trip-stat-truck-chevron { color: var(--text-dim); margin-top: 1px; }
  .trip-stat-item .month-charge-popover span { color: var(--text); font-family: 'Oswald', sans-serif; font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; }
  .trip-stat-item .month-charge-popover .month-charge-amt { color: var(--green); }
  .trip-stat-item-inline { flex-direction: row; align-items: baseline; gap: 5px; justify-content: center; }
  .trip-stat-lbl-inline { margin-top: 0; text-transform: none; font-size: 11px; }
  .trip-card-v2-list { display: flex; flex-direction: column; gap: 9px; margin-bottom: 16px; }
  .trip-card-v2 { display: flex; align-items: center; gap: 10px; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 9px 14px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .trip-note-badge { position: absolute; top: -7px; z-index: 1; }
  .trip-note-badge-left { left: -6px; }
  .trip-note-badge-right { right: -6px; }
  .trip-card-v2:hover { border-color: var(--accent); }
  .trip-card-v2-list .trip-card-v2:nth-child(even) { background: var(--surface-2); }
  .trip-card-v2-numcol { display: flex; flex-direction: column; align-items: center; gap: 3px; flex-shrink: 0; width: 26px; }
  .trip-card-v2-num { font-family: 'Oswald', sans-serif; font-weight: 800; font-size: 16px; color: var(--accent); }
  .trip-card-v2-col { display: flex; flex-direction: column; align-items: center; gap: 3px; flex: 1; min-width: 0; }
  .trip-card-v2-lbl { font-size: 9.5px; color: var(--text-dim); font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; }
  .trip-card-v2-val { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 13.5px; color: var(--text); white-space: nowrap; }
  .trip-card-v2-date-val { font-weight: 500; }
  .trip-card-v2-truck-val { font-size: 16px; font-weight: 500; }
  .trip-card-v2-gross-col { align-items: flex-end; }
  .trip-card-v2-gross-val { font-size: 16px; font-weight: 800; }
  @media (min-width: 900px) {
    .trip-card-v2 { padding: 14px 18px; }
  }
  .trips-month-card .field { gap: 3px; }
  .trips-month-card label { font-size: 9px; }
  .trips-month-card select { padding: 6px 8px; font-size: 12.5px; }
  .trips-month-card-v2 .month-select-btn { padding: 7px 9px; font-size: 12.5px; }
  .chevron-stepper-field { flex: 1; min-width: 0; }
  .chevron-stepper-row { display: flex; align-items: center; background: var(--surface); border: 1.5px solid var(--accent); border-radius: 999px; height: 40px; overflow: hidden; }
  .chevron-stepper-btn { flex-shrink: 0; width: 34px; height: 100%; display: flex; align-items: center; justify-content: center; background: transparent; border: none; color: var(--text); cursor: pointer; }
  .chevron-stepper-divider { flex-shrink: 0; width: 1px; height: 18px; background: var(--border); }
  .chevron-stepper-label { flex: 1; min-width: 0; height: 100%; background: transparent; border: none; color: var(--text); font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 14px; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 4px; }
  .trip-card-bottom { display: flex; justify-content: flex-end; gap: 26px; }
  .trip-card-figure { display: flex; flex-direction: column; align-items: flex-end; min-width: 58px; }
  .trip-card-figure .lbl { font-size: 9px; text-transform: uppercase; letter-spacing: 0.4px; color: var(--text-dim); margin-bottom: 2px; }
  .trip-card-figure .val { font-family: 'IBM Plex Mono', monospace; font-weight: 700; font-size: 14.5px; }
  .trip-compact-header { background: var(--surface-2); font-size: 9px; text-transform: uppercase; letter-spacing: 0.3px; color: var(--text-dim); font-weight: 700; }
  .trip-compact-row { font-size: 12.5px; font-family: 'IBM Plex Mono', monospace; font-weight: 500; color: var(--text); border-top: 1px solid var(--border); cursor: pointer; }
  .trip-compact-row:active { background: #20293550; }
  .col-trip, .col-truck, .col-date, .col-driver, .col-miles { border-right: 1px solid #2C374480; padding-right: 5px; margin-right: 5px; }
  .col-trip { width: 22px; flex-shrink: 0; }
  .col-truck { width: 38px; flex-shrink: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .col-date { width: 42px; flex-shrink: 0; }
  .col-driver { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 500; }
  .col-miles { width: 50px; flex-shrink: 0; text-align: right; }
  .col-gross { width: 56px; flex-shrink: 0; text-align: right; font-weight: 700; color: var(--accent); }

  .fleet-menu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
  .fleet-menu-card { display: flex; flex-direction: row; align-items: center; text-align: left; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 12px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1); gap: 12px; }
  .fleet-menu-card:hover { border-color: var(--accent); }
  .fleet-menu-card-icon-wrap { flex-shrink: 0; width: 46px; height: 46px; border-radius: 50%; background: var(--surface-2); color: var(--accent); display: flex; align-items: center; justify-content: center; }
  .fleet-menu-card-text { min-width: 0; overflow: hidden; }
  .fleet-menu-card-name { font-family: 'Oswald', sans-serif; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; color: var(--text); margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .fleet-menu-card-sub { font-size: 11.5px; color: var(--text-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .fleet-credit { text-align: center; font-size: 10.5px; color: var(--text-dim); opacity: 0.6; margin-top: 18px; letter-spacing: 0.3px; }

  .import-btn { display: flex; align-items: center; gap: 6px; background: var(--surface-2); border: 1px solid var(--border); color: var(--text-dim); border-radius: 8px; padding: 8px 12px; font-size: 12px; font-weight: 600; cursor: pointer; margin-bottom: 16px; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(10,12,16,0.75); z-index: 70; display: flex; align-items: flex-end; justify-content: center; }
  .modal-sheet { background: var(--bg); width: 100%; max-width: 460px; max-height: 88vh; overflow-y: auto; border-radius: 16px 16px 0 0; padding: 20px 18px calc(20px + env(safe-area-inset-bottom)); border-top: 1px solid var(--border); }
  .modal-title { font-family: 'Oswald', sans-serif; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px; }
  .mapping-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .mapping-row .mlabel { width: 110px; flex-shrink: 0; font-size: 12px; color: var(--text-dim); }
  .toggle-row { display: flex; align-items: center; gap: 8px; margin: 14px 0; font-size: 12.5px; color: var(--text-dim); }

  .trip-detail-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px 14px; padding: 14px 4px; }
  .trip-detail-item { display: flex; flex-direction: column; gap: 3px; }
  .trip-detail-item .lbl { font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.4px; color: var(--text-dim); }
  .trip-detail-item .val { font-family: 'IBM Plex Mono', monospace; font-size: 13.5px; }
  .profit-banner { display: flex; justify-content: space-between; align-items: center; background: var(--surface-2); border-radius: 8px; padding: 10px 14px; margin-top: 4px; }
  .profit-banner .amt { font-family: 'IBM Plex Mono', monospace; font-size: 17px; font-weight: 700; }

  .stub-sheet { background: #fff; color: #1A1F27; border-radius: 10px; padding: 22px 18px; border-top: 6px solid #F2A93B; }
  .stub-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #1A1F27; padding-bottom: 12px; margin-bottom: 14px; }
  .stub-company { font-family: 'Oswald', sans-serif; font-size: 17px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; color: #1A1F27; }
  .stub-company-line { font-size: 10.5px; color: #555; font-family: 'IBM Plex Mono', monospace; }
  .stub-logo { height: 40px; max-width: 90px; object-fit: contain; flex-shrink: 0; }

  .stub-header2 { border-bottom: 2px solid #1A1F27; padding-bottom: 12px; margin-bottom: 16px; }
  .stub-three-col { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 8px; }
  .stub-col-left { flex: 1; min-width: 0; text-align: left; }
  .stub-col-right { flex: 1; min-width: 0; text-align: right; }
  .stub-logo-mid { height: 56px; max-width: 150px; object-fit: contain; flex-shrink: 0; }
  .stub-driver-block { text-align: right; }
  .stub-driver-name { font-family: 'Oswald', sans-serif; font-size: 15px; font-weight: 600; color: #1A1F27; }
  .stub-driver-truck { font-size: 11px; color: #4D4D4D; font-family: 'IBM Plex Mono', monospace; margin-top: 2px; font-weight: 700; }
  .stub-header2-top { display: flex; justify-content: space-between; align-items: center; gap: 14px; margin-bottom: 14px; }
  .stub-brand { display: flex; align-items: center; gap: 14px; min-width: 0; }
  .stub-logo2 { height: 54px; max-width: 130px; object-fit: contain; flex-shrink: 0; }
  .stub-logo2-fixed { height: 46px; max-width: 130px; object-fit: contain; flex-shrink: 0; }
  .stub-brand-text { min-width: 0; }
  .stub-company2 { font-family: 'Oswald', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.2px; color: #1A1F27; }
  .stub-company2-line { font-size: 10px; color: #4D4D4D; font-family: 'IBM Plex Mono', monospace; margin-top: 1px; }
  .stub-meta2 { text-align: right; flex-shrink: 0; }
  .stub-meta2-num { font-family: 'IBM Plex Mono', monospace; font-weight: 700; font-size: 12.5px; color: #1A1F27; }
  .stub-meta2-line { font-size: 10px; color: #4D4D4D; font-family: 'IBM Plex Mono', monospace; margin-top: 2px; }
  .stub-title-row { text-align: center; padding-top: 10px; border-top: 1px solid #ddd; }
  .stub-title2 { display: inline-block; font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.4px; color: #7A4A0F; background: #FDECD2; padding: 5px 12px; border-radius: 20px; }
  .stub-driver2 { font-family: 'Oswald', sans-serif; font-size: 16px; font-weight: 600; color: #1A1F27; }
  .stub-gen-date { font-family: 'IBM Plex Mono', monospace; font-weight: 700; font-size: 11px; color: #4D4D4D; }
  .stub-topline-row { display: flex; justify-content: space-between; align-items: baseline; margin-top: 8px; }
  .stub-topline-side { flex: 1; min-width: 0; }
  .stub-topline-center { flex: 1; min-width: 0; text-align: center; }
  .stub-networth-line { font-size: 13px; color: #1A1F27; font-weight: 800; font-family: 'IBM Plex Mono', monospace; }
  .stub-tripnum-line { font-size: 13px; color: #1A1F27; font-weight: 800; font-family: 'IBM Plex Mono', monospace; text-align: right; }
  .stub-subline-row { display: flex; justify-content: space-between; align-items: baseline; margin-top: 4px; }
  .stub-miles-line { font-size: 11px; color: #4D4D4D; font-family: 'IBM Plex Mono', monospace; }
  .stub-period-line { font-size: 11px; color: #4D4D4D; font-family: 'IBM Plex Mono', monospace; text-align: right; }
  .stub-header h2 { font-family: 'Oswald', sans-serif; margin: 0; font-size: 18px; text-transform: uppercase; }
  .stub-header .meta { text-align: right; font-size: 11.5px; color: #444; font-family: 'IBM Plex Mono', monospace; }
  .stub-table { width: 100%; border-collapse: collapse; font-size: 11.5px; margin-bottom: 14px; }
  .stub-table th { text-align: left; font-size: 9.5px; text-transform: uppercase; color: #7A4A0F; background: #FDECD2; padding: 6px 5px; }
  .stub-table th:first-child { border-radius: 6px 0 0 6px; }
  .stub-table th:last-child { border-radius: 0 6px 6px 0; }
  .stub-table td { padding: 6px 4px; border-bottom: 1px solid #eee; font-family: 'IBM Plex Mono', monospace; }
  .stub-table tbody tr:nth-child(even) td { background: #FAFAFA; }
  .pay-grid-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; border: 1px solid #E0D5C0; border-radius: 6px; overflow: hidden; }
  .pay-grid-table th { text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.3px; color: #7A4A0F; background: #FDECD2; padding: 8px 9px; border: 1px solid #E9DEC9; font-family: 'Oswald', sans-serif; font-weight: 700; }
  .pay-grid-table td { padding: 8px 9px; border: 1px solid #EDEDED; font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: #1A1F27; }
  .pay-grid-table tbody tr:nth-child(even) td { background: #FAFAFA; }
  .pay-grid-table td.rate-cell { font-weight: 700; }
  .pay-grid-summary { width: 100%; border-collapse: collapse; border: 1px solid #E0D5C0; border-radius: 6px; overflow: hidden; }
  .pay-grid-summary td { padding: 8px 12px; border: 1px solid #EDEDED; font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #1A1F27; }
  .pay-grid-summary td:last-child { text-align: right; font-weight: 700; }
  .pay-grid-summary tbody tr:nth-child(even) td { background: #FAFAFA; }
  .pay-grid-summary .fee-row td:last-child { color: #A8442F; }
  .pay-grid-summary .refund-row td { color: #1F7A4C; background: #E3F5EA; }
  .pay-grid-summary .net-row td { font-weight: 800; font-size: 15px; background: #FDECD2; color: #7A4A0F; }
  .stub-summary { display: flex; justify-content: flex-end; }
  .stub-summary table { font-size: 12.5px; border-collapse: separate; border-spacing: 0; }
  .stub-summary td { padding: 4px 10px; font-family: 'IBM Plex Mono', monospace; }
  .stub-summary .fee-row td { color: #A8442F; }
  .stub-summary .net-row td { font-weight: 700; font-size: 15px; background: #FDECD2; color: #7A4A0F; padding: 10px 14px; border-top: none; }
  .stub-summary .net-row td:first-child { border-radius: 8px 0 0 8px; }
  .stub-summary .net-row td:last-child { border-radius: 0 8px 8px 0; }
  .stub-summary .refund-row td { color: #1F7A4C; background: #E3F5EA; font-weight: 600; }

  @media print {
    @page { size: A4; margin: 14mm; }
    html, body { background: #fff !important; color-scheme: light !important; margin: 0 !important; padding: 0 !important; }
    body * { visibility: hidden !important; }
    .print-area, .print-area * { visibility: visible !important; }
    .app-shell, .content { max-width: none !important; width: 100% !important; background: #fff !important; overflow: visible !important; }
    .modal-overlay { position: static !important; background: transparent !important; display: block !important; align-items: initial !important; justify-content: initial !important; margin: 0 !important; padding: 0 !important; }
    .modal-sheet { max-width: none !important; width: 100% !important; max-height: none !important; background: #fff !important; border-radius: 0 !important; padding: 0 !important; margin: 0 !important; overflow: visible !important; }
    .print-area { position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; max-width: none !important; background: #fff !important; margin: 0 !important; }
    .print-area.stub-sheet { border-radius: 0; padding: 10mm 4mm 6mm; }
    .print-area .stub-header { padding-bottom: 18px; margin-bottom: 22px; }
    .print-area .stub-company { font-size: 22px; }
    .print-area .stub-company-line { font-size: 12.5px; }
    .print-area .stub-logo { height: 56px; max-width: 130px; }
    .print-area .stub-header2 { padding-bottom: 20px; margin-bottom: 26px; }
    .print-area .stub-logo2 { height: 74px; max-width: 170px; }
    .print-area .stub-logo2-fixed { height: 62px; max-width: 170px; }
    .print-area .stub-company2 { font-size: 17px; }
    .print-area .stub-company2-line { font-size: 12px; }
    .print-area .stub-meta2-num { font-size: 14px; }
    .print-area .stub-meta2-line { font-size: 11.5px; }
    .print-area .stub-title2 { font-size: 12.5px; padding: 6px 14px; }
    .print-area .stub-driver2 { font-size: 19px; }
    .print-area h2 { font-size: 24px; }
    .print-area .stub-table { font-size: 13px; margin-bottom: 22px; }
    .print-area .stub-table th { font-size: 11px; padding: 8px 6px; }
    .print-area .stub-table td { padding: 10px 6px; }
    .print-area .stub-summary table { font-size: 14.5px; }
    .print-area .stub-summary td { padding: 7px 14px; }
    .print-area .stub-summary .net-row td { font-size: 18px; padding: 14px 18px; }
    .no-print { display: none !important; }
  }
  .pdf-mode { background: #fff; }
  .pdf-mode.stub-sheet { border-radius: 0; padding: 30px 16px 20px; }
  .pdf-mode .stub-header { padding-bottom: 18px; margin-bottom: 22px; }
  .pdf-mode .stub-company { font-size: 22px; }
  .pdf-mode .stub-company-line { font-size: 12.5px; }
  .pdf-mode .stub-logo { height: 56px; max-width: 130px; }
  .pdf-mode .stub-header2 { padding-bottom: 20px; margin-bottom: 26px; }
  .pdf-mode .stub-logo2 { height: 74px; max-width: 170px; }
  .pdf-mode .stub-logo2-fixed { height: 62px; max-width: 170px; }
  .pdf-mode .stub-logo-mid { height: 68px; max-width: 190px; }
  .pdf-mode .stub-driver-name { font-size: 18px; }
  .pdf-mode .stub-driver-truck { font-size: 13px; }
  .pdf-mode .stub-company2 { font-size: 17px; }
  .pdf-mode .stub-company2-line { font-size: 12px; }
  .pdf-mode .stub-meta2-num { font-size: 14px; }
  .pdf-mode .stub-meta2-line { font-size: 11.5px; }
  .pdf-mode .stub-gen-date { font-size: 14px; }
  .pdf-mode .stub-period-line { font-size: 13px; }
  .pdf-mode .stub-networth-line { font-size: 15px; }
  .pdf-mode .stub-tripnum-line { font-size: 15px; }
  .pdf-mode .stub-miles-line { font-size: 13px; }
  .pdf-mode .stub-title2 { font-size: 12.5px; padding: 6px 14px; }
  .pdf-mode .stub-driver2 { font-size: 19px; }
  .pdf-mode h2 { font-size: 24px; }
  .pdf-mode .stub-table { font-size: 13px; margin-bottom: 22px; }
  .pdf-mode .stub-table th { font-size: 11px; padding: 8px 6px; }
  .pdf-mode .stub-table td { padding: 10px 6px; }
  .pdf-mode .stub-summary table { font-size: 14.5px; }
  .pdf-mode .stub-summary td { padding: 7px 14px; }
  .pdf-mode .stub-summary .net-row td { font-size: 18px; padding: 14px 18px; }
  .pdf-mode .stub-loads-table { font-size: 12px; }
  .pdf-mode .stub-loads-table th, .pdf-mode .stub-loads-table td { padding: 8px 10px; }
  .pdf-mode .pay-grid-table th { font-size: 11px; padding: 9px 10px; }
  .pdf-mode .pay-grid-table td { font-size: 12.5px; padding: 9px 10px; }
  .pdf-mode .pay-grid-summary td { font-size: 13px; padding: 9px 12px; }
  .pdf-mode .pay-grid-summary .net-row td { font-size: 16px; }
  .pdf-mode .no-print { display: none !important; }
`;

function LoadsTab(p) {
  const {
    showLoadForm, openNewLoad, saveLoad, editingLoadId, loadForm, setLoadForm, nextLoadNumber,
    billTos, activeBillTos, shippers, receivers, applyShipper, applyReceiverToStop, truckNumbers, activeTruckNumbers, driverNames, activeDriverNames, dispatchers,
    addStop, removeStop, updateStop, moveStop,
    calcMiles, milesStatus, setShowLoadForm, setEditingLoadId,
    filterStatus, setFilterStatus, filterTruck, setFilterTruck, loadSearch, setLoadSearch,
    filteredLoads, expandedLoadId, setExpandedLoadId, editLoad, closeLoad, reopenLoad, deleteLoad, duplicateLoad, loadsQuickStats,
    companyInfo, closeAllActiveLoads, askConfirm, tripLoadsFilter, setTripLoadsFilter, allLoads, trucks, setTab, setFleetView, etaBoard,
  } = p;
  // Arrival times shown on load cards, in the company's time zone.
  const arrTz = companyInfo && companyInfo.timezone && companyInfo.timezone !== "local" ? companyInfo.timezone : undefined;
  const arrTime = (iso) => new Date(iso).toLocaleTimeString("en-US", { timeZone: arrTz, hour: "numeric", minute: "2-digit" });
  const arrDay = (iso) => new Date(iso).toLocaleDateString("en-US", { timeZone: arrTz, month: "short", day: "numeric" });
  const arrDiff = (x) => (x.diffMin == null ? "" : Math.abs(x.diffMin) <= 15 ? "on time" : x.diffMin < 0 ? `${fmtDuration(-x.diffMin * 60000)} early` : `${fmtDuration(x.diffMin * 60000)} late`);
  const arrLine = (x) => x && (
    <span className={`load-arr-line ${x.diffMin != null && x.diffMin > 15 ? "late" : ""}`}>
      Arrived {arrDay(x.arrivedAt)}, {arrTime(x.arrivedAt)}{x.departedAt ? ` · left ${arrTime(x.departedAt)}` : ""}{arrDiff(x) ? ` · ${arrDiff(x)}` : ""}
    </span>
  );
  const [printingLoad, setPrintingLoad] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bolError, setBolError] = useState("");
  const [truckDropdownOpen, setTruckDropdownOpen] = useState(false);
  const bolInputRef = useRef(null);

  function handleBolFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setBolError("");
    if (file.type === "application/pdf") {
      if (file.size > 4 * 1024 * 1024) { setBolError("That PDF is too large (max 4MB) — try a photo instead, or a smaller PDF."); return; }
      const reader = new FileReader();
      reader.onload = (ev) => setLoadForm((f) => ({ ...f, bolDataUri: ev.target.result, bolFileName: file.name, bolType: "pdf" }));
      reader.onerror = () => setBolError("Couldn't read that file — try again.");
      reader.readAsDataURL(file);
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1400;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        const dataUri = canvas.toDataURL("image/jpeg", 0.82);
        setLoadForm((f) => ({ ...f, bolDataUri: dataUri, bolFileName: file.name, bolType: "image" }));
      };
      img.onerror = () => setBolError("Couldn't read that image — try a different file.");
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
  function handleRemoveBol() { setLoadForm((f) => ({ ...f, bolDataUri: "", bolFileName: "", bolType: "" })); }

  return (
    <div>

      {showLoadForm && (
        <form onSubmit={saveLoad} className="load-entry-form">
          <div className="field-row">
            <div className="field">
              <label>New Load #</label>
              <div
                className="load-number-inline"
                onClick={() => { setShowLoadForm(false); setLoadForm(emptyLoad()); setEditingLoadId(null); }}
                style={{ cursor: "pointer", display: "grid", gridTemplateColumns: "28px 1fr 28px", alignItems: "center" }}
                title="Tap to exit without saving"
              >
                <ChevronLeft size={18} strokeWidth={3} />
                <span style={{ textAlign: "center" }}>#{editingLoadId ? loadForm.loadNumber : nextLoadNumber}</span>
                <span aria-hidden="true" />
              </div>
            </div>
            <div className="field"><label>Work Order #</label><input value={loadForm.workOrder} onChange={(e) => setLoadForm({ ...loadForm, workOrder: e.target.value })} placeholder="Broker load ID" style={{ border: "1.5px solid var(--accent)" }} /></div>
          </div>

          <div className="field-row">
            <div className="field">
              <label>Bill To</label>
              <AutocompleteInput
                value={loadForm.billTo}
                onChange={(v) => setLoadForm({ ...loadForm, billTo: v })}
                onSelect={(b) => setLoadForm({ ...loadForm, billTo: b.name })}
                options={activeBillTos}
                placeholder="e.g. Amazon Relay"
                getLabel={(b) => b.name}
                getSub={(b) => b.paymentTerms || ""}
              />
            </div>
            <div className="field"><label>Rate ($)</label><input type="number" step="0.01" className="rate-field-input" value={loadForm.rate} onChange={(e) => setLoadForm({ ...loadForm, rate: e.target.value })} placeholder="0.00" /></div>
          </div>

          <div className="dash-filter-grid" style={{ marginBottom: 12 }}>
            <TypeableFilterCard
              icon={Truck} label="Truck" value={loadForm.truck}
              onChange={(v) => {
                const match = (trucks || []).find((t) => t.number === v);
                setLoadForm({ ...loadForm, truck: v, driver: (!loadForm.driver && match && match.assignedDriver) ? match.assignedDriver : loadForm.driver });
              }}
              options={activeTruckNumbers.map((t) => ({ value: t, label: t }))}
            />
            <TypeableFilterCard
              icon={User} label="Driver" value={loadForm.driver}
              onChange={(v) => {
                const match = (trucks || []).find((t) => t.assignedDriver === v);
                setLoadForm({ ...loadForm, driver: v, truck: (!loadForm.truck && match) ? match.number : loadForm.truck });
              }}
              options={activeDriverNames.map((d) => ({ value: d, label: d }))}
            />
          </div>

          <div className="section-label-row">
            <div className="section-label">Shipper (Pickup)</div>
            <button type="button" className="add-trip-btn" onClick={() => { setTab("fleet"); setFleetView("shippers"); }}><Plus size={14} /> Add New</button>
          </div>
          <div className="stop-card pickup-card">
          <div className="field-row">
            <div className="field">
              <label>Shipper Name / Code</label>
              <AutocompleteInput
                value={loadForm.shipperName}
                onChange={(v) => setLoadForm({ ...loadForm, shipperName: v })}
                onSelect={(s) => applyShipper(s.companyName)}
                options={shippers}
                placeholder="Amazon Warehouse"
                getLabel={(s) => s.companyName}
                getSub={(s) => [s.warehouseCode, cityState(s.city, s.state)].filter(Boolean).join(" · ")}
              />
              {(() => {
                const match = shippers.find((s) => norm(s.companyName) === norm(loadForm.shipperName));
                return match ? (
                  <div className="verify-chip">✓ {match.companyName}{match.warehouseCode ? ` · Code: ${match.warehouseCode}` : ""}</div>
                ) : null;
              })()}
            </div>
          </div>
          <div className="field-row">
            <div className="field"><label>City</label><input value={loadForm.shipperCity} onChange={(e) => setLoadForm({ ...loadForm, shipperCity: e.target.value })} placeholder="City" style={{ fontFamily: "Inter" }} /></div>
            <div className="field"><label>State</label><input value={loadForm.shipperState} onChange={(e) => setLoadForm({ ...loadForm, shipperState: e.target.value })} placeholder="ST" /></div>
            <div className="field"><label>ZIP</label><input value={loadForm.shipperZip} onChange={(e) => setLoadForm({ ...loadForm, shipperZip: e.target.value })} placeholder="00000" /></div>
          </div>
          <div className="field-row"><div className="field" style={{ flex: 2 }}><label>Notes (optional)</label><input value={loadForm.shipperNotes} onChange={(e) => setLoadForm({ ...loadForm, shipperNotes: e.target.value })} placeholder="e.g. Dock 4, call on arrival" style={{ fontFamily: "Inter" }} /></div><div className="field"><label>Trailer (optional)</label><input value={loadForm.shipperTrailer} onChange={(e) => setLoadForm({ ...loadForm, shipperTrailer: e.target.value })} placeholder="e.g. 5521" style={{ fontFamily: "Inter" }} /></div></div>
          <div className="field-row"><div className="field"><label>Pickup Date</label><div className="date-input-clip"><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={loadForm.pickupDate} onChange={(e) => setLoadForm({ ...loadForm, pickupDate: e.target.value })} /></div></div><div className="field" /></div>
          </div>

          <div className="section-label-row">
            <div className="section-label">Delivery Stops</div>
            <button type="button" className="add-trip-btn" onClick={addStop}><Plus size={14} /> Add Stop</button>
          </div>
          {loadForm.stops.map((stop, idx) => (
            <div className="stop-card" key={stop.id}>
              <div className="stop-card-head">
                <span className="stop-card-label">{stopLabel(idx, loadForm.stops.length)}</span>
                <div className="stop-card-actions">
                  <button type="button" className="mini-icon-btn" style={{ color: "var(--text)" }} disabled={idx === 0} onClick={() => moveStop(stop.id, -1)}><ChevronUp size={14} /></button>
                  <button type="button" className="mini-icon-btn" style={{ color: "var(--text)" }} disabled={idx === loadForm.stops.length - 1} onClick={() => moveStop(stop.id, 1)}><ChevronDown size={14} /></button>
                  <button type="button" className="mini-icon-btn" style={{ color: "var(--text)" }} disabled={loadForm.stops.length <= 1} onClick={() => removeStop(stop.id)}><X size={14} /></button>
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Receiver Name / Code</label>
                  <AutocompleteInput
                    value={stop.receiverName}
                    onChange={(v) => updateStop(stop.id, { receiverName: v })}
                    onSelect={(r) => applyReceiverToStop(stop.id, r.companyName)}
                    options={receivers}
                    placeholder="Costco DC"
                    getLabel={(r) => r.companyName}
                    getSub={(r) => [r.warehouseCode, cityState(r.city, r.state)].filter(Boolean).join(" · ")}
                  />
                  {(() => {
                    const match = receivers.find((r) => norm(r.companyName) === norm(stop.receiverName));
                    return match ? (
                      <div className="verify-chip">✓ {match.companyName}{match.warehouseCode ? ` · Code: ${match.warehouseCode}` : ""}</div>
                    ) : null;
                  })()}
                </div>
              </div>
              <div className="field-row">
                <div className="field"><label>City</label><input value={stop.city} onChange={(e) => updateStop(stop.id, { city: e.target.value })} placeholder="City" style={{ fontFamily: "Inter" }} /></div>
                <div className="field"><label>State</label><input value={stop.state} onChange={(e) => updateStop(stop.id, { state: e.target.value })} placeholder="ST" /></div>
                <div className="field"><label>ZIP</label><input value={stop.zip} onChange={(e) => updateStop(stop.id, { zip: e.target.value })} placeholder="00000" /></div>
              </div>
              <div className="field-row"><div className="field" style={{ flex: 2 }}><label>Notes (optional)</label><input value={stop.notes} onChange={(e) => updateStop(stop.id, { notes: e.target.value })} placeholder="e.g. Dock 4, call on arrival" style={{ fontFamily: "Inter" }} /></div><div className="field"><label>Trailer (optional)</label><input value={stop.trailer} onChange={(e) => updateStop(stop.id, { trailer: e.target.value })} placeholder="e.g. 5521" style={{ fontFamily: "Inter" }} /></div></div>
            </div>
          ))}
          <div className="field-row"><div className="field"><label>Delivery Date (final)</label><div className="date-input-clip"><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={loadForm.deliveryDate} onChange={(e) => setLoadForm({ ...loadForm, deliveryDate: e.target.value })} /></div></div><div className="field" /></div>

          <div className="section-label">Mileage</div>
          <div className="stop-card mileage-card">
          <div className="field-row">
            <div className="field"><label>Loaded Miles</label><input type="number" value={loadForm.loadedMiles} onChange={(e) => setLoadForm({ ...loadForm, loadedMiles: e.target.value })} placeholder="0" /></div>
            <div className="field"><label>Deadhead Miles</label><input type="number" value={loadForm.deadheadMiles} onChange={(e) => setLoadForm({ ...loadForm, deadheadMiles: e.target.value })} placeholder="0" /></div>
            <div className="field" style={{ flex: "0 0 62px" }}>
              <label>OR Miles</label>
              <input type="number" maxLength={4} value={loadForm.orMiles} onChange={(e) => setLoadForm({ ...loadForm, orMiles: e.target.value.slice(0, 4) })} placeholder="0" style={{ padding: "10px 6px", textAlign: "center" }} />
            </div>
          </div>
          <button type="button" className="btn auto-calc-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 0 }} onClick={calcMiles}><MapPin size={14} /> Auto-Calculate Loaded Miles (All Legs)</button>
          {milesStatus && <div className="miles-status">{milesStatus}</div>}
          </div>

          <div className="section-label">Bill of Lading &amp; Dispatcher</div>
          <div className="stop-card bol-card">
          {loadForm.bolDataUri ? (
            <div style={{ marginBottom: 12 }}>
              {loadForm.bolType === "image" ? (
                <img src={loadForm.bolDataUri} alt="BOL" style={{ maxWidth: "100%", maxHeight: 220, borderRadius: 8, border: "1px solid var(--border)", display: "block", marginBottom: 8, objectFit: "contain" }} />
              ) : (
                <div style={{ fontSize: 12.5, color: "var(--text-dim)", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}><FileText size={14} /> {loadForm.bolFileName || "BOL.pdf"}</div>
              )}
              <button type="button" className="btn danger" style={{ marginTop: 0 }} onClick={handleRemoveBol}>Remove BOL</button>
            </div>
          ) : (
            <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 10 }}>No BOL uploaded yet.</div>
          )}
          <input type="file" accept="image/*,.pdf,application/pdf" ref={bolInputRef} style={{ display: "none" }} onChange={handleBolFile} />
          {bolError && <div style={{ fontSize: 11, color: "var(--red)", marginBottom: 8 }}>{bolError}</div>}
          <div className="field-row" style={{ marginBottom: 0 }}>
            <div className="field" style={{ flex: 1 }}>
              <label>BOL</label>
              <button type="button" className="btn secondary" style={{ marginTop: 0 }} onClick={() => bolInputRef.current && bolInputRef.current.click()}>
                {loadForm.bolDataUri ? "Replace BOL" : "Upload BOL"}
              </button>
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label>Dispatcher</label>
              <AutocompleteInput
                value={loadForm.dispatcher}
                onChange={(v) => setLoadForm({ ...loadForm, dispatcher: v })}
                onSelect={(d) => setLoadForm({ ...loadForm, dispatcher: d.name })}
                options={dispatchers.filter((d) => d.active !== false)}
                placeholder="Select dispatcher"
                getLabel={(d) => d.name}
                getSub={(d) => (d.position === "main" ? "Main Dispatcher" : "")}
              />
            </div>
          </div>
          </div>

          <div className="search-box notes-field-box">
            <Pencil size={14} color="#B8A369" />
            <input value={loadForm.notes} onChange={(e) => setLoadForm({ ...loadForm, notes: e.target.value })} placeholder="Add a note about this load…" style={{ fontFamily: "Inter" }} />
          </div>

          <button className="btn" type="submit">{editingLoadId ? "Save Changes" : "Save Load"}</button>
          <button type="button" className="btn secondary cancel-outline" onClick={() => { setShowLoadForm(false); setLoadForm(emptyLoad()); setEditingLoadId(null); }}>Cancel</button>
        </form>
      )}

      <div style={{ marginTop: showLoadForm ? 60 : 8, marginBottom: 12, display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
        <div
          className="loads-pill-btn"
          style={{ flex: 1, minWidth: 0 }}
        >
          <span className="loads-pill-circle" style={{ cursor: "pointer" }} onClick={() => setSearchOpen((v) => !v)}><Search size={18} color="#1A1300" /></span>
          <span className="loads-pill-text" style={{ cursor: "pointer" }} onClick={() => { setTab("fleet"); setFleetView("accounting"); }}>Loads</span>
        </div>
        {!showLoadForm && <div className="loads-status-divider" />}
        {!showLoadForm && (
          <button type="button" className="loads-pill-btn" style={{ flex: 1, minWidth: 0 }} onClick={openNewLoad}>
            <span className="loads-pill-text">New Load</span>
            <span className="loads-pill-circle"><Plus size={18} color="#1A1300" /></span>
          </button>
        )}
      </div>
      {tripLoadsFilter ? (
        <div className="trip-loads-banner">
          <span>Showing loads for <strong>{tripLoadsFilter.label}</strong></span>
          <button type="button" className="mini-link" style={{ background: "none", border: "none", cursor: "pointer", flexShrink: 0 }} onClick={() => setTripLoadsFilter(null)}>Clear</button>
        </div>
      ) : (
        <>
          {searchOpen && (
            <div className="search-box">
              <Search size={16} color="#8A93A3" />
              <input autoFocus value={loadSearch} onChange={(e) => setLoadSearch(e.target.value)} placeholder="Search by load #, work order, bill to, driver, or trailer…" />
            </div>
          )}
          <div className="loads-status-row">
            <button type="button" className={`loads-status-seg ${filterStatus === "active" ? "active" : ""}`} onClick={() => setFilterStatus("active")}>
              <span className="loads-status-dot" style={filterStatus === "active" ? { background: "#E53935", boxShadow: "0 0 0 2px #fff" } : undefined} /> Active
            </button>
            {filterStatus !== "active" && filterStatus !== "completed" && <div className="loads-status-divider" />}
            <button type="button" className={`loads-status-seg ${filterStatus === "completed" ? "active" : ""}`} onClick={() => setFilterStatus("completed")}>
              <span className="loads-check-circle"><Check size={11} color="#fff" strokeWidth={3.2} /></span> Completed
            </button>
            {filterStatus !== "completed" && filterStatus !== "all" && <div className="loads-status-divider" />}
            <button type="button" className={`loads-status-seg ${filterStatus === "all" ? "active" : ""}`} onClick={() => setFilterStatus("all")}>
              <List size={14} color={filterStatus === "all" ? "#1A1300" : "var(--text)"} /> All
            </button>
          </div>
          <div className="loads-filter-row2">
            <div style={{ position: "relative" }}>
              <button type="button" className="loads-truck-dropdown-btn" onClick={() => setTruckDropdownOpen((v) => !v)}>
                <Truck size={14} /> {filterTruck === "ALL" ? "All Trucks" : filterTruck} <ChevronDown size={12} />
              </button>
              {truckDropdownOpen && (
                <>
                  <div className="color-picker-backdrop" onClick={() => setTruckDropdownOpen(false)} />
                  <div className="month-charge-popover loads-truck-popover" style={{ left: 0, right: "auto", minWidth: 140 }}>
                    <div className={`month-charge-item ${filterTruck === "ALL" ? "selected" : ""}`} onClick={() => { setFilterTruck("ALL"); setTruckDropdownOpen(false); }}>
                      <span>All Trucks</span>
                    </div>
                    {truckNumbers.map((t) => (
                      <div key={t} className={`month-charge-item ${filterTruck === t ? "selected" : ""}`} onClick={() => { setFilterTruck(t); setTruckDropdownOpen(false); }}>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <button
              type="button"
              className="loads-close-all-btn"
              onClick={() => askConfirm(
                "This action will mark all currently active loads as completed.",
                closeAllActiveLoads,
                { title: "Close all active loads?", confirmLabel: "Close All", dangerous: false }
              )}
            >
              <X size={14} /> Close All
            </button>
          </div>
        </>
      )}

      {filteredLoads.length === 0 && <div className="empty-state">No loads here yet.</div>}
      {[...filteredLoads].sort((a, b) => (b.loadNumber || 0) - (a.loadNumber || 0)).map((l, i) => {
        const open = expandedLoadId === l.id;
        const arr = open ? loadArrivals(l, etaBoard) : null; // arrival times show only in the opened card
        const cardStyle = { ...(i % 2 === 1 && !open ? { background: "var(--surface-2)" } : null), ...(l.notes ? { borderRight: "3px solid #E15C4F" } : null) };
        return (
          <div className="card loads-list-card" key={l.id} style={cardStyle}>
            <div className="card-head" onClick={() => setExpandedLoadId(open ? null : l.id)}>
              <div className="load-card-v2-row1">
                <div className="load-card-v2-left">
                  <span className="load-card-v2-num">#{l.loadNumber}</span>
                  <span className="load-card-v2-route"><MapPin size={11} color="var(--text-dim)" style={{ display: "inline", verticalAlign: -1 }} /> {collapsedRouteDisplay(l)}</span>
                </div>
                <div className="load-card-v2-right-top">
                  <span className="load-card-v2-meta"><Truck size={12} color="var(--green)" /> <span style={{ color: "var(--green)" }}>{l.truck || "—"}</span></span>
                  <span className="load-card-v2-meta"><Calendar size={12} color="var(--text)" /> {shortDate(l.pickupDate)}</span>
                  {l.status === "completed" ? <span className="loads-check-circle lg"><Check size={12} color="#fff" strokeWidth={3.2} /></span> : <span className="load-status-dot-red" />}
                </div>
              </div>
              <div className="load-card-v2-row2">
                <span className="load-card-v2-wo"><Pencil size={12} color={l.bolDataUri ? "var(--accent)" : "var(--green)"} style={{ display: "inline", verticalAlign: -1 }} /> {l.workOrder || "—"}</span>
                <div className="load-card-v2-right-bottom">
                  <span className="load-card-v2-rate">{money(l.rate)}</span>
                  {open ? <ChevronDown size={16} color="#8A93A3" /> : <ChevronRight size={16} color="#8A93A3" />}
                </div>
              </div>
            </div>
            {open && (
              <div className="card-detail">
                <div className="row-line"><span>Bill To</span><span>{l.billTo || "—"}</span></div>
                <div className="row-line"><span>Work Order</span><span>{l.workOrder || "—"}</span></div>
                <div className="row-line"><span>Driver / Truck</span><span>{l.driver || "—"} · {l.truck || "—"}</span></div>
                <div className="row-line"><span>Pickup</span><span>{fmtDate(l.pickupDate)} · {cityState(l.shipperCity, l.shipperState) || l.shipperName || "—"}{l.shipperTrailer ? ` · Trailer ${l.shipperTrailer}` : ""}{arr && arrLine(arr.pickup)}</span></div>
                {(l.stops || []).map((s, i) => (
                  <div className="row-line" key={s.id || i}><span>{stopLabel(i, l.stops.length)}</span><span>{cityState(s.city, s.state) || s.receiverName || "—"}{s.trailer ? ` · Trailer ${s.trailer}` : ""}{arr && arrLine(i === l.stops.length - 1 ? arr.delivery : arr.mids[i])}</span></div>
                ))}
                <div className="row-line"><span>Delivery Date</span><span>{fmtDate(l.deliveryDate)}</span></div>
                <div className="row-line"><span>Loaded / Deadhead Miles</span><span>{l.loadedMiles || 0} / {l.deadheadMiles || 0}</span></div>
                {l.notes && (
                  <div style={{ marginTop: 10, padding: "10px 12px", background: "#B8A36914", border: "1px solid #B8A369", borderRadius: 8 }}>
                    <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5, color: "#B8A369", fontWeight: 700, marginBottom: 4 }}>Note</div>
                    <div style={{ fontSize: 12.5, color: "var(--text)" }}>{l.notes}</div>
                  </div>
                )}
                {l.bolDataUri && (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-dim)", marginBottom: 6 }}>Bill of Lading</div>
                    {l.bolType === "image" ? (
                      <img src={l.bolDataUri} alt="BOL" style={{ maxWidth: "100%", maxHeight: 180, borderRadius: 8, border: "1px solid var(--border)", objectFit: "contain" }} />
                    ) : (
                      <a href={l.bolDataUri} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: "var(--accent)", display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}><FileText size={14} /> {l.bolFileName || "BOL.pdf"}</a>
                    )}
                  </div>
                )}
                <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                  <button className="btn secondary" style={{ marginTop: 0, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }} onClick={() => editLoad(l)}><Pencil size={13} /> Edit</button>
                  {l.status === "active" ? (
                    <button className="btn" style={{ marginTop: 0, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }} onClick={() => closeLoad(l.id)}><CheckCircle2 size={13} /> Close Load</button>
                  ) : (
                    <button className="btn secondary" style={{ marginTop: 0, flex: 1 }} onClick={() => reopenLoad(l.id)}>Reopen</button>
                  )}
                  <button className="btn danger" style={{ marginTop: 0, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }} onClick={() => askConfirm(`Delete load #${l.loadNumber}? This can't be undone.`, () => deleteLoad(l.id))}><Trash2 size={13} /> Delete</button>
                </div>
                <button className="btn ghost" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 8 }} onClick={() => duplicateLoad(l)}>⧉ Duplicate Load</button>
                <button className="btn ghost" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 8 }} onClick={() => setPrintingLoad(l)}><FileText size={14} /> Print Load PDF</button>
              </div>
            )}
          </div>
        );
      })}

      {printingLoad && (
        <div className="modal-overlay" onClick={() => setPrintingLoad(null)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="print-area stub-sheet">
              <div className="stub-header">
                <div>
                  {companyInfo && companyInfo.companyName ? <div className="stub-company">{companyInfo.companyName}</div> : null}
                  {companyInfo && companyInfo.companyAddress ? <div className="stub-company-line">{companyInfo.companyAddress}</div> : null}
                  <div className="stub-company-line">{[companyInfo && companyInfo.dotNumber ? `DOT ${companyInfo.dotNumber}` : "", companyInfo && companyInfo.companyEmail].filter(Boolean).join(" · ")}</div>
                  <h2 style={{ marginTop: 8 }}>Load Confirmation</h2>
                </div>
                <div className="meta">
                  <div className="load-pdf-number">#{printingLoad.loadNumber}</div>
                  {fmtDate(printingLoad.pickupDate)}
                </div>
              </div>

              <table className="stub-table">
                <tbody>
                  <tr><td style={{ color: "#4D4D4D" }}>Bill To</td><td style={{ textAlign: "right", fontWeight: 600 }}>{printingLoad.billTo || "—"}</td></tr>
                  <tr><td style={{ color: "#4D4D4D" }}>Work Order</td><td style={{ textAlign: "right" }}>{printingLoad.workOrder || "—"}</td></tr>
                  <tr><td style={{ color: "#4D4D4D" }}>Driver / Truck</td><td style={{ textAlign: "right" }}>{printingLoad.driver || "—"} · Truck {printingLoad.truck || "—"}</td></tr>
                  <tr><td style={{ color: "#4D4D4D" }}>Rate</td><td style={{ textAlign: "right", fontWeight: 700 }}>{money(printingLoad.rate)}</td></tr>
                  <tr><td style={{ color: "#4D4D4D" }}>Loaded / Deadhead Miles</td><td style={{ textAlign: "right" }}>{printingLoad.loadedMiles || 0} / {printingLoad.deadheadMiles || 0}</td></tr>
                </tbody>
              </table>

              <div className="load-pdf-section-title">Route</div>
              <table className="stub-table">
                <thead><tr><th>Stop</th><th>Name</th><th>City</th><th style={{ textAlign: "right" }}>Date</th></tr></thead>
                <tbody>
                  <tr>
                    <td>Pickup</td>
                    <td>{printingLoad.shipperName || "—"}</td>
                    <td>{cityState(printingLoad.shipperCity, printingLoad.shipperState) || "—"}</td>
                    <td style={{ textAlign: "right" }}>{fmtDate(printingLoad.pickupDate)}</td>
                  </tr>
                  {printingLoad.shipperNotes && (
                    <tr><td colSpan={4} style={{ color: "#4D4D4D", fontStyle: "italic", fontSize: "9.5px" }}>Note: {printingLoad.shipperNotes}</td></tr>
                  )}
                  {(printingLoad.stops || []).map((s, i) => (
                    <Fragment key={s.id || i}>
                      <tr>
                        <td>{stopLabel(i, printingLoad.stops.length)}</td>
                        <td>{s.receiverName || "—"}</td>
                        <td>{cityState(s.city, s.state) || "—"}</td>
                        <td style={{ textAlign: "right" }}>{i === printingLoad.stops.length - 1 ? fmtDate(printingLoad.deliveryDate) : ""}</td>
                      </tr>
                      {s.notes && (
                        <tr><td colSpan={4} style={{ color: "#4D4D4D", fontStyle: "italic", fontSize: "9.5px" }}>Note: {s.notes}</td></tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn no-print" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={() => generatePdf(loadConfirmationFilename(printingLoad))}><Printer size={16} /> Download PDF</button>
            <button className="btn secondary no-print" onClick={() => setPrintingLoad(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatsTab({ loads, trips, computeTripProfit, computeTripFinancials, settings }) {
  const [period, setPeriod] = useState("month");
  const [customStart, setCustomStart] = useState(todayISO());
  const [customEnd, setCustomEnd] = useState(todayISO());
  const [trendMetric, setTrendMetric] = useState("revenue");

  function addDays(iso, n) { const d = new Date(iso + "T00:00:00"); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }

  const iso = (y, m, d) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const lastDayOfMonth = (y, m) => new Date(y, m, 0).getDate(); // m is 1-indexed here

  const { start, end, prevStart, prevEnd } = useMemo(() => {
    const today = todayISO();
    const now = new Date(today + "T00:00:00"); // calendar-only Date built from the timezone-correct today, so getDay()/getFullYear()/getMonth() below reflect the selected business timezone rather than the device's own
    const y = now.getFullYear(), m = now.getMonth(); // m is 0-indexed

    if (period === "week") {
      // Calendar week, Sunday start.
      const dow = now.getDay();
      const weekStart = addDays(today, -dow);
      return { start: weekStart, end: today, prevStart: addDays(weekStart, -7), prevEnd: addDays(weekStart, -1) };
    }
    if (period === "lastWeek") {
      const dow = now.getDay();
      const thisWeekStart = addDays(today, -dow);
      const lastWeekStart = addDays(thisWeekStart, -7);
      const lastWeekEnd = addDays(thisWeekStart, -1);
      return { start: lastWeekStart, end: lastWeekEnd, prevStart: addDays(lastWeekStart, -7), prevEnd: addDays(lastWeekStart, -1) };
    }
    if (period === "month") {
      const monthStart = iso(y, m + 1, 1);
      const prevD = new Date(y, m - 1, 1);
      const prevStartS = iso(prevD.getFullYear(), prevD.getMonth() + 1, 1);
      const prevEndS = iso(prevD.getFullYear(), prevD.getMonth() + 1, lastDayOfMonth(prevD.getFullYear(), prevD.getMonth() + 1));
      return { start: monthStart, end: today, prevStart: prevStartS, prevEnd: prevEndS };
    }
    if (period === "lastMonth") {
      const d = new Date(y, m - 1, 1);
      const ly = d.getFullYear(), lm = d.getMonth() + 1;
      const monthStart = iso(ly, lm, 1);
      const monthEnd = iso(ly, lm, lastDayOfMonth(ly, lm));
      const pd = new Date(ly, lm - 2, 1);
      const py = pd.getFullYear(), pm = pd.getMonth() + 1;
      return { start: monthStart, end: monthEnd, prevStart: iso(py, pm, 1), prevEnd: iso(py, pm, lastDayOfMonth(py, pm)) };
    }
    if (period === "quarter" || period === "lastQuarter") {
      const qOffset = period === "lastQuarter" ? 1 : 0;
      const currentQIndex = Math.floor(m / 3); // 0-3
      const qStartMonth0 = (currentQIndex - qOffset) * 3; // 0-indexed, JS rolls back the year correctly if negative
      const qDate = new Date(y, qStartMonth0, 1);
      const qy = qDate.getFullYear(), qm0 = qDate.getMonth();
      const qStart = iso(qy, qm0 + 1, 1);
      const qEndDate = new Date(qy, qm0 + 3, 0);
      const qEndFull = iso(qEndDate.getFullYear(), qEndDate.getMonth() + 1, qEndDate.getDate());
      const qEnd = qOffset === 0 ? today : qEndFull;

      const pDate = new Date(qy, qm0 - 3, 1);
      const py = pDate.getFullYear(), pm0 = pDate.getMonth();
      const pStart = iso(py, pm0 + 1, 1);
      const pEndDate = new Date(py, pm0 + 3, 0);
      const pEnd = iso(pEndDate.getFullYear(), pEndDate.getMonth() + 1, pEndDate.getDate());
      return { start: qStart, end: qEnd, prevStart: pStart, prevEnd: pEnd };
    }
    if (period === "year") {
      const yearStart = iso(y, 1, 1);
      return { start: yearStart, end: today, prevStart: iso(y - 1, 1, 1), prevEnd: iso(y - 1, 12, 31) };
    }
    if (period === "lastYear") {
      return { start: iso(y - 1, 1, 1), end: iso(y - 1, 12, 31), prevStart: iso(y - 2, 1, 1), prevEnd: iso(y - 2, 12, 31) };
    }
    const days = Math.max(1, Math.round((new Date(customEnd) - new Date(customStart)) / 86400000) + 1);
    return { start: customStart, end: customEnd, prevStart: addDays(customStart, -days), prevEnd: addDays(customStart, -1) };
  }, [period, customStart, customEnd]);

  function statsForRange(s, e) {
    const rangeTrips = trips.filter((t) => t.startDate && overlaps(t.startDate, t.endDate || t.startDate, s, e));
    const rows = rangeTrips.map((t) => ({ trip: t, ...computeTripProfit(t) }));
    const grossRevenue = rows.reduce((sum, r) => sum + r.gross, 0);
    const totalMiles = rows.reduce((sum, r) => sum + r.miles, 0);
    // Company Profit has to account for two different trip types the same way the
    // Trips tab already does: on a dispatched (fee) trip, the owner-operator covers
    // their own fuel/insurance/etc and keeps everything except the dispatch fee — so
    // the company's real earnings on that trip are just the fee, and "driver pay" is
    // simply gross minus that fee. On a company-owned-truck (profit) trip, the driver
    // is paid directly and the company bears the listed expenses, so profit is gross
    // minus driver pay minus those expenses minus refunds. Summing each trip's actual
    // contribution this way (rather than blindly doing Gross − all fields) keeps this
    // consistent with the Trips tab's own numbers for the same period.
    let companyProfit = 0, totalDriverPay = 0, totalExpenses = 0, totalRefunds = 0;
    rangeTrips.forEach((t) => {
      const fin = computeTripFinancials(t);
      const refunds = num(t.refunds);
      const cancellations = sumOtherCharges(t.cancellationsList);
      totalRefunds += refunds;
      if (fin.mode === "profit") {
        const expenses = DRIVER_DEDUCTION_FIELDS.reduce((s2, f) => s2 + num(t[f.key]), 0);
        const driverPay = fin.gross - fin.profit - expenses - refunds - cancellations;
        totalDriverPay += driverPay;
        totalExpenses += expenses;
        companyProfit += fin.profit;
      } else {
        totalDriverPay += fin.gross - fin.dispatchFee;
        companyProfit += fin.dispatchFee;
      }
    });
    const totalLoadsCount = loads.filter((l) => l.status === "completed" && inRange(l.deliveryDate || l.pickupDate, s, e)).length;
    const avgRPM = totalMiles > 0 ? grossRevenue / totalMiles : 0;
    const profitMargin = grossRevenue > 0 ? (companyProfit / grossRevenue) * 100 : 0;
    return { grossRevenue, totalMiles, totalExpenses, totalRefunds, totalDriverPay, companyProfit, totalLoadsCount, avgRPM, profitMargin, rows };
  }

  const current = useMemo(() => statsForRange(start, end), [trips, loads, start, end]);
  const previous = useMemo(() => statsForRange(prevStart, prevEnd), [trips, loads, prevStart, prevEnd]);

  function pctChange(curr, prev) {
    if (prev === 0) return curr === 0 ? null : Infinity;
    return ((curr - prev) / Math.abs(prev)) * 100;
  }

  const dailySeries = useMemo(() => {
    const totalDays = Math.round((new Date(end) - new Date(start)) / 86400000) + 1;
    // Short ranges (Week, or a short Custom range) show one point per day — fine,
    // since there aren't many days to plot. Longer ranges (Month, Year, or a long
    // Custom range) bucket into weeks or months instead: attributing a whole trip's
    // revenue to a single day and then plotting 30+ of those days produces a sparse
    // comb of spikes with zeros in between, which reads as "broken" even though the
    // totals are correct. Grouping into wider buckets gives a real, readable trend.
    const bucketType = totalDays <= 14 ? "day" : totalDays <= 120 ? "week" : "month";

    const buckets = [];
    if (bucketType === "day") {
      let d = start, guard = 0;
      while (d <= end && guard < 400) { buckets.push({ key: d, bStart: d, bEnd: d, label: shortDate(d) }); d = addDays(d, 1); guard++; }
    } else if (bucketType === "week") {
      let d = start, guard = 0;
      while (d <= end && guard < 80) {
        const rawEnd = addDays(d, 6);
        const bEnd = rawEnd > end ? end : rawEnd;
        buckets.push({ key: d, bStart: d, bEnd, label: shortDate(d) });
        d = addDays(d, 7);
        guard++;
      }
    } else {
      let cur = new Date(start + "T00:00:00");
      let guard = 0;
      while (cur.toISOString().slice(0, 10) <= end && guard < 60) {
        const y = cur.getFullYear(), m = cur.getMonth();
        const monthFirst = `${y}-${String(m + 1).padStart(2, "0")}-01`;
        const bStart = monthFirst < start ? start : monthFirst;
        const monthLast = new Date(y, m + 1, 0).toISOString().slice(0, 10);
        const bEnd = monthLast > end ? end : monthLast;
        buckets.push({ key: bStart, bStart, bEnd, label: MONTH_NAMES[m].slice(0, 3) });
        cur = new Date(y, m + 1, 1);
        guard++;
      }
    }

    const bucketData = buckets.map((b) => ({ ...b, gross: 0, miles: 0, loads: 0, profit: 0 }));
    function findBucketIndex(dateStr) {
      for (let i = 0; i < bucketData.length; i++) {
        if (dateStr >= bucketData[i].bStart && dateStr <= bucketData[i].bEnd) return i;
      }
      return -1;
    }

    // Attribute each trip's full contribution to a single day (its end date if
    // that's visible, otherwise its start date) so a multi-day trip is counted
    // exactly once, then drop it into whichever bucket that day falls in. Trips
    // are included by date-range overlap (not just an exact startDate match) so a
    // trip that began before this window but whose work falls inside it isn't
    // silently dropped from the totals.
    const rangeTrips = trips.filter((t) => t.startDate && overlaps(t.startDate, t.endDate || t.startDate, start, end));
    rangeTrips.forEach((t) => {
      let attribDay = t.endDate && t.endDate >= start && t.endDate <= end ? t.endDate : (t.startDate >= start && t.startDate <= end ? t.startDate : start);
      const idx = findBucketIndex(attribDay);
      if (idx === -1) return;
      const fin = computeTripFinancials(t);
      const bucketProfit = fin.mode === "profit" ? fin.profit : fin.dispatchFee;
      bucketData[idx].gross += fin.gross;
      bucketData[idx].miles += fin.miles;
      bucketData[idx].profit += bucketProfit;
    });

    loads.forEach((l) => {
      if (l.status !== "completed") return;
      const ld = l.deliveryDate || l.pickupDate;
      if (!ld) return;
      const idx = findBucketIndex(ld);
      if (idx !== -1) bucketData[idx].loads += 1;
    });

    return bucketData.map((b) => ({ day: b.key, label: b.label, gross: b.gross, miles: b.miles, loads: b.loads, profit: b.profit }));
  }, [trips, loads, start, end]);

  const topDrivers = useMemo(() => {
    const byDriver = {};
    current.rows.forEach((r) => {
      const name = r.trip.driver1 || "Unassigned";
      if (!byDriver[name]) byDriver[name] = { name, gross: 0, miles: 0, loads: 0 };
      byDriver[name].gross += r.gross;
      byDriver[name].miles += r.miles;
      byDriver[name].loads += loads.filter((l) => l.truck === r.trip.truck && l.status === "completed" && inRange(l.deliveryDate || l.pickupDate, r.trip.startDate, r.trip.endDate)).length;
    });
    return Object.values(byDriver).map((d) => ({ ...d, rpm: d.miles > 0 ? d.gross / d.miles : 0 })).sort((a, b) => b.gross - a.gross).slice(0, 5);
  }, [current, loads]);

  const [minMilesFilter, setMinMilesFilter] = useState(false);
  const { bestLoads, worstLoads } = useMemo(() => {
    const periodLoads = loads
      .filter((l) => l.status === "completed" && inRange(l.deliveryDate || l.pickupDate, start, end) && num(l.loadedMiles) > 0)
      .filter((l) => !minMilesFilter || num(l.loadedMiles) > 300)
      .map((l) => ({ load: l, rpm: num(l.rate) / num(l.loadedMiles) }));
    const sorted = [...periodLoads].sort((a, b) => b.rpm - a.rpm);
    const n = Math.min(5, Math.floor(sorted.length / 2));
    return { bestLoads: sorted.slice(0, n), worstLoads: sorted.slice(sorted.length - n).reverse() };
  }, [loads, start, end, minMilesFilter]);

  const insights = useMemo(() => {
    const list = [];
    const rc = pctChange(current.grossRevenue, previous.grossRevenue);
    if (rc !== null && isFinite(rc) && Math.abs(rc) >= 0.5) list.push({ up: rc >= 0, text: `Revenue ${rc >= 0 ? "increased" : "decreased"} ${Math.abs(rc).toFixed(1)}% compared to the previous period.` });
    const pc = pctChange(current.companyProfit, previous.companyProfit);
    if (pc !== null && isFinite(pc) && Math.abs(pc) >= 0.5) list.push({ up: pc >= 0, text: `Company profit ${pc >= 0 ? "is up" : "is down"} ${Math.abs(pc).toFixed(1)}% this period.` });
    const rpmc = pctChange(current.avgRPM, previous.avgRPM);
    if (rpmc !== null && isFinite(rpmc) && Math.abs(rpmc) >= 0.5) list.push({ up: rpmc >= 0, text: `Average RPM ${rpmc >= 0 ? "improved" : "dropped"} ${Math.abs(rpmc).toFixed(1)}%.` });
    if (current.totalMiles > 0) list.push({ up: true, text: `${current.totalLoadsCount} load${current.totalLoadsCount === 1 ? "" : "s"} completed across ${current.totalMiles.toLocaleString()} miles this period.` });
    return list.slice(0, 4);
  }, [current, previous]);

  const metricConfig = {
    revenue: { data: dailySeries.map((d) => d.gross), label: "Revenue", color: "var(--accent)", fmt: (v) => "$" + compactMoney(v).replace("$", "") },
    profit: { data: dailySeries.map((d) => d.profit), label: "Profit", color: "var(--green)", fmt: (v) => "$" + compactMoney(v).replace("$", "") },
    loads: { data: dailySeries.map((d) => d.loads), label: "Loads", color: "var(--accent-2)", fmt: (v) => Math.round(v) },
    miles: { data: dailySeries.map((d) => d.miles), label: "Miles", color: "#9B6FD9", fmt: (v) => Math.round(v).toLocaleString() },
  };
  const chartLabels = dailySeries.map((d) => d.label);

  const statCards = [
    { label: "Gross Revenue", value: money(current.grossRevenue), delta: pctChange(current.grossRevenue, previous.grossRevenue), series: dailySeries.map((d) => d.gross), color: "var(--accent)" },
    { label: "Total Loads", value: current.totalLoadsCount, delta: pctChange(current.totalLoadsCount, previous.totalLoadsCount), series: dailySeries.map((d) => d.loads), color: "var(--accent-2)" },
    { label: "Total Miles", value: current.totalMiles.toLocaleString(), delta: pctChange(current.totalMiles, previous.totalMiles), series: dailySeries.map((d) => d.miles), color: "#9B6FD9" },
    { label: "Company Profit", value: money(current.companyProfit), delta: pctChange(current.companyProfit, previous.companyProfit), series: dailySeries.map((d) => d.profit), color: "var(--green)" },
    { label: "Average RPM", value: "$" + current.avgRPM.toFixed(2), delta: pctChange(current.avgRPM, previous.avgRPM), series: dailySeries.map((d) => (d.miles > 0 ? d.gross / d.miles : 0)), color: "#3FB6C9" },
    { label: "Profit Margin", value: current.profitMargin.toFixed(1) + "%", delta: pctChange(current.profitMargin, previous.profitMargin), series: dailySeries.map((d) => (d.gross > 0 ? (d.profit / d.gross) * 100 : 0)), color: "var(--green)" },
  ];

  return (
    <div className="stats-page">
      <div className="section-label stats-title"><span>Stats</span><span className="stats-title-right">Company performance</span></div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <FilterCard
          icon={Calendar} label="Quick Select" value={period === "custom" ? "" : period} onChange={setPeriod}
          pillStyle
          options={[
            { value: "week", label: "This Week" },
            { value: "lastWeek", label: "Last Week" },
            { value: "month", label: "This Month" },
            { value: "lastMonth", label: "Last Month" },
            { value: "quarter", label: "This Quarter" },
            { value: "lastQuarter", label: "Last Quarter" },
            { value: "year", label: "This Year" },
            { value: "lastYear", label: "Last Year" },
          ]}
        />
        <CustomRangeField
          start={start} end={end} isActive={period === "custom"}
          onApply={(s, e) => { setCustomStart(s); setCustomEnd(e); setPeriod("custom"); }}
        />
      </div>
      <div className="stats-range-note">{fmtDate(start)} – {fmtDate(end)}</div>

      <div className="stats-card-grid">
        {statCards.map((c, i) => (
          <div className="stats-card" key={i}>
            <div className="stats-card-lbl">{c.label}</div>
            <div className="stats-card-val">{c.value}</div>
            {c.delta !== null && (
              <div className={`stats-card-delta ${c.delta >= 0 ? "up" : "down"}`}>
                {c.delta === Infinity ? "New" : <>{c.delta >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {Math.abs(c.delta).toFixed(1)}% vs last period</>}
              </div>
            )}
            <Sparkline data={c.series} color={c.color} />
          </div>
        ))}
      </div>

      <div className="stats-main-row">
        <div className="stats-panel stats-panel-chart">
          <div className="stats-panel-head">
            <div className="stats-panel-title">Revenue Overview</div>
            <div className="stats-metric-toggle">
              {Object.keys(metricConfig).map((k) => (
                <button key={k} className={`stats-metric-btn ${trendMetric === k ? "active" : ""}`} onClick={() => setTrendMetric(k)}>{metricConfig[k].label}</button>
              ))}
            </div>
          </div>
          <TrendChart data={metricConfig[trendMetric].data} labels={chartLabels} color={metricConfig[trendMetric].color} formatY={metricConfig[trendMetric].fmt} />
        </div>

        <div className="stats-panel stats-panel-profit">
          <div className="stats-panel-title">Profit Overview</div>
          <div className="stats-profit-row"><span>Gross Revenue</span><span className="stats-profit-val">{money(current.grossRevenue)}</span></div>
          <div className="stats-profit-row"><span>Driver Pay</span><span className="stats-profit-val" style={{ color: "var(--red)" }}>{money(current.totalDriverPay)}</span></div>
          <div className="stats-profit-row"><span>Other Expenses</span><span className="stats-profit-val" style={{ color: "var(--red)" }}>{money(current.totalExpenses)}</span></div>
          <div className="stats-profit-row"><span>Refunds Paid</span><span className="stats-profit-val" style={{ color: "var(--red)" }}>{money(current.totalRefunds)}</span></div>
          <div className="stats-profit-row"><span>Company Profit</span><span className="stats-profit-val" style={{ color: "var(--green)" }}>{money(current.companyProfit)}</span></div>
          <div className="stats-profit-row stats-profit-margin"><span>Profit Margin</span><span className="stats-profit-val">{current.profitMargin.toFixed(1)}%</span></div>
        </div>
      </div>

      <div className="stats-main-row">
        <div className="stats-panel">
          <div className="stats-panel-title">Top Drivers</div>
          {topDrivers.length === 0 && <div className="empty-state">No trips in this period yet.</div>}
          {topDrivers.map((d, i) => (
            <div className="stats-driver-row" key={d.name}>
              <div className="stats-driver-avatar">{i + 1}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="stats-driver-name">{d.name}</div>
                <div className="stats-driver-sub">{d.loads} loads · {Math.round(d.miles).toLocaleString()} mi</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div className="stats-driver-gross">{money(d.gross)}</div>
                <div className="stats-driver-sub">${d.rpm.toFixed(2)} RPM</div>
              </div>
            </div>
          ))}
        </div>

        <div className="stats-panel">
          <div className="stats-panel-title">Insights</div>
          {insights.length === 0 && <div className="empty-state">Not enough data yet for insights.</div>}
          {insights.map((ins, i) => (
            <div className="stats-insight-row" key={i}>
              <div className={`stats-insight-icon ${ins.up ? "up" : "down"}`}>{ins.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}</div>
              <div className="stats-insight-text">{ins.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-main-row">
        <div className="stats-panel">
          <div className="stats-panel-head">
            <div className="stats-panel-title">Best Paying Loads <span className="stats-panel-subtitle">by rate per mile</span></div>
            <button type="button" className={`stats-metric-btn ${minMilesFilter ? "active" : ""}`} style={{ border: "1px solid var(--border)" }} onClick={() => setMinMilesFilter((v) => !v)}>300+ mi</button>
          </div>
          {bestLoads.length === 0 && <div className="empty-state">No completed loads with miles in this period.</div>}
          {bestLoads.map(({ load: l, rpm }) => (
            <div className="stats-loadrow" key={l.id}>
              <div style={{ minWidth: 0 }}>
                <div className="stats-loadrow-num">#{l.loadNumber}</div>
                <div className="stats-loadrow-route">{routeSummary(l)}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div className="stats-loadrow-rpm up">${rpm.toFixed(2)}/mi</div>
                <div className="stats-loadrow-sub">{money(l.rate)} · {Math.round(num(l.loadedMiles)).toLocaleString()} mi</div>
              </div>
            </div>
          ))}
        </div>

        <div className="stats-panel">
          <div className="stats-panel-title">Worst Paying Loads <span className="stats-panel-subtitle">by rate per mile</span></div>
          {worstLoads.length === 0 && <div className="empty-state">No completed loads with miles in this period.</div>}
          {worstLoads.map(({ load: l, rpm }) => (
            <div className="stats-loadrow" key={l.id}>
              <div style={{ minWidth: 0 }}>
                <div className="stats-loadrow-num">#{l.loadNumber}</div>
                <div className="stats-loadrow-route">{routeSummary(l)}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div className="stats-loadrow-rpm down">${rpm.toFixed(2)}/mi</div>
                <div className="stats-loadrow-sub">{money(l.rate)} · {Math.round(num(l.loadedMiles)).toLocaleString()} mi</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExpensesList({ trips, computeTripProfit, computeTripFinancials, openTrip, openNewTrip, openNewPendingTrip, tripsMonth, setTripsMonth, tripsYear, setTripsYear, settings, truckNumbers, loads }) {
  const [tripsTruckFilter, setTripsTruckFilter] = useState("ALL");
  const monthKey = `${tripsYear}-${String(tripsMonth).padStart(2, "0")}`;
  const monthTrips = trips
    .filter((t) => (t.startDate || "").slice(0, 7) === monthKey)
    .filter((t) => tripsTruckFilter === "ALL" || t.truck === tripsTruckFilter)
    .sort((a, b) => {
      const na = parseFloat(a.tripNumber), nb = parseFloat(b.tripNumber);
      if (!isNaN(na) && !isNaN(nb)) return na - nb;
      return String(a.tripNumber).localeCompare(String(b.tripNumber));
    });
  const rows = monthTrips.map((t) => ({ trip: t, ...computeTripProfit(t), fin: computeTripFinancials(t) }));
  const totalGross = rows.reduce((s, r) => s + r.gross, 0);
  const totalFees = rows.reduce((s, r) => s + (r.fin.mode === "fee" ? r.fin.dispatchFee : 0), 0);
  const totalProfit = rows.reduce((s, r) => s + (r.fin.mode === "profit" ? r.fin.profit : 0), 0);
  const totalNet = totalFees + totalProfit;
  const years = (() => { const y = new Date().getFullYear(); const arr = []; for (let i = y - 3; i <= Math.max(y + 1, 2040); i++) arr.push(i); return arr; })();

  // Previous month, for the quick comparison cards.
  const prevMonthDate = new Date(tripsYear, tripsMonth - 2, 1);
  const prevMonthKey = `${prevMonthDate.getFullYear()}-${String(prevMonthDate.getMonth() + 1).padStart(2, "0")}`;
  const prevRows = trips
    .filter((t) => (t.startDate || "").slice(0, 7) === prevMonthKey)
    .filter((t) => tripsTruckFilter === "ALL" || t.truck === tripsTruckFilter)
    .map((t) => ({ trip: t, ...computeTripProfit(t), fin: computeTripFinancials(t) }));
  const prevGross = prevRows.reduce((s, r) => s + r.gross, 0);
  const prevNet = prevRows.reduce((s, r) => s + (r.fin.mode === "fee" ? r.fin.dispatchFee : r.fin.mode === "profit" ? r.fin.profit : 0), 0);
  function pctChange(curr, prev) {
    if (prev === 0) return curr === 0 ? null : Infinity;
    return ((curr - prev) / Math.abs(prev)) * 100;
  }
  const netPctChange = pctChange(totalNet, prevNet);
  const grossPctChange = pctChange(totalGross, prevGross);

  // Paid/unpaid trip stats for this month.
  const paidCount = monthTrips.filter((t) => t.paidStatus === "paid").length;
  const unpaidTrips = monthTrips.filter((t) => t.paidStatus !== "paid");
  const unpaidAmount = unpaidTrips.reduce((s, t) => {
    const r = rows.find((row) => row.trip.id === t.id);
    return s + (r ? r.gross : 0);
  }, 0);


  // Oregon Permit total for this month. Default to the live calculated
  // estimate (completed loads' orMiles × rate — same as the bordered table
  // on the Dash report), which is what you want to see while the month is
  // still ongoing. Once that month is actually marked filed, switch over to
  // showing the manually-entered "Total Paid" figure instead — that becomes
  // the real, final number and overrides the estimate from that point on.
  const orPermitFiled = !!(settings && settings.oregonPermitFiled && settings.oregonPermitFiled[monthKey]);
  const orPermitEstimate = (loads || [])
    .filter((l) => l.status === "completed" && ((l.deliveryDate || l.pickupDate || "").slice(0, 7) === monthKey))
    .reduce((s, l) => s + num(l.orMiles), 0) * (num(settings && settings.oregonPermitRate) || 0.251);
  const orPermitAmount = orPermitFiled
    ? num(settings && settings.oregonPermitPayments && settings.oregonPermitPayments[monthKey] && settings.oregonPermitPayments[monthKey].totalPaid)
    : orPermitEstimate;

  // Gross totals by month (within the selected year) and by year — verification-only, like the logbook/insurance markers.
  const grossByMonth = useMemo(() => {
    const map = {};
    trips.forEach((t) => {
      const d = t.startDate || "";
      if (d.slice(0, 4) !== String(tripsYear)) return;
      const mo = parseInt(d.slice(5, 7), 10);
      if (!mo) return;
      map[mo] = (map[mo] || 0) + computeTripProfit(t).gross;
    });
    return map;
  }, [trips, tripsYear]);
  const grossByYear = useMemo(() => {
    const map = {};
    trips.forEach((t) => {
      const yr = (t.startDate || "").slice(0, 4);
      if (!yr) return;
      map[yr] = (map[yr] || 0) + computeTripProfit(t).gross;
    });
    return map;
  }, [trips]);
  const [statsFilterOpen, setStatsFilterOpen] = useState(false);

  return (
    <div>
      <div className="section-label-row">
        <div className="section-label">Monthly Overview</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <button type="button" className="loads-pill-btn" style={{ flex: 1, minWidth: 0 }} onClick={openNewTrip}>
          <span className="loads-pill-circle"><Plus size={18} color="#1A1300" /></span>
          <span className="loads-pill-text">Active Trip</span>
        </button>
        <button type="button" className="loads-pill-btn" style={{ flex: 1, minWidth: 0 }} onClick={openNewPendingTrip}>
          <span className="loads-pill-text pending-text">Pending Trip</span>
          <span className="loads-pill-circle pending-circle"><Plus size={18} color="#1A1300" /></span>
        </button>
      </div>

      <div className="trips-month-card-v2">
        <div className="dash-filter-grid" style={{ marginBottom: 0 }}>
          <ChevronStepperField
            icon={Calendar} value={tripsMonth} onChange={(v) => setTripsMonth(parseInt(v, 10))} cyclic
            options={MONTH_NAMES.map((m, i) => {
              const g = grossByMonth[i + 1];
              return { value: i + 1, label: m, shortLabel: m.slice(0, 3), amountText: g > 0 ? money(g) : undefined };
            })}
          />
          <ChevronStepperField
            icon={Calendar} value={tripsYear} onChange={(v) => setTripsYear(parseInt(v, 10))}
            options={years.map((y) => {
              const g = grossByYear[String(y)];
              return { value: y, label: String(y), amountText: g > 0 ? money(g) : undefined };
            })}
          />
        </div>
      </div>


      <div className="trip-stats-bar">
        <div className="trip-stat-item trip-stat-fixed-first">
          <div className="trip-stat-num">{monthTrips.length}</div>
          <div className="trip-stat-lbl">Trips</div>
        </div>
        <div className="trip-stat-item" style={{ position: "relative" }}>
          <button type="button" className="trip-stat-truck-btn-v2" onClick={() => setStatsFilterOpen((v) => !v)}>
            <Truck size={15} />
          </button>
          <ChevronDown size={14} className="trip-stat-truck-chevron" />
          {statsFilterOpen && (
            <>
              <div className="color-picker-backdrop" onClick={() => setStatsFilterOpen(false)} />
              <div className="month-charge-popover" style={{ left: 0, right: "auto", minWidth: 130, top: "calc(100% + 6px)" }}>
                <div className={`month-charge-item ${tripsTruckFilter === "ALL" ? "selected" : ""}`} onClick={() => { setTripsTruckFilter("ALL"); setStatsFilterOpen(false); }}>
                  <span>All Trucks</span>
                </div>
                {truckNumbers.map((tr) => (
                  <div key={tr} className={`month-charge-item ${tripsTruckFilter === tr ? "selected" : ""}`} onClick={() => { setTripsTruckFilter(tr); setStatsFilterOpen(false); }}>
                    <span>{tr}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="trip-stat-item">
          <div className="trip-stat-num" style={{ color: "var(--green)" }}>{paidCount}</div>
          <div className="trip-stat-lbl">Paid</div>
        </div>
        <div className="trip-stat-item">
          <div className="trip-stat-num">{money(unpaidAmount)}</div>
          <div className="trip-stat-lbl">Unpaid</div>
        </div>
        <div className="trip-stat-item" style={{ alignItems: "flex-end" }}>
          <div className="trip-stat-num" style={orPermitFiled ? { color: "var(--green)" } : undefined}>{money(orPermitAmount)}</div>
          <div className="trip-stat-lbl">OR Permit</div>
        </div>
      </div>

      <div className="trip-card-v2-list">
        {rows.length === 0 && <div className="empty-state">No trips recorded for {MONTH_NAMES[tripsMonth - 1]} {tripsYear}.</div>}
        {rows.map(({ trip: t, miles, gross, fin }) => (
          <div
            className="trip-card-v2"
            key={t.id}
            onClick={() => openTrip(t)}
            style={{ position: "relative" }}
          >
            {t.tripNote && (
              <div className="trip-note-badge trip-note-badge-right" title={t.tripNote}>
                <MessageSquare
                  size={14}
                  color={t.tripNoteColor === "green" ? "#4CAF6D" : t.tripNoteColor === "red" ? "#E15C4F" : "var(--text-dim)"}
                  fill={t.tripNoteColor === "green" ? "#4CAF6D" : t.tripNoteColor === "red" ? "#E15C4F" : "none"}
                  style={!t.tripNoteColor || t.tripNoteColor === "clear" ? { opacity: 0.35 } : undefined}
                />
              </div>
            )}
            <div className="trip-card-v2-numcol">
              {(() => {
                const dColor = t.driver2Color === "green" ? "#4CAF6D" : t.driver2Color === "red" ? "#E15C4F" : "var(--text-dim)";
                const dFill = t.driver2Color === "green" ? "#4CAF6D" : t.driver2Color === "red" ? "#E15C4F" : "none";
                const dStyle = !t.driver2Color || t.driver2Color === "clear" ? { opacity: 0.35 } : undefined;
                return t.driver2 ? (
                  <div style={{ display: "flex" }} title={t.driver2}>
                    <User size={15} color={dColor} fill={dFill} style={dStyle} />
                    <User size={15} color={dColor} fill={dFill} style={{ ...dStyle, marginLeft: -6 }} />
                  </div>
                ) : (
                  <User size={15} color={dColor} fill={dFill} style={dStyle} />
                );
              })()}
              <div className="trip-card-v2-num" style={t.tripStatus === "pending" ? { color: "#E15C4F" } : undefined}>{t.tripStatus === "pending" ? "P" : t.tripNumber}</div>
            </div>
            <div className="trip-card-v2-col">
              <Truck size={14} color="var(--text-dim)" />
              <div className="trip-card-v2-val trip-card-v2-truck-val">{t.truck || "—"}</div>
            </div>
            <div className="trip-card-v2-col">
              <Calendar size={14} color="var(--text-dim)" />
              <div className="trip-card-v2-val trip-card-v2-date-val">{shortDate(t.startDate)}</div>
            </div>
            <div className="trip-card-v2-col">
              <div className="trip-card-v2-lbl">Profit</div>
              <div className="trip-card-v2-val">
                {fin.mode === "profit" ? money(fin.profit) : money(fin.dispatchFee)}
              </div>
            </div>
            <div className="trip-card-v2-col trip-card-v2-gross-col">
              <div className="trip-card-v2-lbl">Gross</div>
              <div className="trip-card-v2-val trip-card-v2-gross-val" style={t.paidStatus === "paid" ? { color: "var(--green)" } : undefined}>{money(gross)}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 10.5, color: "var(--text-dim)", marginTop: 8 }}>
        <span style={{ color: "var(--green)" }}>■</span> Dispatch Fee &nbsp;&nbsp; <span style={{ color: "var(--accent-2)" }}>■</span> Company Trucks
      </div>

      <div className="monthly-summary-box">
        <div className="monthly-summary-title">{MONTH_NAMES[tripsMonth - 1]} {tripsYear} Summary</div>
        <div className="pay-summary-row"><span>Total Monthly Gross</span><span style={{ fontWeight: 800, fontSize: 16 }}>{money(totalGross)}</span></div>
        <div className="pay-summary-row"><span>Total Dispatch Fees</span><span style={{ color: "var(--green)" }}>{money(totalFees)}</span></div>
        <div className="pay-summary-row"><span>Total Profit</span><span style={{ color: "var(--accent-2)" }}>{money(totalProfit)}</span></div>
        <div className="pay-summary-row net"><span>Total Net</span><span>{money(totalFees + totalProfit)}</span></div>
      </div>

      <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 12, marginBottom: 40, lineHeight: 1.5 }}>
        Tap a row for full trip details — driver names are shown there. Miles and Gross update automatically from completed loads.
      </div>
    </div>
  );
}

function MonthChargeSelect({ value, onChange, chargeMap, label, year }) {
  const [open, setOpen] = useState(false);
  const y = year || new Date().getFullYear();
  const yy = (n) => String(n % 100).padStart(2, "0");
  const monthOptions = [
    { value: `Dec ${yy(y - 1)}`, key: `${y - 1}-12` },
    ...MONTH_ABBR.map((m, i) => ({ value: m, key: `${y}-${String(i + 1).padStart(2, "0")}` })),
    { value: `Jan ${yy(y + 1)}`, key: `${y + 1}-01` },
  ];
  return (
    <div className="field" style={{ position: "relative" }}>
      <label>{label}</label>
      <button type="button" className="month-select-btn" onClick={() => setOpen((v) => !v)} style={open ? { borderColor: "var(--accent)" } : undefined}>
        <span>{value || "—"}</span>
        <ChevronDown size={14} />
      </button>
      {open && (
        <>
          <div className="color-picker-backdrop" onClick={() => setOpen(false)} />
          <div className="month-charge-popover">
            <div className={`month-charge-item ${!value ? "selected" : ""}`} onClick={() => { onChange(""); setOpen(false); }}>
              <span style={{ color: "var(--text-dim)" }}>— None —</span>
            </div>
            {monthOptions.map((o) => {
              const charged = chargeMap[o.key];
              return (
                <div key={o.key} className={`month-charge-item ${value === o.value ? "selected" : ""}`} onClick={() => { onChange(o.value); setOpen(false); }}>
                  <span>{o.value}</span>
                  {charged > 0 && <span className="month-charge-amt"><CheckCircle2 size={12} /> {money(charged)}</span>}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function ExpenseDetail(p) {
  const { tripForm, setTripForm, activeTripId, truckNumbers, activeTruckNumbers, driverNames, activeDriverNames, computeTripMilesGross, computeTripProfit, saveTrip, deleteTrip, closeTripDetail, driverByName, askConfirm, nextTripNumber, nextTripNumberFor, settings, setTab, setTripLoadsFilter, trips, trucks, setDashSubTab, setStubTypeTab, setStubDriver, setViewingStubRecord, history } = p;
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  // Captured once, on mount — stays true for this whole editing session even
  // after the toggle activates the trip, so the toggle can freeze in place
  // rather than vanish the instant it's flipped. Re-opening this trip later
  // (or opening a different one) remounts the component and re-captures
  // fresh, so an already-active trip correctly shows no toggle at all.
  const [openedAsPending] = useState(tripForm.tripStatus === "pending");
  // While a new trip (or a pending one being activated) is unsaved, show the
  // number it will actually get — it follows the start date's year.
  const displayTripNumber = (!activeTripId || openedAsPending) && nextTripNumberFor
    ? nextTripNumberFor(tripForm.startDate, activeTripId)
    : (tripForm.tripNumber || nextTripNumber);
  // Latest date already covered by a paid trip for this truck — used to
  // steer the date picker away from re-selecting an already-paid period,
  // which would otherwise double-count those loads and earnings.
  const latestPaidThrough = useMemo(() => {
    if (!tripForm.truck) return null;
    const paidEnds = (trips || [])
      .filter((t) => t.truck === tripForm.truck && t.paidStatus === "paid" && t.id !== activeTripId && t.endDate)
      .map((t) => t.endDate);
    return paidEnds.length ? paidEnds.reduce((max, d) => (d > max ? d : max)) : null;
  }, [trips, tripForm.truck, activeTripId]);
  const minStartDate = useMemo(() => {
    if (!latestPaidThrough || tripForm.paidStatus === "paid") return undefined;
    const d = new Date(latestPaidThrough + "T00:00:00");
    d.setDate(d.getDate() + 1);
    const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, [latestPaidThrough, tripForm.paidStatus]);
  const [startDateRejected, setStartDateRejected] = useState(false);
  // The native date picker's min attribute isn't reliably enforced in every
  // browser (iOS Safari in particular can still let you tap a date before
  // it) — so this checks the actual value the moment it comes back and
  // refuses it outright rather than trusting the picker to have blocked it.
  function handleStartDateChange(v) {
    if (minStartDate && v && v < minStartDate) {
      setStartDateRejected(true);
      setTimeout(() => setStartDateRejected(false), 2500);
      return;
    }
    setTripForm({ ...tripForm, startDate: v });
  }
  function computeMonthCharges(field) {
    const map = {};
    (trips || []).forEach((t) => {
      if (t.truck !== tripForm.truck || t.id === activeTripId) return;
      const key = monthChargeKey(field === "logbook" ? t.logbookMonth : t.insuranceMonth, t.startDate);
      const amount = num(t[field]);
      if (!key || amount <= 0) return;
      map[key] = (map[key] || 0) + amount;
    });
    return map;
  }
  function handleStatusChange(newStatus) {
    if (newStatus === "active" && tripForm.tripStatus === "pending") {
      setTripForm({ ...tripForm, tripStatus: "active", tripNumber: tripForm.tripNumber || String(nextTripNumber) });
    } else {
      setTripForm({ ...tripForm, tripStatus: newStatus });
    }
  }
  function handleDeleteTrip() {
    askConfirm(
      "This will permanently delete this trip record and its expenses. This can't be undone.",
      () => {
        askConfirm(
          "Are you absolutely sure? This is your last chance to back out.",
          () => deleteTrip(activeTripId),
          { title: "Confirm Again", confirmLabel: "Yes, Delete It", dangerous: true }
        );
      },
      { title: "Delete This Trip?", confirmLabel: "Continue", dangerous: true }
    );
  }
  const COLOR_DOTS = [
    { key: "clear", label: "Clear" },
    { key: "green", label: "Driver New" },
    { key: "red", label: "Driver Leaving" },
  ];
  const TRIP_NOTE_COLORS = [
    { key: "clear", label: "Clear" },
    { key: "green", label: "Green" },
    { key: "red", label: "Red" },
  ];
  const [tripColorPickerOpen, setTripColorPickerOpen] = useState(false);
  function setOtherChargesList(list) {
    setTripForm({ ...tripForm, otherChargesList: list, otherCharges: sumOtherCharges(list) });
  }
  function addOtherChargeRow() {
    setOtherChargesList([...(tripForm.otherChargesList || []), { id: uid(), amount: "", note: "" }]);
  }
  function updateOtherChargeRow(id, patch) {
    setOtherChargesList((tripForm.otherChargesList || []).map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }
  function removeOtherChargeRow(id) {
    setOtherChargesList((tripForm.otherChargesList || []).filter((item) => item.id !== id));
  }
  function setCancellationsList(list) {
    setTripForm({ ...tripForm, cancellationsList: list, cancellations: sumOtherCharges(list) });
  }
  function addCancellationRow() {
    const defaultCancelAmount = settings && settings.cancellationAmount != null ? num(settings.cancellationAmount) : 150;
    setCancellationsList([...(tripForm.cancellationsList || []), { id: uid(), amount: defaultCancelAmount, note: "" }]);
  }
  function updateCancellationRow(id, patch) {
    setCancellationsList((tripForm.cancellationsList || []).map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }
  function removeCancellationRow(id) {
    setCancellationsList((tripForm.cancellationsList || []).filter((item) => item.id !== id));
  }
  return (
    <div className="trip-detail-form">
      <button type="button" className="back-btn" onClick={closeTripDetail}><ChevronLeft size={18} /> Back to Trips</button>
      <form onSubmit={saveTrip}>
        <div className="stop-card pickup-card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <span className="section-label no-line" style={{ margin: 0, fontSize: 17 }}>
            {tripForm.tripStatus === "pending" ? "Pending Trip" : `Trip ${displayTripNumber}`}
          </span>
          {openedAsPending && (
            <button
              type="button"
              className={`trip-status-toggle ${tripForm.tripStatus === "pending" ? "pending" : "active"}`}
              onClick={() => { if (tripForm.tripStatus === "pending") handleStatusChange("active"); }}
              disabled={tripForm.tripStatus !== "pending"}
              style={tripForm.tripStatus !== "pending" ? { cursor: "default" } : undefined}
              title={tripForm.tripStatus === "pending" ? "Pending — tap to activate" : "Activated"}
            >
              <span className="trip-status-toggle-knob" />
            </button>
          )}
        </div>
        <div className="dash-filter-grid" style={{ marginBottom: 12 }}>
          <TypeableFilterCard
            icon={Truck} label="Truck" value={tripForm.truck}
            onChange={(v) => {
              const match = (trucks || []).find((t) => t.number === v);
              setTripForm({ ...tripForm, truck: v, driver1: (!tripForm.driver1 && match && match.assignedDriver) ? match.assignedDriver : tripForm.driver1 });
            }}
            options={activeTruckNumbers.map((tr) => ({ value: tr, label: tr }))}
          />
          <TypeableFilterCard
            icon={User} label="Driver 1" value={tripForm.driver1}
            onChange={(v) => {
              const match = (trucks || []).find((t) => t.assignedDriver === v);
              setTripForm({ ...tripForm, driver1: v, truck: (!tripForm.truck && match) ? match.number : tripForm.truck });
            }}
            options={activeDriverNames.map((d) => ({ value: d, label: d }))}
          />
        </div>
        {latestPaidThrough && tripForm.paidStatus !== "paid" && (
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 8 }}>
            Truck {tripForm.truck} is paid through {fmtDate(latestPaidThrough)} — pick a start date after that to avoid counting those loads again.
          </div>
        )}
        <div className="field-row date-row">
          <div className="field"><label>Start Date</label><div className="date-input-clip"><input type="date" min={minStartDate} onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={tripForm.startDate} onChange={(e) => handleStartDateChange(e.target.value)} style={{ fontFamily: "Inter" }} /></div></div>
          <div className="field"><label>End Date</label><div className="date-input-clip"><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={tripForm.endDate} onChange={(e) => setTripForm({ ...tripForm, endDate: e.target.value })} style={{ fontFamily: "Inter" }} /></div></div>
        </div>
        {startDateRejected && (
          <div style={{ fontSize: 11.5, color: "var(--red)", marginTop: -4, marginBottom: 10, fontWeight: 600 }}>
            That date is already paid — pick {fmtDate(minStartDate)} or later.
          </div>
        )}

        {tripForm.truck && tripForm.startDate && tripForm.endDate && (() => {
          const live = computeTripMilesGross(tripForm.truck, tripForm.startDate, tripForm.endDate);
          return (
            <div className="field-row">
              <div className="field"><label>Miles (auto)</label><input readOnly value={live.miles} style={{ opacity: 0.9, fontWeight: 700, fontFamily: "Inter" }} /></div>
              <div className="field"><label>Gross Revenue (auto)</label><input readOnly value={money(live.gross)} style={{ opacity: 0.9, fontWeight: 700, fontFamily: "Inter" }} /></div>
            </div>
          );
        })()}
        <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: -6, marginBottom: 10 }}>
          Pulled automatically from completed loads on this truck within the date range.
        </div>
        <div className="field-row">
          <div className="field">
            <label>See Loads</label>
            {tripForm.truck && tripForm.startDate && tripForm.endDate ? (() => {
              const { loadCount } = computeTripMilesGross(tripForm.truck, tripForm.startDate, tripForm.endDate);
              return (
                <button
                  type="button"
                  className="btn secondary"
                  style={{ marginTop: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                  onClick={() => {
                    const label = tripForm.tripStatus === "pending" ? "Pending Trip" : `Trip ${displayTripNumber}`;
                    setTripLoadsFilter({ matchField: "truck", matchValue: tripForm.truck, start: tripForm.startDate, end: tripForm.endDate, label: `${label} · Truck ${tripForm.truck}` });
                    setTab("loads");
                  }}
                >
                  <FileText size={14} /> See Loads <span className="trip-number-pill">{loadCount}</span>
                </button>
              );
            })() : (
              <button type="button" className="btn secondary" disabled style={{ marginTop: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, opacity: 0.4, cursor: "default" }}>
                <FileText size={14} /> See Loads
              </button>
            )}
          </div>
          <div className="field">
            <label>Driver Pay</label>
            {tripForm.truck && tripForm.startDate && tripForm.endDate ? (() => {
              const { miles, gross, loadCount } = computeTripMilesGross(tripForm.truck, tripForm.startDate, tripForm.endDate);
              const driver = driverByName[tripForm.driver1];
              const expensesForPay = DRIVER_DEDUCTION_FIELDS.reduce((s, f) => s + num(tripForm[f.key]), 0);
              const refunds = num(tripForm.refunds);
              const cancellations = sumOtherCharges(tripForm.cancellationsList);
              const isProfitCase = driver && (isProfitOnlyDriver(driver) || driver.payType === "flat");
              const driverPayDisplay = isProfitCase
                ? (driver.payType === "cpm" ? num(driver.rate) * miles : driver.payType === "flat" ? num(driver.rate) * loadCount : 0)
                : gross - (gross * (dispatchFeePercentFor(driver) / 100)) - expensesForPay + refunds + cancellations;
              return (
                <button
                  type="button"
                  className="btn secondary"
                  style={{ marginTop: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", fontSize: 15, fontWeight: 600 }}
                  onClick={() => {
                    setTab("dashboard");
                    setDashSubTab("stub");
                    setStubTypeTab("driver");
                    if (tripForm.paidStatus === "paid" && tripForm.paidStubId) {
                      const record = (history || []).find((r) => r.id === tripForm.paidStubId);
                      if (record) {
                        setStubDriver(record.driverName);
                        setViewingStubRecord(record);
                        return;
                      }
                    }
                    setStubDriver(tripForm.driver1);
                    setViewingStubRecord(null);
                  }}
                >
                  {money(driverPayDisplay)}
                </button>
              );
            })() : (
              <button type="button" className="btn secondary" disabled style={{ marginTop: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.4, cursor: "default" }}>
                —
              </button>
            )}
          </div>
        </div>
        </div>

        <div className="stop-card">
        <div className="section-label-row">
          <div className="section-label">Expenses</div>
        </div>
        {(() => {
          const byKey = Object.fromEntries(TRIP_EXPENSE_FIELDS.map((f) => [f.key, f]));
          const renderField = (f) => {
            return (
              <div className="field" key={f.key}>
                <label>{f.label}</label>
                <input type="number" step="0.01" value={tripForm[f.key]} onChange={(e) => setTripForm({ ...tripForm, [f.key]: e.target.value })} placeholder="0.00" />
              </div>
            );
          };
          return (
            <>
              <div className="field-row">{renderField(byKey.fuelCost)}{renderField(byKey.advances)}</div>
              <div className="field-row">
                {renderField(byKey.orPermit)}
                <div className="field">
                  <label>OR Permit Note</label>
                  <input value={tripForm.orPermitNote || ""} onChange={(e) => setTripForm({ ...tripForm, orPermitNote: e.target.value })} placeholder="Optional note" style={{ fontFamily: "Inter" }} />
                </div>
              </div>
              {tripForm.truck && tripForm.startDate && tripForm.endDate && (() => {
                const { orMiles } = computeTripMilesGross(tripForm.truck, tripForm.startDate, tripForm.endDate);
                const rate = num(settings && settings.oregonPermitRate) || 0.251;
                const suggested = orMiles * rate;
                if (orMiles <= 0) return null;
                return (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: "var(--surface-2)", borderRadius: 8, padding: "8px 12px", marginTop: -6, marginBottom: 14, fontSize: 11.5 }}>
                    <span style={{ color: "var(--text-dim)" }}>OR Miles (auto): <strong style={{ color: "var(--text)" }}>{orMiles}</strong> × ${rate.toFixed(3)}/mi = <strong style={{ color: "var(--accent)" }}>{money(suggested)}</strong></span>
                    <button type="button" className="mini-link" style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer" }} onClick={() => setTripForm({ ...tripForm, orPermit: suggested.toFixed(2) })}>Use This Amount</button>
                  </div>
                );
              })()}
              <div className="field-row">
                {renderField(byKey.truckPay)}
                <div className="field">
                  <label>Truck Pay Note</label>
                  <input value={tripForm.truckPayNote || ""} onChange={(e) => setTripForm({ ...tripForm, truckPayNote: e.target.value })} placeholder="Optional note" style={{ fontFamily: "Inter" }} />
                </div>
              </div>
              {tripForm.driver1 && (() => {
                const driver = driverByName[tripForm.driver1];
                if (!driver || !driver.truckBalance) return null;
                const startingBalance = num(driver.truckBalance);
                const pastCharges = (trips || []).reduce((s, t) => (t.driver1 === tripForm.driver1 && t.id !== activeTripId ? s + num(t.truckPay) : s), 0);
                const balanceBefore = startingBalance - pastCharges;
                const thisCharge = num(tripForm.truckPay);
                const balanceAfter = balanceBefore - thisCharge;
                const suggestedNote = `Truck balance: ${money(balanceBefore)} - ${money(thisCharge)} = ${money(balanceAfter)} remaining`;
                return (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: "var(--surface-2)", borderRadius: 8, padding: "8px 12px", marginTop: -6, marginBottom: 14, fontSize: 11.5 }}>
                    <span style={{ color: "var(--text-dim)" }}>
                      Truck Balance: <strong style={{ color: "var(--text)" }}>{money(balanceBefore)}</strong>
                      {thisCharge > 0 && <> − {money(thisCharge)} = <strong style={{ color: balanceAfter <= 0 ? "var(--green)" : "var(--accent)" }}>{money(balanceAfter)}</strong> remaining</>}
                    </span>
                    <button type="button" className="mini-link" style={{ flexShrink: 0, background: "none", border: "none", cursor: "pointer" }} onClick={() => setTripForm({ ...tripForm, truckPayNote: suggestedNote })}>Use This Note</button>
                  </div>
                );
              })()}
              <div className="field-row">
                {renderField(byKey.logbook)}
                <MonthChargeSelect
                  label="Logbook Month"
                  value={tripForm.logbookMonth || ""}
                  onChange={(m) => setTripForm({ ...tripForm, logbookMonth: m })}
                  chargeMap={computeMonthCharges("logbook")}
                  year={parseInt((tripForm.startDate || todayISO()).slice(0, 4), 10)}
                />
              </div>
              <div className="field-row">
                {renderField(byKey.insurance)}
                <MonthChargeSelect
                  label="Insurance Month"
                  value={tripForm.insuranceMonth || ""}
                  onChange={(m) => setTripForm({ ...tripForm, insuranceMonth: m })}
                  chargeMap={computeMonthCharges("insurance")}
                  year={parseInt((tripForm.startDate || todayISO()).slice(0, 4), 10)}
                />
              </div>
            </>
          );
        })()}

        <div className="section-label-row">
          <div className="section-label">Other Charges</div>
          <button type="button" className="add-trip-btn" onClick={addOtherChargeRow}><Plus size={14} /> Add Charge</button>
        </div>
        {(tripForm.otherChargesList || []).length === 0 && (
          <div className="empty-state" style={{ padding: "16px 10px" }}>No other charges yet. Tap "Add Charge" for tolls, tickets, repairs, etc.</div>
        )}
        {(tripForm.otherChargesList || []).map((item) => (
          <div className="field-row" key={item.id}>
            <div className="field" style={{ flex: 1.4 }}>
              <label>What is this for?</label>
              <input value={item.note} onChange={(e) => updateOtherChargeRow(item.id, { note: e.target.value })} placeholder="e.g. Toll violation" style={{ fontFamily: "Inter" }} />
            </div>
            <div className="field">
              <label>Amount</label>
              <input type="number" step="0.01" value={item.amount} onChange={(e) => updateOtherChargeRow(item.id, { amount: e.target.value })} placeholder="0.00" />
            </div>
            <button type="button" className="mini-icon-btn" style={{ marginTop: 22, flexShrink: 0 }} onClick={() => removeOtherChargeRow(item.id)}><X size={14} /></button>
          </div>
        ))}
        {(tripForm.otherChargesList || []).length > 0 && (
          <div style={{ fontSize: 11.5, color: "var(--text-dim)", marginTop: -6, marginBottom: 14 }}>
            Total Other Charges: <strong style={{ color: "var(--text)" }}>{money(sumOtherCharges(tripForm.otherChargesList))}</strong>
          </div>
        )}
        </div>
        <div className="refund-box">
          <div className="field-row" style={{ marginBottom: 0 }}>
            <div className="field">
              <label>Refunds ($)</label>
              <input type="number" step="0.01" value={tripForm.refunds} onChange={(e) => setTripForm({ ...tripForm, refunds: e.target.value })} placeholder="0.00" />
            </div>
            <div className="field" style={{ flex: 1.4 }}>
              <label>Driver Refunds Note</label>
              <input value={tripForm.refundsNote || ""} onChange={(e) => setTripForm({ ...tripForm, refundsNote: e.target.value })} placeholder="Optional note" style={{ fontFamily: "Inter" }} />
            </div>
          </div>

          <div style={{ height: 1, background: "var(--green)", opacity: 0.25, margin: "14px 0" }} />

          <div className="section-label-row" style={{ marginBottom: 10 }}>
            <div className="stop-card-label" style={{ color: "var(--green)" }}>Cancellations</div>
            <button type="button" className="add-trip-btn" style={{ background: "var(--green)" }} onClick={addCancellationRow}><Plus size={14} /> Add Pay</button>
          </div>
          {(tripForm.cancellationsList || []).length === 0 && (
            <div className="empty-state" style={{ padding: "10px 10px" }}>No cancellations on this trip yet.</div>
          )}
          {(tripForm.cancellationsList || []).map((item) => (
            <div className="field-row" key={item.id}>
              <div className="field">
                <label>Amount</label>
                <input type="number" step="0.01" value={item.amount} onChange={(e) => updateCancellationRow(item.id, { amount: e.target.value })} placeholder="150.00" />
              </div>
              <div className="field" style={{ flex: 1.4 }}>
                <label>Cancellation Note</label>
                <input value={item.note} onChange={(e) => updateCancellationRow(item.id, { note: e.target.value })} placeholder="e.g. Load #1042 cancelled" style={{ fontFamily: "Inter" }} />
              </div>
              <button type="button" className="mini-icon-btn" style={{ marginTop: 22, flexShrink: 0 }} onClick={() => removeCancellationRow(item.id)}><X size={14} /></button>
            </div>
          ))}
          {(tripForm.cancellationsList || []).length > 0 && (
            <div style={{ fontSize: 11.5, color: "var(--text-dim)", marginTop: -6 }}>
              Total Cancellations Pay: <strong style={{ color: "var(--green)" }}>{money(sumOtherCharges(tripForm.cancellationsList))}</strong>
            </div>
          )}
        </div>

        <div className="field-row" style={{ marginTop: -2 }}>
          <div className="field" style={{ position: "relative" }}>
            <label>Driver 2 / Notes</label>
            <div className="driver2-row">
              <input
                type="text"
                value={tripForm.driver2}
                onChange={(e) => setTripForm({ ...tripForm, driver2: e.target.value })}
                placeholder="Type a note…"
                className={`notes-color-${tripForm.driver2Color || "clear"}`}
                style={{ fontFamily: "Inter" }}
              />
              <button type="button" className="color-arrow-btn" onClick={() => setColorPickerOpen((v) => !v)}>▾</button>
            </div>
            {colorPickerOpen && (
              <>
                <div className="color-picker-backdrop" onClick={() => setColorPickerOpen(false)} />
                <div className="color-picker-popover">
                  {COLOR_DOTS.map((c) => (
                    <button
                      type="button"
                      key={c.key}
                      className={`color-dot dot-${c.key} ${(tripForm.driver2Color || "clear") === c.key ? "dot-selected" : ""}`}
                      title={c.label}
                      onClick={() => { setTripForm({ ...tripForm, driver2Color: c.key }); setColorPickerOpen(false); }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="field" style={{ position: "relative" }}>
            <label>Trip Notes</label>
            <div className="driver2-row">
              <input
                type="text"
                value={tripForm.tripNote || ""}
                onChange={(e) => setTripForm({ ...tripForm, tripNote: e.target.value })}
                placeholder="Type a note about this trip…"
                className={`notes-color-${tripForm.tripNoteColor || "clear"}`}
                style={{ fontFamily: "Inter" }}
              />
              <button type="button" className="color-arrow-btn" onClick={() => setTripColorPickerOpen((v) => !v)}>▾</button>
            </div>
            {tripColorPickerOpen && (
              <>
                <div className="color-picker-backdrop" onClick={() => setTripColorPickerOpen(false)} />
                <div className="color-picker-popover">
                  {TRIP_NOTE_COLORS.map((c) => (
                    <button
                      type="button"
                      key={c.key}
                      className={`color-dot dot-${c.key} ${(tripForm.tripNoteColor || "clear") === c.key ? "dot-selected" : ""}`}
                      title={c.label}
                      onClick={() => { setTripForm({ ...tripForm, tripNoteColor: c.key }); setTripColorPickerOpen(false); }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div style={{ fontSize: 10.5, color: "var(--text-dim)", marginTop: -8, marginBottom: 14 }}>
          Driver 2 is a note only — it doesn't affect pay or dispatch fee.
        </div>
        <div style={{ fontSize: 10.5, color: "var(--text-dim)", marginTop: -8, marginBottom: 14 }}>
          The chosen color shows as a side edge on this trip's row in the Trips list.
        </div>

        {tripForm.truck && tripForm.startDate && tripForm.endDate && (() => {
          const { miles, gross, loadCount } = computeTripMilesGross(tripForm.truck, tripForm.startDate, tripForm.endDate);
          const driver = driverByName[tripForm.driver1];
          const expensesForPay = DRIVER_DEDUCTION_FIELDS.reduce((s, f) => s + num(tripForm[f.key]), 0);
          const refunds = num(tripForm.refunds);
          const cancellations = sumOtherCharges(tripForm.cancellationsList);
          const isProfitCase = driver && (isProfitOnlyDriver(driver) || driver.payType === "flat");

          if (isProfitCase) {
            const driverEarnings = driver.payType === "cpm" ? num(driver.rate) * miles : driver.payType === "flat" ? num(driver.rate) * loadCount : 0;
            const earningsLabel = driver.payType === "cpm" ? `$${num(driver.rate).toFixed(2)}/mi` : driver.payType === "flat" ? `$${num(driver.rate).toFixed(2)}/load` : "0% rate";
            const profit = gross - driverEarnings - expensesForPay + refunds - cancellations;
            return (
              <div className="pay-summary-box" style={{ marginTop: 14 }}>
                <div className="pay-summary-row"><span>Gross</span><span>{money(gross)}</span></div>
                <div className="pay-summary-row"><span>Driver Pay ({earningsLabel})</span><span style={{ color: "var(--red)" }}>-{money(driverEarnings)}</span></div>
                <div className="pay-summary-row"><span>Expenses</span><span style={{ color: "var(--red)" }}>-{money(expensesForPay)}</span></div>
                {refunds > 0 && <div className="pay-summary-row"><span>Refunds</span><span style={{ color: "var(--green)" }}>+{money(refunds)}</span></div>}
                {cancellations > 0 && <div className="pay-summary-row"><span>Cancellations</span><span style={{ color: "var(--green)" }}>+{money(cancellations)}</span></div>}
                <div className="pay-summary-row net"><span>Profit</span><span style={{ color: profit >= 0 ? "var(--accent-2)" : "var(--red)" }}>{money(profit)}</span></div>
              </div>
            );
          }

          const feePct = dispatchFeePercentFor(driver);
          const dispatchFee = gross * (feePct / 100);
          const driverPay = gross - dispatchFee - expensesForPay + refunds + cancellations;
          return (
            <div className="pay-summary-box" style={{ marginTop: 14 }}>
              <div className="pay-summary-row"><span>Gross</span><span>{money(gross)}</span></div>
              <div className="pay-summary-row"><span>Dispatch Fee ({feePct}%)</span><span style={{ color: "var(--red)" }}>-{money(dispatchFee)}</span></div>
              <div className="pay-summary-row"><span>Expenses</span><span style={{ color: "var(--red)" }}>-{money(expensesForPay)}</span></div>
              {refunds > 0 && <div className="pay-summary-row"><span>Refunds</span><span style={{ color: "var(--green)" }}>+{money(refunds)}</span></div>}
              {cancellations > 0 && <div className="pay-summary-row"><span>Cancellations</span><span style={{ color: "var(--green)" }}>+{money(cancellations)}</span></div>}
              <div className="pay-summary-row net"><span>Driver Pay</span><span style={{ color: driverPay >= 0 ? "var(--green)" : "var(--red)" }}>{money(driverPay)}</span></div>
            </div>
          );
        })()}

        <button className="btn" type="submit">{activeTripId ? "Save Changes" : "Save"}</button>
        {activeTripId && <button type="button" className="btn danger" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }} onClick={handleDeleteTrip}><Trash2 size={13} /> Delete Record</button>}
        <button type="button" className="btn secondary" onClick={closeTripDetail}>Cancel</button>
      </form>
    </div>
  );
}

function DashboardTab(p) {
  const {
    dashPeriod, onDashPeriodChange, dashStart, setDashStart, dashEnd, setDashEnd,
    dashViewBy, setDashViewBy, dashDriverFilter, setDashDriverFilter,
    dashTruckFilter, setDashTruckFilter, dashBillToFilter, setDashBillToFilter,
    dashDispatcherFilter, setDashDispatcherFilter, dispatchers,
    dashMilesGroupBy, setDashMilesGroupBy,
    runDashUpdate, changeDashReport, dashReport, driverNames, truckNumbers, billTos,
    companyInfo,
    setTab, setTripLoadsFilter,
  } = p;
  // Driver Pay report: statements unticked in the table are left out of the
  // totals and the PDF (e.g. drivers who ended the period with negative pay).
  const [dpExcluded, setDpExcluded] = useState(() => new Set());
  const [printingDriverPay, setPrintingDriverPay] = useState(false);
  const dpReportKey = `${dashReport.viewBy}|${dashReport.start}|${dashReport.end}`;
  useEffect(() => { setDpExcluded(new Set()); }, [dpReportKey]);
  const [driverDropdownOpen, setDriverDropdownOpen] = useState(false);

  function toggleDriver(name) {
    setDashDriverFilter((prev) => prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]);
  }
  function viewGroupLoads(matchField, matchValue, label) {
    setTripLoadsFilter({ matchField, matchValue, start: dashReport.start, end: dashReport.end, label });
    setTab("loads");
  }

  const isBillTo = dashReport.viewBy === "billto";
  const isProfit = dashReport.viewBy === "profit";
  const isExpenses = dashReport.viewBy === "expenses";
  const isDispatcher = dashReport.viewBy === "dispatcher";
  const isMiles = dashReport.viewBy === "miles";
  const isCancellations = dashReport.viewBy === "cancellations";
  const isDriverPay = dashReport.viewBy === "driverPay";
  const dpItems = isDriverPay ? dashReport.items : [];
  const dpSelected = dpItems.filter((it) => !dpExcluded.has(it.id));
  const dpAllSelected = dpItems.length > 0 && dpSelected.length === dpItems.length;
  const dpTotalTrips = dpSelected.reduce((sum, it) => sum + it.tripsGross, 0);
  const dpTotalNet = dpSelected.reduce((sum, it) => sum + it.netPay, 0);
  function toggleDpRow(id) {
    setDpExcluded((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  }
  function toggleDpAll() {
    setDpExcluded(dpAllSelected ? new Set(dpItems.map((it) => it.id)) : new Set());
  }
  const nameLabel = dashReport.viewBy === "truck" ? "Truck" : dashReport.viewBy === "billto" ? "Broker" : "Driver";

  return (
    <div>
      <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr" }}>
        <FilterCard
          icon={BarChart3} label="Report" value={dashViewBy} onChange={changeDashReport} popoverKey="report" fullWidth
          options={[
            { value: "miles", label: "Miles" },
            { value: "billto", label: "Broker" },
            { value: "profit", label: "Profit" },
            { value: "truck", label: "By Truck" },
            { value: "expenses", label: "Expenses" },
            { value: "driver", label: "By Driver" },
            { value: "dispatcher", label: "Dispatcher" },
            { value: "driverPay", label: "Driver Pay" },
            { value: "cancellations", label: "Cancellations" },
          ]}
        />
      </div>

      {(dashViewBy === "dispatcher" ? (
        <>
          <div className="dash-filter-grid">
            <FilterCard
              icon={Users} label="Dispatcher" value={dashDispatcherFilter} onChange={setDashDispatcherFilter} popoverKey="dispatcher"
              options={[{ value: "", label: "Select a dispatcher…" }, ...dispatchers.map((d) => ({ value: d.name, label: `${d.name}${d.position === "main" ? " (Main)" : ""}` }))]}
            />
            <FilterCard
              icon={Truck} label="Truck" value={dashTruckFilter} onChange={setDashTruckFilter} popoverKey="truck1"
              options={[{ value: "ALL", label: "All" }, ...truckNumbers.map((t) => ({ value: t, label: t }))]}
            />
          </div>
          <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr" }}>
            <FilterCard
              icon={Calendar} label="Period" value={dashPeriod} onChange={onDashPeriodChange} popoverKey="period1" fullWidth
              options={[{ value: "month", label: "This Month" }, { value: "lastMonth", label: "Last Month" }, { value: "year", label: "This Year" }, { value: "lastYear", label: "Last Year" }, { value: "custom", label: "Custom Range" }]}
            />
          </div>
          {dashPeriod === "custom" && (
            <div className="field-row" style={{ marginTop: 6 }}>
              <div className="field"><label>Start</label><div className="date-input-clip"><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={dashStart} onChange={(e) => setDashStart(e.target.value)} /></div></div>
              <div className="field"><label>End</label><div className="date-input-clip"><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={dashEnd} onChange={(e) => setDashEnd(e.target.value)} /></div></div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="dash-filter-grid">
            <div className="dash-filter-card" style={{ position: "relative" }}>
              <button type="button" className="dash-filter-card-hit" onClick={() => setDriverDropdownOpen((v) => !v)}>
                <div className="dash-filter-icon-wrap"><Users size={16} /></div>
                <div className="dash-filter-body">
                  <div className="dash-filter-label">Drivers</div>
                  <div className="dash-filter-value-text">{dashDriverFilter.length === 0 ? "All Drivers" : `${dashDriverFilter.length} selected`}</div>
                </div>
                <ChevronDown size={14} color="var(--text-dim)" />
              </button>
              {driverDropdownOpen && (
                <>
                  <div className="color-picker-backdrop" onClick={() => setDriverDropdownOpen(false)} />
                  <div className="month-charge-popover dash-filter-popover">
                    <div className={`month-charge-item ${dashDriverFilter.length === 0 ? "selected" : ""}`} onClick={() => { setDashDriverFilter([]); setDriverDropdownOpen(false); }}>
                      <span>All Drivers</span>
                    </div>
                    {driverNames.map((d) => (
                      <div key={d} className={`month-charge-item ${dashDriverFilter.includes(d) ? "selected" : ""}`} onClick={() => toggleDriver(d)}>
                        <span>{d}</span>
                        {dashDriverFilter.includes(d) && <CheckCircle2 size={14} color="var(--accent)" />}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <FilterCard
              icon={Truck} label="Truck" value={dashTruckFilter} onChange={setDashTruckFilter} popoverKey="truck2"
              options={[{ value: "ALL", label: "All" }, ...truckNumbers.map((t) => ({ value: t, label: t }))]}
            />
          </div>

          <div className="dash-filter-grid">
            <FilterCard
              icon={Building2} label="Bill To / Broker" value={dashBillToFilter} onChange={setDashBillToFilter} popoverKey="billto"
              options={[{ value: "ALL", label: "All" }, ...billTos.map((b) => ({ value: b.name, label: b.name }))]}
            />
            <FilterCard
              icon={Calendar} label="Period" value={dashPeriod} onChange={onDashPeriodChange} popoverKey="period2"
              options={[{ value: "month", label: "This Month" }, { value: "lastMonth", label: "Last Month" }, { value: "year", label: "This Year" }, { value: "lastYear", label: "Last Year" }, { value: "custom", label: "Custom Range" }]}
            />
          </div>
          {dashPeriod === "custom" && (
            <div className="field-row" style={{ marginTop: 6 }}>
              <div className="field"><label>Start</label><div className="date-input-clip"><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={dashStart} onChange={(e) => setDashStart(e.target.value)} /></div></div>
              <div className="field"><label>End</label><div className="date-input-clip"><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={dashEnd} onChange={(e) => setDashEnd(e.target.value)} /></div></div>
            </div>
          )}
        </>
      ))}

      <button className="dash-update-btn-v2" onClick={runDashUpdate}><BarChart3 size={16} /> Update Report</button>

      <div style={{ fontSize: 11.5, color: "var(--text-dim)", margin: "16px 0 10px" }}>{fmtDate(dashReport.start)} – {fmtDate(dashReport.end)}</div>

      {isDispatcher ? (
        !dashReport.selectedName ? (
          <div className="empty-state">Select a dispatcher above and tap Update.</div>
        ) : (
          <>
            <div className="stub-total-gross-box" style={{ marginTop: 0, marginBottom: 12 }}>
              <span style={{ fontFamily: "'Oswald', sans-serif" }}>Company Gross - {MONTH_NAMES[parseInt((dashReport.start || "").slice(5, 7), 10) - 1]} {(dashReport.start || "").slice(0, 4)}</span>
              <span>{money(dashReport.companyGrossTotal)}</span>
            </div>
            <div className="report-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div className="stat-box"><div className="num">{compactMoney(dashReport.grossTotal)}</div><div className="lbl">Total Gross Revenue</div></div>
              <div className="stat-box"><div className="num" style={{ color: "var(--green)" }}>{compactMoney(dashReport.pay.earnings)}</div><div className="lbl">Dispatcher Earnings</div></div>
              <div className="stat-box"><div className="num">{dashReport.loadCount}</div><div className="lbl">Number of Loads</div></div>
              <div className="stat-box"><div className="num">${dashReport.avgPerMile.toFixed(2)}</div><div className="lbl">Avg Per Mile</div></div>
            </div>
            <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 4, marginBottom: 16 }}>
              Pay method: {dashReport.pay.method === "flat" ? `$${dashReport.pay.value.toFixed(2)} flat per load` : `${dashReport.pay.value}% of gross`}
              {dashReport.dispatcher && dashReport.dispatcher.payValue ? " (custom rate)" : " (global default rate)"}
            </div>

            <div className="section-label">Load History</div>
            {dashReport.loads.length === 0 && <div className="empty-state">No completed loads for this dispatcher in this period.</div>}
            {dashReport.loads.length > 0 && (
              <table className="stub-loads-table">
                <thead>
                  <tr><th>Load#</th><th>WO#</th><th>Date</th><th style={{ textAlign: "right" }}>Line Haul</th></tr>
                </thead>
                <tbody>
                  {dashReport.loads.map((l) => (
                    <tr key={l.id}>
                      <td>{l.loadNumber}</td>
                      <td>{l.workOrder || "—"}</td>
                      <td>{mmdd(l.deliveryDate || l.pickupDate)}</td>
                      <td style={{ textAlign: "right" }}>{money(l.rate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )
      ) : isCancellations ? (
        <>
          {dashReport.rows.length === 0 && <div className="empty-state">No cancellations recorded for this period.</div>}
          {dashReport.rows.length > 0 && (
            <>
              <table className="stub-loads-table">
                <thead>
                  <tr><th>#</th><th>Driver</th><th style={{ textAlign: "center" }}>Count</th><th style={{ textAlign: "right" }}>Total Paid</th></tr>
                </thead>
                <tbody>
                  {dashReport.rows.map((r, i) => (
                    <tr key={r.key}>
                      <td>{i + 1}</td>
                      <td>{r.key}</td>
                      <td style={{ textAlign: "center" }}>{r.count}</td>
                      <td style={{ textAlign: "right" }}>{money(r.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="stub-total-gross-box">
                <span>{dashReport.totalCount} Cancellation{dashReport.totalCount === 1 ? "" : "s"}</span>
                <span>{money(dashReport.grandTotal)}</span>
              </div>

              <div className="section-label">Individual Cancellations</div>
              <table className="stub-loads-table">
                <thead>
                  <tr><th>Driver</th><th>Truck</th><th>Trip</th><th>Note</th><th style={{ textAlign: "right" }}>Amount</th></tr>
                </thead>
                <tbody>
                  {dashReport.items.map((it, i) => (
                    <tr key={i}>
                      <td>{it.driver}</td>
                      <td>{it.truck || "—"}</td>
                      <td>{it.tripNumber || "—"}</td>
                      <td>{it.note}</td>
                      <td style={{ textAlign: "right" }}>{money(it.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </>
      ) : isDriverPay ? (
        <>
          {dashReport.items.length === 0 && <div className="empty-state">No paid driver statements for this period.</div>}
          {dashReport.items.length > 0 && (
            <>
              <table className="stub-loads-table">
                <thead>
                  <tr>
                    <th style={{ width: 28, textAlign: "center" }}>
                      <input type="checkbox" className="dp-check" checked={dpAllSelected} onChange={toggleDpAll} aria-label="Select all statements" />
                    </th>
                    <th>Driver</th><th>Period</th><th style={{ textAlign: "right" }}>Trips</th><th style={{ textAlign: "right" }}>Net Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {dashReport.items.map((it) => {
                    const on = !dpExcluded.has(it.id);
                    return (
                      <tr key={it.id} style={{ opacity: on ? 1 : 0.4 }}>
                        <td style={{ textAlign: "center" }}>
                          <input type="checkbox" className="dp-check" checked={on} onChange={() => toggleDpRow(it.id)} aria-label={`Include ${it.driver}`} />
                        </td>
                        <td>{it.driver}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{fmtPeriodShort(it.periodStart, it.periodEnd)}</td>
                        <td style={{ textAlign: "right" }}>{money(it.tripsGross)}</td>
                        <td style={{ textAlign: "right", color: it.netPay < 0 ? "var(--red)" : "var(--green)", fontWeight: 700 }}>{money(it.netPay)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="stub-total-gross-box">
                <span>Trips Gross · {dpSelected.length} of {dpItems.length} statement{dpItems.length === 1 ? "" : "s"}</span>
                <span>{money(dpTotalTrips)}</span>
              </div>
              <div className="stub-total-gross-box">
                <span>Net Driver Pay</span>
                <span style={{ color: dpTotalNet < 0 ? "var(--red)" : "var(--green)" }}>{money(dpTotalNet)}</span>
              </div>
              <button className="btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} disabled={dpSelected.length === 0} onClick={() => setPrintingDriverPay(true)}>
                <FileText size={16} /> Create PDF Report
              </button>
            </>
          )}
        </>
      ) : isMiles ? (
        <div className="dash-card-list">
          {dashReport.rows.length === 0 && <div className="empty-state">No completed loads match this period.</div>}
          {dashReport.rows.map((r) => (
            <div className="dash-card" key={r.key}>
              <div className="dash-card-top">
                <span className="dash-card-name" title={r.key}>{r.key}</span>
                <div className="dash-card-badge-wrap" onClick={() => viewGroupLoads(dashReport.groupBy, r.key, `${r.loads} load${r.loads === 1 ? "" : "s"} — ${r.key}`)}>
                  <span className="dash-card-badge-loads">{r.loads} load{r.loads === 1 ? "" : "s"}</span>
                  <ChevronRight size={14} color="var(--text-dim)" />
                </div>
              </div>
              <div className="dash-card-grid4">
                <div><div className="dash-card-grid4-lbl">Miles</div><div className="dash-card-grid4-val" style={{ color: "var(--accent)" }}>{r.miles.toLocaleString()}</div></div>
                <div><div className="dash-card-grid4-lbl">Empty</div><div className="dash-card-grid4-val">{r.emptyMiles.toLocaleString()}</div></div>
                <div><div className="dash-card-grid4-lbl">Gross</div><div className="dash-card-grid4-val">{compactMoney(r.gross)}</div></div>
                <div><div className="dash-card-grid4-lbl">$/mi</div><div className="dash-card-grid4-val">${r.revPerMile.toFixed(2)}</div></div>
              </div>
            </div>
          ))}
          {dashReport.rows.length > 0 && (
            <div className="dash-card dash-summary-card">
              <div className="dash-card-top">
                <span className="dash-card-name">Summary</span>
                <span className="dash-card-badge-loads">{dashReport.totals.loads} loads</span>
              </div>
              <div className="dash-card-grid4">
                <div><div className="dash-card-grid4-lbl">Total Miles</div><div className="dash-card-grid4-val" style={{ color: "var(--accent)" }}>{dashReport.totals.miles.toLocaleString()}</div></div>
                <div><div className="dash-card-grid4-lbl">Total Empty</div><div className="dash-card-grid4-val">{dashReport.totals.emptyMiles.toLocaleString()}</div></div>
                <div><div className="dash-card-grid4-lbl">Gross</div><div className="dash-card-grid4-val">{compactMoney(dashReport.totals.gross)}</div></div>
                <div><div className="dash-card-grid4-lbl">$/mi</div><div className="dash-card-grid4-val">${dashReport.totals.revPerMile.toFixed(2)}</div></div>
              </div>
            </div>
          )}
        </div>
      ) : isExpenses ? (
        <>
          <div style={{ fontSize: 11.5, color: "var(--text-dim)", marginBottom: 14 }}>{dashReport.tripCount} trip record{dashReport.tripCount === 1 ? "" : "s"} in this period</div>
          <div className="expense-report-list">
            {EXPENSE_REPORT_FIELDS.map((f) => (
              <div className="expense-report-row" key={f.key}>
                <span>{f.label}</span>
                <span style={{ color: f.key === "refunds" ? "var(--green)" : "var(--text)" }}>{money(dashReport.expenseTotals[f.key])}</span>
              </div>
            ))}
            <div className="expense-report-row" style={{ borderColor: "var(--accent)", background: "var(--surface-2)", marginTop: 8, padding: "16px 16px", fontSize: 14.5 }}>
              <span>Total Expenses (excl. Refunds)</span>
              <span>{money(dashReport.expenseGrandTotal)}</span>
            </div>
          </div>
        </>
      ) : isProfit ? (
        <>
          <div className="report-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div className="stat-box"><div className="num">{compactMoney(dashReport.totals.gross)}</div><div className="lbl">Total Gross</div></div>
            <div className="stat-box"><div className="num" style={{ color: "var(--green)" }}>{compactMoney(dashReport.totals.dispatchFee)}</div><div className="lbl">Company Profit</div></div>
          </div>
          <div className="dash-card-list">
            {dashReport.rows.length === 0 && <div className="empty-state">No completed loads match these filters.</div>}
            {dashReport.rows.map((r) => (
              <div className="dash-card" key={r.key}>
                <div className="dash-card-top">
                  <span className="dash-card-name" title={r.key}>{r.key}</span>
                  <div className="dash-card-badge-wrap" onClick={() => viewGroupLoads("driver", r.key, `${r.loads} load${r.loads === 1 ? "" : "s"} — ${r.key}`)}>
                    <span className="dash-card-badge-loads">{r.loads} load{r.loads === 1 ? "" : "s"}</span>
                    <ChevronRight size={14} color="var(--text-dim)" />
                  </div>
                </div>
                <div className="dash-card-grid2">
                  <div><div className="dash-card-grid4-lbl">Gross</div><div className="dash-card-grid4-val">{compactMoney(r.gross)}</div></div>
                  <div><div className="dash-card-grid4-lbl">Profit</div><div className="dash-card-grid4-val" style={{ color: "var(--green)" }}>{compactMoney(r.dispatchFee)}</div></div>
                </div>
              </div>
            ))}
            {dashReport.rows.length > 0 && (
              <div className="dash-card dash-summary-card">
                <div className="dash-card-top">
                  <span className="dash-card-name">Summary</span>
                  <span className="dash-card-badge-loads">{dashReport.totals.loads} loads</span>
                </div>
                <div className="dash-card-grid2">
                  <div><div className="dash-card-grid4-lbl">Total Gross</div><div className="dash-card-grid4-val">{compactMoney(dashReport.totals.gross)}</div></div>
                  <div><div className="dash-card-grid4-lbl">Total Profit</div><div className="dash-card-grid4-val" style={{ color: "var(--green)" }}>{compactMoney(dashReport.totals.dispatchFee)}</div></div>
                </div>
              </div>
            )}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 10, lineHeight: 1.5 }}>
            Company profit combines the dispatch fee earned on percent/flat/salary drivers' completed loads (each driver's own %, defaulting to {DEFAULT_DISPATCH_FEE}%) with the actual profit earned on per-mile/hourly drivers' and 0%-rate drivers' loads (Gross − Driver Pay − Company Expenses − Refunds).
          </div>
        </>
      ) : (
      <div className="dash-card-list">
        {dashReport.rows.length === 0 && <div className="empty-state">No completed loads match these filters.</div>}
        {dashReport.rows.map((r) => (
          <div className="dash-card" key={r.key}>
            <div className="dash-card-top">
              <span className="dash-card-name" title={r.key}>{r.key}</span>
              <div className="dash-card-badge-wrap" onClick={() => viewGroupLoads(dashReport.viewBy === "billto" ? "billTo" : dashReport.viewBy, r.key, `${r.loads} load${r.loads === 1 ? "" : "s"} — ${r.key}`)}>
                <span className="dash-card-badge-loads">{r.loads} load{r.loads === 1 ? "" : "s"}</span>
                <ChevronRight size={14} color="var(--text-dim)" />
              </div>
            </div>
            <div className="dash-card-grid4">
              <div><div className="dash-card-grid4-lbl">Gross</div><div className="dash-card-grid4-val">{compactMoney(r.gross)}</div></div>
              {!isBillTo && (
                <>
                  <div><div className="dash-card-grid4-lbl">Miles</div><div className="dash-card-grid4-val">{r.miles.toLocaleString()}</div></div>
                  <div><div className="dash-card-grid4-lbl">Empty</div><div className="dash-card-grid4-val">{r.emptyMiles ? r.emptyMiles.toLocaleString() : "-"}</div></div>
                  <div><div className="dash-card-grid4-lbl">$/mi</div><div className="dash-card-grid4-val">${r.revPerMile.toFixed(2)}</div></div>
                </>
              )}
            </div>
          </div>
        ))}
        {dashReport.rows.length > 0 && (
          <div className="dash-card dash-summary-card">
            <div className="dash-card-top">
              <span className="dash-card-name">Summary</span>
              <span className="dash-card-badge-loads">{dashReport.totals.loads} loads</span>
            </div>
            <div className="dash-card-grid4">
              <div><div className="dash-card-grid4-lbl">Total Gross</div><div className="dash-card-grid4-val">{compactMoney(dashReport.totals.gross)}</div></div>
              {!isBillTo && (
                <>
                  <div><div className="dash-card-grid4-lbl">Miles</div><div className="dash-card-grid4-val">{dashReport.totals.miles.toLocaleString()}</div></div>
                  <div><div className="dash-card-grid4-lbl">Empty</div><div className="dash-card-grid4-val">{dashReport.totals.emptyMiles ? dashReport.totals.emptyMiles.toLocaleString() : "-"}</div></div>
                  <div><div className="dash-card-grid4-lbl">$/mi</div><div className="dash-card-grid4-val">${dashReport.totals.revPerMile.toFixed(2)}</div></div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      )}
      {!isProfit && !isExpenses && !isMiles && !isDispatcher && !isCancellations && !isDriverPay && (
      <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 10, lineHeight: 1.5 }}>
        Based on completed loads only. Tap multiple drivers in the list to select more than one; leave none selected to include all.
      </div>
      )}

      {printingDriverPay && isDriverPay && (
        <div className="modal-overlay" onClick={() => setPrintingDriverPay(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="print-area stub-sheet">
              <div className="stub-header">
                <div>
                  {companyInfo && companyInfo.companyName ? <div className="stub-company">{companyInfo.companyName}</div> : null}
                  {companyInfo && companyInfo.companyAddress ? <div className="stub-company-line">{companyInfo.companyAddress}</div> : null}
                  <div className="stub-company-line">{[companyInfo && companyInfo.dotNumber ? `DOT ${companyInfo.dotNumber}` : "", companyInfo && companyInfo.companyEmail].filter(Boolean).join(" · ")}</div>
                  <h2 style={{ marginTop: 8 }}>Driver Pay Report</h2>
                </div>
                <div className="meta">
                  <div style={{ fontWeight: 700 }}>{dpSelected.length} statement{dpSelected.length === 1 ? "" : "s"}</div>
                  {fmtDate(dashReport.start)} – {fmtDate(dashReport.end)}
                </div>
              </div>

              <table className="stub-table">
                <thead><tr><th>Driver</th><th>Period</th><th style={{ textAlign: "right" }}>Trips</th><th style={{ textAlign: "right" }}>Net Pay</th></tr></thead>
                <tbody>
                  {dpSelected.map((it) => (
                    <tr key={it.id}>
                      <td>{it.driver}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{fmtPeriodShort(it.periodStart, it.periodEnd)}</td>
                      <td style={{ textAlign: "right" }}>{money(it.tripsGross)}</td>
                      <td style={{ textAlign: "right" }}>{money(it.netPay)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="stub-summary">
                <table>
                  <tbody>
                    <tr><td>Total Trips Gross</td><td style={{ textAlign: "right" }}>{money(dpTotalTrips)}</td></tr>
                    <tr className="net-row"><td>Total Net Driver Pay</td><td style={{ textAlign: "right" }}>{money(dpTotalNet)}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button className="btn no-print" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={() => generatePdf(driverPayReportFilename(dashReport.start, dashReport.end))}>
              <FileText size={16} /> Download PDF
            </button>
            <button className="btn secondary no-print" onClick={() => setPrintingDriverPay(false)}>Close</button>
          </div>
        </div>
      )}

      <div style={{ height: 40 }} aria-hidden="true" />
    </div>
  );
}

// ---- Oregon Permit (Fleet) ----
// Its own page with its own month, year and truck — nothing shared with Reports.
// Opens on last month: the one you file during the current month.
function OregonPermitPage({ setFleetView, loads, trips, truckNumbers, companyInfo, saveSettings, askConfirm }) {
  const [orRefDate, setOrRefDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
  });
  const [truck, setTruck] = useState("ALL");
  const orSelYear = parseInt(orRefDate.slice(0, 4), 10);
  const orSelMonth = parseInt(orRefDate.slice(5, 7), 10);
  function setOrMonthYear(year, month) {
    setOrRefDate(`${year}-${String(month).padStart(2, "0")}-01`);
  }
  const orReport = useMemo(() => {
    const mm = String(orSelMonth).padStart(2, "0");
    const start = `${orSelYear}-${mm}-01`;
    const end = `${orSelYear}-${mm}-${String(new Date(orSelYear, orSelMonth, 0).getDate()).padStart(2, "0")}`;
    const groups = {};
    (loads || []).forEach((l) => {
      if (l.status !== "completed" || !inRange(l.deliveryDate || l.pickupDate, start, end)) return;
      if (truck !== "ALL" && l.truck !== truck) return;
      const key = l.truck || "—";
      groups[key] = groups[key] || { miles: 0 };
      groups[key].miles += num(l.orMiles);
    });
    const rate = num(companyInfo.oregonPermitRate) || 0.251;
    const rows = Object.entries(groups)
      .map(([key, g]) => ({ key, miles: g.miles, amount: g.miles * rate }))
      .filter((r) => r.miles > 0)
      .sort((a, b) => b.miles - a.miles);
    const totalMiles = rows.reduce((sum, r) => sum + r.miles, 0);
    const totalAmount = rows.reduce((sum, r) => sum + r.amount, 0);
    return { rows, rate, totalMiles, totalAmount, start, end };
  }, [loads, truck, orSelYear, orSelMonth, companyInfo.oregonPermitRate]);

  return (
    <div>
      <button type="button" className="back-btn" onClick={() => setFleetView("menu")}><ChevronLeft size={18} /> Fleet</button>
      <div className="section-label">Oregon Permit</div>
      <>
          <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr" }}>
            <FilterCard
              icon={Truck} label="Truck" value={truck} onChange={setTruck} popoverKey="truck-or" fullWidth
              options={[{ value: "ALL", label: "All" }, ...truckNumbers.map((t) => ({ value: t, label: t }))]}
            />
          </div>
          <div className="dash-filter-grid">
            <ChevronStepperField
              icon={Calendar} value={orSelMonth} onChange={(v) => setOrMonthYear(orSelYear, parseInt(v, 10))} cyclic
              options={MONTH_NAMES.map((name, i) => {
                const mk = `${orSelYear}-${String(i + 1).padStart(2, "0")}`;
                const pay = (companyInfo.oregonPermitPayments || {})[mk];
                const filed = !!(companyInfo.oregonPermitFiled || {})[mk];
                const paidAmt = pay && num(pay.totalPaid);
                return {
                  value: i + 1, label: name, shortLabel: name.slice(0, 3),
                  amountText: paidAmt ? `${money(paidAmt)}${filed ? " ✓" : ""}` : undefined,
                  amountColor: filed ? "var(--green)" : undefined,
                };
              })}
            />
            <ChevronStepperField
              icon={Calendar} value={orSelYear} onChange={(v) => setOrMonthYear(parseInt(v, 10), orSelMonth)}
              options={Array.from({ length: 2040 - 2020 + 1 }, (_, i) => 2020 + i).map((y) => {
                const yearTotal = MONTH_NAMES.reduce((sum, _, mi) => {
                  const mk = `${y}-${String(mi + 1).padStart(2, "0")}`;
                  const pay = (companyInfo.oregonPermitPayments || {})[mk];
                  return sum + (pay ? num(pay.totalPaid) : 0);
                }, 0);
                return { value: y, label: String(y), amountText: yearTotal ? money(yearTotal) : undefined };
              })}
            />
          </div>
      </>
      <div style={{ height: 14 }} />
      <>
          {orReport.rows.length === 0 && <div className="empty-state">No Oregon miles recorded for this period.</div>}
          {orReport.rows.length > 0 && (() => {
            const orMonthKey = (orReport.start || "").slice(0, 7);
            const orMonthLabel = orMonthKey ? `${MONTH_NAMES[parseInt(orMonthKey.slice(5, 7), 10) - 1]} ${orMonthKey.slice(0, 4)}` : "this period";
            const orFiledAt = companyInfo.oregonPermitFiled && companyInfo.oregonPermitFiled[orMonthKey];
            const orFiled = !!orFiledAt;
            function setOrFiled(nextValue) {
              const next = { ...(companyInfo.oregonPermitFiled || {}) };
              if (nextValue) next[orMonthKey] = new Date().toISOString();
              else delete next[orMonthKey];
              saveSettings({ oregonPermitFiled: next });
            }
            function toggleOrFiled() {
              if (orFiled) { setOrFiled(false); return; }
              const orTotalPaidNow = num(companyInfo.oregonPermitPayments && companyInfo.oregonPermitPayments[orMonthKey] && companyInfo.oregonPermitPayments[orMonthKey].totalPaid);
              askConfirm(
                `Mark Oregon Permit as filed for ${orMonthLabel}, with a total of ${money(orTotalPaidNow)}?`,
                () => setOrFiled(true),
                { title: "Confirm Filing", confirmLabel: "Yes, Mark Filed", dangerous: false }
              );
            }
            return (
              <>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", border: "1.5px solid var(--accent)", borderRadius: 20, padding: "6px 20px", color: "var(--accent)", fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: 0.5 }}>
                    {MONTH_NAMES[parseInt(orMonthKey.slice(5, 7), 10) - 1].slice(0, 3)} {orMonthKey.slice(0, 4)}
                  </div>
                </div>
                <table className="stub-loads-table">
                  <thead>
                    <tr><th>#</th><th>Truck</th><th style={{ textAlign: "right" }}>Miles</th><th style={{ textAlign: "right" }}>Rate</th><th style={{ textAlign: "right" }}>Amount</th></tr>
                  </thead>
                  <tbody>
                    {orReport.rows.map((r, i) => (
                      <tr key={r.key}>
                        <td>{i + 1}</td>
                        <td>{r.key}</td>
                        <td style={{ textAlign: "right" }}>{r.miles.toLocaleString()}</td>
                        <td style={{ textAlign: "right" }}>${orReport.rate.toFixed(3)}</td>
                        <td style={{ textAlign: "right" }}>{money(r.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="stub-total-gross-box" style={{ flexWrap: "wrap", gap: 8 }}>
                  <span>{orReport.rows.length} Truck{orReport.rows.length === 1 ? "" : "s"} · {orReport.totalMiles.toLocaleString()} mi</span>
                  <span>{money(orReport.totalAmount)}</span>
                </div>
                {orFiled && (
                  <div style={{ fontSize: 11.5, color: "var(--green)", marginTop: 8, fontWeight: 600 }}>
                    ✓ Oregon Permit is filed for {orMonthLabel} — filed on {formatStoredTimestamp(orFiledAt)}.
                  </div>
                )}
                {(() => {
                  const orPayments = companyInfo.oregonPermitPayments || {};
                  const orPay = orPayments[orMonthKey] || {};
                  function saveOrPayment(field, value) {
                    const nextMonth = { ...orPay, [field]: value };
                    // Total Paid auto-tracks Amount + Service Fee — recalculated
                    // right here, atomically, whenever either of those two
                    // fields changes, so there's no separate save call that
                    // could race against this one and overwrite it.
                    if (field === "amount" || field === "serviceFee") {
                      nextMonth.totalPaid = String(num(nextMonth.amount) + num(nextMonth.serviceFee));
                    }
                    saveSettings({ oregonPermitPayments: { ...orPayments, [orMonthKey]: nextMonth } });
                  }
                  const expensesOrTotal = (trips || [])
                    .filter((t) => (t.startDate || "").slice(0, 7) === orMonthKey)
                    .reduce((s, t) => s + num(t.orPermit), 0);
                  const orDifference = expensesOrTotal - num(orPay.totalPaid);
                  const rowStyle = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--border)" };
                  const inputStyle = { width: 145, textAlign: "right", background: "#FFFFFF", color: "#14181F", border: "1px solid var(--border)", borderRadius: 8, padding: "7px 9px", fontSize: 13, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 };
                  return (
                    <div style={{ marginTop: 18, background: "var(--surface-2)", borderRadius: 12, padding: "4px 14px", marginBottom: 20 }}>
                      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-dim)", fontWeight: 700, marginTop: 10, marginBottom: 2 }}>
                        Payment Tracking — {orMonthLabel}
                      </div>
                      <div style={rowStyle}>
                        <span style={{ fontSize: 13, color: "var(--text)" }}>Oregon Permit Amount</span>
                        <input key={`${orMonthKey}-amount`} type="number" step="0.01" defaultValue={orPay.amount || ""} placeholder="0.00" style={inputStyle} onBlur={(e) => saveOrPayment("amount", e.target.value)} />
                      </div>
                      <div style={rowStyle}>
                        <span style={{ fontSize: 13, color: "var(--text)" }}>Service Fee</span>
                        <input key={`${orMonthKey}-serviceFee`} type="number" step="0.01" defaultValue={orPay.serviceFee || ""} placeholder="0.00" style={inputStyle} onBlur={(e) => saveOrPayment("serviceFee", e.target.value)} />
                      </div>
                      <div style={rowStyle}>
                        <span style={{ fontSize: 13, color: "var(--text)" }}>Total Paid</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <button
                            type="button"
                            onClick={toggleOrFiled}
                            style={orFiled
                              ? { display: "flex", alignItems: "center", gap: 5, background: "var(--green)", border: "none", borderRadius: 8, padding: "9px 14px", color: "#0E2318", fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 12.5, cursor: "pointer", flexShrink: 0 }
                              : { display: "flex", alignItems: "center", gap: 5, background: "var(--accent)", border: "none", borderRadius: 8, padding: "9px 14px", color: "#1A1300", fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 12.5, cursor: "pointer", flexShrink: 0, boxShadow: "0 2px 6px rgba(242,169,59,0.4)" }}
                          >
                            {orFiled ? <><CheckCircle2 size={13} /> Filed</> : "Mark Filed"}
                          </button>
                          <input key={`${orMonthKey}-totalPaid-${orPay.totalPaid || ""}`} type="number" step="0.01" defaultValue={orPay.totalPaid || ""} placeholder="0.00" style={inputStyle} onBlur={(e) => saveOrPayment("totalPaid", e.target.value)} />
                        </div>
                      </div>
                      <div style={rowStyle}>
                        <span style={{ fontSize: 13, color: "var(--text)" }}>Total from Expenses (Trips)</span>
                        <span style={{ ...inputStyle, background: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)" }}>{money(expensesOrTotal)}</span>
                      </div>
                      <div style={rowStyle}>
                        <span style={{ fontSize: 13, color: "var(--text)" }}>Difference (Expenses − Paid)</span>
                        <span style={{ ...inputStyle, background: "var(--surface)", border: "1px solid var(--border)", color: orDifference >= 0 ? "var(--green)" : "var(--red)", fontWeight: 700 }}>{money(orDifference)}</span>
                      </div>
                      <div style={{ ...rowStyle, borderBottom: "none" }}>
                        <span style={{ fontSize: 13, color: "var(--text)" }}>Notes</span>
                        <input
                          key={`${orMonthKey}-notes`}
                          type="text"
                          defaultValue={orPay.notes || ""}
                          placeholder="Optional notes"
                          style={{ ...inputStyle, textAlign: "left", fontFamily: "Inter, sans-serif", fontWeight: 400 }}
                          onBlur={(e) => saveOrPayment("notes", e.target.value)}
                        />
                      </div>
                    </div>
                  );
                })()}
              </>
            );
          })()}
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 10, marginBottom: 40, lineHeight: 1.5 }}>
            Oregon Miles are entered per load and summed by truck. Rate comes from Fleet → Settings — currently ${orReport.rate.toFixed(3)}/mile.
          </div>
      </>
    </div>
  );
}

// ---- Annual Tax Report (Fleet) ----
// Shows every driver's yearly earnings, so it stays behind the same PIN as the
// Dash tab. Unlocking either one unlocks both for the session.
function AnnualTaxPage({ setFleetView, annualTaxYear, setAnnualTaxYear, annualTaxReport, annualTaxTotalsByYear, companyInfo, dashUnlocked, setDashUnlocked }) {
  const [printingTaxDriver, setPrintingTaxDriver] = useState(null);
  const [printingTaxAll, setPrintingTaxAll] = useState(false);
  const [pinEntry, setPinEntry] = useState("");
  const [pinError, setPinError] = useState("");
  const locked = !!companyInfo.pinCode && !dashUnlocked;
  return (
    <div>
      <button type="button" className="back-btn" onClick={() => setFleetView("menu")}><ChevronLeft size={18} /> Fleet</button>
      <div className="section-label">Annual Tax Report</div>
      {locked ? (
        <div className="pin-lock-screen">
          <div className="pin-lock-icon">🔒</div>
          <div className="section-label" style={{ marginTop: 14, textAlign: "center" }}>Enter PIN</div>
          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pinEntry}
            onChange={(e) => { setPinEntry(e.target.value.replace(/\D/g, "").slice(0, 4)); setPinError(""); }}
            className="pin-input"
            placeholder="••••"
            autoFocus
          />
          {pinError && <div style={{ color: "var(--red)", fontSize: 12, marginTop: 8, textAlign: "center" }}>{pinError}</div>}
          <button
            className="btn"
            style={{ marginTop: 16 }}
            onClick={() => {
              if (pinEntry === companyInfo.pinCode) { setDashUnlocked(true); setPinEntry(""); setPinError(""); }
              else { setPinError("Incorrect PIN"); setPinEntry(""); }
            }}
          >
            Unlock
          </button>
        </div>
      ) : (
        <>
        <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr" }}>
          <ChevronStepperField
            icon={Calendar} value={annualTaxYear} onChange={(v) => setAnnualTaxYear(Number(v))}
            options={(() => {
              const y = new Date().getFullYear();
              const arr = [];
              for (let i = y - 6; i <= y; i++) {
                const total = (annualTaxTotalsByYear || {})[String(i)];
                arr.push({ value: i, label: String(i), amountText: total ? money(total) : undefined });
              }
              return arr;
            })()}
          />
        </div>
        <>
          <div className="section-label-row" style={{ marginTop: 4 }}>
            <div className="section-label" style={{ marginTop: 0 }}>{annualTaxReport.year} Driver Earnings</div>
            {annualTaxReport.rows.length > 0 && (
              <button type="button" className="add-trip-btn" onClick={() => setPrintingTaxAll(true)}><FileText size={14} /> All Drivers PDF</button>
            )}
          </div>
          {annualTaxReport.rows.length === 0 && <div className="empty-state">No completed loads found for {annualTaxReport.year}.</div>}
          {annualTaxReport.rows.length > 0 && (
            <>
              <table className="stub-loads-table">
                <thead>
                  <tr><th>#</th><th>Driver</th><th>EIN/SSN</th><th>{"Loads/Miles"}</th><th style={{ textAlign: "right" }}>Annual Income</th><th></th></tr>
                </thead>
                <tbody>
                  {annualTaxReport.rows.map((r, i) => (
                    <tr key={r.driver.id}>
                      <td>{i + 1}</td>
                      <td>{r.driver.name}</td>
                      <td>{r.driver.taxId || "—"}</td>
                      <td>{r.isMileage ? `${r.totalMiles.toLocaleString()} mi` : `${r.loadCount} loads`}</td>
                      <td style={{ textAlign: "right", fontWeight: 700 }}>{money(r.total)}</td>
                      <td style={{ textAlign: "right" }}>
                        <button type="button" className="mini-icon-btn" title="Download PDF" onClick={() => setPrintingTaxDriver(r)}><FileText size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="stub-total-gross-box">
                <span>{annualTaxReport.rows.length} Driver{annualTaxReport.rows.length === 1 ? "" : "s"}</span>
                <span>{money(annualTaxReport.grandTotal)}</span>
              </div>
            </>
          )}
        </>
      {printingTaxDriver && (
        <div className="modal-overlay" onClick={() => setPrintingTaxDriver(null)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="print-area stub-sheet">
              <div className="stub-header2">
                <div className="stub-header2-top">
                  <div className="stub-brand">
                    {companyInfo && companyInfo.companyLogoDataUri && <img src={companyInfo.companyLogoDataUri} alt="Company logo" className="stub-logo2-fixed" />}
                    <div className="stub-brand-text">
                      {companyInfo && companyInfo.companyName ? <div className="stub-company2">{companyInfo.companyName}</div> : null}
                      {companyInfo && companyInfo.companyAddress ? <div className="stub-company2-line">{companyInfo.companyAddress}</div> : null}
                    </div>
                  </div>
                  <div className="stub-meta2">
                    <div className="stub-meta2-num">Tax Year {annualTaxReport.year}</div>
                  </div>
                </div>
                <div className="stub-title-row">
                  <div className="stub-title2">Annual Tax Report</div>
                  <div className="stub-driver2">{printingTaxDriver.driver.name}</div>
                </div>
              </div>
              <table className="stub-table">
                <tbody>
                  {printingTaxDriver.driver.taxId && <tr><td style={{ color: "#4D4D4D" }}>EIN / SSN</td><td style={{ textAlign: "right" }}>{printingTaxDriver.driver.taxId}</td></tr>}
                  {printingTaxDriver.isMileage && <tr><td style={{ color: "#4D4D4D" }}>Total Miles Driven</td><td style={{ textAlign: "right" }}>{printingTaxDriver.totalMiles.toLocaleString()} mi</td></tr>}
                  {printingTaxDriver.isMileage && <tr><td style={{ color: "#4D4D4D" }}>Rate</td><td style={{ textAlign: "right" }}>${num(printingTaxDriver.driver.rate).toFixed(2)}/mi</td></tr>}
                  <tr><td style={{ color: "#4D4D4D" }}>Total Loads</td><td style={{ textAlign: "right" }}>{printingTaxDriver.loadCount}</td></tr>
                  {printingTaxDriver.trucksUsed.length > 0 && <tr><td style={{ color: "#4D4D4D" }}>Truck(s)</td><td style={{ textAlign: "right" }}>{printingTaxDriver.trucksUsed.join(", ")}</td></tr>}
                </tbody>
              </table>
              <div className="stub-summary">
                <table>
                  <tbody>
                    <tr className="net-row"><td>Total Annual Income</td><td style={{ textAlign: "right" }}>{money(printingTaxDriver.total)}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button className="btn no-print" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={() => generatePdf(annualTaxFilename(printingTaxDriver.driver.name, printingTaxDriver.trucksUsed[0], annualTaxReport.year))}><Printer size={16} /> Download PDF</button>
            <button className="btn secondary no-print" onClick={() => setPrintingTaxDriver(null)}>Close</button>
          </div>
        </div>
      )}

      {printingTaxAll && (
        <div className="modal-overlay" onClick={() => setPrintingTaxAll(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="print-area stub-sheet">
              <div className="stub-header2">
                <div className="stub-header2-top">
                  <div className="stub-brand">
                    {companyInfo && companyInfo.companyLogoDataUri && <img src={companyInfo.companyLogoDataUri} alt="Company logo" className="stub-logo2-fixed" />}
                    <div className="stub-brand-text">
                      {companyInfo && companyInfo.companyName ? <div className="stub-company2">{companyInfo.companyName}</div> : null}
                      {companyInfo && companyInfo.companyAddress ? <div className="stub-company2-line">{companyInfo.companyAddress}</div> : null}
                    </div>
                  </div>
                  <div className="stub-meta2">
                    <div className="stub-meta2-num">Tax Year {annualTaxReport.year}</div>
                  </div>
                </div>
                <div className="stub-title-row">
                  <div className="stub-title2">Annual Tax Report</div>
                  <div className="stub-driver2">All Drivers</div>
                </div>
              </div>
              <table className="stub-table">
                <thead><tr><th>#</th><th>Driver</th><th>EIN/SSN</th><th>Loads/Miles</th><th style={{ textAlign: "right" }}>Annual Income</th></tr></thead>
                <tbody>
                  {annualTaxReport.rows.map((r, i) => (
                    <tr key={r.driver.id}>
                      <td>{i + 1}</td>
                      <td>{r.driver.name}</td>
                      <td>{r.driver.taxId || "—"}</td>
                      <td>{r.isMileage ? `${r.totalMiles.toLocaleString()} mi` : `${r.loadCount} loads`}</td>
                      <td style={{ textAlign: "right" }}>{money(r.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="stub-summary">
                <table>
                  <tbody>
                    <tr className="net-row"><td>Total (All Drivers)</td><td style={{ textAlign: "right" }}>{money(annualTaxReport.grandTotal)}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button className="btn no-print" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={() => generatePdf(annualTaxAllFilename(annualTaxReport.year))}><Printer size={16} /> Download PDF</button>
            <button className="btn secondary no-print" onClick={() => setPrintingTaxAll(false)}>Close</button>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
}

function DispatcherStubTab(p) {
  const { dispatchers, loads, dispatcherStubHistory, computeDispatcherStub, saveAndPrintDispatcherStub, voidDispatcherStub, askConfirm, companyInfo } = p;
  const [selectedDispatcher, setSelectedDispatcher] = useState("");
  const [subTab, setSubTab] = useState("unpaid"); // "unpaid" | "paid"
  const [mode, setMode] = useState("history"); // "history" | "generate"
  const [genStart, setGenStart] = useState(daysAgoISO(30));
  const [genEnd, setGenEnd] = useState(todayISO());
  // Same already-paid freeze for dispatcher statements.
  const genMinDate = useMemo(() => {
    if (!selectedDispatcher) return undefined;
    const ends = (dispatcherStubHistory || []).filter((h) => h.dispatcherName === selectedDispatcher && !h.voided && h.periodEnd).map((h) => h.periodEnd);
    return ends.length ? nextDayISO(ends.reduce((m, d) => (d > m ? d : m))) : undefined;
  }, [dispatcherStubHistory, selectedDispatcher]);
  const [genDateRejected, setGenDateRejected] = useState(false);
  function guardGenDate(v, apply) {
    if (genMinDate && v && v < genMinDate) {
      setGenDateRejected(true);
      setTimeout(() => setGenDateRejected(false), 2500);
      return;
    }
    apply(v);
  }
  const [viewingRecord, setViewingRecord] = useState(null);

  const unpaidLoads = selectedDispatcher
    ? loads.filter((l) => l.dispatcher === selectedDispatcher && l.status === "completed" && (l.dispatcherPaidStatus || "unpaid") !== "paid").sort((a, b) => (b.loadNumber || 0) - (a.loadNumber || 0))
    : [];
  const dispatcherStubs = selectedDispatcher
    ? dispatcherStubHistory.filter((h) => h.dispatcherName === selectedDispatcher && !h.voided).sort((a, b) => (b.generatedAt || "").localeCompare(a.generatedAt || ""))
    : [];

  if (viewingRecord) {
    const r = viewingRecord;
    const snaps = r.loadSnapshots || [];
    const half = Math.ceil(snaps.length / 2);
    const col1 = snaps.slice(0, half);
    const col2 = snaps.slice(half);
    return (
      <div>
        <button type="button" className="back-btn no-print" onClick={() => setViewingRecord(null)}><ChevronLeft size={18} /> Dispatcher Statements</button>
        <div className="print-area stub-sheet">
          <div className="stub-header2">
            <div className="stub-header2-top">
              <div className="stub-brand">
                {companyInfo && companyInfo.companyLogoDataUri && <img src={companyInfo.companyLogoDataUri} alt="Company logo" className="stub-logo2-fixed" />}
                <div className="stub-brand-text">
                  {companyInfo && companyInfo.companyName ? <div className="stub-company2">{companyInfo.companyName}</div> : null}
                  {companyInfo && companyInfo.companyAddress ? <div className="stub-company2-line">{companyInfo.companyAddress}</div> : null}
                </div>
              </div>
              <div className="stub-meta2">
                <div className="stub-meta2-num">{r.dispatcherName}</div>
                <div className="stub-meta2-line">{r.generatedAt ? fmtDate(r.generatedAt.slice(0, 10)) : ""}</div>
              </div>
            </div>
            <div className="stub-title-row">
              <div className="stub-title2">Dispatcher Statement</div>
              <div className="stub-driver2">{money(r.earnings)}</div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: "#4D4D4D" }}>
              Period: {fmtDate(r.periodStart)} – {fmtDate(r.periodEnd)} · {r.loadCount} load{r.loadCount === 1 ? "" : "s"}
            </div>
            <div style={{ fontSize: 11, color: "#4D4D4D", textAlign: "right" }}>
              Company Total Gross: {money(loads.filter((l) => l.status === "completed" && inRange(l.deliveryDate || l.pickupDate, r.periodStart, r.periodEnd)).reduce((s, l) => s + num(l.rate), 0))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 16 }}>
            <table className="pay-grid-table" style={{ flex: 1 }}>
              <thead><tr><th>WO#</th><th>Date</th><th style={{ textAlign: "right" }}>Rate</th></tr></thead>
              <tbody>
                {col1.map((l) => (
                  <tr key={l.loadId}><td>{l.workOrder || l.loadNumber}</td><td>{mmdd(l.date)}</td><td className="rate-cell" style={{ textAlign: "right" }}>{money(l.rate)}</td></tr>
                ))}
              </tbody>
            </table>
            <table className="pay-grid-table" style={{ flex: 1 }}>
              <thead><tr><th>WO#</th><th>Date</th><th style={{ textAlign: "right" }}>Rate</th></tr></thead>
              <tbody>
                {col2.map((l) => (
                  <tr key={l.loadId}><td>{l.workOrder || l.loadNumber}</td><td>{mmdd(l.date)}</td><td className="rate-cell" style={{ textAlign: "right" }}>{money(l.rate)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <table className="pay-grid-summary">
            <tbody>
              <tr><td>Total Gross</td><td>{money(r.grossTotal)}</td></tr>
              <tr><td>Pay Method</td><td>{r.payMethod === "flat" ? `$${num(r.payValue).toFixed(2)}/load` : `${r.payValue}%`}</td></tr>
              <tr className="net-row"><td>Total Earnings</td><td>{money(r.earnings)}</td></tr>
            </tbody>
          </table>
        </div>
        <button className="btn no-print" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={() => generatePdf(dispatcherPayFilename(r))}><Printer size={16} /> Download PDF</button>
        <button className="btn danger no-print" onClick={() => askConfirm("Void this dispatcher statement? Its loads will move back to Unpaid.", () => { voidDispatcherStub(r); setViewingRecord(null); })}>Void This Statement</button>
      </div>
    );
  }

  if (mode === "generate") {
    const stubData = computeDispatcherStub(selectedDispatcher, genStart, genEnd);
    return (
      <div>
        <button type="button" className="back-btn" onClick={() => setMode("history")}><ChevronLeft size={18} /> Dispatcher Statements</button>
        <div className="section-label" style={{ marginTop: 0 }}>Generate Statement — {selectedDispatcher}</div>
        <div className="field-row">
          <div className="field"><label>Start</label><div className="date-input-clip"><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} min={genMinDate} value={genStart} onChange={(e) => guardGenDate(e.target.value, setGenStart)} /></div></div>
          <div className="field"><label>End</label><div className="date-input-clip"><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} min={genMinDate} value={genEnd} onChange={(e) => guardGenDate(e.target.value, setGenEnd)} /></div></div>
        </div>
        {genDateRejected && (
          <div style={{ fontSize: 11.5, color: "var(--red)", marginTop: -4, marginBottom: 10, fontWeight: 600 }}>
            That date is already paid — pick {fmtDate(genMinDate)} or later.
          </div>
        )}
        {stubData.loadCount === 0 ? (
          <div className="empty-state">No unpaid completed loads for this dispatcher in this period.</div>
        ) : (
          <>
            <div className="pay-summary-box">
              <div className="pay-summary-row"><span>Loads</span><span>{stubData.loadCount}</span></div>
              <div className="pay-summary-row"><span>Total Gross</span><span>{money(stubData.grossTotal)}</span></div>
              <div className="pay-summary-row"><span>Pay Method</span><span>{stubData.pay.method === "flat" ? `$${stubData.pay.value.toFixed(2)}/load` : `${stubData.pay.value}%`}</span></div>
              <div className="pay-summary-row net"><span>Total Earnings</span><span style={{ color: "var(--green)" }}>{money(stubData.pay.earnings)}</span></div>
            </div>
            <button className="btn" onClick={() => saveAndPrintDispatcherStub(selectedDispatcher, genStart, genEnd, stubData).then(() => setMode("history"))}>Generate &amp; Print</button>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="dash-filter-grid" style={{ gridTemplateColumns: selectedDispatcher ? "1fr auto" : "1fr", alignItems: "center" }}>
        <TypeableFilterCard
          icon={Users} label="Dispatcher" value={selectedDispatcher} onChange={setSelectedDispatcher}
          options={[{ value: "", label: "Select…" }, ...dispatchers.map((d) => ({ value: d.name, label: d.name }))]}
        />
        {selectedDispatcher && (
          <button type="button" className="btn" style={{ marginTop: 0, width: "auto", padding: "10px 16px", flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }} onClick={() => setMode("generate")}>
            <Plus size={14} /> Generate New
          </button>
        )}
      </div>

      {!selectedDispatcher && <div className="empty-state">Select a dispatcher to view their statement history.</div>}

      {selectedDispatcher && (
        <>
          <div className="driver-subnav">
            <button className={`driver-subnav-btn ${subTab === "unpaid" ? "active" : ""}`} onClick={() => setSubTab("unpaid")}>Unpaid</button>
            <button className={`driver-subnav-btn ${subTab === "paid" ? "active" : ""}`} onClick={() => setSubTab("paid")}>Paid</button>
          </div>

          {subTab === "unpaid" && (
            <>
              {unpaidLoads.length === 0 && <div className="empty-state">No unpaid completed loads.</div>}
              {unpaidLoads.length > 0 && (
                <>
                  <table className="stub-loads-table">
                    <thead>
                      <tr><th>Load#</th><th>WO#</th><th>Date</th><th style={{ textAlign: "right" }}>Rate</th></tr>
                    </thead>
                    <tbody>
                      {unpaidLoads.map((l) => (
                        <tr key={l.id}>
                          <td>{l.loadNumber}</td>
                          <td>{l.workOrder || "—"}</td>
                          <td>{mmdd(l.deliveryDate || l.pickupDate)}</td>
                          <td style={{ textAlign: "right" }}>{money(l.rate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="stub-total-gross-box">
                    <span>{unpaidLoads.length} Unpaid Load{unpaidLoads.length === 1 ? "" : "s"}</span>
                    <span>{money(unpaidLoads.reduce((s, l) => s + num(l.rate), 0))}</span>
                  </div>
                </>
              )}
            </>
          )}

          {subTab === "paid" && (
            <>
              {dispatcherStubs.length === 0 && <div className="empty-state">No statements generated yet.</div>}
              {dispatcherStubs.map((h) => (
                <div className="statement-card" key={h.id} onClick={() => setViewingRecord(h)}>
                  <div className="statement-card-top-row">
                    <span className="statement-card-date">{h.generatedAt ? fmtDate(h.generatedAt.slice(0, 10)) : fmtDate(h.periodEnd)}</span>
                  </div>
                  <div className="statement-card-row">
                    <span>{h.loadCount} load{h.loadCount === 1 ? "" : "s"}</span>
                    <span className="statement-card-amt">{money(h.earnings)}</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

function PayStubTab(p) {
  const {
    stubDriver, setStubDriver, driverByName, driverNames, setStubDisplayAs, stubDisplayAs,
    stubStart, setStubStart, stubEnd, setStubEnd, stub, resolveDisplayName, saveAndPrintStub,
    viewingStubRecord, setViewingStubRecord, voidPayStub, askConfirm,
    companyInfo, loads, history, trips,
  } = p;
  // Freeze already-paid days, like the Trips calendar: the day after this
  // driver's latest paid statement is the earliest date either field accepts.
  const stubMinDate = useMemo(() => {
    if (!stubDriver) return undefined;
    const ends = (history || []).filter((h) => h.driverName === stubDriver && !h.voided && h.periodEnd).map((h) => h.periodEnd);
    return ends.length ? nextDayISO(ends.reduce((m, d) => (d > m ? d : m))) : undefined;
  }, [history, stubDriver]);
  const [stubDateRejected, setStubDateRejected] = useState(false);
  // iPhone date pickers don't always enforce "min", so check the picked value too.
  function guardStubDate(v, apply) {
    if (stubMinDate && v && v < stubMinDate) {
      setStubDateRejected(true);
      setTimeout(() => setStubDateRejected(false), 2500);
      return;
    }
    apply(v);
  }
  const [stubMode, setStubMode] = useState("history"); // "history" | "generate"
  const [lastGenSignature, setLastGenSignature] = useState(null);
  const [showFullPdf, setShowFullPdf] = useState(false);
  const [historySubTab, setHistorySubTab] = useState("unpaid"); // "unpaid" | "paid"

  useEffect(() => { setStubMode("history"); setLastGenSignature(null); }, [stubDriver]);
  useEffect(() => { setLastGenSignature(null); }, [stubStart, stubEnd]);
  useEffect(() => { setShowFullPdf(false); }, [viewingStubRecord && viewingStubRecord.id]);

  const currentSignature = stub ? `${stubDriver}|${stubStart}|${stubEnd}|${stub.loadPays.map((l) => l.id).sort().join(",")}` : null;
  const alreadyGenerated = currentSignature !== null && currentSignature === lastGenSignature;

  async function handleGenerate() {
    if (alreadyGenerated) return;
    const sig = currentSignature;
    await saveAndPrintStub();
    setLastGenSignature(sig);
    setStubMode("history");
  }

  if (viewingStubRecord) {
    const r = viewingStubRecord;
    const loadsById = Object.fromEntries((loads || []).map((ld) => [ld.id, ld]));
    const tripsById = Object.fromEntries((trips || []).map((t) => [t.id, t]));
    const relatedTrips = (r.tripIds || []).map((id) => tripsById[id]).filter(Boolean);
    const totalGross = (r.loadSnapshots || []).reduce((s, l) => {
      const live = loadsById[l.loadId];
      return s + (live ? num(live.rate) : num(l.driverPay));
    }, 0);
    if (!showFullPdf) {
      return (
        <div>
          <button type="button" className="back-btn" onClick={() => setViewingStubRecord(null)}><ChevronLeft size={18} /> Statement History</button>
          <div className="section-label" style={{ marginTop: 0 }}>Pay #{String(r.stubNumber || 0).padStart(4, "0")} — {r.displayedAs || r.driverName}</div>
          <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 18, lineHeight: 1.6 }}>
            {r.generatedAt ? fmtDate(r.generatedAt.slice(0, 10)) : ""} · Net Pay <strong style={{ color: "var(--text)" }}>{money(r.netPay)}</strong>
            {relatedTrips.length > 0 && (
              <><br />Related Trips: {relatedTrips.map((t) => `Trip ${t.tripNumber} (Truck ${t.truck})`).join(", ")}</>
            )}
          </div>

          <div className="section-label">Related Loads</div>
          {(!r.loadSnapshots || r.loadSnapshots.length === 0) ? (
            <div className="empty-state">Salary pay period — not tied to individual loads.</div>
          ) : (
            <table className="stub-loads-table">
              <thead>
                <tr><th>Load#</th><th>WO#</th><th>Date</th><th>Status</th><th style={{ textAlign: "right" }}>Rate</th></tr>
              </thead>
              <tbody>
                {(r.loadSnapshots || []).map((l) => {
                  const live = loadsById[l.loadId];
                  const paidState = live ? (live.paidStatus || "unpaid") : "paid";
                  return (
                    <tr key={l.loadId}>
                      <td>{l.loadNumber}</td>
                      <td>{live && live.workOrder ? live.workOrder : "—"}</td>
                      <td>{live ? mmdd(live.deliveryDate || live.pickupDate) : "—"}</td>
                      <td><span className={`paid-pill ${paidState}`}>{paidState}</span></td>
                      <td style={{ textAlign: "right" }}>{money(live ? live.rate : l.driverPay)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {r.loadSnapshots && r.loadSnapshots.length > 0 && (
            <div className="stub-total-gross-box">
              <span>Total Gross</span>
              <span>{money(totalGross)}</span>
            </div>
          )}

          <button
            className="btn auto-calc-btn"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 22, padding: 16, fontSize: 15 }}
            onClick={() => setShowFullPdf(true)}
          >
            <FileText size={18} /> View Full PDF Statement
          </button>
        </div>
      );
    }
    return (
      <div>
        <button type="button" className="back-btn no-print" onClick={() => setShowFullPdf(false)}><ChevronLeft size={18} /> Back to Loads</button>
        <div className="print-area stub-sheet">
          <div className="stub-header2">
            <div className="stub-three-col">
              <div className="stub-brand-text stub-col-left">
                {companyInfo && companyInfo.companyName ? <div className="stub-company2">{companyInfo.companyName}</div> : null}
                {companyInfo && companyInfo.companyAddress ? <div className="stub-company2-line">{companyInfo.companyAddress}</div> : null}
                {companyInfo && companyInfo.companyEmail ? <div className="stub-company2-line">{companyInfo.companyEmail}</div> : null}
                {companyInfo && companyInfo.dotNumber ? <div className="stub-company2-line">DOT {companyInfo.dotNumber}</div> : null}
              </div>
              {companyInfo && companyInfo.companyLogoDataUri && <img src={companyInfo.companyLogoDataUri} alt="Company logo" className="stub-logo-mid" />}
              <div className="stub-driver-block stub-col-right">
                <div className="stub-driver-name">{r.displayedAs || r.driverName}</div>
                {r.trucksUsed && r.trucksUsed.length ? <div className="stub-driver-truck">Truck{r.trucksUsed.length > 1 ? "s" : ""} {r.trucksUsed.join(", ")}</div> : null}
              </div>
            </div>
            <div className="stub-title-row">
              <div className="stub-title2">Payment Statement</div>
            </div>
            <div className="stub-topline-row">
              <div className="stub-topline-side"><div className="stub-networth-line">Net Pay: {money(r.netPay)}</div></div>
              <div className="stub-topline-center"><div className="stub-gen-date">{r.generatedAt ? mmddyyyySlash(r.generatedAt.slice(0, 10)) : ""}</div></div>
              <div className="stub-topline-side"><div className="stub-tripnum-line">{relatedTrips.length > 0 ? relatedTrips.map((t) => `Trip #${t.tripNumber}`).join(", ") : ""}</div></div>
            </div>
            <div className="stub-subline-row">
              <div className="stub-miles-line">Total Miles: {(r.loadSnapshots || []).reduce((s, l) => s + num(l.miles), 0).toLocaleString()} mi</div>
              <div className="stub-period-line">Pay Period: {payPeriodLabel(r.periodStart, r.periodEnd)} · {(r.loadSnapshots || []).length} load{(r.loadSnapshots || []).length === 1 ? "" : "s"}</div>
            </div>
          </div>
          <table className="pay-grid-table">
            <thead><tr><th>Load#</th><th>Date</th><th>Pick Up</th><th>Delivery</th><th style={{ textAlign: "right" }}>Rate</th></tr></thead>
            <tbody>
              {(!r.loadSnapshots || r.loadSnapshots.length === 0) && <tr><td colSpan={5} style={{ color: "#999" }}>Salary pay period — not tied to individual loads.</td></tr>}
              {(r.loadSnapshots || []).map((l) => (
                <tr key={l.loadId}>
                  <td>{l.loadNumber}</td>
                  <td>{mmdd(l.pickupDate)}</td>
                  <td>{l.stops ? pickupCityState(l) : "—"}</td>
                  <td>{l.stops ? deliveryCityState(l) : "—"}</td>
                  <td className="rate-cell" style={{ textAlign: "right" }}>{money(l.driverPay)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="pay-grid-summary">
            <tbody>
              {r.isMileage && (r.loadedMilesPay > 0 || r.emptyMilesPay > 0) && <>
                <tr><td>Loaded Miles Pay</td><td>{money(r.loadedMilesPay)}</td></tr>
                <tr><td>Empty Miles Pay</td><td>{money(r.emptyMilesPay)}</td></tr>
              </>}
              <tr><td>Gross Pay</td><td>{money(r.grossPay)}</td></tr>
              {r.dispatchFee > 0 && <tr className="fee-row"><td>Dispatch Fee ({r.dispatchFeePercent}%)</td><td>-{money(r.dispatchFee)}</td></tr>}
              {DRIVER_DEDUCTION_FIELDS.filter((f) => f.key !== "otherCharges").map((f) => (r.expenseBreakdown && r.expenseBreakdown[f.key] > 0) ? (
                <tr className="fee-row" key={f.key}>
                  <td>
                    {f.label}
                    {f.key === "insurance" && r.insuranceMonths && r.insuranceMonths.length > 0 ? ` (${r.insuranceMonths.join(", ")})` : ""}
                    {f.key === "logbook" && r.logbookMonths && r.logbookMonths.length > 0 ? ` (${r.logbookMonths.join(", ")})` : ""}
                    {f.key === "orPermit" && r.orPermitNotes && r.orPermitNotes.length > 0 ? ` (${r.orPermitNotes.join("; ")})` : ""}
                    {f.key === "truckPay" && r.truckPayNotes && r.truckPayNotes.length > 0 ? ` (${r.truckPayNotes.join("; ")})` : ""}
                  </td>
                  <td>-{money(r.expenseBreakdown[f.key])}</td>
                </tr>
              ) : null)}
              {(r.otherChargeItems || []).map((item, i) => (
                <tr className="fee-row" key={`oc${i}`}><td>{item.note}</td><td>-{money(item.amount)}</td></tr>
              ))}
              {r.refunds > 0 && <tr className="refund-row"><td>Refunds{r.refundsNotes && r.refundsNotes.length > 0 ? ` (${r.refundsNotes.join("; ")})` : ""}</td><td>+{money(r.refunds)}</td></tr>}
              {(r.cancellationItems || []).map((item, i) => (
                <tr className="refund-row" key={`cx${i}`}><td>Cancellation — {item.note}</td><td>+{money(item.amount)}</td></tr>
              ))}
              <tr className="net-row"><td>Net Driver Pay</td><td>{money(r.netPay)}</td></tr>
            </tbody>
          </table>
        </div>
        <button className="btn no-print" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={() => generatePdf(driverPayFilename(r, trips))}><Printer size={16} /> Download PDF</button>
        <button className="btn danger no-print" onClick={() => askConfirm("Void this pay stub? Its loads will go back to Unpaid and this record will be removed from history.", () => voidPayStub(r))}>Void This Stub</button>
      </div>
    );
  }

  const driverStubs = stubDriver ? (history || []).filter((h) => h.driverName === stubDriver && !h.voided).sort((a, b) => (b.generatedAt || "").localeCompare(a.generatedAt || "")) : [];
  const unpaidLoads = stubDriver ? (loads || []).filter((l) => l.driver === stubDriver && l.status === "completed" && (l.paidStatus || "unpaid") !== "paid").sort((a, b) => (b.loadNumber || 0) - (a.loadNumber || 0)) : [];

  return (
    <div>
      <div className="no-print">
        <div className="section-label">Pay Statements</div>
        <div className="dash-filter-grid" style={{ gridTemplateColumns: stubDriver ? "1fr auto" : "1fr", alignItems: "center" }}>
          <TypeableFilterCard
            icon={Users} label="Driver" value={stubDriver}
            onChange={(v) => { setStubDriver(v); const d = driverByName[v]; setStubDisplayAs(d && d.companyName ? "company" : "driver"); }}
            options={[{ value: "", label: "Select…" }, ...driverNames.map((d) => ({ value: d, label: d }))]}
          />
          {stubDriver && (
            <button type="button" className="btn" style={{ marginTop: 0, width: "auto", padding: "10px 16px", flexShrink: 0, display: "flex", alignItems: "center", gap: 6 }} onClick={() => setStubMode("generate")}>
              <Plus size={14} /> Generate New
            </button>
          )}
        </div>
      </div>

      {!stubDriver && <div className="empty-state">Select a driver to view their statement history.</div>}

      {stubDriver && stubMode === "history" && (
        <div className="no-print">
          <div className="driver-subnav">
            <button className={`driver-subnav-btn ${historySubTab === "unpaid" ? "active" : ""}`} onClick={() => setHistorySubTab("unpaid")}>Unpaid</button>
            <button className={`driver-subnav-btn ${historySubTab === "paid" ? "active" : ""}`} onClick={() => setHistorySubTab("paid")}>Paid</button>
          </div>

          {historySubTab === "unpaid" && (
            <>
              {unpaidLoads.length === 0 && <div className="empty-state">No unpaid completed loads.</div>}
              {unpaidLoads.length > 0 && (
                <>
                  <table className="stub-loads-table">
                    <thead>
                      <tr><th>Load#</th><th>Bill To</th><th>Date</th><th style={{ textAlign: "right" }}>Rate</th></tr>
                    </thead>
                    <tbody>
                      {unpaidLoads.map((l) => (
                        <tr key={l.id}>
                          <td>{l.loadNumber}</td>
                          <td>{l.billTo || "—"}</td>
                          <td>{mmdd(l.deliveryDate || l.pickupDate)}</td>
                          <td style={{ textAlign: "right" }}>{money(l.rate)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="stub-total-gross-box">
                    <span>{unpaidLoads.length} Unpaid Load{unpaidLoads.length === 1 ? "" : "s"}</span>
                    <span>{money(unpaidLoads.reduce((s, l) => s + num(l.rate), 0))}</span>
                  </div>
                </>
              )}
            </>
          )}

          {historySubTab === "paid" && (
            <>
              {driverStubs.length === 0 && <div className="empty-state">No pay stubs generated yet.</div>}
              {driverStubs.map((h) => {
                const cardTripsById = Object.fromEntries((trips || []).map((t) => [t.id, t]));
                const cardTrips = (h.tripIds || []).map((id) => cardTripsById[id]).filter(Boolean);
                const tripLabel = cardTrips.map((t) => `Trip ${t.tripNumber}`).join(", ");
                return (
                  <div className="statement-card" key={h.id} onClick={() => setViewingStubRecord(h)}>
                    <div className="statement-card-top-row">
                      <span className="statement-card-date">{h.generatedAt ? fmtDate(h.generatedAt.slice(0, 10)) : fmtDate(h.periodEnd)}</span>
                      {tripLabel && <span className="statement-card-trip">{tripLabel}</span>}
                    </div>
                    <div className="statement-card-row">
                      <span>{h.loadCount ?? (h.loadIds ? h.loadIds.length : 0)} load{(h.loadCount ?? 0) === 1 ? "" : "s"}</span>
                      <span className="statement-card-amt">{money(h.netPay)}</span>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      {stubDriver && stubMode === "generate" && (
        <>
          <div className="no-print">
            <button type="button" className="back-btn" onClick={() => setStubMode("history")}><ChevronLeft size={18} /> Statement History</button>
            {driverByName[stubDriver] && driverByName[stubDriver].companyName && (
              <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr" }}>
                <FilterCard
                  icon={Building2} label="Bill As" value={stubDisplayAs} onChange={setStubDisplayAs} fullWidth
                  options={[
                    { value: "driver", label: `Driver Name (${driverByName[stubDriver].name})` },
                    { value: "company", label: `Company Name (${driverByName[stubDriver].companyName})` },
                  ]}
                />
              </div>
            )}
            <div className="field-row">
              <div className="field"><label>Period Start</label><div className="date-input-clip"><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} min={stubMinDate} value={stubStart} onChange={(e) => guardStubDate(e.target.value, setStubStart)} /></div></div>
              <div className="field"><label>Period End</label><div className="date-input-clip"><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} min={stubMinDate} value={stubEnd} onChange={(e) => guardStubDate(e.target.value, setStubEnd)} /></div></div>
            </div>
            {stubDateRejected && (
              <div style={{ fontSize: 11.5, color: "var(--red)", marginTop: -4, marginBottom: 10, fontWeight: 600 }}>
                That date is already paid — pick {fmtDate(stubMinDate)} or later.
              </div>
            )}
            <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: -6 }}>Only unpaid completed loads within this range are included. Loads already paid on a past stub are automatically excluded.</div>
          </div>

          {stub ? (
            <>
              <div className="print-area stub-sheet" style={{ marginTop: 16 }}>
                <div className="stub-header2">
                  <div className="stub-three-col">
                    <div className="stub-brand-text stub-col-left">
                      {companyInfo && companyInfo.companyName ? <div className="stub-company2">{companyInfo.companyName}</div> : null}
                      {companyInfo && companyInfo.companyAddress ? <div className="stub-company2-line">{companyInfo.companyAddress}</div> : null}
                      {companyInfo && companyInfo.companyEmail ? <div className="stub-company2-line">{companyInfo.companyEmail}</div> : null}
                      {companyInfo && companyInfo.dotNumber ? <div className="stub-company2-line">DOT {companyInfo.dotNumber}</div> : null}
                    </div>
                    {companyInfo && companyInfo.companyLogoDataUri && <img src={companyInfo.companyLogoDataUri} alt="Company logo" className="stub-logo-mid" />}
                    <div className="stub-driver-block stub-col-right">
                      <div className="stub-driver-name">{resolveDisplayName(stub.driver, stubDisplayAs)}</div>
                      {stub.trucksUsed.length ? <div className="stub-driver-truck">Truck{stub.trucksUsed.length > 1 ? "s" : ""} {stub.trucksUsed.join(", ")}</div> : null}
                    </div>
                  </div>
                  <div className="stub-title-row">
                    <div className="stub-title2">Payment Statement</div>
                  </div>
                  <div className="stub-topline-row">
                    <div className="stub-topline-side"><div className="stub-networth-line">Net Pay: {money(stub.netPay)}</div></div>
                    <div className="stub-topline-center"><div className="stub-gen-date">{mmddyyyySlash(todayISO())}</div></div>
                    <div className="stub-topline-side"><div className="stub-tripnum-line">{(stub.tripIds || []).map((id) => (trips || []).find((t) => t.id === id)).filter(Boolean).map((t) => `Trip #${t.tripNumber}`).join(", ")}</div></div>
                  </div>
                  <div className="stub-subline-row">
                    <div className="stub-miles-line">Total Miles: {stub.loadPays.reduce((s, l) => s + num(l.loadedMiles), 0).toLocaleString()} mi</div>
                    <div className="stub-period-line">Pay Period: {payPeriodLabel(stubStart, stubEnd)} · {stub.loadPays.length} load{stub.loadPays.length === 1 ? "" : "s"}</div>
                  </div>
                </div>
                <table className="pay-grid-table">
                  <thead><tr><th>Load#</th><th>Date</th><th>Pick Up</th><th>Delivery</th><th style={{ textAlign: "right" }}>Rate</th></tr></thead>
                  <tbody>
                    {stub.loadPays.length === 0 && <tr><td colSpan={5} style={{ color: "#999" }}>No unpaid completed loads in this period.</td></tr>}
                    {stub.loadPays.map((l) => (
                      <tr key={l.id}>
                        <td>{l.loadNumber}</td>
                        <td>{mmdd(l.pickupDate)}</td>
                        <td>{pickupCityState(l)}</td>
                        <td>{deliveryCityState(l)}</td>
                        <td className="rate-cell" style={{ textAlign: "right" }}>{money(l.driverPay)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {stub.driver && stub.driver.payType === "salary" && (
                  <div style={{ fontSize: 11, color: "#4D4D4D", marginTop: -8, marginBottom: 12 }}>Flat salary for period — not tied to individual loads above.</div>
                )}
                <table className="pay-grid-summary">
                  <tbody>
                    {stub.isMileage && (stub.loadedMilesPay > 0 || stub.emptyMilesPay > 0) && <>
                      <tr><td>Loaded Miles Pay</td><td>{money(stub.loadedMilesPay)}</td></tr>
                      <tr><td>Empty Miles Pay</td><td>{money(stub.emptyMilesPay)}</td></tr>
                    </>}
                    <tr><td>Gross Pay</td><td>{money(stub.grossPay)}</td></tr>
                    {stub.dispatchFee > 0 && <tr className="fee-row"><td>Dispatch Fee ({stub.dispatchFeePercent}%)</td><td>-{money(stub.dispatchFee)}</td></tr>}
                    {DRIVER_DEDUCTION_FIELDS.filter((f) => f.key !== "otherCharges").map((f) => stub.expenseBreakdown[f.key] > 0 ? (
                      <tr className="fee-row" key={f.key}>
                        <td>
                          {f.label}
                          {f.key === "insurance" && stub.insuranceMonths && stub.insuranceMonths.length > 0 ? ` (${stub.insuranceMonths.join(", ")})` : ""}
                          {f.key === "logbook" && stub.logbookMonths && stub.logbookMonths.length > 0 ? ` (${stub.logbookMonths.join(", ")})` : ""}
                          {f.key === "orPermit" && stub.orPermitNotes && stub.orPermitNotes.length > 0 ? ` (${stub.orPermitNotes.join("; ")})` : ""}
                          {f.key === "truckPay" && stub.truckPayNotes && stub.truckPayNotes.length > 0 ? ` (${stub.truckPayNotes.join("; ")})` : ""}
                        </td>
                        <td>-{money(stub.expenseBreakdown[f.key])}</td>
                      </tr>
                    ) : null)}
                    {(stub.otherChargeItems || []).map((item, i) => (
                      <tr className="fee-row" key={`oc${i}`}><td>{item.note}</td><td>-{money(item.amount)}</td></tr>
                    ))}
                    {stub.refunds > 0 && <tr className="refund-row"><td>Refunds{stub.refundsNotes && stub.refundsNotes.length > 0 ? ` (${stub.refundsNotes.join("; ")})` : ""}</td><td>+{money(stub.refunds)}</td></tr>}
                    {(stub.cancellationItems || []).map((item, i) => (
                      <tr className="refund-row" key={`cx${i}`}><td>Cancellation — {item.note}</td><td>+{money(item.amount)}</td></tr>
                    ))}
                    <tr className="net-row"><td>Net Driver Pay</td><td>{money(stub.netPay)}</td></tr>
                  </tbody>
                </table>
              </div>
              <button className="btn no-print" disabled={alreadyGenerated} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={handleGenerate}>
                <Printer size={16} /> {alreadyGenerated ? "Already Generated — Change Driver/Dates to Continue" : "Generate, Save & Print"}
              </button>
            </>
          ) : (
            <div className="empty-state">No unpaid completed loads in this period.</div>
          )}
        </>
      )}
    </div>
  );
}

function FleetMenu({ setFleetView, trucks, drivers, billTos, shippers, receivers, dispatchers }) {
  const rows = [
    [{ key: "trucks", icon: Truck, name: "Trucks" }, { key: "drivers", icon: Users, name: "Drivers" }],
    [{ key: "shippers", icon: Warehouse, name: "Shippers" }, { key: "receivers", icon: Warehouse, name: "Receivers" }],
    [{ key: "billto", icon: Building2, name: "Bill To" }, { key: "dispatchers", icon: Users, name: "Dispatchers" }],
    [{ key: "ifta", icon: Calculator, name: "IFTA Calculator" }, { key: "oregon", icon: MapPin, name: "Oregon Permit" }],
    [{ key: "accounting", icon: FileText, name: "Accounting" }, { key: "annualTax", icon: DollarSign, name: "Annual Tax" }],
  ];
  return (
    <div>
      <div className="section-label" style={{ marginTop: 8, marginBottom: 20 }}>Fleet &amp; Master Data</div>
      {rows.map((row, i) => {
        const [left, right] = row;
        return (
          <div key={i} className="fleet-menu-row" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
            <button type="button" className="loads-pill-btn" style={{ flex: 1, minWidth: 0 }} onClick={() => setFleetView(left.key)}>
              <span className="loads-pill-circle"><left.icon size={18} color="#1A1300" /></span>
              <span className="loads-pill-text">{left.name}</span>
            </button>
            <button type="button" className="loads-pill-btn" style={{ flex: 1, minWidth: 0 }} onClick={() => setFleetView(right.key)}>
              <span className="loads-pill-text">{right.name}</span>
              <span className="loads-pill-circle"><right.icon size={18} color="#1A1300" /></span>
            </button>
          </div>
        );
      })}
      <div className="fleet-credit">Built by Mirzaev 2026 · © All Rights Reserved</div>
    </div>
  );
}

function TrucksPage(p) {
  const { setFleetView, truckForm, setTruckForm, saveTruck, editingTruckId, setEditingTruckId, trucks, filteredTrucks, editTruck, removeTruck, askConfirm, driverNames, fleetSearch, setFleetSearch } = p;
  return (
    <div>
      <button type="button" className="back-btn" onClick={() => setFleetView("menu")}><ChevronLeft size={18} /> Fleet</button>
      <div className="section-label">Trucks</div>
      <form onSubmit={saveTruck} className="fleet-form">
        <div className="field-row">
          <div className="field"><label>Truck Number</label><input value={truckForm.number} onChange={(e) => setTruckForm({ ...truckForm, number: e.target.value })} placeholder="e.g. 571" /></div>
          <div className="field"><label>Notes (optional)</label><input value={truckForm.notes} onChange={(e) => setTruckForm({ ...truckForm, notes: e.target.value })} placeholder="VIN, plate, etc." style={{ fontFamily: "Inter" }} /></div>
        </div>
        <div className="dash-filter-grid">
          <FilterCard
            icon={CheckCircle2} label="Status" value={truckForm.active === false ? "inactive" : "active"} onChange={(v) => setTruckForm({ ...truckForm, active: v === "active" })}
            options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
          />
          <FilterCard
            icon={User} label="Driver" value={truckForm.assignedDriver || "N/A"} onChange={(v) => setTruckForm({ ...truckForm, assignedDriver: v === "N/A" ? "" : v })}
            options={[{ value: "N/A", label: "N/A" }, ...(driverNames || []).map((d) => ({ value: d, label: d }))]}
          />
        </div>
        <button className="btn" type="submit">{editingTruckId ? "Update Truck" : "Add Truck"}</button>
        {editingTruckId && <button type="button" className="btn secondary" onClick={() => { setTruckForm(emptyTruck()); setEditingTruckId(null); }}>Cancel Edit</button>}
      </form>
      <div className="search-box" style={{ marginTop: 20 }}><Search size={14} color="#8A93A3" /><input value={fleetSearch} onChange={(e) => setFleetSearch(e.target.value)} placeholder="Search trucks…" /></div>
      <div style={{ marginTop: 16 }}>
        {filteredTrucks.map((t) => (
          <div className="manage-row" key={t.id}>
            <div className="manage-row-head" style={{ cursor: "default" }}>
              <div>
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontWeight: 600 }}>{t.number}</span>
                {t.active === false && <span style={{ fontSize: 10, color: "var(--text-dim)", marginLeft: 6 }}>(Inactive)</span>}
                {t.assignedDriver && <div style={{ fontSize: 11, color: "var(--green)", marginTop: 2 }}>{t.assignedDriver}</div>}
                {t.notes && <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>{t.notes}</div>}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="icon-btn" onClick={() => editTruck(t)}><Pencil size={13} /></button>
                <button className="icon-btn" onClick={() => askConfirm(`Delete truck ${t.number}? This can't be undone.`, () => removeTruck(t.id))}><X size={15} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {trucks.length === 0 && <div className="empty-state">No trucks added yet.</div>}
    </div>
  );
}

function AutocompleteInput({ value, onChange, onSelect, options, placeholder, getLabel, getSub }) {
  const [focused, setFocused] = useState(false);
  const [typed, setTyped] = useState(false);
  const q = norm(value);
  function startsWithMatch(text) {
    if (!text) return false;
    const t = norm(text);
    if (t.startsWith(q)) return true;
    return t.split(/[\s,·-]+/).some((word) => word.startsWith(q));
  }
  const filtered = (
    !q ? []
    : typed ? options.filter((o) => startsWithMatch(getLabel(o)) || (getSub && startsWithMatch(getSub(o))))
    : options
  ).slice(0, 6);

  // Auto-apply the best match (by name or code) after a short pause in typing.
  useEffect(() => {
    if (!typed || !q) return;
    const timer = setTimeout(() => {
      const best = options.find((o) => startsWithMatch(getLabel(o)) || (getSub && startsWithMatch(getSub(o))));
      if (best) { onSelect(best); setTyped(false); setFocused(false); }
    }, 2000);
    return () => clearTimeout(timer);
  }, [value, typed]);

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => { onChange(e.target.value); setTyped(true); }}
        onFocus={() => { setFocused(true); setTyped(false); }}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        style={{ fontFamily: "Inter" }}
      />
      {focused && filtered.length > 0 && (
        <div className="autocomplete-dropdown">
          {filtered.map((o, i) => (
            <div className="autocomplete-item" key={i} onMouseDown={() => { onSelect(o); setTyped(false); setFocused(false); }}>
              <div className="autocomplete-item-name">{getLabel(o)}</div>
              {getSub && getSub(o) ? <div className="autocomplete-item-sub">{getSub(o)}</div> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DriverNotesEditor({ driver, saveDriverNotes }) {
  const [notes, setNotes] = useState(driver.notes || "");
  const [saved, setSaved] = useState(false);
  useEffect(() => { setNotes(driver.notes || ""); }, [driver.id]);
  async function handleBlur() {
    if (notes === (driver.notes || "")) return;
    await saveDriverNotes(driver.id, notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 1200);
  }
  return (
    <div className="field">
      <textarea
        rows={5}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onBlur={handleBlur}
        placeholder={"Example:\n- Prefers Midwest routes\n- Hazmat certified\n- Home every other weekend"}
        style={{ fontFamily: "Inter", lineHeight: 1.5, resize: "vertical" }}
      />
      <div style={{ fontSize: 10.5, color: saved ? "var(--green)" : "var(--text-dim)" }}>{saved ? "Saved" : "Saves automatically when you tap out of the box."}</div>
    </div>
  );
}

function DriversPage(p) {
  const { setFleetView, driverForm, setDriverForm, saveDriver, editingDriverId, setEditingDriverId, drivers, filteredDrivers, editDriver, removeDriver,
    expandedDriverId, setExpandedDriverId, history, loads, setStubDriver, setStubStart, setStubEnd, setStubDisplayAs, setTab, askConfirm, saveDriverNotes, setViewingStubRecord, fleetSearch, setFleetSearch } = p;
  return (
    <div>
      <button type="button" className="back-btn" onClick={() => setFleetView("menu")}><ChevronLeft size={18} /> Fleet</button>
      <div className="section-label">Drivers</div>
      <form onSubmit={saveDriver} className="fleet-form">
        <div className="field-row">
          <div className="field"><label>Name</label><input value={driverForm.name} onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })} placeholder="Driver name" style={{ fontFamily: "Inter" }} /></div>
          <div className="field">
            <label>Phone</label>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={driverForm.phone || ""}
              onChange={(e) => setDriverForm({ ...driverForm, phone: e.target.value })}
              onBlur={(e) => setDriverForm((f) => ({ ...f, phone: formatPhone(e.target.value) }))}
              placeholder="(555) 123-4567"
            />
          </div>
        </div>
        <div className="field-row">
          <div className="field"><label>Company Name (optional)</label><input value={driverForm.companyName} onChange={(e) => setDriverForm({ ...driverForm, companyName: e.target.value })} placeholder="e.g. Rasulov Trucking LLC" style={{ fontFamily: "Inter" }} /></div>
          <div className="field"><label>EIN / SSN #</label><input value={driverForm.taxId} onChange={(e) => setDriverForm({ ...driverForm, taxId: e.target.value })} placeholder="XX-XXXXXXX" /></div>
        </div>
        <div className="dash-filter-grid">
          <FilterCard
            icon={DollarSign} label="Pay Type" value={driverForm.payType} onChange={(v) => setDriverForm({ ...driverForm, payType: v })}
            options={PAY_TYPES.map((pt) => ({ value: pt.key, label: pt.label }))}
          />
          <FilterCard
            icon={CheckCircle2} label="Status" value={driverForm.active === false ? "inactive" : "active"} onChange={(v) => setDriverForm({ ...driverForm, active: v === "active" })}
            options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
          />
        </div>
        <div className="field-row">
          <div className="field">
            <label>Rate</label>
            <input type="number" step="0.01" value={driverForm.rate} onChange={(e) => setDriverForm({ ...driverForm, rate: e.target.value })} placeholder={driverForm.payType === "percent" ? "25" : "0.55"} />
          </div>
          <div className="field">
            <label>Dispatch Fee (%)</label>
            <input type="number" step="0.01" value={driverForm.dispatchFeePercent} onChange={(e) => setDriverForm({ ...driverForm, dispatchFeePercent: e.target.value })} placeholder="e.g. 13" />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Truck Balance Owed ($)</label>
            <input type="number" step="0.01" value={driverForm.truckBalance} onChange={(e) => setDriverForm({ ...driverForm, truckBalance: e.target.value })} placeholder="e.g. 30000" />
          </div>
        </div>
        <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: -6, marginBottom: 14 }}>
          Starting amount this driver owes toward their truck, if any. Each Truck Pay charge on a trip automatically deducts from this — the running balance shows on that driver's trips going forward.
        </div>
        <button className="btn" type="submit">{editingDriverId ? "Update Driver" : "Add Driver"}</button>
        {editingDriverId && <button type="button" className="btn secondary" onClick={() => { setDriverForm(emptyDriver()); setEditingDriverId(null); }}>Cancel Edit</button>}
      </form>

      <div className="search-box" style={{ marginTop: 20 }}><Search size={14} color="#8A93A3" /><input value={fleetSearch} onChange={(e) => setFleetSearch(e.target.value)} placeholder="Search drivers…" /></div>
      <div style={{ marginTop: 16 }}>
        {filteredDrivers.map((d) => {
          const open = expandedDriverId === d.id;
          return (
            <div className="manage-row" key={d.id}>
              <div className="manage-row-head" onClick={() => setExpandedDriverId(open ? null : d.id)}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{d.name}{d.active === false && <span style={{ fontSize: 10, color: "var(--text-dim)", fontWeight: 400, marginLeft: 6 }}>(Inactive)</span>}</div>
                  {(d.companyName || d.phone) && <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 3 }}>{[d.companyName, d.phone].filter(Boolean).join(" · ")}</div>}
                  <span className="pay-pill">{payLabel(d)}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button className="icon-btn" onClick={(e) => { e.stopPropagation(); editDriver(d); }}><Pencil size={13} /></button>
                  <button className="icon-btn" onClick={(e) => { e.stopPropagation(); askConfirm(`Delete driver ${d.name}? This can't be undone.`, () => removeDriver(d.id)); }}><Trash2 size={13} /></button>
                  {open ? <ChevronDown size={16} color="#8A93A3" /> : <ChevronRight size={16} color="#8A93A3" />}
                </div>
              </div>
              {open && (
                <div className="manage-row-body">
                  <div style={{ fontSize: 11.5, color: "var(--text-dim)", margin: "10px 0 4px", lineHeight: 1.5 }}>
                    Load history and pay/statement history for this driver now live in the <strong style={{ color: "var(--accent)" }}>Stub</strong> tab — select this driver there to view or generate statements.
                  </div>
                  <div style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-dim)", margin: "14px 0 4px" }}>Notes</div>
                  <DriverNotesEditor driver={d} saveDriverNotes={saveDriverNotes} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {drivers.length === 0 && <div className="empty-state">No drivers added yet.</div>}
    </div>
  );
}

function BillToPage(p) {
  const { setFleetView, billToForm, setBillToForm, saveBillTo, editingBillToId, setEditingBillToId, filteredBillTos, editBillTo, removeBillTo, fleetSearch, setFleetSearch, startImport, askConfirm } = p;
  return (
    <div>
      <button type="button" className="back-btn" onClick={() => setFleetView("menu")}><ChevronLeft size={18} /> Fleet</button>
      <div className="section-label">Bill To (Brokers / Customers)</div>
      <button className="import-btn" onClick={() => startImport("billto")}><UploadCloud size={14} /> Import from Excel</button>
      <form onSubmit={saveBillTo} className="fleet-form">
        <div className="field-row"><div className="field"><label>Name</label><input value={billToForm.name} onChange={(e) => setBillToForm({ ...billToForm, name: e.target.value })} placeholder="e.g. C.H. Robinson" style={{ fontFamily: "Inter" }} /></div></div>
        <div className="field-row"><div className="field"><label>Address (optional)</label><input value={billToForm.address} onChange={(e) => setBillToForm({ ...billToForm, address: e.target.value })} placeholder="Street, City, State ZIP" style={{ fontFamily: "Inter" }} /></div></div>
        <div className="field-row">
          <div className="field"><label>Contact (optional)</label><input value={billToForm.contact} onChange={(e) => setBillToForm({ ...billToForm, contact: e.target.value })} placeholder="Contact name" style={{ fontFamily: "Inter" }} /></div>
          <div className="field"><label>Phone (optional)</label><input value={billToForm.phone} onChange={(e) => setBillToForm({ ...billToForm, phone: e.target.value })} placeholder="Phone" style={{ fontFamily: "Inter" }} /></div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Payment Terms (optional)</label>
            <AutocompleteInput
              value={billToForm.paymentTerms}
              onChange={(v) => setBillToForm({ ...billToForm, paymentTerms: v })}
              onSelect={(t) => setBillToForm({ ...billToForm, paymentTerms: t })}
              options={["Net 15", "Net 30", "Net 45", "Net 60", "Quick Pay"]}
              placeholder="e.g. Net 30"
              getLabel={(t) => t}
            />
          </div>
        </div>
        <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr" }}>
          <FilterCard
            icon={CheckCircle2} label="Status" value={billToForm.active === false ? "inactive" : "active"} onChange={(v) => setBillToForm({ ...billToForm, active: v === "active" })} fullWidth
            options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
          />
        </div>
        <button className="btn" type="submit">{editingBillToId ? "Update" : "Add Bill To"}</button>
        {editingBillToId && <button type="button" className="btn secondary" onClick={() => { setBillToForm(emptyBillTo()); setEditingBillToId(null); }}>Cancel Edit</button>}
      </form>

      <div className="search-box" style={{ marginTop: 20 }}><Search size={14} color="#8A93A3" /><input value={fleetSearch} onChange={(e) => setFleetSearch(e.target.value)} placeholder="Search Bill To…" /></div>
      {filteredBillTos.map((b) => (
        <div className="manage-row" key={b.id}>
          <div className="manage-row-head" style={{ cursor: "default" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{b.name}{b.active === false && <span style={{ fontSize: 10, color: "var(--text-dim)", fontWeight: 400, marginLeft: 6 }}>(Inactive)</span>}</div>
              {(b.contact || b.phone) && <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{[b.contact, b.phone].filter(Boolean).join(" · ")}</div>}
              {b.paymentTerms && <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, marginTop: 2 }}>{b.paymentTerms}</div>}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="icon-btn" onClick={() => editBillTo(b)}><Pencil size={13} /></button>
              <button className="icon-btn" onClick={() => askConfirm(`Delete "${b.name}"? This can't be undone.`, () => removeBillTo(b.id))}><Trash2 size={13} /></button>
            </div>
          </div>
        </div>
      ))}
      {filteredBillTos.length === 0 && <div className="empty-state">No records found.</div>}
    </div>
  );
}

function DispatchersPage(p) {
  const { setFleetView, dispatcherForm, setDispatcherForm, saveDispatcher, editingDispatcherId, setEditingDispatcherId, filteredDispatchers, editDispatcher, removeDispatcher, fleetSearch, setFleetSearch, askConfirm, settings } = p;
  return (
    <div>
      <button type="button" className="back-btn" onClick={() => setFleetView("menu")}><ChevronLeft size={18} /> Fleet</button>
      <div className="section-label">Dispatchers</div>
      <form onSubmit={saveDispatcher} className="fleet-form">
        <div className="field-row"><div className="field"><label>Name</label><input value={dispatcherForm.name} onChange={(e) => setDispatcherForm({ ...dispatcherForm, name: e.target.value })} placeholder="e.g. Sarah Johnson" style={{ fontFamily: "Inter" }} /></div></div>
        <div className="dash-filter-grid">
          <FilterCard
            icon={DollarSign} label="Pay Method" value={dispatcherForm.payMethod} onChange={(v) => setDispatcherForm({ ...dispatcherForm, payMethod: v })}
            options={[{ value: "percent", label: "Percentage" }, { value: "flat", label: "Flat Pay Per Load" }]}
          />
          <FilterCard
            icon={Users} label="Position" value={dispatcherForm.position} onChange={(v) => setDispatcherForm({ ...dispatcherForm, position: v })}
            options={[{ value: "dispatcher", label: "Dispatcher" }, { value: "main", label: "Main Dispatcher" }]}
          />
        </div>
        <div className="field-row">
          <div className="field">
            <label>{dispatcherForm.payMethod === "flat" ? "Pay Value ($/load)" : "Pay Value (%)"}</label>
            <input type="number" step="0.01" value={dispatcherForm.payValue} onChange={(e) => setDispatcherForm({ ...dispatcherForm, payValue: e.target.value })} placeholder={`Leave blank for global default (${(settings.dispatcherPaySchedule && settings.dispatcherPaySchedule.length ? "custom" : DEFAULT_DISPATCHER_PAY) || DEFAULT_DISPATCHER_PAY}%)`} />
          </div>
        </div>
        <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr" }}>
          <FilterCard
            icon={CheckCircle2} label="Status" value={dispatcherForm.active ? "active" : "inactive"} onChange={(v) => setDispatcherForm({ ...dispatcherForm, active: v === "active" })} fullWidth
            options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
          />
        </div>
        <div className="field-row"><div className="field"><label>Notes (optional)</label><input value={dispatcherForm.notes} onChange={(e) => setDispatcherForm({ ...dispatcherForm, notes: e.target.value })} placeholder="Notes" style={{ fontFamily: "Inter" }} /></div></div>
        <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: -6, marginBottom: 14 }}>
          Main Dispatcher is automatically pre-filled on every new load. Leave Pay Value blank to use the global default dispatcher pay % from Settings instead of a custom rate.
        </div>
        <button className="btn" type="submit">{editingDispatcherId ? "Update" : "Add Dispatcher"}</button>
        {editingDispatcherId && <button type="button" className="btn secondary" onClick={() => { setDispatcherForm(emptyDispatcher()); setEditingDispatcherId(null); }}>Cancel Edit</button>}
      </form>

      <div className="search-box" style={{ marginTop: 20 }}><Search size={14} color="#8A93A3" /><input value={fleetSearch} onChange={(e) => setFleetSearch(e.target.value)} placeholder="Search dispatchers…" /></div>
      {filteredDispatchers.map((d) => (
        <div className="manage-row" key={d.id}>
          <div className="manage-row-head" style={{ cursor: "default" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
                {d.name}
                {d.position === "main" && <span className="trip-number-pill">Main</span>}
                {!d.active && <span style={{ fontSize: 10, color: "var(--text-dim)" }}>(Inactive)</span>}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-dim)" }}>
                {d.payValue ? (d.payMethod === "flat" ? `$${num(d.payValue).toFixed(2)}/load` : `${num(d.payValue)}% custom rate`) : "Global default rate"}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="icon-btn" onClick={() => editDispatcher(d)}><Pencil size={13} /></button>
              <button className="icon-btn" onClick={() => askConfirm(`Delete dispatcher "${d.name}"? This can't be undone.`, () => removeDispatcher(d.id))}><Trash2 size={13} /></button>
            </div>
          </div>
        </div>
      ))}
      {filteredDispatchers.length === 0 && <div className="empty-state">No records found.</div>}
    </div>
  );
}

function ShippersPage(p) {
  const { setFleetView, shipperForm, setShipperForm, saveShipper, editingShipperId, setEditingShipperId, filteredShippers, editShipper, removeShipper, removeShippers, removeAllShippers, fleetSearch, setFleetSearch, startImport, askConfirm, addReceiverFromShipper } = p;
  const [selected, setSelected] = useState({});
  const [alsoAddReceiver, setAlsoAddReceiver] = useState(false);
  const selectedIds = Object.keys(selected).filter((id) => selected[id]);
  const allSelected = filteredShippers.length > 0 && filteredShippers.every((s) => selected[s.id]);
  function toggleOne(id) { setSelected((prev) => ({ ...prev, [id]: !prev[id] })); }
  function toggleAll() {
    if (allSelected) setSelected({});
    else { const next = {}; filteredShippers.forEach((s) => { next[s.id] = true; }); setSelected(next); }
  }
  function handleDeleteSelected() {
    askConfirm(`Delete ${selectedIds.length} selected shipper${selectedIds.length === 1 ? "" : "s"}? This can't be undone.`, async () => { await removeShippers(selectedIds); setSelected({}); });
  }
  function handleDeleteAll() {
    askConfirm(`Delete ALL shippers? This will remove every shipper record and can't be undone.`, async () => { await removeAllShippers(); setSelected({}); });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const isNew = !editingShipperId;
    await saveShipper(e);
    if (isNew && alsoAddReceiver) { await addReceiverFromShipper(shipperForm); setAlsoAddReceiver(false); }
  }
  return (
    <div>
      <button type="button" className="back-btn" onClick={() => setFleetView("menu")}><ChevronLeft size={18} /> Fleet</button>
      <div className="section-label">Shippers</div>
      <button className="import-btn" onClick={() => startImport("shippers")}><UploadCloud size={14} /> Import from Excel</button>
      <form onSubmit={handleSubmit} className="fleet-form">
        <div className="field-row">
          <div className="field"><label>Company Name</label><input value={shipperForm.companyName} onChange={(e) => setShipperForm({ ...shipperForm, companyName: e.target.value })} placeholder="Amazon Warehouse" style={{ fontFamily: "Inter" }} /></div>
          <div className="field"><label>Warehouse Code</label><input value={shipperForm.warehouseCode} onChange={(e) => setShipperForm({ ...shipperForm, warehouseCode: e.target.value })} placeholder="ONT8" /></div>
        </div>
        <div className="field-row"><div className="field"><label>Street</label><input value={shipperForm.street} onChange={(e) => setShipperForm({ ...shipperForm, street: e.target.value })} placeholder="123 Dock Rd" style={{ fontFamily: "Inter" }} /></div></div>
        <div className="field-row">
          <div className="field"><label>City</label><input value={shipperForm.city} onChange={(e) => setShipperForm({ ...shipperForm, city: e.target.value })} placeholder="City" style={{ fontFamily: "Inter" }} /></div>
          <div className="field"><label>State</label><input value={shipperForm.state} onChange={(e) => setShipperForm({ ...shipperForm, state: e.target.value })} placeholder="ST" /></div>
          <div className="field"><label>ZIP</label><input value={shipperForm.zip} onChange={(e) => setShipperForm({ ...shipperForm, zip: e.target.value })} placeholder="00000" /></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Contact (optional)</label><input value={shipperForm.contact} onChange={(e) => setShipperForm({ ...shipperForm, contact: e.target.value })} placeholder="Contact info" style={{ fontFamily: "Inter" }} /></div>
          {!editingShipperId && (
            <div className="field" style={{ flex: 0.7, justifyContent: "flex-end" }}>
              <label style={{ visibility: "hidden" }}>.</label>
              <label className="cross-add-check">
                <input type="checkbox" checked={alsoAddReceiver} onChange={(e) => setAlsoAddReceiver(e.target.checked)} />
                <span>Also add as Receiver</span>
              </label>
            </div>
          )}
        </div>
        <button className="btn" type="submit">{editingShipperId ? "Update" : "Add Shipper"}</button>
        {editingShipperId && <button type="button" className="btn secondary" onClick={() => { setShipperForm(emptyShipper()); setEditingShipperId(null); }}>Cancel Edit</button>}
      </form>

      <div className="search-box" style={{ marginTop: 20 }}><Search size={14} color="#8A93A3" /><input value={fleetSearch} onChange={(e) => setFleetSearch(e.target.value)} placeholder="Search shippers…" /></div>

      {filteredShippers.length > 0 && (
        <div className="bulk-select-bar">
          <label className="bulk-select-all">
            <input type="checkbox" checked={allSelected} onChange={toggleAll} />
            <span>Select All ({filteredShippers.length})</span>
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            {selectedIds.length > 0 && <button className="btn danger bulk-btn" onClick={handleDeleteSelected}>Delete Selected ({selectedIds.length})</button>}
            <button className="btn danger bulk-btn" onClick={handleDeleteAll}>Delete All</button>
          </div>
        </div>
      )}

      {filteredShippers.map((s) => (
        <div className="manage-row" key={s.id}>
          <div className="manage-row-head" style={{ cursor: "default" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <input type="checkbox" checked={!!selected[s.id]} onChange={() => toggleOne(s.id)} style={{ marginTop: 3, width: 17, height: 17, accentColor: "var(--accent)", flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{s.companyName}{s.warehouseCode ? ` (${s.warehouseCode})` : ""}</div>
                <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{addr1line(s.street, s.city, s.state, s.zip) || "No address on file"}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="icon-btn" onClick={() => editShipper(s)}><Pencil size={13} /></button>
              <button className="icon-btn" onClick={() => askConfirm(`Delete shipper "${s.companyName}"? This can't be undone.`, () => removeShipper(s.id))}><Trash2 size={13} /></button>
            </div>
          </div>
        </div>
      ))}
      {filteredShippers.length === 0 && <div className="empty-state">No records found.</div>}
    </div>
  );
}

function ReceiversPage(p) {
  const { setFleetView, receiverForm, setReceiverForm, saveReceiver, editingReceiverId, setEditingReceiverId, filteredReceivers, editReceiver, removeReceiver, removeReceivers, removeAllReceivers, fleetSearch, setFleetSearch, startImport, askConfirm, addShipperFromReceiver } = p;
  const [selected, setSelected] = useState({});
  const [alsoAddShipper, setAlsoAddShipper] = useState(false);
  const selectedIds = Object.keys(selected).filter((id) => selected[id]);
  const allSelected = filteredReceivers.length > 0 && filteredReceivers.every((r) => selected[r.id]);
  function toggleOne(id) { setSelected((prev) => ({ ...prev, [id]: !prev[id] })); }
  function toggleAll() {
    if (allSelected) setSelected({});
    else { const next = {}; filteredReceivers.forEach((r) => { next[r.id] = true; }); setSelected(next); }
  }
  function handleDeleteSelected() {
    askConfirm(`Delete ${selectedIds.length} selected receiver${selectedIds.length === 1 ? "" : "s"}? This can't be undone.`, async () => { await removeReceivers(selectedIds); setSelected({}); });
  }
  function handleDeleteAll() {
    askConfirm(`Delete ALL receivers? This will remove every receiver record and can't be undone.`, async () => { await removeAllReceivers(); setSelected({}); });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const isNew = !editingReceiverId;
    await saveReceiver(e);
    if (isNew && alsoAddShipper) { await addShipperFromReceiver(receiverForm); setAlsoAddShipper(false); }
  }
  return (
    <div>
      <button type="button" className="back-btn" onClick={() => setFleetView("menu")}><ChevronLeft size={18} /> Fleet</button>
      <div className="section-label">Receivers</div>
      <button className="import-btn" onClick={() => startImport("receivers")}><UploadCloud size={14} /> Import from Excel</button>
      <form onSubmit={handleSubmit} className="fleet-form">
        <div className="field-row">
          <div className="field"><label>Company Name</label><input value={receiverForm.companyName} onChange={(e) => setReceiverForm({ ...receiverForm, companyName: e.target.value })} placeholder="Costco DC" style={{ fontFamily: "Inter" }} /></div>
          <div className="field"><label>Warehouse Code</label><input value={receiverForm.warehouseCode} onChange={(e) => setReceiverForm({ ...receiverForm, warehouseCode: e.target.value })} placeholder="DC12" /></div>
        </div>
        <div className="field-row"><div className="field"><label>Street</label><input value={receiverForm.street} onChange={(e) => setReceiverForm({ ...receiverForm, street: e.target.value })} placeholder="456 Delivery Ave" style={{ fontFamily: "Inter" }} /></div></div>
        <div className="field-row">
          <div className="field"><label>City</label><input value={receiverForm.city} onChange={(e) => setReceiverForm({ ...receiverForm, city: e.target.value })} placeholder="City" style={{ fontFamily: "Inter" }} /></div>
          <div className="field"><label>State</label><input value={receiverForm.state} onChange={(e) => setReceiverForm({ ...receiverForm, state: e.target.value })} placeholder="ST" /></div>
          <div className="field"><label>ZIP</label><input value={receiverForm.zip} onChange={(e) => setReceiverForm({ ...receiverForm, zip: e.target.value })} placeholder="00000" /></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Contact (optional)</label><input value={receiverForm.contact} onChange={(e) => setReceiverForm({ ...receiverForm, contact: e.target.value })} placeholder="Contact info" style={{ fontFamily: "Inter" }} /></div>
          {!editingReceiverId && (
            <div className="field" style={{ flex: 0.7, justifyContent: "flex-end" }}>
              <label style={{ visibility: "hidden" }}>.</label>
              <label className="cross-add-check">
                <input type="checkbox" checked={alsoAddShipper} onChange={(e) => setAlsoAddShipper(e.target.checked)} />
                <span>Also add as Shipper</span>
              </label>
            </div>
          )}
        </div>
        <button className="btn" type="submit">{editingReceiverId ? "Update" : "Add Receiver"}</button>
        {editingReceiverId && <button type="button" className="btn secondary" onClick={() => { setReceiverForm(emptyReceiver()); setEditingReceiverId(null); }}>Cancel Edit</button>}
      </form>

      <div className="search-box" style={{ marginTop: 20 }}><Search size={14} color="#8A93A3" /><input value={fleetSearch} onChange={(e) => setFleetSearch(e.target.value)} placeholder="Search receivers…" /></div>

      {filteredReceivers.length > 0 && (
        <div className="bulk-select-bar">
          <label className="bulk-select-all">
            <input type="checkbox" checked={allSelected} onChange={toggleAll} />
            <span>Select All ({filteredReceivers.length})</span>
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            {selectedIds.length > 0 && <button className="btn danger bulk-btn" onClick={handleDeleteSelected}>Delete Selected ({selectedIds.length})</button>}
            <button className="btn danger bulk-btn" onClick={handleDeleteAll}>Delete All</button>
          </div>
        </div>
      )}

      {filteredReceivers.map((r) => (
        <div className="manage-row" key={r.id}>
          <div className="manage-row-head" style={{ cursor: "default" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <input type="checkbox" checked={!!selected[r.id]} onChange={() => toggleOne(r.id)} style={{ marginTop: 3, width: 17, height: 17, accentColor: "var(--accent)", flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{r.companyName}{r.warehouseCode ? ` (${r.warehouseCode})` : ""}</div>
                <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{addr1line(r.street, r.city, r.state, r.zip) || "No address on file"}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="icon-btn" onClick={() => editReceiver(r)}><Pencil size={13} /></button>
              <button className="icon-btn" onClick={() => askConfirm(`Delete receiver "${r.companyName}"? This can't be undone.`, () => removeReceiver(r.id))}><Trash2 size={13} /></button>
            </div>
          </div>
        </div>
      ))}
      {filteredReceivers.length === 0 && <div className="empty-state">No records found.</div>}
    </div>
  );
}

function PercentScheduleEditor({ label, schedule, defaultValue, onSave }) {
  const [percent, setPercent] = useState(defaultValue);
  const [effMonth, setEffMonth] = useState(new Date().getMonth() + 1);
  const [effYear, setEffYear] = useState(new Date().getFullYear());
  const list = schedule || [];
  const sorted = [...list].sort((a, b) => (b.year - a.year) || (b.month - a.month));
  const now = new Date();
  const currentPercent = resolveScheduledPercent(list, now.getFullYear(), now.getMonth() + 1, defaultValue);

  async function handleAdd() {
    const entry = { id: uid(), year: effYear, month: effMonth, percent: num(percent) };
    const updated = [...list.filter((e) => !(e.year === effYear && e.month === effMonth)), entry];
    await onSave(updated);
  }
  async function handleRemove(id) { await onSave(list.filter((e) => e.id !== id)); }

  return (
    <div>
      <div style={{ fontSize: 12.5, color: "var(--text-dim)", marginBottom: 10 }}>Currently in effect: <strong style={{ color: "var(--text)" }}>{currentPercent}%</strong></div>
      <div className="field-row">
        <div className="field"><label>{label} %</label><input type="number" step="0.1" value={percent} onChange={(e) => setPercent(e.target.value)} /></div>
      </div>
      <div className="field-row">
        <div className="field">
          <label>Effective Month</label>
          <select value={effMonth} onChange={(e) => setEffMonth(Number(e.target.value))}>
            {MONTH_NAMES.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
          </select>
        </div>
        <div className="field"><label>Effective Year</label><input type="number" value={effYear} onChange={(e) => setEffYear(Number(e.target.value))} /></div>
      </div>
      <button className="btn" style={{ marginTop: 4 }} onClick={handleAdd}>Add Scheduled Change</button>
      {sorted.length > 0 && (
        <div style={{ marginTop: 14 }}>
          {sorted.map((e) => (
            <div className="schedule-entry-row" key={e.id}>
              <span>{MONTH_NAMES[e.month - 1]} {e.year} → {e.percent}%</span>
              <button className="icon-btn" onClick={() => handleRemove(e.id)}><X size={13} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AccountingPage(p) {
  const { setFleetView, loads, billTos, markLoadInvoiced, markLoadPaid, revertInvoiceStage, askConfirm, companyInfo, setTab, editLoad, deleteLoad, reopenLoad, truckNumbers } = p;
  const [category, setCategory] = useState("completed"); // completed | invoiced | paid
  const [search, setSearch] = useState("");
  const [printingInvoice, setPrintingInvoice] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [truckFilter, setTruckFilter] = useState("ALL");
  const [monthFilter, setMonthFilter] = useState(0); // 0 = All months
  const [yearFilter, setYearFilter] = useState(0); // 0 = All years
  const years = (() => { const y = new Date().getFullYear(); const arr = []; for (let i = y - 3; i <= Math.max(y + 1, 2040); i++) arr.push(i); return arr; })();

  function handleEditLoad(l) { editLoad(l); setTab("loads"); }
  function handleDeleteLoad(l) {
    askConfirm(`Delete load #${l.loadNumber}? This can't be undone.`, () => deleteLoad(l.id));
  }

  const billToByName = useMemo(() => Object.fromEntries(billTos.map((b) => [norm(b.name), b])), [billTos]);

  const stageForCategory = { completed: "none", invoiced: "invoiced", paid: "paid" };
  const filtered = useMemo(() => {
    const q = norm(search);
    return loads
      .filter((l) => l.status === "completed" && (l.invoiceStage || "none") === stageForCategory[category])
      .filter((l) => truckFilter === "ALL" || l.truck === truckFilter)
      .filter((l) => {
        if (!monthFilter && !yearFilter) return true;
        const d = l.deliveryDate || l.pickupDate;
        if (!d) return false;
        const dt = new Date(d + "T00:00:00");
        if (monthFilter && dt.getMonth() + 1 !== monthFilter) return false;
        if (yearFilter && dt.getFullYear() !== yearFilter) return false;
        return true;
      })
      .filter((l) => !q || norm(String(l.loadNumber || "")).includes(q) || norm(l.workOrder).includes(q) || norm(l.truck).includes(q) || norm(l.shipperTrailer).includes(q) || (l.stops || []).some((s) => norm(s.trailer).includes(q)))
      .sort((a, b) => (b.loadNumber || 0) - (a.loadNumber || 0));
  }, [loads, category, search, truckFilter, monthFilter, yearFilter]);

  const counts = useMemo(() => {
    const c = { completed: 0, invoiced: 0, paid: 0 };
    loads.filter((l) => l.status === "completed").forEach((l) => { c[l.invoiceStage === "invoiced" ? "invoiced" : l.invoiceStage === "paid" ? "paid" : "completed"] += 1; });
    return c;
  }, [loads]);

  function handleInvoice(load) {
    markLoadInvoiced(load.id);
    setPrintingInvoice({ ...load, invoiceStage: "invoiced", invoicedAt: new Date().toISOString() });
  }

  if (printingInvoice) {
    const bt = billToByName[norm(printingInvoice.billTo)];
    const stops = printingInvoice.stops || [];
    const finalStop = stops[stops.length - 1];
    return (
      <div>
        <button type="button" className="back-btn no-print" onClick={() => setPrintingInvoice(null)}><ChevronLeft size={18} /> Accounting</button>
        <div className="print-area stub-sheet">
          <div className="stub-header2">
            <div className="stub-header2-top">
              <div className="stub-brand">
                {companyInfo && companyInfo.companyLogoDataUri && <img src={companyInfo.companyLogoDataUri} alt="Company logo" className="stub-logo2-fixed" />}
                <div className="stub-brand-text">
                  {companyInfo && companyInfo.companyName ? <div className="stub-company2">{companyInfo.companyName}</div> : null}
                  {companyInfo && companyInfo.companyAddress ? <div className="stub-company2-line">{companyInfo.companyAddress}</div> : null}
                  {companyInfo && (companyInfo.dotNumber || companyInfo.companyEmail) ? (
                    <div className="stub-company2-line">{[companyInfo.dotNumber ? `DOT ${companyInfo.dotNumber}` : "", companyInfo.companyEmail].filter(Boolean).join(" · ")}</div>
                  ) : null}
                </div>
              </div>
              <div className="stub-meta2">
                <div className="stub-meta2-num">Invoice #{printingInvoice.loadNumber}</div>
                <div className="stub-meta2-line">{fmtDate((printingInvoice.invoicedAt || new Date().toISOString()).slice(0, 10))}</div>
                {printingInvoice.workOrder && <div className="stub-meta2-line">WO {printingInvoice.workOrder}</div>}
              </div>
            </div>
            <div className="stub-title-row">
              <div className="stub-title2">Invoice</div>
              <div className="stub-driver2">{(bt && bt.paymentTerms) || "Terms not on file"}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 24, marginBottom: 18 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5, color: "#888", fontWeight: 700, marginBottom: 4 }}>Bill To</div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{printingInvoice.billTo || "—"}</div>
              {bt && bt.address && <div style={{ fontSize: 11.5, color: "#555" }}>{bt.address}</div>}
            </div>
          </div>

          <table className="stub-table">
            <thead><tr><th>Load #</th><th>Pickup</th><th>Delivery</th><th>Date</th><th style={{ textAlign: "right" }}>Rate</th></tr></thead>
            <tbody>
              <tr>
                <td>{printingInvoice.loadNumber}</td>
                <td>{cityState(printingInvoice.shipperCity, printingInvoice.shipperState) || printingInvoice.shipperName || "—"}</td>
                <td>{finalStop ? (cityState(finalStop.city, finalStop.state) || finalStop.receiverName || "—") : "—"}</td>
                <td>{fmtDate(printingInvoice.deliveryDate || printingInvoice.pickupDate)}</td>
                <td style={{ textAlign: "right" }}>{money(printingInvoice.rate)}</td>
              </tr>
            </tbody>
          </table>

          <div className="stub-summary">
            <table>
              <tbody>
                <tr><td>Line Haul Rate</td><td style={{ textAlign: "right" }}>{money(printingInvoice.rate)}</td></tr>
                <tr className="net-row"><td>Total Due</td><td style={{ textAlign: "right" }}>{money(printingInvoice.rate)}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <button className="btn no-print" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={() => generatePdf(invoiceFilename(printingInvoice))}><Printer size={16} /> Download PDF</button>
      </div>
    );
  }

  return (
    <div>
      <button type="button" className="back-btn" onClick={() => setFleetView("menu")}><ChevronLeft size={18} /> Fleet</button>
      <div className="section-label" style={{ marginTop: 0 }}>Accounting</div>

      <div className="search-box">
        <Search size={14} color="#8A93A3" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by load #, invoice #, work order, truck, or trailer…" />
      </div>

      <div className="driver-subnav">
        <button className={`driver-subnav-btn ${category === "completed" ? "active" : ""}`} onClick={() => setCategory("completed")}>Completed ({counts.completed})</button>
        <button className={`driver-subnav-btn ${category === "invoiced" ? "active" : ""}`} onClick={() => setCategory("invoiced")}>Invoiced ({counts.invoiced})</button>
        <button className={`driver-subnav-btn ${category === "paid" ? "active" : ""}`} onClick={() => setCategory("paid")}>Paid ({counts.paid})</button>
      </div>

      <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
        <FilterCard
          icon={Truck} label="Truck" value={truckFilter} onChange={setTruckFilter} compact
          options={[{ value: "ALL", label: "All Trucks", shortLabel: "All" }, ...truckNumbers.map((t) => ({ value: t, label: t }))]}
        />
        <FilterCard
          icon={Calendar} label="Month" value={monthFilter} onChange={(v) => setMonthFilter(Number(v))} compact
          options={[{ value: 0, label: "All Months", shortLabel: "All" }, ...MONTH_NAMES.map((m, i) => ({ value: i + 1, label: m }))]}
        />
        <FilterCard
          icon={Calendar} label="Year" value={yearFilter} onChange={(v) => setYearFilter(Number(v))} compact
          options={[{ value: 0, label: "All Years", shortLabel: "All" }, ...years.map((y) => ({ value: y, label: String(y) }))]}
        />
      </div>

      <div className="stub-total-gross-box" style={{ marginBottom: 16 }}>
        <span>{filtered.length} Load{filtered.length === 1 ? "" : "s"} — {category === "completed" ? "Completed" : category === "invoiced" ? "Invoiced" : "Paid"}</span>
        <span>{money(filtered.reduce((s, l) => s + num(l.rate), 0))}</span>
      </div>

      {filtered.length === 0 && <div className="empty-state">No loads in this category.</div>}
      <div className="trip-card-list">
        {filtered.map((l) => {
          const open = expandedId === l.id;
          return (
          <div className="card" key={l.id} style={l.notes ? { borderRight: "3px solid #E15C4F" } : undefined}>
            <div className="card-head" onClick={() => setExpandedId(open ? null : l.id)}>
              <div className="load-card-v2-row1">
                <div className="load-card-v2-left">
                  <span className="load-card-v2-num">#{l.loadNumber}</span>
                  <span className="load-card-v2-route"><MapPin size={11} color="var(--text-dim)" style={{ display: "inline", verticalAlign: -1 }} /> {routeSummary(l)}</span>
                </div>
                <div className="load-card-v2-right-top">
                  <span className="load-card-v2-meta"><Truck size={12} color="var(--green)" /> <span style={{ color: "var(--green)" }}>{l.truck || "—"}</span></span>
                  <span className="load-card-v2-meta"><Calendar size={12} color="var(--text)" /> {shortDate(l.pickupDate)}</span>
                  <div onClick={(e) => e.stopPropagation()}>
                    {category === "completed" && (
                      <button className="btn" style={{ marginTop: 0, width: "auto", padding: "5px 10px", fontSize: 10.5 }} onClick={() => handleInvoice(l)}>Invoice</button>
                    )}
                    {category === "invoiced" && (
                      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                        <button className="btn secondary" style={{ marginTop: 0, width: "auto", padding: "5px 8px", fontSize: 10 }} onClick={() => setPrintingInvoice(l)}>View</button>
                        <button className="btn" style={{ marginTop: 0, width: "auto", padding: "5px 10px", fontSize: 10.5 }} onClick={() => markLoadPaid(l.id)}>Mark Paid</button>
                      </div>
                    )}
                    {category === "paid" && (
                      <span className="status-pill completed">Paid</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="load-card-v2-row2">
                <span className="load-card-v2-wo"><Pencil size={12} color={l.bolDataUri ? "var(--accent)" : "var(--green)"} style={{ display: "inline", verticalAlign: -1 }} /> {l.workOrder || "—"}</span>
                <span className="load-card-v2-rate">{money(l.rate)}</span>
              </div>
            </div>
            {open && (
              <div className="card-detail">
                <div className="row-line"><span>Bill To</span><span>{l.billTo || "—"}</span></div>
                <div className="row-line"><span>Work Order</span><span>{l.workOrder || "—"}</span></div>
                <div className="row-line"><span>Driver / Truck</span><span>{l.driver || "—"} · {l.truck || "—"}</span></div>
                <div className="row-line"><span>Pickup</span><span>{fmtDate(l.pickupDate)} · {cityState(l.shipperCity, l.shipperState) || l.shipperName || "—"}{l.shipperTrailer ? ` · Trailer ${l.shipperTrailer}` : ""}</span></div>
                {(l.stops || []).map((s, i) => (
                  <div className="row-line" key={s.id || i}><span>{stopLabel(i, l.stops.length)}</span><span>{cityState(s.city, s.state) || s.receiverName || "—"}{s.trailer ? ` · Trailer ${s.trailer}` : ""}</span></div>
                ))}
                <div className="row-line"><span>Delivery Date</span><span>{fmtDate(l.deliveryDate)}</span></div>
                <div className="row-line"><span>Loaded / Deadhead Miles</span><span>{l.loadedMiles || 0} / {l.deadheadMiles || 0}</span></div>
                {l.notes && (
                  <div style={{ marginTop: 10, padding: "10px 12px", background: "#B8A36914", border: "1px solid #B8A369", borderRadius: 8 }}>
                    <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 0.5, color: "#B8A369", fontWeight: 700, marginBottom: 4 }}>Note</div>
                    <div style={{ fontSize: 12.5, color: "var(--text)" }}>{l.notes}</div>
                  </div>
                )}
                {l.bolDataUri && (
                  <div style={{ marginTop: 10 }}>
                    <div style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-dim)", marginBottom: 6 }}>Bill of Lading</div>
                    {l.bolType === "image" ? (
                      <img src={l.bolDataUri} alt="BOL" style={{ maxWidth: "100%", maxHeight: 180, borderRadius: 8, border: "1px solid var(--border)", objectFit: "contain" }} />
                    ) : (
                      <a href={l.bolDataUri} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: "var(--accent)", display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}><FileText size={14} /> {l.bolFileName || "BOL.pdf"}</a>
                    )}
                  </div>
                )}
                <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                  <button className="btn secondary" style={{ marginTop: 0, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }} onClick={() => handleEditLoad(l)}><Pencil size={13} /> Edit</button>
                  <button className="btn secondary" style={{ marginTop: 0, flex: 1 }} onClick={() => reopenLoad(l.id)}>Reopen</button>
                  <button className="btn danger" style={{ marginTop: 0, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }} onClick={() => handleDeleteLoad(l)}><Trash2 size={13} /> Delete</button>
                </div>
                {category === "invoiced" && (
                  <span className="mini-link" style={{ display: "inline-block", marginTop: 10 }} onClick={() => askConfirm("Move this load back to Completed (not invoiced)?", () => revertInvoiceStage(l.id, "none"))}>Revert to Completed</span>
                )}
                {category === "paid" && (
                  <span className="mini-link" style={{ display: "inline-block", marginTop: 10 }} onClick={() => askConfirm("Move this load back to Invoiced (not yet paid)?", () => revertInvoiceStage(l.id, "invoiced"))}>Revert to Invoiced</span>
                )}
              </div>
            )}
          </div>
          );
        })}
      </div>
    </div>
  );
}

// ---- TCS "Transaction By State" report parser ----
const STATE_NAME_TO_CODE = {
  ALABAMA: "AL", ALASKA: "AK", ARIZONA: "AZ", ARKANSAS: "AR", CALIFORNIA: "CA", COLORADO: "CO", CONNECTICUT: "CT",
  DELAWARE: "DE", "DISTRICT OF COLUMBIA": "DC", FLORIDA: "FL", GEORGIA: "GA", HAWAII: "HI", IDAHO: "ID", ILLINOIS: "IL",
  INDIANA: "IN", IOWA: "IA", KANSAS: "KS", KENTUCKY: "KY", LOUISIANA: "LA", MAINE: "ME", MARYLAND: "MD",
  MASSACHUSETTS: "MA", MICHIGAN: "MI", MINNESOTA: "MN", MISSISSIPPI: "MS", MISSOURI: "MO", MONTANA: "MT",
  NEBRASKA: "NE", NEVADA: "NV", "NEW HAMPSHIRE": "NH", "NEW JERSEY": "NJ", "NEW MEXICO": "NM", "NEW YORK": "NY",
  "NORTH CAROLINA": "NC", "NORTH DAKOTA": "ND", OHIO: "OH", OKLAHOMA: "OK", OREGON: "OR", PENNSYLVANIA: "PA",
  "RHODE ISLAND": "RI", "SOUTH CAROLINA": "SC", "SOUTH DAKOTA": "SD", TENNESSEE: "TN", TEXAS: "TX", UTAH: "UT",
  VERMONT: "VT", VIRGINIA: "VA", WASHINGTON: "WA", "WEST VIRGINIA": "WV", WISCONSIN: "WI", WYOMING: "WY",
  ALBERTA: "AB", "BRITISH COLUMBIA": "BC", MANITOBA: "MB", "NEW BRUNSWICK": "NB", "NEWFOUNDLAND AND LABRADOR": "NL",
  NEWFOUNDLAND: "NL", "NOVA SCOTIA": "NS", ONTARIO: "ON", "PRINCE EDWARD ISLAND": "PE", QUEBEC: "QC", SASKATCHEWAN: "SK",
};
function titleCaseState(name) {
  return name.toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase()).replace(/\bOf\b/g, "of").replace(/\bAnd\b/g, "and");
}
// Reads a pasted or exported TCS "Transaction By State / Purchases By Unit" report.
// Keeps only the Diesel columns (Trans, Gals, Cost) — Reefer and Bio are ignored.
function parseTcsStateReport(text) {
  const clean = String(text || "").replace(/\u00a0/g, " ").replace(/\r/g, "");
  const pad2 = (n) => String(n).padStart(2, "0");
  const toISO = (s) => {
    const d = new Date(s.replace(/\./g, "").replace(/,?\s+(\d{4})$/, ", $1"));
    return isNaN(d) ? "" : `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  };
  let start = "", end = "";
  const dm = /For\s*:?\s*([A-Za-z]{3,9}\.?\s+\d{1,2},?\s+\d{4})\s*[-–—]\s*([A-Za-z]{3,9}\.?\s+\d{1,2},?\s+\d{4})/i.exec(clean);
  if (dm) { start = toISO(dm[1]); end = toISO(dm[2]); }

  const tokens = clean.split(/\s+/).filter(Boolean);
  const isNum = (t) => /^\(?\$?-?[\d,]*\.?\d+\)?$/.test(t);
  const toNum = (t) => {
    const v = parseFloat(t.replace(/[^0-9.]/g, ""));
    if (isNaN(v)) return 0;
    return /^\(.*\)$/.test(t) || t.indexOf("-") >= 0 ? -v : v;
  };
  const stateNames = Object.keys(STATE_NAME_TO_CODE);
  function matchState(i) { // longest state name (up to 4 words) starting at token i
    for (let len = 4; len >= 1; len--) {
      if (i + len > tokens.length) continue;
      const cand = tokens.slice(i, i + len).join(" ").toUpperCase();
      if (STATE_NAME_TO_CODE[cand]) return { name: cand, len };
    }
    return null;
  }
  function numbersFrom(i) {
    const out = [];
    let j = i;
    while (j < tokens.length && isNum(tokens[j])) { out.push(toNum(tokens[j])); j++; }
    return { nums: out, next: j };
  }

  const units = {};          // unit -> { state -> row }
  const reported = {};       // unit -> TCS's own "Unit X Total" diesel figures
  let unit = null;
  for (let i = 0; i < tokens.length; i++) {
    const up = tokens[i].toUpperCase();
    // "Unit Number : 245" (the colon may be its own token or attached)
    if (up === "UNIT" && tokens[i + 1] && /^NUMBER:?/i.test(tokens[i + 1])) {
      let rest = tokens[i + 1].replace(/^NUMBER/i, "");
      let j = i + 2;
      if (rest === ":" || rest === "") { if (tokens[j] === ":") j++; rest = ""; } else rest = rest.replace(/^:/, "");
      let val = rest || tokens[j] || "";
      if (!rest) j++;
      // A blank unit number is the report's company-wide total section.
      if (!val || /^TOTAL$/i.test(val) || matchState(rest ? i + 2 : j - 1)) { unit = null; i = (rest ? i + 1 : j - 2); continue; }
      unit = val.replace(/^:/, "");
      i = rest ? i + 1 : j - 1;
      continue;
    }
    // "Unit 245 Total  48 5,235 $28,504.45 ..." — remember TCS's figures to double-check ours
    if (up === "UNIT" && tokens[i + 2] && /^TOTAL$/i.test(tokens[i + 2])) {
      const { nums, next } = numbersFrom(i + 3);
      if (nums.length >= 3) reported[tokens[i + 1]] = { trans: nums[0], gals: nums[1], cost: nums[2] };
      i = next - 1;
      continue;
    }
    if (!unit) continue;
    const st = matchState(i);
    if (!st) continue;
    const { nums, next } = numbersFrom(i + st.len);
    if (nums.length < 3) continue;
    const [trans, gals, cost] = nums; // Diesel columns come first
    units[unit] = units[unit] || {};
    const row = units[unit][st.name] || { state: titleCaseState(st.name), code: STATE_NAME_TO_CODE[st.name], trans: 0, gals: 0, cost: 0 };
    row.trans += trans; row.gals += gals; row.cost = Math.round((row.cost + cost) * 100) / 100;
    units[unit][st.name] = row;
    i = next - 1;
  }
  const unitList = Object.keys(units)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((u) => {
      const rows = Object.values(units[u]).filter((r) => r.trans || r.gals || r.cost).sort((a, b) => a.state.localeCompare(b.state));
      const tot = rows.reduce((t, r) => ({ trans: t.trans + r.trans, gals: t.gals + r.gals, cost: Math.round((t.cost + r.cost) * 100) / 100 }), { trans: 0, gals: 0, cost: 0 });
      const rep = reported[u];
      const matchesTcs = rep ? (rep.trans === tot.trans && Math.abs(rep.gals - tot.gals) < 0.5 && Math.abs(rep.cost - tot.cost) < 0.01) : null;
      return { unit: u, rows, matchesTcs };
    })
    .filter((u) => u.rows.length);
  return { start, end, units: unitList };
}

// Reads TCS's CSV export: an optional state summary table, then a table with
// "Unit Num | Driver Name | Card Num | State | ST | Diesel Txns | Diesel Gals |
// Diesel Cost | Reefer… | Bio… | Total…". Keeps only the Diesel columns.
// Returns null if the sheet isn't in that layout.
function parseTcsCsvGrid(grid) {
  const cell = (r, i) => (i >= 0 && r && r[i] != null ? String(r[i]).trim() : "");
  const toN = (v) => { const n = parseFloat(String(v).replace(/[^0-9.\-]/g, "")); return isNaN(n) ? 0 : n; };
  const norm = (h) => String(h).trim().toLowerCase();
  const findCol = (hdr, re) => hdr.findIndex((h) => re.test(norm(h)));
  let summary = null;
  let unitTable = null;
  (grid || []).forEach((row, idx) => {
    const hdr = row.map(norm);
    if (!hdr.some((h) => /diesel gals/.test(h))) return;
    const cols = {
      unit: findCol(row, /^unit( num(ber)?)?$/),
      card: findCol(row, /^card( num(ber)?)?$/),
      state: findCol(row, /^state$/),
      st: findCol(row, /^st$/),
      trans: findCol(row, /^diesel (txns|trans)/),
      gals: findCol(row, /^diesel gal/),
      cost: findCol(row, /^diesel cost/),
    };
    if (cols.unit >= 0) unitTable = { idx, cols };
    else if (!summary) summary = { idx, cols };
  });
  if (!unitTable) return null;
  const codeFor = (r, c) => {
    const st = cell(r, c.st).toUpperCase();
    if (/^[A-Z]{2}$/.test(st)) return st;
    return STATE_NAME_TO_CODE[cell(r, c.state).toUpperCase()] || "";
  };
  const isHeaderOrBlank = (r) => !r || r.every((x) => String(x).trim() === "") || r.map(norm).some((h) => /diesel gals/.test(h));

  // per-unit rows (stop at the next blank line / table)
  const units = {}, cards = {};
  const c = unitTable.cols;
  for (let i = unitTable.idx + 1; i < grid.length; i++) {
    const r = grid[i];
    if (isHeaderOrBlank(r)) break;
    const unit = cell(r, c.unit);
    const code = codeFor(r, c);
    if (!unit || !code) continue;
    const name = cell(r, c.state) || code;
    units[unit] = units[unit] || {};
    cards[unit] = cards[unit] || new Set();
    const card = cell(r, c.card);
    if (card) cards[unit].add(card);
    const row = units[unit][code] || { state: titleCaseState(name), code, trans: 0, gals: 0, cost: 0 };
    row.trans += toN(cell(r, c.trans));
    row.gals = Math.round((row.gals + toN(cell(r, c.gals))) * 100) / 100;
    row.cost = Math.round((row.cost + toN(cell(r, c.cost))) * 100) / 100;
    units[unit][code] = row;
  }
  // state summary, used to double-check the per-unit rows
  let fleetCheck = null;
  if (summary) {
    const s = summary.cols, fleet = {};
    for (let i = summary.idx + 1; i < grid.length; i++) {
      const r = grid[i];
      if (isHeaderOrBlank(r)) break;
      const code = codeFor(r, s);
      if (code) fleet[code] = { gals: toN(cell(r, s.gals)), cost: toN(cell(r, s.cost)) };
    }
    const sums = {};
    Object.values(units).forEach((u) => Object.values(u).forEach((row) => {
      sums[row.code] = sums[row.code] || { gals: 0, cost: 0 };
      sums[row.code].gals += row.gals; sums[row.code].cost += row.cost;
    }));
    const codes = new Set([...Object.keys(fleet), ...Object.keys(sums)]);
    fleetCheck = [...codes].every((k) => fleet[k] && sums[k] && Math.abs(fleet[k].gals - sums[k].gals) < 0.05 && Math.abs(fleet[k].cost - sums[k].cost) < 0.05);
  }
  const unitList = Object.keys(units)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((u) => ({ unit: u, cards: [...cards[u]], rows: Object.values(units[u]).sort((a, b) => a.state.localeCompare(b.state)), matchesTcs: null }));
  return unitList.length ? { start: "", end: "", units: unitList, fleetCheck } : null;
}
// "3rd__10_05_2026…" -> Q3, in the year it was exported — unless that quarter
// hadn't ended yet when exported (e.g. a Q4 file exported in January), in which
// case it's last year's. Falls back to the most recently finished quarter.
function guessQuarterFromFilename(name) {
  const now = new Date();
  const lastQ = Math.floor(now.getMonth() / 3) || 4;
  let q = lastQ, y = lastQ === 4 && now.getMonth() < 3 ? now.getFullYear() - 1 : now.getFullYear();
  const qm = /(?:^|[^0-9])([1-4])(?:st|nd|rd|th)(?:[^a-z]|$)/i.exec(name || "") || /\bq([1-4])\b/i.exec(name || "");
  if (qm) {
    q = Number(qm[1]);
    const dm = /(\d{1,2})[_\-.](\d{1,2})[_\-.](\d{4})/.exec(name || "");
    if (dm) y = q * 3 > Number(dm[1]) ? Number(dm[3]) - 1 : Number(dm[3]);
  }
  return { quarter: q, year: y };
}
function quarterRange(q, y) {
  const m1 = (q - 1) * 3 + 1;
  return { start: `${y}-${String(m1).padStart(2, "0")}-01`, end: `${y}-${String(m1 + 2).padStart(2, "0")}-${String(new Date(y, m1 + 2, 0).getDate()).padStart(2, "0")}` };
}

function fmtGallons(g) { return Number(g || 0).toLocaleString(undefined, { maximumFractionDigits: 2 }); }
function fuelTotals(rows) {
  return rows.reduce((t, r) => ({ trans: t.trans + r.trans, gals: t.gals + r.gals, cost: Math.round((t.cost + r.cost) * 100) / 100 }), { trans: 0, gals: 0, cost: 0 });
}

// One TCS report, laid out like TCS: a band per unit, its states, then totals.
function FuelReportBody({ report, truck }) {
  const shown = report.units.filter((u) => truck === "ALL" || u.unit === truck);
  const grand = fuelTotals(shown.flatMap((u) => u.rows));
  return (
    <>
      {report.fleetCheck === true && <div style={{ fontSize: 11.5, color: "var(--green)", fontWeight: 600, marginBottom: 10 }}>✓ Every truck adds up to TCS's state totals</div>}
      {report.fleetCheck === false && <div style={{ fontSize: 11.5, color: "var(--red)", fontWeight: 600, marginBottom: 10 }}>Trucks don't add up to TCS's state totals — double-check the export</div>}
      {shown.map((u) => {
        const t = fuelTotals(u.rows);
        return (
          <div key={u.unit} style={{ marginBottom: 16 }}>
            <div className="fuel-unit-band">
              <span>Unit {u.unit}{u.cards && u.cards.length ? <span className="fuel-unit-cards"> · card {u.cards.join(", ")}</span> : null}</span>
              {u.matchesTcs === true && <span className="fuel-unit-check">✓ Matches TCS</span>}
              {u.matchesTcs === false && <span className="fuel-unit-warn">Differs from TCS total</span>}
            </div>
            <table className="stub-loads-table">
              <thead>
                <tr><th>State</th><th style={{ textAlign: "right" }}>Trans</th><th style={{ textAlign: "right" }}>Gals</th><th style={{ textAlign: "right" }}>Cost</th></tr>
              </thead>
              <tbody>
                {u.rows.map((r) => (
                  <tr key={r.code}>
                    <td>{r.state}</td>
                    <td style={{ textAlign: "right" }}>{r.trans}</td>
                    <td style={{ textAlign: "right" }}>{fmtGallons(r.gals)}</td>
                    <td style={{ textAlign: "right" }}>{money(r.cost)}</td>
                  </tr>
                ))}
                <tr className="fuel-total-row">
                  <td>Unit {u.unit} Total</td>
                  <td style={{ textAlign: "right" }}>{t.trans}</td>
                  <td style={{ textAlign: "right" }}>{fmtGallons(t.gals)}</td>
                  <td style={{ textAlign: "right" }}>{money(t.cost)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
      <div className="stub-total-gross-box">
        <span>{truck === "ALL" ? "All Trucks" : `Truck ${truck}`} · {grand.trans} Trans · {fmtGallons(grand.gals)} Gal</span>
        <span>{money(grand.cost)}</span>
      </div>
    </>
  );
}

// Fuel Report view on the IFTA page: import TCS "Transaction By State" reports
// (paste or file), keep them by period, and view them per truck.
function FuelReportSection({ fuelReports, saveFuelReport, deleteFuelReport, askConfirm }) {
  const [view, setView] = useState("list"); // list | import | report
  const [openId, setOpenId] = useState(null);
  const [pasteText, setPasteText] = useState("");
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [truck, setTruck] = useState("ALL");
  const [pvQuarter, setPvQuarter] = useState(1);
  const [pvYear, setPvYear] = useState(new Date().getFullYear());
  const fileRef = useRef(null);
  const sorted = [...(fuelReports || [])].sort((a, b) => (b.end || "").localeCompare(a.end || ""));
  const open = sorted.find((r) => r.id === openId);

  // A report without its own dates (TCS's CSV export) asks which quarter it is.
  function showPreview(r, fileName) {
    if (!r.start) {
      const g = guessQuarterFromFilename(fileName || "");
      setPvQuarter(g.quarter);
      setPvYear(g.year);
    }
    setError("");
    setTruck("ALL");
    setPreview(r);
  }
  function runParse(text, fileName) {
    let r = parseTcsStateReport(text);
    if (!r.units.length && /diesel gals/i.test(text)) {
      try {
        const wb = XLSX.read(text, { type: "string", raw: true });
        const csv = parseTcsCsvGrid(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: "", raw: false }));
        if (csv) r = csv;
      } catch { /* fall through to the error below */ }
    }
    if (!r.units.length) {
      setPreview(null);
      setError('Couldn\'t find any trucks or states. Copy the whole report, including the "Unit Number" lines.');
      return;
    }
    showPreview(r, fileName);
  }
  function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setError("");
    const reader = new FileReader();
    if (/\.txt$/i.test(file.name)) {
      reader.onload = (ev) => runParse(String(ev.target.result || ""), file.name);
      reader.readAsText(file);
      return;
    }
    reader.onload = (ev) => {
      try {
        // raw for CSV keeps card numbers like "0187" from losing their zero
        const wb = XLSX.read(ev.target.result, { type: "array", raw: /\.csv$/i.test(file.name) });
        const grids = wb.SheetNames.map((n) => XLSX.utils.sheet_to_json(wb.Sheets[n], { header: 1, defval: "", raw: false }));
        // TCS CSV table layout first, then the on-screen report layout
        const csv = grids.map((g) => parseTcsCsvGrid(g)).find(Boolean);
        if (csv) { showPreview(csv, file.name); return; }
        const text = grids.map((g) => g.map((row) => row.join("\t")).join("\n")).join("\n");
        runParse(text, file.name);
      } catch {
        setError("Couldn't read that file — use .xlsx, .xls, .csv or .txt, or paste the report instead.");
      }
    };
    reader.readAsArrayBuffer(file);
  }
  function savePreview() {
    const period = preview.start ? { start: preview.start, end: preview.end } : quarterRange(Number(pvQuarter), Number(pvYear));
    const toSave = { ...preview, ...period };
    const existing = sorted.find((r) => r.start && r.start === toSave.start && r.end === toSave.end);
    const commit = async () => {
      const saved = await saveFuelReport({ ...toSave, id: existing ? existing.id : undefined });
      setPreview(null);
      setPasteText("");
      setTruck("ALL");
      setOpenId(saved.id);
      setView("report");
    };
    if (existing) {
      askConfirm(`A fuel report for ${fmtDate(toSave.start)} – ${fmtDate(toSave.end)} is already saved. Replace it with this one?`, commit, { title: "Replace Report?", confirmLabel: "Replace", dangerous: false });
    } else commit();
  }
  const truckOptions = (rep) => [{ value: "ALL", label: "All Trucks" }, ...rep.units.map((u) => ({ value: u.unit, label: `Truck ${u.unit}` }))];

  if (view === "import") {
    return (
      <div>
        <button type="button" className="back-btn" onClick={() => { setView("list"); setPreview(null); setError(""); }}><ChevronLeft size={18} /> Fuel Reports</button>
        {!preview ? (
          <>
            <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5, marginBottom: 10 }}>
              Upload the <b>CSV file</b> you export from TCS (Transaction By State), or open that report on the TCS website, copy it, and paste it below.
            </div>
            <textarea
              className="fuel-paste-box"
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder="Paste the TCS report here…"
            />
            {error && <div style={{ color: "var(--red)", fontSize: 12, marginTop: 8, fontWeight: 600 }}>{error}</div>}
            <button className="btn" style={{ marginTop: 12 }} disabled={!pasteText.trim()} onClick={() => runParse(pasteText, "")}>Read Report</button>
            <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv,.txt" style={{ display: "none" }} onChange={handleFile} />
            <button className="btn secondary" onClick={() => fileRef.current && fileRef.current.click()}>Upload TCS CSV File</button>
          </>
        ) : (
          <>
            <div className="section-label" style={{ marginTop: 0 }}>Check before saving</div>
            {preview.start ? (
              <div style={{ fontWeight: 700, marginBottom: 12 }}>{fmtDate(preview.start)} – {fmtDate(preview.end)}</div>
            ) : (
              <>
                <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 8 }}>This file doesn't include its dates — which quarter is it for?</div>
                <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 6 }}>
                  <FilterCard
                    icon={Calendar} label="Quarter" value={pvQuarter} onChange={(v) => setPvQuarter(Number(v))}
                    options={[{ value: 1, label: "Q1 (Jan–Mar)" }, { value: 2, label: "Q2 (Apr–Jun)" }, { value: 3, label: "Q3 (Jul–Sep)" }, { value: 4, label: "Q4 (Oct–Dec)" }]}
                  />
                  <FilterCard
                    icon={Calendar} label="Year" value={pvYear} onChange={(v) => setPvYear(Number(v))}
                    options={(() => { const y = new Date().getFullYear(); const arr = []; for (let i = y + 1; i >= y - 3; i--) arr.push({ value: i, label: String(i) }); return arr; })()}
                  />
                </div>
                <div style={{ fontWeight: 700, marginBottom: 12 }}>{fmtDate(quarterRange(Number(pvQuarter), Number(pvYear)).start)} – {fmtDate(quarterRange(Number(pvQuarter), Number(pvYear)).end)}</div>
              </>
            )}
            {preview.units.length > 1 && (
              <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr", marginBottom: 14 }}>
                <FilterCard icon={Truck} label="Truck" value={truck} onChange={setTruck} options={truckOptions(preview)} fullWidth />
              </div>
            )}
            <FuelReportBody report={preview} truck={truck} />
            <button className="btn" onClick={savePreview}>Save Report</button>
            <button className="btn secondary" onClick={() => { setPreview(null); setError(""); }}>Back</button>
          </>
        )}
      </div>
    );
  }

  if (view === "report" && open) {
    return (
      <div>
        <button type="button" className="back-btn" onClick={() => { setView("list"); setTruck("ALL"); }}><ChevronLeft size={18} /> Fuel Reports</button>
        <div style={{ fontWeight: 700, fontSize: 16 }}>{fmtDate(open.start)} – {fmtDate(open.end)}</div>
        <div style={{ fontSize: 11.5, color: "var(--text-dim)", marginBottom: 14 }}>TCS Transaction By State · imported {fmtDate((open.importedAt || "").slice(0, 10))}</div>
        <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr", marginBottom: 14 }}>
          <FilterCard icon={Truck} label="Truck" value={truck} onChange={setTruck} options={truckOptions(open)} fullWidth />
        </div>
        <FuelReportBody report={open} truck={truck} />
        <button
          className="btn secondary"
          style={{ color: "var(--red)" }}
          onClick={() => askConfirm("Delete this fuel report? You can import it again anytime.", async () => { await deleteFuelReport(open.id); setView("list"); setOpenId(null); }, { title: "Delete Fuel Report", confirmLabel: "Delete", dangerous: true })}
        >
          Delete Report
        </button>
      </div>
    );
  }

  return (
    <div>
      <button className="btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={() => { setView("import"); setPreview(null); setError(""); }}>
        <Plus size={16} /> Import TCS Report
      </button>
      {sorted.length === 0 && <div className="empty-state">No fuel reports yet. Import your TCS "Transaction By State" report to see gallons and cost by truck and state.</div>}
      {sorted.map((r) => {
        const t = fuelTotals(r.units.flatMap((u) => u.rows));
        return (
          <button key={r.id} type="button" className="fuel-report-card" onClick={() => { setOpenId(r.id); setTruck("ALL"); setView("report"); }}>
            <div>
              <div style={{ fontWeight: 700 }}>{fmtDate(r.start)} – {fmtDate(r.end)}</div>
              <div style={{ fontSize: 11.5, color: "var(--text-dim)", marginTop: 2 }}>
                {r.units.length} truck{r.units.length === 1 ? "" : "s"} · {t.trans} trans · {fmtGallons(t.gals)} gal
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              {r.start && (
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--text-dim)", marginBottom: 2 }}>
                  Q{Math.floor((parseInt(r.start.slice(5, 7), 10) - 1) / 3) + 1} - {r.start.slice(0, 4)}
                </div>
              )}
              <div style={{ fontWeight: 700, color: "var(--green)" }}>{money(t.cost)}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// Reads an ELD state-miles export laid out like Lucid ELD's: a "Total distance per
// vehicle" table, a "Total distance per state" (fleet) table, then one block per
// truck ("Vehicle | 245 | VIN") listing State | State Name | Total Miles.
// Returns null when the sheet isn't in that layout.
function parseEldMiles(grid, jurisdictions, nameToCode) {
  const cell = (r, i) => String(r && r[i] != null ? r[i] : "").trim();
  const toMiles = (v) => { const n = parseFloat(String(v).replace(/[^0-9.\-]/g, "")); return isNaN(n) ? null : n; };
  const codeOf = (v) => {
    const u = String(v || "").trim().toUpperCase();
    if (jurisdictions.includes(u)) return u;
    const c = nameToCode[u];
    return c && jurisdictions.includes(c) ? c : null;
  };
  const fleet = {}, vehicles = {}, vehicleTotals = {};
  let section = null, current = null, sawLayout = false;
  (grid || []).forEach((row) => {
    const a = cell(row, 0), b = cell(row, 1);
    const lastNum = (() => { for (let i = row.length - 1; i >= 1; i--) { const n = toMiles(cell(row, i)); if (n != null && cell(row, i) !== "") return n; } return null; })();
    const al = a.toLowerCase();
    if (/^total distance per vehicle/.test(al)) { section = "vehicleTotals"; current = null; sawLayout = true; return; }
    if (/^total distance per state/.test(al)) { section = "fleet"; current = null; sawLayout = true; return; }
    if (al === "vehicle") {
      if (b.toLowerCase() === "vin") return;            // table header row
      section = "vehicle"; current = b; vehicles[current] = vehicles[current] || {}; sawLayout = true; return;
    }
    if (al === "state") return;                          // column header row
    if (section === "vehicleTotals") { if (a && lastNum != null) vehicleTotals[a] = lastNum; return; }
    const code = codeOf(a) || codeOf(b);
    if (!code || lastNum == null) return;
    if (section === "fleet") fleet[code] = (fleet[code] || 0) + lastNum;
    else if (section === "vehicle" && current) vehicles[current][code] = (vehicles[current][code] || 0) + lastNum;
  });
  if (!sawLayout || (!Object.keys(fleet).length && !Object.keys(vehicles).length)) return null;
  return { fleet, vehicles, vehicleTotals };
}

// ---- ETA Board (home page) ----
const ETA_STATUSES = [
  { key: "ready", label: "Ready", color: "#22B573", icon: CheckCircle2 },
  { key: "transit", label: "In Transit", color: "#3B82F6", icon: Truck },
  { key: "covered", label: "Covered", color: "#A855F7", icon: ShieldCheck },
  { key: "home", label: "Home", color: "#8A94A6", icon: Home },
];
const ETA_STATUS_BY_KEY = Object.fromEntries(ETA_STATUSES.map((s) => [s.key, s]));
// Wall-clock date + time in a time zone -> exact moment (ms). DST-safe.
function zonedTimeToMs(dateStr, timeStr, tz) {
  const [y, mo, d] = String(dateStr).split("-").map(Number);
  const [h, mi] = String(timeStr || "00:00").split(":").map(Number);
  if (!tz || tz === "local") return new Date(y, mo - 1, d, h || 0, mi || 0).getTime();
  const wall = Date.UTC(y, mo - 1, d, h || 0, mi || 0);
  const offsetAt = (ms) => {
    const m = {};
    new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })
      .formatToParts(new Date(ms)).forEach((p) => { if (p.type !== "literal") m[p.type] = Number(p.value); });
    return Date.UTC(m.year, m.month - 1, m.day, m.hour === 24 ? 0 : m.hour, m.minute, m.second) - ms;
  };
  let ms = wall - offsetAt(wall);
  ms = wall - offsetAt(ms);
  return ms;
}
function tzAbbrFor(tz, when) {
  const zone = !tz || tz === "local" ? undefined : tz;
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "short", hour: "numeric" }).formatToParts(when || new Date());
  return (parts.find((p) => p.type === "timeZoneName") || {}).value || "";
}
function fmtDuration(ms) {
  const mins = Math.round(Math.abs(ms) / 60000);
  const d = Math.floor(mins / 1440), h = Math.floor((mins % 1440) / 60), m = mins % 60;
  if (d) return `${d}d ${h}h`;
  if (h) return `${h}h ${String(m).padStart(2, "0")}m`;
  return `${m}m`;
}
function fmtAgo(iso, now) {
  if (!iso) return "never";
  const mins = Math.floor((now - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
// The truck's current active load (soonest delivery first), used to pre-fill.
function activeLoadForTruck(loads, truck) {
  return (loads || [])
    .filter((l) => l.status === "active" && l.truck === truck)
    .sort((a, b) => String(a.deliveryDate || a.pickupDate || "9").localeCompare(String(b.deliveryDate || b.pickupDate || "9")))[0] || null;
}
function loadRoute(load) {
  if (!load) return { from: "", fromZip: "", to: "", toZip: "", date: "", pickupPlace: "", pickupDate: "", fromCode: "", toCode: "", billTo: "", mids: [] };
  const stops = (load.stops || []).filter((st) => st.city || st.state);
  const last = stops[stops.length - 1];
  const place = (c, st) => [c, st].filter(Boolean).join(", ");
  const pickupPlace = place(load.shipperCity, load.shipperState);
  return {
    from: pickupPlace, fromZip: load.shipperZip || "",
    to: last ? place(last.city, last.state) : "", toZip: (last && last.zip) || "",
    date: load.deliveryDate || "", pickupPlace, pickupDate: load.pickupDate || "",
    fromCode: (load.shipperWarehouseCode || "").trim().toUpperCase(), toCode: ((last && last.warehouseCode) || "").trim().toUpperCase(),
    billTo: load.billTo || "",
    // stops before the final delivery
    mids: stops.slice(0, -1).map((st) => ({ place: place(st.city, st.state), zip: st.zip || "", code: (st.warehouseCode || "").trim().toUpperCase() })),
  };
}
// Trip details keep three places: where the truck is now (loc), the pickup
// (pu) and the delivery (del), each with its own ZIP and map location; pickup
// and delivery each have their own date and time.
// Entries saved before pickup/delivery were split had one From and one To.
function normEta(e) {
  if (!e) return {};
  if ("loc" in e || "pu" in e || "del" in e) return e;
  const n = {
    status: e.status || "", etaType: e.etaType || "delivery", notes: e.notes || "", updatedAt: e.updatedAt,
    loc: e.from || "", locZip: e.fromZip || "", locLat: e.fromLat ?? null, locLon: e.fromLon ?? null,
    pu: "", puZip: "", puLat: null, puLon: null, puDate: "", puTime: "",
    del: "", delZip: "", delLat: null, delLon: null, delDate: "", delTime: "",
  };
  const k = n.etaType === "pickup" ? "pu" : "del";
  Object.assign(n, { [k]: e.to || "", [`${k}Zip`]: e.toZip || "", [`${k}Lat`]: e.toLat ?? null, [`${k}Lon`]: e.toLon ?? null, [`${k}Date`]: e.etaDate || "", [`${k}Time`]: e.etaTime || "" });
  return n;
}
// ---- Multi-stop trips ----
// A trip is: pickup (pu) → any middle stops (s1, s2… in stopKeys order) → final
// delivery (del). Middle stops are drop & pick. Every stop keeps its
// fields as <key>, <key>Code, <key>Zip, <key>Lat/Lon, <key>Date/Time, <key>ArrivedAt…
// `next` is the stop the board shows the ETA for (older trips used etaType).
function etaMidKeys(e) { return Array.isArray(e && e.stopKeys) ? e.stopKeys.filter((k) => /^s\d+$/.test(k)) : []; }
function etaStopSeq(e) { return ["pu", ...etaMidKeys(e), "del"]; }
// Every place a trip entry keeps, incl. the truck's home yard (kept between trips).
function etaAllPlaces(e) { return ["loc", ...etaStopSeq(e), "yard"]; }
function etaHasPlace(e, k) { return !!(e[k] || e[`${k}Code`] || hasCoords(e[`${k}Lat`], e[`${k}Lon`])); }
function etaNextKey(e) {
  if (e.next && etaStopSeq(e).includes(e.next)) return e.next;
  return e.etaType === "pickup" ? "pu" : "del";
}
// The stop after k that has a place (null after the final delivery).
function etaAfter(e, k) {
  const seq = etaStopSeq(e);
  for (let i = seq.indexOf(k) + 1; i > 0 && i < seq.length; i++) if (etaHasPlace(e, seq[i])) return seq[i];
  return null;
}
function etaNextFields(k) { return { next: k, etaType: k === "pu" ? "pickup" : "delivery" }; }
function etaStopType(k) { return k === "pu" ? "pickup" : k === "del" ? "delivery" : k === "yard" ? "yard" : "stop"; }
// "Pickup", "Stop 2", "Delivery"
function etaStopTitle(e, k) { return k === "pu" ? "Pickup" : k === "del" ? "Delivery" : k === "yard" ? "Yard" : `Stop ${etaMidKeys(e).indexOf(k) + 1}`; }
// The drive to stop k: from the stop before it (or where the truck is now).
function etaLegTo(e, k) {
  const pt = (x) => ({ key: x, name: e[x] || "", code: e[`${x}Code`] || "", exact: !!e[`${x}Exact`], lat: e[`${x}Lat`], lon: e[`${x}Lon`] });
  const seq = etaStopSeq(e).filter((x) => x === k || etaHasPlace(e, x));
  const i = seq.indexOf(k);
  const startKey = i > 0 ? seq[i - 1] : "loc";
  return { type: etaStopType(k), key: k, start: pt(startKey), end: pt(k), date: e[`${k}Date`] || "", time: e[`${k}Time`] || "" };
}
// ---- Yard: after the last load the truck parks at its yard and the driver goes
// home. Home status + yardMode "going" (driving there) or "parked". yardSince
// marks one parking (the bot's yard events carry it); the yard itself stays on
// the truck's entry for next time.
function etaYardGoing(e) { return e.status === "home" && e.yardMode === "going" && etaHasPlace(e, "yard"); }
function etaYardParked(e) { return e.yardMode === "parked"; }
// The leg the board shows: the drive to the next stop (or to the yard).
function etaLeg(e) { return etaYardGoing(e) ? etaLegTo(e, "yard") : etaLegTo(e, etaNextKey(e)); }
// Legs that get a road route: the trip's, or just the drive to the yard.
function etaRouteLegs(e) { return e.status === "home" ? (etaYardGoing(e) ? [etaLegTo(e, "yard")] : []) : etaAllLegs(e); }
// Identity of a list of middle stops (load stops or trip stops), to tell whether
// the trip's middle stops still match the load they were copied from.
function loadMidsSig(mids) { return mids.map((m) => `${(m.code || "").toUpperCase()}|${norm(m.place)}|${m.zip || ""}`).join(";"); }
function tripMidsSig(e) { return loadMidsSig(etaMidKeys(e).map((k) => ({ code: e[`${k}Code`] || "", place: e[k] || "", zip: e[`${k}Zip`] || "" }))); }
// Every leg of the trip, for road routes.
function etaAllLegs(e) { return etaStopSeq(e).filter((k) => etaHasPlace(e, k)).map((k) => etaLegTo(e, k)); }

// Identifies one stop of one trip (place + date). The Telegram bot uses the same
// key for GPS arrivals, so an old trip's events never land on a new one.
function etaPlaceKey(e, k) {
  if (k === "yard") return e.yardSince ? `yard::${e.yardSince}` : null;
  const lat = e[`${k}Lat`], lon = e[`${k}Lon`];
  if (!hasCoords(lat, lon)) return null;
  return `${k}:${lat.toFixed(4)},${lon.toFixed(4)}:${e[`${k}Date`] || ""}`;
}
const DETENTION_FREE_MS = 2 * 3600000; // detention usually starts after 2 hours on site
// Amazon trips are read by facility code (ONT8 → LAX9); other brokers by city.
function etaShowsCodes(e) { return !e.billTo || /amazon/i.test(e.billTo); }
function etaPlaceName(e, pt) { return pt.code && etaShowsCodes(e) ? pt.code : pt.name; }
// Small grey line under a code: the city it's in.
function etaPlaceSub(e, pt) { return pt.code && etaShowsCodes(e) && pt.name && pt.name.toUpperCase() !== pt.code ? pt.name : ""; }

// ---- ZIP lookup (Zippopotam.us: free, open source, CORS-enabled) ----
// Results are cached for the session; in-flight lookups are shared.
const zipLookupCache = {};
function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((resolve) => setTimeout(() => resolve(null), ms))]);
}
function lookupZip(zip) {
  const z = String(zip || "").trim();
  if (!/^\d{5}$/.test(z)) return Promise.resolve(null);
  if (!zipLookupCache[z]) {
    zipLookupCache[z] = fetch(`https://api.zippopotam.us/us/${z}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => {
        const pl = d && d.places && d.places[0];
        return pl ? { city: pl["place name"], state: pl["state abbreviation"], lat: parseFloat(pl.latitude), lon: parseFloat(pl.longitude) } : null;
      })
      .catch(() => { delete zipLookupCache[z]; return null; }); // offline: try again later
  }
  return withTimeout(zipLookupCache[z], 6000);
}
// "Nampa, ID" -> the city's center (average of its ZIP locations)
function lookupCityCoords(text) {
  const m = /^\s*(.+?)\s*,\s*([A-Za-z]{2})\s*$/.exec(String(text || ""));
  if (!m) return Promise.resolve(null);
  const key = `${m[1].toLowerCase()}|${m[2].toLowerCase()}`;
  if (!zipLookupCache[key]) {
    zipLookupCache[key] = fetch(`https://api.zippopotam.us/us/${m[2].toLowerCase()}/${encodeURIComponent(m[1].toLowerCase())}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => {
        const pts = ((d && d.places) || []).map((pl) => ({ lat: parseFloat(pl.latitude), lon: parseFloat(pl.longitude) })).filter((pt) => !isNaN(pt.lat) && !isNaN(pt.lon));
        if (!pts.length) return null;
        return { lat: pts.reduce((a, pt) => a + pt.lat, 0) / pts.length, lon: pts.reduce((a, pt) => a + pt.lon, 0) / pts.length };
      })
      .catch(() => { delete zipLookupCache[key]; return null; });
  }
  return withTimeout(zipLookupCache[key], 6000);
}
function hasCoords(lat, lon) { return typeof lat === "number" && typeof lon === "number" && !isNaN(lat) && !isNaN(lon); }
function milesBetween(a, b) {
  const R = 3958.8, rad = (x) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
// No GPS: the position is estimated from the ETA alone. The truck is assumed to
// drive at an average speed on roads ~20% longer than a straight line, so the
// time left until the ETA tells how much distance is left.
const ETA_AVG_MPH = 50;
const ETA_ROAD_FACTOR = 1.2;
// Compass heading (0 = north, 90 = east) from point a to point b.
function bearingDeg(a, b) {
  const rad = (x) => (x * Math.PI) / 180;
  const y = Math.sin(rad(b.lon - a.lon)) * Math.cos(rad(b.lat));
  const x = Math.cos(rad(a.lat)) * Math.sin(rad(b.lat)) - Math.sin(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.cos(rad(b.lon - a.lon));
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}
// The spot `pct` of the way along a road route ([lon, lat] points), with the heading there.
function pointAlongRoute(coords, pct) {
  const pt = (c) => ({ lat: c[1], lon: c[0] });
  const cum = [0];
  for (let i = 1; i < coords.length; i++) cum.push(cum[i - 1] + milesBetween(pt(coords[i - 1]), pt(coords[i])));
  const target = cum[cum.length - 1] * pct;
  let i = 1;
  while (i < coords.length - 1 && cum[i] < target) i++;
  const seg = cum[i] - cum[i - 1], t = seg > 0 ? (target - cum[i - 1]) / seg : 0;
  const a = pt(coords[i - 1]), b = pt(coords[i]);
  // heading: look a little ahead so tiny zig-zags don't flip the arrow
  let j = i;
  while (j < coords.length - 1 && cum[j] - target < 0.5) j++;
  const here = { lat: a.lat + (b.lat - a.lat) * t, lon: a.lon + (b.lon - a.lon) * t };
  const ahead = pt(coords[j]);
  const bearing = milesBetween(here, ahead) > 0.01 ? bearingDeg(here, ahead) : bearingDeg(a, b);
  return { ...here, bearing };
}
// Where the truck should be now, working back from its ETA. With a road route
// it follows the real roads and the route's own drive time; without one it
// falls back to a straight line at ~50 mph.
function etaProgress(leg, etaMs, now, route) {
  if (etaMs == null || !leg.time || !hasCoords(leg.start.lat, leg.start.lon) || !hasCoords(leg.end.lat, leg.end.lon)) return null;
  const a = { lat: leg.start.lat, lon: leg.start.lon }, b = { lat: leg.end.lat, lon: leg.end.lon };
  const onRoad = !!(route && route.coords && route.coords.length > 1);
  const roadMiles = onRoad && route.miles ? route.miles : milesBetween(a, b) * ETA_ROAD_FACTOR;
  const hours = onRoad && route.sec ? route.sec / 3600 : roadMiles / ETA_AVG_MPH;
  const pct = roadMiles < 1 ? (etaMs <= now ? 1 : 0) : Math.min(1, Math.max(0, 1 - (etaMs - now) / 3600000 / hours));
  if (onRoad) {
    const p = pointAlongRoute(route.coords, pct);
    return { pct, roadMiles, pos: { lat: p.lat, lon: p.lon }, bearing: p.bearing, onRoad };
  }
  return { pct, roadMiles, pos: { lat: a.lat + (b.lat - a.lat) * pct, lon: a.lon + (b.lon - a.lon) * pct }, bearing: bearingDeg(a, b), onRoad };
}
// Live GPS: how far along the leg a real position is, by snapping it to the
// nearest point of the road route (or measuring straight-line without one).
function progressAtPoint(leg, route, pos) {
  if (!hasCoords(leg.start.lat, leg.start.lon) || !hasCoords(leg.end.lat, leg.end.lon)) return null;
  const b = { lat: leg.end.lat, lon: leg.end.lon };
  if (route && route.coords && route.coords.length > 1) {
    const pts = route.coords.map((c) => ({ lat: c[1], lon: c[0] }));
    let best = 0, bestD = Infinity;
    pts.forEach((p, i) => { const d = milesBetween(p, pos); if (d < bestD) { bestD = d; best = i; } });
    let done = 0, total = 0;
    for (let i = 1; i < pts.length; i++) { const s = milesBetween(pts[i - 1], pts[i]); total += s; if (i <= best) done += s; }
    const scale = route.miles && total > 0 ? route.miles / total : 1; // straight segments → road miles
    const nxt = pts[Math.min(best + 1, pts.length - 1)];
    return { pct: total > 0 ? Math.min(1, Math.max(0, done / total)) : 0, milesLeft: Math.max(0, total - done) * scale, roadBearing: milesBetween(pos, nxt) > 0.01 ? bearingDeg(pos, nxt) : null };
  }
  const total = milesBetween({ lat: leg.start.lat, lon: leg.start.lon }, b), left = milesBetween(pos, b);
  return { pct: total > 0 ? Math.min(1, Math.max(0, 1 - left / total)) : 0, milesLeft: left * ETA_ROAD_FACTOR, roadBearing: left > 0.01 ? bearingDeg(pos, b) : null };
}

// ---- Live location from drivers' phones (Telegram bot → driver_locations) ----
const TELEGRAM_BOT = "TruxFlow_Stride_bot";
const LIVE_FRESH_MS = 15 * 60000; // green "Live"
const GPS_KEEP_MS = 60 * 60000; // after sharing stops, last fix is still shown this long
const GPS_KEEP_SHARING_MS = 12 * 3600000; // still sharing but parked (phones send less when not moving)
const driverLinkUrl = (code) => `https://t.me/${TELEGRAM_BOT}?start=${code}`;
function newLinkCode() {
  const abc = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const a = new Uint8Array(14);
  crypto.getRandomValues(a);
  return Array.from(a, (x) => abc[x % abc.length]).join("");
}
const LINK_COLS = "driver_name, code, telegram_chat_id, telegram_user_name, linked_at";

// ---- Truck road routes (Geoapify Routing, truck mode; free plan allows commercial use) ----
// Fetched once when a trip is saved and stored with it, so viewing the map costs nothing.
// Street address → exact spot (same Geoapify key). Only a building-level match
// counts; a street- or city-level guess is not exact enough to detect arrivals.
async function geocodeAddress(text, apiKey) {
  if (!apiKey || !text) return null;
  const url = `https://api.geoapify.com/v1/geocode/search?format=json&limit=1&filter=countrycode:us&text=${encodeURIComponent(text)}&apiKey=${encodeURIComponent(apiKey)}`;
  const d = await withTimeout(fetch(url).then((res) => (res.ok ? res.json() : null)).catch(() => null), 10000);
  const r = d && d.results && d.results[0];
  if (!r || !hasCoords(r.lat, r.lon)) return null;
  if (r.result_type !== "building" && r.result_type !== "amenity") return null;
  if (r.rank && typeof r.rank.confidence === "number" && r.rank.confidence < 0.7) return null;
  return { lat: r.lat, lon: r.lon };
}
function legRouteKey(leg) {
  if (!hasCoords(leg.start.lat, leg.start.lon) || !hasCoords(leg.end.lat, leg.end.lon)) return null;
  const f = (n) => n.toFixed(4);
  return `${f(leg.start.lat)},${f(leg.start.lon)}>${f(leg.end.lat)},${f(leg.end.lon)}`;
}
function thinLine(coords, max) {
  if (coords.length <= max) return coords;
  const step = (coords.length - 1) / (max - 1);
  const out = [];
  for (let i = 0; i < max - 1; i++) out.push(coords[Math.round(i * step)]);
  out.push(coords[coords.length - 1]);
  return out;
}
async function fetchTruckRoute(leg, apiKey) {
  if (!apiKey || !legRouteKey(leg)) return null;
  const url = `https://api.geoapify.com/v1/routing?waypoints=${leg.start.lat},${leg.start.lon}|${leg.end.lat},${leg.end.lon}&mode=truck&units=imperial&apiKey=${encodeURIComponent(apiKey)}`;
  const data = await withTimeout(fetch(url).then((res) => (res.ok ? res.json() : null)).catch(() => null), 15000);
  const f = data && data.features && data.features[0];
  if (!f || !f.geometry) return null;
  const lines = f.geometry.type === "MultiLineString" ? f.geometry.coordinates : [f.geometry.coordinates];
  const coords = thinLine(lines.flat().filter((c) => Array.isArray(c) && c.length >= 2), 500)
    .map((c) => [Math.round(c[0] * 1e5) / 1e5, Math.round(c[1] * 1e5) / 1e5]);
  if (coords.length < 2) return null;
  return { coords, miles: Number(f.properties && f.properties.distance) || null, sec: Number(f.properties && f.properties.time) || null };
}
// Routes for every leg of a trip, reusing ones already stored for the same endpoints.
async function routesForEntry(entry, oldRoutes, apiKey) {
  const out = {};
  for (const leg of etaRouteLegs(entry)) {
    const key = legRouteKey(leg);
    if (!key || out[key]) continue;
    if (oldRoutes && oldRoutes[key]) { out[key] = oldRoutes[key]; continue; }
    const r = await fetchTruckRoute(leg, apiKey);
    if (r) out[key] = r;
  }
  return out;
}
// Always the full date and time, e.g. "Oct 6, 12:15 PM"
function fmtEtaFull(dateStr, timeStr) {
  const day = new Date(dateStr + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" });
  if (!timeStr) return day;
  const [h, m] = timeStr.split(":").map(Number);
  return `${day}, ${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

// ---- Map (MapLibre GL + OpenFreeMap "Liberty": highways and city names; free, no key, commercial use OK) ----
// Loaded only the first time the Map view opens, so app start-up stays fast.
const MAPLIBRE_JS = "https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.0/dist/maplibre-gl.js";
const MAPLIBRE_CSS = "https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.0/dist/maplibre-gl.css";
const ETA_MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const WEST_COAST_BOUNDS = [[-125.2, 31.3], [-110.6, 49.2]];
// Aerial photos from the US Geological Survey (public domain, US only, sharp to zoom 16).
const SAT_TILES = "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}";
let maplibreLoading = null;
function loadMapLibre() {
  if (window.maplibregl) return Promise.resolve(window.maplibregl);
  if (!maplibreLoading) {
    maplibreLoading = new Promise((resolve, reject) => {
      if (!document.querySelector(`link[href="${MAPLIBRE_CSS}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = MAPLIBRE_CSS;
        document.head.appendChild(link);
      }
      const sc = document.createElement("script");
      sc.src = MAPLIBRE_JS;
      sc.async = true;
      sc.onload = () => (window.maplibregl ? resolve(window.maplibregl) : reject(new Error("MapLibre missing")));
      sc.onerror = () => { maplibreLoading = null; reject(new Error("MapLibre failed to load")); };
      document.head.appendChild(sc);
    });
  }
  return maplibreLoading;
}

// Splits a day's GPS points into driven lines (gaps over 30 min are drawn dashed),
// stops (parked 15+ min) and totals for the trail summary.
function summarizeTrail(points) {
  const lines = [], gaps = [], stops = [];
  let cur = [], miles = 0, movingMs = 0, maxMph = 0;
  for (let i = 0; i < points.length; i++) {
    const p = points[i], q = points[i - 1];
    if (q) {
      const dt = new Date(p.at) - new Date(q.at), d = milesBetween(q, p);
      if (dt > 30 * 60000) { if (cur.length > 1) lines.push(cur); gaps.push([[q.lon, q.lat], [p.lon, p.lat]]); cur = []; }
      else { miles += d; if (d / (dt / 3600000) >= 5) movingMs += dt; }
    }
    cur.push([p.lon, p.lat]);
    if (p.speed_mph != null) maxMph = Math.max(maxMph, Number(p.speed_mph));
  }
  if (cur.length > 1) lines.push(cur);
  // stops: stayed within ~0.15 mi for 15+ minutes
  for (let i = 0; i < points.length;) {
    let j = i;
    while (j + 1 < points.length && milesBetween(points[i], points[j + 1]) < 0.15) j++;
    const ms = new Date(points[j].at) - new Date(points[i].at);
    if (ms >= 15 * 60000) stops.push({ lat: points[i].lat, lon: points[i].lon, from: points[i].at, to: points[j].at, ms });
    i = j + 1;
  }
  return { lines, gaps, stops, miles, movingMs, maxMph };
}

function EtaMapView({ items, onEdit, roadRoutes, truckOptions, focusTruck, onFocusTruck, loadTrail, tz }) {
  const boxRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const onEditRef = useRef(onEdit);
  onEditRef.current = onEdit;
  const itemsRef = useRef(items);
  itemsRef.current = items;
  const [state, setState] = useState("loading"); // loading | ready | error
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [sat, setSat] = useState(() => { try { return localStorage.getItem("eta-map-sat") === "1"; } catch { return false; } });
  const fillVis = useRef(null); // the map style's own fill layers, and whether each was shown
  // GPS trail replay (one truck, one day)
  const [trailDay, setTrailDay] = useState(null); // "YYYY-MM-DD" or null = off
  const [trailMenu, setTrailMenu] = useState(false);
  const [trail, setTrail] = useState(null); // { points, sum } | { loading } | { error }
  const trailRef = useRef(null);
  const trailMarkers = useRef([]);
  const trailPoints = useRef([]);

  useEffect(() => {
    let cancelled = false;
    let map = null;
    loadMapLibre()
      .then((ml) => {
        if (cancelled || !boxRef.current) return;
        try {
          map = new ml.Map({
            container: boxRef.current,
            style: ETA_MAP_STYLE,
            bounds: WEST_COAST_BOUNDS,
            fitBoundsOptions: { padding: 12 },
            attributionControl: roadRoutes ? { compact: true, customAttribution: 'Truck routes <a href="https://www.geoapify.com/" target="_blank" rel="noopener">Powered by Geoapify</a>' } : { compact: true },
            dragRotate: false,
            pitchWithRotate: false,
            touchPitch: false,
          });
          map.touchZoomRotate.disableRotation();
          map.addControl(new ml.NavigationControl({ showCompass: false }), "top-right");
          map.on("load", () => {
            if (cancelled) return;
            map.addSource("trail", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
            map.addLayer({ id: "trail-gap", type: "line", source: "trail", filter: ["==", ["get", "gap"], true], layout: { "line-cap": "round" }, paint: { "line-color": "#7C3AED", "line-width": 3, "line-opacity": 0.6, "line-dasharray": [1, 2] } });
            map.addLayer({ id: "trail-line", type: "line", source: "trail", filter: ["!=", ["get", "gap"], true], layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#7C3AED", "line-width": 4.5, "line-opacity": 0.85 } });
            // tap the trail: time and speed at that spot
            map.on("click", (ev) => {
              const pts = trailPoints.current;
              if (!pts.length) return;
              let best = null, bestPx = 28;
              pts.forEach((p) => { const sp = map.project([p.lon, p.lat]); const d = Math.hypot(sp.x - ev.point.x, sp.y - ev.point.y); if (d < bestPx) { bestPx = d; best = p; } });
              if (!best) return;
              const t = new Date(best.at).toLocaleTimeString("en-US", { timeZone: tzRef.current, hour: "numeric", minute: "2-digit" });
              new ml.Popup({ closeButton: false, offset: 8 }).setLngLat([best.lon, best.lat]).setText(`${t}${best.speed_mph != null ? ` · ${Math.round(best.speed_mph)} mph` : ""}${best.state ? ` · ${best.state}` : ""}`).addTo(map);
            });
            map.addSource("eta-routes", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
            map.addLayer({ id: "eta-routes", type: "line", source: "eta-routes", layout: { "line-cap": "round" }, paint: { "line-color": ["get", "color"], "line-width": 3, "line-opacity": 0.7, "line-dasharray": [2, 1.5] } });
            map.addSource("eta-ends", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
            map.addLayer({ id: "eta-ends", type: "circle", source: "eta-ends", paint: { "circle-radius": 4.5, "circle-color": ["get", "fill"], "circle-stroke-color": ["get", "color"], "circle-stroke-width": 2 } });
            mapRef.current = map;
            setState("ready");
          });
        } catch {
          if (!cancelled) setState("error"); // e.g. WebGL unavailable
        }
      })
      .catch(() => { if (!cancelled) setState("error"); });
    return () => {
      cancelled = true;
      markersRef.current.forEach((mk) => mk.remove());
      markersRef.current = [];
      if (map) map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current, ml = window.maplibregl;
    if (state !== "ready" || !map || !ml) return;
    const routes = items.filter((it) => it.route);
    map.getSource("eta-routes").setData({
      type: "FeatureCollection",
      features: routes.map((it) => ({ type: "Feature", properties: { color: it.color }, geometry: { type: "LineString", coordinates: it.route.coords || [[it.route.from.lon, it.route.from.lat], [it.route.to.lon, it.route.to.lat]] } })),
    });
    map.getSource("eta-ends").setData({
      type: "FeatureCollection",
      features: routes.flatMap((it) => [
        { type: "Feature", properties: { color: it.color, fill: "#ffffff" }, geometry: { type: "Point", coordinates: [it.route.from.lon, it.route.from.lat] } },
      ]),
    });
    markersRef.current.forEach((mk) => mk.remove());
    // Destination flags: red flag on a pole, with a short thin angled line out to the
    // truck number(s). Trucks heading to the same place share one flag.
    const dests = {};
    routes.forEach((it) => {
      const k = `${it.route.to.lat.toFixed(3)},${it.route.to.lon.toFixed(3)}`;
      const dst = (dests[k] = dests[k] || { pt: it.route.to, trucks: [], codes: [] });
      dst.trucks.push(it.truck);
      if (it.destCode && !dst.codes.includes(it.destCode)) dst.codes.push(it.destCode); // codes sharing one building
    });
    const NS = "http://www.w3.org/2000/svg";
    const svgEl = (tag, attrs) => { const n = document.createElementNS(NS, tag); Object.entries(attrs).forEach(([a, v]) => n.setAttribute(a, v)); return n; };
    const flagMarkers = Object.values(dests).map((d) => {
      const label = d.trucks.join(" · ");
      d.code = d.codes.join("/");
      const w = 22 + (label.length + (d.code ? d.code.length + 3 : 0)) * 6.5;
      const svg = svgEl("svg", { width: w, height: 40, viewBox: `0 0 ${w} 40`, class: "eta-dest-flag" });
      svg.appendChild(svgEl("line", { x1: 4, y1: 39, x2: 4, y2: 17, stroke: "#1F2937", "stroke-width": 1.8, "stroke-linecap": "round" }));
      svg.appendChild(svgEl("path", { d: "M4 17 L19 21.5 L4 26 Z", fill: "#E53935", stroke: "#fff", "stroke-width": 1, "stroke-linejoin": "round" }));
      svg.appendChild(svgEl("circle", { cx: 4, cy: 38, r: 2.2, fill: "#E53935", stroke: "#fff", "stroke-width": 1 }));
      svg.appendChild(svgEl("polyline", { points: "4,17 14,9", fill: "none", stroke: "#1F2937", "stroke-width": 0.9, "stroke-opacity": 0.75 }));
      const text = svgEl("text", { x: 15.5, y: 8.5, "font-size": 10.5, "font-weight": 500, fill: "#1F2937", "font-family": "Inter, system-ui, sans-serif", stroke: "#fff", "stroke-width": 3, "paint-order": "stroke", "dominant-baseline": "auto" });
      if (d.code) {
        const codeSpan = svgEl("tspan", { "font-weight": 700, fill: "#E53935" });
        codeSpan.textContent = `${d.code} `;
        text.appendChild(codeSpan);
        const rest = svgEl("tspan", {});
        rest.textContent = `· ${label}`;
        text.appendChild(rest);
      } else text.textContent = label;
      svg.appendChild(text);
      const wrap = document.createElement("div");
      wrap.appendChild(svg);
      return new ml.Marker({ element: wrap, anchor: "bottom-left", offset: [-4, 0] }).setLngLat([d.pt.lon, d.pt.lat]).addTo(map);
    });
    // Trucks at the same spot (e.g. same ZIP) are fanned out side by side in
    // screen pixels, so they stay apart at every zoom level.
    const groups = {};
    items.forEach((it) => { const k = `${it.pos.lat.toFixed(3)},${it.pos.lon.toFixed(3)}`; (groups[k] = groups[k] || []).push(it.truck); });
    const spread = (it) => {
      const g = groups[`${it.pos.lat.toFixed(3)},${it.pos.lon.toFixed(3)}`];
      if (g.length < 2) return [0, 0];
      const idx = g.indexOf(it.truck), cols = Math.min(g.length, 4), rowsN = Math.ceil(g.length / cols);
      const col = idx % cols, row = Math.floor(idx / cols);
      const inRow = row === rowsN - 1 ? g.length - row * cols : cols;
      return [Math.round((col - (inRow - 1) / 2) * 48), Math.round((row - (rowsN - 1) / 2) * 30)];
    };
    markersRef.current = items.map((it) => {
      const [dx, dy] = spread(it);
      const el = document.createElement("div");
      el.className = `eta-map-marker${it.live ? " live" : ""}`;
      el.style.background = it.color;
      el.textContent = it.truck;
      if (typeof it.bearing === "number") {
        // direction of travel, right under the truck number
        const arrow = document.createElement("div");
        // leads the truck: above the number when heading north-ish, below when south-ish
        const northward = it.bearing > 270 || it.bearing < 90;
        arrow.className = `eta-map-heading ${northward ? "above" : "below"}`;
        arrow.style.color = it.color;
        arrow.style.transform = `translateX(-50%) rotate(${Math.round(it.bearing)}deg)`;
        arrow.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 3 L20 20 L12 15.5 L4 20 Z" fill="currentColor" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>';
        el.appendChild(arrow);
      }
      const pop = document.createElement("div");
      pop.className = "eta-map-pop";
      const line = (text, cls) => { const d = document.createElement("div"); d.className = cls; d.textContent = text; pop.appendChild(d); };
      line(`Truck ${it.truck}${it.driver ? ` · ${it.driver}` : ""}`, "eta-map-pop-title");
      if (it.statusLabel) line(it.statusLabel, "eta-map-pop-status");
      if (it.routeText) line(it.routeText, "eta-map-pop-line");
      if (it.etaText) line(it.etaText, "eta-map-pop-line");
      if (it.gpsText) line(it.gpsText, `eta-map-pop-note gps ${it.live ? "live" : ""}`);
      else if (it.estimated) line("Estimated position — no GPS", "eta-map-pop-note");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "eta-map-pop-btn";
      btn.textContent = "Edit trip";
      btn.addEventListener("click", () => onEditRef.current(it.truck));
      pop.appendChild(btn);
      const o = (x, y) => [dx + x, dy + y];
      const popOffset = { center: o(0, 0), top: o(0, 16), "top-left": o(0, 16), "top-right": o(0, 16), bottom: o(0, -16), "bottom-left": o(0, -16), "bottom-right": o(0, -16), left: o(16, 0), right: o(-16, 0) };
      const popup = new ml.Popup({ offset: popOffset, closeButton: false, maxWidth: "240px" }).setDOMContent(pop);
      return new ml.Marker({ element: el, offset: [dx, dy] }).setLngLat([it.pos.lon, it.pos.lat]).setPopup(popup).addTo(map);
    }).concat(flagMarkers);
  }, [items, state]);

  // Satellite: photo layer just above the background; the style's own land/water/
  // building fills are hidden so roads, names and trucks sit on top of the photo.
  useEffect(() => {
    const map = mapRef.current;
    if (state !== "ready" || !map) return;
    try { localStorage.setItem("eta-map-sat", sat ? "1" : "0"); } catch { /* private mode */ }
    if (!map.getSource("sat")) {
      if (!sat) return;
      map.addSource("sat", { type: "raster", tiles: [SAT_TILES], tileSize: 256, maxzoom: 16, attribution: 'Imagery <a href="https://www.usgs.gov/" target="_blank" rel="noopener">USGS</a>' });
      const layers = map.getStyle().layers;
      const after = layers.find((l) => l.type !== "background");
      map.addLayer({ id: "sat", type: "raster", source: "sat", paint: { "raster-fade-duration": 150 } }, after ? after.id : undefined);
      fillVis.current = layers.filter((l) => l.type === "fill" || l.type === "fill-extrusion").map((l) => [l.id, map.getLayoutProperty(l.id, "visibility") !== "none"]);
    }
    map.setLayoutProperty("sat", "visibility", sat ? "visible" : "none");
    (fillVis.current || []).forEach(([id, shown]) => { if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", !sat && shown ? "visible" : "none"); });
  }, [sat, state]);

  const tzRef = useRef(tz);
  tzRef.current = tz && tz !== "local" ? tz : undefined;
  // Trail: switch off when the truck changes; load the picked day's points.
  useEffect(() => { setTrailDay(null); }, [focusTruck]);
  useEffect(() => {
    let gone = false;
    if (!trailDay || !focusTruck || focusTruck === "all" || !loadTrail) { setTrail(null); return; }
    setTrail({ loading: true });
    loadTrail(focusTruck, trailDay).then((points) => {
      if (gone) return;
      if (!points) { setTrail({ error: true }); return; }
      setTrail({ points, sum: summarizeTrail(points) });
    });
    return () => { gone = true; };
  }, [trailDay, focusTruck]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const map = mapRef.current, ml = window.maplibregl;
    if (state !== "ready" || !map || !ml || !map.getSource("trail")) return;
    trailMarkers.current.forEach((m) => m.remove());
    trailMarkers.current = [];
    const pts = trail && trail.points ? trail.points : [];
    trailPoints.current = pts;
    const sum = trail && trail.sum;
    map.getSource("trail").setData({ type: "FeatureCollection", features: sum ? [
      ...sum.lines.map((c) => ({ type: "Feature", properties: { gap: false }, geometry: { type: "LineString", coordinates: c } })),
      ...sum.gaps.map((c) => ({ type: "Feature", properties: { gap: true }, geometry: { type: "LineString", coordinates: c } })),
    ] : [] });
    if (!pts.length) return;
    const fmt = (iso) => new Date(iso).toLocaleTimeString("en-US", { timeZone: tzRef.current, hour: "numeric", minute: "2-digit" });
    const pin = (p, text, cls) => {
      const el = document.createElement("div");
      el.className = `trail-pin ${cls}`;
      el.textContent = text;
      return new ml.Marker({ element: el }).setLngLat([p.lon, p.lat]).addTo(map);
    };
    trailMarkers.current = [
      pin(pts[0], `Start ${fmt(pts[0].at)}`, "start"),
      ...sum.stops.map((st) => pin(st, `${fmtDuration(st.ms)} · ${fmt(st.from)}`, "stop")),
      pin(pts[pts.length - 1], `End ${fmt(pts[pts.length - 1].at)}`, "end"),
    ];
    const lons = pts.map((p) => p.lon), lats = pts.map((p) => p.lat);
    map.fitBounds([[Math.min(...lons), Math.min(...lats)], [Math.max(...lons), Math.max(...lats)]], { padding: 60, maxZoom: 13 });
  }, [trail, state]);
  // Trail day menu: today, the last 6 days, or any day within 60 days
  const trailDays = useMemo(() => {
    const out = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(Date.now() - i * 86400000);
      const key = d.toLocaleDateString("en-CA", { timeZone: tz && tz !== "local" ? tz : undefined });
      out.push({ key, label: i === 0 ? "Today" : i === 1 ? "Yesterday" : d.toLocaleDateString("en-US", { timeZone: tz && tz !== "local" ? tz : undefined, weekday: "short", month: "short", day: "numeric" }) });
    }
    return out;
  }, [tz, trailMenu]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!trailMenu) return;
    const close = (ev) => { if (trailRef.current && !trailRef.current.contains(ev.target)) setTrailMenu(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [trailMenu]);

  // Truck picker: close when tapping anywhere else.
  useEffect(() => {
    if (!menuOpen) return;
    const close = (ev) => { if (menuRef.current && !menuRef.current.contains(ev.target)) setMenuOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [menuOpen]);

  // Picking a truck zooms to its route (or its spot); "All trucks" goes back to the West Coast.
  useEffect(() => {
    const map = mapRef.current;
    if (state !== "ready" || !map) return;
    if (!focusTruck || focusTruck === "all") { map.fitBounds(WEST_COAST_BOUNDS, { padding: 12 }); return; }
    const it = itemsRef.current.find((x) => x.truck === focusTruck);
    if (!it) return;
    const pts = it.route ? (it.route.coords || [[it.route.from.lon, it.route.from.lat], [it.route.to.lon, it.route.to.lat]]) : [];
    if (pts.length > 1) {
      const lons = pts.map((c) => c[0]).concat(it.pos.lon), lats = pts.map((c) => c[1]).concat(it.pos.lat);
      map.fitBounds([[Math.min(...lons), Math.min(...lats)], [Math.max(...lons), Math.max(...lats)]], { padding: 56, maxZoom: 11 });
    } else {
      map.easeTo({ center: [it.pos.lon, it.pos.lat], zoom: 9 });
    }
  }, [focusTruck, state]);

  return (
    <div className="eta-map-box">
      <div ref={boxRef} style={{ position: "absolute", inset: 0 }} />
      <div className="eta-map-bl">
      {state === "ready" && truckOptions && truckOptions.length > 1 && (() => {
        const cur = focusTruck && focusTruck !== "all" ? focusTruck : "all";
        const longest = Math.max(3, ...truckOptions.map((t) => String(t).length));
        return (
          // Sized to the longest truck number; the list opens upward at the same width.
          <div ref={menuRef} className={`eta-map-truck-filter ${cur !== "all" ? "on" : ""}`} style={{ width: 58 + longest * 8 }}>
            <button type="button" className="eta-mtf-btn" aria-haspopup="listbox" aria-expanded={menuOpen} aria-label="Show one truck" onClick={() => setMenuOpen((o) => !o)}>
              <Truck size={12} /><span>{cur === "all" ? "All" : cur}</span><ChevronDown size={11} />
            </button>
            {menuOpen && (
              <div className="eta-mtf-menu" role="listbox">
                {["all", ...truckOptions].map((t) => (
                  <button key={t} type="button" role="option" aria-selected={cur === t} className={cur === t ? "sel" : ""} onClick={() => { onFocusTruck(t); setMenuOpen(false); }}>
                    {t === "all" ? "All" : t}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })()}
      {state === "ready" && loadTrail && focusTruck && focusTruck !== "all" && (
        <div ref={trailRef} className={`eta-map-truck-filter trail ${trailDay ? "on" : ""}`}>
          <button type="button" className="eta-mtf-btn" aria-haspopup="listbox" aria-expanded={trailMenu} onClick={() => setTrailMenu((o) => !o)}>
            <Clock size={12} /><span>{trailDay ? (trailDays.find((d) => d.key === trailDay) || { label: trailDay }).label : "Trail"}</span><ChevronDown size={11} />
          </button>
          {trailMenu && (
            <div className="eta-mtf-menu trail-menu" role="listbox">
              <button type="button" className={!trailDay ? "sel" : ""} onClick={() => { setTrailDay(null); setTrailMenu(false); }}>Off</button>
              {trailDays.map((d) => (
                <button key={d.key} type="button" className={trailDay === d.key ? "sel" : ""} onClick={() => { setTrailDay(d.key); setTrailMenu(false); }}>{d.label}</button>
              ))}
              <label className="trail-pick">Other day
                <input type="date" min={new Date(Date.now() - 60 * 86400000).toLocaleDateString("en-CA")} max={trailDays[0].key} onChange={(e) => { if (e.target.value) { setTrailDay(e.target.value); setTrailMenu(false); } }} />
              </label>
            </div>
          )}
        </div>
      )}
      </div>
      {trail && (trail.loading || trail.error || trail.points) && (
        <div className="trail-summary">
          {trail.loading ? "Loading trail…"
            : trail.error ? "Couldn't load the trail. Try again."
            : !trail.points.length ? "No GPS recorded for this truck that day."
            : `${Math.round(trail.sum.miles)} mi · ${fmtDuration(trail.sum.movingMs)} moving · top ${Math.round(trail.sum.maxMph)} mph · ${trail.sum.stops.length} stop${trail.sum.stops.length === 1 ? "" : "s"}`}
        </div>
      )}
      {state === "loading" && <div className="eta-map-msg">Loading map…</div>}
      {state === "error" && <div className="eta-map-msg">The map couldn't load. Check your internet connection and try again.</div>}
      {state === "ready" && (
        <div className="eta-map-tl">
          <button type="button" className="eta-map-fit" onClick={() => mapRef.current && mapRef.current.fitBounds(WEST_COAST_BOUNDS, { padding: 12 })}>West Coast</button>
          <button type="button" className={`eta-map-fit ${sat ? "on" : ""}`} aria-pressed={sat} onClick={() => setSat((v) => !v)}>{sat ? "Map" : "Satellite"}</button>
        </div>
      )}
    </div>
  );
}

// Small, non-interactive map at the top of the trip sheet: where the truck is and
// where each stop really sits, so a misplaced stop is obvious at a glance.
function TripMiniMap({ points, route }) {
  const boxRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [ok, setOk] = useState(true);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false, map = null;
    loadMapLibre()
      .then((ml) => {
        if (cancelled || !boxRef.current) return;
        try {
          map = new ml.Map({ container: boxRef.current, style: ETA_MAP_STYLE, bounds: WEST_COAST_BOUNDS, interactive: false, attributionControl: { compact: true } });
          map.on("load", () => {
            if (cancelled) return;
            map.addSource("trip", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
            map.addLayer({ id: "trip", type: "line", source: "trip", layout: { "line-cap": "round" }, paint: { "line-color": "#3B82F6", "line-width": 2.5, "line-opacity": 0.75, "line-dasharray": [2, 1.5] } });
            mapRef.current = map;
            setReady(true);
          });
        } catch { if (!cancelled) setOk(false); }
      })
      .catch(() => { if (!cancelled) setOk(false); });
    return () => {
      cancelled = true;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      if (map) map.remove();
      mapRef.current = null;
    };
  }, []);
  const sig = JSON.stringify([points, route ? route.length : 0]);
  useEffect(() => {
    const map = mapRef.current, ml = window.maplibregl;
    if (!ready || !map || !ml) return;
    const pts = points.filter((p) => hasCoords(p.lat, p.lon));
    const line = route && route.length > 1 ? route : pts.filter((p) => p.kind !== "truck").map((p) => [p.lon, p.lat]);
    map.getSource("trip").setData({ type: "FeatureCollection", features: line.length > 1 ? [{ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: line } }] : [] });
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = pts.map((p) => {
      const el = document.createElement("div");
      el.className = `trip-mm-pin ${p.kind}${p.warn ? " warn" : ""}`;
      el.textContent = p.label;
      return new ml.Marker({ element: el, anchor: p.kind === "truck" || p.kind === "loc" ? "center" : "bottom" }).setLngLat([p.lon, p.lat]).addTo(map);
    });
    const all = pts.map((p) => [p.lon, p.lat]);
    if (all.length === 1) map.jumpTo({ center: all[0], zoom: 8 });
    else if (all.length > 1) {
      const lons = all.map((c) => c[0]), lats = all.map((c) => c[1]);
      map.fitBounds([[Math.min(...lons), Math.min(...lats)], [Math.max(...lons), Math.max(...lats)]], { padding: { top: 34, bottom: 18, left: 30, right: 30 }, maxZoom: 11, duration: 0 });
    }
  }, [sig, ready]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!ok) return null;
  return <div className="trip-mm" ref={boxRef} />;
}

function EtaBoardPage({ trucks, drivers, loads, shippers, receivers, etaBoard, saveEtaEntry, saveEtaRoutes, patchEtaEntries, reloadEtaBoard, timezone, routeKey, askConfirm, closeLoad }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 30000); return () => clearInterval(id); }, []);
  const [view, setView] = useState("list"); // list | map
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null); // truck number
  const [form, setForm] = useState(null);
  const [filledFrom, setFilledFrom] = useState("");
  const [zipMsg, setZipMsg] = useState({});
  const [saving, setSaving] = useState(false);
  const [copiedTruck, setCopiedTruck] = useState(null);
  const [headerSlot, setHeaderSlot] = useState(null);
  const [mapTruck, setMapTruck] = useState("all");
  const [liveLocs, setLiveLocs] = useState({}); // driver name -> latest phone GPS
  const [liveRoutes, setLiveRoutes] = useState({}); // driver name -> road the driver took when they left the planned route
  const [driverLinks, setDriverLinks] = useState({}); // driver name -> Telegram link
  const [linkBusy, setLinkBusy] = useState(false);
  const [linkMsg, setLinkMsg] = useState("");
  const [unlinkArmed, setUnlinkArmed] = useState(false);
  const [pins, setPins] = useState({}); // facility code -> exact location
  const [pinsLoaded, setPinsLoaded] = useState(false);
  const geoTried = useRef({});
  const [events, setEvents] = useState([]); // GPS arrivals/departures from the bot
  const [shares, setShares] = useState({}); // truck -> active broker tracking link
  const [shareMsg, setShareMsg] = useState("");
  const tracking = typeof sb !== "undefined";
  async function loadLive() {
    if (typeof sb === "undefined" || typeof currentTeamId === "undefined" || !currentTeamId) return;
    if (reloadEtaBoard) reloadEtaBoard();
    try {
      const locs = await sb.from("driver_locations").select("driver_name, lat, lon, heading, is_live, live_until, updated_at, speed_mph, stopped_since").eq("team_id", currentTeamId);
      if (!locs.error) setLiveLocs(Object.fromEntries((locs.data || []).map((x) => [x.driver_name, x])));
      const lr = await sb.from("live_routes").select("driver_name, leg_key, coords, miles, sec, reroutes, created_at").eq("team_id", currentTeamId);
      if (!lr.error) setLiveRoutes(Object.fromEntries((lr.data || []).map((x) => [x.driver_name, x])));
      const links = await sb.from("driver_links").select(LINK_COLS).eq("team_id", currentTeamId);
      if (!links.error) setDriverLinks(Object.fromEntries((links.data || []).map((x) => [x.driver_name, x])));
      const pn = await sb.from("facility_pins").select("pin_key, lat, lon, source, label, address").eq("team_id", currentTeamId);
      if (!pn.error) { setPins(Object.fromEntries((pn.data || []).map((x) => [x.pin_key, { ...x, lat: Number(x.lat), lon: Number(x.lon) }]))); setPinsLoaded(true); }
      const since = new Date(Date.now() - 4 * 86400000).toISOString();
      const ev = await sb.from("eta_events").select("id, truck, driver_name, kind, place, place_key, place_label, at, cancelled, created_at").eq("team_id", currentTeamId).gte("created_at", since).order("created_at");
      if (!ev.error) setEvents(ev.data || []);
      const sh = await sb.from("tracking_shares").select("token, truck, trip_key, expires_at").eq("team_id", currentTeamId).eq("revoked", false).gt("expires_at", new Date().toISOString());
      if (!sh.error) { const m = {}; (sh.data || []).forEach((x) => { m[x.truck] = x; }); setShares(m); }
    } catch {}
  }
  useEffect(() => {
    loadLive();
    const id = setInterval(() => { if (!document.hidden) loadLive(); }, 60000);
    const onVis = () => { if (!document.hidden) loadLive(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { clearInterval(id); document.removeEventListener("visibilitychange", onVis); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // The driver's last phone position, if recent enough to trust.
  function gpsFor(driver) {
    const g = driver && liveLocs[driver];
    if (!g) return null;
    const lat = Number(g.lat), lon = Number(g.lon);
    if (!hasCoords(lat, lon) || (lat === 0 && lon === 0)) return null;
    const at = new Date(g.updated_at).getTime();
    const age = now - at;
    const sharing = !!g.is_live && !(g.live_until && new Date(g.live_until).getTime() < now);
    if (!(age <= (sharing ? GPS_KEEP_SHARING_MS : GPS_KEEP_MS))) return null;
    return { lat, lon, heading: g.heading == null ? null : Number(g.heading), at: g.updated_at, age, fresh: sharing && age <= LIVE_FRESH_MS, sharing,
      speed: g.speed_mph == null ? null : Number(g.speed_mph), stoppedSince: g.stopped_since || null };
  }
  // A linked phone that should be sharing but isn't: "GPS off 40m".
  function gpsProblem(driver) {
    const link = driver && driverLinks[driver];
    if (!link || !link.telegram_chat_id) return null;
    const g = liveLocs[driver];
    if (!g) return { text: "No GPS yet" };
    const age = now - new Date(g.updated_at).getTime();
    const sharing = !!g.is_live && !(g.live_until && new Date(g.live_until).getTime() < now);
    if (!sharing) return { text: `GPS off ${fmtAgo(g.updated_at, now).replace(" ago", "")}` };
    if (age > 30 * 60000) return { text: `No GPS ${fmtAgo(g.updated_at, now).replace(" ago", "")}` };
    return null;
  }

  // "62 mph" while moving, "Stopped 25m" while parked (speed from GPS, not exact).
  function speedText(g) {
    if (!g || !g.fresh) return "";
    if (g.speed != null && g.speed >= 5) return `${Math.round(g.speed)} mph`;
    if (g.stoppedSince) return `Stopped ${fmtDuration(Math.max(60000, now - new Date(g.stoppedSince).getTime()))}`;
    return "";
  }

  // Saved shippers/receivers by facility code (ONT8 → Moreno Valley, CA 92551).
  const facilities = useMemo(() => {
    const m = {};
    [...(shippers || []), ...(receivers || [])].forEach((f) => {
      const code = String(f.warehouseCode || "").trim().toUpperCase();
      if (!code) return;
      const place = cityState(String(f.city || "").trim(), String(f.state || "").trim());
      const zip = String(f.zip || "").trim();
      if (!m[code]) m[code] = { code, place, zip };
      else { if (!m[code].zip && zip) m[code].zip = zip; if (!m[code].place && place) m[code].place = place; }
    });
    return m;
  }, [shippers, receivers]);
  const facilityCodes = useMemo(() => Object.keys(facilities).sort(), [facilities]);

  // Street addresses typed in Fleet → Shippers/Receivers become exact pins for
  // codes that don't have one yet (or whose address pin was edited). Spots from
  // the map or a driver's GPS are kept.
  useEffect(() => {
    if (!routeKey || !pinsLoaded || typeof sb === "undefined" || !currentTeamId) return;
    let cancelled = false;
    const todo = [];
    [...(shippers || []), ...(receivers || [])].forEach((f) => {
      const code = String(f.warehouseCode || "").trim().toUpperCase();
      const street = String(f.street || "").trim();
      if (!code || !street) return;
      const address = addr1line(street, String(f.city || "").trim(), String(f.state || "").trim(), String(f.zip || "").trim());
      const pin = pins[code];
      if (pin && (pin.source !== "address" || pin.address === address)) return;
      if (geoTried.current[address] || todo.some((t) => t.code === code)) return;
      todo.push({ code, address });
    });
    if (!todo.length) return;
    (async () => {
      for (const t of todo.slice(0, 25)) {
        geoTried.current[t.address] = true;
        const g = await geocodeAddress(t.address, routeKey);
        if (cancelled) return;
        if (!g) continue;
        const row = { team_id: currentTeamId, pin_key: t.code, lat: g.lat, lon: g.lon, source: "address", label: t.code, address: t.address, updated_at: new Date().toISOString() };
        const { error } = await sb.from("facility_pins").upsert(row, { onConflict: "team_id,pin_key" });
        if (!error && !cancelled) setPins((m) => ({ ...m, [t.code]: row }));
      }
    })();
    return () => { cancelled = true; };
  }, [shippers, receivers, pins, pinsLoaded, routeKey]); // eslint-disable-line react-hooks/exhaustive-deps
  // Fields for a place picked by facility code; exact pin when we have one.
  function facilityFill(k, code) {
    const c = String(code || "").trim().toUpperCase();
    const f = facilities[c], pin = pins[c];
    const out = { [`${k}Code`]: c };
    if (!f && !pin) return out;
    if (f && f.place) Object.assign(out, { [k]: f.place, [`${k}Zip`]: f.zip || "" });
    if (pin) Object.assign(out, { [`${k}Lat`]: pin.lat, [`${k}Lon`]: pin.lon, [`${k}Exact`]: true });
    else Object.assign(out, { [`${k}Lat`]: null, [`${k}Lon`]: null, [`${k}Exact`]: false });
    return out;
  }

  // Active trips: pick up facility codes from their load, and move each stop to
  // its exact facility pin once we have one (before the truck gets there).
  function upgradePatch(raw) {
      const e = normEta(raw);
      if (e.status !== "transit" && e.status !== "covered") return null;
      const p = {};
      const load = e.loadId ? (loads || []).find((l) => l.id === e.loadId) : null;
      if (load) {
        const rt = loadRoute(load);
        if (!e.billTo && rt.billTo) p.billTo = rt.billTo;
        // Extra stops entered on the load form: copy them in, and keep them in step
        // with the load — unless the stops were edited by hand on the ETA Board or
        // the truck already reached one of them.
        const want = loadMidsSig(rt.mids), have = tripMidsSig(e);
        const fromLoad = e.midsSig != null ? e.midsSig === have : !etaMidKeys(e).length;
        const reached = etaMidKeys(e).some((k) => e[`${k}ArrivedAt`]);
        if (want !== have && fromLoad && !reached) {
          Object.assign(p, midsFromLoad(e, rt.mids));
          if (/^s\d+$/.test(etaNextKey(e))) Object.assign(p, etaNextFields(p.stopKeys[0] || "del"));
        }
        if (!e.puCode && rt.fromCode && e.pu && norm(e.pu) === norm(rt.pickupPlace)) p.puCode = rt.fromCode;
        if (!e.delCode && rt.toCode && e.del && norm(e.del) === norm(rt.to)) p.delCode = rt.toCode;
      }
      etaAllPlaces(e).forEach((k) => {
        const code = p[`${k}Code`] || e[`${k}Code`];
        const pin = code && pins[code];
        if (!pin || e[`${k}ArrivedAt`]) return;
        if (e[`${k}Exact`] && e[`${k}Lat`] === pin.lat && e[`${k}Lon`] === pin.lon) return;
        Object.assign(p, { [`${k}Lat`]: pin.lat, [`${k}Lon`]: pin.lon, [`${k}Exact`]: true });
      });
      return Object.keys(p).length ? p : null;
  }
  useEffect(() => {
    if (!patchEtaEntries) return;
    const patches = {};
    Object.entries(etaBoard || {}).forEach(([truck, raw]) => { if (upgradePatch(raw)) patches[truck] = upgradePatch; });
    if (Object.keys(patches).length) patchEtaEntries(patches);
  }, [etaBoard, pins, loads]); // eslint-disable-line react-hooks/exhaustive-deps

  // GPS arrivals/departures detected by the bot, applied to the board once each.
  // All of one truck's unseen events, applied in order to a saved trip.
  function eventsPatch(raw, evs, onDelivered) {
    const patches = {};
    evs.forEach((ev) => {
      const cur = { ...normEta(raw), ...(patches[ev.truck] || {}) };
      if (!cur.status) return;
      const seenId = ev.cancelled ? `${ev.id}:x` : ev.id;
      const seen = cur.gpsSeen || [];
      if (seen.includes(seenId)) return;
      const k = ev.place;
      const p = { gpsSeen: [...seen, seenId].slice(-40) };
      if (k === "yard") {
        // parked at / left the truck's yard (same parking only)
        if (etaPlaceKey(cur, "yard") === ev.place_key && !ev.cancelled) {
          if (ev.kind === "arrived" && cur.yardMode === "going") Object.assign(p, yardParkedFields(cur, ev.at));
          if (ev.kind === "departed" && cur.yardMode === "parked") Object.assign(p, { yardMode: "", yardLeftAt: ev.at });
        }
      } else if (etaPlaceKey(cur, k) === ev.place_key) {
        const log = cur.arrivalLog || [];
        if (ev.kind === "arrived" && ev.cancelled) {
          if (cur[`${k}ArrivedBy`] === ev.id) Object.assign(p, { [`${k}ArrivedAt`]: null, [`${k}ArrivedBy`]: null, arrivalLog: log.filter((x) => x.eventId !== ev.id) });
        } else if (ev.kind === "arrived" && !cur[`${k}ArrivedAt`]) {
          const etaMs = cur[`${k}Date`] ? zonedTimeToMs(cur[`${k}Date`], cur[`${k}Time`] || "23:59", tz) : null;
          const diffMin = etaMs != null && cur[`${k}Time`] ? Math.round((new Date(ev.at).getTime() - etaMs) / 60000) : null;
          Object.assign(p, {
            [`${k}ArrivedAt`]: ev.at, [`${k}ArrivedBy`]: ev.id,
            arrivalLog: [...log, { type: etaStopType(k), key: k, loadId: cur.loadId || null, place: cur[k], code: cur[`${k}Code`] || "", etaDate: cur[`${k}Date`] || "", etaTime: cur[`${k}Time`] || "", arrivedAt: ev.at, diffMin, driver: ev.driver_name, source: "gps", eventId: ev.id }].slice(-300),
          });
          if (k === "del" && onDelivered && Date.now() - new Date(ev.at).getTime() < 30 * 60000) onDelivered({ ...cur, ...p });
        } else if (ev.kind === "departed" && !cur[`${k}DepartedAt`]) {
          Object.assign(p, { [`${k}DepartedAt`]: ev.at, arrivalLog: (cur.arrivalLog || []).map((x) => (x.type === etaStopType(k) && x.place === cur[k] && !x.departedAt ? { ...x, departedAt: ev.at } : x)) });
          if (!cur[`${k}ArrivedAt`]) p[`${k}ArrivedAt`] = ev.at;
          // left this stop: the board moves on to the next one
          const nx = etaNextKey(cur) === k ? etaAfter(cur, k) : null;
          if (nx) Object.assign(p, etaNextFields(nx));
        }
      }
      patches[ev.truck] = { ...(patches[ev.truck] || {}), ...p };
    });
    const out = Object.values(patches)[0];
    return out && Object.keys(out).length ? out : null;
  }
  useEffect(() => {
    if (!patchEtaEntries || !events.length) return;
    const byTruck = {};
    events.forEach((ev) => { (byTruck[ev.truck] = byTruck[ev.truck] || []).push(ev); });
    const patches = {};
    Object.entries(byTruck).forEach(([truck, evs]) => {
      const raw = (etaBoard || {})[truck];
      if (!raw || !eventsPatch(raw, evs)) return;
      patches[truck] = (fresh) => eventsPatch(fresh, evs, (e) => setTimeout(() => offerCloseLoad(truck, e), 0));
    });
    if (Object.keys(patches).length) patchEtaEntries(patches);
  }, [events, etaBoard]); // eslint-disable-line react-hooks/exhaustive-deps
  const routeTried = useRef({});
  useEffect(() => {
    if (!routeKey || !saveEtaRoutes) return;
    let cancelled = false;
    (async () => {
      const updates = {};
      for (const [truck, raw] of Object.entries(etaBoard || {})) {
        const e = normEta(raw);
        if (e.status !== "transit" && e.status !== "covered" && !etaYardGoing(e)) continue;
        const missing = etaRouteLegs(e).some((leg) => {
          const key = legRouteKey(leg);
          return key && !(e.routes && e.routes[key]) && !routeTried.current[key];
        });
        if (!missing) continue;
        etaRouteLegs(e).forEach((leg) => { const key = legRouteKey(leg); if (key) routeTried.current[key] = true; });
        const routes = await routesForEntry(e, e.routes, routeKey);
        if (cancelled) return;
        if (Object.keys(routes).length) updates[truck] = routes;
      }
      if (!cancelled && Object.keys(updates).length) saveEtaRoutes(updates);
    })();
    return () => { cancelled = true; };
  }, [etaBoard, routeKey]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { setHeaderSlot(document.getElementById("eta-header-slot")); }, []);
  const tz = timezone || "America/Los_Angeles";
  const tzLabel = tzAbbrFor(tz);

  async function copyPhone(ev, truck, phone) {
    ev.stopPropagation();
    if (await copyText(phone)) {
      setCopiedTruck(truck);
      setTimeout(() => setCopiedTruck((c) => (c === truck ? null : c)), 1500);
    }
  }

  const rows = (trucks || [])
    .filter((t) => t.active !== false && t.number)
    .map((t) => {
      const e = normEta((etaBoard || {})[t.number]);
      const leg = etaLeg(e);
      const etaMs = e.status !== "home" && leg.date ? zonedTimeToMs(leg.date, leg.time || "23:59", tz) : null;
      const drv = (drivers || []).find((d) => d.name === t.assignedDriver);
      const rk = legRouteKey(leg);
      // When the driver left the planned road, the bot saved the road they're on
      // (same leg only): the line, miles left and GPS ETA follow it.
      const lr = rk && t.assignedDriver ? liveRoutes[t.assignedDriver] : null;
      const route = lr && lr.leg_key === rk && Array.isArray(lr.coords) && lr.coords.length > 1
        ? { coords: lr.coords, miles: lr.miles == null ? null : Number(lr.miles), sec: lr.sec == null ? null : Number(lr.sec), live: true, at: lr.created_at }
        : rk && e.routes ? e.routes[rk] || null : null;
      return { truck: t.number, driver: t.assignedDriver || "", phone: (drv && drv.phone) || "", e, leg, etaMs, route, gps: gpsFor(t.assignedDriver) };
    });
  const rank = { ready: 0, transit: 1, covered: 2, home: 3 };
  rows.sort((a, b) => {
    const ra = rank[a.e.status] ?? 4, rb = rank[b.e.status] ?? 4;
    if (ra !== rb) return ra - rb;
    if (ra <= 2 && (a.etaMs != null || b.etaMs != null)) return (a.etaMs ?? Infinity) - (b.etaMs ?? Infinity);
    return String(a.truck).localeCompare(String(b.truck), undefined, { numeric: true });
  });
  const counts = {};
  rows.forEach((r) => { counts[r.e.status || "none"] = (counts[r.e.status || "none"] || 0) + 1; });
  const shown = filter === "all" ? rows : rows.filter((r) => (r.e.status || "none") === filter);

  // ---- editor ----
  function blankPlace(k) { return { [k]: "", [`${k}Zip`]: "", [`${k}Lat`]: null, [`${k}Lon`]: null, [`${k}Code`]: "", [`${k}Exact`]: false }; }
  // Parked at the yard: the truck's location becomes the yard.
  function yardParkedFields(e, at) {
    return { yardMode: "parked", yardParkedAt: at, yardLeftAt: null, loc: e.yard || "", locZip: e.yardZip || "", locLat: e.yardLat ?? null, locLon: e.yardLon ?? null, locCode: e.yardCode || "", locExact: !!e.yardExact };
  }
  function openEdit(r) {
    const load = activeLoadForTruck(loads, r.truck);
    const route = loadRoute(load);
    const e = r.e;
    const next = { ...e, status: e.status || "", etaType: e.etaType || "delivery", notes: e.notes || "", billTo: e.billTo || "", puArrivedAt: e.puArrivedAt || null, delArrivedAt: e.delArrivedAt || null, puDepartedAt: e.puDepartedAt || null, delDepartedAt: e.delDepartedAt || null, arrivalLog: e.arrivalLog || [] };
    next.stopKeys = etaMidKeys(e);
    next.next = etaNextKey(e);
    etaAllPlaces(next).forEach((k) => Object.assign(next, { [k]: e[k] || "", [`${k}Zip`]: e[`${k}Zip`] || "", [`${k}Lat`]: e[`${k}Lat`] ?? null, [`${k}Lon`]: e[`${k}Lon`] ?? null, [`${k}Code`]: e[`${k}Code`] || "", [`${k}Exact`]: !!e[`${k}Exact`] }));
    etaStopSeq(next).forEach((k) => Object.assign(next, { [`${k}Date`]: e[`${k}Date`] || "", [`${k}Time`]: e[`${k}Time`] || "" }));
    // pre-fill only what's empty, from the truck's active load
    let used = false;
    next.loadId = e.loadId || null;
    if (load) {
      if (!next.pu && route.pickupPlace) { Object.assign(next, { pu: route.pickupPlace, puZip: route.fromZip }, route.fromCode ? facilityFill("pu", route.fromCode) : {}); used = true; }
      if (!next.puDate && route.pickupDate) { next.puDate = route.pickupDate; used = true; }
      if (!next.del && route.to) { Object.assign(next, { del: route.to, delZip: route.toZip }, route.toCode ? facilityFill("del", route.toCode) : {}); used = true; }
      if (!next.delDate && route.date) { next.delDate = route.date; used = true; }
      if (!next.stopKeys.length && route.mids.length) { Object.assign(next, midsFromLoad(next, route.mids)); used = true; }
    }
    if (used) { next.loadId = load.id; next.billTo = route.billTo || next.billTo; }
    setFilledFrom(used ? `Filled from active load #${load.loadNumber || ""} — set the arrival times` : "");
    setZipMsg({});
    setLinkMsg("");
    setShareMsg("");
    setUnlinkArmed(false);
    loadLive(); // fresh link status for the sheet
    setForm(next);
    setEditing(r.truck);
  }
  function editTruck(truck) {
    const r = rows.find((x) => x.truck === truck);
    if (r) openEdit(r);
  }
  // ZIPs that arrive without a location (e.g. pre-filled from a load) get one quietly
  const zipKey = form ? etaAllPlaces(form).map((k) => `${form[`${k}Zip`]}|${hasCoords(form[`${k}Lat`], form[`${k}Lon`])}`).join(";") : "";
  useEffect(() => {
    if (!form) return;
    etaAllPlaces(form).forEach((k) => {
      const zip = form[`${k}Zip`];
      if (!/^\d{5}$/.test(zip || "") || hasCoords(form[`${k}Lat`], form[`${k}Lon`])) return;
      lookupZip(zip).then((r) => {
        if (!r) return;
        setForm((f) => (f && f[`${k}Zip`] === zip && !hasCoords(f[`${k}Lat`], f[`${k}Lon`])
          ? { ...f, [k]: f[k] || `${r.city}, ${r.state}`, [`${k}Lat`]: r.lat, [`${k}Lon`]: r.lon }
          : f));
      });
    });
  }, [zipKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Typing a city by hand: its old ZIP and location no longer apply.
  function setPlace(k, text) {
    setForm((f) => ({ ...f, ...blankPlace(k), [k]: text }));
    setZipMsg((m) => ({ ...m, [k]: "" }));
  }
  function placeBlur(k) {
    const text = form && form[k];
    if (!text || hasCoords(form[`${k}Lat`], form[`${k}Lon`])) return;
    // A yard typed as a street address: its exact spot, when the address is found.
    if (k === "yard" && /^\d+\s/.test(text.trim()) && routeKey) {
      geocodeAddress(text, routeKey).then((r) => {
        if (r) setForm((f) => (f && f.yard === text && !hasCoords(f.yardLat, f.yardLon) ? { ...f, yardLat: r.lat, yardLon: r.lon, yardExact: true } : f));
        else lookupCityCoords(text.replace(/^[^,]*,\s*/, "")).then((c) => { if (c) setForm((f) => (f && f.yard === text && !hasCoords(f.yardLat, f.yardLon) ? { ...f, yardLat: c.lat, yardLon: c.lon } : f)); });
      });
      return;
    }
    lookupCityCoords(text).then((r) => {
      if (r) setForm((f) => (f && f[k] === text && !hasCoords(f[`${k}Lat`], f[`${k}Lon`]) ? { ...f, [`${k}Lat`]: r.lat, [`${k}Lon`]: r.lon } : f));
    });
  }
  // A 5-digit ZIP fills in the city automatically.
  function setZip(k, value) {
    const zip = String(value).replace(/\D/g, "").slice(0, 5);
    setForm((f) => ({ ...f, [`${k}Zip`]: zip, [`${k}Lat`]: null, [`${k}Lon`]: null, [`${k}Exact`]: false }));
    if (zip.length < 5) { setZipMsg((m) => ({ ...m, [k]: "" })); return; }
    setZipMsg((m) => ({ ...m, [k]: "Looking up…" }));
    lookupZip(zip).then((r) => {
      setForm((f) => (f && f[`${k}Zip`] === zip && r ? { ...f, [k]: `${r.city}, ${r.state}`, [`${k}Lat`]: r.lat, [`${k}Lon`]: r.lon } : f));
      setZipMsg((m) => ({ ...m, [k]: r ? "" : "ZIP not found — type the city instead" }));
    });
  }
  // Where each typed ZIP is, to catch a stop whose saved spot is far from its ZIP.
  const [zipPts, setZipPts] = useState({});
  const zipsKey = form ? etaAllPlaces(form).map((k) => form[`${k}Zip`] || "").join(",") : "";
  useEffect(() => {
    if (!form) return;
    etaAllPlaces(form).forEach((k) => {
      const z = form[`${k}Zip`];
      if (!/^\d{5}$/.test(z || "") || zipPts[z]) return;
      lookupZip(z).then((r) => { if (r) setZipPts((m) => ({ ...m, [z]: { lat: r.lat, lon: r.lon } })); });
    });
  }, [zipsKey]); // eslint-disable-line react-hooks/exhaustive-deps
  // Miles between a stop's spot and its ZIP, when that's suspiciously far (>30 mi).
  function farFromZip(k) {
    const zp = form && zipPts[form[`${k}Zip`]];
    if (!zp || !hasCoords(form[`${k}Lat`], form[`${k}Lon`])) return null;
    const d = milesBetween(zp, { lat: form[`${k}Lat`], lon: form[`${k}Lon`] });
    return d > 30 ? Math.round(d) : null;
  }
  function resetToZip(k) {
    const zp = zipPts[form[`${k}Zip`]];
    if (zp) setForm((f) => ({ ...f, [`${k}Lat`]: zp.lat, [`${k}Lon`]: zp.lon, [`${k}Exact`]: false }));
  }

  // Facility code (e.g. LAX9): fills city, ZIP and the exact pin from Fleet.
  function setCode(k, value) {
    const c = String(value).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
    const known = facilities[c] || pins[c];
    setForm((f) => ({ ...f, ...(known ? facilityFill(k, c) : { [`${k}Code`]: c }) }));
    if (known) setZipMsg((m) => ({ ...m, [k]: "" }));
  }
  // Save where the driver's phone is right now as this facility's exact spot.
  async function pinFromGps(k) {
    const code = form && form[`${k}Code`];
    const g = editRow && editRow.gps;
    if (k === "yard") {
      if (!g || !g.fresh) return;
      if (hasCoords(form.yardLat, form.yardLon) && milesBetween(g, { lat: form.yardLat, lon: form.yardLon }) > 3) {
        setZipMsg((m) => ({ ...m, yard: "The truck isn't at the yard right now, so its spot wasn't saved." }));
        return;
      }
      setForm((f) => ({ ...f, yardLat: g.lat, yardLon: g.lon, yardExact: true }));
      setZipMsg((m) => ({ ...m, yard: "Saved — the yard now uses the spot where the truck is." }));
      return;
    }
    if (!code || !g || !g.fresh || typeof sb === "undefined") return;
    if (!hasCoords(form[`${k}Lat`], form[`${k}Lon`]) || milesBetween(g, { lat: form[`${k}Lat`], lon: form[`${k}Lon`] }) > 2) {
      setZipMsg((m) => ({ ...m, [k]: `The truck isn't at ${code} right now, so its spot wasn't saved.` }));
      return;
    }
    const row = { team_id: currentTeamId, pin_key: code, lat: g.lat, lon: g.lon, source: "gps", label: form[k] || code, updated_at: new Date().toISOString() };
    const { error } = await sb.from("facility_pins").upsert(row, { onConflict: "team_id,pin_key" });
    if (error) { setZipMsg((m) => ({ ...m, [k]: "Couldn't save the spot. Try again." })); return; }
    setPins((m) => ({ ...m, [code]: { ...row } }));
    setForm((f) => ({ ...f, [`${k}Lat`]: g.lat, [`${k}Lon`]: g.lon, [`${k}Exact`]: true }));
    setZipMsg((m) => ({ ...m, [k]: `Saved — ${code} now uses the spot where the truck is.` }));
  }
  // ---- middle stops ----
  function newStopKey(f) {
    const nums = etaMidKeys(f).map((k) => Number(k.slice(1)));
    return `s${(nums.length ? Math.max(...nums) : 0) + 1}`;
  }
  // A load's extra stops (Stop 1, Stop 2… before its Final Delivery) become the
  // trip's middle stops. midsSig remembers which load stops they came from, so a
  // later change on the load form updates the trip too.
  function midsFromLoad(f, mids) {
    const out = { stopKeys: [], midsSig: loadMidsSig(mids) };
    let n = Math.max(0, ...etaMidKeys(f).map((k) => Number(k.slice(1))));
    mids.forEach((m) => {
      const k = `s${++n}`;
      out.stopKeys.push(k);
      Object.assign(out, blankPlace(k), { [k]: m.place, [`${k}Zip`]: m.zip, [`${k}Date`]: "", [`${k}Time`]: "" }, m.code ? facilityFill(k, m.code) : {});
      if (m.place) out[k] = out[k] || m.place;
    });
    return out;
  }
  function addStop() {
    setForm((f) => {
      const k = newStopKey(f);
      return { ...f, stopKeys: [...etaMidKeys(f), k], ...blankPlace(k), [`${k}Date`]: "", [`${k}Time`]: "" };
    });
  }
  function removeStop(k) {
    setForm((f) => {
      const keys = etaMidKeys(f).filter((x) => x !== k);
      const nf = { ...f, stopKeys: keys };
      Object.keys(nf).forEach((name) => { if (name === k || (name.startsWith(k) && /^[A-Z]/.test(name.slice(k.length)))) delete nf[name]; });
      if (f.next === k) Object.assign(nf, etaNextFields(etaAfter(f, k) || "del"));
      return nf;
    });
  }
  function moveStop(k, dir) {
    setForm((f) => {
      const keys = [...etaMidKeys(f)];
      const i = keys.indexOf(k), j = i + dir;
      if (i < 0 || j < 0 || j >= keys.length) return f;
      [keys[i], keys[j]] = [keys[j], keys[i]];
      return { ...f, stopKeys: keys };
    });
  }
  function fillFromLoad() {
    const load = activeLoadForTruck(loads, editing);
    if (!load) return;
    const route = loadRoute(load);
    setForm((f) => {
      const next = { ...f, loadId: load.id, billTo: route.billTo || "" };
      if (route.pickupPlace) Object.assign(next, blankPlace("pu"), { pu: route.pickupPlace, puZip: route.fromZip }, route.fromCode ? facilityFill("pu", route.fromCode) : {});
      if (route.pickupDate) next.puDate = route.pickupDate;
      if (route.to) Object.assign(next, blankPlace("del"), { del: route.to, delZip: route.toZip }, route.toCode ? facilityFill("del", route.toCode) : {});
      Object.assign(next, midsFromLoad({ ...next, stopKeys: [] }, route.mids));
      if (route.date) next.delDate = route.date;
      return next;
    });
    setFilledFrom(`Filled from active load #${load.loadNumber || ""} — set the arrival times`);
  }
  async function save() {
    setSaving(true);
    const f = { ...form };
    // drop middle stops left completely empty
    f.stopKeys = etaMidKeys(f).filter((k) => etaHasPlace(f, k));
    if (!etaStopSeq(f).includes(f.next)) Object.assign(f, etaNextFields(f.etaType === "pickup" ? "pu" : "del"));
    Object.assign(f, etaNextFields(etaNextKey(f)));
    for (const k of etaAllPlaces(f)) {
      const pin = f[`${k}Code`] && pins[f[`${k}Code`]];
      if (pin && !f[`${k}Exact`]) Object.assign(f, { [`${k}Lat`]: pin.lat, [`${k}Lon`]: pin.lon, [`${k}Exact`]: true });
    }
    // make sure every place has a map location before saving
    for (const k of etaAllPlaces(f)) {
      if (hasCoords(f[`${k}Lat`], f[`${k}Lon`]) || !f[k]) continue;
      const r = (await lookupZip(f[`${k}Zip`])) || (await lookupCityCoords(f[k]));
      if (r) { f[`${k}Lat`] = r.lat; f[`${k}Lon`] = r.lon; }
    }
    const old = (rows.find((x) => x.truck === editing) || {}).e || {};
    // Yard: each drive there / parking is one session; parked = the truck is at the yard.
    if (!etaHasPlace(f, "yard") || (f.yardMode === "going" && f.status !== "home")) f.yardMode = "";
    const nowIso = new Date().toISOString();
    if (f.yardMode && !old.yardMode) f.yardSince = nowIso;
    if (f.yardMode && old.yardMode && (f.yard !== old.yard || f.yardLat !== old.yardLat)) f.yardSince = nowIso; // a different yard
    if (f.yardMode === "parked" && old.yardMode !== "parked") Object.assign(f, yardParkedFields(f, nowIso));
    if (f.yardMode !== "parked") f.yardParkedAt = null;
    if (!f.yardMode && old.yardMode === "parked") f.yardLeftAt = nowIso;
    // a leg whose place, date or time was changed hasn't been arrived at yet
    etaStopSeq(f).forEach((k) => {
      if ((f[k] || "") !== (old[k] || "") || (f[`${k}Date`] || "") !== (old[`${k}Date`] || "") || (f[`${k}Time`] || "") !== (old[`${k}Time`] || "")) Object.assign(f, { [`${k}ArrivedAt`]: null, [`${k}ArrivedBy`]: null, [`${k}DepartedAt`]: null });
    });
    f.routes = await routesForEntry(f, old.routes, routeKey);
    await saveEtaEntry(editing, { ...f, updatedAt: new Date().toISOString() });
    setSaving(false);
    setEditing(null);
    setForm(null);
  }
  const editLoad = editing ? activeLoadForTruck(loads, editing) : null;

  // ---- Telegram live-location links (one private link per driver) ----
  async function ensureDriverLink(driver) {
    if (driverLinks[driver]) return driverLinks[driver];
    let { data, error } = await sb.from("driver_links").insert({ team_id: currentTeamId, driver_name: driver, code: newLinkCode() }).select(LINK_COLS).single();
    if (error) {
      // someone else on the team may have just created it
      const again = await sb.from("driver_links").select(LINK_COLS).eq("team_id", currentTeamId).eq("driver_name", driver).maybeSingle();
      if (!again.data) throw error;
      data = again.data;
    }
    setDriverLinks((m) => ({ ...m, [driver]: data }));
    return data;
  }
  async function createDriverLink(driver) {
    setLinkBusy(true);
    setLinkMsg("");
    try { await ensureDriverLink(driver); }
    catch { setLinkMsg("Couldn't create the link. Check your connection and try again."); }
    setLinkBusy(false);
  }
  async function copyDriverLink(link) {
    setLinkMsg((await copyText(driverLinkUrl(link.code))) ? "Link copied — send it to the driver." : "Couldn't copy. Press and hold the link to copy it.");
  }
  // New link + unlink the phone + clear its position. The old link stops working.
  async function resetDriverLink(driver) {
    if (!unlinkArmed) { setUnlinkArmed(true); setTimeout(() => setUnlinkArmed(false), 4000); return; }
    setUnlinkArmed(false);
    setLinkBusy(true);
    try {
      await sb.from("driver_locations").delete().eq("team_id", currentTeamId).eq("driver_name", driver);
      const { data, error } = await sb.from("driver_links")
        .update({ code: newLinkCode(), telegram_chat_id: null, telegram_user_name: null, linked_at: null })
        .eq("team_id", currentTeamId).eq("driver_name", driver).select(LINK_COLS).single();
      if (error) throw error;
      setDriverLinks((m) => ({ ...m, [driver]: data }));
      setLiveLocs((m) => { const n = { ...m }; delete n[driver]; return n; });
      setLinkMsg("Phone unlinked. Send the new link if they should be tracked again.");
    } catch { setLinkMsg("Couldn't unlink. Check your connection and try again."); }
    setLinkBusy(false);
  }
  const editRow = editing ? rows.find((x) => x.truck === editing) : null;
  const editDriver = editRow ? editRow.driver : "";
  const editLink = editDriver ? driverLinks[editDriver] : null;
  const smsBody = (link) => `Hi ${editDriver}, please open this link in Telegram, tap Start, then share your Live Location with dispatch: ${driverLinkUrl(link.code)}`;
  const liveSection = tracking && editRow && (
    <div className="eta-live-box">
      <div className="eta-live-head"><MapPin size={14} /> Live location{editDriver ? ` · ${editDriver}` : ""}</div>
      {!editDriver && <div className="eta-live-text">Assign a driver to Truck {editing} in Fleet → Trucks, then send them a Telegram link here.</div>}
      {editDriver && !editLink && (
        <>
          <div className="eta-live-text">Track this truck with the driver's phone: they open a private link in Telegram and share Live Location.</div>
          <button type="button" className="eta-live-btn primary" disabled={linkBusy} onClick={() => createDriverLink(editDriver)}><Send size={13} /> {linkBusy ? "Creating…" : "Create Telegram link"}</button>
        </>
      )}
      {editDriver && editLink && (
        <>
          {editLink.telegram_chat_id ? (
            <div className={`eta-live-text ${editRow.gps && editRow.gps.fresh ? "ok" : ""}`}>
              <span className={`eta-gps-dot ${editRow.gps && editRow.gps.fresh ? "on" : "off"}`} />
              Phone linked{editLink.telegram_user_name ? ` (${editLink.telegram_user_name})` : ""} ·{" "}
              {editRow.gps ? `${editRow.gps.fresh ? "sharing live" : "last GPS"} ${fmtAgo(editRow.gps.at, now)}` : "not sharing location right now"}
            </div>
          ) : null}
          {editLink.telegram_chat_id && editRow.route && editRow.route.live ? (
            <div className="eta-live-text eta-live-reroute">
              <RefreshCw size={12} /> Driver took a different road — map line updated to their route {fmtAgo(editRow.route.at, now)}
            </div>
          ) : null}
          {editLink.telegram_chat_id ? null : (
            <div className="eta-live-text">Not linked yet. Send {editDriver} this link — they open it in Telegram, tap <b>Start</b>, then share <b>Live Location</b>.</div>
          )}
          {!editLink.telegram_chat_id && <div className="eta-live-link">{driverLinkUrl(editLink.code)}</div>}
          <div className="eta-live-actions">
            {!editLink.telegram_chat_id && <button type="button" className="eta-live-btn primary" onClick={() => copyDriverLink(editLink)}><Copy size={13} /> Copy link</button>}
            {!editLink.telegram_chat_id && editRow.phone && (
              <a className="eta-live-btn" href={`sms:${editRow.phone.replace(/[^\d+]/g, "")}?&body=${encodeURIComponent(smsBody(editLink))}`}><Phone size={13} /> Text it</a>
            )}
            {editLink.telegram_chat_id && !(editRow.gps && editRow.gps.fresh) && (
              <button type="button" className="eta-live-btn primary" disabled={linkBusy} onClick={() => remindDriver(editDriver)}><Send size={13} /> Remind to share</button>
            )}
            <button type="button" className={`eta-live-btn ${unlinkArmed ? "danger" : ""}`} disabled={linkBusy} onClick={() => resetDriverLink(editDriver)}>
              {unlinkArmed ? "Tap again to confirm" : editLink.telegram_chat_id ? "Unlink phone" : "New link"}
            </button>
          </div>
        </>
      )}
      {linkMsg && <div className={`eta-live-msg ${linkMsg.startsWith("Couldn") ? "bad" : ""}`}>{linkMsg}</div>}
    </div>
  );

  // One truck's GPS trail for one day (kept 60 days).
  async function loadTrail(truck, day) {
    try {
      const start = zonedTimeToMs(day, "00:00", tz);
      const { data, error } = await sb.from("gps_points").select("lat, lon, speed_mph, state, at").eq("team_id", currentTeamId).eq("truck", String(truck))
        .gte("at", new Date(start).toISOString()).lt("at", new Date(start + 86400000).toISOString()).order("at").limit(5000);
      if (error) return null;
      return (data || []).map((p) => ({ ...p, lat: Number(p.lat), lon: Number(p.lon) }));
    } catch { return null; }
  }

  // The bot messages the driver: "please turn Live Location back on".
  async function remindDriver(driver) {
    setLinkBusy(true);
    setLinkMsg("");
    try {
      const { data, error } = await sb.functions.invoke("telegram-bot", { body: { action: "nudge", team_id: currentTeamId, driver_name: driver } });
      if (error || !data || !data.ok) throw error || new Error("failed");
      setLinkMsg(`Reminder sent to ${driver} on Telegram.`);
    } catch { setLinkMsg("Couldn't send the reminder. Try again in a minute."); }
    setLinkBusy(false);
  }

  // ---- Read-only tracking link for the broker/customer (this trip only) ----
  const trackUrl = (token) => new URL(`track.html?t=${token}`, window.location.href).href;
  const editTripKey = editRow ? etaPlaceKey(editRow.e, "del") : null;
  const editShare = editing && shares[editing] && shares[editing].trip_key === editTripKey ? shares[editing] : null;
  async function createShare() {
    if (!editRow || !editTripKey) return;
    setShareMsg("");
    const e = editRow.e;
    const due = e.delDate ? zonedTimeToMs(e.delDate, "23:59", tz) : null;
    const expires = Math.min(Date.now() + 14 * 86400000, Math.max(Date.now() + 86400000, (due || Date.now()) + 2 * 86400000));
    const row = {
      token: newLinkCode() + newLinkCode(), team_id: currentTeamId, truck: editing, trip_key: editTripKey,
      label: etaStopSeq(e).filter((k) => etaHasPlace(e, k)).map((k) => etaPlaceName(e, etaLegTo(e, k).end) || e[k]).join(" → "),
      created_by: typeof currentUserId !== "undefined" ? currentUserId : null, expires_at: new Date(expires).toISOString(),
    };
    const { error } = await sb.from("tracking_shares").insert(row);
    if (error) { setShareMsg("Couldn't create the link. Check your connection and try again."); return; }
    setShares((m) => ({ ...m, [editing]: row }));
    setShareMsg((await copyText(trackUrl(row.token))) ? "Tracking link copied — paste it to the broker." : "Link created — press and hold it to copy.");
  }
  async function stopShare() {
    if (!editShare) return;
    const { error } = await sb.from("tracking_shares").update({ revoked: true }).eq("token", editShare.token);
    if (error) { setShareMsg("Couldn't stop the link. Try again."); return; }
    setShares((m) => { const n = { ...m }; delete n[editing]; return n; });
    setShareMsg("Link stopped. The broker can't see this truck anymore.");
  }
  const shareSection = tracking && editRow && !(form && form.status === "home") && (
    <div className="eta-live-box">
      <div className="eta-live-head"><Send size={13} /> Broker tracking link</div>
      {!editTripKey && <div className="eta-live-text">Add a delivery place to share this trip.</div>}
      {editTripKey && !editShare && (
        <>
          <div className="eta-live-text">A read-only page for the broker: truck position, ETA and arrival for this load only. It stops working after delivery.</div>
          <button type="button" className="eta-live-btn primary" onClick={createShare}><Copy size={13} /> Create & copy link</button>
        </>
      )}
      {editShare && (
        <>
          <div className="eta-live-text ok">Shared · works until {new Date(editShare.expires_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })} or delivery</div>
          <div className="eta-live-link">{trackUrl(editShare.token)}</div>
          <div className="eta-live-actions">
            <button type="button" className="eta-live-btn primary" onClick={async () => setShareMsg((await copyText(trackUrl(editShare.token))) ? "Link copied." : "Press and hold the link to copy it.")}><Copy size={13} /> Copy link</button>
            <button type="button" className="eta-live-btn" onClick={stopShare}>Stop sharing</button>
          </div>
        </>
      )}
      {shareMsg && <div className={`eta-live-msg ${shareMsg.startsWith("Couldn") ? "bad" : ""}`}>{shareMsg}</div>}
    </div>
  );

  // ---- what each truck looks like right now ----
  function liveInfo(r) {
    const st = ETA_STATUS_BY_KEY[r.e.status];
    const toYard = r.leg.key === "yard"; // Home: driving to the yard
    const moving = r.e.status === "transit" || r.e.status === "covered" || toYard;
    const lkey = r.leg.key;
    const arrivedAt = moving ? r.e[`${lkey}ArrivedAt`] || null : null;
    const departedAt = arrivedAt ? r.e[`${lkey}DepartedAt`] || null : null;
    const diff = r.etaMs != null ? r.etaMs - now : null;
    const late = moving && !arrivedAt && !!r.leg.time && diff != null && diff < -60000;
    let prog = moving && !arrivedAt ? etaProgress(r.leg, r.etaMs, now, r.route) : null;
    if (arrivedAt && hasCoords(r.leg.end.lat, r.leg.end.lon)) prog = { pct: 1, pos: { lat: r.leg.end.lat, lon: r.leg.end.lon }, bearing: null };
    // Real phone GPS beats the estimate: snap it to the route for % and miles left.
    if (r.gps && moving && !arrivedAt) {
      const p = progressAtPoint(r.leg, r.route, r.gps);
      if (p) prog = { pct: p.pct, milesLeft: p.milesLeft, pos: { lat: r.gps.lat, lon: r.gps.lon }, bearing: r.gps.heading != null && r.gps.heading > 0 ? r.gps.heading : p.roadBearing, live: true };
    }
    // arrival vs ETA, in minutes (negative = early); within 15 min counts as on time
    const arriveDiffMin = arrivedAt && r.etaMs != null ? Math.round((new Date(arrivedAt).getTime() - r.etaMs) / 60000) : null;
    // Live GPS: when the truck will really get there at its usual road speed.
    let gpsEtaMs = null, riskMin = null;
    if (prog && prog.live && prog.milesLeft != null && !arrivedAt) {
      const mph = r.route && r.route.miles && r.route.sec ? Math.min(60, Math.max(35, r.route.miles / (r.route.sec / 3600))) : ETA_AVG_MPH;
      gpsEtaMs = now + (prog.milesLeft / mph) * 3600000;
      if (r.etaMs != null && r.leg.time) riskMin = Math.round((gpsEtaMs - r.etaMs) / 60000);
    }
    const onSiteMs = arrivedAt ? Math.max(0, (departedAt ? new Date(departedAt).getTime() : now) - new Date(arrivedAt).getTime()) : null;
    return { st, moving, toYard, diff, late, prog, arrivedAt, departedAt, onSiteMs, arriveDiffMin, gpsEtaMs, riskMin, color: st ? st.color : "#8A94A6" };
  }

  // ---- one-tap arrival actions on the card ----
  async function markArrived(ev, r) {
    ev.stopPropagation();
    const k = r.leg.key;
    const at = new Date().toISOString();
    const diffMin = r.etaMs != null ? Math.round((new Date(at).getTime() - r.etaMs) / 60000) : null;
    const log = [...(r.e.arrivalLog || []), { type: r.leg.type, key: k, loadId: r.e.loadId || null, place: r.leg.end.name, code: r.leg.end.code, etaDate: r.leg.date, etaTime: r.leg.time, arrivedAt: at, diffMin, driver: r.driver }].slice(-300);
    await saveEtaEntry(r.truck, { ...r.e, [`${k}ArrivedAt`]: at, arrivalLog: log, updatedAt: at });
    learnPin(r);
    if (k === "del") offerCloseLoad(r.truck, r.e);
  }
  // The driver's phone at a manual arrival teaches us where that facility really
  // is — but only for codes without an exact spot yet, and only when it's close.
  async function learnPin(r) {
    const code = r.leg.end.code, g = r.gps;
    if (!code || !g || g.age > 5 * 60000 || typeof sb === "undefined") return;
    if (r.leg.end.exact || (pins[code] && pins[code].source !== "map" && pins[code].source !== "address")) return;
    if (!hasCoords(r.leg.end.lat, r.leg.end.lon) || milesBetween(g, r.leg.end) > 3) return;
    const row = { team_id: currentTeamId, pin_key: code, lat: g.lat, lon: g.lon, source: "gps", label: r.leg.end.name || code, updated_at: new Date().toISOString() };
    const { error } = await sb.from("facility_pins").upsert(row, { onConflict: "team_id,pin_key" });
    if (!error) setPins((m) => ({ ...m, [code]: row }));
  }
  // Delivered: offer to close the matching active load (the one the trip was
  // filled from, otherwise this truck's active load to the same place).
  function offerCloseLoad(truck, e) {
    if (!closeLoad || !askConfirm) return;
    const active = (loads || []).filter((l) => l.status === "active" && l.truck === truck);
    const load = (e.loadId && active.find((l) => l.id === e.loadId))
      || active.find((l) => e.del && loadRoute(l).to.toLowerCase() === e.del.toLowerCase());
    if (!load) return;
    const rt = loadRoute(load);
    const fromTxt = etaShowsCodes(e) && rt.fromCode ? rt.fromCode : rt.from, toTxt = etaShowsCodes(e) && rt.toCode ? rt.toCode : rt.to;
    askConfirm(
      `Truck ${truck} delivered. Also close Load #${load.loadNumber || ""}${fromTxt || toTxt ? ` (${fromTxt || "—"} → ${toTxt || "—"})` : ""} in the Loads list?`,
      () => closeLoad(load.id),
      { title: "Close the load?", confirmLabel: "Close Load", dangerous: false }
    );
  }
  // Done at this stop (loaded / dropped): the board moves on to the next stop.
  async function markNextStop(ev, r) {
    ev.stopPropagation();
    const nx = etaAfter(r.e, r.leg.key);
    if (!nx) return;
    const left = r.e[`${r.leg.key}DepartedAt`] || new Date().toISOString();
    const arrivalLog = (r.e.arrivalLog || []).map((x) => (x.type === r.leg.type && x.place === r.leg.end.name && !x.departedAt ? { ...x, departedAt: left } : x));
    const next = { ...r.e, ...etaNextFields(nx), [`${r.leg.key}DepartedAt`]: left, arrivalLog, updatedAt: new Date().toISOString() };
    await saveEtaEntry(r.truck, next);
    if (!next[`${nx}Date`] || !next[`${nx}Time`]) openEdit({ ...r, e: next });
  }
  // Trip finished: the truck is where it delivered, with no stops left (the yard stays).
  function tripDone(e) {
    return {
      ...e, etaType: "delivery",
      loc: e.del || e.loc, locZip: e.del ? e.delZip || "" : e.locZip, locLat: e.del ? e.delLat ?? null : e.locLat, locLon: e.del ? e.delLon ?? null : e.locLon,
      locCode: e.del ? e.delCode || "" : e.locCode || "", locExact: e.del ? !!e.delExact : !!e.locExact,
      ...blankPlace("pu"), puDate: "", puTime: "", puArrivedAt: null, puArrivedBy: null, puDepartedAt: null,
      ...blankPlace("del"), delDate: "", delTime: "", delArrivedAt: null, delArrivedBy: null, delDepartedAt: null,
      stopKeys: [], midsSig: null, next: "del", routes: {}, loadId: null, billTo: "", updatedAt: new Date().toISOString(),
    };
  }
  // Delivered: the truck is empty here and ready for the next load.
  async function markReadyHere(ev, r) {
    ev.stopPropagation();
    await saveEtaEntry(r.truck, { ...tripDone(r.e), status: "ready" });
  }
  // Delivered and done for now: the driver takes the truck to its yard.
  async function markToYard(ev, r) {
    ev.stopPropagation();
    const next = { ...tripDone(r.e), status: "home", yardMode: "going", yardSince: new Date().toISOString(), yardParkedAt: null, yardLeftAt: null };
    if (!etaHasPlace(next, "yard")) { openEdit({ ...r, e: next }); return; } // no yard yet: pick it in the trip details
    await saveEtaEntry(r.truck, next);
  }
  // At the yard (by hand). With the driver's phone there, its spot becomes the
  // yard's exact location, so parking is detected automatically next time.
  async function markParked(ev, r) {
    ev.stopPropagation();
    const e = r.e, g = r.gps, at = new Date().toISOString();
    const learn = !e.yardExact && g && g.fresh && g.age < 5 * 60000 && (!hasCoords(e.yardLat, e.yardLon) || milesBetween(g, { lat: e.yardLat, lon: e.yardLon }) <= 3);
    const yard = learn ? { yardLat: g.lat, yardLon: g.lon, yardExact: true } : {};
    await saveEtaEntry(r.truck, { ...e, ...yard, ...yardParkedFields({ ...e, ...yard }, at), yardSince: e.yardSince || at, updatedAt: at });
    if (learn && e.yard) {
      // other trucks using the same yard learn the spot too
      const same = {};
      Object.entries(etaBoard || {}).forEach(([t, x]) => { if (t !== String(r.truck) && x && x.yard && norm(x.yard) === norm(e.yard) && !x.yardExact) same[t] = yard; });
      if (Object.keys(same).length) patchEtaEntries(same);
    }
  }
  const fmtClock = (iso) => new Date(iso).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  // A time in the board's time zone, with the day when it isn't today.
  const fmtClockMs = (ms) => {
    const opts = { timeZone: tz === "local" ? undefined : tz };
    const day = (x) => new Date(x).toLocaleDateString("en-US", opts);
    const t = new Date(ms).toLocaleTimeString(undefined, { ...opts, hour: "numeric", minute: "2-digit" });
    return day(ms) === day(now) ? t : `${new Date(ms).toLocaleDateString(undefined, { ...opts, month: "short", day: "numeric" })}, ${t}`;
  };
  const fmtEarlyLate = (m) => (m == null ? "Arrived" : Math.abs(m) <= 15 ? "On time" : m < 0 ? `${fmtDuration(-m * 60000)} early` : `${fmtDuration(m * 60000)} late`);
  const coordsOf = (p) => (p && hasCoords(p.lat, p.lon) ? { lat: p.lat, lon: p.lon } : null);
  const legLabel = (leg, e) => (e ? etaStopTitle(e, leg.key) : leg.type === "pickup" ? "Pickup" : leg.type === "stop" ? "Stop" : "Delivery");

  const mapItems = shown
    .map((r) => {
      const { st, moving, prog, color } = liveInfo(r);
      const home = r.e.status === "home";
      const loc = coordsOf({ lat: r.e.locLat, lon: r.e.locLon });
      const from = coordsOf(r.leg.start), to = coordsOf(r.leg.end);
      const gps = r.gps ? { lat: r.gps.lat, lon: r.gps.lon } : null;
      const pos = gps || (home ? loc : prog ? prog.pos : loc || from || to);
      if (!pos) return null;
      return {
        truck: r.truck,
        driver: r.driver,
        color,
        pos,
        route: moving && from && to ? { from, to, coords: r.route ? r.route.coords : null } : null,
        bearing: prog ? prog.bearing : r.gps && r.gps.heading > 0 ? r.gps.heading : null,
        estimated: !!prog && !gps,
        live: !!(r.gps && r.gps.fresh),
        gpsText: r.gps ? `${r.gps.fresh ? "Live GPS" : "Last GPS"} · ${fmtAgo(r.gps.at, now)}${speedText(r.gps) ? ` · ${speedText(r.gps)}` : ""}${prog && prog.live && prog.milesLeft != null && prog.pct < 1 ? ` · ${Math.round(prog.milesLeft)} mi left` : ""}` : "",
        statusLabel: st ? `${st.label}${prog ? ` · ${Math.round(prog.pct * 100)}%` : ""}` : "",
        routeText: home ? (r.leg.key === "yard" ? `${etaPlaceName(r.e, r.leg.start) || "—"} → Yard` : etaYardParked(r.e) ? `Parked at the yard · ${r.e.yard || r.e.loc || ""}` : r.e.loc || "") : r.leg.start.name || r.leg.end.name ? `${etaPlaceName(r.e, r.leg.start) || "—"} → ${etaPlaceName(r.e, r.leg.end) || "—"}` : "",
        destCode: etaShowsCodes(r.e) ? r.leg.end.code : "",
        etaText: !home && r.leg.date ? `${moving ? `${legLabel(r.leg, r.e)} ETA ` : ""}${fmtEtaFull(r.leg.date, r.leg.time)} ${r.leg.time ? tzLabel : ""}`.trim() : "",
      };
    })
    .filter(Boolean);
  const notOnMap = shown.filter((r) => !mapItems.some((it) => it.truck === r.truck));
  const mapTruckOptions = mapItems.map((it) => it.truck).sort((a, b) => String(a).localeCompare(String(b), undefined, { numeric: true }));
  const focusTruck = mapTruck !== "all" && mapTruckOptions.includes(mapTruck) ? mapTruck : "all";
  const mapItemsShown = focusTruck === "all" ? mapItems : mapItems.filter((it) => it.truck === focusTruck);

  // ---- editor pieces ----
  const placeRow = (k, label) => {
    const code = form[`${k}Code`] || "";
    const known = !!(code && (facilities[code] || pins[code]));
    // Only offered when the truck is really at this stop right now (within 2 mi of
    // its city/ZIP point), so a parked truck elsewhere can't move a facility's pin.
    const gpsHere = k !== "loc" && editRow && editRow.gps && editRow.gps.fresh && (code || k === "yard") && !form[`${k}Exact`]
      && hasCoords(form[`${k}Lat`], form[`${k}Lon`]) && milesBetween(editRow.gps, { lat: form[`${k}Lat`], lon: form[`${k}Lon`] }) <= 2;
    return (
      <div key={k}>
        <div className="field-row">
          {k !== "yard" && <div className="field" style={{ flex: 1.05 }}>
            <label>Code</label>
            <input list="eta-facility-codes" value={code} placeholder="—" autoCapitalize="characters" autoCorrect="off" spellCheck={false} onChange={(e) => setCode(k, e.target.value)} style={{ fontFamily: "'IBM Plex Mono', monospace", textTransform: "uppercase" }} />
          </div>}
          <div className="field" style={{ flex: 2.2 }}>
            <label>{label}</label>
            <input value={form[k]} placeholder="City, ST" onChange={(e) => setPlace(k, e.target.value)} onBlur={() => placeBlur(k)} />
          </div>
          <div className="field" style={{ flex: 1 }}>
            <label>ZIP</label>
            <input inputMode="numeric" autoComplete="postal-code" maxLength={5} value={form[`${k}Zip`] || ""} placeholder="00000" onChange={(e) => setZip(k, e.target.value)} />
          </div>
        </div>
        {farFromZip(k) ? (
          <div className="eta-pin-note far">
            <MapPin size={11} />
            This spot is {farFromZip(k)} mi from ZIP {form[`${k}Zip`]} — it looks wrong.
            <button type="button" className="eta-undo" onClick={() => resetToZip(k)}>Use ZIP location</button>
          </div>
        ) : k !== "loc" && (form[k] || code) && hasCoords(form[`${k}Lat`], form[`${k}Lon`]) && (
          <div className={`eta-pin-note ${form[`${k}Exact`] ? "exact" : ""}`}>
            <MapPin size={11} />
            {k === "yard" ? (form.yardExact ? "Exact yard spot — parking is automatic" : "City/ZIP area only")
              : form[`${k}Exact`] ? `Exact ${code ? `${code} ` : ""}location — arrival is automatic` : code && !known ? `${code} isn't in Fleet → Shippers/Receivers` : "City/ZIP area only — mark arrival by hand"}
            {gpsHere && <button type="button" className="eta-undo" onClick={() => pinFromGps(k)}>Truck is at {k === "yard" ? "the yard" : code} now — save this spot</button>}
          </div>
        )}
        {zipMsg[k] && <div className={`eta-zip-msg ${/^(ZIP not|Couldn|The truck isn)/.test(zipMsg[k]) ? "bad" : ""}`}>{zipMsg[k]}</div>}
      </div>
    );
  };
  const isHomeForm = form && form.status === "home";
  // Picking Home after a delivered trip: the truck is where it delivered, and if
  // it has a yard it's driving there. Leaving Home stops a drive to the yard.
  function setFormStatus(f, status) {
    const n = { ...f, status };
    if (status === "home" && f.status !== "home") {
      if (f.delArrivedAt && etaHasPlace(f, "del")) Object.assign(n, { loc: f.del, locZip: f.delZip || "", locLat: f.delLat ?? null, locLon: f.delLon ?? null, locCode: f.delCode || "", locExact: !!f.delExact });
      if (!f.yardMode && etaHasPlace(f, "yard")) n.yardMode = "going";
    }
    if (status !== "home" && f.yardMode === "going") n.yardMode = "";
    return n;
  }
  // Yards other trucks use, to pick with one tap.
  const knownYards = (() => {
    const out = [];
    Object.entries(etaBoard || {}).forEach(([t, x]) => {
      if (!x || !x.yard || t === String(editing) || !hasCoords(x.yardLat, x.yardLon)) return;
      const have = out.find((y) => norm(y.yard) === norm(x.yard));
      if (!have) out.push({ yard: x.yard, yardZip: x.yardZip || "", yardLat: x.yardLat, yardLon: x.yardLon, yardCode: x.yardCode || "", yardExact: !!x.yardExact, trucks: [t] });
      else { have.trucks.push(t); if (x.yardExact && !have.yardExact) Object.assign(have, { yardLat: x.yardLat, yardLon: x.yardLon, yardExact: true }); }
    });
    return out;
  })();
  // One stop on the trip timeline: where it is, when, and whether the truck got there.
  // Rough drive from the previous stop: saved road route when there is one,
  // otherwise straight-line miles × 1.2 at ~50 mph.
  const legHint = (k) => {
    const leg = etaLegTo(form, k);
    if (!hasCoords(leg.start.lat, leg.start.lon) || !hasCoords(leg.end.lat, leg.end.lon)) return "";
    const rt = form.routes && form.routes[legRouteKey(leg)];
    const mi = rt && rt.miles ? rt.miles : milesBetween(leg.start, leg.end) * ETA_ROAD_FACTOR;
    if (mi < 1) return "";
    const hrs = rt && rt.sec ? rt.sec / 3600 : mi / ETA_AVG_MPH;
    const from = leg.start.key === "loc" ? "where the truck is" : etaPlaceName(form, leg.start) || leg.start.name;
    return `~${Math.round(mi)} mi · ~${fmtDuration(hrs * 3600000)} from ${from}`;
  };
  const stopCard = (k) => {
    const nextKey = etaNextKey(form);
    const isNext = k !== "loc" && nextKey === k;
    const isMid = /^s\d+$/.test(k);
    const mids = etaMidKeys(form);
    const arrived = k !== "loc" && form[`${k}ArrivedAt`];
    const hint = k !== "loc" ? legHint(k) : "";
    return (
      <div key={k} className={`trip-stop ${isMid ? "mid" : k} ${isNext ? "next" : ""}`}>
        <div className="trip-rail"><span className="trip-dot" /></div>
        <div className="trip-stop-body">
          <div className="trip-stop-head">
            <span className="trip-kind">{k === "loc" ? (isHomeForm && form.yardMode !== "going" ? "Location" : "Now") : etaStopTitle(form, k)}</span>
            {isMid && (
              <span className="trip-stop-tools">
                <button type="button" aria-label="Move up" disabled={mids.indexOf(k) === 0} onClick={() => moveStop(k, -1)}><ChevronUp size={14} /></button>
                <button type="button" aria-label="Move down" disabled={mids.indexOf(k) === mids.length - 1} onClick={() => moveStop(k, 1)}><ChevronDown size={14} /></button>
                <button type="button" aria-label="Remove stop" onClick={() => removeStop(k)}><X size={14} /></button>
              </span>
            )}
            {k !== "loc" && (isNext
              ? <span className="trip-next on">Board shows this</span>
              : <button type="button" className="trip-next" onClick={() => setForm((f) => ({ ...f, ...etaNextFields(k) }))}>Show this ETA</button>)}
          </div>
          {hint && <div className="trip-leg-hint">{hint}</div>}
          {placeRow(k, "City, ST")}
          {k !== "loc" && (
            <div className="field-row trip-when">
              <div className="field"><label>{k === "pu" ? "Pickup date" : k === "del" ? "Delivery date" : "Appt. date"}</label><div className="date-input-clip"><input type="date" value={form[`${k}Date`] || ""} onChange={(e) => setForm((f) => ({ ...f, [`${k}Date`]: e.target.value }))} /></div></div>
              <div className="field"><label>Time ({tzLabel})</label><div className="date-input-clip"><input type="time" value={form[`${k}Time`] || ""} onChange={(e) => setForm((f) => ({ ...f, [`${k}Time`]: e.target.value }))} /></div></div>
            </div>
          )}
          {arrived && (
            <div className="trip-arrived">
              <Check size={13} /> Arrived {fmtClock(arrived)}{form[`${k}DepartedAt`] ? ` · left ${fmtClock(form[`${k}DepartedAt`])}` : ""} ·{" "}
              <button type="button" className="eta-undo" onClick={() => setForm((f) => ({ ...f, [`${k}ArrivedAt`]: null, [`${k}ArrivedBy`]: null, [`${k}DepartedAt`]: null, arrivalLog: (f.arrivalLog || []).filter((x) => x.arrivedAt !== f[`${k}ArrivedAt`]) }))}>Undo</button>
            </div>
          )}
        </div>
      </div>
    );
  };
  const yardCard = form && isHomeForm && (() => {
    const mode = form.yardMode || "";
    const has = etaHasPlace(form, "yard");
    const hint = mode === "going" ? legHint("yard") : "";
    const others = knownYards.filter((y) => norm(y.yard) !== norm(form.yard));
    const modes = [{ k: "", label: "Not now" }, { k: "going", label: "Driving there" }, { k: "parked", label: "Parked" }];
    return (
      <div key="yard" className={`trip-stop yard ${mode ? "next" : ""}`}>
        <div className="trip-rail"><span className="trip-dot" /></div>
        <div className="trip-stop-body">
          <div className="trip-stop-head"><span className="trip-kind">Yard</span><span className="trip-yard-note">remembered for this truck</span></div>
          {hint && <div className="trip-leg-hint">{hint}</div>}
          {placeRow("yard", "City, ST or address")}
          {others.length > 0 && !form.yard && (
            <div className="trip-yard-picks">
              {others.slice(0, 4).map((y) => (
                <button key={y.yard} type="button" className="favorite-chip" onClick={() => setForm((f) => ({ ...f, yard: y.yard, yardZip: y.yardZip, yardLat: y.yardLat, yardLon: y.yardLon, yardCode: y.yardCode, yardExact: y.yardExact, yardMode: f.yardMode || "going" }))}>
                  {y.yard} <span>· {y.trucks.length > 1 ? "trucks" : "truck"} {y.trucks.join(", ")}</span>
                </button>
              ))}
            </div>
          )}
          <div className="trip-yard-modes" role="radiogroup" aria-label="Yard">
            {modes.map((m) => (
              <button key={m.k || "none"} type="button" role="radio" aria-checked={mode === m.k} disabled={!!m.k && !has}
                className={`trip-status-chip ${mode === m.k ? "active" : ""}`} style={{ "--eta-c": "#8A94A6" }}
                onClick={() => setForm((f) => ({ ...f, yardMode: m.k }))}>{m.label}</button>
            ))}
          </div>
          {has && mode && (
            <div className="trip-yard-help">
              {mode === "parked"
                ? form.yardParkedAt && etaYardParked((rows.find((x) => x.truck === editing) || {}).e || {})
                  ? `Parked since ${fmtClockMs(new Date(form.yardParkedAt).getTime())}. The driver's drive home isn't tracked or counted as truck miles — tracking picks up when he's back at the truck.`
                  : "Saves the truck as parked here. The driver's drive home isn't tracked or counted as truck miles."
                : form.yardExact
                  ? "Parking is detected automatically when the truck gets there."
                  : "Tap Parked on the board when the truck is there — the driver's GPS saves the yard's exact spot, so it's automatic next time."}
            </div>
          )}
        </div>
      </div>
    );
  })();
  const addStopRow = (
    <div key="add" className="trip-stop add">
      <div className="trip-rail"><span className="trip-dot plus"><Plus size={10} /></span></div>
      <div className="trip-stop-body">
        <button type="button" className="trip-add-stop" onClick={addStop}><Plus size={14} /> <b>Add stop</b> <span>between pickup and delivery</span></button>
      </div>
    </div>
  );
  const shortName = (k) => form[`${k}Code`] || String(form[k] || "").split(",")[0];
  const miniPoints = form ? [
    editRow && editRow.gps ? { kind: "truck", lat: editRow.gps.lat, lon: editRow.gps.lon, label: String(editing) } : { kind: "loc", lat: form.locLat, lon: form.locLon, label: "Now" },
    ...etaStopSeq(form).filter((k) => etaHasPlace(form, k)).map((k, i) => (
      { kind: k === "del" ? "del" : k === "pu" ? "pu" : "mid", lat: form[`${k}Lat`], lon: form[`${k}Lon`], label: `${i + 1} ${shortName(k) || etaStopTitle(form, k)}`, warn: !!farFromZip(k) }
    )),
  ] : [];
  const liveState = !editDriver ? { text: "No driver", tone: "" }
    : editLink && editLink.telegram_chat_id ? (editRow && editRow.gps && editRow.gps.fresh ? { text: "Sharing live", tone: "ok" } : { text: "Not sharing", tone: "bad" })
      : editLink ? { text: "Link sent", tone: "" } : { text: "Not set up", tone: "" };

  return (
    <div>
      {headerSlot && createPortal(
      <div>
      <div className="eta-head">
        <div className="section-label" style={{ margin: 0 }}>ETA Board</div>
        <div className="eta-head-line" />
        <div className="eta-view-toggle" role="tablist" aria-label="View">
          <button type="button" role="tab" aria-selected={view === "list"} className={view === "list" ? "active" : ""} onClick={() => setView("list")}>List</button>
          <button type="button" role="tab" aria-selected={view === "map"} className={view === "map" ? "active" : ""} onClick={() => setView("map")}>Map</button>
        </div>
      </div>

      <div className="eta-filter-row">
        <button type="button" className={`eta-filter-chip ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")} title="All trucks" aria-label={`All trucks: ${rows.length}`}>
          <LayoutGrid size={17} color="var(--accent)" /> {rows.length}
        </button>
        {ETA_STATUSES.map((st) => (
          <button
            key={st.key}
            type="button"
            className={`eta-filter-chip ${filter === st.key ? "active" : ""}`}
            style={{ "--eta-c": st.color }}
            onClick={() => setFilter(filter === st.key ? "all" : st.key)}
            title={st.label}
            aria-label={`${st.label}: ${counts[st.key] || 0}`}
          >
            <st.icon size={17} color={st.color} /> {counts[st.key] || 0}
          </button>
        ))}
      </div>
      <div className="eta-tz-note">Times in {tzLabel}</div>
      </div>,
      headerSlot
      )}

      {rows.length === 0 && <div className="empty-state">No active trucks yet. Add trucks in Fleet → Trucks and they'll show up here.</div>}
      {rows.length > 0 && shown.length === 0 && <div className="empty-state">No trucks with this status.</div>}

      {view === "map" && rows.length > 0 && (
        <>
          <EtaMapView items={mapItemsShown} onEdit={editTruck} roadRoutes={!!routeKey} truckOptions={mapTruckOptions} focusTruck={focusTruck} onFocusTruck={setMapTruck} loadTrail={tracking ? loadTrail : null} tz={tz} />
          <div className="eta-map-foot">
            {mapItems.some((it) => it.gpsText)
              ? "Trucks with a green dot show live GPS from the driver's phone; others are estimated from each trip's ZIPs and ETA. Tap a truck for details."
              : "Positions are estimated from each trip's ZIPs and ETA. For real GPS, open a truck and send its driver a Telegram live-location link. Tap a truck for details."}
            {!routeKey && " Add a free routing key in Settings to draw real truck roads instead of straight lines."}
          </div>
          {notOnMap.length > 0 && (
            <div className="eta-not-on-map">
              <span>Not on map (add a city or ZIP):</span>
              {notOnMap.map((r) => (
                <button key={r.truck} type="button" className="favorite-chip" onClick={() => openEdit(r)}>Truck {r.truck}</button>
              ))}
            </div>
          )}
        </>
      )}

      {view === "list" && shown.map((r) => {
        const { st, moving, toYard, diff, late, prog, arrivedAt, departedAt, onSiteMs, arriveDiffMin, gpsEtaMs, riskMin, color } = liveInfo(r);
        const parked = etaYardParked(r.e);
        const gpsIssue = moving && !parked && !(r.gps && r.gps.fresh) ? gpsProblem(r.driver) : null;
        const detention = onSiteMs != null && onSiteMs > DETENTION_FREE_MS;
        const placeEl = (pt) => {
          const sub = etaPlaceSub(r.e, pt);
          return (
            <span className={`eta-place ${sub ? "has-sub" : ""}`}>
              <MapPin size={15} />
              <span className="eta-place-txt"><span className="eta-place-main">{etaPlaceName(r.e, pt) || "—"}</span>{sub && <em className="eta-place-sub">{sub}</em>}</span>
            </span>
          );
        };
        const home = r.e.status === "home";
        const stale = r.e.updatedAt && now - new Date(r.e.updatedAt).getTime() > 24 * 3600000;
        const pct = prog ? Math.round(prog.pct * 100) : null;
        const hasLeg = !home && (r.leg.start.name || r.leg.end.name);
        return (
          <div
            key={r.truck}
            role="button"
            tabIndex={0}
            className="eta-card"
            style={{ borderLeftColor: st ? color : "var(--border)" }}
            onClick={() => openEdit(r)}
            onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); openEdit(r); } }}
          >
            <div className="eta-card-top">
              <div className="eta-title">
                <span className="eta-truck">Truck {r.truck}</span>
                {r.driver && <span className="eta-driver">· {r.driver}</span>}
              </div>
              <div className="eta-top-right">
                <span className="eta-status-pill" style={st ? { background: st.color } : undefined}>{st && <st.icon size={12} color="#fff" />}{st ? st.label : "Set status"}</span>
                <ChevronRight size={18} color="var(--text-dim)" />
              </div>
            </div>
            <div className="eta-sub-row">
              {r.phone ? (
              <div className="eta-phone-line">
                <span className="eta-phone"><Phone size={12} /> {r.phone}</span>
                <button
                  type="button"
                  className={`eta-copy-btn ${copiedTruck === r.truck ? "copied" : ""}`}
                  onClick={(ev) => copyPhone(ev, r.truck, r.phone)}
                  aria-label={copiedTruck === r.truck ? "Copied" : `Copy ${r.driver || "driver"}'s phone number`}
                  title="Copy phone number"
                >
                  {copiedTruck === r.truck ? <Check size={13} /> : <Copy size={13} />}
                </button>
                {copiedTruck === r.truck && <span className="eta-copied-text">Copied</span>}
              </div>
              ) : <span />}
              {parked ? (
                <span className="eta-updated-mini eta-parked-mini" title="Parked at the yard. The driver's phone isn't tracked until he's back at the truck.">
                  <Home size={11} />Parked{r.e.yardParkedAt ? ` ${fmtClockMs(new Date(r.e.yardParkedAt).getTime())}` : ""}
                </span>
              ) : gpsIssue ? (
                <span className="eta-updated-mini eta-gps-mini lost" title="The driver's phone stopped sharing location. Open the truck to remind them.">
                  <span className="eta-gps-dot" />{gpsIssue.text}
                </span>
              ) : r.gps ? (
                <span className={`eta-updated-mini eta-gps-mini ${r.gps.fresh ? "live" : ""}`} title="Position from the driver's phone (Telegram)">
                  <span className="eta-gps-dot" />{r.gps.fresh ? (speedText(r.gps) ? `Live · ${speedText(r.gps)}` : `Live ${fmtAgo(r.gps.at, now)}`) : `GPS ${fmtAgo(r.gps.at, now)}`}
                </span>
              ) : (
                <span className={`eta-updated-mini ${stale ? "stale" : ""}`}>Updated {fmtAgo(r.e.updatedAt, now)}</span>
              )}
            </div>
            {home && toYard && (
              <div className="eta-route">
                {placeEl(r.leg.start)}
                <span className="eta-arrow">→</span>
                <span className="eta-place has-sub">
                  <Home size={15} />
                  <span className="eta-place-txt"><span className="eta-place-main">Yard</span><em className="eta-place-sub">{r.e.yard}</em></span>
                </span>
                <button type="button" className="eta-act arrived" onClick={(ev) => markParked(ev, r)}>Parked</button>
              </div>
            )}
            {home && !toYard && parked && (
              <div className="eta-route"><span className="eta-place has-sub"><Home size={15} /> <span className="eta-place-txt"><span className="eta-place-main">At the yard</span><em className="eta-place-sub">{r.e.yard || r.e.loc}</em></span></span></div>
            )}
            {home && !toYard && !parked && r.e.loc && (
              <div className="eta-route"><span className="eta-place"><Home size={15} /> <span>{r.e.loc}</span></span></div>
            )}
            {!home && !hasLeg && r.e.loc && (
              <div className="eta-route">{placeEl({ name: r.e.loc, code: r.e.locCode || "" })}</div>
            )}
            {hasLeg && (
              <div className="eta-route">
                {placeEl(r.leg.start)}
                <span className="eta-arrow">→</span>
                {placeEl(r.leg.end)}
                {moving && r.leg.end.name && !arrivedAt && (
                  <button type="button" className="eta-act arrived" onClick={(ev) => markArrived(ev, r)}>Mark Arrived</button>
                )}
                {moving && arrivedAt && r.leg.key !== "del" && etaAfter(r.e, r.leg.key) && (
                  <button type="button" className="eta-act next" onClick={(ev) => markNextStop(ev, r)}>{r.leg.key === "pu" ? "Loaded" : "Next stop"} <ChevronRight size={12} /></button>
                )}
                {moving && arrivedAt && r.leg.key === "del" && (
                  <>
                    <button type="button" className="eta-act next" onClick={(ev) => markReadyHere(ev, r)}>Ready here</button>
                    <button type="button" className="eta-act yard" onClick={(ev) => markToYard(ev, r)}><Home size={12} /> To yard</button>
                  </>
                )}
              </div>
            )}
            {hasLeg && (() => {
              // the stops still to come after this one
              const rest = [];
              for (let k = etaAfter(r.e, r.leg.key); k; k = etaAfter(r.e, k)) rest.push(etaPlaceName(r.e, etaLegTo(r.e, k).end) || r.e[k]);
              return rest.length ? <div className="eta-then">then {rest.join(" → ")}</div> : null;
            })()}
            {prog && (
              <div className="eta-progress" aria-label={`About ${pct}% of the way`}>
                <div className="eta-progress-track"><div className="eta-progress-fill" style={{ width: `${pct}%`, background: color }} /></div>
                <span className="eta-progress-pct">{pct}%{prog.live && prog.milesLeft != null && pct < 100 ? ` · ${Math.round(prog.milesLeft)} mi left` : ""}</span>
              </div>
            )}
            {toYard && gpsEtaMs != null && (
              <div className="eta-stats">
                <div className="eta-stat">
                  <Clock size={17} />
                  <div><div className="eta-stat-label">At yard ~</div><div className="eta-stat-value">{fmtClockMs(gpsEtaMs)}</div></div>
                </div>
              </div>
            )}
            {!home && r.leg.date && (
            <div className="eta-stats">
              <div className="eta-stat">
                <Calendar size={17} />
                <div>
                  <div className="eta-stat-label">{legLabel(r.leg, r.e)} {moving ? "ETA" : "date"}</div>
                  <div className="eta-stat-value">{fmtEtaFull(r.leg.date, r.leg.time)}</div>
                </div>
              </div>
              {arrivedAt && (
                <div className="eta-stat">
                  <Check size={17} />
                  <div><div className="eta-stat-label">{r.leg.key === "del" ? "Delivered" : r.leg.key === "pu" ? "At pickup" : `At ${etaStopTitle(r.e, r.leg.key).toLowerCase()}`}</div><div className="eta-stat-value">{fmtClock(arrivedAt)}</div></div>
                </div>
              )}
              {arrivedAt && onSiteMs != null && (
                <div className={`eta-stat ${detention && !departedAt ? "detention" : ""}`}>
                  <Clock size={17} />
                  <div>
                    <div className="eta-stat-label">{departedAt ? `Left ${fmtClock(departedAt)}` : detention ? "Detention" : "On site"}</div>
                    <div className="eta-stat-value">{detention && !departedAt ? `+${fmtDuration(onSiteMs - DETENTION_FREE_MS)}` : fmtDuration(onSiteMs)}</div>
                  </div>
                </div>
              )}
              {arrivedAt && (
                <span className={`eta-countdown ${arriveDiffMin != null && arriveDiffMin > 15 ? "late" : "ontime"}`}>
                  <span className="eta-countdown-dot" />{fmtEarlyLate(arriveDiffMin)}
                </span>
              )}
              {!arrivedAt && moving && gpsEtaMs != null && (
                <div className="eta-stat">
                  <Clock size={17} />
                  <div><div className="eta-stat-label">GPS ETA</div><div className="eta-stat-value">{fmtClockMs(gpsEtaMs)}</div></div>
                </div>
              )}
              {!arrivedAt && moving && gpsEtaMs == null && r.leg.time && diff != null && !late && diff > 60000 && (
                <div className="eta-stat">
                  <Clock size={17} />
                  <div><div className="eta-stat-label">In</div><div className="eta-stat-value">{fmtDuration(diff)}</div></div>
                </div>
              )}
              {!arrivedAt && moving && r.leg.time && diff != null && (
                <span className={`eta-countdown ${late ? "late" : riskMin != null && riskMin > 15 ? "risk" : "ontime"}`} title={riskMin != null && riskMin > 15 && !late ? "From the driver's live GPS and remaining miles" : undefined}>
                  <span className="eta-countdown-dot" />{late ? `Late ${fmtDuration(diff)}` : riskMin != null && riskMin > 15 ? `At risk +${fmtDuration(riskMin * 60000)}` : diff <= 60000 ? "Due now" : "On time"}
                </span>
              )}
            </div>
            )}
            {r.e.notes && <div className="eta-notes">{r.e.notes}</div>}
          </div>
        );
      })}

      {editing && form && (
        <div className="modal-overlay" onClick={() => setEditing(null)}>
          <div className="modal-sheet eta-sheet trip-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="trip-head">
              <div>
                <div className="trip-title">Truck {editing}</div>
                {editDriver && <div className="trip-sub">{editDriver}{editRow && editRow.gps ? ` · ${editRow.gps.fresh ? "Live GPS" : "GPS"} ${fmtAgo(editRow.gps.at, now)}${speedText(editRow.gps) ? ` · ${speedText(editRow.gps)}` : ""}` : ""}</div>}
              </div>
              <button type="button" className="trip-close" aria-label="Close" onClick={() => setEditing(null)}><X size={18} /></button>
            </div>
            <div className="trip-status-row" role="radiogroup" aria-label="Status">
              {ETA_STATUSES.map((st) => (
                <button
                  key={st.key}
                  type="button"
                  role="radio"
                  aria-checked={form.status === st.key}
                  className={`trip-status-chip ${form.status === st.key ? "active" : ""}`}
                  style={{ "--eta-c": st.color }}
                  onClick={() => setForm((f) => setFormStatus(f, f.status === st.key ? "" : st.key))}
                >
                  <st.icon size={14} color={form.status === st.key ? "#fff" : st.color} /> {st.label}
                </button>
              ))}
            </div>
            {!isHomeForm && <TripMiniMap points={miniPoints} />}
            <div className="trip-stops">
              {stopCard("loc")}
              {yardCard}
              {!isHomeForm && stopCard("pu")}
              {!isHomeForm && etaMidKeys(form).map((k) => stopCard(k))}
              {!isHomeForm && addStopRow}
              {!isHomeForm && stopCard("del")}
            </div>
            {!isHomeForm && filledFrom && <div style={{ fontSize: 11.5, color: "var(--green)", fontWeight: 600, margin: "-2px 0 10px" }}>{filledFrom}</div>}
            {!isHomeForm && editLoad && !filledFrom && (
              <button type="button" className="import-btn" onClick={fillFromLoad}>Fill from active load #{editLoad.loadNumber || ""}</button>
            )}
            <div className="field trip-notes"><label>Notes</label><textarea rows={2} value={form.notes} placeholder={isHomeForm ? "Back on Monday, truck in shop…" : "Delays, appointment, reload…"} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} /></div>
            {liveSection && (
              <details className="trip-more">
                <summary><MapPin size={14} /> <b>Live location</b><span className={`trip-more-state ${liveState.tone}`}>{liveState.text}</span><ChevronDown size={15} /></summary>
                {liveSection}
              </details>
            )}
            {shareSection && (
              <details className="trip-more">
                <summary><Send size={13} /> <b>Broker tracking link</b><span className={`trip-more-state ${editShare ? "ok" : ""}`}>{editShare ? "Shared" : "Not shared"}</span><ChevronDown size={15} /></summary>
                {shareSection}
              </details>
            )}
            <datalist id="eta-facility-codes">{facilityCodes.map((c) => <option key={c} value={c}>{facilities[c].place}</option>)}</datalist>
            <div className="trip-footer">
              <button
                type="button"
                className="trip-clear"
                onClick={() => {
                  setForm((f) => ({ ...f, ...blankPlace("loc"), ...blankPlace("pu"), ...blankPlace("del"), puDate: "", puTime: "", delDate: "", delTime: "", puArrivedAt: null, delArrivedAt: null, puArrivedBy: null, delArrivedBy: null, puDepartedAt: null, delDepartedAt: null, stopKeys: [], midsSig: null, next: "del", etaType: "delivery", loadId: null, billTo: "", notes: "" }));
                  setFilledFrom("");
                  setZipMsg({});
                }}
              >
                Clear trip
              </button>
              <button type="button" className="btn secondary trip-cancel" onClick={() => setEditing(null)}>Cancel</button>
              <button type="button" className="btn trip-save" disabled={saving} onClick={save}>{saving ? "Saving…" : "Save"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function IftaCalculatorPage(p) {
  const { setFleetView, truckNumbers, iftaReports, iftaRates, saveIftaRates, saveIftaReport, deleteIftaReport, askConfirm, companyInfo, favoriteJurisdictions, toggleFavoriteJurisdiction, fuelReports, saveFuelReport, deleteFuelReport } = p;
  const [mode, setMode] = useState("build"); // build | history | fuel
  const [report, setReport] = useState(() => {
    // Same as starting a new report: remember last All Trucks exclusions.
    const lastAll = [...(iftaReports || [])]
      .filter((r) => r.truck === "ALL" && Array.isArray(r.excludedTrucks))
      .sort((a, b) => String(b.savedAt || "").localeCompare(String(a.savedAt || "")))[0];
    const fresh = emptyIftaReport(favoriteJurisdictions);
    return { ...fresh, excludedTrucks: lastAll ? lastAll.excludedTrucks.filter((t) => (truckNumbers || []).includes(t)) : [] };
  });
  const [activeReportId, setActiveReportId] = useState(null);
  const [showRates, setShowRates] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [viewingReport, setViewingReport] = useState(null);
  const [importError, setImportError] = useState("");
  const [importNote, setImportNote] = useState("");
  const [exclusionsStale, setExclusionsStale] = useState(false);
  const fileRef = useRef(null);
  const [histTruckFilter, setHistTruckFilter] = useState("ALL");
  const [histQuarterFilter, setHistQuarterFilter] = useState(0); // 0 = all
  const [histYearFilter, setHistYearFilter] = useState(0); // 0 = all
  const histYears = (() => { const y = new Date().getFullYear(); const arr = []; for (let i = y - 3; i <= Math.max(y + 1, 2040); i++) arr.push(i); return arr; })();

  const totals = computeIftaTotals(report.rows, iftaRates);
  const grandTotal = totals.netTotal + num(report.filingFee);
  const usedJurisdictions = new Set(report.rows.map((r) => r.jurisdiction));
  const availableJurisdictions = IFTA_JURISDICTIONS.filter((j) => !usedJurisdictions.has(j));

  // Owner-operators usually stay the same each quarter, so a new report starts
  // with the trucks excluded on the most recent All Trucks report.
  function startNewReport() {
    const lastAll = [...(iftaReports || [])]
      .filter((r) => r.truck === "ALL" && Array.isArray(r.excludedTrucks))
      .sort((a, b) => String(b.savedAt || "").localeCompare(String(a.savedAt || "")))[0];
    const fresh = emptyIftaReport(favoriteJurisdictions);
    setReport({ ...fresh, excludedTrucks: lastAll ? lastAll.excludedTrucks.filter((t) => truckNumbers.includes(t)) : [] });
    setActiveReportId(null);
    setMode("build");
    setImportError("");
    setImportNote("");
    setExclusionsStale(false);
  }
  function openReportForEdit(r) { setReport({ quarter: r.quarter, year: r.year, truck: r.truck, excludedTrucks: r.excludedTrucks || [], rows: r.rows, filingFee: r.filingFee || "" }); setActiveReportId(r.id); setMode("build"); setExclusionsStale(false); }
  function toggleExcludedTruck(t) {
    setReport((r) => {
      const cur = r.excludedTrucks || [];
      return { ...r, excludedTrucks: cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t] };
    });
    if (report.rows.some((row) => num(row.miles) > 0 || num(row.gallons) > 0)) setExclusionsStale(true);
  }
  // "All Trucks (excl. 571, 999)" wherever an All Trucks report is labeled
  const allTrucksLabel = (r) => `All Trucks${r && r.excludedTrucks && r.excludedTrucks.length ? ` (excl. ${r.excludedTrucks.join(", ")})` : ""}`;

  function addRow(jurisdiction) {
    if (!jurisdiction) return;
    setReport((r) => ({ ...r, rows: [...r.rows, { jurisdiction, miles: "", gallons: "" }] }));
  }
  function updateRow(jurisdiction, patch) {
    setReport((r) => ({ ...r, rows: r.rows.map((row) => (row.jurisdiction === jurisdiction ? { ...row, ...patch } : row)) }));
  }
  function removeRow(jurisdiction) {
    setReport((r) => ({ ...r, rows: r.rows.filter((row) => row.jurisdiction !== jurisdiction) }));
  }

  // Puts miles (and gallons, if the sheet has them) into the report's rows.
  // Miles come entirely from the file; gallons you've already typed are kept
  // unless the sheet brings its own.
  function mergeIntoReport(milesByCode, gallonsByCode) {
    setReport((r) => {
      const byCode = {};
      const order = [];
      r.rows.forEach((row) => { byCode[row.jurisdiction] = { ...row, miles: "" }; order.push(row.jurisdiction); });
      const touch = (code) => { if (!byCode[code]) { byCode[code] = { jurisdiction: code, miles: "", gallons: "" }; order.push(code); } };
      Object.entries(milesByCode || {}).forEach(([code, m]) => { touch(code); byCode[code].miles = Math.round(m * 100) / 100; });
      Object.entries(gallonsByCode || {}).forEach(([code, g]) => { touch(code); byCode[code].gallons = Math.round(g * 100) / 100; });
      const rows = order
        .map((code) => byCode[code])
        .filter((row) => num(row.miles) > 0 || num(row.gallons) > 0 || (favoriteJurisdictions || []).includes(row.jurisdiction));
      return { ...r, rows };
    });
  }

  // ---- Miles from TruxFlow's own GPS (live Telegram tracking) ----
  // Every GPS segment is added to miles per truck / state / day and kept
  // permanently, so a whole quarter can be pulled in here when filing.
  const [gpsMiles, setGpsMiles] = useState(null); // preview before using
  const [gpsGaps, setGpsGaps] = useState(true);
  async function loadGpsMiles() {
    setImportError(""); setImportNote("");
    if (typeof sb === "undefined" || typeof currentTeamId === "undefined" || !currentTeamId) { setImportError("GPS miles need the online app."); return; }
    const { start, end } = quarterRange(report.quarter, report.year);
    const all = !report.truck || report.truck === "ALL";
    const excluded = report.excludedTrucks || [];
    const trucks = all ? truckNumbers.filter((t) => !excluded.includes(t)).map(String) : [String(report.truck)];
    setGpsMiles({ loading: true });
    let data = null, error = null;
    try { ({ data, error } = await sb.from("ifta_miles").select("truck, day, state, miles, gap_miles").eq("team_id", currentTeamId).gte("day", start).lte("day", end).in("truck", trucks)); }
    catch (e) { error = e; }
    if (error) { setGpsMiles(null); setImportError("Couldn't load GPS miles. Check your connection and try again."); return; }
    const byState = {}, days = {};
    (data || []).forEach((r) => {
      const b = (byState[r.state] = byState[r.state] || { miles: 0, gap: 0 });
      b.miles += Number(r.miles) || 0;
      b.gap += Number(r.gap_miles) || 0;
      (days[r.truck] = days[r.truck] || new Set()).add(r.day);
    });
    const today = new Date().toLocaleDateString("en-CA");
    const lastDay = today < end ? today : end;
    const quarterDays = Math.max(1, Math.round((new Date(`${lastDay}T12:00`) - new Date(`${start}T12:00`)) / 86400000) + 1);
    const rows = Object.entries(byState).map(([code, v]) => ({ code, ...v, ifta: IFTA_JURISDICTIONS.includes(code) })).sort((a, b) => b.miles + b.gap - (a.miles + a.gap));
    setGpsMiles({ rows, trucks, who: all ? (excluded.length ? `all trucks except ${excluded.join(", ")}` : "all trucks") : `Truck ${report.truck}`,
      coverage: trucks.map((t) => ({ truck: t, days: days[t] ? days[t].size : 0 })), quarterDays, label: `Q${report.quarter} ${report.year}` });
  }
  function applyGpsMiles() {
    const m = {};
    gpsMiles.rows.forEach((r) => { if (r.ifta) m[r.code] = r.miles + (gpsGaps ? r.gap : 0); });
    mergeIntoReport(m, null);
    setExclusionsStale(false);
    const total = Object.values(m).reduce((a, b) => a + b, 0);
    setImportNote(`Filled ${Math.round(total).toLocaleString()} GPS miles in ${Object.keys(m).length} states for ${gpsMiles.who}, ${gpsMiles.label}. Gallons were left as they were.`);
    setGpsMiles(null);
  }

  // Fills each state's gallons from the saved TCS fuel report for this exact
  // quarter (one truck, or all trucks combined). Miles are never touched.
  function fillGallonsFromTcs() {
    setImportError("");
    setImportNote("");
    const q = Number(report.quarter), y = Number(report.year);
    const m1 = (q - 1) * 3 + 1;
    const qStart = `${y}-${String(m1).padStart(2, "0")}-01`;
    const qEnd = `${y}-${String(m1 + 2).padStart(2, "0")}-${String(new Date(y, m1 + 2, 0).getDate()).padStart(2, "0")}`;
    const qLabel = `Q${q} ${y}`;
    const fr = (fuelReports || []).find((r) => r.start === qStart && r.end === qEnd);
    if (!fr) {
      setImportError(`No TCS fuel report saved for ${qLabel} (${fmtDate(qStart)} – ${fmtDate(qEnd)}). Import it under Fuel Report first.`);
      return;
    }
    const all = !report.truck || report.truck === "ALL";
    const excluded = all ? (report.excludedTrucks || []) : [];
    const units = all ? fr.units.filter((u) => !excluded.includes(u.unit)) : fr.units.filter((u) => u.unit === report.truck);
    if (!units.length) {
      setImportError(`Truck ${report.truck} isn't in the ${qLabel} fuel report. Units in it: ${fr.units.map((u) => u.unit).join(", ")}.`);
      return;
    }
    const gallons = {};
    units.forEach((u) => u.rows.forEach((r) => { if (r.code && IFTA_JURISDICTIONS.includes(r.code)) gallons[r.code] = (gallons[r.code] || 0) + num(r.gals); }));
    const totalGal = Object.values(gallons).reduce((a, b) => a + b, 0);
    const verified = units.every((u) => u.matchesTcs === true);
    const apply = () => {
      setReport((r) => {
        const byCode = {};
        const order = [];
        r.rows.forEach((row) => { byCode[row.jurisdiction] = { ...row, gallons: "" }; order.push(row.jurisdiction); });
        Object.entries(gallons).forEach(([code, g]) => {
          if (!byCode[code]) { byCode[code] = { jurisdiction: code, miles: "", gallons: "" }; order.push(code); }
          byCode[code].gallons = Math.round(g * 100) / 100;
        });
        return { ...r, rows: order.map((c) => byCode[c]) };
      });
      setExclusionsStale(false);
      setImportNote(`${verified ? "✓ " : ""}Filled ${Math.round(totalGal).toLocaleString()} gallons in ${Object.keys(gallons).length} states from the TCS ${qLabel} report for ${all ? (excluded.length ? `all trucks except ${excluded.join(", ")}` : "all trucks combined") : `Truck ${report.truck}`}${verified ? " (matches TCS totals)" : ""}.`);
    };
    if (report.rows.some((row) => num(row.gallons) > 0)) {
      askConfirm(
        `Replace the gallons on this report with the TCS ${qLabel} figures? States with no TCS fuel purchases will be cleared. Miles stay as they are.`,
        apply,
        { title: "Fill Gallons from TCS", confirmLabel: "Replace Gallons", dangerous: false }
      );
    } else apply();
  }

  function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setImportError("");
    setImportNote("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const wb = XLSX.read(ev.target.result, { type: "array" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const grid = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
        const toN = (v) => { const n = parseFloat(String(v).replace(/[^0-9.\-]/g, "")); return isNaN(n) ? 0 : n; };
        const fmtMi = (n) => Math.round(n).toLocaleString();

        // 1) ELD state-miles export (Lucid ELD layout)
        const eld = parseEldMiles(grid, IFTA_JURISDICTIONS, STATE_NAME_TO_CODE);
        if (eld) {
          const all = !report.truck || report.truck === "ALL";
          let miles, expected = null, who;
          if (all) {
            const excluded = report.excludedTrucks || [];
            if (excluded.length && !Object.keys(eld.vehicles).length) {
              setImportError("This file only has fleet totals, so excluded trucks can't be taken out. Export the report with each vehicle listed.");
              return;
            }
            const sumVehicles = (keep) => {
              const m = {};
              Object.entries(eld.vehicles).forEach(([unit, v]) => { if (keep(unit)) Object.entries(v).forEach(([c, n]) => { m[c] = (m[c] || 0) + n; }); });
              return m;
            };
            miles = excluded.length ? sumVehicles((u) => !excluded.includes(u)) : (Object.keys(eld.fleet).length ? eld.fleet : sumVehicles(() => true));
            const vt = Object.entries(eld.vehicleTotals).filter(([u]) => !excluded.includes(u)).map(([, n]) => n);
            if (vt.length) expected = vt.reduce((a, b) => a + b, 0);
            who = excluded.length ? `all trucks except ${excluded.join(", ")}` : "all trucks combined";
          } else {
            miles = eld.vehicles[report.truck];
            if (!miles) {
              const found = Object.keys(eld.vehicles);
              setImportError(`Truck ${report.truck} isn't in this file.${found.length ? ` Trucks in it: ${found.join(", ")}.` : ""}`);
              return;
            }
            expected = eld.vehicleTotals[report.truck] != null ? eld.vehicleTotals[report.truck] : null;
            who = `Truck ${report.truck}`;
          }
          const states = Object.keys(miles).length;
          const total = Object.values(miles).reduce((a, b) => a + b, 0);
          mergeIntoReport(miles, null);
          setExclusionsStale(false);
          if (expected == null) setImportNote(`Imported ${fmtMi(total)} miles in ${states} states for ${who}.`);
          else if (Math.abs(total - expected) <= Math.max(1, Math.ceil(states * 0.5))) {
            setImportNote(`✓ Imported ${fmtMi(total)} miles in ${states} states for ${who} — matches the ELD total${Math.round(total) !== Math.round(expected) ? ` (${fmtMi(expected)}, within rounding)` : ""}.`);
          } else {
            setImportError(`Imported ${fmtMi(total)} miles for ${who}, but the ELD file's total says ${fmtMi(expected)} — double-check the export.`);
          }
          return;
        }

        // 2) Plain sheet: a state column plus Miles and/or Gallons. The header row
        //    doesn't have to be first (title lines above it are skipped).
        const isState = (h) => /^(jurisdiction|state|province|st)$/i.test(String(h).trim());
        const headerIdx = grid.findIndex((row) => row.some(isState) && row.some((h) => /mile|gal|fuel/i.test(String(h))));
        if (headerIdx < 0) { setImportError("Couldn't find a State (or Jurisdiction) column with Miles or Gallons — check the sheet's headers."); return; }
        const headers = grid[headerIdx].map((h) => String(h));
        const jIdx = headers.findIndex(isState);
        const mIdx = headers.findIndex((h) => /mile/i.test(h));
        const gIdx = headers.findIndex((h) => /gal|fuel/i.test(h));
        const miles = {}, gallons = {};
        grid.slice(headerIdx + 1).forEach((row) => {
          const raw = String(row[jIdx] || "").trim().toUpperCase();
          const code = IFTA_JURISDICTIONS.includes(raw) ? raw : STATE_NAME_TO_CODE[raw];
          if (!code || !IFTA_JURISDICTIONS.includes(code)) return;
          if (mIdx >= 0) miles[code] = (miles[code] || 0) + toN(row[mIdx]);
          if (gIdx >= 0) gallons[code] = (gallons[code] || 0) + toN(row[gIdx]);
        });
        if (!Object.keys(miles).length && !Object.keys(gallons).length) { setImportError("No recognizable states found (use codes like CA, OR or full names like California)."); return; }
        if (mIdx >= 0) mergeIntoReport(miles, gIdx >= 0 ? gallons : null);
        else setReport((r) => {
          // gallons-only sheet: keep the miles already on the report
          const byCode = {};
          const order = [];
          r.rows.forEach((row) => { byCode[row.jurisdiction] = { ...row }; order.push(row.jurisdiction); });
          Object.entries(gallons).forEach(([code, g]) => { if (!byCode[code]) { byCode[code] = { jurisdiction: code, miles: "", gallons: "" }; order.push(code); } byCode[code].gallons = Math.round(g * 100) / 100; });
          return { ...r, rows: order.map((c) => byCode[c]) };
        });
        setImportNote(`Imported ${Object.keys(mIdx >= 0 ? miles : gallons).length} states${mIdx >= 0 && gIdx >= 0 ? " (miles and gallons)" : mIdx >= 0 ? " (miles)" : " (gallons)"}.`);
      } catch {
        setImportError("Couldn't read that file — make sure it's .xlsx, .xls, or .csv.");
      }
    };
    reader.readAsArrayBuffer(file);
  }

  async function handleSave() {
    const saved = await saveIftaReport({ ...report, id: activeReportId });
    setActiveReportId(saved.id);
    setMode("history");
  }

  const driverHistorySorted = [...iftaReports]
    .filter((r) => histTruckFilter === "ALL" || r.truck === histTruckFilter)
    .filter((r) => !histQuarterFilter || r.quarter === histQuarterFilter)
    .filter((r) => !histYearFilter || r.year === histYearFilter)
    .sort((a, b) => (b.year - a.year) || (b.quarter - a.quarter) || (b.savedAt || "").localeCompare(a.savedAt || ""));

  if (viewingReport) {
    const vt = computeIftaTotals(viewingReport.rows, iftaRates);
    return (
      <div>
        <button type="button" className="back-btn no-print" onClick={() => setViewingReport(null)}><ChevronLeft size={18} /> IFTA Reports</button>
        <div className="print-area stub-sheet">
          <div className="stub-header2">
            <div className="stub-header2-top">
              <div className="stub-brand">
                {companyInfo && companyInfo.companyLogoDataUri && <img src={companyInfo.companyLogoDataUri} alt="Company logo" className="stub-logo2-fixed" />}
                <div className="stub-brand-text">
                  {companyInfo && companyInfo.companyName ? <div className="stub-company2">{companyInfo.companyName}</div> : null}
                  {companyInfo && companyInfo.companyAddress ? <div className="stub-company2-line">{companyInfo.companyAddress}</div> : null}
                  {companyInfo && (companyInfo.dotNumber || companyInfo.companyEmail) ? (
                    <div className="stub-company2-line">{[companyInfo.dotNumber ? `DOT ${companyInfo.dotNumber}` : "", companyInfo.companyEmail].filter(Boolean).join(" · ")}</div>
                  ) : null}
                </div>
              </div>
              <div className="stub-meta2">
                <div className="stub-meta2-num">Q{viewingReport.quarter} {viewingReport.year}</div>
                <div className="stub-meta2-line">{viewingReport.truck === "ALL" ? allTrucksLabel(viewingReport) : `Truck ${viewingReport.truck}`}</div>
              </div>
            </div>
            <div className="stub-title-row">
              <div className="stub-title2">IFTA Fuel Tax Report</div>
              <div className="stub-driver2">{vt.netTotal >= 0 ? `Owe ${money(vt.netTotal)}` : `Credit ${money(Math.abs(vt.netTotal))}`}</div>
            </div>
          </div>
          <table className="stub-table">
            <thead><tr><th>Jur.</th><th style={{ textAlign: "right" }}>Miles</th><th style={{ textAlign: "right" }}>Gallons</th><th style={{ textAlign: "right" }}>Rate</th><th style={{ textAlign: "right" }}>Taxable Gal</th><th style={{ textAlign: "right" }}>Net</th></tr></thead>
            <tbody>
              {vt.perRow.map((r) => (
                <tr key={r.jurisdiction}>
                  <td>{r.jurisdiction}</td>
                  <td style={{ textAlign: "right" }}>{Math.round(num(r.miles)).toLocaleString()}</td>
                  <td style={{ textAlign: "right" }}>{num(r.gallons).toFixed(1)}</td>
                  <td style={{ textAlign: "right" }}>${r.rate.toFixed(4)}</td>
                  <td style={{ textAlign: "right" }}>{r.taxableGallons.toFixed(1)}</td>
                  <td style={{ textAlign: "right", color: r.net >= 0 ? "#A8442F" : "#1F7A4C" }}>{money(r.net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="stub-summary">
            <table>
              <tbody>
                <tr><td>Total Miles</td><td style={{ textAlign: "right" }}>{Math.round(vt.totalMiles).toLocaleString()}</td></tr>
                <tr><td>Total Gallons</td><td style={{ textAlign: "right" }}>{vt.totalGallons.toFixed(1)}</td></tr>
                <tr><td>Fleet Avg MPG</td><td style={{ textAlign: "right" }}>{vt.avgMpg.toFixed(2)}</td></tr>
                <tr><td>{vt.netTotal >= 0 ? "Tax Due" : "Tax Credit"}</td><td style={{ textAlign: "right" }}>{money(Math.abs(vt.netTotal))}</td></tr>
                {num(viewingReport.filingFee) > 0 && <tr><td>Filing Fee</td><td style={{ textAlign: "right" }}>{money(num(viewingReport.filingFee))}</td></tr>}
                <tr className="net-row"><td>{(vt.netTotal + num(viewingReport.filingFee)) >= 0 ? "Total Due" : "Total Credit"}</td><td style={{ textAlign: "right" }}>{money(Math.abs(vt.netTotal + num(viewingReport.filingFee)))}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <button className="btn no-print" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={() => generatePdf(iftaFilename(viewingReport))}><Printer size={16} /> Download PDF</button>
        <button className="btn danger no-print" onClick={() => askConfirm("Delete this saved IFTA report? This can't be undone.", () => { deleteIftaReport(viewingReport.id); setViewingReport(null); })}>Delete This Report</button>
      </div>
    );
  }

  return (
    <div>
      <button type="button" className="back-btn no-print" onClick={() => setFleetView("menu")}><ChevronLeft size={18} /> Fleet</button>
      <div className="section-label" style={{ marginTop: 0 }}>IFTA Calculator</div>

      <div className="driver-subnav">
        <button className={`driver-subnav-btn ${mode === "build" ? "active" : ""}`} onClick={startNewReport}>New / Edit Report</button>
        <button className={`driver-subnav-btn ${mode === "history" ? "active" : ""}`} onClick={() => setMode("history")}>Saved Reports</button>
        <button className={`driver-subnav-btn ${mode === "fuel" ? "active" : ""}`} onClick={() => setMode("fuel")}>Fuel Report</button>
      </div>

      {mode === "fuel" && <FuelReportSection {...{ fuelReports, saveFuelReport, deleteFuelReport, askConfirm }} />}

      {mode === "history" && (
        <div>
          <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            <FilterCard
              icon={Truck} label="Truck" value={histTruckFilter} onChange={setHistTruckFilter} compact
              options={[{ value: "ALL", label: "All Trucks", shortLabel: "All" }, ...truckNumbers.map((t) => ({ value: t, label: t }))]}
            />
            <FilterCard
              icon={Calendar} label="Quarter" value={histQuarterFilter} onChange={(v) => setHistQuarterFilter(Number(v))} compact
              options={[{ value: 0, label: "All Quarters", shortLabel: "All" }, { value: 1, label: "Q1" }, { value: 2, label: "Q2" }, { value: 3, label: "Q3" }, { value: 4, label: "Q4" }]}
            />
            <FilterCard
              icon={Calendar} label="Year" value={histYearFilter} onChange={(v) => setHistYearFilter(Number(v))} compact
              options={[{ value: 0, label: "All Years", shortLabel: "All" }, ...histYears.map((y) => ({ value: y, label: String(y) }))]}
            />
          </div>
          {driverHistorySorted.length === 0 && <div className="empty-state">No saved IFTA reports match these filters.</div>}
          {driverHistorySorted.map((r) => {
            const rt = computeIftaTotals(r.rows, iftaRates);
            const rGrand = rt.netTotal + num(r.filingFee);
            return (
              <div className="statement-card" key={r.id} onClick={() => setViewingReport(r)}>
                <div className="statement-card-date" style={{ marginBottom: 6 }}>Q{r.quarter} {r.year} — {r.truck === "ALL" ? allTrucksLabel(r) : `Truck ${r.truck}`}</div>
                <div className="statement-card-row">
                  <span>{r.rows.length} jurisdiction{r.rows.length === 1 ? "" : "s"}</span>
                  <span className="statement-card-amt" style={{ color: rGrand >= 0 ? "var(--red)" : "var(--green)" }}>
                    {rGrand >= 0 ? `Owe ${money(rGrand)}` : `Credit ${money(Math.abs(rGrand))}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {mode === "build" && (
        <>
          <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            <FilterCard
              icon={Truck} label="Truck" value={report.truck} onChange={(v) => setReport({ ...report, truck: v })} compact
              options={[{ value: "ALL", label: "All Trucks (Combined)", shortLabel: "All" }, ...truckNumbers.map((t) => ({ value: t, label: t }))]}
            />
            <FilterCard
              icon={Calendar} label="Quarter" value={report.quarter} onChange={(v) => setReport({ ...report, quarter: Number(v) })} compact
              options={[
                { value: 1, label: "Q1 (Jan–Mar)", shortLabel: "Q1" },
                { value: 2, label: "Q2 (Apr–Jun)", shortLabel: "Q2" },
                { value: 3, label: "Q3 (Jul–Sep)", shortLabel: "Q3" },
                { value: 4, label: "Q4 (Oct–Dec)", shortLabel: "Q4" },
              ]}
            />
            <FilterCard
              icon={Calendar} label="Year" value={report.year} onChange={(v) => setReport({ ...report, year: Number(v) })} compact
              options={(() => { const y = new Date().getFullYear(); const arr = []; for (let i = y + 1; i >= y - 3; i--) arr.push({ value: i, label: String(i) }); return arr; })()}
            />
          </div>

          {report.truck === "ALL" && truckNumbers.length > 0 && (
            <div className="settings-card" style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 12.5, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 4 }}>Exclude Trucks</div>
              <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 10, lineHeight: 1.5 }}>
                Tap owner-operator trucks to leave them out of this All Trucks filing — you can file them separately.
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {truckNumbers.map((t) => {
                  const off = (report.excludedTrucks || []).includes(t);
                  return (
                    <button key={t} type="button" className={`favorite-chip exclude-chip ${off ? "excluded" : ""}`} onClick={() => toggleExcludedTruck(t)}>
                      {off ? "✕" : "✓"} {t}
                    </button>
                  );
                })}
              </div>
              {(report.excludedTrucks || []).length > 0 && (
                <div style={{ fontSize: 11.5, marginTop: 10, fontWeight: 600, color: "var(--text)" }}>
                  Filing {truckNumbers.length - report.excludedTrucks.filter((t) => truckNumbers.includes(t)).length} of {truckNumbers.length} trucks · excluded {report.excludedTrucks.join(", ")}
                </div>
              )}
              {exclusionsStale && (
                <div style={{ fontSize: 11.5, marginTop: 8, fontWeight: 600, color: "var(--accent)" }}>
                  Exclusions changed — upload ELD miles and fill gallons again to update the numbers.
                </div>
              )}
            </div>
          )}

          <div className="section-label-row">
            <div className="section-label">Jurisdictions</div>
            <button type="button" className="add-trip-btn" onClick={() => setShowFavorites((v) => !v)}>★ Favorites</button>
          </div>

          {showFavorites && (
            <div className="settings-card" style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 10, lineHeight: 1.5 }}>
                Star the states you run regularly — they'll be added automatically as rows every time you start a new report.
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {IFTA_JURISDICTIONS.map((j) => (
                  <button
                    key={j} type="button"
                    className={`favorite-chip ${favoriteJurisdictions.includes(j) ? "active" : ""}`}
                    onClick={() => toggleFavoriteJurisdiction(j)}
                  >
                    {favoriteJurisdictions.includes(j) ? "★" : "☆"} {j}
                  </button>
                ))}
              </div>
            </div>
          )}

          <input type="file" accept=".xlsx,.xls,.csv" ref={fileRef} style={{ display: "none" }} onChange={handleFile} />
          <button type="button" className="import-btn" onClick={() => fileRef.current && fileRef.current.click()}><UploadCloud size={14} /> Upload ELD Miles or Sheet</button>
          <button type="button" className="import-btn" onClick={fillGallonsFromTcs}><Fuel size={14} /> Fill Gallons from TCS Fuel Report</button>
          <button type="button" className="import-btn gps" onClick={loadGpsMiles}><MapPin size={14} /> Fill Miles from TruxFlow GPS</button>
          {gpsMiles && (
            <div className="settings-card gps-miles-card">
              {gpsMiles.loading ? <div className="gps-miles-note">Adding up GPS miles…</div> : (
                <>
                  <div className="gps-miles-title">TruxFlow GPS miles · {gpsMiles.label} · {gpsMiles.who}</div>
                  {!gpsMiles.rows.length ? (
                    <div className="gps-miles-note">No GPS miles recorded for {gpsMiles.label} yet. Miles are recorded while drivers share Live Location in Telegram.</div>
                  ) : (
                    <>
                      <div className="gps-miles-table">
                        <div className="gps-miles-row head"><span>State</span><span>GPS miles</span><span>Gap est.</span></div>
                        {gpsMiles.rows.map((r) => (
                          <div key={r.code} className={`gps-miles-row ${r.ifta ? "" : "off"}`}>
                            <span>{r.code}{r.ifta ? "" : " (not IFTA)"}</span><span>{Math.round(r.miles).toLocaleString()}</span><span>{r.gap >= 0.5 ? `+${Math.round(r.gap).toLocaleString()}` : "—"}</span>
                          </div>
                        ))}
                        <div className="gps-miles-row total">
                          <span>Total</span>
                          <span>{Math.round(gpsMiles.rows.filter((r) => r.ifta).reduce((a, r) => a + r.miles, 0)).toLocaleString()}</span>
                          <span>{(() => { const g = gpsMiles.rows.filter((r) => r.ifta).reduce((a, r) => a + r.gap, 0); return g >= 0.5 ? `+${Math.round(g).toLocaleString()}` : "—"; })()}</span>
                        </div>
                      </div>
                      <div className="gps-miles-note">
                        GPS covered {gpsMiles.coverage.map((c) => `Truck ${c.truck}: ${c.days} of ${gpsMiles.quarterDays} days`).join(" · ")}.
                        {gpsMiles.coverage.some((c) => c.days < gpsMiles.quarterDays) && " Days without live GPS aren't counted — use ELD miles for those, or check the trucks were tracked all quarter."}
                      </div>
                      {gpsMiles.rows.some((r) => r.gap >= 0.5) && (
                        <label className="gps-miles-check"><input type="checkbox" checked={gpsGaps} onChange={(e) => setGpsGaps(e.target.checked)} /> Include gap estimates (straight-line miles where GPS dropped for 30+ min)</label>
                      )}
                    </>
                  )}
                  <div className="gps-miles-actions">
                    {gpsMiles.rows.length > 0 && <button type="button" className="btn" onClick={applyGpsMiles}>Use these miles</button>}
                    <button type="button" className="btn secondary" onClick={() => setGpsMiles(null)}>Cancel</button>
                  </div>
                </>
              )}
            </div>
          )}
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: -10, marginBottom: 10, lineHeight: 1.5 }}>
            Pick the truck, quarter and year first. Get miles from your Lucid ELD export (or any sheet with State + Miles) or from TruxFlow's own GPS, then fill gallons from the saved TCS fuel report for the same quarter. Each step leaves the other's numbers alone.
          </div>
          {importError && <div style={{ fontSize: 11, color: "var(--red)", marginTop: -4, marginBottom: 14 }}>{importError}</div>}
          {importNote && !importError && <div style={{ fontSize: 11.5, color: "var(--green)", marginTop: -4, marginBottom: 14, fontWeight: 600 }}>{importNote}</div>}

          <div className="ifta-table">
            <div className="ifta-table-header">
              <span>State</span><span>Miles</span><span>Gallons</span><span></span>
            </div>
            {report.rows.length === 0 && <div className="empty-state">No jurisdictions yet — pick one below, or upload a sheet.</div>}
            {report.rows.map((row) => (
              <div className="ifta-row" key={row.jurisdiction}>
                <span className="ifta-row-state">
                  <span className="code">{row.jurisdiction}</span>
                  <span className="rate">${num(iftaRates[row.jurisdiction] || 0).toFixed(3)}</span>
                </span>
                <input type="number" value={row.miles} onChange={(e) => updateRow(row.jurisdiction, { miles: e.target.value })} placeholder="0" />
                <input type="number" step="0.1" value={row.gallons} onChange={(e) => updateRow(row.jurisdiction, { gallons: e.target.value })} placeholder="0.0" />
                <button type="button" className="mini-icon-btn" onClick={() => removeRow(row.jurisdiction)}><X size={14} /></button>
              </div>
            ))}
            <div className="ifta-row ifta-row-add">
              <select value="" onChange={(e) => addRow(e.target.value)} style={{ fontFamily: "Inter" }}>
                <option value="">+ Add jurisdiction…</option>
                {availableJurisdictions.map((j) => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>
          </div>

          <div className="field-row" style={{ marginTop: 6 }}>
            <div className="field">
              <label>Filing Fee ($, optional)</label>
              <input type="number" step="0.01" value={report.filingFee} onChange={(e) => setReport({ ...report, filingFee: e.target.value })} placeholder="0.00" />
            </div>
          </div>

          <div className="pay-summary-box">
            <div className="pay-summary-row"><span>Total Miles</span><span>{Math.round(totals.totalMiles).toLocaleString()}</span></div>
            <div className="pay-summary-row"><span>Total Gallons</span><span>{totals.totalGallons.toFixed(1)}</span></div>
            <div className="pay-summary-row"><span>Fleet Avg MPG</span><span>{totals.avgMpg.toFixed(2)}</span></div>
            <div className="pay-summary-row"><span>{totals.netTotal >= 0 ? "Tax Due" : "Tax Credit"}</span><span style={{ color: totals.netTotal >= 0 ? "var(--red)" : "var(--green)" }}>{money(Math.abs(totals.netTotal))}</span></div>
            {num(report.filingFee) > 0 && <div className="pay-summary-row"><span>Filing Fee</span><span>{money(num(report.filingFee))}</span></div>}
            <div className="pay-summary-row net">
              <span>{grandTotal >= 0 ? "Total Due" : "Total Credit"}</span>
              <span style={{ color: grandTotal >= 0 ? "var(--red)" : "var(--green)" }}>{money(Math.abs(grandTotal))}</span>
            </div>
          </div>

          <button className="btn" disabled={report.rows.length === 0} onClick={handleSave}>Save Report</button>

          <button type="button" className="btn ghost" style={{ marginTop: 16 }} onClick={() => setShowRates((v) => !v)}>
            {showRates ? "Hide" : "Show"} Tax Rate Table
          </button>
          {showRates && (
            <div className="settings-card" style={{ marginTop: 12 }}>
              <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 12, lineHeight: 1.5 }}>
                Starting defaults only, sourced for Q2 2026 — IFTA rates change every quarter. <strong style={{ color: "var(--text)" }}>Always verify against the official IFTA Inc. rate matrix (iftach.org) before filing.</strong> Oregon is $0 on purpose — OR uses a weight-mile tax instead of a per-gallon fuel tax.
              </div>
              {IFTA_JURISDICTIONS.map((j) => (
                <div className="field-row" key={j} style={{ marginBottom: 8 }}>
                  <div className="field" style={{ flex: "0 0 60px" }}><label style={{ marginBottom: 0 }}>{j}</label></div>
                  <div className="field">
                    <input type="number" step="0.001" value={iftaRates[j] ?? 0} onChange={(e) => saveIftaRates({ [j]: num(e.target.value) })} placeholder="0.000" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ---- Filing reminders (push notifications) ----
// Public half of the push key pair; the private half lives only in the
// server's vault. Safe to be public by design.
const VAPID_PUBLIC_KEY = "BO4KyVO_luYerwHJ5QHwbmG1OQXz65PSQ0SzTTUjxR1cXuAOl6TrMol89kxsATsSe-bIARorW1k3iVcLIOkDbLY";
function urlB64ToUint8Array(b64) {
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}
// This device's notification state: checking | on | off | blocked | unsupported | needs-install
function usePushStatus() {
  const [status, setStatus] = useState("checking");
  useEffect(() => {
    const hasBackend = typeof sb !== "undefined";
    const supported = typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
    const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const standalone = typeof window !== "undefined" && ((window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone === true);
    if (!hasBackend) { setStatus("unsupported"); return; }
    if (isIOS && !standalone) { setStatus("needs-install"); return; }
    if (!supported) { setStatus("unsupported"); return; }
    if (Notification.permission === "denied") { setStatus("blocked"); return; }
    navigator.serviceWorker.ready
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => setStatus(sub ? "on" : "off"))
      .catch(() => setStatus("off"));
  }, []);
  return [status, setStatus];
}
const PUSH_STATUS_TEXT = { checking: "Checking…", on: "On", off: "Off", blocked: "Blocked", unsupported: "Not available", "needs-install": "Needs Home Screen" };

function NotificationsSection() {
  const [status, setStatus] = usePushStatus();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgErr, setMsgErr] = useState(false);

  function note(text, isErr) { setMsg(text); setMsgErr(!!isErr); }

  async function turnOn() {
    setBusy(true); note("");
    try {
      // Must be the first await so iOS treats it as part of the tap.
      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        setStatus(perm === "denied" ? "blocked" : "off");
        note("Notifications weren't allowed.", true);
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      let sub = await reg.pushManager.getSubscription();
      if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY) });
      const j = sub.toJSON();
      const { error } = await sb.from("push_subscriptions").upsert({
        user_id: currentUserId, team_id: currentTeamId,
        endpoint: j.endpoint, p256dh: j.keys.p256dh, auth: j.keys.auth,
        user_agent: (navigator.userAgent || "").slice(0, 200),
      }, { onConflict: "endpoint" });
      if (error) throw error;
      setStatus("on");
      note("Notifications are on for this device.");
    } catch (e) {
      note("Couldn't turn on notifications: " + ((e && e.message) || e), true);
    } finally { setBusy(false); }
  }

  async function turnOff() {
    setBusy(true); note("");
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await sb.from("push_subscriptions").delete().eq("endpoint", sub.endpoint);
        await sub.unsubscribe();
      }
      setStatus("off");
      note("Notifications are off for this device.");
    } catch (e) {
      note("Couldn't turn off notifications: " + ((e && e.message) || e), true);
    } finally { setBusy(false); }
  }

  async function sendTest() {
    setBusy(true); note("");
    try {
      const { data, error } = await sb.functions.invoke("push-reminders", { body: { mode: "test" } });
      if (error) throw error;
      if (data && data.sent > 0) note("Test sent — it should arrive in a few seconds.");
      else note("The test didn't reach this device. Try turning notifications off and on again.", true);
    } catch (e) {
      note("Couldn't send a test: " + ((e && e.message) || e), true);
    } finally { setBusy(false); }
  }

  return (
    <div>
      <div className="set-group">
        <div className="set-row">
          <span className="set-icon"><Bell size={16} color="#1A1300" /></span>
          <span className="set-label">This device</span>
          <span className={`set-pill ${status === "on" ? "on" : status === "checking" ? "" : "off"}`}>{PUSH_STATUS_TEXT[status]}</span>
        </div>
      </div>
      <div className="set-note">
        New support messages from your team, plus filing reminders at 9 AM: Oregon permit on the 15th, 25th and last day of the month (stops once marked filed), and IFTA 2 weeks, 3 days and on the due date.
      </div>
      {status === "needs-install" && (
        <div style={{ fontSize: 12.5, color: "var(--text)", lineHeight: 1.5 }}>
          On iPhone, notifications only work from the Home Screen app. In Safari tap Share → Add to Home Screen, open TruxFlow from there, then come back to this screen.
        </div>
      )}
      {status === "blocked" && (
        <div style={{ fontSize: 12.5, color: "var(--text)", lineHeight: 1.5 }}>
          Notifications are blocked for TruxFlow. Turn them on in your phone's Settings → Notifications → TruxFlow, then reopen the app.
        </div>
      )}
      {status === "unsupported" && (
        <div style={{ fontSize: 12.5, color: "var(--text-dim)", lineHeight: 1.5 }}>Notifications aren't available here.</div>
      )}
      {status === "off" && (
        <button type="button" className="btn" style={{ marginTop: 0 }} disabled={busy} onClick={turnOn}>{busy ? "Turning on…" : "Turn On Notifications"}</button>
      )}
      {status === "on" && (
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" className="btn set-btn" style={{ marginTop: 0, flex: 1 }} disabled={busy} onClick={sendTest}><Send size={15} /> Send Test</button>
          <button type="button" className="btn secondary set-btn" style={{ marginTop: 0, flex: 1 }} disabled={busy} onClick={turnOff}><X size={15} /> Turn Off</button>
        </div>
      )}
      {msg && <div style={{ fontSize: 12, marginTop: 8, color: msgErr ? "var(--red)" : "var(--green)" }}>{msg}</div>}
    </div>
  );
}

function SettingsTab({ onBack, settings, saveStartingNumber, nextLoadNumber, saveSettings, askConfirm }) {
  const [editing, setEditing] = useState(false);
  const [panel, setPanel] = useState(null); // null | notifications | backup
  const [pushStatus] = usePushStatus();
  const [startingNumberInput, setStartingNumberInput] = useState(String(settings.startingLoadNumber ?? ""));
  const [startingNumberSaved, setStartingNumberSaved] = useState(false);
  const [orRateInput, setOrRateInput] = useState(String(settings.oregonPermitRate ?? 0.251));
  const [orRateSaved, setOrRateSaved] = useState(false);
  const [cancelAmtInput, setCancelAmtInput] = useState(String(settings.cancellationAmount ?? 150));
  const [cancelAmtSaved, setCancelAmtSaved] = useState(false);
  const [routeKeyInput, setRouteKeyInput] = useState(settings.routingApiKey || "");
  const [routeKeyMsg, setRouteKeyMsg] = useState("");
  const [backupState, setBackupState] = useState("idle"); // idle | working | done | error
  const [importState, setImportState] = useState("idle"); // idle | working | done | error
  const [importError, setImportError] = useState("");
  const importInputRef = useRef(null);
  const [pinCurrent, setPinCurrent] = useState("");
  const [pinNew, setPinNew] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [pinMsg, setPinMsg] = useState("");
  const [pinMsgIsError, setPinMsgIsError] = useState(false);

  function startEditing() {
    setStartingNumberInput(String(settings.startingLoadNumber ?? ""));
    setOrRateInput(String(settings.oregonPermitRate ?? 0.251));
    setCancelAmtInput(String(settings.cancellationAmount ?? 150));
    setRouteKeyInput(settings.routingApiKey || "");
    setRouteKeyMsg("");
    setPinCurrent(""); setPinNew(""); setPinConfirm(""); setPinMsg("");
    setEditing(true);
  }

  async function handleSavePin(e) {
    e.preventDefault();
    setPinMsg(""); setPinMsgIsError(false);
    const hasExisting = !!settings.pinCode;
    if (hasExisting && pinCurrent !== settings.pinCode) {
      setPinMsg("Current PIN is incorrect."); setPinMsgIsError(true); return;
    }
    if (!/^\d{4}$/.test(pinNew)) {
      setPinMsg("New PIN must be exactly 4 digits."); setPinMsgIsError(true); return;
    }
    if (pinNew !== pinConfirm) {
      setPinMsg("New PIN and confirmation don't match."); setPinMsgIsError(true); return;
    }
    await saveSettings({ pinCode: pinNew });
    setPinCurrent(""); setPinNew(""); setPinConfirm("");
    setPinMsg("PIN saved."); setPinMsgIsError(false);
  }
  async function handleRemovePin() {
    if (settings.pinCode && pinCurrent !== settings.pinCode) {
      setPinMsg("Enter your current PIN to remove it."); setPinMsgIsError(true); return;
    }
    await saveSettings({ pinCode: "" });
    setPinCurrent(""); setPinNew(""); setPinConfirm("");
    setPinMsg("PIN removed — Dash tab is now unlocked."); setPinMsgIsError(false);
  }

  async function handleExportBackup() {
    setBackupState("working");
    try {
      const keys = ["loads", "trucks", "drivers", "billTos", "shippers", "receivers", "tripExpenses", "payStubHistory", "settings", "iftaReports", "iftaRates", "iftaFavorites", "dispatchers", "dispatcherPayStubHistory", "fuelReports", "etaBoard"];
      const data = { exportedAt: new Date().toISOString(), app: "TruxFlow" };
      for (const k of keys) {
        try { const r = await window.storage.get(k); data[k] = JSON.parse(r.value); }
        catch { data[k] = null; }
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `truxflow-backup-${todayISO()}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setBackupState("done");
      setTimeout(() => setBackupState("idle"), 1800);
    } catch (e) {
      console.error(e);
      setBackupState("error");
      setTimeout(() => setBackupState("idle"), 2200);
    }
  }

  function handleImportFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setImportError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      let parsed;
      try { parsed = JSON.parse(ev.target.result); }
      catch { setImportError("That doesn't look like a valid backup file."); setImportState("error"); setTimeout(() => setImportState("idle"), 2200); return; }
      askConfirm(
        "This will replace all current loads, trips, drivers, and other data with what's in this backup file. This can't be undone.",
        () => runImport(parsed),
        { title: "Restore from Backup?", confirmLabel: "Restore", dangerous: true }
      );
    };
    reader.onerror = () => { setImportError("Couldn't read that file."); setImportState("error"); setTimeout(() => setImportState("idle"), 2200); };
    reader.readAsText(file);
  }

  async function runImport(parsed) {
    setImportState("working");
    try {
      const keys = ["loads", "trucks", "drivers", "billTos", "shippers", "receivers", "tripExpenses", "payStubHistory", "settings", "iftaReports", "iftaRates", "iftaFavorites", "dispatchers", "dispatcherPayStubHistory", "fuelReports", "etaBoard"];
      for (const k of keys) {
        if (parsed[k] !== undefined && parsed[k] !== null) {
          await window.storage.set(k, JSON.stringify(parsed[k]));
        }
      }
      setImportState("done");
      setTimeout(() => window.location.reload(), 1200);
    } catch (e) {
      console.error(e);
      setImportError("Something went wrong restoring the backup.");
      setImportState("error");
      setTimeout(() => setImportState("idle"), 2600);
    }
  }



  if (panel) {
    const titles = { notifications: ["Notifications", Bell], backup: ["Backup & Restore", Download] };
    const [title, PanelIcon] = titles[panel];
    return (
      <div className="account-modal-body">
        <button type="button" className="set-back" onClick={() => setPanel(null)}><ChevronLeft size={16} /> Settings</button>
        <div className="set-panel-title"><span className="set-icon lg"><PanelIcon size={18} color="#1A1300" /></span>{title}</div>
        {panel === "notifications" && <NotificationsSection />}
        {panel === "backup" && (
        <div className="set-group set-pad">
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 12, lineHeight: 1.5 }}>
            Downloads everything — loads, trips, drivers, pay stub history, and settings — as a single file you can save anywhere.
          </div>
          <button className="btn set-btn" style={{ marginTop: 0 }} onClick={handleExportBackup} disabled={backupState === "working"}>
            {backupState === "working" ? "Preparing…" : backupState === "done" ? "Downloaded ✓" : backupState === "error" ? "Something went wrong — try again" : "Export Backup"}
          </button>

          <div style={{ height: 1, background: "var(--border)", margin: "16px 0 14px" }} />
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 12, lineHeight: 1.5 }}>
            Restore from a previously exported backup file. This replaces your current data — the app will reload once it's done.
          </div>
          <input type="file" accept=".json,application/json" ref={importInputRef} style={{ display: "none" }} onChange={handleImportFile} />
          <button className="btn danger" style={{ marginTop: 0 }} onClick={() => importInputRef.current && importInputRef.current.click()} disabled={importState === "working"}>
            {importState === "working" ? "Restoring…" : importState === "done" ? "Restored ✓ Reloading…" : importState === "error" ? "Something went wrong — try again" : "Import Backup"}
          </button>
          {importError && <div style={{ fontSize: 11, color: "var(--red)", marginTop: 8 }}>{importError}</div>}
        </div>
        )}
      </div>
    );
  }

  if (!editing) {
    const now = new Date();
    const currentDispatcherPct = resolveScheduledPercent(settings.dispatcherPaySchedule, now.getFullYear(), now.getMonth() + 1, DEFAULT_DISPATCHER_PAY);
    const Row = ({ icon: Ico, label, value, sub }) => (
      <div className="set-row">
        <span className="set-icon"><Ico size={16} color="#1A1300" /></span>
        <span className="set-label">{label}{sub ? <span className="set-sub">{sub}</span> : null}</span>
        <span className="set-value">{value}</span>
      </div>
    );
    const NavRow = ({ icon: Ico, label, pill, pillOn, onClick }) => (
      <button type="button" className="set-row nav" onClick={onClick}>
        <span className="set-icon"><Ico size={16} color="#1A1300" /></span>
        <span className="set-label">{label}</span>
        {pill && <span className={`set-pill ${pillOn ? "on" : "off"}`}>{pill}</span>}
        <span className="sidebar-pill-chevron set-chev"><ChevronRight size={16} /></span>
      </button>
    );
    return (
      <div className="account-modal-body">
        <button type="button" className="btn set-edit-top" onClick={startEditing}><Pencil size={15} /> Edit Settings</button>

        <div className="set-group-label">Loads &amp; Pay</div>
        <div className="set-group">
          <Row icon={Hash} label="Starting Load Number" sub={`Next: #${nextLoadNumber}`} value={settings.startingLoadNumber ?? 1000} />
          <Row icon={DollarSign} label="Cancellation Amount" value={money(settings.cancellationAmount ?? 150)} />
          <Row icon={Percent} label="Dispatcher Pay" sub="Monthly summary only" value={`${currentDispatcherPct}%`} />
          <Row icon={MapPin} label="Oregon Permit Rate" value={`$${(settings.oregonPermitRate ?? 0.251).toFixed(3)}/mi`} />
        </div>

        <div className="set-group-label">Map &amp; Security</div>
        <div className="set-group">
          <Row icon={Truck} label="Map Truck Routes" sub={settings.routingApiKey ? "Geoapify" : "Straight lines"} value={<span className={`set-pill ${settings.routingApiKey ? "on" : "off"}`}>{settings.routingApiKey ? "On" : "Off"}</span>} />
          <Row icon={Lock} label="Dash Tab PIN Lock" value={<span className={`set-pill ${settings.pinCode ? "on" : "off"}`}>{settings.pinCode ? "On" : "Off"}</span>} />
        </div>

        <div className="set-group-label">Device &amp; Data</div>
        <div className="set-group">
          <NavRow icon={Bell} label="Notifications" pill={pushStatus === "checking" ? "" : PUSH_STATUS_TEXT[pushStatus]} pillOn={pushStatus === "on"} onClick={() => setPanel("notifications")} />
          <NavRow icon={Download} label="Backup & Restore" onClick={() => setPanel("backup")} />
        </div>
      </div>
    );
  }

  return (
    <div className="account-modal-body">
      <button type="button" className="set-back" onClick={() => setEditing(false)}><ChevronLeft size={16} /> Settings</button>
      <div className="settings-card">
        <div className="field">
          <label>Starting Load Number</label>
          <input
            type="number"
            value={startingNumberInput}
            onChange={(e) => setStartingNumberInput(e.target.value)}
            onBlur={async () => {
              await saveStartingNumber(startingNumberInput);
              setStartingNumberInput(String(num(startingNumberInput) || 1000));
              setStartingNumberSaved(true);
              setTimeout(() => setStartingNumberSaved(false), 1400);
            }}
          />
        </div>
        <div style={{ fontSize: 11, color: startingNumberSaved ? "var(--green)" : "var(--text-dim)", marginTop: 8 }}>
          {startingNumberSaved ? "Saved ✓ — " : ""}New loads auto-number sequentially from here. Next load will be #{nextLoadNumber}.
        </div>
      </div>

      <div className="settings-card">
        <div className="field">
          <label>Oregon Permit Rate ($/mile)</label>
          <input
            type="number"
            step="0.001"
            value={orRateInput}
            onChange={(e) => setOrRateInput(e.target.value)}
            onBlur={async () => {
              const clean = num(orRateInput) || 0.251;
              await saveSettings({ oregonPermitRate: clean });
              setOrRateInput(String(clean));
              setOrRateSaved(true);
              setTimeout(() => setOrRateSaved(false), 1400);
            }}
          />
        </div>
        <div style={{ fontSize: 11, color: orRateSaved ? "var(--green)" : "var(--text-dim)", marginTop: 8 }}>
          {orRateSaved ? "Saved ✓ — " : ""}Used to calculate Oregon Permit cost from Oregon Miles entered on each load. Defaults to $0.251/mile — update anytime.
        </div>
      </div>

      <div className="settings-card">
        <div className="field">
          <label>Cancellation Amount ($)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={cancelAmtInput}
            onChange={(e) => setCancelAmtInput(e.target.value)}
            onBlur={async () => {
              const clean = String(cancelAmtInput).trim() === "" ? 150 : Math.max(0, num(cancelAmtInput));
              await saveSettings({ cancellationAmount: clean });
              setCancelAmtInput(String(clean));
              setCancelAmtSaved(true);
              setTimeout(() => setCancelAmtSaved(false), 1400);
            }}
          />
        </div>
        <div style={{ fontSize: 11, color: cancelAmtSaved ? "var(--green)" : "var(--text-dim)", marginTop: 8 }}>
          {cancelAmtSaved ? "Saved ✓ — " : ""}Pre-filled each time you add a cancellation to a trip. You can still change it on any individual cancellation. Defaults to $150.
        </div>
      </div>

      <div className="settings-card">
        <div className="field">
          <label>Map Routing Key (Geoapify)</label>
          <input
            value={routeKeyInput}
            placeholder="Paste your free Geoapify API key"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            onChange={(e) => setRouteKeyInput(e.target.value)}
            onBlur={async () => {
              const key = routeKeyInput.trim();
              if (key === (settings.routingApiKey || "")) return;
              if (!key) { await saveSettings({ routingApiKey: "" }); setRouteKeyMsg("Removed — map shows straight lines."); return; }
              setRouteKeyMsg("Checking key…");
              // test with a short real route (Sacramento -> Vacaville)
              const test = await fetchTruckRoute({ start: { lat: 38.5816, lon: -121.4944 }, end: { lat: 38.3566, lon: -121.9877 } }, key);
              if (!test) { setRouteKeyMsg("That key didn't work — check it was copied fully, then try again."); return; }
              await saveSettings({ routingApiKey: key });
              setRouteKeyMsg(`Saved ✓ — key works (test route ${Math.round(test.miles || 0)} mi).`);
            }}
          />
        </div>
        <div style={{ fontSize: 11, color: routeKeyMsg.startsWith("Saved") ? "var(--green)" : routeKeyMsg.startsWith("That key") ? "var(--red)" : "var(--text-dim)", marginTop: 8, lineHeight: 1.5 }}>
          {routeKeyMsg ? `${routeKeyMsg} ` : ""}Draws real truck routes on the ETA Board map. Free at geoapify.com (no card) — sign up, create a project, and paste its API key here.
        </div>
      </div>

      <div className="settings-card">
        <label style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-dim)", fontWeight: 600, display: "block", marginBottom: 4 }}>Dispatcher Pay Percentage</label>
        <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 14, lineHeight: 1.5 }}>
          Used by the Trips monthly summary only. Dispatch Fee is no longer set here — it's assigned per driver in Fleet → Drivers, since different drivers can have different rates.
        </div>
        <PercentScheduleEditor label="Dispatcher Pay" schedule={settings.dispatcherPaySchedule} defaultValue={DEFAULT_DISPATCHER_PAY} onSave={(sched) => saveSettings({ dispatcherPaySchedule: sched })} />
      </div>

      <div className="settings-card">
        <label style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-dim)", fontWeight: 600, display: "block", marginBottom: 4 }}>Backup</label>
        <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 12, lineHeight: 1.5 }}>
          Downloads everything — loads, trips, drivers, pay stub history, and settings — as a single file you can save anywhere.
        </div>
        <button className="btn secondary" style={{ marginTop: 0 }} onClick={handleExportBackup} disabled={backupState === "working"}>
          {backupState === "working" ? "Preparing…" : backupState === "done" ? "Downloaded ✓" : backupState === "error" ? "Something went wrong — try again" : "Export Backup"}
        </button>

        <div style={{ height: 1, background: "var(--border)", margin: "16px 0 14px" }} />
        <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 12, lineHeight: 1.5 }}>
          Restore from a previously exported backup file. This replaces your current data — the app will reload once it's done.
        </div>
        <input type="file" accept=".json,application/json" ref={importInputRef} style={{ display: "none" }} onChange={handleImportFile} />
        <button className="btn danger" style={{ marginTop: 0 }} onClick={() => importInputRef.current && importInputRef.current.click()} disabled={importState === "working"}>
          {importState === "working" ? "Restoring…" : importState === "done" ? "Restored ✓ Reloading…" : importState === "error" ? "Something went wrong — try again" : "Import Backup"}
        </button>
        {importError && <div style={{ fontSize: 11, color: "var(--red)", marginTop: 8 }}>{importError}</div>}
      </div>

      <div className="settings-card">
        <label style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-dim)", fontWeight: 600, display: "block", marginBottom: 10 }}>Dash Tab PIN Lock</label>
        <div style={{ fontSize: 11.5, color: "var(--text-dim)", marginBottom: 12 }}>
          {settings.pinCode ? "PIN protection is ON for the Dash tab (Reports + Stub)." : "No PIN set — the Dash tab is open to anyone with the app."}
        </div>
        <form onSubmit={handleSavePin}>
          {settings.pinCode && (
            <div className="field-row">
              <div className="field"><label>Current PIN</label><input type="password" inputMode="numeric" maxLength={4} value={pinCurrent} onChange={(e) => setPinCurrent(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="••••" /></div>
            </div>
          )}
          <div className="field-row">
            <div className="field"><label>New PIN</label><input type="password" inputMode="numeric" maxLength={4} value={pinNew} onChange={(e) => setPinNew(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="4 digits" /></div>
            <div className="field"><label>Confirm New PIN</label><input type="password" inputMode="numeric" maxLength={4} value={pinConfirm} onChange={(e) => setPinConfirm(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="4 digits" /></div>
          </div>
          {pinMsg && <div style={{ fontSize: 11.5, color: pinMsgIsError ? "var(--red)" : "var(--green)", marginBottom: 10 }}>{pinMsg}</div>}
          <button className="btn" type="submit">{settings.pinCode ? "Update PIN" : "Set PIN"}</button>
          {settings.pinCode && <button type="button" className="btn danger" onClick={handleRemovePin}>Remove PIN</button>}
        </form>
      </div>
    </div>
  );
}

function ImportModal(p) {
  const { importTarget, importHeaders, importRows, importMapping, setImportMapping, importUpdateDupes, setImportUpdateDupes, importResult, commitImport, onClose, onPickFile } = p;
  const config = IMPORT_CONFIGS[importTarget];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div className="modal-title">Import {config.label}</div>
          <button className="icon-btn" onClick={onClose}><X size={16} /></button>
        </div>

        {importHeaders.length === 0 && !importResult && (
          <div>
            <div style={{ fontSize: 12.5, color: "var(--text-dim)", marginBottom: 16, lineHeight: 1.6 }}>
              Choose an .xlsx, .xls, or .csv file. The first row should be column headers — we'll try to match them to {config.label} fields automatically.
            </div>
            <button className="btn" onClick={onPickFile}>Choose File</button>
          </div>
        )}

        {importHeaders.length > 0 && !importResult && (
          <div>
            <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 14 }}>{importRows.length} rows found. Map spreadsheet columns to fields:</div>
            {config.fields.map((f) => (
              <div className="mapping-row" key={f.key}>
                <span className="mlabel">{f.label}{f.required ? " *" : ""}</span>
                <select style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", padding: "8px 10px", borderRadius: 8, fontSize: 13, fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}
                  value={importMapping[f.key] || ""} onChange={(e) => setImportMapping({ ...importMapping, [f.key]: e.target.value })}>
                  <option value="">— Skip —</option>
                  {importHeaders.map((h) => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            ))}
            <div className="toggle-row">
              <input type="checkbox" checked={importUpdateDupes} onChange={(e) => setImportUpdateDupes(e.target.checked)} id="dupe-toggle" />
              <label htmlFor="dupe-toggle">Update existing records with matching names (otherwise duplicates are skipped)</label>
            </div>
            <button className="btn" onClick={commitImport}>Import {importRows.length} Rows</button>
          </div>
        )}

        {importResult && !importResult.error && (
          <div>
            <div style={{ fontSize: 14, marginBottom: 6 }}>Import complete.</div>
            <div style={{ fontSize: 12.5, color: "var(--text-dim)", lineHeight: 1.8 }}>
              {importResult.added} added · {importResult.updated} updated · {importResult.skipped} skipped (duplicates or missing name)
            </div>
            <button className="btn" onClick={onClose}>Done</button>
          </div>
        )}
        {importResult && importResult.error && (
          <div>
            <div style={{ fontSize: 13, color: "var(--red)", marginBottom: 14 }}>{importResult.error}</div>
            <button className="btn secondary" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
// Supabase — cloud login + cross-device sync
// =====================================================================
const SUPABASE_URL = "https://zhxhfajlglhfoqftsvmp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoeGhmYWpsZ2xoZm9xZnRzdm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5OTEzMTYsImV4cCI6MjEwMDU2NzMxNn0.BaOVHmCgYWCSshOFhcV00P6GFjTl41EW4yZo9Imdn_k";
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---- Supabase-backed storage shim — drop-in replacement for window.storage ----
let currentUserId = null;
let currentTeamId = null;
window.storage = {
  async get(key) {
    if (!currentTeamId) throw new Error("not signed in");
    const { data, error } = await sb.from("app_data").select("value").eq("team_id", currentTeamId).eq("key", key).maybeSingle();
    if (error) throw error;
    if (!data) { const e = new Error("not found: " + key); e.notFound = true; throw e; }
    return { key, value: data.value, shared: false };
  },
  async set(key, value) {
    if (!currentTeamId) throw new Error("not signed in");
    const { error } = await sb.from("app_data").upsert(
      { user_id: currentUserId, team_id: currentTeamId, key, value, updated_at: new Date().toISOString() },
      { onConflict: "team_id,key" }
    );
    if (error) throw error;
    return { key, value, shared: false };
  },
  async delete(key) {
    if (!currentTeamId) throw new Error("not signed in");
    const { error } = await sb.from("app_data").delete().eq("team_id", currentTeamId).eq("key", key);
    if (error) throw error;
    return { key, deleted: true, shared: false };
  },
  async list(prefix) {
    if (!currentTeamId) throw new Error("not signed in");
    let query = sb.from("app_data").select("key").eq("team_id", currentTeamId);
    if (prefix) query = query.like("key", prefix + "%");
    const { data, error } = await query;
    if (error) throw error;
    return { keys: (data || []).map((r) => r.key), prefix, shared: false };
  },
};

// ---- Resolve (or create) the team the current user belongs to ----
async function resolveTeamId() {
  // A pending invite code, set at signup time, means this person is joining
  // someone else's team rather than starting their own.
  const pendingCode = localStorage.getItem("truxflow:pendingInviteCode");
  if (pendingCode) {
    try {
      const { data, error } = await sb.rpc("redeem_team_invite", { invite_code: pendingCode });
      localStorage.removeItem("truxflow:pendingInviteCode");
      if (!error && data) return data;
    } catch (e) {
      localStorage.removeItem("truxflow:pendingInviteCode");
    }
  }

  const { data: existing } = await sb.from("team_members").select("team_id").eq("user_id", currentUserId).limit(1).maybeSingle();
  if (existing && existing.team_id) return existing.team_id;

  // No team yet (shouldn't normally happen post-migration, but covers a
  // brand-new signup with no invite code) — this account becomes its own team.
  const { data: team, error: teamErr } = await sb.from("teams").insert({ owner_id: currentUserId }).select("id").single();
  if (teamErr) throw teamErr;
  await sb.from("team_members").insert({ team_id: team.id, user_id: currentUserId, role: "owner" });
  return team.id;
}

// ---- One-time migration: bring existing browser-local data along on first login ----
async function migrateLocalDataIfNeeded() {
  try {
    const LOCAL_PREFIX = "truxflow:";
    const localKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(LOCAL_PREFIX)) localKeys.push(k.slice(LOCAL_PREFIX.length));
    }
    if (localKeys.length === 0) return;
    const { data: existing } = await sb.from("app_data").select("key").eq("team_id", currentTeamId).limit(1);
    if (existing && existing.length > 0) return; // already has cloud data — don't overwrite it
    const rows = localKeys.map((k) => ({
      user_id: currentUserId,
      team_id: currentTeamId,
      key: k,
      value: localStorage.getItem(LOCAL_PREFIX + k),
      updated_at: new Date().toISOString(),
    }));
    await sb.from("app_data").upsert(rows, { onConflict: "team_id,key" });
  } catch (e) {
    console.error("migration error", e);
  }
}

// ---- Login / sign-up / forgot-password screen ----
function LoginScreen() {
  const [mode, setMode] = useState("signin"); // "signin" | "signup" | "forgot"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => { window.__truxflowReady = true; }, []); // the app started fine (start page's stuck-loading check)

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setInfo(""); setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (mode === "signup") {
        if (inviteCode.trim()) localStorage.setItem("truxflow:pendingInviteCode", inviteCode.trim().toUpperCase());
        const { error } = await sb.auth.signUp({ email, password });
        if (error) { localStorage.removeItem("truxflow:pendingInviteCode"); throw error; }
        setInfo("Account created — check your email to confirm, then sign in.");
        setMode("signin");
      } else {
        // Supabase always returns success here regardless of whether the email
        // is registered, so this can't be used to check which emails exist.
        const { error } = await sb.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + window.location.pathname,
        });
        if (error) throw error;
        setInfo("If an account exists for that email, a password reset link has been sent — check your inbox.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = { width: "100%", background: "#14181F", border: "1px solid #303A4A", color: "#E8E6E1", padding: "10px 11px", borderRadius: 8, fontSize: 14, boxSizing: "border-box" };
  const labelStyle = { fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, color: "#8A93A3", fontWeight: 600, display: "block", marginBottom: 5 };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(rgba(20,24,31,0.55), rgba(20,24,31,0.8)), url('login-bg.jpg') right/cover no-repeat", padding: 20, fontFamily: "Inter, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 360, background: "#1D2430", border: "1px solid #303A4A", borderRadius: 16, padding: 28 }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700 }}>
            <span style={{ color: "#F2A93B" }}>Trux</span><span style={{ color: "#4A90D9" }}>Flow</span>
          </div>
          <div style={{ color: "#8A93A3", fontSize: 12, marginTop: 4 }}>
            {mode === "signin" ? "Sign in to your account" : mode === "signup" ? "Create your account" : "Reset your password"}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: mode === "forgot" ? 18 : 12 }}>
            <label style={labelStyle}>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          </div>
          {mode !== "forgot" && (
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Password</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
            </div>
          )}
          {mode === "signup" && (
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Invite Code (optional)</label>
              <input type="text" placeholder="Leave blank to start your own team" value={inviteCode} onChange={(e) => setInviteCode(e.target.value)} style={inputStyle} />
            </div>
          )}
          {mode === "signin" && (
            <div style={{ textAlign: "right", marginTop: -10, marginBottom: 16 }}>
              <span style={{ color: "#8A93A3", fontSize: 12, cursor: "pointer" }} onClick={() => { setMode("forgot"); setError(""); setInfo(""); }}>Forgot password?</span>
            </div>
          )}
          {error && <div style={{ color: "#D6584F", fontSize: 12.5, marginBottom: 14 }}>{error}</div>}
          {info && <div style={{ color: "#5FA777", fontSize: 12.5, marginBottom: 14 }}>{info}</div>}
          <button type="submit" disabled={loading} style={{ width: "100%", background: "#F2A93B", color: "#1A1300", border: "none", borderRadius: 10, padding: 13, fontFamily: "'Oswald', sans-serif", fontSize: 14.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, cursor: "pointer" }}>
            {loading ? "Please wait…" : mode === "signin" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 12.5, color: "#8A93A3" }}>
          {mode === "signin" && (
            <span>Don't have an account?{" "}
              <span style={{ color: "#F2A93B", cursor: "pointer" }} onClick={() => { setMode("signup"); setError(""); setInfo(""); }}>Create one</span>
            </span>
          )}
          {mode === "signup" && (
            <span>Already have an account?{" "}
              <span style={{ color: "#F2A93B", cursor: "pointer" }} onClick={() => { setMode("signin"); setError(""); setInfo(""); }}>Sign in</span>
            </span>
          )}
          {mode === "forgot" && (
            <span>Remembered it?{" "}
              <span style={{ color: "#F2A93B", cursor: "pointer" }} onClick={() => { setMode("signin"); setError(""); setInfo(""); }}>Back to sign in</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Set-new-password screen — shown after clicking the emailed reset link ----
function ResetPasswordScreen({ onDone }) {
  useEffect(() => { window.__truxflowReady = true; }, []);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords don't match."); return; }
    setLoading(true);
    try {
      const { error } = await sb.auth.updateUser({ password });
      if (error) throw error;
      onDone();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = { width: "100%", background: "#14181F", border: "1px solid #303A4A", color: "#E8E6E1", padding: "10px 11px", borderRadius: 8, fontSize: 14, boxSizing: "border-box" };
  const labelStyle = { fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, color: "#8A93A3", fontWeight: 600, display: "block", marginBottom: 5 };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(rgba(20,24,31,0.55), rgba(20,24,31,0.8)), url('login-bg.jpg') right/cover no-repeat", padding: 20, fontFamily: "Inter, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 360, background: "#1D2430", border: "1px solid #303A4A", borderRadius: 16, padding: 28 }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700 }}>
            <span style={{ color: "#F2A93B" }}>Trux</span><span style={{ color: "#4A90D9" }}>Flow</span>
          </div>
          <div style={{ color: "#8A93A3", fontSize: 12, marginTop: 4 }}>Choose a new password</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>New Password</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Confirm Password</label>
            <input type="password" required minLength={6} value={confirm} onChange={(e) => setConfirm(e.target.value)} style={inputStyle} />
          </div>
          {error && <div style={{ color: "#D6584F", fontSize: 12.5, marginBottom: 14 }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ width: "100%", background: "#F2A93B", color: "#1A1300", border: "none", borderRadius: 10, padding: 13, fontFamily: "'Oswald', sans-serif", fontSize: 14.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, cursor: "pointer" }}>
            {loading ? "Please wait…" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---- Auth gate: decides Loading / Login / Reset / App ----
function AuthGate() {
  const [session, setSession] = useState(undefined); // undefined = loading, null = signed out
  const [ready, setReady] = useState(false);
  // An invite-email link lands here the same way a password-reset link does
  // — a valid session with no usable password set yet — so both cases show
  // the same "set your password" screen before letting them into the app.
  const [passwordRecovery, setPasswordRecovery] = useState(() => {
    const hash = window.location.hash || "";
    const search = window.location.search || "";
    return hash.includes("type=invite") || hash.includes("type=recovery") || search.includes("type=invite") || search.includes("type=recovery");
  });
  const migratedUserRef = useRef(null);

  useEffect(() => {
    sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = sb.auth.onAuthStateChange((event, newSession) => {
      if (event === "PASSWORD_RECOVERY") setPasswordRecovery(true);
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (session && session.user) {
      currentUserId = session.user.id;
      // Supabase re-checks/refreshes the session every time the browser tab
      // regains focus, firing onAuthStateChange even though nothing actually
      // changed. Only re-run migration/loading for a genuinely different user
      // — not on every routine refresh — otherwise the app silently resets.
      if (migratedUserRef.current === session.user.id) {
        setReady(true);
        return;
      }
      setReady(false);
      resolveTeamId()
        .then((teamId) => {
          currentTeamId = teamId;
          return migrateLocalDataIfNeeded();
        })
        .finally(() => {
          if (!cancelled) { migratedUserRef.current = session.user.id; setReady(true); }
        });
    } else {
      currentUserId = null;
      currentTeamId = null;
      migratedUserRef.current = null;
      setReady(false);
    }
    return () => { cancelled = true; };
  }, [session]);

  if (session === undefined) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#14181F", color: "#8A93A3", fontFamily: "Inter, sans-serif" }}>Loading…</div>;
  }
  if (!session) {
    return <LoginScreen />;
  }
  if (passwordRecovery) {
    return <ResetPasswordScreen onDone={() => setPasswordRecovery(false)} />;
  }
  if (!ready) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#14181F", color: "#8A93A3", fontFamily: "Inter, sans-serif" }}>Setting up your account…</div>;
  }
  return <DispatchApp key={session.user.id} onSignOut={() => sb.auth.signOut()} userEmail={session.user.email} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<AuthGate />);
