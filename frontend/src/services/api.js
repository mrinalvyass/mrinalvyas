import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5050/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export const publicApi = {
  getPortfolio: async () => (await api.get("/public/portfolio")).data,
  sendMessage: async (payload) => (await api.post("/public/contact", payload)).data,
  getGithubStatus: async () => (await api.get("/public/github-status")).data,
};

export const authApi = {
  login: async (payload) => (await api.post("/auth/login", payload)).data,
};

export const adminApi = {
  getDashboard: async () => (await api.get("/admin/dashboard")).data,
  getAbout: async () => (await api.get("/admin/about")).data,
  updateAbout: async (payload) => (await api.put("/admin/about", payload)).data,

  getSkills: async () => (await api.get("/admin/skills")).data,
  createSkill: async (payload) => (await api.post("/admin/skills", payload)).data,
  updateSkill: async (id, payload) =>
    (await api.put(`/admin/skills/${id}`, payload)).data,
  deleteSkill: async (id) => (await api.delete(`/admin/skills/${id}`)).data,

  getProjects: async () => (await api.get("/admin/projects")).data,
  createProject: async (payload) =>
    (await api.post("/admin/projects", payload)).data,
  updateProject: async (id, payload) =>
    (await api.put(`/admin/projects/${id}`, payload)).data,
  deleteProject: async (id) => (await api.delete(`/admin/projects/${id}`)).data,

  getTimeline: async () => (await api.get("/admin/timeline")).data,
  createTimeline: async (payload) =>
    (await api.post("/admin/timeline", payload)).data,
  updateTimeline: async (id, payload) =>
    (await api.put(`/admin/timeline/${id}`, payload)).data,
  deleteTimeline: async (id) => (await api.delete(`/admin/timeline/${id}`)).data,

  getAchievements: async () => (await api.get("/admin/achievements")).data,
  createAchievement: async (payload) =>
    (await api.post("/admin/achievements", payload)).data,
  updateAchievement: async (id, payload) =>
    (await api.put(`/admin/achievements/${id}`, payload)).data,
  deleteAchievement: async (id) =>
    (await api.delete(`/admin/achievements/${id}`)).data,

  getServices: async () => (await api.get("/admin/services")).data,
  createService: async (payload) =>
    (await api.post("/admin/services", payload)).data,
  updateService: async (id, payload) =>
    (await api.put(`/admin/services/${id}`, payload)).data,
  deleteService: async (id) => (await api.delete(`/admin/services/${id}`)).data,

  getTestimonials: async () => (await api.get("/admin/testimonials")).data,
  createTestimonial: async (payload) =>
    (await api.post("/admin/testimonials", payload)).data,
  updateTestimonial: async (id, payload) =>
    (await api.put(`/admin/testimonials/${id}`, payload)).data,
  deleteTestimonial: async (id) =>
    (await api.delete(`/admin/testimonials/${id}`)).data,

  getBlogPosts: async () => (await api.get("/admin/blog-posts")).data,
  createBlogPost: async (payload) =>
    (await api.post("/admin/blog-posts", payload)).data,
  updateBlogPost: async (id, payload) =>
    (await api.put(`/admin/blog-posts/${id}`, payload)).data,
  deleteBlogPost: async (id) =>
    (await api.delete(`/admin/blog-posts/${id}`)).data,

  getSections: async () => (await api.get("/admin/sections")).data,
  updateSection: async (id, payload) =>
    (await api.put(`/admin/sections/${id}`, payload)).data,
  getMessages: async () => (await api.get("/admin/messages")).data,

  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/admin/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};
