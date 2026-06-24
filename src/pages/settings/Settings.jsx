import { useState, useEffect } from "react";

import SettingsHeader from "./components/SettingsHeader";
import SettingsForm from "./components/SettingsForm";

import { useSettings } from "../../features/settings/useSettings";
import { useUpdateSettings } from "../../features/settings/useUpdateSettings";

import "./Settings.css";

export default function Settings() {
  const { data, isLoading } = useSettings();

  const { mutate: updateSettings, isPending } = useUpdateSettings();

  const [settings, setSettings] = useState(null);

  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data]);

  if (isLoading || !settings) {
    return (
      <div className="settings-loading">
        <div className="spinner"></div>
        <p>Loading settings...</p>
      </div>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setSettings({
      ...settings,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const cleanSettingsData = {
      minbookinglength: Number(settings.minbookinglength),
      maxbookinglength: Number(settings.maxbookinglength),
      maxguestsperbooking: Number(settings.maxguestsperbooking),
      breakfastprice: Number(settings.breakfastprice),
      currency: settings.currency,
    };

    updateSettings(cleanSettingsData);
  }

  return (
    <div className="settings-page">
      <SettingsHeader />
      <SettingsForm
        settings={settings}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isPending={isPending}
      />
    </div>
  );
}
