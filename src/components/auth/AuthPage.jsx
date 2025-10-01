import React from 'react';
import { defaultAuthBgUrl, logo } from '../../assets/paths';

const AuthPage = ({ children, title, subtitle, backgroundImage = defaultAuthBgUrl }) => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
  <div className="w-full max-w-2xl">
    <div className="bg-gray-300/95  rounded-lg shadow-xl p-16">
         <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="mx-auto h-16 w-16 rounded-full shadow-lg mb-4" />
        </div>
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
          <p>© 2025 Knights of Saint Mulumba. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;


