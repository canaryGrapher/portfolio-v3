import React from "react";

const RejectionsFooter = () => {
  return (
    <div className="flex flex-col items-center gap-3 text-center pt-16 pb-8 border-t border-dashed border-gray-300/30 mt-12 w-full clear-both">
        <div>
            <p className="text-sm font-bold text-green-800 tracking-wide uppercase">Job rejection emails collected over time</p>
            <p className="text-[11px] font-semibold text-gray-500 mt-1">Every &quot;no&quot; brings me closer to the right &quot;yes&quot;</p>
        </div>
    </div>
  )
}

export default RejectionsFooter

