import { MemberRepository } from "./member.repository";
import { MemberCreate, MemberUpdate, MemberLogin } from "./member.schema";

export namespace MemberService {
    export async function getMembers() {
        return await MemberRepository.findAll();
    }

    export async function getMemberById(id: number) {
        const member = await MemberRepository.findById(id);
        if (!member) throw new Error("Member not found");
        return member;
    }

    export async function createMember(data: MemberCreate) {
        const existing = await MemberRepository.findByUsername(data.username);
        if (existing) throw new Error("Username already exists");

        if (!data.password) throw new Error("Password is required");
        const hashedPassword = await Bun.password.hash(data.password);
        return await MemberRepository.create({
            ...data,
            password: hashedPassword
        });
    }

    export async function updateMember(id: number, data: MemberUpdate) {
        await getMemberById(id);
        if (data.password) {
            data.password = await Bun.password.hash(data.password);
        }
        return await MemberRepository.update(id, data);
    }

    export async function deleteMember(id: number) {
        await getMemberById(id);
        return await MemberRepository.remove(id);
    }

    export async function login(data: MemberLogin) {
        const member = await MemberRepository.findByUsername(data.username);
        if (!member) throw new Error("Invalid username or password");

        const isMatch = await Bun.password.verify(data.password, member.password);
        if (!isMatch) throw new Error("Invalid username or password");

        return member;
    }
}
