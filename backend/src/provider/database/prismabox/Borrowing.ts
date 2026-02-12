import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const BorrowingPlain = t.Object(
  {
    id: t.Integer(),
    memberId: t.Integer(),
    bookId: t.Integer(),
    borrowDate: t.Date(),
    returnDate: __nullable__(t.Date()),
  },
  { additionalProperties: false },
);

export const BorrowingRelations = t.Object(
  {
    member: t.Object(
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
    book: t.Object(
      {
        id: t.Integer(),
        title: t.String(),
        author: __nullable__(t.String()),
        status: t.Union([t.Literal("available"), t.Literal("borrowed")], {
          additionalProperties: false,
        }),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const BorrowingPlainInputCreate = t.Object(
  {
    borrowDate: t.Optional(t.Date()),
    returnDate: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const BorrowingPlainInputUpdate = t.Object(
  {
    borrowDate: t.Optional(t.Date()),
    returnDate: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const BorrowingRelationsInputCreate = t.Object(
  {
    member: t.Object(
      {
        connect: t.Object(
          {
            id: t.Integer({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    book: t.Object(
      {
        connect: t.Object(
          {
            id: t.Integer({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const BorrowingRelationsInputUpdate = t.Partial(
  t.Object(
    {
      member: t.Object(
        {
          connect: t.Object(
            {
              id: t.Integer({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
      book: t.Object(
        {
          connect: t.Object(
            {
              id: t.Integer({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
);

export const BorrowingWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.Integer(),
          memberId: t.Integer(),
          bookId: t.Integer(),
          borrowDate: t.Date(),
          returnDate: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Borrowing" },
  ),
);

export const BorrowingWhereUnique = t.Recursive(
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
              memberId: t.Integer(),
              bookId: t.Integer(),
              borrowDate: t.Date(),
              returnDate: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Borrowing" },
);

export const BorrowingSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      memberId: t.Boolean(),
      bookId: t.Boolean(),
      borrowDate: t.Boolean(),
      returnDate: t.Boolean(),
      member: t.Boolean(),
      book: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const BorrowingInclude = t.Partial(
  t.Object(
    { member: t.Boolean(), book: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const BorrowingOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      memberId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      bookId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      borrowDate: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      returnDate: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Borrowing = t.Composite([BorrowingPlain, BorrowingRelations], {
  additionalProperties: false,
});

export const BorrowingInputCreate = t.Composite(
  [BorrowingPlainInputCreate, BorrowingRelationsInputCreate],
  { additionalProperties: false },
);

export const BorrowingInputUpdate = t.Composite(
  [BorrowingPlainInputUpdate, BorrowingRelationsInputUpdate],
  { additionalProperties: false },
);
