import React from 'react';

const StripeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-white to-primary-50 dark:from-dark-800 dark:via-dark-900 dark:to-dark-700 animate-gradient-xy opacity-70"></div>
      <div className="absolute inset-0">
        {/* Blurred circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400 dark:bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-primary-300 dark:bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary-500 dark:bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary-200 dark:bg-primary-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-3000"></div>
      </div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEgTCAxNiAxIE0gMSAwIEwgMSAxNiBNIDAgOSBMIDE2IDkgTSA5IDAgTCA5IDE2IiBmaWxsPSJub25lIiBzdHJva2U9IiMyMjIiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]">
      </div>
    </div>
  );
};

export default StripeBackground;