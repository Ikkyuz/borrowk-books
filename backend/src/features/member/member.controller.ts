import { Elysia, t } from "elysia";
import { MemberService } from "./member.service";
import { memberCreateSchema, memberUpdateSchema, memberLoginSchema } from "./member.schema";

export namespace MemberController {
    export const routes = new Elysia({ prefix: "/members" })
        .get("/", () => MemberService.getMembers())
        .get("/:id", ({ params: { id } }) => MemberService.getMemberById(Number(id)), {
            params: t.Object({ id: t.String() })
        })
        .post("/", ({ body }) => MemberService.createMember(body), {
            body: memberCreateSchema
        })
        .put("/:id", ({ params: { id }, body }) => MemberService.updateMember(Number(id), body), {
            params: t.Object({ id: t.String() }),
            body: memberUpdateSchema
        })
        .delete("/:id", ({ params: { id } }) => MemberService.deleteMember(Number(id)), {
            params: t.Object({ id: t.String() })
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
            body: memberLoginSchema
        });
}
