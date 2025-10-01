import React from 'react';
import { defaultAuthBgUrl, placeholderLogoUrl } from '../../assets/paths';

const AuthPage = ({ children, title, subtitle, backgroundImage = defaultAuthBgUrl }) => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <img src={placeholderLogoUrl} alt="KSM Logo" className="h-12 w-12 rounded-full" />
          </div>
          <h1 className="text-2xl font-bold text-white drop-shadow">KSM Dashboard</h1>
          <p className="text-white/90 mt-1 drop-shadow">Knights of Saint Mulumba</p>
        </div>
        <div className="bg-white/95 backdrop-blur rounded-lg shadow-xl p-8">
          {(title || subtitle) && (
            <div className="text-center mb-6">
              {title && (
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              )}
              {subtitle && (
                <p className="mt-2 text-gray-600">{subtitle}</p>
              )}
            </div>
          )}
          {children}
        </div>
        <div className="mt-8 text-center text-sm text-white/90 drop-shadow">
          <p>© 2024 Knights of Saint Mulumba. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;


