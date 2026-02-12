import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const MemberPlain = t.Object(
  {
    id: t.Integer(),
    username: t.String(),
    password: t.String(),
    fullName: t.String(),
    role: t.Union([t.Literal("admin"), t.Literal("user")], {
      additionalProperties: false,
    }),
  },
  { additionalProperties: false },
);

export const MemberRelations = t.Object(
  {
    borrowings: t.Array(
      t.Object(
        {
          id: t.Integer(),
          memberId: t.Integer(),
          bookId: t.Integer(),
          borrowDate: t.Date(),
          returnDate: __nullable__(t.Date()),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const MemberPlainInputCreate = t.Object(
  {
    username: t.String(),
    password: t.String(),
    fullName: t.String(),
    role: t.Optional(
      t.Union([t.Literal("admin"), t.Literal("user")], {
        additionalProperties: false,
      }),
    ),
  },
  { additionalProperties: false },
);

export const MemberPlainInputUpdate = t.Object(
  {
    username: t.Optional(t.String()),
    password: t.Optional(t.String()),
    fullName: t.Optional(t.String()),
    role: t.Optional(
      t.Union([t.Literal("admin"), t.Literal("user")], {
        additionalProperties: false,
      }),
    ),
  },
  { additionalProperties: false },
);

export const MemberRelationsInputCreate = t.Object(
  {
    borrowings: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.Integer({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const MemberRelationsInputUpdate = t.Partial(
  t.Object(
    {
      borrowings: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.Integer({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.Integer({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const MemberWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.Integer(),
          username: t.String(),
          password: t.String(),
          fullName: t.String(),
          role: t.Union([t.Literal("admin"), t.Literal("user")], {
            additionalProperties: false,
          }),
        },
        { additionalProperties: false },
      ),
    { $id: "Member" },
  ),
);

export const MemberWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.Integer(), username: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.Integer() }), t.Object({ username: t.String() })],
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.Integer(),
              username: t.String(),
              password: t.String(),
              fullName: t.String(),
              role: t.Union([t.Literal("admin"), t.Literal("user")], {
                additionalProperties: false,
              }),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Member" },
);

export const MemberSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      username: t.Boolean(),
      password: t.Boolean(),
      fullName: t.Boolean(),
      role: t.Boolean(),
      borrowings: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const MemberInclude = t.Partial(
  t.Object(
    { role: t.Boolean(), borrowings: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const MemberOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      username: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      password: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      fullName: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Member = t.Composite([MemberPlain, MemberRelations], {
  additionalProperties: false,
});

export const MemberInputCreate = t.Composite(
  [MemberPlainInputCreate, MemberRelationsInputCreate],
  { additionalProperties: false },
);

export const MemberInputUpdate = t.Composite(
  [MemberPlainInputUpdate, MemberRelationsInputUpdate],
  { additionalProperties: false },
);
