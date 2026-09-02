// Quiet Operations: editorial institutional software with a wide operational surface, narrow context rail, restrained Mineral Teal signals, and calm motion.
import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

const MARK = "/manus-storage/campusflow-mark_95d994a5.png";
const TOPOGRAPHIC = "/manus-storage/campusflow-topographic_c754ea48.png";
const PULSE = "/manus-storage/campusflow-pulse_a30357ca.png";
const STUDENT_LIFE = "/manus-storage/campusflow-student-life_f9d6265a.png";

type StudentStatus = "Active" | "On leave" | "Graduated";
type AttendanceState = "Present" | "Absent" | "Unmarked";
type Student = {
  id: number;
  initials: string;
  name: string;
  studentId: string;
  email: string;
  program: string;
  year: number;
  enrolled: string;
  status: StudentStatus;
  tone: string;
};

const initialStudents: Student[] = [
  { id: 1, initials: "AM", name: "Aarav Mehta", studentId: "STU-2024-001", email: "aarav.mehta@example.com", program: "Computer Science", year: 3, enrolled: "26 Aug 2024", status: "Active", tone: "mint" },
  { id: 2, initials: "MS", name: "Maya Sharma", studentId: "STU-2024-002", email: "maya.sharma@example.com", program: "Business Analytics", year: 2, enrolled: "26 Aug 2024", status: "Active", tone: "peach" },
  { id: 3, initials: "LF", name: "Leo Fernandez", studentId: "STU-2023-018", email: "leo.fernandez@example.com", program: "Information Systems", year: 4, enrolled: "18 Aug 2023", status: "Active", tone: "lavender" },
  { id: 4, initials: "NW", name: "Nora Williams", studentId: "STU-2024-011", email: "nora.williams@example.com", program: "Computer Science", year: 1, enrolled: "26 Aug 2024", status: "On leave", tone: "sky" },
];

const navItems = [
  { label: "Overview", icon: LayoutDashboard, path: "/" },
  { label: "Students", icon: UsersRound, path: "/students" },
  { label: "Courses", icon: BookOpen },
  { label: "Attendance", icon: CalendarDays, path: "/attendance" },
  { label: "Reports", icon: BarChart3 },
];

function Avatar({ initials, tone, size = "normal" }: { initials: string; tone: string; size?: "normal" | "small" }) {
  return <span className={`avatar avatar-${tone} ${size === "small" ? "avatar-small" : ""}`}>{initials}</span>;
}

function StatusBadge({ status }: { status: StudentStatus }) {
  return <span className={`status-badge status-${status.toLowerCase().replace(" ", "-")}`}><span className="status-dot" />{status}</span>;
}

function Sidebar({ view, onPlaceholder }: { view: "overview" | "students" | "attendance"; onPlaceholder: (label: string) => void }) {
  return (
    <aside className="sidebar">
      <div className="brand-lockup">
        <img src={MARK} alt="" className="brand-symbol" />
        <span className="brand-name"><strong>Campus</strong><span>Flow</span></span>
      </div>
      <div className="sidebar-section-label">Workspace</div>
      <nav className="sidebar-nav" aria-label="Primary navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.path === "/" ? view === "overview" : item.path === "/students" ? view === "students" : view === "attendance";
          return item.path ? (
            <Link key={item.label} href={item.path} className={`nav-item ${active ? "active" : ""}`}>
              <Icon size={17} strokeWidth={1.8} /><span>{item.label}</span>{active && <span className="nav-active-line" />}
            </Link>
          ) : (
            <button key={item.label} className="nav-item" onClick={() => onPlaceholder(item.label)}><Icon size={17} strokeWidth={1.8} /><span>{item.label}</span><span className="nav-soon">Soon</span></button>
          );
        })}
      </nav>
      <div className="sidebar-spacer" />
      <div className="sidebar-help" onClick={() => onPlaceholder("Help center")} role="button" tabIndex={0}>
        <CircleHelp size={16} /><span>Need a hand?</span><ArrowUpRight size={14} />
      </div>
      <div className="sidebar-profile">
        <Avatar initials="AD" tone="navy" />
        <div><strong>Admin Portal</strong><span>Administrator</span></div>
        <button aria-label="Open settings" onClick={() => onPlaceholder("Settings")}><Settings2 size={16} /></button>
      </div>
    </aside>
  );
}

