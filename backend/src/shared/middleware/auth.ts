export const getAuthPayload = async (jwt: any, headers: Headers) => {
    // Try both lowercase and PascalCase just in case
    const auth = headers.get("authorization") || headers.get("Authorization");
    
    console.log("Checking Auth Header:", auth); // Debug log

    if (!auth || !auth.startsWith("Bearer ")) {
        throw new Error("Unauthorized: Missing or invalid Authorization header");
    }

    const token = auth.slice(7);
    const payload = await jwt.verify(token);
    
    if (!payload) {
        throw new Error("Invalid token");
    }

    return payload;
};

export const verifyAdmin = async (jwt: any, headers: Headers) => {
    const payload = await getAuthPayload(jwt, headers);
    // @ts-ignore
    if (payload.role !== "admin") {
        throw new Error(`Forbidden: Admin access only (Your role: ${payload.role})`);
    }
    return payload;
};

export const verifyUser = async (jwt: any, headers: Headers, id?: number) => {
    const payload = await getAuthPayload(jwt, headers);
    // @ts-ignore
    if (id && payload.id !== id && payload.role !== "admin") {
        throw new Error("Forbidden: Access denied to this resource");
    }
    return payload;
};
