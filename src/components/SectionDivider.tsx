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
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#bd86f5]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#7c5ad6]/30 to-transparent blur-[2px]" />
      </div>

      {withDiamond && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Glassmorph diamond */}
          <div
            className={`w-2 h-2 rotate-45 border border-[#bd86f5]/40 backdrop-blur-md ${
              light ? "bg-white/40" : "bg-white/[0.03]"
            } shadow-[0_0_10px_rgba(189,134,245,0.25)]`}
          />
        </div>
      )}
    </div>
  );
};

export default SectionDivider;
