import { z, ZodError } from "zod";
import express, { NextFunction, Request, Response } from "express";
import { Endpoint } from "./endpoint";

const wait = (x: number) => new Promise((res) => setTimeout(res, x));

const helloEndpoint = new Endpoint({
  method: "get",
  path: "/greet/:name",

  query: z.object({
    time: z.enum(["am", "pm"]).describe("The time of the day"),
  }),

  params: z.object({
    name: z.string().describe("The person's name"),
  }),

  response: z.object({
    status: z.literal("ok"),
    data: z.object({ greeting: z.string() })
  }),

  async handler(req, res) {
    const time = req.query.time;
    const name = req.params.name;
    const timeOfDay = {
      "am": "morning",
      "pm": "afternoon"
    };

    await wait(500);

    res.status(200)
      .json({
        status: "ok",
        data: {
          greeting: `Good ${timeOfDay[time]} ${name}`
        }
      });
  }
});


const app = express()
  .get(helloEndpoint.path, helloEndpoint.run.bind(helloEndpoint))
  .use((error: Error, req: Request, res: Response, next: NextFunction) => {
    switch (error.constructor) {
      case ZodError:
        return res.status(400).json({ error });
    }

    return res.status(500).json({ error: error.message });
  })
  .listen(3000);
