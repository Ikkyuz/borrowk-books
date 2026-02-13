import prisma from "@/provider/database/database.provider";
import { MemberCreate, MemberUpdate } from "./member.schema";

export namespace MemberRepository {
    export async function findAll() {
        return await prisma.member.findMany({
            select: {
                id: true,
                username: true,
                fullName: true,
                role: true,
            }
        });
    }

    export async function findById(id: number) {
        return await prisma.member.findUnique({ where: { id } });
    }

    export async function findByUsername(username: string) {
        return await prisma.member.findUnique({ where: { username } });
    }

    export async function create(data: MemberCreate) {
        return await prisma.member.create({ data });
    }

    export async function update(id: number, data: MemberUpdate) {
        return await prisma.member.update({
            where: { id },
            data
        });
    }

    export async function remove(id: number) {
        return await prisma.member.delete({ where: { id } });
    }
}
