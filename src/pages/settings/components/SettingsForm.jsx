import "./SettingsForm.css";

export default function SettingsForm({
  settings,
  handleChange,
  handleSubmit,
  isPending,
}) {
  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <div className="settings-card">
        <h2>
          <span>📅</span> Booking Settings
        </h2>

        <div className="form-group">
          <label>Min Booking Length (Nights)</label>
          <input
            type="number"
            name="minbookinglength"
            value={settings.minbookinglength || ""}
            onChange={handleChange}
            min={1}
          />
        </div>

        <div className="form-group">
          <label>Max Booking Length (Nights)</label>
          <input
            type="number"
            name="maxbookinglength"
            value={settings.maxbookinglength || ""}
            onChange={handleChange}
            min={1}
          />
        </div>

        <div className="form-group">
          <label>Max Guests Per Booking</label>
          <input
            type="number"
            name="maxguestsperbooking"
            value={settings.maxguestsperbooking || ""}
            onChange={handleChange}
            min={1}
          />
        </div>
      </div>

      <div className="settings-card">
        <h2>
          <span>💰</span> Pricing & Finance
        </h2>

        <div className="form-group">
          <label>Breakfast Price per Guest</label>
          <input
            type="number"
            name="breakfastprice"
            value={settings.breakfastprice || ""}
            onChange={handleChange}
            min={0}
          />
        </div>

        <div className="form-group">
          <label>Default Currency</label>
          <select
            name="currency"
            value={settings.currency || "USD"}
            onChange={handleChange}
          >
            <option value="USD">USD ($) - US Dollar</option>
            <option value="EUR">EUR (€) - Euro</option>
            <option value="TRY">TRY (₺) - Turkish Lira</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button
          className="save-settings-btn"
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <div className="btn-spinner"></div>
          ) : (
            "Save Hotel Settings"
          )}
        </button>
      </div>
    </form>
  );
}
