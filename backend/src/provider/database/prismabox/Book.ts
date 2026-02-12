import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const BookPlain = t.Object(
  {
    id: t.Integer(),
    title: t.String(),
    author: __nullable__(t.String()),
    status: t.Union([t.Literal("available"), t.Literal("borrowed")], {
      additionalProperties: false,
    }),
  },
  { additionalProperties: false },
);

export const BookRelations = t.Object(
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

export const BookPlainInputCreate = t.Object(
  {
    title: t.String(),
    author: t.Optional(__nullable__(t.String())),
    status: t.Optional(
      t.Union([t.Literal("available"), t.Literal("borrowed")], {
        additionalProperties: false,
      }),
    ),
  },
  { additionalProperties: false },
);

export const BookPlainInputUpdate = t.Object(
  {
    title: t.Optional(t.String()),
    author: t.Optional(__nullable__(t.String())),
    status: t.Optional(
      t.Union([t.Literal("available"), t.Literal("borrowed")], {
        additionalProperties: false,
      }),
    ),
  },
  { additionalProperties: false },
);

export const BookRelationsInputCreate = t.Object(
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

export const BookRelationsInputUpdate = t.Partial(
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

export const BookWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.Integer(),
          title: t.String(),
          author: t.String(),
          status: t.Union([t.Literal("available"), t.Literal("borrowed")], {
            additionalProperties: false,
          }),
        },
        { additionalProperties: false },
      ),
    { $id: "Book" },
  ),
);

export const BookWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.Integer() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.Integer() })], {
          additionalProperties: false,
        }),
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
              title: t.String(),
              author: t.String(),
              status: t.Union([t.Literal("available"), t.Literal("borrowed")], {
                additionalProperties: false,
              }),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Book" },
);

export const BookSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      title: t.Boolean(),
      author: t.Boolean(),
      status: t.Boolean(),
      borrowings: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const BookInclude = t.Partial(
  t.Object(
    { status: t.Boolean(), borrowings: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const BookOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      title: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      author: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Book = t.Composite([BookPlain, BookRelations], {
  additionalProperties: false,
});

export const BookInputCreate = t.Composite(
  [BookPlainInputCreate, BookRelationsInputCreate],
  { additionalProperties: false },
);

export const BookInputUpdate = t.Composite(
  [BookPlainInputUpdate, BookRelationsInputUpdate],
  { additionalProperties: false },
);