function Topbar({ view, onAdd, onMenu }: { view: "overview" | "students" | "attendance"; onAdd: () => void; onMenu: () => void }) {
  const [location] = useLocation();
  return (
    <header className="topbar">
      <button className="mobile-menu" onClick={onMenu} aria-label="Open navigation"><Menu size={20} /></button>
      <div className="breadcrumbs"><span>CampusFlow</span><span>/</span><strong>{view === "overview" ? "Overview" : view === "students" ? "Students" : "Attendance"}</strong></div>
      <div className="topbar-actions">
        <button className="icon-button" onClick={() => toast("You’re all caught up", { description: "No new notifications for the moment." })} aria-label="Notifications"><span className="notification-dot" /><Sparkles size={18} /></button>
        <div className="topbar-divider" />
        <button className="admin-menu" onClick={() => toast("Admin Portal", { description: "Account preferences are coming soon." })}><Avatar initials="AD" tone="navy" size="small" /><span>Admin Portal</span><ChevronDown size={14} /></button>
      </div>
    </header>
  );
}

function StatCard({ label, value, note, trend, accent, icon: Icon }: { label: string; value: string; note: string; trend?: "up" | "down"; accent?: boolean; icon: typeof UsersRound }) {
  return <div className={`stat-card ${accent ? "stat-accent" : ""}`}><div className="stat-card-top"><span className="stat-icon"><Icon size={17} /></span><span className="stat-period">This term</span></div><div className="stat-value">{value}</div><div className="stat-footer"><span>{note}</span>{trend && <span className={`stat-trend ${trend}`} >{trend === "up" ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />} {trend === "up" ? "2.4%" : "0.8%"}</span>}</div></div>;
}

function Overview({ students, onAdd, onViewStudents, onPlaceholder }: { students: Student[]; onAdd: () => void; onViewStudents: () => void; onPlaceholder: (label: string) => void }) {
  return <>
    <section className="welcome-row">
      <div><span className="section-kicker">Tuesday, 03 September 2024</span><h1>Good morning, <em>Admin.</em></h1><p>Here’s a clear view of what’s happening across your student community.</p></div>
      <button className="primary-button" onClick={onAdd}><Plus size={17} /> Add student</button>
    </section>
    <section className="stats-grid">
      <StatCard label="Total students" value="1,248" note="Across all programs" trend="up" icon={UsersRound} />
      <StatCard label="Active students" value="1,091" note="Currently enrolled" trend="up" accent icon={ClipboardCheck} />
      <StatCard label="New this term" value="184" note="Since 26 August" trend="up" icon={UserRound} />
      <StatCard label="Attendance rate" value="94.8%" note="Across 24 classes" trend="down" icon={Clock3} />
    </section>
    <section className="hero-grid">
      <div className="campus-hero">
        <img src={TOPOGRAPHIC} alt="Abstract topographic campus map" />
        <div className="hero-overlay" />
        <div className="campus-hero-copy"><span className="section-kicker light">CAMPUS PULSE</span><h2>Make room for<br /><em>what matters.</em></h2><p>Students, courses, and momentum — all in one composed view.</p><button className="dark-button" onClick={() => onPlaceholder("Campus pulse report")}>Open report <ArrowUpRight size={15} /></button></div>
        <div className="hero-caption"><span className="live-dot" /> Live overview <span className="caption-divider" /> Updated just now</div>
      </div>
      <div className="pulse-card panel-card"><div className="panel-heading"><div><span className="section-kicker">MOMENTUM</span><h3>Enrollment pulse</h3></div><button className="more-button" onClick={() => onPlaceholder("Enrollment pulse options")}><MoreHorizontal size={18} /></button></div><div className="pulse-value">+18.6% <span>vs. last term</span></div><img src={PULSE} alt="Abstract enrollment pulse chart" className="pulse-image" /><div className="pulse-legend"><span><i className="legend-teal" /> Active</span><span><i className="legend-gray" /> Previous</span></div></div>
    </section>
    <section className="bottom-grid">
      <div className="panel-card directory-card"><div className="panel-heading"><div><span className="section-kicker">DIRECTORY</span><h3>Recently enrolled</h3></div><button className="text-button" onClick={onViewStudents}>View all <ArrowUpRight size={14} /></button></div><StudentTable students={students.slice(0, 4)} compact onEdit={() => onPlaceholder("Edit student")} onDelete={() => onPlaceholder("Delete student")} /></div>
      <div className="panel-card checklist-card"><div className="panel-heading"><div><span className="section-kicker">UPCOMING</span><h3>Term checklist</h3></div><button className="more-button" onClick={() => onPlaceholder("Checklist options")}><MoreHorizontal size={18} /></button></div><div className="checklist"><div className="check-row"><span className="check-icon complete"><Check size={13} /></span><div><strong>Enrollment window opened</strong><span>26 Aug 2024</span></div></div><div className="check-row"><span className="check-icon complete"><Check size={13} /></span><div><strong>Course catalog published</strong><span>29 Aug 2024</span></div></div><div className="check-row"><span className="check-icon pending">3</span><div><strong>Pending profile reviews</strong><span>Needs your attention</span></div></div></div><button className="soft-button" onClick={() => onPlaceholder("Checklist review")}>Review checklist <ArrowUpRight size={14} /></button></div>
    </section>
    <section className="student-life-strip"><div className="student-life-copy"><span className="section-kicker">BEYOND THE RECORD</span><h3>See the routes<br /><em>behind the records.</em></h3><p>CampusFlow keeps the operational picture clear while keeping the people behind it in view.</p><button className="text-button" onClick={() => onPlaceholder("Student experience report")}>Explore the picture <ArrowUpRight size={14} /></button></div><img src={STUDENT_LIFE} alt="Students walking through a leafy campus courtyard" /></section>
  </>;
}

