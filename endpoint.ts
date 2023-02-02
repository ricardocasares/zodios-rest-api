import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export type IO<U extends z.UnknownKeysParam = any> =
  | z.ZodObject<any, U>
  | z.ZodUnion<[IO<U>, ...IO<U>[]]>
  | z.ZodIntersection<IO<U>, IO<U>>
  | z.ZodDiscriminatedUnion<string, z.ZodObject<any, U>[]>;

export type EndpointHandler<
  P extends IO,
  BOUT extends IO,
  BIN extends IO,
  Q extends IO
> =
  (
    req:
      Request<
        z.output<P>,
        z.output<BOUT>,
        z.output<BIN>,
        z.output<Q>
      >,
    res: Response<z.output<BOUT>>
  ) => Promise<void>;

export type Handler<
  P extends IO,
  BOUT extends IO,
  BIN extends IO,
  Q extends IO
> = EndpointHandler<P, BOUT, BIN, Q>;

export interface EndpointConfig<
  P extends IO,
  BOUT extends IO,
  BIN extends IO,
  Q extends IO
> {
  path: string;
  method: "get" | "post";
  body?: BIN;
  query?: Q;
  params?: P;
  response: BOUT;
  handler: Handler<P, BOUT, BIN, Q>;
}

export class Endpoint<
  P extends IO,
  BOUT extends IO,
  BIN extends IO,
  Q extends IO
> {
  public path: string;
  public method: string;
  public body?: BIN;
  public query?: Q;
  public params?: P;
  public response: BOUT;
  public handler: Handler<P, BOUT, BIN, Q>;

  constructor({
    path,
    body,
    query,
    params,
    method,
    handler,
    response
  }: EndpointConfig<P, BOUT, BIN, Q>) {
    this.path = path;
    this.body = body;
    this.query = query;
    this.params = params;
    this.method = method;
    this.handler = handler;
    this.response = response;
  }

  run(
    req: Request<
      z.output<P>,
      z.output<BOUT>,
      z.output<BIN>,
      z.output<Q>
    >,
    res: Response,
    next: NextFunction
  ) {
    if (this?.body) {
      req.body = this.body.parse(req.body) as z.output<BIN>;
    }

    if (this?.query) {
      req.query = this.query.parse(req.query) as z.output<Q>;
    }

    if (this?.params) {
      req.params = this.params.parse(req.params) as z.output<P>;
    }

    this.handler(req, res).catch(next);
  }
}
