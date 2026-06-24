import { supabase } from "../../services/supabase";

export async function getSettings() {
  const { data, error } = await supabase
    .from("settings")

    .select("*")

    .single();
  if (error) throw new Error(error.message);

  return data;
}

export async function updateSettings(updatedSettings) {
  const { data, error } = await supabase
    .from("settings")

    .update(updatedSettings)

    .eq("id", 1)

    .select()

    .single();
  if (error) throw new Error(error.message);

  return data;
}