function StudentTable({ students, compact, onEdit, onDelete }: { students: Student[]; compact?: boolean; onEdit: (student: Student) => void; onDelete: (student: Student) => void }) {
  return <div className="table-wrap"><table><thead><tr><th>Student</th><th>Program</th><th>Year</th>{!compact && <th>Enrolled</th>}<th>Status</th><th aria-label="Actions" /></tr></thead><tbody>{students.map((student) => <tr key={student.id}><td><div className="student-cell"><Avatar initials={student.initials} tone={student.tone} /><div><strong>{student.name}</strong><span>{student.studentId}</span></div></div></td><td><span className="program-name">{student.program}</span><span className="email-name">{student.email}</span></td><td>Year {student.year}</td>{!compact && <td>{student.enrolled}</td>}<td><StatusBadge status={student.status} /></td><td><button className="row-more" onClick={() => onEdit(student)} aria-label={`Edit ${student.name}`}><MoreHorizontal size={18} /></button></td></tr>)}</tbody></table></div>;
}

function StudentsView({ students, onAdd, onEdit, onDelete, onPlaceholder }: { students: Student[]; onAdd: () => void; onEdit: (student: Student) => void; onDelete: (student: Student) => void; onPlaceholder: (label: string) => void }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | StudentStatus>("All");
  const filtered = useMemo(() => students.filter((student) => { const text = `${student.name} ${student.studentId} ${student.program}`.toLowerCase(); return text.includes(query.toLowerCase()) && (filter === "All" || student.status === filter); }), [students, query, filter]);
  const active = students.filter((student) => student.status === "Active").length;
  const onLeave = students.filter((student) => student.status === "On leave").length;
  return <><section className="welcome-row directory-header"><div><span className="section-kicker">STUDENT DIRECTORY / OPERATIONS</span><h1>Students <span className="title-count">{students.length}</span></h1><p>A composed view of profiles, enrollment status, and attention items.</p></div><button className="primary-button" onClick={onAdd}><Plus size={17} /> Add student</button></section><div className="students-layout"><section className="panel-card full-directory"><div className="directory-toolbar"><div className="search-field"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, ID, or program..." aria-label="Search students" />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={15} /></button>}</div><div className="filter-controls"><div className="filter-select"><SlidersHorizontal size={15} /><select value={filter} onChange={(e) => setFilter(e.target.value as "All" | StudentStatus)} aria-label="Filter by status"><option>All</option><option>Active</option><option>On leave</option><option>Graduated</option></select><ChevronDown size={14} /></div><button className="export-button" onClick={() => onPlaceholder("Export CSV")}>Export <ArrowDownRight size={15} /></button></div></div><div className="directory-summary"><span>Showing <strong>{filtered.length}</strong> of {students.length} students</span><span className="summary-status"><i /> Last synced just now</span></div><StudentTable students={filtered} onEdit={onEdit} onDelete={onDelete} />{filtered.length === 0 && <div className="empty-state"><Search size={22} /><strong>No students match that search.</strong><span>Try a different name, ID, or status.</span></div>}</section><aside className="directory-rail"><div className="rail-card rail-health"><div className="panel-heading"><div><span className="section-kicker">PROFILE HEALTH</span><h3>Directory pulse</h3></div><span className="rail-live"><i /> Live</span></div><div className="health-number">96<span>%</span></div><p>Profiles have the core details needed for this term.</p><div className="health-track"><span style={{ width: "96%" }} /></div><div className="health-meta"><span>Complete profiles</span><strong>1,198</strong></div><div className="health-meta"><span>Need attention</span><strong className="attention-number">50</strong></div></div><div className="rail-card rail-queue"><span className="section-kicker">ATTENTION QUEUE</span><h3>Keep the picture current.</h3><div className="queue-row"><span className="queue-icon queue-teal"><UsersRound size={14} /></span><div><strong>{active} active records</strong><span>Ready for daily operations</span></div></div><div className="queue-row"><span className="queue-icon queue-peach"><Clock3 size={14} /></span><div><strong>{onLeave} profile{onLeave === 1 ? "" : "s"} on leave</strong><span>Review before next sync</span></div></div><button className="soft-button" onClick={() => onPlaceholder("Profile review queue")}>Open review queue <ArrowUpRight size={14} /></button></div><div className="rail-note"><span className="note-rule" /><div><strong>Built for clarity.</strong><p>CampusFlow keeps the operational details close without crowding the people behind them.</p></div></div></aside></div></>;
}

