import { getJWTSession } from "@/lib/actions";
import AdminDashBoard from "./admin/page";
import UserDashBoard from "./user/page";

export default async function DashBoardPage() {
  // const session = await getSession()
  const session = await getJWTSession();
  console.log("session ", session);

  if (!session) {
    return <h1>Access Denied. Please log in.</h1>;
  }
  if (session.role == "admin") {
    return <AdminDashBoard />;
  }
  return <UserDashBoard />;
}
