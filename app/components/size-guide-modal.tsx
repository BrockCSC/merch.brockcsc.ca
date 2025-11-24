import { useEffect, useState } from "react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = "hidden";
      // Small delay to allow mount to happen before transition
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      document.body.style.overflow = "unset";
      // Wait for animation to finish before unmounting
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-all duration-300 ${
          isVisible
            ? "opacity-100 backdrop-blur-sm"
            : "opacity-0 backdrop-blur-none"
        }`}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all duration-300 ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Size Guide</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Close size guide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[80vh]">
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">
              Gildan Heavy Blend™ Hoodie
            </h3>
            <p className="text-gray-600 text-sm">
              Classic fit. Tubular body. Double-lined hood with color-matched
              drawcord.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Size</th>
                  <th className="px-4 py-3">Width (in)</th>
                  <th className="px-4 py-3">Length (in)</th>
                  <th className="px-4 py-3 rounded-r-lg">
                    Sleeve Center Back (in)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">S</td>
                  <td className="px-4 py-3">20</td>
                  <td className="px-4 py-3">27</td>
                  <td className="px-4 py-3">33 ½</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">M</td>
                  <td className="px-4 py-3">22</td>
                  <td className="px-4 py-3">28</td>
                  <td className="px-4 py-3">34 ½</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">L</td>
                  <td className="px-4 py-3">24</td>
                  <td className="px-4 py-3">29</td>
                  <td className="px-4 py-3">35 ½</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">XL</td>
                  <td className="px-4 py-3">26</td>
                  <td className="px-4 py-3">30</td>
                  <td className="px-4 py-3">36 ½</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Measuring Instructions */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">How to Measure</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <span className="font-medium text-gray-900 block">Width</span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Measure across the chest 1 inch below armhole when laid flat.
                </p>
              </div>
              <div className="space-y-2">
                <span className="font-medium text-gray-900 block">Length</span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Measure from high point of shoulder from the front.
                </p>
              </div>
              <div className="space-y-2">
                <span className="font-medium text-gray-900 block">Sleeve</span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Start at center of neck and measure down shoulder, down sleeve
                  to hem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