function AttendanceView({ students, onPlaceholder }: { students: Student[]; onPlaceholder: (label: string) => void }) {
  const [selectedCourse, setSelectedCourse] = useState("CS 301 · Data Structures");
  const [selectedDate, setSelectedDate] = useState("2024-09-03");
  const [attendance, setAttendance] = useState<Record<number, AttendanceState>>({ 1: "Present", 2: "Present", 3: "Unmarked", 4: "Absent" });
  const [filter, setFilter] = useState<"All" | AttendanceState>("All");
  const present = Object.values(attendance).filter((state) => state === "Present").length;
  const absent = Object.values(attendance).filter((state) => state === "Absent").length;
  const unmarked = students.length - present - absent;
  const filteredStudents = students.filter((student) => filter === "All" || attendance[student.id] === filter);
  const markStudent = (id: number, state: AttendanceState) => setAttendance((current) => ({ ...current, [id]: state }));
  const markAllPresent = () => { setAttendance(Object.fromEntries(students.map((student) => [student.id, "Present"])) as Record<number, AttendanceState>); toast.success("Everyone marked present", { description: `${students.length} students updated for this class.` }); };
  const saveAttendance = () => toast.success("Attendance saved", { description: `${present} present · ${absent} absent · ${unmarked} unmarked` });
  return <><section className="welcome-row attendance-header"><div><span className="section-kicker">ATTENDANCE / DAILY ROSTER</span><h1>Take attendance.</h1><p>Mark the room in a few calm clicks, then keep the record moving.</p></div><button className="primary-button" onClick={saveAttendance}><Check size={17} /> Save attendance</button></section><div className="attendance-layout"><section className="panel-card attendance-main"><div className="attendance-controls"><label>Course<select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}><option>CS 301 · Data Structures</option><option>CS 204 · Web Engineering</option><option>BA 210 · Business Analytics</option></select></label><label>Date<input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} /></label><div className="control-spacer" /><button className="outline-button" onClick={() => onPlaceholder("Previous attendance")}><Clock3 size={15} /> History</button></div><div className="attendance-toolbar"><div><span className="section-kicker">{selectedCourse}</span><h3>Daily roster <span className="title-count">{students.length}</span></h3></div><div className="attendance-actions"><button className="bulk-button" onClick={markAllPresent}><Check size={14} /> Mark all present</button><div className="attendance-filter"><select value={filter} onChange={(e) => setFilter(e.target.value as "All" | AttendanceState)} aria-label="Filter attendance"><option>All</option><option>Present</option><option>Absent</option><option>Unmarked</option></select><ChevronDown size={13} /></div></div></div><div className="attendance-legend"><span><i className="legend-present" /> Present <strong>{present}</strong></span><span><i className="legend-absent" /> Absent <strong>{absent}</strong></span><span><i className="legend-unmarked" /> Unmarked <strong>{unmarked}</strong></span></div><div className="attendance-list">{filteredStudents.map((student, index) => { const state = attendance[student.id] ?? "Unmarked"; return <div className="attendance-row" key={student.id} style={{ animationDelay: `${index * 35}ms` }}><div className="attendance-person"><Avatar initials={student.initials} tone={student.tone} /><div><strong>{student.name}</strong><span>{student.studentId} · {student.program}</span></div></div><div className="attendance-markers"><button className={`marker-button present ${state === "Present" ? "selected" : ""}`} onClick={() => markStudent(student.id, "Present")}><Check size={14} /> Present</button><button className={`marker-button absent ${state === "Absent" ? "selected" : ""}`} onClick={() => markStudent(student.id, "Absent")}><X size={14} /> Absent</button></div><span className={`attendance-state state-${state.toLowerCase()}`}>{state}</span></div>; })}</div>{filteredStudents.length === 0 && <div className="empty-state"><Search size={22} /><strong>No students in this view.</strong><span>Try a different attendance filter.</span></div>}<div className="attendance-footer"><span><Sparkles size={14} /> Changes are held locally until you save.</span><button className="text-button" onClick={() => setFilter("All")}>Reset view <ArrowUpRight size={14} /></button></div></section><aside className="attendance-rail"><div className="attendance-summary rail-card"><div className="panel-heading"><div><span className="section-kicker">TODAY’S SUMMARY</span><h3>{selectedDate === "2024-09-03" ? "Tuesday, 03 Sep" : selectedDate}</h3></div><span className="summary-ring">{Math.round((present / Math.max(students.length, 1)) * 100)}%</span></div><div className="summary-bar"><span className="bar-present" style={{ width: `${(present / Math.max(students.length, 1)) * 100}%` }} /><span className="bar-absent" style={{ width: `${(absent / Math.max(students.length, 1)) * 100}%` }} /><span className="bar-unmarked" style={{ width: `${(unmarked / Math.max(students.length, 1)) * 100}%` }} /></div><div className="summary-stat"><span><i className="legend-present" /> Present</span><strong>{present} <small>/ {students.length}</small></strong></div><div className="summary-stat"><span><i className="legend-absent" /> Absent</span><strong>{absent} <small>/ {students.length}</small></strong></div><div className="summary-stat"><span><i className="legend-unmarked" /> Unmarked</span><strong>{unmarked} <small>/ {students.length}</small></strong></div></div><div className="rail-card teacher-note"><span className="section-kicker">TEACHER NOTE</span><h3>Start with the room.</h3><p>Mark attendance from the roster. Any student you don’t touch stays visible as unmarked until the record is saved.</p><button className="soft-button" onClick={() => onPlaceholder("Attendance history")}>View attendance history <ArrowUpRight size={14} /></button></div><div className="attendance-tip"><span className="tip-icon">⌁</span><div><strong>Tip for a faster roll call</strong><p>Use “Mark all present” first, then switch only the few exceptions to absent.</p></div></div></aside></div></>;
}

