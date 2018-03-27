import Contest from '@/pages/contest/Cotest';
import TabOld from "@/pages/contest/components/TabOld";
import TabNew from "@/pages/contest/components/TabNew";
import Details from "@/pages/contest/components/Details";
export default {
  path: "/contest",
  component: Contest,
  children: [
    { path: "/", redirect: "new" },    
    {
      path:"old",
      component: TabOld
    },
    {
      path:"new",
      component: TabNew
    },
    {
      path:":id",
      component: Details
    }
  ]
};