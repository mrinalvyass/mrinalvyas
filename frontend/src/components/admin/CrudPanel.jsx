import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

function createInitialForm(fields) {
  return fields.reduce((accumulator, field) => {
    accumulator[field.name] = field.defaultValue ?? "";
    return accumulator;
  }, {});
}

export function CrudPanel({
  title,
  fields,
  items,
  onCreate,
  onUpdate,
  onDelete,
  itemLabel,
  extraFormContent,
}) {
  const [form, setForm] = useState(createInitialForm(fields));
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!editingId) {
      setForm(createInitialForm(fields));
    }
  }, [editingId, fields]);

  function startEdit(item) {
    const nextForm = createInitialForm(fields);
    fields.forEach((field) => {
      nextForm[field.name] = item[field.name] ?? field.defaultValue ?? "";
    });
    setForm(nextForm);
    setEditingId(item.id);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setBusy(true);
      if (editingId) {
        await onUpdate(editingId, form);
      } else {
        await onCreate(form);
      }
      setEditingId(null);
      setForm(createInitialForm(fields));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="glass-card admin-panel-card">
      <div className="admin-panel-header">
        <div>
          <span className="eyebrow">CRUD Manager</span>
          <h3>{title}</h3>
        </div>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-grid">
          {fields.map((field) => (
            <label key={field.name} className={field.multiline ? "full-width" : ""}>
              {field.label}
              {field.multiline ? (
                <textarea
                  rows="4"
                  value={form[field.name]}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      [field.name]: event.target.value,
                    }))
                  }
                />
              ) : field.type === "checkbox" ? (
                <input
                  type="checkbox"
                  checked={Boolean(form[field.name])}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      [field.name]: event.target.checked,
                    }))
                  }
                />
              ) : (
                <input
                  type={field.type || "text"}
                  value={form[field.name]}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      [field.name]:
                        field.type === "number"
                          ? Number(event.target.value)
                          : event.target.value,
                    }))
                  }
                />
              )}
            </label>
          ))}
          {extraFormContent?.(form, setForm)}
        </div>

        <div className="admin-actions">
          <button type="submit" className="primary-button" disabled={busy}>
            {editingId ? <Pencil size={16} /> : <Plus size={16} />}
            {editingId ? "Update" : "Create"} {itemLabel}
          </button>
          {editingId && (
            <button
              type="button"
              className="secondary-button"
              onClick={() => setEditingId(null)}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-list">
        {items.map((item) => (
          <article key={item.id} className="admin-list-item">
            <div>
              <strong>{item.title || item.name || item.label || item.organization}</strong>
              <p>{item.description || item.category || item.timeline || item.sectionKey}</p>
            </div>
            <div className="admin-item-actions">
              <button type="button" onClick={() => startEdit(item)}>
                <Pencil size={16} />
              </button>
              {onDelete && (
                <button type="button" onClick={() => onDelete(item.id)}>
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
