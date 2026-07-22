import { useState, useEffect, useMemo, useRef } from "react";
import * as XLSX from "xlsx";
import {
  Plus, Truck, Package, DollarSign, BarChart3, FileText, X, Trash2, Pencil,
  ChevronDown, ChevronRight, ChevronLeft, ChevronUp, Printer, MapPin, CheckCircle2,
  Settings as SettingsIcon, Users, Building2, Warehouse, UploadCloud, Search
} from "lucide-react";

const LOGO_DATA_URI = "data:image/png;base64,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";
const WORDMARK_DATA_URI = "data:image/webp;base64,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";
const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');`;

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
function todayISO() { return new Date().toISOString().slice(0, 10); }
function daysAgoISO(n) { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); }
function inRange(dateStr, start, end) { if (!dateStr) return false; return dateStr >= start && dateStr <= end; }
function overlaps(aStart, aEnd, bStart, bEnd) { return aStart <= bEnd && aEnd >= bStart; }
function uid() { return Date.now() + Math.random(); }
function addr1line(street, city, state, zip) { return [street, city && state ? `${city}, ${state}` : city || state, zip].filter(Boolean).join(", "); }
function cityState(city, state) { return [city, state].filter(Boolean).join(", "); }
function abbrevName(name) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0][0]}. ${parts[parts.length - 1]}`;
}
function norm(s) { return (s || "").trim().toLowerCase(); }

const emptyStop = () => ({ id: null, receiverName: "", city: "", state: "", zip: "" });
const emptyLoad = () => ({
  id: null, loadNumber: null, billTo: "", workOrder: "", rate: "",
  driver: "", truck: "",
  shipperName: "", shipperCity: "", shipperState: "", shipperZip: "", pickupDate: "",
  stops: [{ ...emptyStop(), id: uid() }], deliveryDate: "",
  loadedMiles: "", deadheadMiles: "", status: "active", paidStatus: "unpaid", paidStubId: null,
});
function normalizeLoad(load) {
  if (load.stops && load.stops.length) {
    return { paidStatus: "unpaid", paidStubId: null, ...load };
  }
  const stop = { id: uid(), receiverName: load.receiverName || "", city: load.receiverCity || "", state: load.receiverState || "", zip: load.receiverZip || "" };
  return { ...load, stops: [stop], paidStatus: load.paidStatus || "unpaid", paidStubId: load.paidStubId || null };
}
function stopLabel(index, total) { return index === total - 1 ? "Final Delivery" : `Stop ${index + 1}`; }
function routeSummary(load) {
  const stops = load.stops || [];
  const origin = cityState(load.shipperCity, load.shipperState) || load.shipperName || "—";
  if (stops.length === 0) return origin;
  const last = stops[stops.length - 1];
  const dest = cityState(last.city, last.state) || last.receiverName || "—";
  const extra = stops.length > 1 ? ` (+${stops.length - 1} stop${stops.length - 1 > 1 ? "s" : ""})` : "";
  return `${origin} → ${dest}${extra}`;
}
function routeFull(load) {
  const stops = load.stops || [];
  const origin = `Pickup: ${cityState(load.shipperCity, load.shipperState) || load.shipperName || "—"}`;
  const legs = stops.map((s, i) => `${stopLabel(i, stops.length)}: ${cityState(s.city, s.state) || s.receiverName || "—"}`);
  return [origin, ...legs].join(" → ");
}
const emptyDriver = () => ({ id: null, name: "", companyName: "", payType: "percent", rate: "", dispatchFeePercent: "", notes: "" });
const emptyTruck = () => ({ id: null, number: "", notes: "" });
const emptyBillTo = () => ({ id: null, name: "", contact: "", phone: "", email: "" });
const emptyShipper = () => ({ id: null, companyName: "", warehouseCode: "", street: "", city: "", state: "", zip: "", contact: "" });
const emptyReceiver = () => ({ id: null, companyName: "", warehouseCode: "", street: "", city: "", state: "", zip: "", contact: "" });
const emptyTrip = () => ({
  id: null, tripNumber: "", truck: "", startDate: daysAgoISO(6), endDate: todayISO(),
  driver1: "", driver2: "",
  driverPay: "", advances: "", fuelCost: "", orPermit: "", logbook: "", insurance: "",
  otherCharges: "", otherNotes: "", refunds: "", truckPay: "",
  mileageHourlyMode: false, paidStatus: "unpaid", paidStubId: null,
});
function normalizeTrip(t) { return { paidStatus: "unpaid", paidStubId: null, ...t }; }

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
const DEFAULT_DISPATCH_FEE = 13;
const DEFAULT_DISPATCHER_PAY = 3;
function isMileageOrHourly(driver) {
  return !!(driver && driver.payType === "cpm");
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
    ? { id: uid(), name: d, companyName: "", payType: "percent", rate: "", dispatchFeePercent: "", notes: "" }
    : { dispatchFeePercent: "", notes: "", ...d }));
}
function normalizeTrucks(raw) {
  return raw.map((t) => (typeof t === "string" ? { id: uid(), number: t, notes: "" } : t));
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

export default function DispatchApp() {
  const [tab, setTab] = useState("loads");
  const [loaded, setLoaded] = useState(false);
  const [trucks, setTrucks] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [billTos, setBillTos] = useState([]);
  const [shippers, setShippers] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [loads, setLoads] = useState([]);
  const [trips, setTrips] = useState([]);
  const [history, setHistory] = useState([]);
  const [settings, setSettings] = useState({ startingLoadNumber: 1000, theme: "dark", companyName: "", companyAddress: "", dotNumber: "", companyEmail: "", dispatchFeeSchedule: [], dispatcherPaySchedule: [] });

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

  const [dashPeriod, setDashPeriod] = useState("month"); // month | year | custom
  const [dashStart, setDashStart] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-01`);
  const [dashEnd, setDashEnd] = useState(todayISO());
  const [dashViewBy, setDashViewBy] = useState("driver"); // driver | truck | billto
  const [dashDriverFilter, setDashDriverFilter] = useState([]); // [] = all
  const [dashTruckFilter, setDashTruckFilter] = useState("ALL");
  const [dashBillToFilter, setDashBillToFilter] = useState("ALL");
  const [dashApplied, setDashApplied] = useState(null); // snapshot applied on "Update"

  const [stubDriver, setStubDriver] = useState("");
  const [stubStart, setStubStart] = useState(daysAgoISO(6));
  const [stubEnd, setStubEnd] = useState(todayISO());
  const [stubDisplayAs, setStubDisplayAs] = useState("driver");
  const [viewingStubRecord, setViewingStubRecord] = useState(null); // frozen historical snapshot being viewed

  const [saveState, setSaveState] = useState("idle");

  useEffect(() => {
    (async () => {
      try {
        const keys = ["loads", "trucks", "drivers", "billTos", "shippers", "receivers", "tripExpenses", "payStubHistory", "settings"];
        const results = await Promise.all(keys.map((k) => window.storage.get(k).catch(() => null)));
        const [t, tr, dr, bt, sh, rc, tp, hi, st] = results;
        setLoads((t ? JSON.parse(t.value) : []).map(normalizeLoad));
        setTrucks(normalizeTrucks(tr ? JSON.parse(tr.value) : []));
        setDrivers(normalizeDrivers(dr ? JSON.parse(dr.value) : []));
        setBillTos(bt ? JSON.parse(bt.value) : []);
        setShippers(sh ? JSON.parse(sh.value) : []);
        setReceivers(rc ? JSON.parse(rc.value) : []);
        setTrips((tp ? JSON.parse(tp.value) : []).map(normalizeTrip));
        setHistory(hi ? JSON.parse(hi.value) : []);
        const settingsDefaults = { startingLoadNumber: 1000, theme: "dark", companyName: "", companyAddress: "", dotNumber: "", companyEmail: "", dispatchFeeSchedule: [], dispatcherPaySchedule: [] };
        setSettings(st ? { ...settingsDefaults, ...JSON.parse(st.value) } : settingsDefaults);
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
    return nums.length ? Math.max(...nums) + 1 : num(settings.startingLoadNumber) || 1000;
  }, [loads, settings]);

  const nextStubNumber = useMemo(() => {
    const nums = history.map((h) => h.stubNumber).filter((n) => typeof n === "number");
    return nums.length ? Math.max(...nums) + 1 : 1;
  }, [history]);

  // ---- Loads ----
  function openNewLoad() { setLoadForm(emptyLoad()); setEditingLoadId(null); setMilesStatus(""); setShowLoadForm(true); }
  async function saveLoad(e) {
    e.preventDefault();
    if (!loadForm.billTo || !loadForm.truck) return;
    let updated;
    if (editingLoadId) updated = loads.map((l) => (l.id === editingLoadId ? { ...loadForm, id: editingLoadId } : l));
    else updated = [...loads, { ...loadForm, id: uid(), loadNumber: nextLoadNumber, status: "active", paidStatus: "unpaid", paidStubId: null }];
    await persist("loads", updated, setLoads);
    setShowLoadForm(false); setLoadForm(emptyLoad()); setEditingLoadId(null);
  }
  function editLoad(l) { setLoadForm({ ...emptyLoad(), ...l, stops: (l.stops || []).map((s) => ({ ...s })) }); setEditingLoadId(l.id); setShowLoadForm(true); }
  async function deleteLoad(id) { await persist("loads", loads.filter((l) => l.id !== id), setLoads); }
  async function closeLoad(id) { await persist("loads", loads.map((l) => (l.id === id ? { ...l, status: "completed" } : l)), setLoads); }
  async function closeAllActiveLoads() { await persist("loads", loads.map((l) => (l.status === "active" ? { ...l, status: "completed" } : l)), setLoads); }
  async function reopenLoad(id) { await persist("loads", loads.map((l) => (l.id === id ? { ...l, status: "active" } : l)), setLoads); }

  function applyShipper(name) {
    const match = shippers.find((s) => norm(s.companyName) === norm(name) || (s.warehouseCode && norm(s.warehouseCode) === norm(name)));
    if (match) {
      setLoadForm((f) => ({ ...f, shipperName: match.companyName, shipperCity: match.city, shipperState: match.state, shipperZip: match.zip }));
    } else {
      setLoadForm((f) => ({ ...f, shipperName: name }));
    }
  }
  function applyReceiverToStop(stopId, name) {
    const match = receivers.find((r) => norm(r.companyName) === norm(name) || (r.warehouseCode && norm(r.warehouseCode) === norm(name)));
    if (match) updateStop(stopId, { receiverName: match.companyName, city: match.city, state: match.state, zip: match.zip });
    else updateStop(stopId, { receiverName: name });
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
    return { miles: matching.reduce((s, l) => s + num(l.loadedMiles), 0), gross: matching.reduce((s, l) => s + num(l.rate), 0), loadCount: matching.length };
  }
  function computeTripProfit(record) {
    const { miles, gross } = computeTripMilesGross(record.truck, record.startDate, record.endDate);
    const expenseSum = TRIP_EXPENSE_FIELDS.reduce((s, f) => s + num(record[f.key]), 0);
    return { miles, gross, totalProfit: gross - expenseSum + num(record.refunds) };
  }
  // Per-trip financial breakdown: percent/flat/salary drivers show a Dispatch Fee
  // (using that driver's own Fleet %); per-mile/hourly drivers show company profit
  // instead, since they don't get charged a dispatch fee.
  function computeTripFinancials(record) {
    const { miles, gross } = computeTripMilesGross(record.truck, record.startDate, record.endDate);
    const driver = driverByName[record.driver1];
    const companyExpenses = DRIVER_DEDUCTION_FIELDS.reduce((s, f) => s + num(record[f.key]), 0);
    if (isMileageOrHourly(driver)) {
      const driverPay = num(driver.rate) * miles;
      const refunds = num(record.refunds);
      const profit = gross - driverPay - companyExpenses - refunds;
      return { miles, gross, mode: "profit", dispatchFee: 0, profit, feePct: 0 };
    }
    const feePct = dispatchFeePercentFor(driver);
    const dispatchFee = gross * (feePct / 100);
    return { miles, gross, mode: "fee", dispatchFee, profit: 0, feePct };
  }
  const nextTripNumber = useMemo(() => {
    const nums = trips.map((t) => parseFloat(t.tripNumber)).filter((n) => !isNaN(n));
    return nums.length ? Math.max(...nums) + 1 : 1;
  }, [trips]);
  function openNewTrip() { setTripForm({ ...emptyTrip(), tripNumber: String(nextTripNumber) }); setActiveTripId(null); setExpensesView("detail"); }
  function openTrip(t) { setTripForm({ ...t }); setActiveTripId(t.id); setExpensesView("detail"); }
  function closeTripDetail() { setExpensesView("list"); setTripForm(emptyTrip()); setActiveTripId(null); }
  async function saveTrip(e) {
    e.preventDefault();
    if (!tripForm.tripNumber || !tripForm.truck) return;
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
  function editTruck(t) { setTruckForm({ ...t }); setEditingTruckId(t.id); }
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
  function editDriver(d) { setDriverForm({ ...d }); setEditingDriverId(d.id); }
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
    let updated;
    if (editingBillToId) updated = billTos.map((b) => (b.id === editingBillToId ? { ...billToForm, id: editingBillToId, name } : b));
    else updated = [...billTos, { ...billToForm, id: uid(), name }];
    await persist("billTos", updated, setBillTos);
    setBillToForm(emptyBillTo()); setEditingBillToId(null);
  }
  function editBillTo(b) { setBillToForm({ ...b }); setEditingBillToId(b.id); }
  async function removeBillTo(id) { await persist("billTos", billTos.filter((b) => b.id !== id), setBillTos); }

  // ---- Fleet: shippers ----
  async function saveShipper(e) {
    e.preventDefault();
    const name = shipperForm.companyName.trim();
    if (!name) return;
    let updated;
    if (editingShipperId) updated = shippers.map((s) => (s.id === editingShipperId ? { ...shipperForm, id: editingShipperId, companyName: name } : s));
    else updated = [...shippers, { ...shipperForm, id: uid(), companyName: name }];
    await persist("shippers", updated, setShippers);
    setShipperForm(emptyShipper()); setEditingShipperId(null);
  }
  function editShipper(s) { setShipperForm({ ...s }); setEditingShipperId(s.id); }
  async function removeShipper(id) { await persist("shippers", shippers.filter((s) => s.id !== id), setShippers); }

  // ---- Fleet: receivers ----
  async function saveReceiver(e) {
    e.preventDefault();
    const name = receiverForm.companyName.trim();
    if (!name) return;
    let updated;
    if (editingReceiverId) updated = receivers.map((r) => (r.id === editingReceiverId ? { ...receiverForm, id: editingReceiverId, companyName: name } : r));
    else updated = [...receivers, { ...receiverForm, id: uid(), companyName: name }];
    await persist("receivers", updated, setReceivers);
    setReceiverForm(emptyReceiver()); setEditingReceiverId(null);
  }
  function editReceiver(r) { setReceiverForm({ ...r }); setEditingReceiverId(r.id); }
  async function removeReceiver(id) { await persist("receivers", receivers.filter((r) => r.id !== id), setReceivers); }

  async function saveStartingNumber(v) { await persist("settings", { ...settings, startingLoadNumber: num(v) || 1000 }, setSettings); }
  async function saveSettings(patch) { await persist("settings", { ...settings, ...patch }, setSettings); }
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

  const filteredLoads = useMemo(() => {
    let list = loads;
    if (filterTruck !== "ALL") list = list.filter((l) => l.truck === filterTruck);
    if (filterStatus !== "all") list = list.filter((l) => l.status === filterStatus);
    return list;
  }, [loads, filterTruck, filterStatus]);

  function onDashPeriodChange(period) {
    setDashPeriod(period);
    if (period === "month") { setDashStart(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-01`); setDashEnd(todayISO()); }
    else if (period === "year") { setDashStart(`${new Date().getFullYear()}-01-01`); setDashEnd(todayISO()); }
  }

  function runDashUpdate() {
    setDashApplied({
      start: dashStart, end: dashEnd, viewBy: dashViewBy,
      drivers: dashDriverFilter, truck: dashTruckFilter, billTo: dashBillToFilter,
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
    const driverTrips = trips.filter((t) => (t.driver1 === driverName || t.driver2 === driverName) && (t.paidStatus || "unpaid") !== "paid" && overlaps(t.startDate, t.endDate, start, end));
    const expenseBreakdown = {};
    DRIVER_DEDUCTION_FIELDS.forEach((f) => {
      const appliesToThisDriver = !isMileage || f.key === "otherCharges";
      expenseBreakdown[f.key] = appliesToThisDriver ? driverTrips.reduce((s, t) => s + num(t[f.key]), 0) : 0;
    });
    const expenseTotal = DRIVER_DEDUCTION_FIELDS.reduce((s, f) => s + expenseBreakdown[f.key], 0);
    const refunds = driverTrips.reduce((s, t) => s + num(t.refunds), 0);
    const netPay = grossPay - dispatchFee - expenseTotal + refunds;
    const trucksUsed = [...new Set(loadPays.map((l) => l.truck))];
    const tripIds = driverTrips.map((t) => t.id);
    return { driver, loadPays, grossPay, isMileage, loadedMilesPay, emptyMilesPay, dispatchFeePercent, dispatchFee, expenseBreakdown, expenseTotal, refunds, netPay, trucksUsed, tripIds };
  }

  const dashReport = useMemo(() => {
    const f = dashApplied || { start: dashStart, end: dashEnd, viewBy: dashViewBy, drivers: dashDriverFilter, truck: dashTruckFilter, billTo: dashBillToFilter };
    let scoped = loads.filter((l) => l.status === "completed" && inRange(l.deliveryDate || l.pickupDate, f.start, f.end));
    if (f.drivers && f.drivers.length) scoped = scoped.filter((l) => f.drivers.includes(l.driver));
    if (f.truck && f.truck !== "ALL") scoped = scoped.filter((l) => l.truck === f.truck);
    if (f.billTo && f.billTo !== "ALL") scoped = scoped.filter((l) => l.billTo === f.billTo);

    if (f.viewBy === "expenses") {
      let scopedTrips = trips.filter((t) => overlaps(t.startDate, t.endDate, f.start, f.end));
      if (f.drivers && f.drivers.length) scopedTrips = scopedTrips.filter((t) => f.drivers.includes(t.driver1) || f.drivers.includes(t.driver2));
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
      // their dispatch fee; per-mile/hourly drivers contribute actual company profit
      // (Gross − Driver Pay − Company Expenses − Refunds), since they aren't charged a fee.
      const groups = {};
      scoped.forEach((l) => {
        const key = l.driver || "—";
        const driver = driverByName[l.driver];
        groups[key] = groups[key] || { loads: 0, gross: 0, driverPayTotal: 0, isMileage: isMileageOrHourly(driver) };
        groups[key].loads += 1;
        groups[key].gross += num(l.rate);
        if (groups[key].isMileage) groups[key].driverPayTotal += computeLoadPay(driver, l);
      });
      const rows = Object.entries(groups).map(([key, g]) => {
        let dispatchFee;
        if (g.isMileage) {
          const driverTrips = trips.filter((t) => (t.driver1 === key || t.driver2 === key) && overlaps(t.startDate, t.endDate, f.start, f.end));
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
  }, [loads, drivers, trips, dashApplied, dashStart, dashEnd, dashViewBy, dashDriverFilter, dashTruckFilter, dashBillToFilter]);

  const stub = useMemo(() => { if (!stubDriver) return null; return computeDriverPay(stubDriver, stubStart, stubEnd); }, [loads, drivers, trips, stubDriver, stubStart, stubEnd]);

  async function saveAndPrintStub() {
    if (!stub || !stubDriver) return;
    const loadSnapshots = stub.loadPays.map((l) => ({ loadId: l.id, loadNumber: l.loadNumber, billTo: l.billTo, route: routeFull(l), miles: num(l.loadedMiles), driverPay: l.driverPay }));
    const record = {
      id: uid(), stubNumber: nextStubNumber, driverName: stubDriver, displayedAs: resolveDisplayName(stub.driver, stubDisplayAs),
      generatedAt: new Date().toISOString(), periodStart: stubStart, periodEnd: stubEnd,
      loadIds: stub.loadPays.map((l) => l.id), loadSnapshots, tripIds: stub.tripIds || [],
      grossPay: stub.grossPay, isMileage: stub.isMileage, loadedMilesPay: stub.loadedMilesPay, emptyMilesPay: stub.emptyMilesPay,
      dispatchFeePercent: stub.dispatchFeePercent, dispatchFee: stub.dispatchFee,
      expenseBreakdown: stub.expenseBreakdown, expenseTotal: stub.expenseTotal,
      refunds: stub.refunds, netPay: stub.netPay, trucksUsed: stub.trucksUsed, loadCount: stub.loadPays.length,
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
    window.print();
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
            <img src={WORDMARK_DATA_URI} alt="TruxFlow" className="header-wordmark-img" />
            <span className="dispatch-badge">DISPATCH</span>
          </div>
          <div className="subtitle">{trucks.length} trucks · {drivers.length} drivers · {loads.filter((l) => l.status === "active").length} active loads</div>
        </div>

        {saveState !== "idle" && <div className="save-indicator no-print">{saveState === "saving" ? "saving…" : "saved"}</div>}

        <div className="content">
          {tab === "loads" && (
            <LoadsTab {...{
              showLoadForm, openNewLoad, saveLoad, editingLoadId, loadForm, setLoadForm, nextLoadNumber,
              billTos, shippers, receivers, applyShipper, applyReceiverToStop, truckNumbers, driverNames,
              addStop, removeStop, updateStop, moveStop,
              calcMiles, milesStatus, setShowLoadForm, setEditingLoadId,
              filterStatus, setFilterStatus, filterTruck, setFilterTruck,
              filteredLoads, expandedLoadId, setExpandedLoadId, editLoad, closeLoad, reopenLoad, deleteLoad,
              companyInfo: settings, closeAllActiveLoads, askConfirm,
            }} />
          )}

          {tab === "expenses" && expensesView === "list" && (
            <ExpensesList {...{ trips, computeTripProfit, computeTripFinancials, openTrip, openNewTrip, tripsMonth, setTripsMonth, tripsYear, setTripsYear, settings }} />
          )}
          {tab === "expenses" && expensesView === "detail" && (
            <ExpenseDetail {...{
              tripForm, setTripForm, activeTripId, truckNumbers, driverNames,
              computeTripMilesGross, computeTripProfit, saveTrip, deleteTrip, closeTripDetail,
              driverByName,
            }} />
          )}

          {tab === "dashboard" && (
            <DashboardTab {...{
              dashPeriod, onDashPeriodChange, dashStart, setDashStart, dashEnd, setDashEnd,
              dashViewBy, setDashViewBy, dashDriverFilter, setDashDriverFilter,
              dashTruckFilter, setDashTruckFilter, dashBillToFilter, setDashBillToFilter,
              runDashUpdate, dashReport, driverNames, truckNumbers, billTos,
            }} />
          )}

          {tab === "stub" && (
            <PayStubTab {...{
              stubDriver, setStubDriver, driverByName, driverNames, setStubDisplayAs, stubDisplayAs,
              stubStart, setStubStart, stubEnd, setStubEnd, stub, resolveDisplayName, saveAndPrintStub,
              viewingStubRecord, setViewingStubRecord, voidPayStub, askConfirm,
              companyInfo: settings, loads, history,
            }} />
          )}

          {tab === "fleet" && fleetView === "menu" && (
            <FleetMenu {...{ setFleetView, trucks, drivers, billTos, shippers, receivers }} />
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
            <ShippersPage {...{ setFleetView, shipperForm, setShipperForm, saveShipper, editingShipperId, setEditingShipperId, filteredShippers, editShipper, removeShipper, fleetSearch, setFleetSearch, startImport, askConfirm }} />
          )}
          {tab === "fleet" && fleetView === "receivers" && (
            <ReceiversPage {...{ setFleetView, receiverForm, setReceiverForm, saveReceiver, editingReceiverId, setEditingReceiverId, filteredReceivers, editReceiver, removeReceiver, fleetSearch, setFleetSearch, startImport, askConfirm }} />
          )}
          {tab === "fleet" && fleetView === "settings" && (
            <SettingsTab {...{ setFleetView, settings, saveStartingNumber, nextLoadNumber, saveSettings }} />
          )}
        </div>

        {confirmModal && (
          <div className="modal-overlay" onClick={() => setConfirmModal(null)}>
            <div className="modal-sheet" style={{ maxHeight: "none" }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-title">{confirmModal.title || "Confirm Delete"}</div>
              <div style={{ fontSize: 13.5, color: "var(--text-dim)", margin: "10px 0 20px", lineHeight: 1.5 }}>{confirmModal.message}</div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn secondary" style={{ marginTop: 0, flex: 1 }} onClick={() => setConfirmModal(null)}>Cancel</button>
                <button className={confirmModal.dangerous === false ? "btn" : "btn danger"} style={{ marginTop: 0, flex: 1 }} onClick={() => { confirmModal.onConfirm(); setConfirmModal(null); }}>{confirmModal.confirmLabel || "Delete"}</button>
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
          <button className={`tab-btn ${tab === "loads" ? "active" : ""}`} onClick={() => setTab("loads")}><Package size={17} /> Loads</button>
          <button className={`tab-btn ${tab === "expenses" ? "active" : ""}`} onClick={() => setTab("expenses")}><DollarSign size={17} /> Trips</button>
          <button className={`tab-btn ${tab === "dashboard" ? "active" : ""}`} onClick={() => setTab("dashboard")}><BarChart3 size={17} /> Dash</button>
          <button className={`tab-btn ${tab === "stub" ? "active" : ""}`} onClick={() => setTab("stub")}><FileText size={17} /> Stub</button>
          <button className={`tab-btn ${tab === "fleet" ? "active" : ""}`} onClick={() => { setTab("fleet"); setFleetView("menu"); }}><Truck size={17} /> Fleet</button>
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
  .dispatch-badge { background: var(--accent); color: #1A1300; font-family: 'IBM Plex Mono', monospace; font-weight: 700; font-size: 10px; padding: 3px 8px; border-radius: 4px; letter-spacing: 0.6px; flex-shrink: 0; }
  .subtitle { color: var(--text-dim); font-size: 10.5px; margin-top: 3px; }
  .content { flex: 1; padding: 16px 16px 90px; overflow-y: auto; max-width: 460px; margin: 0 auto; width: 100%; }
  .field-row { display: flex; gap: 10px; margin-bottom: 12px; }
  .field { flex: 1; display: flex; flex-direction: column; gap: 5px; min-width: 0; }
  .field label { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-dim); font-weight: 600; }
  .field input, .field select, .field textarea {
    background: var(--surface); border: 1px solid var(--border); color: var(--text);
    padding: 10px 11px; border-radius: 8px; font-size: 14px; font-family: 'IBM Plex Mono', monospace; outline: none; width: 100%;
  }
  .field input::placeholder, .field textarea::placeholder { color: #55606F; }
  .field input:focus, .field select:focus, .field textarea:focus { border-color: var(--accent); }
  .section-label { font-family: 'Oswald', sans-serif; font-size: 12.5px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin: 18px 0 10px; display: flex; align-items: center; gap: 8px; }
  .section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .section-label-row { display: flex; align-items: center; justify-content: space-between; margin: 0 0 12px; }
  .section-label-row .section-label { margin: 0; flex: 1; }
  .btn { width: 100%; background: var(--accent); color: #1A1300; border: none; border-radius: 10px; padding: 13px; font-family: 'Oswald', sans-serif; font-size: 14.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; cursor: pointer; margin-top: 14px; }
  .btn.secondary { background: var(--surface-2); color: var(--text-dim); }
  .btn.danger { background: #3A1F1F; color: var(--red); }
  .btn.ghost { background: transparent; border: 1px solid var(--border); color: var(--text-dim); margin-top: 0; }
  .new-load-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; background: var(--accent); color: #1A1300; border: none; border-radius: 10px; padding: 14px; font-family: 'Oswald', sans-serif; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; cursor: pointer; margin-bottom: 18px; }
  .add-trip-btn { display: flex; align-items: center; gap: 5px; background: var(--accent); color: #1A1300; border: none; border-radius: 8px; padding: 7px 11px; font-family: 'Oswald', sans-serif; font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; cursor: pointer; flex-shrink: 0; }
  .stop-card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 12px; margin-bottom: 12px; }
  .stop-card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .stop-card-label { font-family: 'Oswald', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--accent); }
  .stop-card-actions { display: flex; gap: 6px; }
  .mini-icon-btn { background: var(--surface-2); border: none; color: var(--text-dim); width: 26px; height: 26px; border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
  .mini-icon-btn:disabled { opacity: 0.3; cursor: not-allowed; }
  .refund-box { background: #16332140; border: 1px solid var(--green); border-radius: 10px; padding: 12px; margin: 12px 0; }
  .refund-box label { color: var(--green) !important; }
  .pay-summary-box { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px; margin-top: 14px; }
  .monthly-summary-box { background: var(--surface); border: 1px solid var(--accent); border-radius: 10px; padding: 14px; margin-top: 16px; }
  .monthly-summary-title { font-family: 'Oswald', sans-serif; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--accent); margin-bottom: 8px; }
  .schedule-entry-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #20293580; font-size: 12.5px; font-family: 'IBM Plex Mono', monospace; }
  .schedule-entry-row:last-child { border-bottom: none; }
  .expense-report-list { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 6px 14px; }
  .expense-report-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #20293580; font-size: 13.5px; font-family: 'IBM Plex Mono', monospace; }
  .expense-report-row:last-child { border-bottom: none; }
  .pay-summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; }
  .pay-summary-row.net { border-top: 1px solid var(--border); margin-top: 4px; padding-top: 10px; font-weight: 700; font-size: 15.5px; }
  .back-btn { display: inline-flex; align-items: center; gap: 6px; background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-family: 'Oswald', sans-serif; font-size: 14.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; cursor: pointer; padding: 10px 16px; border-radius: 9px; margin-bottom: 14px; }
  .back-btn:active { background: var(--border); }
  .tabbar { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 460px; background: var(--surface); border-top: 1px solid var(--border); display: flex; padding: 8px 2px calc(8px + env(safe-area-inset-bottom)); z-index: 10; }
  .tab-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; background: none; border: none; color: var(--text-dim); padding: 5px 0; cursor: pointer; font-size: 8.8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1px; }
  .tab-btn.active { color: var(--accent); }
  .card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 10px; overflow: hidden; }
  .card-head { padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; }
  .card-detail { padding: 0 14px 14px; border-top: 1px dashed var(--border); margin-top: 2px; }
  .row-line { display: flex; justify-content: space-between; padding: 6px 0; font-size: 12.5px; color: var(--text-dim); border-bottom: 1px solid #20293580; }
  .row-line span:last-child { font-family: 'IBM Plex Mono', monospace; color: var(--text); text-align: right; }
  .empty-state { text-align: center; padding: 40px 20px; color: var(--text-dim); font-size: 13px; }
  .filter-row { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 14px; }
  .chip { flex-shrink: 0; padding: 6px 13px; border-radius: 20px; border: 1px solid var(--border); background: var(--surface); color: var(--text-dim); font-size: 12px; font-weight: 600; cursor: pointer; }
  .close-all-chip { border-color: var(--red); color: var(--red); }
  .chip.active { background: var(--accent); color: #1A1300; border-color: var(--accent); }
  .stat-box { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 12px 10px; text-align: center; }
  .stat-box .num { font-family: 'IBM Plex Mono', monospace; font-size: 15px; font-weight: 600; }
  .stat-box .lbl { font-size: 9px; text-transform: uppercase; letter-spacing: 0.4px; color: var(--text-dim); margin-top: 3px; }
  .report-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 16px; }
  .list-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #20293580; }
  .list-row:last-child { border-bottom: none; }
  .manage-row { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; margin-bottom: 8px; overflow: hidden; }
  .manage-row-head { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; cursor: pointer; }
  .manage-row-body { padding: 0 12px 12px; border-top: 1px dashed var(--border); }
  .add-row { display: flex; gap: 8px; margin-bottom: 16px; }
  .add-row input { flex: 1; background: var(--surface); border: 1px solid var(--border); color: var(--text); padding: 10px 11px; border-radius: 8px; font-family: 'IBM Plex Mono', monospace; }
  .icon-btn { background: var(--surface-2); border: none; color: var(--text-dim); width: 32px; height: 32px; border-radius: 7px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
  .settings-btn { width: 42px; height: 42px; border-radius: 10px; color: var(--accent); }
  .icon-btn:hover { color: var(--red); }
  .save-indicator { position: fixed; top: 12px; right: 14px; font-size: 10px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; opacity: 0.7; z-index: 20; }
  .preset-row { display: flex; gap: 6px; margin-bottom: 14px; }
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
  .truck-pill { font-size: 9.5px; padding: 2px 8px; border-radius: 20px; font-weight: 700; background: var(--surface-2); color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; }
  .load-pdf-number { font-family: 'IBM Plex Mono', monospace; font-size: 20px; font-weight: 700; color: #1A1F27; }
  .load-pdf-section-title { font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; color: #666; margin: 14px 0 6px; }
  .load-number-badge { display: flex; align-items: center; gap: 10px; background: var(--accent); color: #1A1300; border-radius: 12px; padding: 12px 18px; margin-bottom: 18px; }
  .load-number-badge-label { font-family: 'Oswald', sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; opacity: 0.75; }
  .load-number-badge-num { font-family: 'IBM Plex Mono', monospace; font-size: 24px; font-weight: 700; }
  .statement-history-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .statement-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 16px; margin-bottom: 12px; cursor: pointer; }
  .statement-card:active { background: var(--surface-2); }
  .statement-card-date { font-family: 'Oswald', sans-serif; font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
  .statement-card-row { display: flex; justify-content: space-between; align-items: baseline; font-size: 13px; color: var(--text-dim); }
  .statement-card-amt { font-family: 'IBM Plex Mono', monospace; font-size: 20px; font-weight: 700; color: var(--green); }
  .history-item:last-child { border-bottom: none; }
  .miles-status { font-size: 11px; color: var(--text-dim); margin-top: -6px; margin-bottom: 12px; }
  .settings-card { background: var(--surface-2); border: 1px solid var(--border); border-radius: 10px; padding: 14px; margin-bottom: 20px; }
  .search-box { display: flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 9px 12px; margin-bottom: 14px; }
  .search-box input { flex: 1; background: none; border: none; color: var(--text); font-family: 'Inter', sans-serif; font-size: 13px; outline: none; }

  .trip-compact-list { border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
  .trip-compact-header, .trip-compact-row { display: flex; align-items: center; padding: 8px 6px; }
  .trip-compact-row.tall { padding: 11px 6px; }
  .trip-card-list { display: flex; flex-direction: column; gap: 8px; }
  .trip-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 10px 14px; cursor: pointer; }
  .trip-card:active { background: var(--surface-2); }
  .trip-card-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 7px; padding-bottom: 6px; border-bottom: 1px dashed var(--border); }
  .trip-card-id { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 13.5px; color: var(--text); }
  .trip-card-truck { font-family: 'IBM Plex Mono', monospace; font-weight: 700; color: var(--text); font-size: 13px; }
  .trip-card-meta { font-size: 11px; color: var(--text-dim); font-family: 'IBM Plex Mono', monospace; flex-shrink: 0; }
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

  .fleet-menu-item { display: flex; align-items: center; gap: 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 14px; margin-bottom: 10px; cursor: pointer; }
  .fleet-menu-icon { width: 38px; height: 38px; border-radius: 9px; background: var(--surface-2); color: var(--accent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .fleet-menu-text { flex: 1; }
  .fleet-menu-text .name { font-family: 'Oswald', sans-serif; font-size: 14.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; color: var(--text); }
  .fleet-menu-text .count { font-size: 11.5px; color: var(--text-dim); margin-top: 2px; }

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

  .stub-sheet { background: #fff; color: #1A1F27; border-radius: 10px; padding: 22px 18px; }
  .stub-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #1A1F27; padding-bottom: 12px; margin-bottom: 14px; }
  .stub-company { font-family: 'Oswald', sans-serif; font-size: 17px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; color: #1A1F27; }
  .stub-company-line { font-size: 10.5px; color: #555; font-family: 'IBM Plex Mono', monospace; }
  .stub-header h2 { font-family: 'Oswald', sans-serif; margin: 0; font-size: 18px; text-transform: uppercase; }
  .stub-header .meta { text-align: right; font-size: 11.5px; color: #444; font-family: 'IBM Plex Mono', monospace; }
  .stub-table { width: 100%; border-collapse: collapse; font-size: 11.5px; margin-bottom: 14px; }
  .stub-table th { text-align: left; font-size: 9.5px; text-transform: uppercase; color: #666; border-bottom: 1px solid #ccc; padding: 5px 4px; }
  .stub-table td { padding: 6px 4px; border-bottom: 1px solid #eee; font-family: 'IBM Plex Mono', monospace; }
  .stub-summary { display: flex; justify-content: flex-end; }
  .stub-summary table { font-size: 12.5px; }
  .stub-summary td { padding: 4px 10px; font-family: 'IBM Plex Mono', monospace; }
  .stub-summary .net-row td { font-weight: 700; font-size: 15px; border-top: 2px solid #1A1F27; padding-top: 8px; }
  .stub-summary .refund-row td { color: #1F7A4C; background: #E3F5EA; font-weight: 600; }

  @media print {
    @page { size: A4; margin: 14mm; }
    html, body { background: #fff !important; color-scheme: light !important; }
    body * { visibility: hidden !important; }
    .print-area, .print-area * { visibility: visible !important; }
    .app-shell, .content { max-width: none !important; width: 100% !important; background: #fff !important; overflow: visible !important; }
    .modal-overlay { position: static !important; background: transparent !important; display: block !important; align-items: initial !important; justify-content: initial !important; }
    .modal-sheet { max-width: none !important; width: 100% !important; max-height: none !important; background: #fff !important; border-radius: 0 !important; padding: 0 !important; overflow: visible !important; }
    .print-area { position: static !important; width: 100% !important; max-width: none !important; background: #fff !important; }
    .print-area.stub-sheet { border-radius: 0; padding: 6mm 4mm; }
    .print-area .stub-header { padding-bottom: 18px; margin-bottom: 22px; }
    .print-area .stub-company { font-size: 22px; }
    .print-area .stub-company-line { font-size: 12.5px; }
    .print-area h2 { font-size: 24px; }
    .print-area .stub-table { font-size: 13px; margin-bottom: 22px; }
    .print-area .stub-table th { font-size: 11px; padding: 8px 6px; }
    .print-area .stub-table td { padding: 10px 6px; }
    .print-area .stub-summary table { font-size: 14.5px; }
    .print-area .stub-summary td { padding: 7px 14px; }
    .print-area .stub-summary .net-row td { font-size: 18px; padding-top: 12px; }
    .no-print { display: none !important; }
  }
`;

function LoadsTab(p) {
  const {
    showLoadForm, openNewLoad, saveLoad, editingLoadId, loadForm, setLoadForm, nextLoadNumber,
    billTos, shippers, receivers, applyShipper, applyReceiverToStop, truckNumbers, driverNames,
    addStop, removeStop, updateStop, moveStop,
    calcMiles, milesStatus, setShowLoadForm, setEditingLoadId,
    filterStatus, setFilterStatus, filterTruck, setFilterTruck,
    filteredLoads, expandedLoadId, setExpandedLoadId, editLoad, closeLoad, reopenLoad, deleteLoad,
    companyInfo, closeAllActiveLoads, askConfirm,
  } = p;
  const [printingLoad, setPrintingLoad] = useState(null);

  return (
    <div>
      {!showLoadForm && <button className="new-load-btn" onClick={openNewLoad}><Plus size={18} /> New Load</button>}

      {showLoadForm && (
        <form onSubmit={saveLoad}>
          <div className="load-number-badge">
            <span className="load-number-badge-label">{editingLoadId ? "Editing" : "New Load"}</span>
            <span className="load-number-badge-num">#{editingLoadId ? loadForm.loadNumber : nextLoadNumber}</span>
          </div>

          <div className="field-row">
            <div className="field">
              <label>Bill To</label>
              <input list="billto-list" value={loadForm.billTo} onChange={(e) => setLoadForm({ ...loadForm, billTo: e.target.value })} placeholder="e.g. Amazon Relay" style={{ fontFamily: "Inter" }} />
              <datalist id="billto-list">{billTos.map((b) => <option key={b.id} value={b.name} />)}</datalist>
            </div>
            <div className="field"><label>Work Order #</label><input value={loadForm.workOrder} onChange={(e) => setLoadForm({ ...loadForm, workOrder: e.target.value })} placeholder="Broker load ID" /></div>
          </div>

          <div className="field-row">
            <div className="field"><label>Rate ($)</label><input type="number" step="0.01" value={loadForm.rate} onChange={(e) => setLoadForm({ ...loadForm, rate: e.target.value })} placeholder="0.00" /></div>
            <div className="field">
              <label>Truck</label>
              <select value={loadForm.truck} onChange={(e) => setLoadForm({ ...loadForm, truck: e.target.value })}>
                <option value="">Select…</option>
                {truckNumbers.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label>Driver</label>
              <select value={loadForm.driver} onChange={(e) => setLoadForm({ ...loadForm, driver: e.target.value })}>
                <option value="">Select…</option>
                {driverNames.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="field" />
          </div>

          <div className="section-label">Shipper (Pickup)</div>
          <div className="field-row">
            <div className="field">
              <label>Shipper Name / Code</label>
              <input list="shipper-list" value={loadForm.shipperName} onChange={(e) => setLoadForm({ ...loadForm, shipperName: e.target.value })} onBlur={(e) => applyShipper(e.target.value)} placeholder="Amazon Warehouse" style={{ fontFamily: "Inter" }} />
              <datalist id="shipper-list">{shippers.map((s) => <option key={s.id} value={s.companyName} />)}</datalist>
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
          <div className="field-row"><div className="field"><label>Pickup Date</label><input type="date" value={loadForm.pickupDate} onChange={(e) => setLoadForm({ ...loadForm, pickupDate: e.target.value })} /></div><div className="field" /></div>

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
                  <input list="receiver-list" value={stop.receiverName} onChange={(e) => updateStop(stop.id, { receiverName: e.target.value })} onBlur={(e) => applyReceiverToStop(stop.id, e.target.value)} placeholder="Costco DC" style={{ fontFamily: "Inter" }} />
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
          <datalist id="receiver-list">{receivers.map((r) => <option key={r.id} value={r.companyName} />)}</datalist>
          <div className="field-row"><div className="field"><label>Delivery Date (final)</label><input type="date" value={loadForm.deliveryDate} onChange={(e) => setLoadForm({ ...loadForm, deliveryDate: e.target.value })} /></div><div className="field" /></div>

          <div className="section-label">Mileage</div>
          <div className="field-row">
            <div className="field"><label>Loaded Miles</label><input type="number" value={loadForm.loadedMiles} onChange={(e) => setLoadForm({ ...loadForm, loadedMiles: e.target.value })} placeholder="0" /></div>
            <div className="field"><label>Deadhead Miles</label><input type="number" value={loadForm.deadheadMiles} onChange={(e) => setLoadForm({ ...loadForm, deadheadMiles: e.target.value })} placeholder="0" /></div>
          </div>
          <button type="button" className="btn ghost" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 6 }} onClick={calcMiles}><MapPin size={14} /> Auto-Calculate Loaded Miles (All Legs)</button>
          {milesStatus && <div className="miles-status">{milesStatus}</div>}

          <button className="btn" type="submit">{editingLoadId ? "Save Changes" : "Save Load"}</button>
          <button type="button" className="btn secondary" onClick={() => { setShowLoadForm(false); setLoadForm(emptyLoad()); setEditingLoadId(null); }}>Cancel</button>
        </form>
      )}

      <div className="section-label" style={{ marginTop: 26 }}>Loads</div>
      <div className="filter-row" style={{ flexWrap: "nowrap" }}>
        <div className={`chip ${filterStatus === "active" ? "active" : ""}`} onClick={() => setFilterStatus("active")}>Active</div>
        <div className={`chip ${filterStatus === "completed" ? "active" : ""}`} onClick={() => setFilterStatus("completed")}>Completed</div>
        <div className={`chip ${filterStatus === "all" ? "active" : ""}`} onClick={() => setFilterStatus("all")}>All</div>
        <div
          className="chip close-all-chip"
          style={{ marginLeft: "auto" }}
          onClick={() => askConfirm(
            "This action will mark all currently active loads as completed.",
            closeAllActiveLoads,
            { title: "Close all active loads?", confirmLabel: "Close All", dangerous: false }
          )}
        >
          Close All
        </div>
      </div>
      <div className="filter-row">
        <div className={`chip ${filterTruck === "ALL" ? "active" : ""}`} onClick={() => setFilterTruck("ALL")}>All Trucks</div>
        {truckNumbers.map((t) => <div key={t} className={`chip ${filterTruck === t ? "active" : ""}`} onClick={() => setFilterTruck(t)}>{t}</div>)}
      </div>

      {filteredLoads.length === 0 && <div className="empty-state">No loads here yet.</div>}
      {[...filteredLoads].sort((a, b) => (b.loadNumber || 0) - (a.loadNumber || 0)).map((l) => {
        const open = expandedLoadId === l.id;
        return (
          <div className="card" key={l.id}>
            <div className="card-head" onClick={() => setExpandedLoadId(open ? null : l.id)}>
              <div>
                <div style={{ fontFamily: "Oswald, sans-serif", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  #{l.loadNumber} · {l.billTo || "—"}<span className={`status-pill ${l.status}`}>{l.status}</span><span className="truck-pill">{l.truck || "—"}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>
                  {routeSummary(l)}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontWeight: 600 }}>{money(l.rate)}</span>
                {open ? <ChevronDown size={16} color="#8A93A3" /> : <ChevronRight size={16} color="#8A93A3" />}
              </div>
            </div>
            {open && (
              <div className="card-detail">
                <div className="row-line"><span>Work Order</span><span>{l.workOrder || "—"}</span></div>
                <div className="row-line"><span>Driver / Truck</span><span>{l.driver || "—"} · {l.truck || "—"}</span></div>
                <div className="row-line"><span>Pickup</span><span>{fmtDate(l.pickupDate)} · {cityState(l.shipperCity, l.shipperState) || l.shipperName || "—"}</span></div>
                {(l.stops || []).map((s, i) => (
                  <div className="row-line" key={s.id || i}><span>{stopLabel(i, l.stops.length)}</span><span>{cityState(s.city, s.state) || s.receiverName || "—"}</span></div>
                ))}
                <div className="row-line"><span>Delivery Date</span><span>{fmtDate(l.deliveryDate)}</span></div>
                <div className="row-line"><span>Loaded / Deadhead Miles</span><span>{l.loadedMiles || 0} / {l.deadheadMiles || 0}</span></div>
                <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                  <button className="btn secondary" style={{ marginTop: 0, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }} onClick={() => editLoad(l)}><Pencil size={13} /> Edit</button>
                  {l.status === "active" ? (
                    <button className="btn" style={{ marginTop: 0, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }} onClick={() => closeLoad(l.id)}><CheckCircle2 size={13} /> Close Load</button>
                  ) : (
                    <button className="btn secondary" style={{ marginTop: 0, flex: 1 }} onClick={() => reopenLoad(l.id)}>Reopen</button>
                  )}
                  <button className="btn danger" style={{ marginTop: 0, flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }} onClick={() => deleteLoad(l.id)}><Trash2 size={13} /> Delete</button>
                </div>
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
                  <tr><td style={{ color: "#666" }}>Bill To</td><td style={{ textAlign: "right", fontWeight: 600 }}>{printingLoad.billTo || "—"}</td></tr>
                  <tr><td style={{ color: "#666" }}>Work Order</td><td style={{ textAlign: "right" }}>{printingLoad.workOrder || "—"}</td></tr>
                  <tr><td style={{ color: "#666" }}>Driver / Truck</td><td style={{ textAlign: "right" }}>{printingLoad.driver || "—"} · Truck {printingLoad.truck || "—"}</td></tr>
                  <tr><td style={{ color: "#666" }}>Rate</td><td style={{ textAlign: "right", fontWeight: 700 }}>{money(printingLoad.rate)}</td></tr>
                  <tr><td style={{ color: "#666" }}>Loaded / Deadhead Miles</td><td style={{ textAlign: "right" }}>{printingLoad.loadedMiles || 0} / {printingLoad.deadheadMiles || 0}</td></tr>
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
            <button className="btn no-print" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={() => window.print()}><Printer size={16} /> Print / Save as PDF</button>
            <button className="btn secondary no-print" onClick={() => setPrintingLoad(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ExpensesList({ trips, computeTripProfit, computeTripFinancials, openTrip, openNewTrip, tripsMonth, setTripsMonth, tripsYear, setTripsYear, settings }) {
  const monthKey = `${tripsYear}-${String(tripsMonth).padStart(2, "0")}`;
  const monthTrips = trips
    .filter((t) => (t.startDate || "").slice(0, 7) === monthKey)
    .sort((a, b) => {
      const na = parseFloat(a.tripNumber), nb = parseFloat(b.tripNumber);
      if (!isNaN(na) && !isNaN(nb)) return na - nb;
      return String(a.tripNumber).localeCompare(String(b.tripNumber));
    });
  const rows = monthTrips.map((t) => ({ trip: t, ...computeTripProfit(t), fin: computeTripFinancials(t) }));
  const totalGross = rows.reduce((s, r) => s + r.gross, 0);
  const totalFeesAndProfit = rows.reduce((s, r) => s + (r.fin.mode === "fee" ? r.fin.dispatchFee : r.fin.profit), 0);
  const dispatcherPayPct = resolveScheduledPercent(settings.dispatcherPaySchedule, tripsYear, tripsMonth, DEFAULT_DISPATCHER_PAY);
  const dispatcherPay = totalGross * (dispatcherPayPct / 100);
  const years = (() => { const y = new Date().getFullYear(); const arr = []; for (let i = y - 3; i <= y + 1; i++) arr.push(i); return arr; })();

  return (
    <div>
      <div className="section-label-row">
        <div className="section-label">Monthly Overview</div>
        <button className="add-trip-btn" onClick={openNewTrip}><Plus size={14} /> Add Trip</button>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Month</label>
          <select value={tripsMonth} onChange={(e) => setTripsMonth(Number(e.target.value))}>
            {MONTH_NAMES.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Year</label>
          <select value={tripsYear} onChange={(e) => setTripsYear(Number(e.target.value))}>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      <div className="trip-card-list">
        {rows.length === 0 && <div className="empty-state">No trips recorded for {MONTH_NAMES[tripsMonth - 1]} {tripsYear}.</div>}
        {rows.map(({ trip: t, miles, gross, fin }) => (
          <div className="trip-card" key={t.id} onClick={() => openTrip(t)}>
            <div className="trip-card-top">
              <span className="trip-card-id">Trip {t.tripNumber} <span className="trip-card-truck">· Truck {t.truck}</span></span>
              <span className="trip-card-meta">{shortDate(t.startDate)} – {shortDate(t.endDate)}</span>
            </div>
            <div className="trip-card-bottom">
              <div className="trip-card-figure">
                <span className="lbl">Miles</span>
                <span className="val" style={{ color: "var(--text)" }}>{miles.toLocaleString()}</span>
              </div>
              <div className="trip-card-figure">
                <span className="lbl">Gross</span>
                <span className="val" style={{ color: "var(--accent)" }}>{compactMoney(gross)}</span>
              </div>
              <div className="trip-card-figure">
                <span className="lbl">{fin.mode === "profit" ? "Profit" : "Fee"}</span>
                <span className="val" style={{ color: fin.mode === "profit" ? "var(--accent-2)" : "var(--green)" }}>
                  {fin.mode === "profit" ? compactMoney(fin.profit) : compactMoney(fin.dispatchFee)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 10.5, color: "var(--text-dim)", marginTop: 8 }}>
        <span style={{ color: "var(--green)" }}>■</span> Dispatch Fee (percent/flat/salary drivers) &nbsp;&nbsp; <span style={{ color: "var(--accent-2)" }}>■</span> Company Profit (per-mile/hourly drivers)
      </div>

      <div className="monthly-summary-box">
        <div className="monthly-summary-title">{MONTH_NAMES[tripsMonth - 1]} {tripsYear} Summary</div>
        <div className="pay-summary-row"><span>Total Monthly Gross</span><span style={{ fontWeight: 700 }}>{money(totalGross)}</span></div>
        <div className="pay-summary-row"><span>Total Fees &amp; Profit</span><span style={{ color: "var(--green)" }}>{money(totalFeesAndProfit)}</span></div>
        <div className="pay-summary-row"><span>Dispatcher Pay ({dispatcherPayPct}%)</span><span style={{ color: "var(--green)" }}>{money(dispatcherPay)}</span></div>
      </div>

      <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 12, lineHeight: 1.5 }}>
        Tap a row for full trip details — driver names are shown there. Miles and Gross update automatically from completed loads.
      </div>
    </div>
  );
}

function ExpenseDetail(p) {
  const { tripForm, setTripForm, activeTripId, truckNumbers, driverNames, computeTripMilesGross, computeTripProfit, saveTrip, deleteTrip, closeTripDetail, driverByName } = p;
  return (
    <div>
      <button type="button" className="back-btn" onClick={closeTripDetail}><ChevronLeft size={18} /> Back to Trips</button>
      <form onSubmit={saveTrip}>
        <div className="section-label">{activeTripId ? `Trip ${tripForm.tripNumber}` : "New Expense Record"}</div>
        <div className="field-row">
          <div className="field"><label>Trip Number</label><input value={tripForm.tripNumber} onChange={(e) => setTripForm({ ...tripForm, tripNumber: e.target.value })} placeholder="e.g. 1" /></div>
          <div className="field">
            <label>Truck</label>
            <select value={tripForm.truck} onChange={(e) => setTripForm({ ...tripForm, truck: e.target.value })}>
              <option value="">Select…</option>
              {truckNumbers.map((tr) => <option key={tr} value={tr}>{tr}</option>)}
            </select>
          </div>
        </div>
        <div className="field-row">
          <div className="field"><label>Start Date</label><input type="date" value={tripForm.startDate} onChange={(e) => setTripForm({ ...tripForm, startDate: e.target.value })} /></div>
          <div className="field"><label>End Date</label><input type="date" value={tripForm.endDate} onChange={(e) => setTripForm({ ...tripForm, endDate: e.target.value })} /></div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Driver 1</label>
            <select value={tripForm.driver1} onChange={(e) => setTripForm({ ...tripForm, driver1: e.target.value })}>
              <option value="">Select…</option>
              {driverNames.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Driver 2 (optional)</label>
            <select value={tripForm.driver2} onChange={(e) => setTripForm({ ...tripForm, driver2: e.target.value })}>
              <option value="">None</option>
              {driverNames.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {tripForm.truck && tripForm.startDate && tripForm.endDate && (() => {
          const live = computeTripMilesGross(tripForm.truck, tripForm.startDate, tripForm.endDate);
          return (
            <div className="field-row">
              <div className="field"><label>Miles (auto)</label><input readOnly value={live.miles} style={{ opacity: 0.8 }} /></div>
              <div className="field"><label>Gross Revenue (auto)</label><input readOnly value={money(live.gross)} style={{ opacity: 0.8 }} /></div>
            </div>
          );
        })()}
        <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: -6, marginBottom: 14 }}>
          Pulled automatically from completed loads on this truck within the date range.
        </div>

        <div className="section-label-row">
          <div className="section-label">Expenses</div>
        </div>
        <div className="toggle-row" style={{ margin: "0 0 14px" }}>
          <input type="checkbox" id="mileage-toggle" checked={!!tripForm.mileageHourlyMode} onChange={(e) => setTripForm({ ...tripForm, mileageHourlyMode: e.target.checked })} />
          <label htmlFor="mileage-toggle" style={{ lineHeight: 1.4 }}>Driver is paid by miles/hours — exclude most expenses from their pay (only Other Charges &amp; Refunds affect driver pay; everything else is still recorded for the Dashboard).</label>
        </div>
        {TRIP_EXPENSE_FIELDS.filter((f) => f.key !== "driverPay").reduce((rows, f, i) => { if (i % 2 === 0) rows.push([f]); else rows[rows.length - 1].push(f); return rows; }, []).map((pair, idx) => (
          <div className="field-row" key={idx}>
            {pair.map((f) => {
              const dimmed = tripForm.mileageHourlyMode && f.key !== "otherCharges";
              return (
                <div className="field" key={f.key}>
                  <label>{f.label}{dimmed ? " (record only)" : ""}</label>
                  <input type="number" step="0.01" value={tripForm[f.key]} onChange={(e) => setTripForm({ ...tripForm, [f.key]: e.target.value })} placeholder="0.00" style={dimmed ? { opacity: 0.6 } : undefined} />
                </div>
              );
            })}
          </div>
        ))}
        <div className="field-row">
          <div className="field"><label>Other Charges Notes</label><input value={tripForm.otherNotes} onChange={(e) => setTripForm({ ...tripForm, otherNotes: e.target.value })} placeholder="Optional note" style={{ fontFamily: "Inter" }} /></div>
        </div>
        <div className="refund-box">
          <div className="field">
            <label>Refunds ($) — money owed back to the driver</label>
            <input type="number" step="0.01" value={tripForm.refunds} onChange={(e) => setTripForm({ ...tripForm, refunds: e.target.value })} placeholder="0.00" />
          </div>
        </div>

        {tripForm.truck && tripForm.startDate && tripForm.endDate && (() => {
          const { gross } = computeTripMilesGross(tripForm.truck, tripForm.startDate, tripForm.endDate);
          const driver = driverByName[tripForm.driver1];
          const feePct = dispatchFeePercentFor(driver);
          const dispatchFee = gross * (feePct / 100);
          // Which expense keys actually reduce driver pay:
          const deductKeys = tripForm.mileageHourlyMode
            ? ["otherCharges"]
            : DRIVER_DEDUCTION_FIELDS.map((f) => f.key);
          const expensesForPay = deductKeys.reduce((s, k) => s + num(tripForm[k]), 0);
          const refunds = num(tripForm.refunds);
          const driverPay = gross - dispatchFee - expensesForPay + refunds;
          return (
            <div className="pay-summary-box" style={{ marginTop: 14 }}>
              <div className="pay-summary-row"><span>Gross</span><span>{money(gross)}</span></div>
              <div className="pay-summary-row"><span>Dispatch Fee ({feePct}%)</span><span style={{ color: "var(--red)" }}>-{money(dispatchFee)}</span></div>
              <div className="pay-summary-row"><span>Expenses{tripForm.mileageHourlyMode ? " (Other Charges only)" : ""}</span><span style={{ color: "var(--red)" }}>-{money(expensesForPay)}</span></div>
              {refunds > 0 && <div className="pay-summary-row"><span>Refunds</span><span style={{ color: "var(--green)" }}>+{money(refunds)}</span></div>}
              <div className="pay-summary-row net"><span>Driver Pay</span><span style={{ color: driverPay >= 0 ? "var(--green)" : "var(--red)" }}>{money(driverPay)}</span></div>
            </div>
          );
        })()}

        <button className="btn" type="submit">{activeTripId ? "Save Changes" : "Save"}</button>
        {activeTripId && <button type="button" className="btn danger" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }} onClick={() => deleteTrip(activeTripId)}><Trash2 size={13} /> Delete Record</button>}
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
    runDashUpdate, dashReport, driverNames, truckNumbers, billTos,
  } = p;

  function toggleDriver(name) {
    setDashDriverFilter((prev) => prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]);
  }

  const isBillTo = dashReport.viewBy === "billto";
  const isProfit = dashReport.viewBy === "profit";
  const isExpenses = dashReport.viewBy === "expenses";
  const nameLabel = dashReport.viewBy === "truck" ? "Truck" : dashReport.viewBy === "billto" ? "Broker" : "Driver";

  return (
    <div>
      <div className="field-row">
        <div className="field">
          <label>Report</label>
          <select value={dashViewBy} onChange={(e) => setDashViewBy(e.target.value)}>
            <option value="driver">By Driver</option>
            <option value="truck">By Truck</option>
            <option value="billto">Broker</option>
            <option value="profit">Profit</option>
            <option value="expenses">Expenses</option>
          </select>
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Period</label>
          <select value={dashPeriod} onChange={(e) => onDashPeriodChange(e.target.value)}>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>
      {dashPeriod === "custom" && (
        <div className="field-row">
          <div className="field"><label>Start</label><input type="date" value={dashStart} onChange={(e) => setDashStart(e.target.value)} /></div>
          <div className="field"><label>End</label><input type="date" value={dashEnd} onChange={(e) => setDashEnd(e.target.value)} /></div>
        </div>
      )}

      <div className="field-row">
        <div className="field">
          <label>Drivers ({dashDriverFilter.length === 0 ? "All" : dashDriverFilter.length})</label>
          <select multiple size={Math.min(4, Math.max(2, driverNames.length))} value={dashDriverFilter} onChange={(e) => setDashDriverFilter(Array.from(e.target.selectedOptions, (o) => o.value))} style={{ fontFamily: "Inter" }}>
            {driverNames.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Bill To / Broker</label>
          <select value={dashBillToFilter} onChange={(e) => setDashBillToFilter(e.target.value)} style={{ fontFamily: "Inter" }}>
            <option value="ALL">All</option>
            {billTos.map((b) => <option key={b.id} value={b.name}>{b.name}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Truck</label>
          <select value={dashTruckFilter} onChange={(e) => setDashTruckFilter(e.target.value)}>
            <option value="ALL">All</option>
            {truckNumbers.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <button className="btn" onClick={runDashUpdate}>Update</button>

      <div style={{ fontSize: 11.5, color: "var(--text-dim)", margin: "16px 0 10px" }}>{fmtDate(dashReport.start)} – {fmtDate(dashReport.end)}</div>

      {isExpenses ? (
        <>
          <div style={{ fontSize: 11.5, color: "var(--text-dim)", marginBottom: 14 }}>{dashReport.tripCount} trip record{dashReport.tripCount === 1 ? "" : "s"} in this period</div>
          <div className="expense-report-list">
            {EXPENSE_REPORT_FIELDS.map((f) => (
              <div className="expense-report-row" key={f.key}>
                <span>{f.label}</span>
                <span style={{ color: f.key === "refunds" ? "var(--green)" : "var(--text)" }}>{money(dashReport.expenseTotals[f.key])}</span>
              </div>
            ))}
            <div className="expense-report-row" style={{ fontWeight: 700, borderTop: "1px solid var(--border)", marginTop: 4, paddingTop: 10 }}>
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
          <div className="trip-compact-list">
            <div className="trip-compact-header">
              <span className="col-driver" style={{ flex: 1.6 }}>Driver</span>
              <span className="col-miles" style={{ width: 44 }}>Loads</span>
              <span className="col-gross" style={{ width: 70 }}>Gross</span>
              <span className="col-gross" style={{ width: 78, borderRight: "none" }}>Profit</span>
            </div>
            {dashReport.rows.length === 0 && <div className="empty-state">No completed loads match these filters.</div>}
            {dashReport.rows.map((r) => (
              <div className="trip-compact-row" key={r.key}>
                <span className="col-driver" style={{ flex: 1.6 }} title={r.key}>{r.key}</span>
                <span className="col-miles" style={{ width: 44 }}>{r.loads}</span>
                <span className="col-gross" style={{ width: 70 }}>{compactMoney(r.gross)}</span>
                <span className="col-gross" style={{ width: 78, borderRight: "none", color: "var(--green)" }}>{compactMoney(r.dispatchFee)}</span>
              </div>
            ))}
            {dashReport.rows.length > 0 && (
              <div className="trip-compact-row" style={{ fontWeight: 700, background: "var(--surface-2)" }}>
                <span className="col-driver" style={{ flex: 1.6 }}>Summary</span>
                <span className="col-miles" style={{ width: 44 }}>{dashReport.totals.loads}</span>
                <span className="col-gross" style={{ width: 70 }}>{compactMoney(dashReport.totals.gross)}</span>
                <span className="col-gross" style={{ width: 78, borderRight: "none", color: "var(--green)" }}>{compactMoney(dashReport.totals.dispatchFee)}</span>
              </div>
            )}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 10, lineHeight: 1.5 }}>
            Company profit combines the dispatch fee earned on percent/flat/salary drivers' completed loads (each driver's own %, defaulting to {DEFAULT_DISPATCH_FEE}%) with the actual profit earned on per-mile/hourly drivers' loads (Gross − Driver Pay − Company Expenses − Refunds).
          </div>
        </>
      ) : (
      <div className="trip-compact-list">
        <div className="trip-compact-header">
          <span className="col-driver" style={{ flex: isBillTo ? 2 : 1.4 }}>{nameLabel}</span>
          <span className="col-miles" style={{ width: 40 }}>Loads</span>
          <span className="col-gross" style={{ width: isBillTo ? 76 : 62 }}>Gross</span>
          {!isBillTo && <>
            <span className="col-miles">Miles</span>
            <span className="col-miles">Empty</span>
            <span className="col-gross" style={{ width: 54, borderRight: "none" }}>$/mi</span>
          </>}
        </div>
        {dashReport.rows.length === 0 && <div className="empty-state">No completed loads match these filters.</div>}
        {dashReport.rows.map((r) => (
          <div className="trip-compact-row" key={r.key}>
            <span className="col-driver" style={{ flex: isBillTo ? 2 : 1.4 }} title={r.key}>{r.key}</span>
            <span className="col-miles" style={{ width: 40 }}>{r.loads}</span>
            <span className="col-gross" style={{ width: isBillTo ? 76 : 62 }}>{compactMoney(r.gross)}</span>
            {!isBillTo && <>
              <span className="col-miles">{r.miles.toLocaleString()}</span>
              <span className="col-miles">{r.emptyMiles ? r.emptyMiles.toLocaleString() : "-"}</span>
              <span className="col-gross" style={{ width: 54, borderRight: "none" }}>${r.revPerMile.toFixed(2)}</span>
            </>}
          </div>
        ))}
        {dashReport.rows.length > 0 && (
          <div className="trip-compact-row" style={{ fontWeight: 700, background: "var(--surface-2)" }}>
            <span className="col-driver" style={{ flex: isBillTo ? 2 : 1.4 }}>Summary</span>
            <span className="col-miles" style={{ width: 40 }}>{dashReport.totals.loads}</span>
            <span className="col-gross" style={{ width: isBillTo ? 76 : 62 }}>{compactMoney(dashReport.totals.gross)}</span>
            {!isBillTo && <>
              <span className="col-miles">{dashReport.totals.miles.toLocaleString()}</span>
              <span className="col-miles">{dashReport.totals.emptyMiles ? dashReport.totals.emptyMiles.toLocaleString() : "-"}</span>
              <span className="col-gross" style={{ width: 54, borderRight: "none" }}>${dashReport.totals.revPerMile.toFixed(2)}</span>
            </>}
          </div>
        )}
      </div>
      )}
      {!isProfit && !isExpenses && (
      <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 10, lineHeight: 1.5 }}>
        Based on completed loads only. Tap multiple drivers in the list to select more than one; leave none selected to include all.
      </div>
      )}
    </div>
  );
}

function PayStubTab(p) {
  const {
    stubDriver, setStubDriver, driverByName, driverNames, setStubDisplayAs, stubDisplayAs,
    stubStart, setStubStart, stubEnd, setStubEnd, stub, resolveDisplayName, saveAndPrintStub,
    viewingStubRecord, setViewingStubRecord, voidPayStub, askConfirm,
    companyInfo, loads, history,
  } = p;
  const [stubMode, setStubMode] = useState("history"); // "history" | "generate"
  const [lastGenSignature, setLastGenSignature] = useState(null);

  useEffect(() => { setStubMode("history"); setLastGenSignature(null); }, [stubDriver]);
  useEffect(() => { setLastGenSignature(null); }, [stubStart, stubEnd]);

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
    return (
      <div>
        <button type="button" className="back-btn no-print" onClick={() => setViewingStubRecord(null)}><ChevronLeft size={18} /> Statement History</button>
        <div className="print-area stub-sheet">
          <div className="stub-header">
            <div>
              {companyInfo && companyInfo.companyName ? <div className="stub-company">{companyInfo.companyName}</div> : null}
              {companyInfo && companyInfo.companyAddress ? <div className="stub-company-line">{companyInfo.companyAddress}</div> : null}
              <div className="stub-company-line">{[companyInfo && companyInfo.dotNumber ? `DOT ${companyInfo.dotNumber}` : "", companyInfo && companyInfo.companyEmail].filter(Boolean).join(" · ")}</div>
              <h2 style={{ marginTop: 8 }}>Payment Statement</h2>
              <div style={{ fontSize: 12, marginTop: 4 }}>{r.displayedAs || r.driverName}</div>
            </div>
            <div className="meta">
              Pay #{String(r.stubNumber || 0).padStart(4, "0")}<br />
              {r.generatedAt ? fmtDate(r.generatedAt.slice(0, 10)) : ""}<br />
              {r.trucksUsed && r.trucksUsed.length ? `Truck${r.trucksUsed.length > 1 ? "s" : ""} ${r.trucksUsed.join(", ")}` : ""}
            </div>
          </div>
          <table className="stub-table">
            <thead><tr><th>Load #</th><th>Route</th><th style={{ textAlign: "right" }}>Miles</th><th style={{ textAlign: "right" }}>Pay</th></tr></thead>
            <tbody>
              {(!r.loadSnapshots || r.loadSnapshots.length === 0) && <tr><td colSpan={4} style={{ color: "#999" }}>Salary pay period — not tied to individual loads.</td></tr>}
              {(r.loadSnapshots || []).map((l) => (
                <tr key={l.loadId}>
                  <td>{l.loadNumber}</td>
                  <td style={{ fontSize: 10, lineHeight: 1.4 }}>{l.route}</td>
                  <td style={{ textAlign: "right" }}>{l.miles || "—"}</td>
                  <td style={{ textAlign: "right" }}>{money(l.driverPay)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="stub-summary">
            <table>
              <tbody>
                {r.isMileage && (r.loadedMilesPay > 0 || r.emptyMilesPay > 0) && <>
                  <tr><td>Loaded Miles Pay</td><td style={{ textAlign: "right" }}>{money(r.loadedMilesPay)}</td></tr>
                  <tr><td>Empty Miles Pay</td><td style={{ textAlign: "right" }}>{money(r.emptyMilesPay)}</td></tr>
                </>}
                <tr><td>Gross Pay</td><td style={{ textAlign: "right" }}>{money(r.grossPay)}</td></tr>
                {r.dispatchFee > 0 && <tr><td>Dispatch Fee ({r.dispatchFeePercent}%)</td><td style={{ textAlign: "right" }}>-{money(r.dispatchFee)}</td></tr>}
                {DRIVER_DEDUCTION_FIELDS.map((f) => (r.expenseBreakdown && r.expenseBreakdown[f.key] > 0) ? (
                  <tr key={f.key}><td>{f.label}</td><td style={{ textAlign: "right" }}>-{money(r.expenseBreakdown[f.key])}</td></tr>
                ) : null)}
                {r.refunds > 0 && <tr className="refund-row"><td>Refunds</td><td style={{ textAlign: "right" }}>+{money(r.refunds)}</td></tr>}
                <tr className="net-row"><td>Net Driver Pay</td><td style={{ textAlign: "right" }}>{money(r.netPay)}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <button className="btn no-print" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={() => window.print()}><Printer size={16} /> Print / Save as PDF</button>
        <button className="btn danger no-print" onClick={() => askConfirm("Void this pay stub? Its loads will go back to Unpaid and this record will be removed from history.", () => voidPayStub(r))}>Void This Stub</button>
      </div>
    );
  }

  const driverStubs = stubDriver ? (history || []).filter((h) => h.driverName === stubDriver && !h.voided).sort((a, b) => (b.generatedAt || "").localeCompare(a.generatedAt || "")) : [];
  const driverLoads = stubDriver ? (loads || []).filter((l) => l.driver === stubDriver && l.status === "completed").sort((a, b) => (b.loadNumber || 0) - (a.loadNumber || 0)) : [];

  return (
    <div>
      <div className="no-print">
        <div className="section-label">Pay Statements</div>
        <div className="field-row">
          <div className="field">
            <label>Driver</label>
            <select value={stubDriver} onChange={(e) => { setStubDriver(e.target.value); const d = driverByName[e.target.value]; setStubDisplayAs(d && d.companyName ? "company" : "driver"); }}>
              <option value="">Select…</option>
              {driverNames.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
      </div>

      {!stubDriver && <div className="empty-state">Select a driver to view their statement history.</div>}

      {stubDriver && stubMode === "history" && (
        <div className="no-print">
          <div className="statement-history-header">
            <div className="section-label" style={{ margin: 0 }}>Statement History</div>
            <button className="add-trip-btn" onClick={() => setStubMode("generate")}><Plus size={14} /> Generate New</button>
          </div>
          {driverStubs.length === 0 && <div className="empty-state">No pay stubs generated yet.</div>}
          {driverStubs.map((h) => (
            <div className="statement-card" key={h.id} onClick={() => setViewingStubRecord(h)}>
              <div className="statement-card-date">{h.generatedAt ? fmtDate(h.generatedAt.slice(0, 10)) : fmtDate(h.periodEnd)}</div>
              <div className="statement-card-row">
                <span>{h.loadCount ?? (h.loadIds ? h.loadIds.length : 0)} load{(h.loadCount ?? 0) === 1 ? "" : "s"}</span>
                <span className="statement-card-amt">{money(h.netPay)}</span>
              </div>
            </div>
          ))}

          <div className="section-label" style={{ marginTop: 26 }}>Load History</div>
          {driverLoads.length === 0 && <div className="empty-state">No completed loads yet.</div>}
          {driverLoads.map((l) => (
            <div className="history-item" key={l.id} style={{ cursor: "default" }}>
              <span>#{l.loadNumber} · {l.billTo} · {fmtDate(l.deliveryDate || l.pickupDate)} <span className={`paid-pill ${l.paidStatus || "unpaid"}`} style={{ marginLeft: 4 }}>{l.paidStatus || "unpaid"}</span></span>
              <span style={{ fontFamily: "IBM Plex Mono, monospace", color: "var(--text)" }}>{money(l.rate)}</span>
            </div>
          ))}
        </div>
      )}

      {stubDriver && stubMode === "generate" && (
        <>
          <div className="no-print">
            <button type="button" className="back-btn" onClick={() => setStubMode("history")}><ChevronLeft size={18} /> Statement History</button>
            {driverByName[stubDriver] && driverByName[stubDriver].companyName && (
              <div className="field-row">
                <div className="field">
                  <label>Bill As</label>
                  <select value={stubDisplayAs} onChange={(e) => setStubDisplayAs(e.target.value)}>
                    <option value="driver">Driver Name ({driverByName[stubDriver].name})</option>
                    <option value="company">Company Name ({driverByName[stubDriver].companyName})</option>
                  </select>
                </div>
              </div>
            )}
            <div className="field-row">
              <div className="field"><label>Period Start</label><input type="date" value={stubStart} onChange={(e) => setStubStart(e.target.value)} /></div>
              <div className="field"><label>Period End</label><input type="date" value={stubEnd} onChange={(e) => setStubEnd(e.target.value)} /></div>
            </div>
            <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: -6 }}>Only unpaid completed loads within this range are included. Loads already paid on a past stub are automatically excluded.</div>
          </div>

          {stub ? (
            <>
              <div className="print-area stub-sheet" style={{ marginTop: 16 }}>
                <div className="stub-header">
                  <div>
                    {companyInfo && companyInfo.companyName ? <div className="stub-company">{companyInfo.companyName}</div> : null}
                    {companyInfo && companyInfo.companyAddress ? <div className="stub-company-line">{companyInfo.companyAddress}</div> : null}
                    <div className="stub-company-line">{[companyInfo && companyInfo.dotNumber ? `DOT ${companyInfo.dotNumber}` : "", companyInfo && companyInfo.companyEmail].filter(Boolean).join(" · ")}</div>
                    <h2 style={{ marginTop: 8 }}>Payment Statement</h2>
                    <div style={{ fontSize: 12, marginTop: 4 }}>{resolveDisplayName(stub.driver, stubDisplayAs)}</div>
                  </div>
                  <div className="meta">
                    {fmtDate(stubStart)} – {fmtDate(stubEnd)}<br />
                    {stub.trucksUsed.length ? `Truck${stub.trucksUsed.length > 1 ? "s" : ""} ${stub.trucksUsed.join(", ")}` : "No truck assigned"}
                  </div>
                </div>
                <table className="stub-table">
                  <thead><tr><th>Load #</th><th>Date</th><th>Route</th><th style={{ textAlign: "right" }}>Miles</th><th style={{ textAlign: "right" }}>Pay</th></tr></thead>
                  <tbody>
                    {stub.loadPays.length === 0 && <tr><td colSpan={5} style={{ color: "#999" }}>No unpaid completed loads in this period.</td></tr>}
                    {stub.loadPays.map((l) => (
                      <tr key={l.id}>
                        <td>{l.loadNumber}</td>
                        <td>{fmtDate(l.deliveryDate || l.pickupDate)}</td>
                        <td style={{ fontSize: 10, lineHeight: 1.4 }}>{routeFull(l)}</td>
                        <td style={{ textAlign: "right" }}>{l.loadedMiles || "—"}</td>
                        <td style={{ textAlign: "right" }}>{money(l.driverPay)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {stub.driver && stub.driver.payType === "salary" && (
                  <div style={{ fontSize: 11, color: "#666", marginTop: -8, marginBottom: 12 }}>Flat salary for period — not tied to individual loads above.</div>
                )}
                <div className="stub-summary">
                  <table>
                    <tbody>
                      {stub.isMileage && (stub.loadedMilesPay > 0 || stub.emptyMilesPay > 0) && <>
                        <tr><td>Loaded Miles Pay</td><td style={{ textAlign: "right" }}>{money(stub.loadedMilesPay)}</td></tr>
                        <tr><td>Empty Miles Pay</td><td style={{ textAlign: "right" }}>{money(stub.emptyMilesPay)}</td></tr>
                      </>}
                      <tr><td>Gross Pay</td><td style={{ textAlign: "right" }}>{money(stub.grossPay)}</td></tr>
                      {stub.dispatchFee > 0 && <tr><td>Dispatch Fee ({stub.dispatchFeePercent}%)</td><td style={{ textAlign: "right" }}>-{money(stub.dispatchFee)}</td></tr>}
                      {DRIVER_DEDUCTION_FIELDS.map((f) => stub.expenseBreakdown[f.key] > 0 ? (
                        <tr key={f.key}><td>{f.label}</td><td style={{ textAlign: "right" }}>-{money(stub.expenseBreakdown[f.key])}</td></tr>
                      ) : null)}
                      {stub.refunds > 0 && <tr className="refund-row"><td>Refunds</td><td style={{ textAlign: "right" }}>+{money(stub.refunds)}</td></tr>}
                      <tr className="net-row"><td>Net Driver Pay</td><td style={{ textAlign: "right" }}>{money(stub.netPay)}</td></tr>
                    </tbody>
                  </table>
                </div>
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

function FleetMenu({ setFleetView, trucks, drivers, billTos, shippers, receivers }) {
  const items = [
    { key: "trucks", icon: Truck, name: "Trucks", count: trucks.length },
    { key: "drivers", icon: Users, name: "Drivers", count: drivers.length },
    { key: "billto", icon: Building2, name: "Bill To", count: billTos.length },
    { key: "shippers", icon: Warehouse, name: "Shippers", count: shippers.length },
    { key: "receivers", icon: Warehouse, name: "Receivers", count: receivers.length },
  ];
  return (
    <div>
      <div className="section-label-row" style={{ marginTop: 0 }}>
        <div className="section-label" style={{ marginTop: 0 }}>Fleet &amp; Master Data</div>
        <button className="icon-btn settings-btn" onClick={() => setFleetView("settings")} title="Settings"><SettingsIcon size={20} /></button>
      </div>
      {items.map((it) => (
        <div className="fleet-menu-item" key={it.key} onClick={() => setFleetView(it.key)}>
          <div className="fleet-menu-icon"><it.icon size={18} /></div>
          <div className="fleet-menu-text">
            <div className="name">{it.name}</div>
            <div className="count">{it.count} record{it.count === 1 ? "" : "s"}</div>
          </div>
          <ChevronRight size={17} color="#8A93A3" />
        </div>
      ))}
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
        <button className="btn" type="submit">{editingTruckId ? "Update Truck" : "Add Truck"}</button>
        {editingTruckId && <button type="button" className="btn secondary" onClick={() => { setTruckForm(emptyTruck()); setEditingTruckId(null); }}>Cancel Edit</button>}
      </form>
      <div style={{ marginTop: 16 }}>
        {trucks.map((t) => (
          <div className="manage-row" key={t.id}>
            <div className="manage-row-head" style={{ cursor: "default" }}>
              <div>
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontWeight: 600 }}>{t.number}</span>
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
        <div className="field-row"><div className="field"><label>Company Name (optional)</label><input value={driverForm.companyName} onChange={(e) => setDriverForm({ ...driverForm, companyName: e.target.value })} placeholder="e.g. Rasulov Trucking LLC" style={{ fontFamily: "Inter" }} /></div></div>
        <div className="field-row">
          <div className="field">
            <label>Pay Type</label>
            <select value={driverForm.payType} onChange={(e) => setDriverForm({ ...driverForm, payType: e.target.value })}>
              {PAY_TYPES.map((pt) => <option key={pt.key} value={pt.key}>{pt.label}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Rate</label>
            <input type="number" step="0.01" value={driverForm.rate} onChange={(e) => setDriverForm({ ...driverForm, rate: e.target.value })} placeholder={driverForm.payType === "percent" ? "25" : "0.55"} />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Dispatch Fee (%)</label>
            <input type="number" step="0.01" value={driverForm.dispatchFeePercent} onChange={(e) => setDriverForm({ ...driverForm, dispatchFeePercent: e.target.value })} placeholder="e.g. 13" />
          </div>
          <div className="field" />
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
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{d.name}</div>
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
        <div className="field-row">
          <div className="field"><label>Contact (optional)</label><input value={billToForm.contact} onChange={(e) => setBillToForm({ ...billToForm, contact: e.target.value })} placeholder="Contact name" style={{ fontFamily: "Inter" }} /></div>
          <div className="field"><label>Phone (optional)</label><input value={billToForm.phone} onChange={(e) => setBillToForm({ ...billToForm, phone: e.target.value })} placeholder="Phone" style={{ fontFamily: "Inter" }} /></div>
        </div>
        <button className="btn" type="submit">{editingBillToId ? "Update" : "Add Bill To"}</button>
        {editingBillToId && <button type="button" className="btn secondary" onClick={() => { setBillToForm(emptyBillTo()); setEditingBillToId(null); }}>Cancel Edit</button>}
      </form>

      <div className="search-box" style={{ marginTop: 20 }}><Search size={14} color="#8A93A3" /><input value={fleetSearch} onChange={(e) => setFleetSearch(e.target.value)} placeholder="Search Bill To…" /></div>
      {filteredBillTos.map((b) => (
        <div className="manage-row" key={b.id}>
          <div className="manage-row-head" style={{ cursor: "default" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{b.name}</div>
              {(b.contact || b.phone) && <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{[b.contact, b.phone].filter(Boolean).join(" · ")}</div>}
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

function ShippersPage(p) {
  const { setFleetView, shipperForm, setShipperForm, saveShipper, editingShipperId, setEditingShipperId, filteredShippers, editShipper, removeShipper, fleetSearch, setFleetSearch, startImport, askConfirm } = p;
  return (
    <div>
      <button type="button" className="back-btn" onClick={() => setFleetView("menu")}><ChevronLeft size={18} /> Fleet</button>
      <div className="section-label">Shippers</div>
      <button className="import-btn" onClick={() => startImport("shippers")}><UploadCloud size={14} /> Import from Excel</button>
      <form onSubmit={saveShipper}>
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
        <div className="field-row"><div className="field"><label>Contact (optional)</label><input value={shipperForm.contact} onChange={(e) => setShipperForm({ ...shipperForm, contact: e.target.value })} placeholder="Contact info" style={{ fontFamily: "Inter" }} /></div></div>
        <button className="btn" type="submit">{editingShipperId ? "Update" : "Add Shipper"}</button>
        {editingShipperId && <button type="button" className="btn secondary" onClick={() => { setShipperForm(emptyShipper()); setEditingShipperId(null); }}>Cancel Edit</button>}
      </form>

      <div className="search-box" style={{ marginTop: 20 }}><Search size={14} color="#8A93A3" /><input value={fleetSearch} onChange={(e) => setFleetSearch(e.target.value)} placeholder="Search shippers…" /></div>
      {filteredShippers.map((s) => (
        <div className="manage-row" key={s.id}>
          <div className="manage-row-head" style={{ cursor: "default" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{s.companyName}{s.warehouseCode ? ` (${s.warehouseCode})` : ""}</div>
              <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{addr1line(s.street, s.city, s.state, s.zip) || "No address on file"}</div>
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
  const { setFleetView, receiverForm, setReceiverForm, saveReceiver, editingReceiverId, setEditingReceiverId, filteredReceivers, editReceiver, removeReceiver, fleetSearch, setFleetSearch, startImport, askConfirm } = p;
  return (
    <div>
      <button type="button" className="back-btn" onClick={() => setFleetView("menu")}><ChevronLeft size={18} /> Fleet</button>
      <div className="section-label">Receivers</div>
      <button className="import-btn" onClick={() => startImport("receivers")}><UploadCloud size={14} /> Import from Excel</button>
      <form onSubmit={saveReceiver}>
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
        <div className="field-row"><div className="field"><label>Contact (optional)</label><input value={receiverForm.contact} onChange={(e) => setReceiverForm({ ...receiverForm, contact: e.target.value })} placeholder="Contact info" style={{ fontFamily: "Inter" }} /></div></div>
        <button className="btn" type="submit">{editingReceiverId ? "Update" : "Add Receiver"}</button>
        {editingReceiverId && <button type="button" className="btn secondary" onClick={() => { setReceiverForm(emptyReceiver()); setEditingReceiverId(null); }}>Cancel Edit</button>}
      </form>

      <div className="search-box" style={{ marginTop: 20 }}><Search size={14} color="#8A93A3" /><input value={fleetSearch} onChange={(e) => setFleetSearch(e.target.value)} placeholder="Search receivers…" /></div>
      {filteredReceivers.map((r) => (
        <div className="manage-row" key={r.id}>
          <div className="manage-row-head" style={{ cursor: "default" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{r.companyName}{r.warehouseCode ? ` (${r.warehouseCode})` : ""}</div>
              <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{addr1line(r.street, r.city, r.state, r.zip) || "No address on file"}</div>
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

function SettingsTab({ setFleetView, settings, saveStartingNumber, nextLoadNumber, saveSettings }) {
  const [themeChoice, setThemeChoice] = useState(settings.theme || "dark");
  const [themeSaved, setThemeSaved] = useState(false);
  const [company, setCompany] = useState({
    companyName: settings.companyName || "", companyAddress: settings.companyAddress || "",
    dotNumber: settings.dotNumber || "", companyEmail: settings.companyEmail || "",
  });
  const [companySaved, setCompanySaved] = useState(false);

  async function handleSaveTheme() { await saveSettings({ theme: themeChoice }); setThemeSaved(true); setTimeout(() => setThemeSaved(false), 1400); }
  async function handleSaveCompany() { await saveSettings(company); setCompanySaved(true); setTimeout(() => setCompanySaved(false), 1400); }

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
        <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 8 }}>This appears at the top of every printed pay stub.</div>
      </div>

      <div className="settings-card">
        <div className="field"><label>Starting Load Number</label><input type="number" value={settings.startingLoadNumber} onChange={(e) => saveStartingNumber(e.target.value)} /></div>
        <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 8 }}>New loads auto-number sequentially from here. Next load will be #{nextLoadNumber}.</div>
      </div>

      <div className="settings-card">
        <label style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.5, color: "var(--text-dim)", fontWeight: 600, display: "block", marginBottom: 4 }}>Dispatcher Pay Percentage</label>
        <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 14, lineHeight: 1.5 }}>
          Used by the Trips monthly summary only. Dispatch Fee is no longer set here — it's assigned per driver in Fleet → Drivers, since different drivers can have different rates.
        </div>
        <PercentScheduleEditor label="Dispatcher Pay" schedule={settings.dispatcherPaySchedule} defaultValue={DEFAULT_DISPATCHER_PAY} onSave={(sched) => saveSettings({ dispatcherPaySchedule: sched })} />
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
                <select style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", padding: "8px 10px", borderRadius: 8, fontSize: 13 }}
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
