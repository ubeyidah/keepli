import { protectRoute, signOut } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import React from "react";

const Dashboard = async () => {
  const user = await protectRoute();
  return (
    <div>
      Dashboard
      <form action={signOut}>
        <Button type="submit">Sign Out</Button>
      </form>
      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Dashboard;
