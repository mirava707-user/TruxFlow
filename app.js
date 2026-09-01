const { useState, useEffect, useMemo, useRef } = React;

// ---- Minimal inline icon set (replaces lucide-react for the no-build CDN version) ----
function Icon({ path, size = 18, color = "currentColor", strokeWidth = 2, children }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
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
const User = (p) => <Icon {...p}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" fill="none" /></Icon>;
const Building2 = (p) => <Icon {...p}><path d="M6 22V4a1 1 0 011-1h6a1 1 0 011 1v18M6 8h8M6 12h8M6 16h8M14 22V9h5a1 1 0 011 1v12M17 13h.01M17 17h.01" /></Icon>;
const Warehouse = (p) => <Icon {...p}><path d="M2 8l10-6 10 6v13a1 1 0 01-1 1H3a1 1 0 01-1-1V8zM6 22V12h12v10" /></Icon>;
const UploadCloud = (p) => <Icon {...p}><path d="M16 16l-4-4-4 4M12 12v9" /><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 104 16.3" fill="none" /></Icon>;
const Search = (p) => <Icon {...p}><circle cx="11" cy="11" r="8" fill="none" /><path d="M21 21l-4.35-4.35" /></Icon>;
const Calculator = (p) => <Icon {...p}><rect x="4" y="2" width="16" height="20" rx="2" fill="none" /><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" /></Icon>;
const Calendar = (p) => <Icon {...p}><rect x="3" y="4" width="18" height="18" rx="2" fill="none" /><path d="M16 2v4M8 2v4M3 10h18" /></Icon>;
const TrendingUp = (p) => <Icon {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" fill="none" /><polyline points="16 7 22 7 22 13" fill="none" /></Icon>;
const TrendingDown = (p) => <Icon {...p}><polyline points="22 17 13.5 8.5 8.5 13.5 2 7" fill="none" /><polyline points="16 17 22 17 22 11" fill="none" /></Icon>;

const LOGO_DATA_URI = "data:image/png;base64,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";
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
function annualTaxFilename(driverName, truck, year) {
  const parts = (driverName || "").trim().split(/\s+/).filter(Boolean);
  const initials = parts.map((p) => p[0]).join("").toUpperCase() || "X";
  return `${initials}${truck || "0"}T${year}`;
}
function annualTaxAllFilename(year) {
  return `AnnualTaxReportAll${year}`;
}
function todayISO() { return new Date().toISOString().slice(0, 10); }
function daysAgoISO(n) { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); }
function inRange(dateStr, start, end) { if (!dateStr) return false; return dateStr >= start && dateStr <= end; }
function overlaps(aStart, aEnd, bStart, bEnd) { return aStart <= bEnd && aEnd >= bStart; }
function uid() { return Date.now() + Math.random(); }
// Retries a couple of times before giving up, to ride out brief connection hiccups
// (missed by the previous version, which had no retry at all). Always resolves —
// never throws — since blocking the whole app on an ambiguous error is worse than
// occasionally defaulting an empty key.
async function safeGet(key, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await window.storage.get(key);
    } catch (err) {
      if (attempt === retries) return null;
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

const emptyStop = () => ({ id: null, receiverName: "", city: "", state: "", zip: "", warehouseCode: "" });
const emptyLoad = () => ({
  id: null, loadNumber: null, billTo: "", workOrder: "", rate: "",
  driver: "", truck: "", dispatcher: "",
  shipperName: "", shipperCity: "", shipperState: "", shipperZip: "", shipperWarehouseCode: "", pickupDate: "",
  stops: [{ ...emptyStop(), id: uid() }], deliveryDate: "",
  loadedMiles: "", deadheadMiles: "", orMiles: "", status: "active", paidStatus: "unpaid", paidStubId: null,
  bolDataUri: "", bolFileName: "", bolType: "",
  invoiceStage: "none", invoicedAt: null, paidAt: null, notes: "",
  dispatcherPaidStatus: "unpaid", dispatcherPaidStubId: null,
});
function normalizeLoad(load) {
  if (load.stops && load.stops.length) {
    return { paidStatus: "unpaid", paidStubId: null, bolDataUri: "", bolFileName: "", bolType: "", invoiceStage: "none", invoicedAt: null, paidAt: null, dispatcher: "", shipperWarehouseCode: "", notes: "", dispatcherPaidStatus: "unpaid", dispatcherPaidStubId: null, orMiles: "", ...load };
  }
  const stop = { id: uid(), receiverName: load.receiverName || "", city: load.receiverCity || "", state: load.receiverState || "", zip: load.receiverZip || "", warehouseCode: "" };
  return { ...load, stops: [stop], paidStatus: load.paidStatus || "unpaid", paidStubId: load.paidStubId || null, bolDataUri: load.bolDataUri || "", bolFileName: load.bolFileName || "", bolType: load.bolType || "", invoiceStage: load.invoiceStage || "none", invoicedAt: load.invoicedAt || null, paidAt: load.paidAt || null, dispatcher: load.dispatcher || "", shipperWarehouseCode: load.shipperWarehouseCode || "", notes: load.notes || "", dispatcherPaidStatus: load.dispatcherPaidStatus || "unpaid", dispatcherPaidStubId: load.dispatcherPaidStubId || null, orMiles: load.orMiles || "" };
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
        <React.Fragment key={i}>
          {" → "}{stopLabel(i, stops.length)}: <strong>{cityState(s.city, s.state) || s.receiverName || "—"}</strong>
        </React.Fragment>
      ))}
    </>
  );
}
const emptyDriver = () => ({ id: null, name: "", companyName: "", taxId: "", payType: "percent", rate: "", dispatchFeePercent: "", notes: "", active: true, truckBalance: "" });
const emptyTruck = () => ({ id: null, number: "", notes: "", active: true });
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
  return raw.map((t) => (typeof t === "string" ? { id: uid(), number: t, notes: "", active: true } : { active: true, ...t }));
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
  return { id: null, quarter: q, year: now.getFullYear(), truck: "ALL", rows: favRows, filingFee: "", savedAt: null };
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

// Bigger labeled trend chart for the Revenue Overview panel — same hand-rolled
// SVG approach, plus a light grid, axis labels, and a highlighted peak point.
function TrendChart({ data, labels, color, formatY }) {
  const width = 600, height = 220, padL = 58, padB = 22, padT = 14, padR = 10;
  const plotW = width - padL - padR, plotH = height - padT - padB;
  if (!data || data.length < 2) return <div style={{ height: 220 }} />;
  const min = 0, max = Math.max(...data) * 1.15 || 1;
  const stepX = plotW / (data.length - 1);
  const xAt = (i) => padL + i * stepX;
  const yAt = (v) => padT + plotH - ((v - min) / (max - min)) * plotH;
  const points = data.map((v, i) => [xAt(i), yAt(v)]);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const areaPath = `${path} L${points[points.length - 1][0]},${padT + plotH} L${points[0][0]},${padT + plotH} Z`;
  const peakIdx = data.indexOf(Math.max(...data));
  const gridLines = [0, 0.25, 0.5, 0.75, 1];
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {gridLines.map((g, i) => (
        <line key={i} x1={padL} x2={width - padR} y1={padT + plotH * g} y2={padT + plotH * g} stroke="var(--border)" strokeWidth="1" />
      ))}
      {gridLines.map((g, i) => (
        <text key={i} x={padL - 8} y={padT + plotH * (1 - g) + 4} fontSize="9" fill="var(--text-dim)" textAnchor="end" fontFamily="IBM Plex Mono, monospace">
          {formatY ? formatY(min + (max - min) * g) : Math.round(min + (max - min) * g)}
        </text>
      ))}
      <path d={areaPath} fill="url(#trendFill)" stroke="none" />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === peakIdx ? 4 : 2.5} fill={color} stroke="var(--surface)" strokeWidth="1.5" />
      ))}
      {labels && labels.map((l, i) => (
        (labels.length <= 8 || i % Math.ceil(labels.length / 7) === 0) && (
          <text key={i} x={xAt(i)} y={height - 4} fontSize="9" fill="var(--text-dim)" textAnchor="middle" fontFamily="IBM Plex Mono, monospace">{l}</text>
        )
      ))}
    </svg>
  );
}

