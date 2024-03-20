import useIsMobile from "@/hooks/useIsMobile";

const MobileView = () => {
  const isMobile = useIsMobile();
  if (!isMobile) {
    return null;
  }

  return <div>MobileView</div>;
};

export default MobileView;