function StudentModal({ student, onClose, onSave }: { student: Student | null; onClose: () => void; onSave: (student: Student) => void }) {
  const editing = Boolean(student);
  const [form, setForm] = useState<Student>(student ?? { id: Date.now(), initials: "", name: "", studentId: "STU-2024-", email: "", program: "", year: 1, enrolled: "03 Sep 2024", status: "Active", tone: "mint" });
  const update = (key: keyof Student, value: string | number) => setForm((current) => ({ ...current, [key]: value, ...(key === "name" ? { initials: value.toString().split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase() } : {}) }));
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div className="student-modal" role="dialog" aria-modal="true" aria-labelledby="student-modal-title"><div className="modal-header"><div><span className="section-kicker">DIRECTORY / STUDENTS</span><h2 id="student-modal-title">{editing ? "Edit student" : "Add student"}</h2><p>{editing ? "Keep this profile current and complete." : "Create a clean, complete profile for your directory."}</p></div><button className="close-button" onClick={onClose} aria-label="Close dialog"><X size={19} /></button></div><div className="modal-form"><label>Student name<input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Aarav Mehta" autoFocus /></label><label>Student ID<input value={form.studentId} onChange={(e) => update("studentId", e.target.value)} placeholder="STU-2024-001" /></label><label>Email address<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="student@example.com" /></label><label>Program<input value={form.program} onChange={(e) => update("program", e.target.value)} placeholder="Computer Science" /></label><label>Year level<select value={form.year} onChange={(e) => update("year", Number(e.target.value))}><option value={1}>1st year</option><option value={2}>2nd year</option><option value={3}>3rd year</option><option value={4}>4th year</option></select></label><label>Status<select value={form.status} onChange={(e) => update("status", e.target.value)}><option>Active</option><option>On leave</option><option>Graduated</option></select></label></div><div className="modal-footer"><span>All profile changes are saved locally.</span><div><button className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" onClick={() => form.name && form.email ? onSave(form) : toast.error("Add a name and email to continue")}>{editing ? "Save changes" : "Add student"}</button></div></div></div></div>;
}

