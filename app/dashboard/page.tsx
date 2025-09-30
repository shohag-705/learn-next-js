import { getJWTSession } from "@/lib/actions";
import AdminDashBoard from "./admin/page";
import UserDashBoard from "./user/page";
import { hasRole } from "../utils/auth";

export default async function DashBoardPage() {
  // const session = await getSession()
  const session = await getJWTSession();
  console.log("session ", session);

  if (!session) {
    return <h1>Access Denied. Please log in.</h1>;
  }
  if (hasRole(session.role, ["admin"])) {
    return <AdminDashBoard />;
  } else if (hasRole(session.role, ["user"])) {
    return <UserDashBoard />;
  }
}
