import { supabase } from "../lib/supabase";

export default async function handler(req, res) {
  if (req.method === "GET") {
    var result = await supabase
      .from("words")
      .select("*");

    res.status(200).json(result.data);
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
