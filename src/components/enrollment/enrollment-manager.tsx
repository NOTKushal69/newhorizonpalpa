"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ENROLLMENT_FIELDS,
  EXPORT_COLUMNS,
  STATUS_OPTIONS,
  type Enrollment,
  type EnrollmentInput,
  type EnrollmentStatus,
  emptyEnrollment,
  loadEnrollments,
  makeId,
  saveEnrollments,
} from "@/lib/enrollment";

type View = "cards" | "table";

const statusClass: Record<EnrollmentStatus, string> = {
  New: "bg-slate-100 text-slate-700",
  Contacted: "bg-sky-100 text-sky-700",
  Enrolled: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
};

const inputCls =
  "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-600/20";

export function EnrollmentManager() {
  const [records, setRecords] = useState<Enrollment[]>([]);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<View>("cards");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | EnrollmentStatus>("All");

  // Form state: editingId null = closed, "" = adding new, otherwise editing.
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EnrollmentInput>(emptyEnrollment);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmDelete, setConfirmDelete] = useState<Enrollment | null>(null);

  // Load once on mount (localStorage isn't available during SSR, so this can't
  // be a lazy initial state — the effect is the hydration-safe way to do it).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecords(loadEnrollments());
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) saveEnrollments(records);
  }, [records, ready]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return records
      .filter((r) => (statusFilter === "All" ? true : r.status === statusFilter))
      .filter((r) =>
        q
          ? [r.studentName, r.guardianName, r.phone, r.email, r.grade]
              .join(" ")
              .toLowerCase()
              .includes(q)
          : true,
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [records, search, statusFilter]);

  const counts = useMemo(() => {
    const by = (s: EnrollmentStatus) => records.filter((r) => r.status === s).length;
    return {
      total: records.length,
      New: by("New"),
      Contacted: by("Contacted"),
      Enrolled: by("Enrolled"),
    };
  }, [records]);

  function openAdd() {
    setForm(emptyEnrollment);
    setErrors({});
    setEditingId("");
  }
  function openEdit(r: Enrollment) {
    const { id: _id, createdAt: _c, ...rest } = r;
    void _id;
    void _c;
    setForm(rest);
    setErrors({});
    setEditingId(r.id);
  }
  function closeForm() {
    setEditingId(null);
    setErrors({});
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (form.studentName.trim().length < 2) e.studentName = "Enter the student's name.";
    if (form.guardianName.trim().length < 2) e.guardianName = "Enter a parent/guardian name.";
    if (!/^[0-9+\-\s]{7,}$/.test(form.phone)) e.phone = "Enter a valid phone number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email, or leave it blank.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    if (editingId) {
      // Update existing record.
      setRecords((prev) =>
        prev.map((r) => (r.id === editingId ? { ...r, ...form } : r)),
      );
    } else {
      // Create new record.
      const record: Enrollment = {
        ...form,
        id: makeId(),
        createdAt: new Date().toISOString(),
      };
      setRecords((prev) => [record, ...prev]);
    }
    closeForm();
  }

  function remove(id: string) {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    setConfirmDelete(null);
  }

  async function exportExcel() {
    if (records.length === 0) return;
    const rows = records.map((r) =>
      Object.fromEntries(
        EXPORT_COLUMNS.map((c) => [
          c.header,
          c.key === "createdAt"
            ? new Date(r.createdAt).toLocaleString()
            : (r[c.key] ?? ""),
        ]),
      ),
    );
    // Dynamic import keeps SheetJS out of the initial page bundle.
    const XLSX = await import("xlsx");
    const ws = XLSX.utils.json_to_sheet(rows, {
      header: EXPORT_COLUMNS.map((c) => c.header),
    });
    ws["!cols"] = EXPORT_COLUMNS.map((c) => ({ wch: Math.max(12, c.header.length + 2) }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Enrollments");
    const stamp = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `new-horizon-enrollments-${stamp}.xlsx`);
  }

  if (!ready) {
    return <p className="text-muted-foreground py-10 text-center text-sm">Loading…</p>;
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total", value: counts.total },
          { label: "New", value: counts.New },
          { label: "Contacted", value: counts.Contacted },
          { label: "Enrolled", value: counts.Enrolled },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <p className="font-serif text-2xl font-extrabold text-navy-900">{s.value}</p>
            <p className="text-xs font-medium text-ink/60">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, phone, email…"
          className={`${inputCls} w-full sm:w-64`}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "All" | EnrollmentStatus)}
          className={`${inputCls} w-40`}
        >
          <option value="All">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-black/10 p-0.5">
            {(["cards", "table"] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize ${
                  view === v ? "bg-navy-900 text-white" : "text-ink/70 hover:bg-navy-50"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button onClick={exportExcel} disabled={records.length === 0} className="btn btn-ghost disabled:opacity-50">
            Export to Excel
          </button>
          <button onClick={openAdd} className="btn btn-gold">+ Add Enrollment</button>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed py-16 text-center">
          <p className="font-medium text-navy-900">No enrollments yet</p>
          <p className="mt-1 text-sm text-ink/60">
            Click <span className="font-semibold">Add Enrollment</span> to record the first one.
          </p>
        </div>
      ) : view === "cards" ? (
        /* ── Cards view ── */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <article key={r.id} className="card flex flex-col p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg font-bold text-navy-900">{r.studentName}</h3>
                  <p className="text-xs text-ink/55">{r.grade}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClass[r.status]}`}>
                  {r.status}
                </span>
              </div>
              <dl className="mt-3 space-y-1 text-sm text-ink/75">
                <Row label="Guardian" value={r.guardianName} />
                <Row label="Phone" value={r.phone} />
                {r.email ? <Row label="Email" value={r.email} /> : null}
                {r.previousSchool ? <Row label="Prev. school" value={r.previousSchool} /> : null}
                {r.address ? <Row label="Address" value={r.address} /> : null}
              </dl>
              {r.notes ? (
                <p className="mt-2 rounded-md bg-mist px-2.5 py-1.5 text-xs text-ink/70">{r.notes}</p>
              ) : null}
              <div className="mt-4 flex gap-2 border-t border-black/5 pt-3">
                <button onClick={() => openEdit(r)} className="text-sm font-medium text-navy-700 hover:text-navy-900">
                  Edit
                </button>
                <button onClick={() => setConfirmDelete(r)} className="text-sm font-medium text-crest hover:underline">
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* ── Table view ── */
        <div className="overflow-x-auto rounded-xl border border-black/10">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-mist text-xs uppercase tracking-wide text-ink/60">
              <tr>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Applying for</th>
                <th className="px-4 py-3">Guardian</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-mist/50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-navy-900">{r.studentName}</div>
                    <div className="text-xs text-ink/50">{r.email || r.address || "—"}</div>
                  </td>
                  <td className="px-4 py-3 text-ink/75">{r.grade}</td>
                  <td className="px-4 py-3 text-ink/75">{r.guardianName}</td>
                  <td className="px-4 py-3 text-ink/75">{r.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClass[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(r)} className="mr-3 text-navy-700 hover:text-navy-900">Edit</button>
                    <button onClick={() => setConfirmDelete(r)} className="text-crest hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Add / Edit form (modal) ── */}
      {editingId !== null && (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-navy-950/60 p-4 backdrop-blur-sm">
          <form
            onSubmit={submit}
            className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lift sm:p-8"
          >
            <h2 className="font-serif text-xl font-bold text-navy-900">
              {editingId ? "Edit enrollment" : "New enrollment"}
            </h2>
            <p className="mt-1 text-sm text-ink/60">
              Records are saved on this device. Use “Export to Excel” to download them.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {ENROLLMENT_FIELDS.map((f) => (
                <div key={f.key} className={f.full ? "sm:col-span-2" : ""}>
                  <label htmlFor={f.key} className="mb-1.5 block text-sm font-medium text-navy-900">
                    {f.label} {f.required ? <span className="text-crest">*</span> : null}
                  </label>
                  {f.type === "select" ? (
                    <select
                      id={f.key}
                      value={form[f.key]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className={inputCls}
                    >
                      {f.options!.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  ) : f.type === "textarea" ? (
                    <textarea
                      id={f.key}
                      rows={2}
                      value={form[f.key]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className={inputCls}
                    />
                  ) : (
                    <input
                      id={f.key}
                      type={f.type}
                      value={form[f.key]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className={inputCls}
                    />
                  )}
                  {errors[f.key] ? (
                    <p className="mt-1 text-xs text-crest">{errors[f.key]}</p>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={closeForm} className="btn btn-ghost">Cancel</button>
              <button type="submit" className="btn btn-navy">
                {editingId ? "Save changes" : "Add enrollment"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Delete confirm ── */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-navy-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lift">
            <h3 className="font-serif text-lg font-bold text-navy-900">Delete enrollment?</h3>
            <p className="mt-1 text-sm text-ink/65">
              Remove <span className="font-semibold">{confirmDelete.studentName}</span>? This can&apos;t be undone.
            </p>
            <div className="mt-5 flex justify-center gap-2">
              <button onClick={() => setConfirmDelete(null)} className="btn btn-ghost">Cancel</button>
              <button
                onClick={() => remove(confirmDelete.id)}
                className="btn bg-crest text-white hover:bg-crest/90"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="shrink-0 text-ink/45">{label}:</dt>
      <dd className="truncate">{value}</dd>
    </div>
  );
}
