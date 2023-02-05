import { zodiosApp } from "@zodios/express";
import { spec } from "../spec/api";
import { container } from "../services/container";

export const temperature = zodiosApp(spec).get(
  "/temperature",
  async (req, res) => {
    const temp = container.get("temp");

    res.status(200).json({
      scale: req.query.to,
      value: await temp.convert(req.query.to, req.query.value),
    });
  }
);
