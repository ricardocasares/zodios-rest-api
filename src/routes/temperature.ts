import { zodiosApp } from "@zodios/express";
import { spec } from "../spec/api";
import { container } from "../services/container";

export const temperature = zodiosApp(spec).get(
  "/temperature",
  async (req, res) => {
    try {
      const temp = container.get("temp");
      const value = await temp.convert(req.query.to, req.query.value);

      res.status(200).json({
        scale: req.query.to,
        value,
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal error",
      });
    }
  }
);
