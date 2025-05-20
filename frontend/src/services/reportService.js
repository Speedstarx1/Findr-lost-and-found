const BASE_URL = "https://findr-spring-sea-9539.fly.dev/api/reports";

// Get all reports
export const getAllReports = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      redirect: "follow",
    });
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching all reports:", error);
    throw error;
  }
};


// Replaces getMyReports with client-side filtering
export const getMyReports = async (userId) => {
  console.log("Fetching reports for user ID:", userId);
  const allReports = await getAllReports();
  console.log("All reports:", allReports);
  const filteredReports = allReports.filter(report => report.user.id === userId);
  console.log("Filtered reports:", filteredReports);
  return filteredReports;
};


// Replaces getReportById with client-side filtering
export const getReportById = async (id) => {
  const allReports = await getAllReports();
  const report = allReports.find(report => report.id === id);
  if (!report) {
    throw new Error("Report not found");
  }
  return report;
};





// Get recent reports (assuming there's a backend filter or sort)
export const getRecentReports = async (days = 7) => {
  const response = await fetch("https://findr-spring-sea-9539.fly.dev/api/reports");
  const data = await response.json();

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return data.filter(report => new Date(report.createdAt) >= cutoffDate);
};



// Create a new report
export const createReport = async (reportData,token) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(reportData),
    });
    if (!response.ok) throw new Error("Failed to create report");
    const data = await response.json();
    console.log("Report created:", data);
    return data
  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
};

// Close a report
export const closeReport = async (id) => {
  console.log(id)
  try {
    const response = await fetch(`${BASE_URL}/${id}/close`, {
      method: "PUT",
      redirect: "follow",
    });
    if (!response.ok) throw new Error("Failed to close report");
    return await response.json();
  } catch (error) {
    console.error(`Error closing report ${id}:`, error);
    throw error;
  }
};

// Search reports (example using POST if search filters are complex)
export const searchReports = async (searchTerm, filters = {}) => {
  const response = await fetch("https://findr-spring-sea-9539.fly.dev/api/reports");
  const data = await response.json();

  const term = searchTerm.toLowerCase();

  return data.filter(report => {
    const itemMatch = report.items?.some(item => item.name.toLowerCase().includes(term));
    const descriptionMatch = report.description?.toLowerCase().includes(term);
    const locationMatch = report.location?.toLowerCase().includes(term);

    // Optional: filter by type or status
    const typeMatch = filters.type ? report.type === filters.type : true;
    const statusMatch = filters.status ? report.status === filters.status : true;

    return (itemMatch || descriptionMatch || locationMatch) && typeMatch && statusMatch;
  });
};
