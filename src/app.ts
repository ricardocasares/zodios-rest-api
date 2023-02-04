import { zodiosApp } from "@zodios/express";
import { spec } from "@app/api";
import { convert } from "@app/convert";

export const app = zodiosApp(spec).get("/temperature", (req, res) =>
  res.json({
    scale: req.query.to,
    value: convert(req.query.to, req.query.value),
  })
);
