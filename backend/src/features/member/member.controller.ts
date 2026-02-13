import { Elysia, t } from "elysia";
import { MemberService } from "./member.service";
import { memberCreateSchema, memberUpdateSchema, memberLoginSchema, MemberSchema } from "./member.schema";
import { authMiddleware } from "@/shared/middleware/auth";

export namespace MemberController {
    export const routes = new Elysia({ prefix: "/members" })
        .get("/", async ({ isAdmin }) => {
            await isAdmin();
            return MemberService.getMembers();
        }, {
            response: t.Array(MemberSchema),
            detail: { tags: ["Member"] }
        })
        .get("/:id", async ({ params: { id }, isUser }) => {
            await isUser(Number(id));
            return MemberService.getMemberById(Number(id));
        }, {
            params: t.Object({ id: t.String() }),
            response: MemberSchema,
            detail: { tags: ["Member"] }
        })
        .post("/", ({ body }) => MemberService.createMember(body), {
            body: memberCreateSchema,
            response: MemberSchema,
            detail: { tags: ["Member"] }
        })
        .put("/:id", async ({ params: { id }, body, isUser }) => {
            await isUser(Number(id));
            return MemberService.updateMember(Number(id), body);
        }, {
            params: t.Object({ id: t.String() }),
            body: memberUpdateSchema,
            response: MemberSchema,
            detail: { tags: ["Member"] }
        })
        .delete("/:id", async ({ params: { id }, isAdmin }) => {
            await isAdmin();
            return MemberService.deleteMember(Number(id));
        }, {
            params: t.Object({ id: t.String() }),
            response: MemberSchema,
            detail: { tags: ["Member"] }
        })
        .post("/login", async ({ body, jwt, set }) => {
            try {
                const member = await MemberService.login(body);
                // @ts-ignore
                const token = await jwt.sign({
                    id: member.id,
                    username: member.username,
                    role: member.role
                });
                return {
                    token,
                    member: {
                        id: member.id,
                        username: member.username,
                        fullName: member.fullName,
                        role: member.role
                    }
                };
            } catch (e: any) {
                set.status = 401;
                return { error: e.message };
            }
        }, {
            body: memberLoginSchema,
            response: t.Union([
                t.Object({
                    token: t.String(),
                    member: t.Omit(MemberSchema, ["password"])
                }),
                t.Object({ error: t.String() })
            ]),
            detail: { tags: ["Member"] }
        });
}
