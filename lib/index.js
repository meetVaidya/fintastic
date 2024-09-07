import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const { isAuthenticated } = getKindeServerSession();
const isUserAuthenticated = await isAuthenticated();