export default function Home() {
  const [location, navigate] = useLocation();
  const view = location === "/students" ? "students" : location === "/attendance" ? "attendance" : "overview";
  const [students, setStudents] = useState(initialStudents);
  const [modalStudent, setModalStudent] = useState<Student | null | undefined>(undefined);
  const [mobileNav, setMobileNav] = useState(false);
  const placeholder = (label: string) => toast(`${label} is coming soon`, { description: "This portfolio concept focuses on the core student workflow." });
  const saveStudent = (student: Student) => { setStudents((current) => current.some((item) => item.id === student.id) ? current.map((item) => item.id === student.id ? student : item) : [student, ...current]); setModalStudent(undefined); toast.success(student.id > 4 ? "Student added" : "Profile updated", { description: `${student.name} is now in your directory.` }); };
  const deleteStudent = (student: Student) => { setStudents((current) => current.filter((item) => item.id !== student.id)); toast.success("Student removed", { description: `${student.name} was removed from this view.` }); };
  return <div className="app-shell"><Sidebar view={view} onPlaceholder={placeholder} /><div className={`mobile-nav-overlay ${mobileNav ? "open" : ""}`} onClick={() => setMobileNav(false)} /><aside className={`mobile-nav-panel ${mobileNav ? "open" : ""}`}><div className="mobile-nav-top"><div className="brand-lockup"><img src={MARK} alt="" className="brand-symbol" /><span className="brand-name"><strong>Campus</strong><span>Flow</span></span></div><button onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={19} /></button></div><nav>{navItems.map((item) => item.path ? <Link key={item.label} href={item.path} onClick={() => setMobileNav(false)} className={`nav-item ${item.path === "/" ? view === "overview" ? "active" : "" : item.path === "/students" ? view === "students" ? "active" : "" : view === "attendance" ? "active" : ""}`}><item.icon size={17} /><span>{item.label}</span></Link> : <button key={item.label} className="nav-item" onClick={() => { setMobileNav(false); placeholder(item.label); }}><item.icon size={17} /><span>{item.label}</span><span className="nav-soon">Soon</span></button>)}</nav></aside><main className="main-workspace"><Topbar view={view} onAdd={() => setModalStudent(null)} onMenu={() => setMobileNav(true)} /><div className="content-area">{view === "overview" ? <Overview students={students} onAdd={() => setModalStudent(null)} onViewStudents={() => navigate("/students")} onPlaceholder={placeholder} /> : view === "students" ? <StudentsView students={students} onAdd={() => setModalStudent(null)} onEdit={(student) => setModalStudent(student)} onDelete={deleteStudent} onPlaceholder={placeholder} /> : <AttendanceView students={students} onPlaceholder={placeholder} />}</div></main>{modalStudent !== undefined && <StudentModal student={modalStudent} onClose={() => setModalStudent(undefined)} onSave={saveStudent} />}</div>;
}
