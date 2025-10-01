import apiService from './api';

class AuthService {
  async login(credentials) {
    const response = await apiService.post('/auth/login', credentials);
    if (response.success && response.data.token) {
      apiService.setAuthToken(response.data.token);
    }
    return response.data;
  }

  async register(userData) {
    const response = await apiService.post('/auth/register', userData);
    if (response.success && response.data.token) {
      apiService.setAuthToken(response.data.token);
    }
    return response.data;
  }

  async logout() {
    try {
      await apiService.post('/auth/logout');
    } catch (e) {
      // ignore
    } finally {
      apiService.removeAuthToken();
    }
  }

  async forgotPassword(email) {
    const res = await apiService.post('/auth/forgot-password', { email });
    return res.data;
  }

  async resetPassword(token, newPassword) {
    const res = await apiService.post('/auth/reset-password', { token, password: newPassword });
    return res.data;
  }

  async verifyEmail(token) {
    const res = await apiService.post('/auth/verify-email', { token });
    return res.data;
  }

  async resendVerificationEmail(email) {
    const res = await apiService.post('/auth/resend-verification', { email });
    return res.data;
  }

  async getCurrentUser() {
    const res = await apiService.get('/auth/me');
    return res.data;
  }

  async refreshToken() {
    const res = await apiService.post('/auth/refresh');
    if (res.success && res.data.token) {
      apiService.setAuthToken(res.data.token);
    }
    return res.data;
  }

  async changePassword(currentPassword, newPassword) {
    const res = await apiService.post('/auth/change-password', { currentPassword, newPassword });
    return res.data;
  }

  async updateProfile(userData) {
    const res = await apiService.put('/auth/profile', userData);
    return res.data;
  }

  isAuthenticated() {
    return !!apiService.getAuthToken();
  }

  getToken() {
    return apiService.getAuthToken();
  }
}

const authService = new AuthService();
export default authService;


