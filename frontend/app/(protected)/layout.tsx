import ProtectedRouteProvider from "@/app/providers/ProtectedRouteProvider";

const { getServerSession } = require("next-auth")
const { authOptions } = require("../api/auth/[...nextauth]/route");
const { redirect } = require("next/navigation");

const PrivateLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const session = await getServerSession(authOptions);

  if(!session){
    redirect('/')
  }

  return <ProtectedRouteProvider>{ children }</ProtectedRouteProvider>
}

export default PrivateLayout;