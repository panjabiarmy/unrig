import SidebarContent from "@/components/sidebar-content";
import Encrypt from "@/containers/Encrypt";
import Generate from "@/containers/Generate";
import Sign from "@/containers/Sign";
import Validate from "@/containers/Validate";
import Verify from "@/containers/Verify";
import Vote from "@/containers/Vote";

export const indexTabs = [
  { href: "/", title: "Generate", Component: Generate },
  { href: "/validate", title: "Validate", Component: Validate },
  { href: "/vote", title: "Vote", Component: Vote },
  { href: "/encrypt", title: "Encrypt", Component: Encrypt },
  { href: "/sign", title: "Sign", Component: Sign },
  { href: "/verify", title: "Verify", Component: Verify },
];

export default function IndexPage() {
  return <div className="flex justify-center w-full">
    <SidebarContent
      title="Unrig"
      subtitle="Proof of concept for rigging-proof elections"
      tabs={indexTabs}
    />
  </div>;
}
