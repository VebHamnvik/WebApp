const baseUrl = import.meta.env.VITE_BASE_URL ?? "http://localhost:3999";
const endpointsV1 = {
    projects: `${baseUrl}/v1/api/projects`
};

export { baseUrl, endpointsV1 as endpoints };