// Reusable custom dropdown card — replaces native <select> entirely so the open
// list can be fully styled (native select popups can't be styled beyond font/color)
// and so the whole card is one tap target, arrow included.
function FilterCard({ icon: Icon, label, value, options, onChange, fullWidth }) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => String(o.value) === String(value));
  return (
    <div className="dash-filter-card" style={{ position: "relative", gridColumn: fullWidth ? "1 / -1" : undefined }}>
      <button type="button" className="dash-filter-card-hit" onClick={() => setOpen((v) => !v)}>
        <div className="dash-filter-icon-wrap"><Icon size={16} /></div>
        <div className="dash-filter-body">
          <div className="dash-filter-label">{label}</div>
          <div className="dash-filter-value-text">{current ? current.label : "Select…"}</div>
        </div>
        <ChevronDown size={14} color="var(--text-dim)" />
      </button>
      {open && (
        <>
          <div className="color-picker-backdrop" onClick={() => setOpen(false)} />
          <div className="month-charge-popover dash-filter-popover">
            {options.map((opt) => (
              <div key={opt.value} className={`month-charge-item ${String(value) === String(opt.value) ? "selected" : ""}`} onClick={() => { onChange(opt.value); setOpen(false); }}>
                <span>{opt.label}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function DispatchApp({ onSignOut, userEmail } = {}) {
  const [tab, setTab] = useState("loads");
  const [dashUnlocked, setDashUnlocked] = useState(false);
  const [dashSubTab, setDashSubTab] = useState("reports"); // "reports" | "stub"
  const [pinEntry, setPinEntry] = useState("");
  const [pinError, setPinError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [trucks, setTrucks] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [billTos, setBillTos] = useState([]);
  const [shippers, setShippers] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [loads, setLoads] = useState([]);
  const [trips, setTrips] = useState([]);
  const [history, setHistory] = useState([]);
  const [iftaReports, setIftaReports] = useState([]);
  const [iftaRates, setIftaRates] = useState(IFTA_DEFAULT_RATES);
  const [favoriteJurisdictions, setFavoriteJurisdictions] = useState([]);
  const [dispatchers, setDispatchers] = useState([]);
  const [dispatcherStubHistory, setDispatcherStubHistory] = useState([]);
  const [stubTypeTab, setStubTypeTab] = useState("driver"); // "driver" | "dispatcher"
  const [settings, setSettings] = useState({ startingLoadNumber: 1000, theme: "dark", companyName: "", companyAddress: "", dotNumber: "", companyEmail: "", dispatchFeeSchedule: [], dispatcherPaySchedule: [], companyLogoDataUri: "", oregonPermitRate: 0.251 });

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
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [textScale, setTextScale] = useState("normal"); // "normal" | "large" -- desktop only

  useEffect(() => {
    (async () => {
      try {
        const keys = ["loads", "trucks", "drivers", "billTos", "shippers", "receivers", "tripExpenses", "payStubHistory", "settings", "iftaReports", "iftaRates", "iftaFavorites", "dispatchers", "dispatcherPayStubHistory"];
        const results = await Promise.all(keys.map((k) => safeGet(k)));
        const [t, tr, dr, bt, sh, rc, tp, hi, st, ifr, ifra, iff, dsp, dph] = results;
        setLoads((t ? JSON.parse(t.value) : []).map(normalizeLoad));
        setTrucks(normalizeTrucks(tr ? JSON.parse(tr.value) : []));
        setDrivers(normalizeDrivers(dr ? JSON.parse(dr.value) : []));
        setBillTos(bt ? JSON.parse(bt.value) : []);
        setShippers(sh ? JSON.parse(sh.value) : []);
        setReceivers(rc ? JSON.parse(rc.value) : []);
        setTrips((tp ? JSON.parse(tp.value) : []).map(normalizeTrip));
        setHistory(hi ? JSON.parse(hi.value) : []);
        const settingsDefaults = { startingLoadNumber: 1000, theme: "dark", companyName: "", companyAddress: "", dotNumber: "", companyEmail: "", dispatchFeeSchedule: [], dispatcherPaySchedule: [], companyLogoDataUri: "", pinCode: "", oregonPermitRate: 0.251 };
        setSettings(st ? { ...settingsDefaults, ...JSON.parse(st.value) } : settingsDefaults);
        setIftaReports(ifr ? JSON.parse(ifr.value) : []);
        setIftaRates(ifra ? { ...IFTA_DEFAULT_RATES, ...JSON.parse(ifra.value) } : IFTA_DEFAULT_RATES);
        setFavoriteJurisdictions(iff ? JSON.parse(iff.value) : []);
        setDispatchers(dsp ? JSON.parse(dsp.value) : []);
        setDispatcherStubHistory(dph ? JSON.parse(dph.value) : []);
      } catch (e) { console.error(e); } finally { setLoaded(true); }
    })();
  }, []);

  async function persist(key, value, setter) {
    setter(value);
    setSaveState("saving");
    try {
      await window.storage.set(key, JSON.stringify(value));
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 900);
    } catch (e) { console.error(e); setSaveState("idle"); }
  }

  const truckNumbers = useMemo(() => trucks.map((t) => t.number), [trucks]);
  const driverNames = useMemo(() => drivers.map((d) => d.name), [drivers]);
  const driverByName = useMemo(() => { const m = {}; drivers.forEach((d) => { m[d.name] = d; }); return m; }, [drivers]);

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
    if (editingLoadId) updated = loads.map((l) => (l.id === editingLoadId ? { ...loadForm, id: editingLoadId } : l));
    else updated = [...loads, { ...loadForm, id: uid(), loadNumber: nextLoadNumber, status: "active", paidStatus: "unpaid", paidStubId: null }];
    await persist("loads", updated, setLoads);
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
  async function deleteLoad(id) { await persist("loads", loads.filter((l) => l.id !== id), setLoads); }
  async function closeLoad(id) { await persist("loads", loads.map((l) => (l.id === id ? { ...l, status: "completed" } : l)), setLoads); }
  async function closeAllActiveLoads() { await persist("loads", loads.map((l) => (l.status === "active" ? { ...l, status: "completed" } : l)), setLoads); }
  async function reopenLoad(id) { await persist("loads", loads.map((l) => (l.id === id ? { ...l, status: "active" } : l)), setLoads); }
  async function markLoadInvoiced(id) { await persist("loads", loads.map((l) => (l.id === id ? { ...l, invoiceStage: "invoiced", invoicedAt: new Date().toISOString() } : l)), setLoads); }
  async function markLoadPaid(id) { await persist("loads", loads.map((l) => (l.id === id ? { ...l, invoiceStage: "paid", paidAt: new Date().toISOString() } : l)), setLoads); }
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
  function openNewTrip() { setTripForm({ ...emptyTrip(), tripNumber: String(nextTripNumber) }); setActiveTripId(null); setExpensesView("detail"); }
  function openNewPendingTrip() { setTripForm({ ...emptyTrip(), tripNumber: "", tripStatus: "pending" }); setActiveTripId(null); setExpensesView("detail"); }
  function openTrip(t) { setTripForm({ ...t }); setActiveTripId(t.id); setExpensesView("detail"); }
  function closeTripDetail() { setExpensesView("list"); setTripForm(emptyTrip()); setActiveTripId(null); }
  async function saveTrip(e) {
    e.preventDefault();
    const isPending = tripForm.tripStatus === "pending";
    if (!isPending && (!tripForm.tripNumber || !tripForm.truck)) return;
    let updated;
    if (activeTripId) updated = trips.map((t) => (t.id === activeTripId ? { ...tripForm, id: activeTripId } : t));
    else updated = [...trips, { ...tripForm, id: uid() }];
    await persist("tripExpenses", updated, setTrips);
    closeTripDetail();
  }
  async function deleteTrip(id) { await persist("tripExpenses", trips.filter((t) => t.id !== id), setTrips); closeTripDetail(); }

  // ---- Fleet: trucks ----
  async function saveTruck(e) {
    e.preventDefault();
    const number = truckForm.number.trim();
    if (!number) return;
    let updated;
    if (editingTruckId) updated = trucks.map((t) => (t.id === editingTruckId ? { ...truckForm, id: editingTruckId, number } : t));
    else updated = [...trucks, { ...truckForm, id: uid(), number }];
    await persist("trucks", updated, setTrucks);
    setTruckForm(emptyTruck()); setEditingTruckId(null);
  }
  function editTruck(t) { setTruckForm({ ...t }); setEditingTruckId(t.id); scrollContentToTop(); }
  async function removeTruck(id) { await persist("trucks", trucks.filter((t) => t.id !== id), setTrucks); }

  // ---- Fleet: drivers ----
  async function saveDriver(e) {
    e.preventDefault();
    const name = driverForm.name.trim();
    if (!name) return;
    let updated;
    if (editingDriverId) updated = drivers.map((d) => (d.id === editingDriverId ? { ...driverForm, id: editingDriverId, name } : d));
    else updated = [...drivers, { ...driverForm, id: uid(), name }];
    await persist("drivers", updated, setDrivers);
    setDriverForm(emptyDriver()); setEditingDriverId(null);
  }
  function editDriver(d) { setDriverForm({ ...d }); setEditingDriverId(d.id); scrollContentToTop(); }
  async function removeDriver(id) { await persist("drivers", drivers.filter((d) => d.id !== id), setDrivers); }
  async function saveDriverNotes(driverId, notes) {
    const updated = drivers.map((d) => (d.id === driverId ? { ...d, notes } : d));
    await persist("drivers", updated, setDrivers);
  }

  // ---- Fleet: bill to ----
  async function saveBillTo(e) {
    e.preventDefault();
    const name = billToForm.name.trim();
    if (!name) return;
    const commit = async () => {
      let updated;
      if (editingBillToId) updated = billTos.map((b) => (b.id === editingBillToId ? { ...billToForm, id: editingBillToId, name } : b));
      else updated = [...billTos, { ...billToForm, id: uid(), name }];
      await persist("billTos", updated, setBillTos);
      setBillToForm(emptyBillTo()); setEditingBillToId(null);
    };
    const isDupe = !editingBillToId && billTos.some((b) => norm(b.name) === norm(name));
    if (isDupe) askConfirm(`A Bill To named "${name}" already exists. Add it anyway?`, commit, { title: "Possible Duplicate", confirmLabel: "Add Anyway", dangerous: false });
    else await commit();
  }
  function editBillTo(b) { setBillToForm({ ...b }); setEditingBillToId(b.id); }
  async function removeBillTo(id) { await persist("billTos", billTos.filter((b) => b.id !== id), setBillTos); }

  // ---- Fleet: shippers ----
  async function saveShipper(e) {
    e.preventDefault();
    const name = shipperForm.companyName.trim();
    if (!name) return;
    const commit = async () => {
      let updated;
      if (editingShipperId) updated = shippers.map((s) => (s.id === editingShipperId ? { ...shipperForm, id: editingShipperId, companyName: name } : s));
      else updated = [...shippers, { ...shipperForm, id: uid(), companyName: name }];
      await persist("shippers", updated, setShippers);
      setShipperForm(emptyShipper()); setEditingShipperId(null);
    };
    const isDupe = !editingShipperId && shippers.some((s) => norm(s.companyName) === norm(name));
    if (isDupe) askConfirm(`A shipper named "${name}" already exists. Add it anyway?`, commit, { title: "Possible Duplicate", confirmLabel: "Add Anyway", dangerous: false });
    else await commit();
  }
  function editShipper(s) { setShipperForm({ ...s }); setEditingShipperId(s.id); scrollContentToTop(); }
  async function removeShipper(id) { await persist("shippers", shippers.filter((s) => s.id !== id), setShippers); }
  async function removeShippers(ids) { const idSet = new Set(ids); await persist("shippers", shippers.filter((s) => !idSet.has(s.id)), setShippers); }
  async function removeAllShippers() { await persist("shippers", [], setShippers); }

  // ---- Fleet: receivers ----
  async function saveReceiver(e) {
    e.preventDefault();
    const name = receiverForm.companyName.trim();
    if (!name) return;
    const commit = async () => {
      let updated;
      if (editingReceiverId) updated = receivers.map((r) => (r.id === editingReceiverId ? { ...receiverForm, id: editingReceiverId, companyName: name } : r));
      else updated = [...receivers, { ...receiverForm, id: uid(), companyName: name }];
      await persist("receivers", updated, setReceivers);
      setReceiverForm(emptyReceiver()); setEditingReceiverId(null);
    };
    const isDupe = !editingReceiverId && receivers.some((r) => norm(r.companyName) === norm(name));
    if (isDupe) askConfirm(`A receiver named "${name}" already exists. Add it anyway?`, commit, { title: "Possible Duplicate", confirmLabel: "Add Anyway", dangerous: false });
    else await commit();
  }
  function editReceiver(r) { setReceiverForm({ ...r }); setEditingReceiverId(r.id); scrollContentToTop(); }
  async function removeReceiver(id) { await persist("receivers", receivers.filter((r) => r.id !== id), setReceivers); }
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
    const commit = async () => {
      let updated;
      // Only one dispatcher can be "main" at a time -- demote any existing main.
      const clean = (d) => (dispatcherForm.position === "main" && d.id !== editingDispatcherId ? { ...d, position: "dispatcher" } : d);
      if (editingDispatcherId) updated = dispatchers.map(clean).map((d) => (d.id === editingDispatcherId ? { ...dispatcherForm, id: editingDispatcherId, name } : d));
      else updated = [...dispatchers.map(clean), { ...dispatcherForm, id: uid(), name }];
      await persist("dispatchers", updated, setDispatchers);
      setDispatcherForm(emptyDispatcher()); setEditingDispatcherId(null);
    };
    const isDupe = !editingDispatcherId && dispatchers.some((d) => norm(d.name) === norm(name));
    if (isDupe) askConfirm(`A dispatcher named "${name}" already exists. Add it anyway?`, commit, { title: "Possible Duplicate", confirmLabel: "Add Anyway", dangerous: false });
    else await commit();
  }
  function editDispatcher(d) { setDispatcherForm({ ...emptyDispatcher(), ...d }); setEditingDispatcherId(d.id); }
  async function removeDispatcher(id) { await persist("dispatchers", dispatchers.filter((d) => d.id !== id), setDispatchers); }
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
    const record = { ...report, id: report.id || uid(), savedAt: new Date().toISOString() };
    const updated = report.id ? iftaReports.map((r) => (r.id === report.id ? record : r)) : [...iftaReports, record];
    await persist("iftaReports", updated, setIftaReports);
    return record;
  }
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
    if (q) list = list.filter((l) => norm(String(l.loadNumber || "")).includes(q) || norm(l.billTo).includes(q) || norm(l.driver).includes(q) || norm(l.workOrder).includes(q));
    return list;
  }, [loads, filterTruck, filterStatus, loadSearch, tripLoadsFilter]);

  function onDashPeriodChange(period) {
    setDashPeriod(period);
    if (period === "month") { setDashStart(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-01`); setDashEnd(todayISO()); }
    else if (period === "year") { setDashStart(`${new Date().getFullYear()}-01-01`); setDashEnd(todayISO()); }
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

  const dashReport = useMemo(() => {
    const f = dashApplied || { start: dashStart, end: dashEnd, viewBy: dashViewBy, drivers: dashDriverFilter, truck: dashTruckFilter, billTo: dashBillToFilter, dispatcher: dashDispatcherFilter, milesGroupBy: dashMilesGroupBy };
    let scoped = loads.filter((l) => l.status === "completed" && inRange(l.deliveryDate || l.pickupDate, f.start, f.end));
    if (f.drivers && f.drivers.length) scoped = scoped.filter((l) => f.drivers.includes(l.driver));
    if (f.truck && f.truck !== "ALL") scoped = scoped.filter((l) => l.truck === f.truck);
    if (f.billTo && f.billTo !== "ALL") scoped = scoped.filter((l) => l.billTo === f.billTo);

    if (f.viewBy === "oregon") {
      const groups = {};
      scoped.forEach((l) => {
        const key = l.truck || "—";
        groups[key] = groups[key] || { miles: 0 };
        groups[key].miles += num(l.orMiles);
      });
      const rate = num(settings.oregonPermitRate) || 0.251;
      const rows = Object.entries(groups)
        .map(([key, g]) => ({ key, miles: g.miles, amount: g.miles * rate }))
        .filter((r) => r.miles > 0)
        .sort((a, b) => b.miles - a.miles);
      const totalMiles = rows.reduce((s, r) => s + r.miles, 0);
      const totalAmount = rows.reduce((s, r) => s + r.amount, 0);
      return { viewBy: f.viewBy, rows, rate, totalMiles, totalAmount, start: f.start, end: f.end };
    }

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
          groups[key] = (groups[key] || 0) + amt;
          items.push({ driver: key, truck: t.truck, tripNumber: t.tripNumber, note: item.note || "Cancellation", amount: amt, date: t.startDate });
        });
      });
      const rows = Object.entries(groups).map(([key, total]) => ({ key, total })).sort((a, b) => b.total - a.total);
      const grandTotal = rows.reduce((s, r) => s + r.total, 0);
      items.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
      return { viewBy: f.viewBy, rows, items, grandTotal, start: f.start, end: f.end };
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
  }, [loads, drivers, trips, dashApplied, dashStart, dashEnd, dashViewBy, dashDriverFilter, dashTruckFilter, dashBillToFilter, dashDispatcherFilter, dashMilesGroupBy, dispatcherByName, settings]);

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

  if (!loaded) {
    return (
      <div style={{ background: "#14181F", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#8A93A3", fontFamily: "Inter, sans-serif" }}>Loading…</div>
      </div>
    );
  }

  return (
    <div className={`theme-${settings.theme || "dark"}`} style={{ background: "var(--bg)", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <style>{STYLES}</style>
      <input type="file" ref={fileInputRef} accept=".xlsx,.xls,.csv" style={{ display: "none" }} onChange={handleFileSelected} />

      <div className="app-shell">
        <div className="header no-print">
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
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  className="dispatch-badge"
                  onClick={() => onSignOut && setAccountMenuOpen((v) => !v)}
                  style={{ cursor: onSignOut ? "pointer" : "default", border: "none" }}
                >
                  <User size={16} />
                </button>
                {accountMenuOpen && onSignOut && (
                  <>
                    <div className="color-picker-backdrop" onClick={() => setAccountMenuOpen(false)} />
                    <div className="account-menu-popover">
                      {userEmail && <div className="account-menu-email">{userEmail}</div>}
                      <button type="button" className="btn danger" style={{ marginTop: userEmail ? 8 : 0, width: "100%" }} onClick={() => { setAccountMenuOpen(false); onSignOut(); }}>Sign Out</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="subtitle">{trucks.length} trucks · {drivers.length} drivers · {loads.filter((l) => l.status === "active").length} active loads</div>
        </div>

        {saveState !== "idle" && <div className="save-indicator no-print">{saveState === "saving" ? "saving…" : "saved"}</div>}

        <div className={`content ${textScale === "large" ? "text-large" : ""}`}>
          {tab === "loads" && (
            <LoadsTab {...{
              showLoadForm, openNewLoad, saveLoad, editingLoadId, loadForm, setLoadForm, nextLoadNumber,
              billTos, shippers, receivers, applyShipper, applyReceiverToStop, truckNumbers, driverNames, dispatchers,
              addStop, removeStop, updateStop, moveStop,
              calcMiles, milesStatus, setShowLoadForm, setEditingLoadId,
              filterStatus, setFilterStatus, filterTruck, setFilterTruck, loadSearch, setLoadSearch,
              filteredLoads, expandedLoadId, setExpandedLoadId, editLoad, closeLoad, reopenLoad, deleteLoad, duplicateLoad, loadsQuickStats,
              companyInfo: settings, closeAllActiveLoads, askConfirm, tripLoadsFilter, setTripLoadsFilter, allLoads: loads,
            }} />
          )}

          {tab === "expenses" && expensesView === "list" && (
            <ExpensesList {...{ trips, computeTripProfit, computeTripFinancials, openTrip, openNewTrip, openNewPendingTrip, tripsMonth, setTripsMonth, tripsYear, setTripsYear, settings, truckNumbers }} />
          )}
          {tab === "expenses" && expensesView === "detail" && (
            <ExpenseDetail {...{
              tripForm, setTripForm, activeTripId, truckNumbers, driverNames,
              computeTripMilesGross, computeTripProfit, saveTrip, deleteTrip, closeTripDetail,
              driverByName, askConfirm, nextTripNumber, settings, setTab, setTripLoadsFilter, trips,
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
                <button className={`primary-tab-btn ${dashSubTab === "reports" ? "active" : ""}`} onClick={() => setDashSubTab("reports")}>
                  <BarChart3 size={20} className="primary-tab-icon" /> Reports
                </button>
                <button className={`primary-tab-btn ${dashSubTab === "stub" ? "active" : ""}`} onClick={() => setDashSubTab("stub")}>
                  <FileText size={20} className="primary-tab-icon" /> Stub
                </button>
              </div>
              {dashSubTab === "reports" && (
                <DashboardTab {...{
                  dashPeriod, onDashPeriodChange, dashStart, setDashStart, dashEnd, setDashEnd,
                  dashViewBy, setDashViewBy, dashDriverFilter, setDashDriverFilter,
                  dashTruckFilter, setDashTruckFilter, dashBillToFilter, setDashBillToFilter,
                  dashDispatcherFilter, setDashDispatcherFilter, dispatchers,
                  dashMilesGroupBy, setDashMilesGroupBy,
                  runDashUpdate, dashReport, driverNames, truckNumbers, billTos,
                  annualTaxYear, setAnnualTaxYear, annualTaxReport, companyInfo: settings,
                  setTab, setTripLoadsFilter,
                }} />
              )}
              {dashSubTab === "stub" && (
                <div>
                  <div className="segment-row">
                    <button className={`segment-btn ${stubTypeTab === "driver" ? "active" : ""}`} onClick={() => setStubTypeTab("driver")}>Driver</button>
                    <button className={`segment-btn ${stubTypeTab === "dispatcher" ? "active" : ""}`} onClick={() => setStubTypeTab("dispatcher")}>Dispatcher</button>
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
            <TrucksPage {...{ setFleetView, truckForm, setTruckForm, saveTruck, editingTruckId, setEditingTruckId, trucks, editTruck, removeTruck, askConfirm }} />
          )}
          {tab === "fleet" && fleetView === "drivers" && (
            <DriversPage {...{
              setFleetView, driverForm, setDriverForm, saveDriver, editingDriverId, setEditingDriverId, drivers, editDriver, removeDriver,
              expandedDriverId, setExpandedDriverId, history, loads, setStubDriver, setStubStart, setStubEnd, setStubDisplayAs, setTab, askConfirm,
              saveDriverNotes, setViewingStubRecord,
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
          {tab === "fleet" && fleetView === "settings" && (
            <SettingsTab {...{ setFleetView, settings, saveStartingNumber, nextLoadNumber, saveSettings, onSignOut, askConfirm }} />
          )}
          {tab === "fleet" && fleetView === "ifta" && (
            <IftaCalculatorPage {...{
              setFleetView, truckNumbers, iftaReports, iftaRates, saveIftaRates, saveIftaReport, deleteIftaReport,
              askConfirm, companyInfo: settings, favoriteJurisdictions, toggleFavoriteJurisdiction,
            }} />
          )}
          {tab === "fleet" && fleetView === "accounting" && (
            <AccountingPage {...{
              setFleetView, loads, billTos, markLoadInvoiced, markLoadPaid, revertInvoiceStage,
              askConfirm, companyInfo: settings, setTab, editLoad, deleteLoad, reopenLoad, truckNumbers,
            }} />
          )}
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
          <button className={`tab-btn ${tab === "loads" ? "active" : ""}`} onClick={() => setTab("loads")}><Package size={17} /> Loads</button>
          <button className={`tab-btn ${tab === "expenses" ? "active" : ""}`} onClick={() => setTab("expenses")}><DollarSign size={17} /> Trips</button>
          <button className={`tab-btn ${tab === "stats" ? "active" : ""}`} onClick={() => setTab("stats")}><TrendingUp size={17} /> Stats</button>
          <button className={`tab-btn ${tab === "dashboard" ? "active" : ""}`} onClick={() => setTab("dashboard")}><BarChart3 size={17} /> Dash</button>
          <button className={`tab-btn ${tab === "fleet" ? "active" : ""}`} onClick={() => setTab("fleet")}><Truck size={17} /> Fleet</button>
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
  .header { padding: calc(12px + env(safe-area-inset-top)) 18px 10px; border-bottom: 1px solid var(--border); }
  .header-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .header-wordmark-img { height: 20px; width: auto; object-fit: contain; }
  .dispatch-badge { background: var(--accent); color: #1A1300; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .subtitle { color: var(--text-dim); font-size: 10.5px; margin-top: 3px; }
  .content { flex: 1; padding: 16px 16px 90px; overflow-y: auto; max-width: 460px; margin: 0 auto; width: 100%; }
  .field-row { display: flex; gap: 10px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 5px; min-width: 0; }
  .field label { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-dim); font-weight: 700; }
  .field input, .field textarea {
    background: var(--surface); border: 1px solid var(--border); color: var(--text);
    padding: 10px 11px; border-radius: 8px; font-size: 14px; font-family: 'IBM Plex Mono', monospace; outline: none; width: 100%; font-weight: 600;
  }
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
  .field input::placeholder, .field textarea::placeholder { color: #55606F; }
  .field input:focus, .field select:focus, .field textarea:focus { border-color: var(--accent); }
  .section-label { font-family: 'Oswald', sans-serif; font-size: 12.5px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin: 18px 0 10px; display: flex; align-items: center; gap: 8px; }
  .stats-page { padding-bottom: 8px; }
  .stats-sub { font-size: 12.5px; color: var(--text-dim); margin-top: -6px; margin-bottom: 14px; }
  .stats-period-row { display: flex; gap: 8px; margin-bottom: 12px; }
  .stats-period-btn { flex: 1; padding: 9px 6px; border-radius: 10px; border: 1px solid var(--border); background: var(--surface); color: var(--text); font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 12.5px; cursor: pointer; }
  .stats-period-btn.active { background: var(--accent); color: #1A1300; border-color: var(--accent); }
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
  .section-label-row { display: flex; align-items: center; justify-content: space-between; margin: 0 0 12px; }
  .section-label-row .section-label { margin: 0; flex: 1; }
  .btn { width: 100%; background: var(--accent); color: #1A1300; border: none; border-radius: 10px; padding: 13px; font-family: 'Oswald', sans-serif; font-size: 14.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; cursor: pointer; margin-top: 14px; }
  .btn.secondary { background: var(--surface-2); color: var(--text-dim); }
  .btn.secondary.cancel-outline { border: 1.5px solid var(--red); color: var(--red); background: transparent; }
  .load-entry-form .load-number-inline { font-weight: 800; }
  .btn.danger { background: #3A1F1F; color: var(--red); }
  .btn.ghost { background: transparent; border: 1px solid var(--border); color: var(--text-dim); margin-top: 0; }
  .new-load-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; background: var(--accent); color: #1A1300; border: none; border-radius: 10px; padding: 14px; font-family: 'Oswald', sans-serif; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; cursor: pointer; margin-bottom: 18px; }
  .add-trip-btn { display: flex; align-items: center; gap: 5px; background: var(--accent); color: #1A1300; border: none; border-radius: 8px; padding: 7px 11px; font-family: 'Oswald', sans-serif; font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; cursor: pointer; flex-shrink: 0; }
  .pending-trip-btn { background: transparent; border: 1.5px solid #E15C4F; color: #E15C4F; }
  .pending-number-display { color: #E15C4F; font-weight: 800; font-family: 'Oswald', sans-serif; font-size: 15px; padding: 10px 0; }
  .stop-card { background: var(--surface); border: 1px solid var(--border); border-left: 4px solid var(--accent); border-radius: 10px; padding: 12px; margin-bottom: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.12); }
  .stop-card.pickup-card { border-left-color: #4A90D9; margin-bottom: 18px; }
  .stop-card.mileage-card { border-left-color: #4CAF6D; }
  .stop-card.bol-card { border-left-color: #2DAA9E; }
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
  .field-row.date-row { gap: 18px; }
  .driver2-row { display: flex; gap: 6px; }
  .driver2-row input { flex: 1; min-width: 0; }
  .color-arrow-btn { flex-shrink: 0; width: 34px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; color: var(--text-dim); font-size: 13px; cursor: pointer; }
  .color-picker-popover { position: absolute; top: calc(100% + 4px); right: 0; z-index: 30; display: flex; gap: 10px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 10px 12px; box-shadow: 0 6px 18px rgba(0,0,0,0.35); }
  .month-select-btn { display: flex; align-items: center; justify-content: space-between; width: 100%; background: var(--surface); border: 1px solid var(--border); color: var(--text); padding: 10px 11px; border-radius: 8px; font-size: 14px; font-family: 'IBM Plex Mono', monospace; font-weight: 600; cursor: pointer; }
  .month-charge-popover { position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 30; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 4px; box-shadow: 0 8px 20px rgba(0,0,0,0.35); max-height: 260px; overflow-y: auto; }
  .month-charge-item { display: flex; align-items: center; justify-content: space-between; padding: 9px 10px; border-radius: 6px; cursor: pointer; font-size: 13px; font-family: 'IBM Plex Mono', monospace; font-weight: 600; color: var(--text); }
  .month-charge-item:active { background: var(--surface-2); }
  .month-charge-item.selected { background: var(--surface-2); color: var(--accent); }
  .month-charge-amt { display: flex; align-items: center; gap: 4px; color: var(--green); font-size: 11.5px; font-weight: 700; }
  .account-menu-popover { position: absolute; top: calc(100% + 6px); right: 0; z-index: 30; min-width: 200px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 12px; box-shadow: 0 6px 18px rgba(0,0,0,0.35); }
  .account-menu-email { font-size: 11.5px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; word-break: break-all; }
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
  .tab-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; background: none; border: none; color: var(--text-dim); padding: 5px 0; cursor: pointer; font-size: 8.8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1px; }
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
  .load-status-dot-red { width: 8px; height: 8px; border-radius: 50%; background: var(--red); flex-shrink: 0; }
  .load-card-v2-row2 { display: flex; align-items: flex-end; justify-content: space-between; gap: 8px; }
  .load-card-v2-wo { font-family: 'IBM Plex Mono', monospace; font-weight: 700; font-size: 16px; color: var(--green); letter-spacing: 0.6px; }
  .load-card-v2-right-bottom { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
  .load-card-v2-rate { font-family: 'IBM Plex Mono', monospace; font-weight: 700; font-size: 15px; color: var(--text); }
  .loads-status-row { display: flex; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; margin-bottom: 10px; }
  .loads-status-seg { flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px; padding: 9px 6px; background: var(--surface); border: none; border-right: 1px solid var(--border); color: var(--text); font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 13px; cursor: pointer; }
  .loads-status-seg:last-child { border-right: none; }
  .loads-status-seg.active { background: var(--accent); color: #1A1300; }
  .loads-status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--red); flex-shrink: 0; }
  .loads-status-count { font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 700; background: var(--surface-2); color: var(--text-dim); border-radius: 20px; padding: 1px 7px; margin-left: 2px; }
  .loads-status-seg.active .loads-status-count { background: rgba(26,19,0,0.18); color: #1A1300; }
  .loads-status-count-green { color: var(--green); }
  .loads-filter-row2 { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
  .loads-truck-dropdown-btn { display: flex; align-items: center; gap: 6px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 9px 13px; color: var(--text); font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 12.5px; cursor: pointer; }
  .loads-truck-popover span { color: var(--text); font-family: 'Oswald', sans-serif; font-size: 12.5px; font-weight: 600; }
  .loads-close-all-btn { display: flex; align-items: center; gap: 6px; background: var(--surface); border: 1px solid var(--red); border-radius: 10px; padding: 9px 13px; color: var(--red); font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 12.5px; cursor: pointer; }
  .card-detail { padding: 0 14px 14px; border-top: 1px dashed var(--border); margin-top: 2px; }
  .row-line { display: flex; justify-content: space-between; padding: 7px 0; font-size: 14px; font-weight: 600; color: var(--text-dim); border-bottom: 1px solid #20293580; }
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
  .fleet-settings-btn { display: flex; align-items: center; gap: 6px; background: var(--surface); border: 1px solid var(--accent); border-radius: 20px; padding: 7px 14px; color: var(--text); font-family: 'Oswald', sans-serif; font-weight: 600; font-size: 12px; cursor: pointer; flex-shrink: 0; }
  .fleet-settings-btn:hover { background: var(--surface-2); }
  .icon-btn:hover { color: var(--red); }
  .save-indicator { position: fixed; top: 12px; right: 14px; font-size: 10px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; opacity: 0.7; z-index: 20; }
  .preset-row { display: flex; gap: 6px; margin-bottom: 14px; }
  .driver-subnav { display: flex; gap: 6px; margin-bottom: 18px; }
  .primary-tab-row { display: flex; gap: 10px; margin-bottom: 20px; }
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
    padding: 10px 11px; border-radius: 8px; font-size: 14px; font-family: 'IBM Plex Mono', monospace;
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
  .dash-filter-icon-wrap { width: 34px; height: 34px; border-radius: 10px; background: var(--surface-2); color: var(--accent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .dash-filter-body { flex: 1; min-width: 0; }
  .dash-filter-label { font-size: 10px; color: var(--text-dim); font-weight: 600; margin-bottom: 2px; }
  .dash-filter-value-text { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 13.5px; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
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
  .rate-field-input { border: 2px solid var(--green) !important; }
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
  .trip-stat-item:first-child { flex: 0 0 26px; width: 26px; }
  .trip-stat-num { font-family: 'Oswald', sans-serif; font-weight: 800; font-size: 16px; color: var(--text); white-space: nowrap; }
  .trip-stat-lbl { font-size: 9.5px; color: var(--text-dim); font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; margin-top: 2px; }
  .trip-stat-truck-btn-v2 { position: relative; display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 50%; color: var(--text-dim); cursor: pointer; margin-bottom: 2px; }
  .trip-stat-truck-chevron { color: var(--text-dim); margin-top: 1px; }
  .trip-stat-item .month-charge-popover span { color: var(--text); font-family: 'Oswald', sans-serif; font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; }
  .trip-stat-item .month-charge-popover .month-charge-amt { color: var(--green); }
  .trip-stat-item-inline { flex-direction: row; align-items: baseline; gap: 5px; justify-content: center; }
  .trip-stat-lbl-inline { margin-top: 0; text-transform: none; font-size: 11px; }
  .trip-donut { width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .trip-donut-hole { width: 26px; height: 26px; border-radius: 50%; background: var(--surface); display: flex; align-items: center; justify-content: center; font-size: 8px; font-weight: 800; color: var(--text); font-family: 'IBM Plex Mono', monospace; }
  .trip-card-v2-list { display: flex; flex-direction: column; gap: 9px; margin-bottom: 16px; }
  .trip-card-v2 { display: flex; align-items: center; gap: 10px; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 9px 14px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
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
  .fleet-menu-card { display: flex; flex-direction: column; align-items: center; text-align: center; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 22px 12px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  .fleet-menu-card:hover { border-color: var(--accent); }
  .fleet-menu-card-icon-wrap { width: 64px; height: 64px; border-radius: 50%; background: var(--surface-2); color: var(--accent); display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
  .fleet-menu-card-name { font-family: 'Oswald', sans-serif; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; color: var(--text); margin-bottom: 4px; }
  .fleet-menu-card-sub { font-size: 11.5px; color: var(--text-dim); }
  .fleet-credit { text-align: center; font-size: 10.5px; color: var(--text-dim); opacity: 0.6; margin-top: 18px; letter-spacing: 0.3px; }

  .import-btn { display: flex; align-items: center; gap: 6px; background: var(--surface-2); border: 1px solid var(--border); color: var(--text-dim); border-radius: 8px; padding: 8px 12px; font-size: 12px; font-weight: 600; cursor: pointer; margin-bottom: 16px; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(10,12,16,0.75); z-index: 50; display: flex; align-items: flex-end; justify-content: center; }
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
    billTos, shippers, receivers, applyShipper, applyReceiverToStop, truckNumbers, driverNames, dispatchers,
    addStop, removeStop, updateStop, moveStop,
    calcMiles, milesStatus, setShowLoadForm, setEditingLoadId,
    filterStatus, setFilterStatus, filterTruck, setFilterTruck, loadSearch, setLoadSearch,
    filteredLoads, expandedLoadId, setExpandedLoadId, editLoad, closeLoad, reopenLoad, deleteLoad, duplicateLoad, loadsQuickStats,
    companyInfo, closeAllActiveLoads, askConfirm, tripLoadsFilter, setTripLoadsFilter, allLoads,
  } = p;
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
      {!showLoadForm && <button className="new-load-btn" onClick={openNewLoad}><Plus size={18} /> New Load</button>}

      {showLoadForm && (
        <form onSubmit={saveLoad} className="load-entry-form">
          <div className="field-row">
            <div className="field">
              <label>New Load #</label>
              <div className="load-number-inline">#{editingLoadId ? loadForm.loadNumber : nextLoadNumber}</div>
            </div>
            <div className="field"><label>Work Order #</label><input value={loadForm.workOrder} onChange={(e) => setLoadForm({ ...loadForm, workOrder: e.target.value })} placeholder="Broker load ID" /></div>
          </div>

          <div className="field-row">
            <div className="field">
              <label>Bill To</label>
              <input list="billto-list" value={loadForm.billTo} onChange={(e) => setLoadForm({ ...loadForm, billTo: e.target.value })} placeholder="e.g. Amazon Relay" style={{ fontFamily: "Inter" }} />
              <datalist id="billto-list">{billTos.map((b) => <option key={b.id} value={b.name} />)}</datalist>
            </div>
            <div className="field"><label>Rate ($)</label><input type="number" step="0.01" className="rate-field-input" value={loadForm.rate} onChange={(e) => setLoadForm({ ...loadForm, rate: e.target.value })} placeholder="0.00" /></div>
          </div>

          <div className="field-row">
            <div className="field">
              <label>Driver</label>
              <select value={loadForm.driver} onChange={(e) => setLoadForm({ ...loadForm, driver: e.target.value })}>
                <option value="">Select…</option>
                {driverNames.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Truck</label>
              <select value={loadForm.truck} onChange={(e) => setLoadForm({ ...loadForm, truck: e.target.value })}>
                <option value="">Select…</option>
                {truckNumbers.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="section-label">Shipper (Pickup)</div>
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
          <div className="field-row"><div className="field"><label>Pickup Date</label><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={loadForm.pickupDate} onChange={(e) => setLoadForm({ ...loadForm, pickupDate: e.target.value })} /></div><div className="field" /></div>
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
                  <button type="button" className="mini-icon-btn" disabled={idx === 0} onClick={() => moveStop(stop.id, -1)}><ChevronUp size={14} /></button>
                  <button type="button" className="mini-icon-btn" disabled={idx === loadForm.stops.length - 1} onClick={() => moveStop(stop.id, 1)}><ChevronDown size={14} /></button>
                  <button type="button" className="mini-icon-btn" disabled={loadForm.stops.length <= 1} onClick={() => removeStop(stop.id)}><X size={14} /></button>
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
            </div>
          ))}
          <div className="field-row"><div className="field"><label>Delivery Date (final)</label><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={loadForm.deliveryDate} onChange={(e) => setLoadForm({ ...loadForm, deliveryDate: e.target.value })} /></div><div className="field" /></div>

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
            <div className="field" style={{ flex: 0.8 }}>
              <label>BOL</label>
              <button type="button" className="btn secondary" style={{ marginTop: 0 }} onClick={() => bolInputRef.current && bolInputRef.current.click()}>
                {loadForm.bolDataUri ? "Replace BOL" : "Upload BOL"}
              </button>
            </div>
            <div className="field" style={{ flex: 1.2 }}>
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

      <div className="section-label" style={{ marginTop: 26, justifyContent: "space-between", width: "100%" }}>
        <span>Loads</span>
        <button
          type="button"
          onClick={() => setSearchOpen((v) => !v)}
          style={{ background: searchOpen ? "var(--accent)" : "var(--surface-2)", border: "none", borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginLeft: "auto" }}
        >
          <Search size={14} color={searchOpen ? "#1A1300" : "var(--text-dim)"} />
        </button>
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
              <Search size={14} color="#8A93A3" />
              <input autoFocus value={loadSearch} onChange={(e) => setLoadSearch(e.target.value)} placeholder="Search by load #, work order, bill to, or driver…" />
            </div>
          )}
          <div className="loads-status-row">
            <button type="button" className={`loads-status-seg ${filterStatus === "active" ? "active" : ""}`} onClick={() => setFilterStatus("active")}>
              <span className="loads-status-dot" style={filterStatus === "active" ? { background: "#1A1300" } : undefined} /> Active
            </button>
            <button type="button" className={`loads-status-seg ${filterStatus === "completed" ? "active" : ""}`} onClick={() => setFilterStatus("completed")}>
              <CheckCircle2 size={14} color={filterStatus === "completed" ? "#1A1300" : "var(--green)"} /> Completed
            </button>
            <button type="button" className={`loads-status-seg ${filterStatus === "all" ? "active" : ""}`} onClick={() => setFilterStatus("all")}>
              All
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
      {[...filteredLoads].sort((a, b) => (b.loadNumber || 0) - (a.loadNumber || 0)).map((l) => {
        const open = expandedLoadId === l.id;
        return (
          <div className="card" key={l.id} style={l.notes ? { borderRight: "3px solid #E15C4F" } : undefined}>
            <div className="card-head" onClick={() => setExpandedLoadId(open ? null : l.id)}>
              <div className="load-card-v2-row1">
                <div className="load-card-v2-left">
                  <span className="load-card-v2-num">#{l.loadNumber}</span>
                  <span className="load-card-v2-route"><MapPin size={11} color="var(--text-dim)" style={{ display: "inline", verticalAlign: -1 }} /> {routeSummary(l)}</span>
                </div>
                <div className="load-card-v2-right-top">
                  <span className="load-card-v2-meta"><Truck size={12} color="var(--text)" /> {l.truck || "—"}</span>
                  <span className="load-card-v2-meta"><Calendar size={12} color="var(--text)" /> {shortDate(l.pickupDate)}</span>
                  {l.status === "completed" ? <CheckCircle2 size={16} color="var(--green)" /> : <span className="load-status-dot-red" />}
                </div>
              </div>
              <div className="load-card-v2-row2">
                <span className="load-card-v2-wo"><Pencil size={12} color="var(--green)" style={{ display: "inline", verticalAlign: -1 }} /> {l.workOrder || "—"}</span>
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
                <div className="row-line"><span>Pickup</span><span>{fmtDate(l.pickupDate)} · {cityState(l.shipperCity, l.shipperState) || l.shipperName || "—"}</span></div>
                {(l.stops || []).map((s, i) => (
                  <div className="row-line" key={s.id || i}><span>{stopLabel(i, l.stops.length)}</span><span>{cityState(s.city, s.state) || s.receiverName || "—"}</span></div>
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
                      <a href={l.bolDataUri} download={l.bolFileName || "BOL.pdf"} style={{ fontSize: 12.5, color: "var(--accent)", display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}><FileText size={14} /> {l.bolFileName || "BOL.pdf"}</a>
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
                  {(printingLoad.stops || []).map((s, i) => (
                    <tr key={s.id || i}>
                      <td>{stopLabel(i, printingLoad.stops.length)}</td>
                      <td>{s.receiverName || "—"}</td>
                      <td>{cityState(s.city, s.state) || "—"}</td>
                      <td style={{ textAlign: "right" }}>{i === printingLoad.stops.length - 1 ? fmtDate(printingLoad.deliveryDate) : ""}</td>
                    </tr>
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

  const { start, end, prevStart, prevEnd } = useMemo(() => {
    const today = todayISO();
    if (period === "week") return { start: addDays(today, -6), end: today, prevStart: addDays(today, -13), prevEnd: addDays(today, -7) };
    if (period === "month") {
      const now = new Date();
      const y = now.getFullYear(), m = now.getMonth();
      const monthStart = `${y}-${String(m + 1).padStart(2, "0")}-01`;
      const prevMonthDate = new Date(y, m - 1, 1);
      const prevMonthStart = `${prevMonthDate.getFullYear()}-${String(prevMonthDate.getMonth() + 1).padStart(2, "0")}-01`;
      const prevMonthEnd = new Date(y, m, 0).toISOString().slice(0, 10);
      return { start: monthStart, end: today, prevStart: prevMonthStart, prevEnd: prevMonthEnd };
    }
    if (period === "year") return { start: addDays(today, -364), end: today, prevStart: addDays(today, -729), prevEnd: addDays(today, -365) };
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

  const topDispatchers = useMemo(() => {
    const byDispatcher = {};
    loads
      .filter((l) => l.status === "completed" && inRange(l.deliveryDate || l.pickupDate, start, end))
      .forEach((l) => {
        const name = l.dispatcher || "Unassigned";
        if (!byDispatcher[name]) byDispatcher[name] = { name, gross: 0, miles: 0, loads: 0 };
        byDispatcher[name].gross += num(l.rate);
        byDispatcher[name].miles += num(l.loadedMiles);
        byDispatcher[name].loads += 1;
      });
    return Object.values(byDispatcher).map((d) => ({ ...d, rpm: d.miles > 0 ? d.gross / d.miles : 0 })).sort((a, b) => b.gross - a.gross).slice(0, 5);
  }, [loads, start, end]);

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
      <div className="section-label">Stats</div>
      <div className="stats-sub">Overview of your company performance</div>

      <div className="stats-period-row">
        <button className={`stats-period-btn ${period === "week" ? "active" : ""}`} onClick={() => setPeriod("week")}>Week</button>
        <button className={`stats-period-btn ${period === "month" ? "active" : ""}`} onClick={() => setPeriod("month")}>Month</button>
        <button className={`stats-period-btn ${period === "year" ? "active" : ""}`} onClick={() => setPeriod("year")}>Year</button>
        <button className={`stats-period-btn ${period === "custom" ? "active" : ""}`} onClick={() => setPeriod("custom")}>Custom</button>
      </div>
      {period === "custom" && (
        <div className="field-row" style={{ marginBottom: 14 }}>
          <div className="field"><label>From</label><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={customStart} max={customEnd} onChange={(e) => setCustomStart(e.target.value)} /></div>
          <div className="field"><label>To</label><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={customEnd} min={customStart} max={todayISO()} onChange={(e) => setCustomEnd(e.target.value)} /></div>
        </div>
      )}
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

      <div className="stats-main-row">
        <div className="stats-panel">
          <div className="stats-panel-title">Dispatcher Work</div>
          {topDispatchers.length === 0 && <div className="empty-state">No completed loads in this period yet.</div>}
          {topDispatchers.map((d, i) => (
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
      </div>
    </div>
  );
}

function ExpensesList({ trips, computeTripProfit, computeTripFinancials, openTrip, openNewTrip, openNewPendingTrip, tripsMonth, setTripsMonth, tripsYear, setTripsYear, settings, truckNumbers }) {
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const [yearPickerOpen, setYearPickerOpen] = useState(false);
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
  const paidPct = monthTrips.length > 0 ? (paidCount / monthTrips.length) * 100 : 0;

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
        <div style={{ display: "flex", gap: 8 }}>
          <button className="add-trip-btn" onClick={openNewTrip}><Plus size={14} /> Add Active Trip</button>
          <button className="add-trip-btn pending-trip-btn" onClick={openNewPendingTrip}><Plus size={14} /> Add Pending Trip</button>
        </div>
      </div>

      <div className="trips-month-card-v2">
        <div className="field-row" style={{ marginBottom: 0 }}>
          <div className="field" style={{ position: "relative" }}>
            <label>Month</label>
            <button type="button" className="month-select-btn" onClick={() => { setMonthPickerOpen((v) => !v); setYearPickerOpen(false); }}>
              <span>{MONTH_NAMES[tripsMonth - 1]}</span>
              <ChevronDown size={14} />
            </button>
            {monthPickerOpen && (
              <>
                <div className="color-picker-backdrop" onClick={() => setMonthPickerOpen(false)} />
                <div className="month-charge-popover">
                  {MONTH_NAMES.map((m, i) => {
                    const g = grossByMonth[i + 1];
                    return (
                      <div key={m} className={`month-charge-item ${tripsMonth === i + 1 ? "selected" : ""}`} onClick={() => { setTripsMonth(i + 1); setMonthPickerOpen(false); }}>
                        <span>{m}</span>
                        {g > 0 && <span className="month-charge-amt">{money(g)}</span>}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          <div className="field" style={{ position: "relative" }}>
            <label>Year</label>
            <button type="button" className="month-select-btn" onClick={() => { setYearPickerOpen((v) => !v); setMonthPickerOpen(false); }}>
              <span>{tripsYear}</span>
              <ChevronDown size={14} />
            </button>
            {yearPickerOpen && (
              <>
                <div className="color-picker-backdrop" onClick={() => setYearPickerOpen(false)} />
                <div className="month-charge-popover">
                  {years.map((y) => {
                    const g = grossByYear[String(y)];
                    return (
                      <div key={y} className={`month-charge-item ${tripsYear === y ? "selected" : ""}`} onClick={() => { setTripsYear(y); setYearPickerOpen(false); }}>
                        <span>{y}</span>
                        {g > 0 && <span className="month-charge-amt">{money(g)}</span>}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>


      <div className="trip-stats-bar">
        <div className="trip-stat-item">
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
        <div className="trip-donut" style={{ background: `conic-gradient(var(--green) ${paidPct}%, var(--border) ${paidPct}% 100%)` }}>
          <div className="trip-donut-hole">{monthTrips.length > 0 ? `${Math.round(paidPct)}%` : "—"}</div>
        </div>
      </div>

      <div className="trip-card-v2-list">
        {rows.length === 0 && <div className="empty-state">No trips recorded for {MONTH_NAMES[tripsMonth - 1]} {tripsYear}.</div>}
        {rows.map(({ trip: t, miles, gross, fin }) => (
          <div
            className="trip-card-v2"
            key={t.id}
            onClick={() => openTrip(t)}
            style={t.tripNote && t.tripNoteColor && t.tripNoteColor !== "clear" ? { borderRight: `3px solid ${t.tripNoteColor === "green" ? "#4CAF6D" : "#E15C4F"}` } : undefined}
          >
            <div className="trip-card-v2-numcol">
              {t.paidStatus === "paid" && <CheckCircle2 size={16} color="var(--green)" />}
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
        <span style={{ color: "var(--green)" }}>■</span> Dispatch Fee &nbsp;&nbsp; <span style={{ color: "var(--accent-2)" }}>■</span> Company Profit (per-mile/hourly, or 0%-rate drivers)
      </div>

      <div className="monthly-summary-box">
        <div className="monthly-summary-title">{MONTH_NAMES[tripsMonth - 1]} {tripsYear} Summary</div>
        <div className="pay-summary-row"><span>Total Monthly Gross</span><span style={{ fontWeight: 800, fontSize: 16 }}>{money(totalGross)}</span></div>
        <div className="pay-summary-row"><span>Total Dispatch Fees</span><span style={{ color: "var(--green)" }}>{money(totalFees)}</span></div>
        <div className="pay-summary-row"><span>Total Profit</span><span style={{ color: "var(--accent-2)" }}>{money(totalProfit)}</span></div>
        <div className="pay-summary-row net"><span>Total Net</span><span>{money(totalFees + totalProfit)}</span></div>
      </div>

      <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 12, lineHeight: 1.5 }}>
        Tap a row for full trip details — driver names are shown there. Miles and Gross update automatically from completed loads.
      </div>
    </div>
  );
}

function MonthChargeSelect({ value, onChange, chargeMap, label }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="field" style={{ position: "relative" }}>
      <label>{label}</label>
      <button type="button" className="month-select-btn" onClick={() => setOpen((v) => !v)}>
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
            {MONTH_ABBR.map((m) => {
              const charged = chargeMap[m];
              return (
                <div key={m} className={`month-charge-item ${value === m ? "selected" : ""}`} onClick={() => { onChange(m); setOpen(false); }}>
                  <span>{m}</span>
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
  const { tripForm, setTripForm, activeTripId, truckNumbers, driverNames, computeTripMilesGross, computeTripProfit, saveTrip, deleteTrip, closeTripDetail, driverByName, askConfirm, nextTripNumber, settings, setTab, setTripLoadsFilter, trips } = p;
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  function computeMonthCharges(field) {
    const map = {};
    const currentYear = (tripForm.startDate || "").slice(0, 4);
    (trips || []).forEach((t) => {
      if (t.truck !== tripForm.truck || t.id === activeTripId) return;
      if ((t.startDate || "").slice(0, 4) !== currentYear) return;
      const monthKey = field === "logbook" ? t.logbookMonth : t.insuranceMonth;
      const amount = num(t[field]);
      if (!monthKey || amount <= 0) return;
      map[monthKey] = (map[monthKey] || 0) + amount;
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
    setCancellationsList([...(tripForm.cancellationsList || []), { id: uid(), amount: 150, note: "" }]);
  }
  function updateCancellationRow(id, patch) {
    setCancellationsList((tripForm.cancellationsList || []).map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }
  function removeCancellationRow(id) {
    setCancellationsList((tripForm.cancellationsList || []).filter((item) => item.id !== id));
  }
  return (
    <div>
      <button type="button" className="back-btn" onClick={closeTripDetail}><ChevronLeft size={18} /> Back to Trips</button>
      <form onSubmit={saveTrip}>
        <div className="stop-card pickup-card">
        <div className="section-label">{activeTripId ? (tripForm.tripStatus === "pending" ? "Pending Trip" : `Trip ${tripForm.tripNumber}`) : (tripForm.tripStatus === "pending" ? "New Pending Trip" : "New Expense Record")}</div>
        <div className="field-row">
          <div className="field">
            <label>Trip Number</label>
            {tripForm.tripStatus === "pending" ? (
              <div className="pending-number-display">Pending</div>
            ) : (
              <input value={tripForm.tripNumber} onChange={(e) => setTripForm({ ...tripForm, tripNumber: e.target.value })} placeholder="e.g. 1" />
            )}
          </div>
          <div className="field">
            <label>Truck</label>
            <select value={tripForm.truck} onChange={(e) => setTripForm({ ...tripForm, truck: e.target.value })}>
              <option value="">Select…</option>
              {truckNumbers.map((tr) => <option key={tr} value={tr}>{tr}</option>)}
            </select>
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Status</label>
            <select value={tripForm.tripStatus || "active"} onChange={(e) => handleStatusChange(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
            </select>
          </div>
        </div>
        <div className="field-row date-row">
          <div className="field"><label>Start Date</label><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={tripForm.startDate} onChange={(e) => setTripForm({ ...tripForm, startDate: e.target.value })} /></div>
          <div className="field"><label>End Date</label><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={tripForm.endDate} onChange={(e) => setTripForm({ ...tripForm, endDate: e.target.value })} /></div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Driver 1</label>
            <select value={tripForm.driver1} onChange={(e) => setTripForm({ ...tripForm, driver1: e.target.value })}>
              <option value="">Select…</option>
              {driverNames.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
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
        </div>
        <div style={{ fontSize: 10.5, color: "var(--text-dim)", marginTop: -8, marginBottom: 14 }}>
          Driver 2 is a note only — it doesn't affect pay or dispatch fee.
        </div>

        {tripForm.truck && tripForm.startDate && tripForm.endDate && (() => {
          const live = computeTripMilesGross(tripForm.truck, tripForm.startDate, tripForm.endDate);
          return (
            <>
              <div className="field-row">
                <div className="field"><label>Miles (auto)</label><input readOnly value={live.miles} style={{ opacity: 0.8 }} /></div>
                <div className="field"><label>Gross Revenue (auto)</label><input readOnly value={money(live.gross)} style={{ opacity: 0.8 }} /></div>
              </div>
              <button
                type="button"
                className="btn secondary"
                style={{ marginTop: 0, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                onClick={() => {
                  const label = tripForm.tripStatus === "pending" ? "Pending Trip" : `Trip ${tripForm.tripNumber}`;
                  setTripLoadsFilter({ matchField: "truck", matchValue: tripForm.truck, start: tripForm.startDate, end: tripForm.endDate, label: `${label} · Truck ${tripForm.truck}` });
                  setTab("loads");
                }}
              >
                <FileText size={14} /> See Loads <span className="trip-number-pill">{live.loadCount}</span>
              </button>
            </>
          );
        })()}
        <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: -6, marginBottom: 0 }}>
          Pulled automatically from completed loads on this truck within the date range.
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
              <div className="field-row">{renderField(byKey.advances)}{renderField(byKey.fuelCost)}</div>
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
                />
              </div>
              <div className="field-row">
                {renderField(byKey.insurance)}
                <MonthChargeSelect
                  label="Insurance Month"
                  value={tripForm.insuranceMonth || ""}
                  onChange={(m) => setTripForm({ ...tripForm, insuranceMonth: m })}
                  chargeMap={computeMonthCharges("insurance")}
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
    runDashUpdate, dashReport, driverNames, truckNumbers, billTos,
    annualTaxYear, setAnnualTaxYear, annualTaxReport, companyInfo,
    setTab, setTripLoadsFilter,
  } = p;
  const [printingTaxDriver, setPrintingTaxDriver] = useState(null);
  const [printingTaxAll, setPrintingTaxAll] = useState(false);
  const [driverDropdownOpen, setDriverDropdownOpen] = useState(false);

  function toggleDriver(name) {
    setDashDriverFilter((prev) => prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]);
  }
  function viewGroupLoads(matchField, matchValue, label) {
    setTripLoadsFilter({ matchField, matchValue, start: dashReport.start, end: dashReport.end, label });
    setTab("loads");
  }

  const isAnnualTax = dashViewBy === "annualTax";
  const isBillTo = dashReport.viewBy === "billto";
  const isProfit = dashReport.viewBy === "profit";
  const isExpenses = dashReport.viewBy === "expenses";
  const isDispatcher = dashReport.viewBy === "dispatcher";
  const isMiles = dashReport.viewBy === "miles";
  const isOregon = dashReport.viewBy === "oregon";
  const isCancellations = dashReport.viewBy === "cancellations";
  const nameLabel = dashReport.viewBy === "truck" ? "Truck" : dashReport.viewBy === "billto" ? "Broker" : "Driver";

  return (
    <div>
      <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr" }}>
        <FilterCard
          icon={BarChart3} label="Report" value={dashViewBy} onChange={setDashViewBy} popoverKey="report" fullWidth
          options={[
            { value: "driver", label: "By Driver" },
            { value: "truck", label: "By Truck" },
            { value: "billto", label: "Broker" },
            { value: "profit", label: "Profit" },
            { value: "dispatcher", label: "Dispatcher" },
            { value: "miles", label: "Miles" },
            { value: "expenses", label: "Expenses" },
            { value: "oregon", label: "Oregon Permit" },
            { value: "cancellations", label: "Cancellations" },
            { value: "annualTax", label: "Annual Tax Report" },
          ]}
        />
      </div>

      {isAnnualTax && (
        <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr" }}>
          <FilterCard
            icon={Calendar} label="Tax Year" value={annualTaxYear} onChange={(v) => setAnnualTaxYear(Number(v))} popoverKey="taxYear" fullWidth
            options={(() => { const y = new Date().getFullYear(); const arr = []; for (let i = y; i >= y - 6; i--) arr.push({ value: i, label: String(i) }); return arr; })()}
          />
        </div>
      )}

      {!isAnnualTax && (dashViewBy === "dispatcher" ? (
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
              options={[{ value: "month", label: "This Month" }, { value: "year", label: "This Year" }, { value: "custom", label: "Custom Range" }]}
            />
          </div>
          {dashPeriod === "custom" && (
            <div className="field-row" style={{ marginTop: 6 }}>
              <div className="field"><label>Start</label><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={dashStart} onChange={(e) => setDashStart(e.target.value)} /></div>
              <div className="field"><label>End</label><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={dashEnd} onChange={(e) => setDashEnd(e.target.value)} /></div>
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
              options={[{ value: "month", label: "This Month" }, { value: "year", label: "This Year" }, { value: "custom", label: "Custom Range" }]}
            />
          </div>
          {dashPeriod === "custom" && (
            <div className="field-row" style={{ marginTop: 6 }}>
              <div className="field"><label>Start</label><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={dashStart} onChange={(e) => setDashStart(e.target.value)} /></div>
              <div className="field"><label>End</label><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={dashEnd} onChange={(e) => setDashEnd(e.target.value)} /></div>
            </div>
          )}
        </>
      ))}

      {!isAnnualTax && <button className="dash-update-btn-v2" onClick={runDashUpdate}><BarChart3 size={16} /> Update Report</button>}

      {!isAnnualTax && <div style={{ fontSize: 11.5, color: "var(--text-dim)", margin: "16px 0 10px" }}>{fmtDate(dashReport.start)} – {fmtDate(dashReport.end)}</div>}

      {isAnnualTax ? (
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
      ) : isDispatcher ? (
        !dashReport.selectedName ? (
          <div className="empty-state">Select a dispatcher above and tap Update.</div>
        ) : (
          <>
            <div className="stub-total-gross-box" style={{ marginTop: 0, marginBottom: 12 }}>
              <span>Company Total Gross ({fmtDate(dashReport.start)} – {fmtDate(dashReport.end)})</span>
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
      ) : isOregon ? (
        <>
          {dashReport.rows.length === 0 && <div className="empty-state">No Oregon miles recorded for this period.</div>}
          {dashReport.rows.length > 0 && (
            <>
              <table className="stub-loads-table">
                <thead>
                  <tr><th>#</th><th>Truck</th><th style={{ textAlign: "right" }}>Miles</th><th style={{ textAlign: "right" }}>Rate</th><th style={{ textAlign: "right" }}>Amount</th></tr>
                </thead>
                <tbody>
                  {dashReport.rows.map((r, i) => (
                    <tr key={r.key}>
                      <td>{i + 1}</td>
                      <td>{r.key}</td>
                      <td style={{ textAlign: "right" }}>{r.miles.toLocaleString()}</td>
                      <td style={{ textAlign: "right" }}>${dashReport.rate.toFixed(3)}</td>
                      <td style={{ textAlign: "right" }}>{money(r.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="stub-total-gross-box">
                <span>{dashReport.rows.length} Truck{dashReport.rows.length === 1 ? "" : "s"} · {dashReport.totalMiles.toLocaleString()} mi</span>
                <span>{money(dashReport.totalAmount)}</span>
              </div>
            </>
          )}
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 10, lineHeight: 1.5 }}>
            Oregon Miles are entered per load and summed by truck. Rate comes from Fleet → Settings — currently ${dashReport.rate.toFixed(3)}/mile.
          </div>
        </>
      ) : isCancellations ? (
        <>
          {dashReport.rows.length === 0 && <div className="empty-state">No cancellations recorded for this period.</div>}
          {dashReport.rows.length > 0 && (
            <>
              <table className="stub-loads-table">
                <thead>
                  <tr><th>#</th><th>Driver</th><th style={{ textAlign: "right" }}>Total Paid</th></tr>
                </thead>
                <tbody>
                  {dashReport.rows.map((r, i) => (
                    <tr key={r.key}>
                      <td>{i + 1}</td>
                      <td>{r.key}</td>
                      <td style={{ textAlign: "right" }}>{money(r.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="stub-total-gross-box">
                <span>{dashReport.rows.length} Driver{dashReport.rows.length === 1 ? "" : "s"}</span>
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
      {!isProfit && !isExpenses && !isMiles && !isDispatcher && !isOregon && !isAnnualTax && !isCancellations && (
      <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 10, lineHeight: 1.5 }}>
        Based on completed loads only. Tap multiple drivers in the list to select more than one; leave none selected to include all.
      </div>
      )}

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
              <table className="stub-loads-table">
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
          <div className="field"><label>Start</label><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={genStart} onChange={(e) => setGenStart(e.target.value)} /></div>
          <div className="field"><label>End</label><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={genEnd} onChange={(e) => setGenEnd(e.target.value)} /></div>
        </div>
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
        <FilterCard
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
          <FilterCard
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
              <div className="field"><label>Period Start</label><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={stubStart} onChange={(e) => setStubStart(e.target.value)} /></div>
              <div className="field"><label>Period End</label><input type="date" onClick={(e) => { try { e.target.showPicker(); } catch (_) {} }} value={stubEnd} onChange={(e) => setStubEnd(e.target.value)} /></div>
            </div>
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
  const items = [
    { key: "trucks", icon: Truck, name: "Trucks", count: trucks.length },
    { key: "drivers", icon: Users, name: "Drivers", count: drivers.length },
    { key: "shippers", icon: Warehouse, name: "Shippers", count: shippers.length },
    { key: "receivers", icon: Warehouse, name: "Receivers", count: receivers.length },
    { key: "billto", icon: Building2, name: "Bill To", count: billTos.length },
    { key: "dispatchers", icon: Users, name: "Dispatchers", count: dispatchers.length },
    { key: "ifta", icon: Calculator, name: "IFTA Calculator", count: null, description: "Quarterly fuel tax reports" },
    { key: "accounting", icon: FileText, name: "Accounting", count: null, description: "Invoicing & payment tracking" },
  ];
  return (
    <div>
      <div className="section-label-row" style={{ marginTop: 0 }}>
        <div className="section-label" style={{ marginTop: 0 }}>Fleet &amp; Master Data</div>
        <button className="fleet-settings-btn" onClick={() => setFleetView("settings")}><SettingsIcon size={15} /> Settings</button>
      </div>
      <div className="fleet-menu-grid">
        {items.map((it) => (
          <div className="fleet-menu-card" key={it.key} onClick={() => setFleetView(it.key)}>
            <div className="fleet-menu-card-icon-wrap"><it.icon size={26} /></div>
            <div className="fleet-menu-card-name">{it.name}</div>
            <div className="fleet-menu-card-sub">{typeof it.count === "number" ? `${it.count} record${it.count === 1 ? "" : "s"}` : it.description}</div>
          </div>
        ))}
      </div>
      <div className="fleet-credit">Built by Mirzaev 2026</div>
    </div>
  );
}

function TrucksPage(p) {
  const { setFleetView, truckForm, setTruckForm, saveTruck, editingTruckId, setEditingTruckId, trucks, editTruck, removeTruck, askConfirm } = p;
  return (
    <div>
      <button type="button" className="back-btn" onClick={() => setFleetView("menu")}><ChevronLeft size={18} /> Fleet</button>
      <div className="section-label">Trucks</div>
      <form onSubmit={saveTruck}>
        <div className="field-row">
          <div className="field"><label>Truck Number</label><input value={truckForm.number} onChange={(e) => setTruckForm({ ...truckForm, number: e.target.value })} placeholder="e.g. 571" /></div>
        </div>
        <div className="field-row">
          <div className="field"><label>Notes (optional)</label><input value={truckForm.notes} onChange={(e) => setTruckForm({ ...truckForm, notes: e.target.value })} placeholder="VIN, plate, etc." style={{ fontFamily: "Inter" }} /></div>
        </div>
        <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr" }}>
          <FilterCard
            icon={CheckCircle2} label="Status" value={truckForm.active === false ? "inactive" : "active"} onChange={(v) => setTruckForm({ ...truckForm, active: v === "active" })} fullWidth
            options={[{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }]}
          />
        </div>
        <button className="btn" type="submit">{editingTruckId ? "Update Truck" : "Add Truck"}</button>
        {editingTruckId && <button type="button" className="btn secondary" onClick={() => { setTruckForm(emptyTruck()); setEditingTruckId(null); }}>Cancel Edit</button>}
      </form>
      <div style={{ marginTop: 16 }}>
        {trucks.map((t) => (
          <div className="manage-row" key={t.id}>
            <div className="manage-row-head" style={{ cursor: "default" }}>
              <div>
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontWeight: 600 }}>{t.number}</span>
                {t.active === false && <span style={{ fontSize: 10, color: "var(--text-dim)", marginLeft: 6 }}>(Inactive)</span>}
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
  const { setFleetView, driverForm, setDriverForm, saveDriver, editingDriverId, setEditingDriverId, drivers, editDriver, removeDriver,
    expandedDriverId, setExpandedDriverId, history, loads, setStubDriver, setStubStart, setStubEnd, setStubDisplayAs, setTab, askConfirm, saveDriverNotes, setViewingStubRecord } = p;
  return (
    <div>
      <button type="button" className="back-btn" onClick={() => setFleetView("menu")}><ChevronLeft size={18} /> Fleet</button>
      <div className="section-label">Drivers</div>
      <form onSubmit={saveDriver}>
        <div className="field-row"><div className="field"><label>Name</label><input value={driverForm.name} onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })} placeholder="Driver name" style={{ fontFamily: "Inter" }} /></div></div>
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

      <div style={{ marginTop: 16 }}>
        {drivers.map((d) => {
          const open = expandedDriverId === d.id;
          return (
            <div className="manage-row" key={d.id}>
              <div className="manage-row-head" onClick={() => setExpandedDriverId(open ? null : d.id)}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{d.name}{d.active === false && <span style={{ fontSize: 10, color: "var(--text-dim)", fontWeight: 400, marginLeft: 6 }}>(Inactive)</span>}</div>
                  {d.companyName && <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 3 }}>{d.companyName}</div>}
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
      <form onSubmit={saveBillTo}>
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
      <form onSubmit={saveDispatcher}>
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
      <form onSubmit={handleSubmit}>
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
      <form onSubmit={handleSubmit}>
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
      .filter((l) => !q || norm(String(l.loadNumber || "")).includes(q) || norm(l.workOrder).includes(q) || norm(l.truck).includes(q))
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
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by load #, invoice #, work order, or truck…" />
      </div>

      <div className="driver-subnav">
        <button className={`driver-subnav-btn ${category === "completed" ? "active" : ""}`} onClick={() => setCategory("completed")}>Completed ({counts.completed})</button>
        <button className={`driver-subnav-btn ${category === "invoiced" ? "active" : ""}`} onClick={() => setCategory("invoiced")}>Invoiced ({counts.invoiced})</button>
        <button className={`driver-subnav-btn ${category === "paid" ? "active" : ""}`} onClick={() => setCategory("paid")}>Paid ({counts.paid})</button>
      </div>

      <div className="dash-filter-grid">
        <FilterCard
          icon={Truck} label="Truck" value={truckFilter} onChange={setTruckFilter}
          options={[{ value: "ALL", label: "All Trucks" }, ...truckNumbers.map((t) => ({ value: t, label: t }))]}
        />
        <FilterCard
          icon={Calendar} label="Month" value={monthFilter} onChange={(v) => setMonthFilter(Number(v))}
          options={[{ value: 0, label: "All Months" }, ...MONTH_NAMES.map((m, i) => ({ value: i + 1, label: m }))]}
        />
      </div>
      <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr" }}>
        <FilterCard
          icon={Calendar} label="Year" value={yearFilter} onChange={(v) => setYearFilter(Number(v))} fullWidth
          options={[{ value: 0, label: "All Years" }, ...years.map((y) => ({ value: y, label: String(y) }))]}
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
                  <span className="load-card-v2-meta"><Truck size={12} color="var(--text)" /> {l.truck || "—"}</span>
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
                <span className="load-card-v2-wo"><Pencil size={12} color="var(--green)" style={{ display: "inline", verticalAlign: -1 }} /> {l.workOrder || "—"}</span>
                <span className="load-card-v2-rate">{money(l.rate)}</span>
              </div>
            </div>
            {open && (
              <div className="card-detail">
                <div className="row-line"><span>Bill To</span><span>{l.billTo || "—"}</span></div>
                <div className="row-line"><span>Work Order</span><span>{l.workOrder || "—"}</span></div>
                <div className="row-line"><span>Driver / Truck</span><span>{l.driver || "—"} · {l.truck || "—"}</span></div>
                <div className="row-line"><span>Pickup</span><span>{fmtDate(l.pickupDate)} · {cityState(l.shipperCity, l.shipperState) || l.shipperName || "—"}</span></div>
                {(l.stops || []).map((s, i) => (
                  <div className="row-line" key={s.id || i}><span>{stopLabel(i, l.stops.length)}</span><span>{cityState(s.city, s.state) || s.receiverName || "—"}</span></div>
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
                      <a href={l.bolDataUri} download={l.bolFileName || "BOL.pdf"} style={{ fontSize: 12.5, color: "var(--accent)", display: "flex", alignItems: "center", gap: 6, textDecoration: "none" }}><FileText size={14} /> {l.bolFileName || "BOL.pdf"}</a>
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

function IftaCalculatorPage(p) {
  const { setFleetView, truckNumbers, iftaReports, iftaRates, saveIftaRates, saveIftaReport, deleteIftaReport, askConfirm, companyInfo, favoriteJurisdictions, toggleFavoriteJurisdiction } = p;
  const [mode, setMode] = useState("build"); // build | history
  const [report, setReport] = useState(emptyIftaReport(favoriteJurisdictions));
  const [activeReportId, setActiveReportId] = useState(null);
  const [showRates, setShowRates] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [viewingReport, setViewingReport] = useState(null);
  const [importError, setImportError] = useState("");
  const fileRef = useRef(null);
  const [histTruckFilter, setHistTruckFilter] = useState("ALL");
  const [histQuarterFilter, setHistQuarterFilter] = useState(0); // 0 = all
  const [histYearFilter, setHistYearFilter] = useState(0); // 0 = all
  const histYears = (() => { const y = new Date().getFullYear(); const arr = []; for (let i = y - 3; i <= Math.max(y + 1, 2040); i++) arr.push(i); return arr; })();

  const totals = computeIftaTotals(report.rows, iftaRates);
  const grandTotal = totals.netTotal + num(report.filingFee);
  const usedJurisdictions = new Set(report.rows.map((r) => r.jurisdiction));
  const availableJurisdictions = IFTA_JURISDICTIONS.filter((j) => !usedJurisdictions.has(j));

  function startNewReport() { setReport(emptyIftaReport(favoriteJurisdictions)); setActiveReportId(null); setMode("build"); }
  function openReportForEdit(r) { setReport({ quarter: r.quarter, year: r.year, truck: r.truck, rows: r.rows, filingFee: r.filingFee || "" }); setActiveReportId(r.id); setMode("build"); }

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

  function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setImportError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const wb = XLSX.read(ev.target.result, { type: "array" });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        if (!json.length) { setImportError("No rows found in that file."); return; }
        const headers = Object.keys(json[0]);
        const jCol = guessColumn(headers, ["jurisdiction", "state", "province", "st"]);
        const mCol = guessColumn(headers, ["miles", "mileage"]);
        const gCol = guessColumn(headers, ["gallons", "gal", "fuel"]);
        if (!jCol || !mCol || !gCol) { setImportError("Couldn't find Jurisdiction, Miles, and Gallons columns — check your sheet's headers."); return; }
        const merged = {};
        json.forEach((row) => {
          const code = String(row[jCol] || "").trim().toUpperCase();
          if (!code || !IFTA_JURISDICTIONS.includes(code)) return;
          merged[code] = merged[code] || { jurisdiction: code, miles: 0, gallons: 0 };
          merged[code].miles += num(row[mCol]);
          merged[code].gallons += num(row[gCol]);
        });
        const rows = Object.values(merged);
        if (rows.length === 0) { setImportError("No recognizable jurisdiction codes found (use 2-letter codes like CA, OR, WA)."); return; }
        setReport((r) => ({ ...r, rows }));
      } catch { setImportError("Couldn't read that file — make sure it's .xlsx, .xls, or .csv."); }
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
                <div className="stub-meta2-line">Truck {viewingReport.truck === "ALL" ? "All Trucks" : viewingReport.truck}</div>
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
      </div>

      {mode === "history" && (
        <div>
          <div className="dash-filter-grid">
            <FilterCard
              icon={Truck} label="Truck" value={histTruckFilter} onChange={setHistTruckFilter}
              options={[{ value: "ALL", label: "All Trucks" }, ...truckNumbers.map((t) => ({ value: t, label: t }))]}
            />
            <FilterCard
              icon={Calendar} label="Quarter" value={histQuarterFilter} onChange={(v) => setHistQuarterFilter(Number(v))}
              options={[{ value: 0, label: "All Quarters" }, { value: 1, label: "Q1" }, { value: 2, label: "Q2" }, { value: 3, label: "Q3" }, { value: 4, label: "Q4" }]}
            />
          </div>
          <div className="dash-filter-grid" style={{ gridTemplateColumns: "1fr" }}>
            <FilterCard
              icon={Calendar} label="Year" value={histYearFilter} onChange={(v) => setHistYearFilter(Number(v))} fullWidth
              options={[{ value: 0, label: "All Years" }, ...histYears.map((y) => ({ value: y, label: String(y) }))]}
            />
          </div>
          {driverHistorySorted.length === 0 && <div className="empty-state">No saved IFTA reports match these filters.</div>}
          {driverHistorySorted.map((r) => {
            const rt = computeIftaTotals(r.rows, iftaRates);
            const rGrand = rt.netTotal + num(r.filingFee);
            return (
              <div className="statement-card" key={r.id} onClick={() => setViewingReport(r)}>
                <div className="statement-card-date" style={{ marginBottom: 6 }}>Q{r.quarter} {r.year} — {r.truck === "ALL" ? "All Trucks" : `Truck ${r.truck}`}</div>
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
          <div className="dash-filter-grid">
            <FilterCard
              icon={Truck} label="Truck" value={report.truck} onChange={(v) => setReport({ ...report, truck: v })}
              options={[{ value: "ALL", label: "All Trucks (Combined)" }, ...truckNumbers.map((t) => ({ value: t, label: t }))]}
            />
            <FilterCard
              icon={Calendar} label="Quarter" value={report.quarter} onChange={(v) => setReport({ ...report, quarter: Number(v) })}
              options={[{ value: 1, label: "Q1 (Jan–Mar)" }, { value: 2, label: "Q2 (Apr–Jun)" }, { value: 3, label: "Q3 (Jul–Sep)" }, { value: 4, label: "Q4 (Oct–Dec)" }]}
            />
          </div>
          <div className="field-row">
            <div className="field"><label>Year</label><input type="number" value={report.year} onChange={(e) => setReport({ ...report, year: Number(e.target.value) || report.year })} /></div>
          </div>

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
          <button type="button" className="import-btn" onClick={() => fileRef.current && fileRef.current.click()}><UploadCloud size={14} /> Upload Sheet (Jurisdiction / Miles / Gallons)</button>
          {importError && <div style={{ fontSize: 11, color: "var(--red)", marginTop: -10, marginBottom: 14 }}>{importError}</div>}

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

function SettingsTab({ setFleetView, settings, saveStartingNumber, nextLoadNumber, saveSettings, onSignOut, askConfirm }) {
  const [themeChoice, setThemeChoice] = useState(settings.theme || "dark");
  const [themeSaved, setThemeSaved] = useState(false);
  const [startingNumberInput, setStartingNumberInput] = useState(String(settings.startingLoadNumber ?? ""));
  const [startingNumberSaved, setStartingNumberSaved] = useState(false);
  const [orRateInput, setOrRateInput] = useState(String(settings.oregonPermitRate ?? 0.251));
  const [orRateSaved, setOrRateSaved] = useState(false);
  const [company, setCompany] = useState({
    companyName: settings.companyName || "", companyAddress: settings.companyAddress || "",
    dotNumber: settings.dotNumber || "", companyEmail: settings.companyEmail || "",
  });
  const [companySaved, setCompanySaved] = useState(false);
  const [logoSaved, setLogoSaved] = useState(false);
  const [logoError, setLogoError] = useState("");
  const logoInputRef = useRef(null);
  const [backupState, setBackupState] = useState("idle"); // idle | working | done | error
  const [importState, setImportState] = useState("idle"); // idle | working | done | error
  const [importError, setImportError] = useState("");
  const importInputRef = useRef(null);
  const [pinCurrent, setPinCurrent] = useState("");
  const [pinNew, setPinNew] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [pinMsg, setPinMsg] = useState("");
  const [pinMsgIsError, setPinMsgIsError] = useState(false);

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

  async function handleSaveTheme() { await saveSettings({ theme: themeChoice }); setThemeSaved(true); setTimeout(() => setThemeSaved(false), 1400); }
  async function handleSaveCompany() { await saveSettings(company); setCompanySaved(true); setTimeout(() => setCompanySaved(false), 1400); }

  async function handleExportBackup() {
    setBackupState("working");
    try {
      const keys = ["loads", "trucks", "drivers", "billTos", "shippers", "receivers", "tripExpenses", "payStubHistory", "settings", "iftaReports", "iftaRates", "iftaFavorites", "dispatchers"];
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
      const keys = ["loads", "trucks", "drivers", "billTos", "shippers", "receivers", "tripExpenses", "payStubHistory", "settings", "iftaReports", "iftaRates", "iftaFavorites", "dispatchers"];
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

  return (
    <div>
      <button type="button" className="back-btn" onClick={() => setFleetView("menu")}><ChevronLeft size={18} /> Fleet</button>
      <div className="section-label" style={{ marginTop: 0 }}>Settings</div>

      <div className="settings-card">
        <label style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-dim)", fontWeight: 600, display: "block", marginBottom: 8 }}>Appearance</label>
        <div className="preset-row" style={{ marginBottom: 10 }}>
          <div className={`preset-btn ${themeChoice === "dark" ? "active" : ""}`} onClick={() => setThemeChoice("dark")}>Dark</div>
          <div className={`preset-btn ${themeChoice === "light" ? "active" : ""}`} onClick={() => setThemeChoice("light")}>Light</div>
        </div>
        <button className="btn" style={{ marginTop: 0 }} onClick={handleSaveTheme}>{themeSaved ? "Saved ✓" : "Save Theme"}</button>
      </div>

      <div className="settings-card">
        <label style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-dim)", fontWeight: 600, display: "block", marginBottom: 10 }}>Company Info</label>
        <div className="field-row"><div className="field"><label>Company Name</label><input value={company.companyName} onChange={(e) => setCompany({ ...company, companyName: e.target.value })} placeholder="e.g. TruxFlow Logistics LLC" style={{ fontFamily: "Inter" }} /></div></div>
        <div className="field-row"><div className="field"><label>Address</label><input value={company.companyAddress} onChange={(e) => setCompany({ ...company, companyAddress: e.target.value })} placeholder="Street, City, ST ZIP" style={{ fontFamily: "Inter" }} /></div></div>
        <div className="field-row">
          <div className="field"><label>DOT Number</label><input value={company.dotNumber} onChange={(e) => setCompany({ ...company, dotNumber: e.target.value })} placeholder="DOT #" /></div>
          <div className="field"><label>Email</label><input value={company.companyEmail} onChange={(e) => setCompany({ ...company, companyEmail: e.target.value })} placeholder="email@company.com" style={{ fontFamily: "Inter" }} /></div>
        </div>
        <button className="btn" style={{ marginTop: 4 }} onClick={handleSaveCompany}>{companySaved ? "Saved ✓" : "Save Company Info"}</button>

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

      {onSignOut && (
        <div className="settings-card">
          <label style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-dim)", fontWeight: 600, display: "block", marginBottom: 10 }}>Account</label>
          <button className="btn danger" style={{ marginTop: 0 }} onClick={onSignOut}>Sign Out</button>
        </div>
      )}
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

// =====================================================================
// Supabase — cloud login + cross-device sync
// =====================================================================
const SUPABASE_URL = "https://zhxhfajlglhfoqftsvmp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoeGhmYWpsZ2xoZm9xZnRzdm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5OTEzMTYsImV4cCI6MjEwMDU2NzMxNn0.BaOVHmCgYWCSshOFhcV00P6GFjTl41EW4yZo9Imdn_k";
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---- Supabase-backed storage shim — drop-in replacement for window.storage ----
let currentUserId = null;
window.storage = {
  async get(key) {
    if (!currentUserId) throw new Error("not signed in");
    const { data, error } = await sb.from("app_data").select("value").eq("user_id", currentUserId).eq("key", key).maybeSingle();
    if (error) throw error;
    if (!data) { const e = new Error("not found: " + key); e.notFound = true; throw e; }
    return { key, value: data.value, shared: false };
  },
  async set(key, value) {
    if (!currentUserId) throw new Error("not signed in");
    const { error } = await sb.from("app_data").upsert({ user_id: currentUserId, key, value, updated_at: new Date().toISOString() });
    if (error) throw error;
    return { key, value, shared: false };
  },
  async delete(key) {
    if (!currentUserId) throw new Error("not signed in");
    const { error } = await sb.from("app_data").delete().eq("user_id", currentUserId).eq("key", key);
    if (error) throw error;
    return { key, deleted: true, shared: false };
  },
  async list(prefix) {
    if (!currentUserId) throw new Error("not signed in");
    let query = sb.from("app_data").select("key").eq("user_id", currentUserId);
    if (prefix) query = query.like("key", prefix + "%");
    const { data, error } = await query;
    if (error) throw error;
    return { keys: (data || []).map((r) => r.key), prefix, shared: false };
  },
};

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
    const { data: existing } = await sb.from("app_data").select("key").eq("user_id", currentUserId).limit(1);
    if (existing && existing.length > 0) return; // already has cloud data — don't overwrite it
    const rows = localKeys.map((k) => ({
      user_id: currentUserId,
      key: k,
      value: localStorage.getItem(LOCAL_PREFIX + k),
      updated_at: new Date().toISOString(),
    }));
    await sb.from("app_data").upsert(rows);
  } catch (e) {
    console.error("migration error", e);
  }
}

// ---- Login / sign-up screen ----
function LoginScreen() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setInfo(""); setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await sb.auth.signUp({ email, password });
        if (error) throw error;
        setInfo("Account created — check your email to confirm, then sign in.");
        setMode("signin");
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
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#14181F", padding: 20, fontFamily: "Inter, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 360, background: "#1D2430", border: "1px solid #303A4A", borderRadius: 16, padding: 28 }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 26, fontWeight: 700 }}>
            <span style={{ color: "#F2A93B" }}>Trux</span><span style={{ color: "#4A90D9" }}>Flow</span>
          </div>
          <div style={{ color: "#8A93A3", fontSize: 12, marginTop: 4 }}>{mode === "signin" ? "Sign in to your account" : "Create your account"}</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Password</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
          </div>
          {error && <div style={{ color: "#D6584F", fontSize: 12.5, marginBottom: 14 }}>{error}</div>}
          {info && <div style={{ color: "#5FA777", fontSize: 12.5, marginBottom: 14 }}>{info}</div>}
          <button type="submit" disabled={loading} style={{ width: "100%", background: "#F2A93B", color: "#1A1300", border: "none", borderRadius: 10, padding: 13, fontFamily: "'Oswald', sans-serif", fontSize: 14.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, cursor: "pointer" }}>
            {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 12.5, color: "#8A93A3" }}>
          {mode === "signin" ? (
            <span>Don't have an account?{" "}
              <span style={{ color: "#F2A93B", cursor: "pointer" }} onClick={() => { setMode("signup"); setError(""); setInfo(""); }}>Create one</span>
            </span>
          ) : (
            <span>Already have an account?{" "}
              <span style={{ color: "#F2A93B", cursor: "pointer" }} onClick={() => { setMode("signin"); setError(""); setInfo(""); }}>Sign in</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Auth gate: decides Loading / Login / App ----
function AuthGate() {
  const [session, setSession] = useState(undefined); // undefined = loading, null = signed out
  const [ready, setReady] = useState(false);
  const migratedUserRef = useRef(null);

  useEffect(() => {
    sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = sb.auth.onAuthStateChange((_event, newSession) => {
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
      migrateLocalDataIfNeeded().finally(() => {
        if (!cancelled) { migratedUserRef.current = session.user.id; setReady(true); }
      });
    } else {
      currentUserId = null;
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
  if (!ready) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#14181F", color: "#8A93A3", fontFamily: "Inter, sans-serif" }}>Setting up your account…</div>;
  }
  return <DispatchApp key={session.user.id} onSignOut={() => sb.auth.signOut()} userEmail={session.user.email} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<AuthGate />);
