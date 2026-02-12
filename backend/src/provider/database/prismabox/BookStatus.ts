import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const BookStatus = t.Union(
  [t.Literal("available"), t.Literal("borrowed")],
  { additionalProperties: false },
);
