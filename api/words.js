import { supabase } from "../lib/supabase.js";
// troubleshootingg for .js add for vercel

export default async function handler(req, res) {
  if (req.method === "GET") {
    var result = await supabase
      .from("words")
      .select("*");

    res.status(200).json(result.data);
    return;
  }

  if (req.method === "POST") {
    var word = req.body.word;

    if (!word) {
      res.status(400).json({ error: "Missing word" });
      return;
    }

    await supabase
      .from("words")
      .insert([{ word: word }]);

    res.status(201).json({ success: true });
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
