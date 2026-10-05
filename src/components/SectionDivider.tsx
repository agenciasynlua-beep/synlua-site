const SectionDivider = ({
  withDiamond = false,
  light = false,
}: {
  withDiamond?: boolean;
  light?: boolean;
}) => {
  return (
    <div className="relative py-3 sm:py-4 bg-transparent" aria-hidden="true">
      {/* Ultra-thin gradient purple line */}
      <div className="relative w-full h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6366F1]/30 to-transparent blur-[2px]" />
      </div>

      {withDiamond && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Glassmorph diamond */}
          <div
            className={`w-2 h-2 rotate-45 border border-[#8B5CF6]/40 backdrop-blur-md ${
              light ? "bg-white/40" : "bg-white/[0.03]"
            } shadow-[0_0_10px_rgba(139,92,246,0.25)]`}
          />
        </div>
      )}
    </div>
  );
};

export default SectionDivider;
