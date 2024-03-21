import useIsDesktop from "@/hooks/useIsDesktop";
import BottomSection from "./BottomSection";
import TopSection from "./TopSection";

const DesktopView = () => {
  const isDesktop = useIsDesktop();

  if (!isDesktop) {
    return null;
  }

  return (
    <>
      <TopSection />
      <BottomSection />
    </>
  );
};

export default DesktopView;
