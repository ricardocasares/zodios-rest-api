import { zodiosApp } from "@zodios/express";
import { spec } from "../api";
import { container } from "../container";

export const temperature = zodiosApp(spec).get(
  "/temperature",
  async (req, res) => {
    const temp = container.get("temp");

    res.json({
      scale: req.query.to,
      value: await temp.convert(req.query.to, req.query.value),
    });
  }
);
